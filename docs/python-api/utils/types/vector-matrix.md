---
title: "Vectors and Matrices"
displayed_sidebar: pythonApiSidebar
---

# Vectors and Matrices

> **C++**: `phynexis::utils::Vec2`, `Vec3`, `Vec4`, `Vec6`, `Mat2`, `Mat3`
> **Python**: `phynexis.utils.Vec2d`, `Vec3d`, `Vec3i`, `Vec3u`, `Vec4d`, `Vec6d`, `Mat2d`, `Mat3d`
> **Header**: `src/utils/types/vec*.hpp`, `mat*.hpp`

Small fixed-size vector and matrix types used throughout phynexis. Exposed with Pythonic protocols (`len()`, indexing, iteration) where supported.


## Vector Types

| Python Name | C++ Type | Elements | Component Access | Arithmetic |
|-------------|----------|----------|------------------|------------|
| `Vec2d` | `Vec2<double>` | 2 floats | `x`, `y` | `+`, `-`, `*`, `/` with scalar and vector |
| `Vec2i` | `Vec2<int>` | 2 ints | `x`, `y` | `+`, `-` |
| `Vec3d` | `Vec3<double>` | 3 floats | `x`, `y`, `z` | `+`, `-`, `*`, `/` with scalar and vector |
| `Vec3i` | `Vec3<int>` | 3 ints | `x`, `y`, `z` | `+`, `-` |
| `Vec3u` | `Vec3<Int64>` | 3 ints | `x`, `y`, `z` | `+`, `-` |
| `Vec4d` | `Vec4<double>` | 4 floats | `x`, `y`, `z`, `w` | `+`, `-`, `*`, `/` with scalar and vector |
| `Vec4i` | `Vec4<int>` | 4 ints | `x`, `y`, `z`, `w` | `+`, `-` |
| `Vec6d` | `Vec6<double>` | 6 floats | `xx`, `yy`, `zz`, `xy`, `xz`, `yz` | — |

### Constructors

#### `Vec2d(x, y)` / `Vec2i(x, y)`

#### `Vec3d(x, y, z)` / `Vec3i(x, y, z)` / `Vec3u(x, y, z)`

#### `Vec4d(x, y, z, w)` / `Vec4i(x, y, z, w)`

> **Note**: The C++ `Vec4` constructor order is `(w, x, y, z)`, but the Python binding accepts `(x, y, z, w)` in the `repr` output order. After construction, `v.x`, `v.y`, `v.z`, `v.w` correspond to the expected components.

#### `Vec6d(xx, yy, zz, xy, xz, yz)`

Symmetric tensor storage (e.g. stress/strain components).

### Properties / Indexing

| Feature | Vec2d/3d/4d/2i/3i/4i/3u | Vec6d |
|---------|------------------------|-------|
| `len(v)` | Yes | No |
| `v[i]` / `v[i] = val` | Yes | No |
| Named components | Yes | Yes |
| `for x in v` | Yes (iteration) | No |

### Methods

#### `dot(other)` — Vec3d only

Compute dot product.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `other` | `Vec3d` | Other vector |

**Returns:** `float`

#### `cross(other)` — Vec3d only

Compute cross product.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `other` | `Vec3d` | Other vector |

**Returns:** `Vec3d`


## Matrix Types

| Python Name | C++ Type | Shape | Row Access |
|-------------|----------|-------|------------|
| `Mat2d` | `Mat2<double>` | 2x2 | `mat[i]` returns `Vec2d` |
| `Mat3d` | `Mat3<double>` | 3x3 | `mat[i]` returns `Vec3d` |

### Constructors

#### `Mat2d()` / `Mat3d()`

Creates a zero-initialized matrix.

### Indexing

| Feature | Mat2d | Mat3d |
|---------|-------|-------|
| `mat[i]` | Returns `Vec2d` | Returns `Vec3d` |
| `mat[i] = row_vec` | Yes | Yes |


## Example

```python
import phynexis

# Vec3d — most commonly used
v = phynexis.utils.Vec3d(1.0, 2.0, 3.0)
print("v:", v)
print("len:", len(v))
print("x:", v.x, "y:", v.y, "z:", v.z)
print("v[0]:", v[0], "v[1]:", v[1], "v[2]:", v[2])

# Element access and mutation
v.x = 10.0
v[1] = 20.0
print("after mutation:", v)

# Arithmetic
a = phynexis.utils.Vec3d(1.0, 0.0, 0.0)
b = phynexis.utils.Vec3d(0.0, 1.0, 0.0)
print("a + b:", a + b)
print("a * 2.0:", a * 2.0)
print("2.0 * a:", 2.0 * a)

# Dot and cross
print("dot:", a.dot(b))
print("cross:", a.cross(b))

# Vec3i
vi = phynexis.utils.Vec3i(1, 2, 3)
print("Vec3i:", vi, "len:", len(vi))

# Vec6d — symmetric tensor
s = phynexis.utils.Vec6d(1.0, 2.0, 3.0, 0.5, 0.6, 0.7)
print("Vec6d xx:", s.xx, "xy:", s.xy)

# Mat3d
m = phynexis.utils.Mat3d()
print("Mat3d:", m)
m[0] = phynexis.utils.Vec3d(1.0, 0.0, 0.0)
m[1] = phynexis.utils.Vec3d(0.0, 1.0, 0.0)
m[2] = phynexis.utils.Vec3d(0.0, 0.0, 1.0)
print("identity:", m)
```

**Output:**
```text
v: Vec3d(1, 2, 3)
len: 3
x: 1.0 y: 2.0 z: 3.0
v[0]: 1.0 v[1]: 2.0 v[2]: 3.0
after mutation: Vec3d(10, 20, 3)
a + b: Vec3d(1, 1, 0)
a * 2.0: Vec3d(2, 0, 0)
2.0 * a: Vec3d(2, 0, 0)
dot: 0.0
cross: Vec3d(0, 0, 1)
Vec3i: Vec3i(1, 2, 3) len: 3
Vec6d xx: 1.0 xy: 0.5
Mat3d: Mat3d([0, 0, 0], [0, 0, 0], [0, 0, 0])
identity: Mat3d([1, 0, 0], [0, 1, 0], [0, 0, 1])
```


## Known Issues

- `Vec3u` reports its Python type name as `Vec3i` (the repr also shows `Vec3i`). Functionally it works as unsigned 64-bit integers, but this is a binding quirk.
- `Vec6d` does **not** support `len()`, indexing, or iteration. Only named component access (`xx`, `yy`, etc.) is available.
- `Vec4d` constructor: the C++ order is `(w, x, y, z)`, but Python passes `(x, y, z, w)`. The repr output `Vec4d(x, y, z, w)` matches the property names, so `Vec4d(1, 2, 3, 4)` gives `x=2, y=3, z=4, w=1` which is confusing. Prefer constructing with explicit intent or avoid `Vec4d` unless the w-component semantics are well understood.


## Unexposed C++ API

- `VecX<T>` (dynamic-size vector) — used internally, some instantiations not registered for Python
- Matrix arithmetic operators (`+`, `-`, `*`) on `Mat2d`/`Mat3d`
- `data()` pointer access
- `operator+=` / `-=` / `*=` / `/=` compound assignments
