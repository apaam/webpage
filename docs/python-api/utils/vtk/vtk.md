---
title: "vtk"
displayed_sidebar: pythonApiSidebar
---

# vtk

> **C++**: `phynexis::utils::vtk`
> **Python**: `phynexis.utils.vtk`
> **Header**: `src/utils/vtk/*.hpp`

VTK file I/O utilities for reading and writing point data, surface meshes, tetrahedral meshes, and line sets. Supports legacy VTK and VTK-HDF formats.

---

## Data Classes

| Class | Description |
|-------|-------------|
| `VtkData` | Container for VTK dataset with points, cells, point data, cell data |
| `VtkTopology` | Cell connectivity and type information |
| `PointData` | Scalar/vector data attached to mesh points |
| `CellData` | Scalar/vector data attached to mesh cells |

---

## Read Functions

| Function | Description |
|----------|-------------|
| `read_points(filename)` | Read point cloud from VTK |
| `read_surface(filename)` | Read surface mesh from VTK |
| `read_tetrahedra(filename)` | Read tetrahedral mesh from VTK |
| `read_lines(filename)` | Read line/polygon data from VTK |

---

## Write Functions

| Function | Description |
|----------|-------------|
| `write_points(filename, points, point_data=None)` | Write point cloud to VTK |
| `write_surface(filename, vertices, facets, point_data=None, cell_data=None)` | Write surface mesh to VTK |
| `write_tetrahedra(filename, vertices, tets, point_data=None, cell_data=None)` | Write tetrahedral mesh to VTK |
| `write_with_lines(filename, vertices, lines, point_data=None)` | Write line set to VTK |

---

## Format Detection

| Function | Description |
|----------|-------------|
| `is_vtkhdf_format(filename)` | Check if file is VTK-HDF format |
| `detect_vtkhdf_format(filename)` | Detect VTK-HDF format variant |

---

## Example

```python
import phynexis

# Format detection
print("is_vtkhdf:", phynexis.utils.vtk.is_vtkhdf_format("/path/to/data.vtkhdf"))

# Data classes exist but their constructors and methods may require
# additional VecX type registrations for full functionality.
```

---

## Known Issues

- `VtkData`, `PointData`, `CellData` constructors and property access may fail if `VecX<T>` return types are not registered.
- Some read/write functions expect `VecX<Vec3d>` or `VecX<int>` arguments which may not be registered.

---

## Unexposed C++ API

- `VtkReader` / `VtkWriter` internal implementations
- `VtkHDF` reader/writer specialized for HDF5 backend
- `format_detection` internals
