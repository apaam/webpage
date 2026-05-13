---
title: "DomainSplittor"
displayed_sidebar: pythonApiSidebar
---

# DomainSplittor

> **C++**: `phynexis::peridigm::DomainSplittor`  
> **Python**: `phynexis.peridigm.DomainSplittor`  
> **Header**: `src/peridigm/domain_splittor.hpp`

## Description

Abstract base class for domain splitting algorithms used to discretize a geometry into peridynamic nodes and volumes.

This class cannot be instantiated directly. Use concrete subclasses:
- [`LevelSetSplittor`](level-set-splittor.md) — level set based splitting
- [`TetMeshSplittor`](tet-mesh-splittor.md) — tetrahedral mesh based splitting

## Constructors

None (abstract class).

## Methods

### `init_from_stl(stl_file, num_ele_each)`

Initializes the splitter from an STL file path.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| stl_file | str | Path to the STL file |
| num_ele_each | int | Number of elements in each dimension |

### `get_peridigm_nodes()`

Returns the discretized nodes and their volumes.

**Returns:** `(list[Vec3d], list[float])` — tuple of (node positions, node volumes)

**Example:**
```python
import phynexis
# Use a concrete subclass
splittor = phynexis.peridigm.LevelSetSplittor()
# ... initialize ...
nodes, vols = splittor.get_peridigm_nodes()
print(f"{len(nodes)} nodes")
```

### `get_stl_model()`

Returns an STL model representing the discretized domain.

**Returns:** `STLModel`

### `get_stl_model(indices)`

Returns an STL model for a subset of elements.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| indices | list[int] | Indices of elements to include |

**Returns:** `STLModel`

### `make_porosity(porosity)`

Randomly removes elements to achieve the specified porosity.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| porosity | float | Desired porosity (0–1) |
