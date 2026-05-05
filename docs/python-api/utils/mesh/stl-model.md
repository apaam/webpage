---
title: "STLModel"
displayed_sidebar: pythonApiSidebar
---

# STLModel

> **C++**: `phynexis::utils::STLModel`
> **Python**: `phynexis.utils.STLModel`
> **Header**: `src/utils/mesh/stl_model.hpp`

3D triangle mesh model supporting STL/OFF file I/O, geometric transformations, decimation, convex hull, and mesh analysis.


## Constructor

### `STLModel()`

Creates an empty model.

### `STLModel(vertices, facets)`

Creates a model from vertex and face arrays.

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `vertices` | `list[Vec3d]` | Vertex positions |
| `facets` | `list[Vec3i]` | Triangle face indices |

### `STLModel(file_path)`

Load from a file path (auto-detects format).


## Properties

| Property | Type | Description |
|------|------|------|
| `vertices` | `list[Vec3d]` | Model vertices (read/write) |
| `facets` | `list[Vec3i]` | Triangle face indices (read/write) |


## Methods

### `init_from_stl(file_path)` / `init_from_off(file_path)`

Load from STL or OFF file.

### `save_to(path, file, options)`

Save model to file with format options.

### `load_from(path, file, opt=LoadOptions())`

Load model from file with load options.

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `path` | `str` | Directory path |
| `file` | `str` | File name |
| `opt` | `LoadOptions` | Load options (create_directories, format_hint) |

### `transpose()` / `rotate(rotation)`

Apply geometric transformations.

### `copy_pose()` / `copy_pose_dev()`

Copy the model's current pose.

### `remove_unreferenced_vertices()` / `remove_duplicate_vertices()`

Clean up mesh topology.

### `reorient_facets()`

Ensure facet normals point outward.

### `decimate(target_num_faces)`

Reduce face count via mesh decimation.

### `standardize()`

Center at origin and scale to unit size.

### `set_size(size)`

Scale to a specific size.

### `make_convex()`

Convert to convex hull.

### `refine()` / `smooth_mesh(iterations)`

Subdivide or smooth the mesh.

### `merge(other_model)`

Merge with another STLModel.

### `size()`

Return characteristic size (diagonal of bounding box).

### `get_center()` / `get_surface_area()` / `volume()` / `inertia()`

Compute geometric properties.

### `is_convex()` / `is_face_outside(facet_index, point)` / `enclose(point)`

Convexity and containment tests.

### `bound_aabb()`

Return axis-aligned bounding box.

### `print_info()`

Print model summary.


## Static Methods

### `CenterOf(vertices, facets)` / `SurfaceAreaOf(vertices, facets)` / `VolumeOf(vertices, facets)` / `InertiaOf(vertices, facets)` / `check_convexity_of(vertices, facets)`

Compute properties from raw mesh data without creating an STLModel instance.


## Example

```python
import phynexis

# Create a mesh from a sphere shape
model = phynexis.utils.shape.Sphere(2.0).get_stl_model(200)

print("size:", model.size())
print("center:", model.get_center())
print("volume:", model.volume())
print("surface area:", model.get_surface_area())
print("is convex:", model.is_convex())

# Transformations
model.standardize()
print("after standardize, size:", model.size())
```

**Output:**
```text
size: 1.9814485316774066
center: Vec3d(-3.05057e-06, -1.61383e-05, -4.46186e-05)
volume: 4.073305749647874
surface area: 12.374617224062705
is convex: True
after standardize, size: 0.9999999999999999
```


## Example: Create from vertices and facets

```python
import phynexis

model = phynexis.utils.STLModel()
model.vertices = [
    phynexis.utils.Vec3d(0.0, 0.0, 0.0),
    phynexis.utils.Vec3d(1.0, 0.0, 0.0),
    phynexis.utils.Vec3d(0.0, 1.0, 0.0),
]
model.facets = [phynexis.utils.Vec3i(0, 1, 2)]

print("vertices:", len(model.vertices))
print("facets:", len(model.facets))
print("center:", model.get_center())
print("volume:", model.volume())
print("surface area:", model.get_surface_area())
```

**Output:**
```text
vertices: 3
facets: 1
center: Vec3d(0.333333, 0.333333, 0)
volume: 0.0
surface area: 0.5
```


## Mesh I/O Functions

Top-level functions for reading and writing mesh files.

### `read(filename)`

Read a mesh from an STL file.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `filename` | `str` | Path to STL file |

**Returns:** `STLModel`

### `read_off(filename)`

Read a mesh from an OFF file.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `filename` | `str` | Path to OFF file |

**Returns:** `STLModel`

### `write_off(filename, model)`

Write an `STLModel` to an OFF file.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `filename` | `str` | Output OFF file path |
| `model` | `STLModel` | Model to save |

**Example:**
```python
import phynexis

# Read STL
model = phynexis.utils.read("/Users/lzhshou/Documents/myResearch/myProjects/apaam/repo/phynexis/data/sphere.stl")
print("vertices:", len(model.vertices), "facets:", len(model.facets))

# Write OFF
phynexis.utils.write_off("/tmp/sphere.off", model)
```

**Output:**
```text
vertices: 162
facets: 320
```


## Unexposed C++ API

- `get_triangle_strips()` — return type not fully exposed


## Visual Preview

Export the mesh to VTK and view it with any VTK-compatible viewer:

```python
import phynexis

model = phynexis.utils.shape.Sphere(2.0).get_stl_model(200)
opts = phynexis.utils.SaveOptions()
opts.overwrite = True
model.save_to('/tmp/', 'stl_preview.vtk', opts)
```

![STLModel visual preview](/img/python-api/stlmodel-preview.png){width=240}

![STLModel with edges (parallel projection)](/img/python-api/stlmodel-preview-edges.png){width=240}
