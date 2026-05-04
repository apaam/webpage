---
title: "vtk"
displayed_sidebar: pythonApiSidebar
---

# vtk

> **C++**: `phynexis::utils::vtk`
> **Python**: `phynexis.utils.vtk`
> **Header**: `src/utils/vtk/*.hpp`

VTK file I/O utilities for reading and writing point data, surface meshes, tetrahedral meshes, and line sets. Supports legacy VTK and VTK-HDF formats.


## Data Classes

| Class | Description |
|-------|-------------|
| `VtkData` | Container for VTK dataset with points, cells, point data, cell data |
| `VtkTopology` | Cell connectivity and type information |
| `PointData` | Scalar/vector data attached to mesh points |
| `CellData` | Scalar/vector data attached to mesh cells |


## Read Functions

| Function | Description |
|----------|-------------|
| `read_points(filename)` | Read point cloud from VTK |
| `read_surface(filename)` | Read surface mesh from VTK |
| `read_tetrahedra(filename)` | Read tetrahedral mesh from VTK |
| `read_lines(filename)` | Read line/polygon data from VTK |


## Write Functions

| Function | Description |
|----------|-------------|
| `write_points(filename, points, point_data=None)` | Write point cloud to VTK |
| `write_surface(filename, vertices, facets, point_data=None, cell_data=None)` | Write surface mesh to VTK |
| `write_tetrahedra(filename, vertices, tets, point_data=None, cell_data=None)` | Write tetrahedral mesh to VTK |
| `write_with_lines(filename, vertices, lines, point_data=None)` | Write line set to VTK |


## Format Detection

| Function | Description |
|----------|-------------|
| `is_vtkhdf_format(filename)` | Check if file is VTK-HDF format |
| `detect_vtkhdf_format(filename)` | Detect VTK-HDF format variant |


## Example

```python
import phynexis

# Format detection
print("is_vtkhdf:", phynexis.utils.vtk.is_vtkhdf_format("/path/to/data.vtkhdf"))

# Data classes exist but their constructors and methods may require
# additional VecX type registrations for full functionality.
```


## Conversion Functions

Top-level functions for converting between VTK data and phynexis types.

### `to_vtk(vtk_data, model)`

Populate a `VtkData` object from an `STLModel` or `Shape`.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `vtk_data` | `VtkData` | Target VTK data container (modified in-place) |
| `model` | `STLModel` or `Shape` | Source model |

### `from_vtk(vtk_data, model)`

Populate an `STLModel` from a `VtkData` object.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `vtk_data` | `VtkData` | Source VTK data |
| `model` | `STLModel` | Target model (modified in-place) |

**Example:**
```python
import phynexis

# Create a model from scratch
model = phynexis.utils.STLModel()
model.vertices = [
    phynexis.utils.Vec3d(0.0, 0.0, 0.0),
    phynexis.utils.Vec3d(1.0, 0.0, 0.0),
    phynexis.utils.Vec3d(0.0, 1.0, 0.0),
]
model.facets = [phynexis.utils.Vec3i(0, 1, 2)]
print("original vertices:", len(model.vertices))

# Convert to VtkData
out_data = phynexis.utils.vtk.VtkData()
phynexis.utils.to_vtk(out_data, model)
print("vtk points:", len(out_data.points()))

# Convert back from VtkData to STLModel
model2 = phynexis.utils.STLModel()
phynexis.utils.from_vtk(out_data, model2)
print("restored vertices:", len(model2.vertices))
print("restored facets:", len(model2.facets))
```

**Output:**
```text
original vertices: 3
vtk points: 3
restored vertices: 3
restored facets: 1
```


## Known Issues

- `VtkData` constructor and property access (`points()`, `facets()`, etc.) may fail if called on an uninitialized object. Always populate via `to_vtk()` or `read_surface()` before accessing data.


## Unexposed C++ API

- `VtkReader` / `VtkWriter` internal implementations
- `VtkHDF` reader/writer specialized for HDF5 backend
- `format_detection` internals
