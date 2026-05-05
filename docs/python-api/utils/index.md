---
title: "utils"
displayed_sidebar: pythonApiSidebar
---

# phynexis.utils

Utility module providing helper classes and functions for console logging, string manipulation, time measurement, signed distance fields, mesh I/O, sampling, math, and more.

## Import

```python
import phynexis

# Access submodule directly
phynexis.utils.info("hello")

# Or bind locally
from phynexis import utils
utils.info("hello")
```

## Module Overview

| Class / Function | Description |
|------------------|-------------|
| [Config](console.md#config) | Console output configuration |
| [debug / info / warning / error / fatal / plain](console.md) | Logging functions |
| [set_level / set_verbose / set_color](console.md) | Console control functions |
| [to_string](string-utils.md) | Numeric to string conversion |
| [get_time_micros](time-utils.md) | High-resolution timestamp |
| [MiniMapIdx64](mini-map.md) | Lightweight index map |
| [SDFCalculator](sdf-calculator.md) | Signed distance field calculator |
| [LevelSetField](level-set-function.md) | Level set field representation |
| [STLModel / read / read_off / write_off](mesh/stl-model.md) | 3D triangle mesh and mesh I/O |
| [SurfaceMesh](mesh/surface-mesh.md) | Surface mesh struct |
| [DataIO](serde/data-io.md) | Tabular data I/O |
| [SaveOptions / LoadOptions / FileFormat](serde/save-load-options.md) | File save/load options and format resolution |
| [format_from_extension / format_from_path / join_path_file](serde/save-load-options.md) | File format and path utilities |
| [Voronoi](voronoi/voronoi.md) | Voronoi tessellation (Tessellation / Diagram) |
| [Cork](wrappers/cork.md) | Boolean mesh operations (CorkWrapper) |
| [OpenMP / parallel](parallel/open-mp.md) | Thread control bindings |
| [FPE Traps](fpe-trap.md) | Floating-point exception trap utilities |
| [Vec2d/Vec2i/Vec3d/Vec3i/Vec4d/Vec4i/Vec6d](types/vector-matrix.md) | Fixed-size vectors |
| [Mat2d/Mat3d](types/vector-matrix.md) | Fixed-size matrices |
| [FlatHashMap](types/flat-hash-map.md) | Flat hash map |
| [Shape](shape/index.md) | Geometric shapes (Sphere, Cuboid, Ellipsoid, Cylinder, ...) |
| [math](math/math.md) | Math constants, vector ops, quaternion |
| [sampling](sampling/sampling.md) | Distribution, spatial, orientation, spherical sampling |
| [vtk](vtk/vtk.md) | VTK file I/O and conversion |
| [wrappers](wrappers/wrappers.md) | Cork, CGAL, Eigen, igl, TetGen wrappers with MPI utilities |

## C++ Namespace

`phynexis::utils`

## pybind Module

`pyutils` (lazy-loaded via `phynexis.utils`)


## See also

- [Manual home](../../manual/index.md) — installation, basic usage, CFD–DEM, visualization
- [Python API overview](../index.md) — submodule map and coverage notes
- [phynexis.fields](../fields/index.md) — field types and layouts
- [Deprecated flat references](../deprecated/README.md) — legacy v0 pages
