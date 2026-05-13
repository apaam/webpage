---
title: "LevelSetSplittor"
displayed_sidebar: pythonApiSidebar
---

# LevelSetSplittor

> **C++**: `phynexis::peridigm::LevelSetSplittor`  
> **Python**: `phynexis.peridigm.LevelSetSplittor`  
> **Header**: `src/peridigm/level_set_splittor.hpp`

## Description

Domain splitter that uses a level set (signed distance) function to define the geometry. Supports initialization from STL models or distance map files.

Inherits from [`DomainSplittor`](domain-splittor.md) and `LevelSetField`.

## Constructors

### `LevelSetSplittor()`

Creates an empty level set splitter.

**Example:**
```python
import phynexis
splittor = phynexis.peridigm.LevelSetSplittor()
print(type(splittor))
```

**Output:**
```text
<class 'phynexis.lib.pyperidigm.LevelSetSplittor'>
```

## Methods

### `init_from_stl(stl_model, num_ele_each)`

Initializes the splitter from an `STLModel` object, creating an internal level set representation.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| stl_model | STLModel | STL model object |
| num_ele_each | int | Number of elements in each dimension |

### `init_from_distance_map(file_name)`

Initializes from a distance map text file.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| file_name | str | Path to the distance map file |

### `init_from_distance_map(corner_x, corner_y, corner_z, sp, dim_x, dim_y, dim_z, dist_list)`

Initializes from an explicit list of distances on a regular grid.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| corner_x | float | X coordinate of grid corner |
| corner_y | float | Y coordinate of grid corner |
| corner_z | float | Z coordinate of grid corner |
| sp | float | Grid spacing |
| dim_x | int | Number of grid points along x |
| dim_y | int | Number of grid points along y |
| dim_z | int | Number of grid points along z |
| dist_list | list[float] | Distance values (flattened grid) |

### Inherited from DomainSplittor

- `get_peridigm_nodes()`
- `get_stl_model()` / `get_stl_model(indices)`
- `make_porosity(porosity)`
