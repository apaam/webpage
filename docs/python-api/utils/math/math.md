---
title: "math"
displayed_sidebar: pythonApiSidebar
---

# math

> **C++**: `phynexis::utils::math`
> **Python**: `phynexis.utils.math`
> **Header**: `src/utils/math/math.hpp`

Mathematical constants, vector operations, and quaternion utilities.


## Constants

| Name | Value | Description |
|------|-------|-------------|
| `PI` | 3.14159... | Circle constant |
| `EPSILON` | 2.22e-16 | Machine epsilon for doubles |
| `TOL` | 1e-6 | Default numerical tolerance |
| `HUGE_VALUE` | 1e20 | Large sentinel value |
| `SQRT_2` | 1.41421... | Square root of 2 |
| `SQRT_3` | 1.73205... | Square root of 3 |


## Vector Operations

### `dot(a, b)`

Compute dot product of two vectors.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `a` | `Vec3d` | First vector |
| `b` | `Vec3d` | Second vector |

**Returns:** `float`

### `cross(a, b)`

Compute cross product of two vectors.

**Returns:** `Vec3d`

### `norm_l2(v)`

Compute L2 norm (magnitude) of a vector.

**Returns:** `float`

### `normalize(v)`

Normalize a vector in-place.


## Quaternion

Module `phynexis.utils.math.quaternion` provides quaternion operations.

### `from_rodrigues(angle, axis)`

Create a quaternion from angle-axis (Rodrigues) representation.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `angle` | `float` | Rotation angle in radians |
| `axis` | `Vec3d` | Rotation axis |

**Returns:** `Vec4d`

### `to_rodrigues(q)` / `to_matrix(q)` / `from_matrix(m)`

Convert quaternion to/from Rodrigues, rotation matrix.

### `multiply(a, b)` / `conjugate(q)` / `normalize(q)` / `add(a, b)`

Quaternion arithmetic.


## Example

```python
import phynexis

# Constants
print("PI:", phynexis.utils.math.PI)
print("EPSILON:", phynexis.utils.math.EPSILON)

# Vector ops
a = phynexis.utils.Vec3d(1.0, 0.0, 0.0)
b = phynexis.utils.Vec3d(0.0, 1.0, 0.0)
print("dot:", phynexis.utils.math.dot(a, b))
print("cross:", phynexis.utils.math.cross(a, b))
print("norm:", phynexis.utils.math.norm_l2(a))

# Quaternion
q = phynexis.utils.math.quaternion.from_rodrigues(
    phynexis.utils.math.PI / 2,
    phynexis.utils.Vec3d(0.0, 0.0, 1.0)
)
print("quaternion:", q)
```

**Output:**
```text
PI: 3.141592653589793
EPSILON: 2.220446049250313e-16
dot: 0.0
cross: Vec3d(0, 0, 1)
norm: 1.0
quaternion: Vec4d(0, 0, 0.707107, 0.707107)
```


## Spherical Harmonics

Spherical harmonics evaluation functions used internally by `SphericalHarmonics` shape.

### `legendre_p(n, m, x)`

Associated Legendre polynomial P(n, m, x).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `n` | `int` | Degree |
| `m` | `int` | Order |
| `x` | `float` | Input value |

**Returns:** `float`

### `normalization_factor(n, m)`

Compute spherical harmonic normalization factor.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `n` | `int` | Degree |
| `m` | `int` | Order |

**Returns:** `float`

### `calculate_ynm_fast(theta, phi, deg)`

Evaluate spherical harmonics at given angles up to specified degree. Accepts scalar or array inputs.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `theta` | `float` or `list[float]` | Polar angle(s) |
| `phi` | `float` or `list[float]` | Azimuthal angle(s) |
| `deg` | `int` | Maximum degree |

**Returns:** `list[float]` — Ynm coefficients

**Example:**
```python
import phynexis

# Associated Legendre polynomial
p = phynexis.utils.math.legendre_p(2, 1, 0.5)
print("legendre P(2,1,0.5):", p)

# Normalization factor
nf = phynexis.utils.math.normalization_factor(2, 1)
print("normalization factor:", nf)
```

**Output:**
```text
legendre P(2,1,0.5): -1.299038105676658
normalization factor: 2.958039891549808
```

## Unexposed C++ API

- `flat_array3d` utilities (internal 3D array layout, not exposed via pybind)
