---
title: "wrappers"
displayed_sidebar: pythonApiSidebar
---

# wrappers

> **C++**: `phynexis::utils::wrappers`
> **Python**: `phynexis.utils.wrappers`
> **Header**: `src/utils/wrappers/*.hpp`

Thin wrappers around external libraries (Cork, CGAL, Eigen, igl, TetGen) providing mesh boolean operations, linear algebra, mesh processing, and tetrahedralization.

---

## CorkWrapper

Boolean mesh operations via the Cork library.

| Method | Description |
|--------|-------------|
| `mesh_union(m1, m2)` | Union of two meshes |
| `mesh_intersect(m1, m2)` | Intersection of two meshes |
| `mesh_difference(m1, m2)` | Difference (m1 − m2) |
| `mesh_xor(m1, m2)` | Symmetric difference |

**Note**: `CorkWrapper` has no default constructor exposed. Access methods via the class itself (static/class methods).

---

## EigenWrapper

Linear algebra utilities via Eigen.

| Method | Description |
|--------|-------------|
| `solve_linear_eqn(A, b)` | Solve Ax = b |
| `get_eigen_vector(A, index)` | Get eigenvector by index |

---

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

---

## CGALWrapper

Computational geometry via CGAL.

| Method | Description |
|--------|-------------|
| `get_alpha_shape(points, alpha)` | Compute alpha shape |
| `get_tetmesh(vertices, facets)` | Tetrahedral mesh generation |
| `smooth_mesh(vertices, facets, iterations)` | Mesh smoothing |

---

## mpi

MPI wrapper utilities (if MPI is available).

---

## Example

```python
import phynexis

# CorkWrapper — access via class methods
try:
    # These require two STLModel instances
    result = phynexis.utils.wrappers.CorkWrapper.mesh_union(m1, m2)
except Exception as e:
    print("CorkWrapper requires valid mesh inputs")

# List available methods
print("CorkWrapper:", [x for x in dir(phynexis.utils.wrappers.CorkWrapper) if not x.startswith("_")])
print("IGLWrapper:", [x for x in dir(phynexis.utils.wrappers.IGLWrapper) if not x.startswith("_")])
print("CGALWrapper:", [x for x in dir(phynexis.utils.wrappers.CGALWrapper) if not x.startswith("_")])
```

**Output:**
```text
CorkWrapper: ['mesh_difference', 'mesh_intersect', 'mesh_union', 'mesh_xor']
IGLWrapper: ['check_winding', 'convex_hull', 'facet_components', 'get_points_inside_mesh', 'marching_cubes', 'mesh_decimate', 'mesh_intersect', 'mesh_refine', 'remove_duplicate_vertices', 'remove_unreferenced_vertices', 'reorient_facets', 'tetmesh_boundary']
CGALWrapper: ['get_alpha_shape', 'get_tetmesh', 'smooth_mesh']
```

---

## Known Issues

- `CorkWrapper` has no default constructor. Methods must be called as `CorkWrapper.mesh_union(...)` rather than creating an instance.
- Most wrapper methods use `VecX<Vec3d>&` (mutable reference) arguments in their lambda bindings. Even though `VecX<T>` type_caster is now registered, pybind11 cannot bind a temporary converted object to a non-const reference. Methods like `IGLWrapper.convex_hull`, `CorkWrapper.mesh_union`, etc. require binding fixes to accept values or use output tuples instead of output reference parameters.
- `TetGenOptions` is exposed but its constructor and properties may have limited binding coverage.

---

## Unexposed C++ API

- `EigenAdapter` / `EigenWrapper` internal matrix conversion helpers
- `mpi` wrapper full MPI collective operations
- `tetgen_get_tetmesh` factory function
