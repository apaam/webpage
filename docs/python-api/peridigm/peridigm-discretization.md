---
title: "PeriDigmDiscretization"
displayed_sidebar: pythonApiSidebar
---

# PeriDigmDiscretization

> **C++**: `phynexis::peridigm::PeriDigmDiscretization`  
> **Python**: `phynexis.peridigm.PeriDigmDiscretization`  
> **Header**: `src/peridigm/peridigm_discretization.hpp`

## Description

Represents the spatial discretization of a domain into peridynamic nodes. Supports initialization from STL files, STL models, distance maps, or regular grids.

## Constructors

### `PeriDigmDiscretization()`

Default constructor. Creates an empty discretization with `type = Type.level_set`.

**Example:**
```python
import phynexis
disc = phynexis.peridigm.PeriDigmDiscretization()
print(disc.type)
```

**Output:**
```text
Type.level_set
```

## Methods

### `init_from_stl(stl_file, num_ele_each)`

Initializes the discretization from an STL file.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| stl_file | str | Path to the STL file |
| num_ele_each | int | Number of elements in each dimension |

**Example:**
```python
disc = phynexis.peridigm.PeriDigmDiscretization()
# Requires a valid STL file:
# disc.init_from_stl("/path/to/model.stl", 20)
# print(len(disc.nodes))
```

### `init_from_stl(stl_model, num_ele_each)`

Overloaded version that accepts an `STLModel` object directly.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| stl_model | STLModel | STL model object |
| num_ele_each | int | Number of elements in each dimension |

**Example:**
```python
# stl = phynexis.utils.STLModel()
# ... load or create stl ...
# disc = phynexis.peridigm.PeriDigmDiscretization()
# disc.init_from_stl(stl, 20)
```

### `init_from_distance_map(txt_file)`

Initializes the discretization from a distance map text file.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| txt_file | str | Path to the distance map file |

### `initialize_from_grid(corner, len, num_ele_each)`

Initializes the discretization from a regular grid.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| corner | Vec3d | Corner of the grid (minimum x,y,z) |
| len | Vec3d | Length of the grid in each dimension |
| num_ele_each | int | Number of elements in each dimension |

**Example:**
```python
disc = phynexis.peridigm.PeriDigmDiscretization()
corner = phynexis.utils.Vec3d(0, 0, 0)
length = phynexis.utils.Vec3d(1, 1, 1)
disc.initialize_from_grid(corner, length, 10)
print(len(disc.nodes))
```

### `make_porosity(porosity)`

Scales node volumes to achieve the specified porosity fraction.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| porosity | float | Desired porosity (0–1) |

### `write_node_file(result_dir)`

Writes node information to the specified directory.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| result_dir | str | Output directory path |

### `get_node_size()`

Returns the average node size computed from adjacent node distances.

**Returns:** `float` — average node size

## Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `type` | `PeriDigmDiscretization.Type` | read/write | Discretization type (`level_set` or `tetmesh`) |
| `domain_splittor` | `DomainSplittor` | read/write | Domain splittor used |
| `nodes` | `list[Vec3d]` | read/write | Node positions |
| `node_block_indices` | `list[int]` | read/write | Block index for each node |
| `node_vols` | `list[float]` | read/write | Volume for each node |

## Enums

### `Type`

| Value | Description |
|-------|-------------|
| `level_set` | Level set based discretization |
| `tetmesh` | Tetrahedral mesh based discretization |
