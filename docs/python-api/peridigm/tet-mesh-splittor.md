---
title: "TetMeshSplittor"
displayed_sidebar: pythonApiSidebar
---

# TetMeshSplittor

> **C++**: `phynexis::peridigm::TetMeshSplittor`  
> **Python**: `phynexis.peridigm.TetMeshSplittor`  
> **Header**: `src/peridigm/tetmesh_splittor.hpp`

## Description

Domain splitter that uses a tetrahedral mesh to define the geometry. The internal `tetmesh` field holds the `netfem::TetraMesh` used for discretization.

Inherits from [`DomainSplittor`](domain-splittor.md).

## Constructors

### `TetMeshSplittor()`

Creates an empty tetrahedral mesh splitter.

**Example:**
```python
import phynexis
splittor = phynexis.peridigm.TetMeshSplittor()
print(type(splittor))
```

**Output:**
```text
<class 'phynexis.lib.pyperidigm.TetMeshSplittor'>
```

## Methods

### `init_from_stl(stl_model, num_ele_each)`

Initializes the splitter from an `STLModel` object, generating an internal tetrahedral mesh.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| stl_model | STLModel | STL model object |
| num_ele_each | int | Number of elements in each dimension |

### Inherited from DomainSplittor

- `get_peridigm_nodes()`
- `get_stl_model()` / `get_stl_model(indices)`
- `make_porosity(porosity)`

## Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `tetmesh` | `TetraMesh` | read/write | Internal tetrahedral mesh |
