---
title: "Cork"
displayed_sidebar: pythonApiSidebar
---

# Cork

> **C++**: `phynexis::utils::wrappers::CorkWrapper`
> **Python**: `phynexis.utils.wrappers.CorkWrapper`
> **Header**: `src/utils/wrappers/cork_wrapper.hpp`

Boolean operations on triangle meshes (intersection, union, difference, XOR) via the Cork library.

---

## Description

`CorkWrapper` has no default constructor in Python. It is typically accessed through the `wrappers` submodule or used via the `Tessellation` class when `use_cork=True`.

---

## Methods

### `mesh_intersect(v1, f1, v2, f2, out_v, out_f, out_info)`

Compute intersection of two meshes.

### `mesh_union(v1, f1, v2, f2, out_v, out_f, out_info)`

Compute union of two meshes.

### `mesh_difference(v1, f1, v2, f2, out_v, out_f, out_info)`

Compute difference (mesh1 − mesh2).

### `mesh_xor(v1, f1, v2, f2, out_v, out_f, out_info)`

Compute symmetric difference.

**Parameters:**
| Parameter | Type | Description |
|------|------|------|
| `v1, v2` | `list[Vec3d]` | Input mesh vertices |
| `f1, f2` | `list[Vec3i]` | Input mesh faces |
| `out_v` | `list[Vec3d]` | Output vertices (inout) |
| `out_f` | `list[Vec3i]` | Output faces (inout) |
| `out_info` | `list[int]` | Output labels (inout, optional) |

---

## Note

- The overload without `out_info` is also available.
- A specialized `mesh_intersect` with tolerance and direction exists for ray-like intersection tests.
- `CorkWrapper` instance access in Python is currently limited. Consider using STLModel-based boolean operations if available.

---

## Unexposed C++ API

- Default constructor for direct instantiation
