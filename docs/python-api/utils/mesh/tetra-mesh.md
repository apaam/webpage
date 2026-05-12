---
title: "TetraMesh"
displayed_sidebar: pythonApiSidebar
---

# TetraMesh

> **C++**: `phynexis::utils::mesh::TetraMesh`
> **Python**: `phynexis.utils.TetraMesh`
> **Header**: `src/utils/mesh/tetra_mesh.hpp`

Tetrahedral volume mesh: stores vertices and tetrahedra, with lazily computed boundary-derived data (surface facets, edges, nodes, and facet areas).

## Constructors

### `TetraMesh()`

Creates an empty tetrahedral mesh.

### `TetraMesh(other)`

Copy constructor.

### `TetraMesh(vertices, tetrahedra)`

Create from vertex and tetrahedron arrays.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `vertices` | `list[Vec3d]` | Vertex positions |
| `tetrahedra` | `list[Vec4i]` | Tetrahedron vertex indices (4 per cell) |

### `TetraMesh(surface, mesh_size)`

Generate tetrahedral mesh from a triangle surface mesh.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `surface` | `TriangleMesh` | Surface mesh to tetrahedralize |
| `mesh_size` | `float` | Target cell size |

### `TetraMesh(stl_model, mesh_size)`

Generate tetrahedral mesh from an STL model.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `stl_model` | `STLModel` | STL model to tetrahedralize |
| `mesh_size` | `float` | Target cell size |

### `TetraMesh(vertices, facets, mesh_size)`

Generate tetrahedral mesh from raw vertices and surface facets.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `vertices` | `list[Vec3d]` | Vertex positions |
| `facets` | `list[Vec3i]` | Surface triangle indices |
| `mesh_size` | `float` | Target cell size |

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `vertices` | `list[Vec3d]` | Vertex positions (read/write) |
| `tetrahedra` | `list[Vec4i]` | Tetrahedron vertex indices (read/write) |
| `surface_facets` | `list[Vec3i]` | Surface triangle facets (lazy-computed) |
| `surface_nodes` | `list[Vec3d]` | Surface vertex positions (lazy-computed) |
| `bound_facets` | `list[Vec3i]` | Boundary facets (lazy-computed) |
| `bound_edges` | `list[Vec2i]` | Boundary edges (lazy-computed) |
| `bound_nodes` | `list[int]` | Boundary node indices (lazy-computed) |
| `bound_facet_areas` | `list[float]` | Area of each boundary facet (lazy-computed) |
| `surface_node_linked_boundaries` | `list[list[int]]` | Boundary groups linked to each surface node (lazy-computed) |

## Methods

### `sync_boundary()`

Recompute all lazily-cached boundary data (surface facets, edges, nodes, areas). Called automatically when boundary properties are first accessed after a change.

### `invalidate_boundary_data()`

Mark boundary cache as stale. The next access to boundary properties will trigger a recomputation.

### `get_surface_stl()`

**Returns:** `STLModel` — surface mesh extracted from the tetrahedral boundary.

### `save_to(path, file, opt=SaveOptions())`

Save mesh to file.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `path` | `str` | — | Directory path |
| `file` | `str` | — | File name |
| `opt` | `SaveOptions` | `SaveOptions()` | Save options |

## Example: Tetrahedralize an STL model

TetGen internally prints timing and statistics to stdout; actual vertex/tetrahedra counts may vary slightly across runs due to floating-point ordering.

```python {no-extract}
import phynexis

# Create an STL sphere model
sphere = phynexis.utils.shape.Sphere(2.0)
stl = sphere.get_stl_model(100)

# Generate tetrahedral mesh with target cell size 0.5
tet = phynexis.utils.TetraMesh(stl, 0.5)

print("vertices:", len(tet.vertices))
print("tetrahedra:", len(tet.tetrahedra))
print("surface facets:", len(tet.surface_facets))
print("surface nodes:", len(tet.surface_nodes))

# Extract surface as STL
surface = tet.get_surface_stl()
print("surface stl vertices:", len(surface.vertices))
print("surface stl facets:", len(surface.facets))

# Save to VTK
opts = phynexis.utils.SaveOptions()
opts.overwrite = True
tet.save_to("/tmp/", "tetra_demo.vtk", opts)
```

## Example: Create from vertices and tetrahedra

```python
import phynexis

# Simple single-tetrahedron mesh
tet = phynexis.utils.TetraMesh()
tet.vertices = [
    phynexis.utils.Vec3d(0.0, 0.0, 0.0),
    phynexis.utils.Vec3d(1.0, 0.0, 0.0),
    phynexis.utils.Vec3d(0.0, 1.0, 0.0),
    phynexis.utils.Vec3d(0.0, 0.0, 1.0),
]
tet.tetrahedra = [phynexis.utils.Vec4i(0, 1, 2, 3)]

print("vertices:", len(tet.vertices))
print("tetrahedra:", len(tet.tetrahedra))
```

**Output:**

```text
vertices: 4
tetrahedra: 1
```
