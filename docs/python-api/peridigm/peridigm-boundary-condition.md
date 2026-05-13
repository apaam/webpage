---
title: "PeriDigmBoundaryCondition"
displayed_sidebar: pythonApiSidebar
---

# PeriDigmBoundaryCondition

> **C++**: `phynexis::peridigm::PeriDigmBoundaryCondition`  
> **Python**: `phynexis.peridigm.PeriDigmBoundaryCondition`  
> **Header**: `src/peridigm/peridigm_boundary_condition.hpp`

## Description

Defines a boundary condition for peridynamic simulations. Supports prescribed displacement or body force, with time-dependent or constant loading profiles.

## Constructors

### `PeriDigmBoundaryCondition()`

Default constructor with `type = Type.Prescribed_Displacement` and all dimensions activated.

**Example:**
```python
import phynexis
bc = phynexis.peridigm.PeriDigmBoundaryCondition()
print(bc.type)
```

**Output:**
```text
Type.Prescribed_Displacement
```

## Methods

### `insert_node(node_set_id)`

Adds a node to the boundary condition set.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| node_set_id | int | Node index to add |

**Example:**
```python
bc = phynexis.peridigm.PeriDigmBoundaryCondition()
bc.insert_node(0)
bc.insert_node(1)
print(list(bc.node_indices))
```

**Output:**
```text
[0, 1]
```

### `set_activated_dimensions(x, y, z)`

Sets which dimensions are activated by this boundary condition.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| x | bool | Activate x axis |
| y | bool | Activate y axis |
| z | bool | Activate z axis |

### `set_by_displacement_rate(x, y, z)`

Sets a time-dependent boundary condition by displacement rate.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| x | float | Displacement rate along x |
| y | float | Displacement rate along y |
| z | float | Displacement rate along z |

### `set_by_ultimate_displacement(x, y, z, t)`

Sets a constant boundary condition by ultimate displacement.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| x | float | Ultimate displacement along x |
| y | float | Ultimate displacement along y |
| z | float | Ultimate displacement along z |
| t | float | Mechanical time |

### `set_by_loading_rate(x, y, z)`

Sets a time-dependent boundary condition by loading rate (body force).

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| x | float | Loading rate along x |
| y | float | Loading rate along y |
| z | float | Loading rate along z |

### `set_by_ultimate_loading(x, y, z, t)`

Sets a constant boundary condition by ultimate loading.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| x | float | Ultimate loading along x |
| y | float | Ultimate loading along y |
| z | float | Ultimate loading along z |
| t | float | Mechanical time |

### `write_input_file(os, node_set_id)`

Writes the boundary condition to a Peridigm input file stream.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| os | file-like | Output stream |
| node_set_id | int | Node set index |

### `write_node_set_file(result_dir, node_set_id)`

Writes the node set file to the specified directory.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| result_dir | str | Output directory |
| node_set_id | int | Node set index |

## Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `type` | `PeriDigmBoundaryCondition.Type` | read/write | Boundary condition type |
| `node_indices` | `list[int]` | read/write | Affected node indices |
| `dim_activated` | `list[bool]` | read/write | Activated dimensions `[x, y, z]` |
| `disp_rate` | `Vec3d` | read/write | Displacement rate |
| `loading_rate` | `Vec3d` | read/write | Loading rate |
| `disp` | `Vec3d` | read/write | Ultimate displacement |
| `loading` | `Vec3d` | read/write | Ultimate loading |
| `mech_time` | `float` | read/write | Mechanical time |

## Enums

### `Type`

| Value | Description |
|-------|-------------|
| `Prescribed_Displacement` | Fixed or time-varying displacement |
| `Body_Force` | External body force loading |
