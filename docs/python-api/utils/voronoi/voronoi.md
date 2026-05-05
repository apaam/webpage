---
title: "Voronoi"
displayed_sidebar: pythonApiSidebar
---

# Voronoi

> **C++**: `phynexis::utils::voronoi`
> **Python**: `phynexis.utils.voronoi`
> **Header**: `src/utils/voronoi/*.hpp`

Voronoi tessellation on surfaces and in volumes. The Python API exposes `Tessellation` (static computation methods) and `Diagram` (result container).


## TessellationParams

Configuration for Voronoi computation.

### Constructor

#### `TessellationParams()`

Defaults: `max_iter=1000`, `tol=0.001`, `use_cork=True`.

### Properties

| Property | Type | Description |
|------|------|------|
| `max_iter` | `int` | Maximum iterations |
| `tol` | `float` | Convergence tolerance |
| `use_cork` | `bool` | Use Cork for boolean clipping |


## Tessellation

Static methods for computing Voronoi diagrams.

### `compute(vt_seeds, stl_model, params)`

Compute Voronoi tessellation from seed points on a surface mesh.

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `vt_seeds` | `list[Vec3d]` | Seed points |
| `stl_model` | `STLModel` | Surface mesh |
| `params` | `TessellationParams` | Optional parameters |

**Returns:**`Diagram`

### `compute_centroidal(num_seeds, stl_model, params)`

Compute centroidal Voronoi tessellation (CVT) with automatic seed placement.

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `num_seeds` | `int` | Number of seeds |
| `stl_model` | `STLModel` | Surface mesh |
| `params` | `TessellationParams` | Optional parameters |

**Returns:**`Diagram`


## Diagram

Result container for tessellation (no public constructor).


## Example

```python
import phynexis

# Create a mesh from a sphere shape
model = phynexis.utils.shape.Sphere(2.0).get_stl_model(200)

# Compute CVT
params = phynexis.utils.voronoi.TessellationParams()
params.max_iter = 100
params.tol = 0.01

diag = phynexis.utils.voronoi.Tessellation.compute_centroidal(5, model, params)
print("diagram:", diag)
```

**Output:**
```text
diagram: <phynexis.lib.pyutils.voronoi.Diagram object at 0x...>
```


## Unexposed C++ API

- `SphericalDiagram`, `SphericalTessellation` — Partially bound
- `Tessellation::compute` overload with implicit surfaces
