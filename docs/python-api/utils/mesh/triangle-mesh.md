---
title: "TriangleMesh"
displayed_sidebar: pythonApiSidebar
---

# TriangleMesh

> **C++**: `phynexis::utils::mesh::TriangleMesh`
> **Python**: `phynexis.utils.TriangleMesh`
> **Header**: `src/utils/mesh/triangle_mesh.hpp`

Triangle surface mesh with STL/OFF/VTK-oriented I/O and geometric operations. Provides a richer instance-oriented API than `SurfaceMesh`, including transformations, decimation, convex hull, and mesh analysis.

## Constructors

### `TriangleMesh()`

Creates an empty triangle mesh.

### `TriangleMesh(vertices, facets)`

Create from vertex and face arrays.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `vertices` | `list[Vec3d]` | Vertex positions |
| `facets` | `list[Vec3i]` | Triangle face indices |

### `TriangleMesh(file_path)`

Load from a file path (auto-detects format).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `file_path` | `str` | Path to mesh file |

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `vertices` | `list[Vec3d]` | Vertex positions (read/write) |
| `facets` | `list[Vec3i]` | Triangle face indices (read/write) |

## Methods

### `save_to(path, file, opt=SaveOptions())`

Save mesh to file.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `path` | `str` | — | Directory path |
| `file` | `str` | — | File name |
| `opt` | `SaveOptions` | `SaveOptions()` | Save options |

### `load_from(path, file, opt=LoadOptions())`

Load mesh from file.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `path` | `str` | — | Directory path |
| `file` | `str` | — | File name |
| `opt` | `LoadOptions` | `LoadOptions()` | Load options |

### `transpose(disp)` / `rotate(quat)`

Apply geometric transformations.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `disp` | `Vec3d` | Translation vector |
| `quat` | `Vec4d` | Rotation quaternion |

### `copy_pose(ref)` / `copy_pose_dev(ref, reset)`

Copy pose from a reference mesh. `copy_pose_dev` also accepts a reset mesh for deviation calculation.

### `remove_unreferenced_vertices()` / `remove_duplicate_vertices()`

Clean up mesh topology by removing unused or duplicate vertices.

### `reorient_facets()`

Ensure facet normals point outward.

### `decimate(num_nodes)`

Reduce mesh complexity via decimation.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `num_nodes` | `int` | Target number of vertices |

### `standardize()`

Center at origin and scale to unit size.

### `set_size(size)`

Scale to a specific size.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `size` | `float` | Target size (bounding box diagonal) |

### `make_convex()`

Convert to convex hull.

### `refine(num_refines=1)`

Subdivide each triangle into 4 smaller triangles.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `num_refines` | `int` | `1` | Number of refinement iterations |

### `smooth_mesh(num_trials=1)`

Laplacian smoothing.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `num_trials` | `int` | `1` | Number of smoothing iterations |

### `merge(other)`

Merge with another `TriangleMesh`.

### `size()`

**Returns:** `float` — characteristic size (bounding box diagonal).

### `get_triangle_strips()`

**Returns:** `list[int]` — triangle strip indices.

### `is_face_outside(flip_outside=True)`

**Returns:** `bool` — whether mesh faces point outward.

### `is_convex()`

**Returns:** `bool` — whether the mesh is convex.

### `enclose(pos)`

**Returns:** `bool` — whether `pos` is inside the mesh.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `pos` | `Vec3d` | Point to test |

### `bound_aabb()`

**Returns:** `tuple[Vec3d, Vec3d]` — axis-aligned bounding box (min, max).

### `get_center()`

**Returns:** `Vec3d` — geometric center.

### `get_surface_area()`

**Returns:** `float` — total surface area.

### `volume()`

**Returns:** `float` — enclosed volume.

### `inertia()`

**Returns:** `Mat3d` — inertia tensor.

### `print_info()`

Print mesh summary to console.

## Example: Create from an STL model

```python
import phynexis

# Create a sphere STL model
sphere = phynexis.utils.shape.Sphere(2.0)
stl = sphere.get_stl_model(100)

# Convert to TriangleMesh
verts = stl.vertices
facs = stl.facets
tm = phynexis.utils.TriangleMesh(verts, facs)

print("vertices:", len(tm.vertices))
print("facets:", len(tm.facets))
print("center:", tm.get_center())
print("surface area:", tm.get_surface_area())
print("volume:", tm.volume())
print("is convex:", tm.is_convex())
print("size:", tm.size())

# Standardize
tm.standardize()
print("after standardize, size:", tm.size())
```

**Output:**

```text
vertices: 100
facets: 196
center: Vec3d(-1.93564e-05, -1.91317e-05, 2.17567e-05)
surface area: 12.185203306519597
volume: 3.960783893791801
is convex: True
size: 1.9630325835510383
after standardize, size: 1.0000000000000009
```

## Example: Create from vertices and facets

```python
import phynexis

# Single triangle
tm = phynexis.utils.TriangleMesh()
tm.vertices = [
    phynexis.utils.Vec3d(0.0, 0.0, 0.0),
    phynexis.utils.Vec3d(1.0, 0.0, 0.0),
    phynexis.utils.Vec3d(0.0, 1.0, 0.0),
]
tm.facets = [phynexis.utils.Vec3i(0, 1, 2)]

print("vertices:", len(tm.vertices))
print("facets:", len(tm.facets))
print("center:", tm.get_center())
print("surface area:", tm.get_surface_area())
print("volume:", tm.volume())
```

**Output:**

```text
vertices: 3
facets: 1
center: Vec3d(0.333333, 0.333333, 0)
surface area: 0.5
volume: 0.0
```
