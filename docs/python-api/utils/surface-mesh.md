---
title: "SurfaceMesh"
displayed_sidebar: pythonApiSidebar
---

# SurfaceMesh

> **C++**: `phynexis::utils::mesh::SurfaceMesh`
> **Python**: `phynexis.utils.SurfaceMesh`
> **Header**: `src/utils/mesh/surface_mesh.hpp`

Minimal struct representing a surface mesh as vertices and triangular facets.

---

## Constructor

### `SurfaceMesh()`

Creates an empty mesh.

---

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `vertices` | `list[Vec3d]` | Vertex positions (read/write) |
| `facets` | `list[Vec3u]` | Triangle face indices (read/write) |

---

## Example

```python
import phynexis

sm = phynexis.utils.SurfaceMesh()
sm.vertices = [
    phynexis.utils.Vec3d(0.0, 0.0, 0.0),
    phynexis.utils.Vec3d(1.0, 0.0, 0.0),
    phynexis.utils.Vec3d(0.0, 1.0, 0.0),
]
sm.facets = [phynexis.utils.Vec3u(0, 1, 2)]

print("vertices:", len(sm.vertices))
print("facets:", len(sm.facets))
print("first vertex:", sm.vertices[0])
```

**Output:**
```text
vertices: 3
facets: 1
first vertex: Vec3d(0, 0, 0)
```

---

## Unexposed C++ API

- `SurfaceMesh` is a simple POD struct. No additional methods are defined.
