---
title: "Utils Module Design"
sidebar_label: "Utils Design"
---

# Utils Module Design

`phynexis::utils` is the foundational utility layer. It is not a simulation module — it provides the type system, containers, serialization, math primitives, logging, geometry abstractions, and third-party library wrappers that all other modules depend on.

This document explains the design rationale behind the type system, container choices, serialization architecture, and the wrapper pattern that isolates third-party dependencies.

---

## 1. Core Design Principles

### 1.1 Int64 Everywhere

All sizes, indices, and capacities use `Int64` (signed 64-bit) instead of `std::size_t` or `int`. This is a project-wide convention enforced at the type-system level:

```cpp
// Primitive types (types/primitive_types.hpp)
using Int64 = std::int64_t;
using Int32 = std::int32_t;
using Float = float;
using Double = double;

// Containers use Int64 throughout
template <typename T>
class VecX { using size_type = Int64; ... };
```

Reasons:
- **Sign conversion safety**: Mixing `size_t` (unsigned) with `Int64` (signed) in physics code produces endless compiler warnings and subtle bugs.
- **Large-scale support**: DEM simulations with >2 billion particles need 64-bit indexing. `int` overflows at ~2.1B.
- **Consistency**: Every container, every loop counter, every array index uses the same type. No mental context-switching.

The trade-off is that `Int64` uses more memory for small indices, but in a DEM codebase the index overhead is negligible compared to particle data.

### 1.2 Custom Containers Over STL

Phynexis re-implements `std::vector` (`VecX`), `std::array` (`Array`), and `std::unordered_map` (`FlatHashMap`) with `Int64` sizing and trivial-type optimizations:

| STL | Phynexis | Key Difference |
|-----|----------|---------------|
| `std::vector<T>` | `VecX<T>` | `Int64` size; trivial-type `memcpy` fast path |
| `std::array<T,N>` | `Array<T,N>` | `Int64` size; zero-size specialization |
| `std::unordered_map` | `FlatHashMap` | Open addressing, linear probing, 0.9 load factor |

These are not "reinventing the wheel for fun" — each serves a specific performance or safety need that STL does not provide.

### 1.3 Wrapper Pattern for Third-Party Dependencies

Third-party libraries (Eigen, libigl, Cork, MPI, TetGen) are never used directly in simulation code. They are wrapped behind static adapter classes:

```
Simulation code ──► phynexis::utils wrapper ──► Third-party library
     (Vec3d)           (EigenWrapper)            (Eigen::Vector3d)
```

This isolates the dependency boundary. If Eigen changes its API, only `EigenWrapper` needs updates. Simulation code uses `Vec3d` everywhere.

### 1.4 Type Erasure at I/O Boundaries

Serialization and Python binding require runtime type information. `ValueType` enum + `void*` dispatch bridges compile-time types to runtime operations without templating the entire I/O pipeline.

---

## 2. Type System

### 2.1 VecX — The Universal Dynamic Array

`VecX<T>` is the most-used container in Phynexis. It is a drop-in replacement for `std::vector<T>` with two critical differences:

```cpp
template <typename T>
class VecX {
  T* data_;
  Int64 size_;
  Int64 capacity_;
public:
  // STL-compatible interface: push_back, insert, erase, emplace_back, iterators
  // Fast path for trivially-copyable types
};
```

**Key behaviors**:
- `Int64` for `size_` and `capacity_` — no sign-conversion warnings.
- Trivially-copyable types use `std::memcpy` for resize/reallocation instead of element-wise copy.
- Uses `::operator new/delete` for raw memory, then placement-new for construction — precise control over when constructors run.

This matters because DEM arrays are often `VecX<double>` with millions of elements. Resizing a `std::vector<double>` of size 10M would invoke 10M copy constructors (even for trivial types). `VecX` uses `memcpy` and avoids this entirely.

### 2.2 Array<T,N> — Fixed-Size with Int64

`Array<T,N>` is `std::array`-like but with `Int64` indexing and a zero-size specialization:

```cpp
template <typename T, Int64 N>
class Array { T data_[N]; ... };

template <typename T>
class Array<T, 0> { /* no data member */ };
```

Zero-sized arrays are used in template metaprogramming and as placeholder types. The specialization prevents undefined behavior from `T data_[0]`.

### 2.3 Named Small Vectors and Matrices

| Type | Fields | Use Case |
|------|--------|---------|
| `Vec2<T>` | `x, y` | 2D positions, texture coordinates |
| `Vec3<T>` | `x, y, z` | 3D positions, velocities, forces |
| `Vec4<T>` | `w, x, y, z` | Quaternions, homogeneous coordinates |
| `Vec6<T>` | `x0..x5` | Symmetric stress/strain tensors |
| `Mat2<T>` | `Vec2[2]` | 2D rotation matrices |
| `Mat3<T>` | `Vec3[3]` | 3D rotation/inertia tensors |

Named fields (`v.x` instead of `v[0]`) make physics code readable. The types are plain structs — no inheritance, no virtual functions — so they are trivially copyable and SIMD-friendly.

Conversion to/from `Array<T,N>` allows interoperability with generic algorithms that operate on fixed-size arrays.

### 2.4 ValueType — Runtime Type Tag

`ValueType` is the bridge between compile-time C++ types and runtime reflection:

```cpp
enum class ValueType {
  Bool, Char, Int8, Int16, Int32, Int64,
  Float, Double, Unknown
};

template <typename T>
constexpr ValueType value_type_of() { /* if constexpr dispatch */ }

// Type-erased dispatch
void set_value(void* ptr, ValueType vt, const json& j);
```

Used by:
- `FieldFactory` — creates `Field<T>` from a `ValueType` enum at runtime.
- `BinaryPack` — serializes typed data without knowing `T` at compile time.
- Python bindings — pybind11 type conversions.

---

## 3. Container Architecture

### 3.1 ObjectPool — Handle-Based Object Pool

`ObjectPool<T>` is the memory allocation strategy for dynamically created simulation objects (particles, shapes, contacts). It uses a free-list + epoch-based handles:

```cpp
template <typename T>
class ObjectPool {
  struct Slot { T value; size_type epoch; bool alive; size_type next_free; };
  VecX<Slot> slots_;
  size_type free_list_head_;
public:
  Handle emplace(Args&&... args);
  void erase(Handle h);
  bool valid(Handle h) const;  // checks epoch match
};

struct Handle {
  Int64 index;
  Int64 epoch;
};
```

**Epoch-based safety**: When a slot is freed, its epoch is incremented. A stale `Handle` (pointing to a recycled slot) will have `epoch != slot.epoch`, so `valid()` returns `false`. This turns use-after-free into a detectable error instead of silent data corruption.

**Free-list**: Allocation and deallocation are O(1). No heap fragmentation within the pool.

**Compact rebuild**: `compact_rebuild()` moves all live objects to the front of the array and rebuilds the free list. Useful when occupancy drops after a large deletion event.

### 3.2 KeyedObjectPool — Named + Handle Access

`KeyedObjectPool<Key,T>` composes `ObjectPool<T>` with a `std::unordered_map<Key, Handle>`:

```cpp
template <typename Key, typename T>
class KeyedObjectPool {
  ObjectPool<T> pool_;
  std::unordered_map<Key, Handle> key_map_;
public:
  Handle find(const Key& key);    // O(1) hash lookup
  Handle emplace(const Key& key, Args&&... args);
  void erase_by_key(const Key& key);
  void erase_by_handle(Handle h);
};
```

Used by `FieldManager` to map field names to `FieldBase*` handles. The dual access pattern (by name for setup, by handle for hot loops) is the standard usage pattern.

### 3.3 FlatHashMap — Cache-Friendly Hash Map

`FlatHashMap` is a custom open-addressing hash map with linear probing:

```cpp
template <typename Key, typename Value, typename Hash = std::hash<Key>>
class FlatHashMap {
  VecX<bool> occupied_;
  VecX<Entry> entries_;
  Int64 size_;
  static constexpr double kMaxLoadFactor = 0.9;
};
```

Design choices:
- **Separate `occupied_` array**: Boolean array is cache-friendly for probing. You check 16 slots in the time it takes to check 4 full `Entry` objects.
- **Power-of-2 capacity**: Mask-based index computation (`hash & (capacity-1)`) is faster than modulo.
- **0.9 load factor**: Higher than `std::unordered_map`'s default (~1.0) because open addressing degrades gracefully with linear probing up to ~0.9.

Used for particle-to-cell lookups, shape registry, and any scenario where `std::unordered_map`'s pointer-chasing buckets hurt performance.

---

## 4. Parallel Abstraction

The parallel layer is policy-based rather than virtual:

```cpp
// parallel/parallel.hpp
template <typename Backend = OmpBackend>
void parallel_for(Int64 begin, Int64 end, Func&& f);

template <typename Backend = OmpBackend, typename T>
T parallel_reduce(Int64 begin, Int64 end, T init, ReduceOp&& reduce, Func&& f);
```

| Backend | Behavior |
|---------|----------|
| `OmpBackend` | Dispatches to `#pragma omp parallel for` |
| `SeqBackend` | Sequential loop — identical API, no OpenMP dependency |

The backend is a template parameter, not a runtime virtual call. This means:
- No virtual dispatch overhead in hot loops.
- Code compiles and works with or without OpenMP.
- Switching backends is a one-line template argument change.

`parallel_reduce` uses the standard pattern: each thread accumulates into a local variable, then merges results in a critical section. This avoids false sharing on the reduction target.

---

## 5. Serialization: BinaryPack

`BinaryPack` is the unified serialization container for all Phynexis data. It operates in two modes:

```cpp
class BinaryPack {
  enum class Mode { Blob, Object };
  Mode mode_;
  // Blob mode: raw VecX<char> buffer
  // Object mode: ordered key-value list of nested BinaryPacks
};
```

| Mode | Use Case | Structure |
|------|----------|-----------|
| `Blob` | Flat arrays (Field<T> data, VecX<double>) | Raw byte buffer |
| `Object` | Structured data (Shape, Manager metadata) | Named fields, each a nested BinaryPack |

**Why a dual-mode design?** Flat data (10M doubles) should not pay the overhead of named fields. Structured data (a shape with 20 properties) needs names for forward compatibility. BinaryPack handles both without requiring two separate serialization systems.

The `to_binary()` / `from_binary()` protocol across `Field`, `Shape`, `FieldManager`, and `Scene` all use `BinaryPack` as the interchange format. JSON conversion (`binary_json_convert.hpp`) enables human-readable debugging of binary data.

---

## 6. Geometry: Shape Architecture

### 6.1 Shape Base Class

`Shape` is the polymorphic base for all geometric objects in Phynexis:

```cpp
class Shape {
  Tag tag_;           // Geometry family (Sphere, Trimesh, etc.)
  Feature features_;  // Capability bitmask (convex, implicit, SDF, neural, ...)
  Double size_;
  Double volume_;
  Mat3d inertia_;
  VecX<Vec3d> surface_nodes_;
public:
  virtual Double signed_distance(const Vec3d& point) = 0;
  virtual Vec3d support_point(const Vec3d& dir) = 0;
  virtual void get_bounding_box(AABB& box) = 0;
  // ...
};
```

**Feature flags** (`convex`, `implicit`, `sdf`, `neural`) allow solver dispatch without RTTI. A contact solver can check `if (shape->has_feature(Feature::Convex))` instead of `dynamic_cast<Sphere*>(shape)`. This is both faster and more extensible.

**Surface nodes** (`surface_nodes_`) enable node-to-surface contact models. Shapes precompute a set of surface sampling points for contact detection.

### 6.2 ShapeRegistry + ShapeFactory

Shape creation is factory-based with auto-registration:

```cpp
// shape/factory.hpp
class ShapeRegistry {
  static ShapeRegistry& instance();  // Meyers singleton
  std::unordered_map<String, std::function<Shape*(const json&)>> factories_;
};

#define REGISTER_SHAPE(name, Class) \
  static bool _shape_reg_##Class = \
    ShapeRegistry::instance().register_factory(name, [](const json& j){ return new Class(j); });
```

New shape types are added by including the header — no modifications to core code. The `REGISTER_SHAPE` macro runs at static initialization time, populating the registry before `main()`.

---

## 7. Logging: Console

The console system is an MPI-aware logging layer built on a custom `std::streambuf`:

```cpp
class LoggerStreambuf : public std::streambuf {
  // Buffers output until sync()
  // On sync: prefix with [timestamp] [level], then write
};

namespace console {
  extern std::ostream debug;
  extern std::ostream info;
  extern std::ostream warning;
  extern std::ostream error;
  // _all variants write from all MPI ranks
}
```

**MPI modes**:
- `ONLY_MASTER` (default): Only rank 0 writes. Other ranks buffer and discard.
- `ALL_WITH_RANK`: Every rank writes, prefixed with `[rank N]`.

The streambuf approach means you write `console::info << "step=" << step << std::endl` exactly like `std::cout`. The prefix injection is transparent.

---

## 8. Wrapper Pattern in Detail

Third-party library wrappers follow a consistent pattern:

| Wrapper | Third-Party | Role |
|---------|------------|------|
| `EigenWrapper` | Eigen | Dense linear algebra, SVD, eigenvalue decomposition |
| `IGLWrapper` | libigl | Mesh processing, SDF, decimation, convex hull, marching cubes |
| `CorkWrapper` | Cork | Boolean CSG operations (union, intersect, difference, xor) |
| `MPIWrapper` | MPI C API | Type-safe, `Int64`-friendly wrappers for collective ops |
| `TetGenWrapper` | TetGen | Tetrahedral mesh generation |

Each wrapper is a static-method class (no instances, no state). The pattern:

```cpp
// Public API uses phynexis types
static VecX<Vec3d> compute_sdf(const VecX<Vec3d>& verts, const VecX<Vec3i>& faces,
                                const VecX<Vec3d>& query_points);

// Implementation converts to third-party types internally
Eigen::MatrixXd V = to_eigen(verts);
Eigen::MatrixXi F = to_eigen(faces);
// ... call libigl ...
return from_eigen(result);
```

This isolates the dependency at the file level. Code that does not need SDF does not include `igl_wrapper.hpp` and does not link against libigl.

---

## 9. Design Decisions

### 9.1 Why re-implement `std::vector` as `VecX`?

Three reasons:
1. **Int64 sizing** — `std::vector` uses `size_t`, which is unsigned and platform-dependent.
2. **Trivial-type fast path** — `VecX` uses `memcpy` for resize/reallocation of trivial types. `std::vector` copy-constructs every element.
3. **Construction control** — Placement-new means we control exactly when constructors run. This matters for large arrays where default-construction is expensive.

### 9.2 Why epoch-based handles instead of raw pointers or shared_ptr?

| Approach | Problem |
|----------|---------|
| Raw pointers | Dangling after pool reallocation or slot reuse |
| `shared_ptr` | Reference counting overhead; cyclic refs with bidirectional links |
| Epoch handles | O(1) alloc/dealloc, detectable stale refs, no refcount overhead |

`ObjectPool` is designed for high-frequency create/destroy patterns (particle addition/deletion in DEM). `shared_ptr` would add a memory and cache overhead that scales with particle count.

### 9.3 Why open-addressing `FlatHashMap` instead of `std::unordered_map`?

`std::unordered_map` uses separate chaining (bucket array + linked list of nodes). Each node is a separate heap allocation. For small key-value pairs (e.g., `Int64 → Int64`), the node overhead dominates memory usage and cache misses destroy performance.

`FlatHashMap` stores everything in a single contiguous array. Linear probing means cache lines hold multiple candidate slots. For DEM cell lookups (frequent, small payloads), this is 2-5x faster.

### 9.4 Why `HUGE_VALUE = 1e300` instead of `std::numeric_limits<double>::infinity()`?

Infinity cannot be serialized to JSON. `HUGE_VALUE` is "large enough for physics, small enough for JSON." Used in distance queries where "no contact" needs a sentinel value.

### 9.5 Why `normalize` with deterministic fallback instead of assertion?

```cpp
Vec3d normalize(const Vec3d& v) {
  Double n = norm_l2(v);
  if (n < EPSILON) return {1.0, 0.0, 0.0};  // deterministic fallback
  return v / n;
}
```

DEM contact code can produce zero-length vectors (e.g., perfectly aligned particles). Crashing on assertion would be a robustness issue. The deterministic fallback (`[1,0,0]`) keeps the simulation running while producing predictable (if physically incorrect) results that downstream checks can catch.

### 9.6 Why feature flags on `Shape` instead of RTTI?

`dynamic_cast` requires RTTI and virtual table lookups. Feature flags are a single bitmask comparison:

```cpp
// With RTTI
if (dynamic_cast<const Sphere*>(shape)) { /* sphere-specific */ }

// With feature flags
if (shape->has_feature(Feature::Convex | Feature::Implicit)) { /* convex-implicit solver */ }
```

Feature flags also enable polymorphic dispatch by capability rather than type. A neural SDF shape and an analytic super-quadric both have `Feature::Implicit` — the same solver works for both without knowing their concrete types.

---

## 10. Code Navigation Guide

| Want to understand... | Start here |
|----------------------|-----------|
| How VecX avoids vector overhead | `types/vecx.hpp` → reallocate / grow |
| How ObjectPool epochs work | `types/object_pool.hpp` → `emplace()` / `erase()` |
| How FlatHashMap probes | `types/flat_hash_map.hpp` → `find()` |
| How ValueType bridges types | `types/value_type.hpp` → `value_type_of<T>()` |
| How BinaryPack dual mode works | `serde/binary_pack.hpp` → `Mode` enum |
| How parallel backend is selected | `parallel/parallel.hpp` → `parallel_for` template |
| How Shape features dispatch | `shape/shape.hpp` → `Feature` enum |
| How auto-registration works | `shape/factory.hpp` → `REGISTER_SHAPE` macro |
| How MPI wraps Int64 | `wrappers/mpi_wrapper.hpp` → `allgather()` |
| How console prefixes output | `console.hpp` → `LoggerStreambuf::sync()` |
