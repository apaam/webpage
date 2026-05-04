---
title: "SDFCalculator"
displayed_sidebar: pythonApiSidebar
---

# SDFCalculator

> **C++**: `phynexis::utils::SDFCalculator`
> **Python**: `phynexis.utils.SDFCalculator`
> **Header**: `src/utils/sdf_calculator.hpp`

Computes signed distance fields (SDFs) from triangle meshes using an AABB tree accelerated by libigl. Supports point queries, surface projections, closest facet lookups, and batch evaluation.


## Constructor

### `SDFCalculator()`

Creates an empty calculator. Must be initialized via `init_from_stl()` before use.


## Methods

### `init_from_stl(vertices, facets)`

Initialize from raw vertex and face arrays.

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `vertices` | `list[Vec3d]` | Mesh vertex positions |
| `facets` | `list[Vec3u]` | Triangle face indices |

### `init_from_stl(stl_model)`

Initialize from an `STLModel` object.

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `stl_model` | `STLModel` | Loaded STL model |

### `initialize()`

Reset to empty state.

### `signed_distance(pos)`

Compute signed distance at a point. Negative = inside, positive = outside (depending on mesh orientation).

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `pos` | `Vec3d` | Query point |

**Returns:**`float` — Signed distance

### `surface_projection(pos)`

Find the closest surface point on the mesh.

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `pos` | `Vec3d` | Query point |

**Returns:**`Vec3d` — Closest surface point

### `closest_facet(pos)`

Find the index of the closest triangle facet.

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `pos` | `Vec3d` | Query point |

**Returns:**`int` — Facet index

### `signed_distances(points)`

Batch compute signed distances for multiple points.

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `points` | `list[Vec3d]` | Query points |

**Returns:**`list[float]` — Signed distances


## Example

```python
import phynexis

# Load a mesh
model = phynexis.utils.STLModel()
model.init_from_stl("/path/to/sphere.stl")

# Build SDF
sdf = phynexis.utils.SDFCalculator()
sdf.init_from_stl(model)

# Query points
center = phynexis.utils.Vec3d(0.0, 0.0, 0.0)
outside = phynexis.utils.Vec3d(2.0, 0.0, 0.0)

print("sd at center:", sdf.signed_distance(center))
print("sd at (2,0,0):", sdf.signed_distance(outside))
print("surface proj:", sdf.surface_projection(outside))
print("closest facet:", sdf.closest_facet(outside))
```

**Output:**
```text
sd at center: -0.49866546590344585
sd at (2,0,0): -2.2589289071338654
surface proj: Vec3d(-0.21319, 0.411084, -0.188573)
closest facet: 0
```


## Unexposed C++ API

The following constructors and methods are not yet exposed:

- `SDFCalculator(const SDFCalculator&)` — Copy constructor
- `SDFCalculator(SDFCalculator&&)` — Move constructor
- Assignment operators
