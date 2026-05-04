---
title: "LevelSetField"
displayed_sidebar: pythonApiSidebar
---

# LevelSetField

> **C++**: `phynexis::utils::LevelSetField`
> **Python**: `phynexis.utils.LevelSetField`
> **Header**: `src/utils/level_set_field.hpp`

Represents a level set function $\phi$ on a regular 3D grid. Used for implicit surface representation, interface tracking, and shape operations.


## Constructor

### `LevelSetField()`

Creates a level set field with default grid parameters:
- Corner: `(-0.5, -0.5, -0.5)`
- Spacing: `0.05`
- Dimensions: `(21, 21, 21)`


## Methods

### `get_corner()`

Return the grid corner position.

**Returns:**`Vec3d`

### `get_spacing()`

Return the grid spacing.

**Returns:**`float`

### `get_dimensions()`

Return the grid dimensions.

**Returns:**`Vec3i`

### `set_corner(corner)`

Set the grid corner.

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `corner` | `Vec3d` | Lower corner of the grid |

### `set_spacing(sp)`

Set the grid spacing.

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `sp` | `float` | Cell spacing |

### `set_dimension(dim)`

Set the grid dimensions.

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `dim` | `Vec3u` | Number of cells in each dimension |

### `get_phi(id)` / `set_phi(id, value)` / `phi(i, j, k)`

Access level set values at grid cells.

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `id` | `Vec3u` | Grid cell index |
| `i, j, k` | `int` | Individual indices |
| `value` | `float` | New phi value |

### `init_from_sdf_calculator(sdf)`

Initialize phi values by sampling an `SDFCalculator`.

### `signed_distance(pos)`

Interpolate signed distance at an arbitrary point in space.

### `gradient_interpolate(pos)`

Interpolate gradient at a point.

### `gradient_minus(id)` / `gradient_plus(id)`

Compute gradient at a grid point using backward/forward differences.

### `reinitialization()` / `reinitialization(iterations, dt)`

Reinitialize the level set function to maintain signed distance property.

### `is_initialized()`

Check if phi_table has been allocated.

**Returns:**`bool`


## Example

```python
import phynexis

# Create and configure grid
lsf = phynexis.utils.LevelSetField()
lsf.set_corner(phynexis.utils.Vec3d(0.0, 0.0, 0.0))
lsf.set_spacing(0.1)
lsf.set_dimension(phynexis.utils.Vec3u(11, 11, 11))

print("corner:", lsf.get_corner())
print("spacing:", lsf.get_spacing())
print("dimensions:", lsf.get_dimensions())

# Set phi values
lsf.set_phi(phynexis.utils.Vec3u(5, 5, 5), 1.0)
print("phi at center:", lsf.phi(5, 5, 5))

# Query signed distance
pos = phynexis.utils.Vec3d(0.5, 0.5, 0.5)
print("sd at", pos, ":", lsf.signed_distance(pos))
```

**Output:**
```text
corner: Vec3d(0, 0, 0)
spacing: 0.1
dimensions: Vec3i(11, 11, 11)
phi at center: 1.0
sd at Vec3d(0.5, 0.5, 0.5) : -0.5
```


## Unexposed C++ API

- `get_phi_array()` — FlatArray3D wrapper
- `get_phi_table()` — Direct vector access
- `index_3d(i, j, k)` — Flat index computation
