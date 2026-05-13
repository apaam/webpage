---
title: "PeriDigmSimulator"
displayed_sidebar: pythonApiSidebar
---

# PeriDigmSimulator

> **C++**: `phynexis::peridigm::PeriDigmSimulator`  
> **Python**: `phynexis.peridigm.PeriDigmSimulator`  
> **Header**: `src/peridigm/peridigm_simulator.hpp`

## Description

Top-level simulator that orchestrates a peridynamic simulation. Manages the full pipeline: domain discretization, material and damage model definitions, block assignments, boundary conditions, and solver execution.

## Constructors

### `PeriDigmSimulator()`

Creates an empty simulator with default settings.

**Example:**
```python
import phynexis
sim = phynexis.peridigm.PeriDigmSimulator()
print(sim)
```

**Output:**
```text
<phynexis.lib.pyperidigm.PeriDigmSimulator object at 0x...>
```

## Methods

### `insert_material()`

Creates and inserts a new material into the simulation. Returns a reference to the newly created material.

**Returns:** `PeriDigmMaterial` — reference to the new material

**Example:**
```python
sim = phynexis.peridigm.PeriDigmSimulator()
mat = sim.insert_material()
mat.density = 2700.0
mat.youngs_modulus = 70e9
mat.poissons_ratio = 0.33
print(len(sim.materials))
```

**Output:**
```text
1
```

### `insert_damage_model()`

Creates and inserts a new damage model into the simulation.

**Returns:** `PeriDigmDamageModel` — reference to the new damage model

**Example:**
```python
sim = phynexis.peridigm.PeriDigmSimulator()
dm = sim.insert_damage_model()
dm.critical_stretch = 0.01
print(len(sim.damage_models))
```

**Output:**
```text
1
```

### `insert_block()`

Creates and inserts a new block into the simulation.

**Returns:** `PeriDigmBlock` — reference to the new block

**Example:**
```python
sim = phynexis.peridigm.PeriDigmSimulator()
block = sim.insert_block()
block.material_id = 0
block.damage_model_id = 0
print(len(sim.blocks))
```

**Output:**
```text
1
```

### `insert_boundary_condition()`

Creates and inserts a new boundary condition into the simulation.

**Returns:** `PeriDigmBoundaryCondition` — reference to the new boundary condition

### `clear()`

Removes all materials, damage models, blocks, and boundary conditions from the simulation.

**Example:**
```python
sim = phynexis.peridigm.PeriDigmSimulator()
sim.insert_material()
sim.insert_block()
print(len(sim.materials), len(sim.blocks))
sim.clear()
print(len(sim.materials), len(sim.blocks))
```

**Output:**
```text
1 1
0 0
```

### `initialize_default_setup()`

Initializes the default simulation setup based on the current discretization, using a single default material and damage model.

### `initialize_auto_timestep()`

Computes and sets an automatic timestep for the simulation based on material properties and discretization.

### `write_node_file()`

Writes the node file for the simulation.

### `write_node_set_file()`

Writes the node set file for the simulation.

### `write_input_file()`

Writes the complete input file in Peridigm-compatible format.

### `solve(mech_time)`

Runs the peridynamic simulation up to the specified mechanical time.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| mech_time | float | Mechanical time to solve up to |

### `set_up_result_directory()`

Creates the result directory specified in `settings.result_dir`.

### `clean_up_result_directory()`

Removes the result directory after simulation completion.

## Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `discretization` | `PeriDigmDiscretization` | read/write | Domain discretization |
| `materials` | `list[PeriDigmMaterial]` | read/write | List of materials |
| `damage_models` | `list[PeriDigmDamageModel]` | read/write | List of damage models |
| `blocks` | `list[PeriDigmBlock]` | read/write | List of blocks |
| `boundary_conditions` | `list[PeriDigmBoundaryCondition]` | read/write | List of boundary conditions |
| `settings` | `PeriDigmSettings` | read/write | Simulation settings |

## Example: Full Simulation Setup

```python
import phynexis

sim = phynexis.peridigm.PeriDigmSimulator()

# Discretize a sphere
disc = sim.discretization
disc.init_from_stl("/tmp/sphere.stl", 20)

# Material
mat = sim.insert_material()
mat.density = 2700.0
mat.youngs_modulus = 70e9
mat.poissons_ratio = 0.33

# Damage model
dm = sim.insert_damage_model()
dm.critical_stretch = 0.01

# Block
block = sim.insert_block()
block.material_id = 0
block.damage_model_id = 0

# Boundary condition
bc = sim.insert_boundary_condition()
bc.type = bc.Type.Body_Force
bc.set_by_loading_rate(0, 0, -1e3)

# Settings
sim.settings.mech_time = 1.0
sim.settings.result_dir = "/tmp/peridigm_out/"

# Initialize and solve
sim.initialize_default_setup()
sim.set_up_result_directory()
sim.write_input_file()
```
