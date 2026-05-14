---
title: "Fields Module Design"
sidebar_label: "Field Design"
---

# Fields Module Design

`phynexis::fields` is the storage and access layer for per-index data arrays. It is used throughout Phynexis (DEM, FEM, CFD–DEM, peridynamics, ML) to store particle properties, mesh node attributes, contact pair data, and any other quantity that varies with a contiguous index.

This document explains the design rationale behind the class hierarchy and the relationships between metadata, schemas, layouts, storage, and views.

---

## 1. Core Design Principles

### 1.1 Structure of Arrays (SOA)

Every simulation object (particle, mesh node, contact pair) owns multiple scalar attributes. Instead of storing objects as structs (Array of Structs, AOS), Phynexis stores each attribute as a separate contiguous array (Structure of Arrays, SOA).

```
AOS: [{x, y, z, mass, vel_x, vel_y, vel_z}, ...]  // one struct per particle
SOA:  x[] | y[] | z[] | mass[] | vel_x[] | vel_y[] | vel_z[]  // separate arrays
```

SOA is chosen because:
- **Cache efficiency**: SIMD operations on a single attribute stride through contiguous memory.
- **Sparse access**: Most algorithms read only a subset of fields; SOA avoids loading unused attributes.
- **Variable schema**: Different simulations use different field sets. Adding a new field in SOA means appending a new array, not changing a struct layout.

### 1.2 Three-Layer Abstraction

The fields module separates three concerns into distinct layers:

```
Layer 1 — Logical: FieldSchema
  "I want a field named 'position' of type Vec3"

Layer 2 — Flat: FieldLayout (= VecX<FieldMeta>)
  "position expands into 3 scalar fields: position.x, position.y, position.z"

Layer 3 — Storage: FieldManager
  "I own 3 Field<double> instances with names 'position.x', 'position.y', 'position.z'"
```

This separation allows the user-facing configuration (Layer 1) to use high-level names (`position`, `velocity`) while the runtime works with flat, typed arrays (Layer 3). The expansion logic lives in Layer 2.

### 1.3 Type Erasure at the Registry, Typed Access at the Edge

`FieldManager` stores fields as `FieldBase*` pointers (type-erased). This avoids templating the entire manager on every possible field type. However, algorithms that operate on specific fields receive typed `Field<T>*` or `Vec3FieldView<T>` objects. The cast happens at the boundary between the manager and the algorithm, not inside the hot loop.

---

## 2. Class Overview

### 2.1 Relationship Map

```
FieldSchema                    FieldManager
    |                              |
    | (make_layout)                | (owns)
    v                              v
FieldLayout (VecX<FieldMeta>)   FieldBase* (pool)
    |                              |
    | (factory creates)            | (dynamic_cast)
    v                              v
Field<T>  VecXField<T>      FieldView (typed wrappers)
    ^                              ^
    |                              |
    +---- FieldSlot describes ----+
         (dimension, delimiter,
          component_names)
```

### 2.2 The Full Class Family

| Class | File | Role |
|-------|------|------|
| `FieldMeta` | `core/field_meta.hpp` | Minimal metadata for one scalar field (name, type, value type). |
| `FieldSlot` | `core/field_slot.hpp` | Rich descriptor for a logical "slot" that may expand into multiple scalar fields. |
| `FieldSchema` | `core/field_schema.hpp` | Collection of `FieldSlot`s. Builds flat `FieldLayout` from logical slots. |
| `FieldLayout` | `core/field_layout.hpp` | Alias: `VecX<FieldMeta>`. The runtime flat metadata list. |
| `FieldBase` | `core/field_base.hpp` | Abstract interface for all field storage types. |
| `Field<T>` | `core/field.hpp` | Concrete 1D contiguous array. Owns memory. |
| `VecXField<T>` | `containers/vecx_field.hpp` | 2D jagged array (variable-length rows per index). |
| `FieldHolder` | `core/field_holder.hpp` | RAII wrapper for `FieldBase*`. Move-only. |
| `FieldFactory` | `core/factory.hpp` | Static factory. Bridges runtime type enums to compile-time `Field<T>` instantiations. |
| `FieldManager` | `core/manager.hpp` | Central registry. Owns all fields, enforces size consistency. |
| `BoundLayout<SchemaT>` | `core/bound_layout.hpp` | Schema-bound handle cache. Maps schema slots to actual `FieldBase*` pointers. |
| `CachedLayoutView<SchemaT, ViewT>` | `core/cached_layout_view.hpp` | Lazy view. Rebuilds the typed view only when the layout becomes invalid. |
| `FieldViewBase` / concrete views | `views/*.hpp` | Non-owning, typed wrappers (e.g., `Vec3FieldView<T>` wraps 3 `Field<T>*`). |

---

## 3. Layer 1: Logical — FieldSchema

### 3.1 FieldSlot

A `FieldSlot` describes a single logical field entry in a schema. It answers the question: "If I say `position`, what do I actually mean?"

```cpp
struct FieldSlot {
  String name;              // e.g., "position"
  FieldType field_type;     // Scalar or VecX
  ValueType value_type;     // Double, Int32, etc.
  Int64 dimension;          // 1, 3, 4, 6, or N
  String delimiter;         // "." → "position.x"; "_" → "position_x"
  VecX<String> component_names;  // ["x", "y", "z"] or custom
};
```

**Expansion rules**:

| `field_type` | `dimension` | Result in `FieldLayout` |
|-------------|------------|------------------------|
| `Scalar` | 1 | 1 `FieldMeta` with name `"position"` |
| `Scalar` | 3 | 3 `FieldMeta`s: `"position.x"`, `"position.y"`, `"position.z"` |
| `Scalar` | N | N `FieldMeta`s with auto-generated component names |
| `VecX` | — | 1 `FieldMeta` of type `VecXField` (variable-length per row) |

The `delimiter` and `component_names` control the naming convention. A `Vec3` slot with `"position"`, `dimension=3`, `delimiter="."`, `component_names=["x","y","z"]` expands to `position.x`, `position.y`, `position.z`.

Factory helpers exist for common patterns:
- `make_scalar(name, value_type)` → dimension=1
- `make_vec3(name)` → `Scalar`, `Double`, dimension=3
- `make_vecn(name, n)` → `Scalar`, `Double`, dimension=N
- `make_vecx(name, value_type)` → `VecX` type

### 3.2 FieldSchema

`FieldSchema` owns a `VecX<FieldSlot>` and a schema name. It is the bridge between human-friendly logical names and the flat runtime layout.

```cpp
class FieldSchema {
  String name_;
  VecX<FieldSlot> slots_;
public:
  FieldLayout make_layout() const;     // expands all slots → flat metadata
  void resolve_json(json& j) const;    // {"pos":[1,2,3]} → {"pos.x":1,...}
  void append(const FieldSchema& other); // merge schemas (dedup by name)
};
```

Concrete schemas inherit from `FieldSchema` and define an enum of slot names:

```cpp
class Vec3FieldSchema : public FieldSchema {
public:
  enum class Slot { X, Y, Z };
  // constructor populates slots: [make_scalar("x"), make_scalar("y"), make_scalar("z")]
};
```

This inheritance pattern allows compile-time slot access (`schema.slot(Slot::X)`) while keeping the base class generic enough for runtime reflection.

**JSON resolution** is a subtle but important feature. When loading simulation data from JSON, a user writes `{"position": [1.0, 2.0, 3.0]}`. `resolve_json` expands this into `{"position.x": 1.0, "position.y": 2.0, "position.z": 3.0}` so that `FieldManager::set_field_values` can assign directly to flat fields. Keys not present in the schema are dropped silently.

---

## 4. Layer 2: Flat — FieldLayout

`FieldLayout` is simply `VecX<FieldMeta>`. It is the runtime representation of what fields exist.

```cpp
struct FieldMeta {
  String name;
  FieldType field_type;   // Scalar or VecX
  ValueType value_type;   // Double, Int32, ...
};
```

`FieldMeta` is intentionally minimal. It contains no runtime data, no buffer pointers, no size. It is pure metadata. This keeps the layout lightweight — you can copy, compare, and serialize layouts cheaply.

The binary format for `FieldMeta` includes a magic number (`0x464d5431` = 'FMT1') and a version field for forward compatibility.

---

## 5. Layer 3: Storage — FieldManager

`FieldManager` is the "database" of the simulation. It owns all field arrays and enforces the SOA invariant: **all fields in the manager share the same row count**.

### 5.1 Internal State

```cpp
class FieldManager {
  FieldPool field_pool_;          // KeyedObjectPool<String, FieldBase*>
  FieldLayout field_layout_;       // flat metadata, kept in sync with pool
  Int64 field_size_;               // shared row count
  FieldSchema logical_schema_;     // accumulated from ensure_fields() calls
};
```

The `FieldPool` is a handle-based keyed pool (from `phynexis::utils`). It maps field names to `FieldBase*` pointers. Handles survive pool reallocations, unlike raw pointers.

### 5.2 Key Capabilities

| Operation | What it does |
|-----------|-------------|
| `ensure_fields(schema)` | Creates missing fields, expands slots, appends to logical_schema_ |
| `resize_fields(n)` | Sets all fields to size `n` (bulk resize) |
| `reserve_fields(n)` | Bulk reserve capacity |
| `clear_fields()` | Sets size to 0, does not deallocate |
| `subset_fields(mask)` | Returns a new manager with only rows where `mask[i]` is true |
| `subset_fields_inplace(mask)` | Same, but modifies the current manager |
| `reorder_fields(order)` | Permutes rows according to `order` |
| `set_field_values(i, json)` | Assigns JSON values to row `i` (handles vecn expansion) |
| `get_field_values(i)` | Returns row `i` as JSON |
| `save_to(path)` / `load_from(path)` | Binary I/O via `manager_io` |
| `check_size_consistency()` | Reports fields whose size ≠ field_size_ |

### 5.3 Bulk Operations

All bulk operations (`resize`, `reserve`, `clear`, `subset`, `reorder`) operate on all fields simultaneously. This is essential for maintaining the SOA invariant. If a simulation creates a new particle, `resize_fields(new_size)` grows every field array atomically.

`erase_indices` uses a two-phase parallel approach: first a boolean mask + prefix sum to compute destination indices, then a parallel copy. This avoids the O(n²) cost of repeated `erase`.

---

## 6. Access Layer: BoundLayout & Views

### 6.1 BoundLayout

`BoundLayout` resolves a compile-time schema against a runtime `FieldManager`.

```cpp
template <typename SchemaT>
class BoundLayout {
  SchemaT schema_;
  VecX<Handle> handles_;      // per-flat-field handle into FieldPool
  VecX<FieldBase*> fields_;   // cached pointer cache (may become stale)
public:
  static BoundLayout make_bound(FieldManager& manager);
  void refresh();             // re-lookup handles by name
  void bind(FieldManager& manager);  // idempotent rebind
  VecX<FieldBase*> slot_fields(Slot slot);  // O(1) via offset table
};
```

The handle cache (`handles_`) is stable across pool reallocations. The pointer cache (`fields_`) can become stale if the manager reallocates. `refresh()` recovers by re-looking up handles and updating the pointer cache.

`slot_fields(slot)` returns the `FieldBase*` array for a given schema slot using a precomputed offset table. For a `Vec3` slot, this returns 3 pointers; for a `VecX` slot, 1 pointer.

### 6.2 CachedLayoutView

`CachedLayoutView` adds a lazily-rebuilt typed view on top of `BoundLayout`.

```cpp
template <typename SchemaT, typename ViewT>
class CachedLayoutView {
  BoundLayout<SchemaT> layout_;
  ViewT view_;              // cached typed view
  bool valid_;
public:
  void bind(FieldManager& manager);
  ViewT& view();            // rebuilds if invalid, then returns cached view
};
```

The view is rebuilt only when `valid_` is false (e.g., after a `bind()` call or a manual invalidation). This is critical for performance: many operators hold views as member variables across multiple timesteps. Without lazy rebinding, every timestep would re-cast every field pointer.

### 6.3 Typed Views

Concrete view classes provide an AOS-like API over SOA storage:

```cpp
// Vec3FieldView wraps 3 Field<T>* pointers
template <typename T>
class Vec3FieldView {
  Field<T>* x_, *y_, *z_;
public:
  Vec3<T> operator[](size_t i) const { return {(*x_)[i], (*y_)[i], (*z_)[i]}; }
  void set(size_t i, const Vec3<T>& v) { (*x_)[i]=v.x; (*y_)[i]=v.y; (*z_)[i]=v.z; }
};
```

Views are non-owning. They are constructed from `BoundLayout` or raw `FieldBase*` arrays. Schema validation happens at construction time, not at access time.

---

## 7. Storage Implementations

### 7.1 Field<T> — 1D Contiguous Array

`Field<T>` is the workhorse scalar storage. It owns a raw `T*` buffer with explicit `size_` and `capacity_` (no `std::vector` overhead). Dynamic operations are optimized:

- **Fill/assignment**: Uses `simd_for` for SIMD-friendly bulk ops.
- **Erase/reorder**: Uses `parallel_for` for non-trivially-copyable types; `std::memcpy` for trivially-copyable bulk ops.
- **Stream compaction** (`erase_indices`): Boolean mask + prefix sum → two-phase parallel copy.

### 7.2 VecXField<T> — 2D Jagged Array

`VecXField<T>` stores variable-length data per row (e.g., neighbor lists, contact pairs). Each row is a separately allocated `T*` with its own `size_`/`capacity_`.

It is treated as a distinct `FieldType::VecX` rather than a special case of `Field<T>`. This keeps `Field<T>` simple, contiguous, and SIMD-friendly, while `VecXField` handles the irregular access pattern.

---

## 8. Design Decisions

### 8.1 Why three layers (Schema → Layout → Manager) instead of two?

Two layers (Schema → Manager) would require the manager to understand slot expansion. This couples the "what fields exist" concern with the "how to allocate memory" concern. The three-layer design:
- Lets `FieldSchema` be user-facing (JSON configs, Python schemas).
- Lets `FieldLayout` be the canonical format for serialization and I/O.
- Lets `FieldManager` focus purely on storage and consistency.

### 8.2 Why type erasure (`FieldBase*`) in the manager?

Templating `FieldManager` on every possible field type would explode compile times and binary size. The manager is a registry, not a hot loop. Type erasure at the registry level + typed access at the algorithm level is the standard performance trade-off.

### 8.3 Why raw `new T[]` instead of `std::vector`?

`Field<T>` uses raw allocation to avoid `std::vector`'s initialization-on-resize behavior and to enable custom SIMD alignment (future). The `Field<T>` API is intentionally `std::vector`-like but without the implicit zero-initialization on `resize()`.

### 8.4 Why handle-based (`KeyedObjectPool`) instead of raw pointers?

Raw pointers into a pool become dangling when the pool reallocates. Handles survive reallocation because they index into a stable handle table. `BoundLayout::refresh()` uses the handle to recover the current pointer.

### 8.5 Why separate `VecXField` from `Field<T>`?

A jagged 2D array has fundamentally different memory layout and access patterns. Merging them into one class would require branching on every access. Keeping them separate allows `Field<T>` to stay simple and fast, while `VecXField` can optimize for row-local access.

---

## 9. Code Navigation Guide

| Want to understand... | Start here |
|----------------------|-----------|
| How a schema expands slots | `core/field_schema.hpp` → `make_layout()` |
| How fields are allocated | `core/manager.hpp` → `ensure_fields()` |
| How bulk erase works | `core/field.hpp` → `erase_indices()` |
| How views wrap SOA | `views/vec3_field_view.hpp` |
| How lazy rebind works | `core/cached_layout_view.hpp` → `view()` |
| How binary I/O works | `utils/manager_io.cpp` → `save_to()` / `load_from()` |
| How factory bridges enums | `core/factory.hpp` → `create_field()` |
