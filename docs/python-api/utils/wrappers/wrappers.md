---
title: "wrappers"
displayed_sidebar: pythonApiSidebar
---

# wrappers

> **C++**: `phynexis::utils::wrappers`
> **Python**: `phynexis.utils.wrappers`
> **Header**: `src/utils/wrappers/*.hpp`

Thin wrappers around external libraries (Cork, CGAL, Eigen, igl, TetGen) providing mesh boolean operations, linear algebra, mesh processing, and tetrahedralization.


## CorkWrapper

Boolean mesh operations via the Cork library.

| Method | Description |
|--------|-------------|
| `mesh_union(m1, m2)` | Union of two meshes |
| `mesh_intersect(m1, m2)` | Intersection of two meshes |
| `mesh_difference(m1, m2)` | Difference (m1 − m2) |
| `mesh_xor(m1, m2)` | Symmetric difference |

**Note**: `CorkWrapper` has no default constructor exposed. Access methods via the class itself (static/class methods).


## EigenWrapper

Linear algebra utilities via Eigen.

| Method | Description |
|--------|-------------|
| `solve_linear_eqn(A, b)` | Solve Ax = b |
| `get_eigen_vector(A, index)` | Get eigenvector by index |


## IGLWrapper

Mesh processing utilities via libigl.

| Method | Description |
|--------|-------------|
| `convex_hull(vertices, facets)` | Compute convex hull |
| `mesh_decimate(vertices, facets, target)` | Mesh simplification |
| `mesh_refine(vertices, facets)` | Mesh subdivision |
| `reorient_facets(vertices, facets)` | Ensure consistent facet orientation |
| `remove_duplicate_vertices(vertices, facets)` | Remove duplicate vertices |
| `remove_unreferenced_vertices(vertices, facets)` | Clean unreferenced vertices |
| `marching_cubes(field, corner, spacing, isovalue)` | Extract isosurface |
| `mesh_intersect(ray_origin, ray_dir, vertices, facets)` | Ray-mesh intersection |
| `facet_components(vertices, facets)` | Connected component labeling |
| `check_winding(vertices, facets)` | Check winding order |
| `get_points_inside_mesh(points, vertices, facets)` | Point-in-mesh test |
| `tetmesh_boundary(vertices, tets)` | Extract boundary surface from tetrahedral mesh |


## CGALWrapper

Computational geometry via CGAL.

| Method | Description |
|--------|-------------|
| `get_alpha_shape(points, alpha)` | Compute alpha shape |
| `get_tetmesh(vertices, facets)` | Tetrahedral mesh generation |
| `smooth_mesh(vertices, facets, iterations)` | Mesh smoothing |


## mpi

MPI wrapper utilities (if MPI is available).

| Function | Description |
|----------|-------------|
| `comm_rank()` | Get the rank of the current process |
| `comm_size()` | Get total number of MPI processes |
| `is_initialized()` | Check if MPI has been initialized |

**Returns:** `int` / `bool`


## TetGenOptions

Configuration object for tetrahedral mesh generation.

### Constructor

#### `TetGenOptions()`

Default: `max_volume=0.0`, `min_dihedral=0.0`, `verbose=False`, `quiet=True`, `no_boundary_split=False`, `refine=False`.

### Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `max_volume` | `float` | read/write | Maximum tetrahedron volume (0 = no limit) |
| `min_dihedral` | `float` | read/write | Minimum dihedral angle constraint |
| `verbose` | `bool` | read/write | Enable verbose output |
| `quiet` | `bool` | read/write | Suppress console output |
| `no_boundary_split` | `bool` | read/write | Preserve boundary facets |
| `refine` | `bool` | read/write | Refine existing mesh |

### Static Methods

#### `default_options()`

Return a default options instance.

#### `quality()`

Return options preset for quality mesh generation.

#### `volume_constrained()`

Return options preset for volume-constrained meshing.

#### `from_mesh_size()`

Return options preset derived from mesh size.


## `tetgen_get_tetmesh(vertices, facets, options)`

Generate a tetrahedral mesh from a surface mesh using TetGen.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `vertices` | `list[Vec3d]` | Surface mesh vertices |
| `facets` | `list[Vec3i]` | Surface triangle indices |
| `options` | `TetGenOptions` | Optional (default: `default_options()`) |

**Returns:** `tuple(list[Vec3d], list[Vec4i])` — Tetrahedral mesh (vertices, tets)


## Example

```python
import phynexis

# List available methods
print("CorkWrapper:", [x for x in dir(phynexis.utils.wrappers.CorkWrapper) if not x.startswith("_")])
print("IGLWrapper:", [x for x in dir(phynexis.utils.wrappers.IGLWrapper) if not x.startswith("_")])
print("CGALWrapper:", [x for x in dir(phynexis.utils.wrappers.CGALWrapper) if not x.startswith("_")])

# TetGenOptions usage
opts = phynexis.utils.wrappers.TetGenOptions()
print("TetGenOptions defaults:", opts.max_volume, opts.verbose, opts.quiet)

# Presets
quality_opts = phynexis.utils.wrappers.TetGenOptions.quality()
print("quality preset max_volume:", quality_opts.max_volume)

# mpi info
print("mpi initialized:", phynexis.utils.wrappers.mpi.is_initialized())
```

**Output:**
```text
CorkWrapper: ['mesh_difference', 'mesh_intersect', 'mesh_union', 'mesh_xor']
IGLWrapper: ['check_winding', 'convex_hull', 'facet_components', 'get_points_inside_mesh', 'marching_cubes', 'mesh_decimate', 'mesh_intersect', 'mesh_refine', 'remove_duplicate_vertices', 'remove_unreferenced_vertices', 'reorient_facets', 'tetmesh_boundary']
CGALWrapper: ['get_alpha_shape', 'get_tetmesh', 'smooth_mesh']
TetGenOptions defaults: 0.0 False True
quality preset max_volume: 0.0
mpi initialized: False
```


## Known Issues

- `CorkWrapper` has no default constructor. Methods must be called as `CorkWrapper.mesh_union(...)` rather than creating an instance.
- Most wrapper methods use `VecX<Vec3d>&` (mutable reference) arguments in their lambda bindings. Even though `VecX<T>` type_caster is now registered, pybind11 cannot bind a temporary converted object to a non-const reference. Methods like `IGLWrapper.convex_hull`, `CorkWrapper.mesh_union`, etc. require binding fixes to accept values or use output tuples instead of output reference parameters.
- `TetGenOptions` is exposed but its constructor and properties may have limited binding coverage.


## Unexposed C++ API

- `EigenAdapter` / `EigenWrapper` internal matrix conversion helpers
- `mpi` wrapper full MPI collective operations
