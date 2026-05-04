---
title: "operators"
displayed_sidebar: pythonApiSidebar
---

# operators

> **C++**: `phynexis::parsim::operators`
> **Python**: `phynexis.parsim.operators`
> **Header**: `src/parsim/operators/*.hpp`

Simulation operators that are registered with `OperatorSystem` and execute during specific simulation phases. Each operator defines `order()` (execution priority) and `enabled()` state.

## Base Classes

### `BaseOperator`

Abstract base class for all simulation operators.

**Methods:**

| Method | Returns | Description |
|--------|---------|-------------|
| `name()` | `str` | Operator name |
| `order()` | `int` | Execution priority (lower = earlier) |
| `set_order(n)` | — | Set execution priority |
| `enabled()` | `bool` | Whether operator is active |
| `set_enabled(b)` | — | Enable or disable operator |
| `timings()` | — | Print timing statistics |
| `print_info()` | — | Print operator info |

## Phase Identifiers

Phase constants define when operators execute in the simulation loop.

| Constant | Value | Description |
|----------|-------|-------------|
| `PreStep` | 0 | Before step begins |
| `PreBoundary` | 1 | Before boundary conditions |
| `PostBoundary` | 2 | After boundary conditions |
| `PreInteraction` | 3 | Before interaction detection |
| `PostInteraction` | 4 | After interaction detection |
| `PreForces` | 5 | Before force computation |
| `PostForces` | 6 | After force computation |
| `PreIntegration` | 7 | Before integration |
| `PostIntegration` | 8 | After integration |
| `PostStep` | 9 | After step completes |

**Example:**
```python
import phynexis
ops = phynexis.parsim.operators

print("Phase IDs:", ops.PreStep, ops.PreForces, ops.PostStep)
```

**Output:**
```text
Phase IDs: 0 5 9
```


## Integration Operators (`operators.integration`)

### `IntegratorOperator(method=Verlet)`

Time integration operator using Euler or Verlet scheme.

**Constructor:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `method` | `IntegratorMethod` | `Verlet` | Integration scheme |

**Methods:**

| Method | Returns | Description |
|--------|---------|-------------|
| `initialize(nodes)` | — | Bind to a `NodeSet` |
| `set_time_step(dt)` | — | Set time step size |
| `time_step()` | `float` | Current time step |
| `config()` | `IntegratorOperatorConfig` | Current configuration |
| `set_config(cfg)` | — | Set configuration |

### `IntegratorMethod`

| Value | Description |
|-------|-------------|
| `Euler` | Forward Euler integration |
| `Verlet` | Velocity Verlet integration (default) |

### `IntegratorOperatorConfig`

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `method` | `IntegratorMethod` | read/write | Integration method |

**Example:**
```python
import phynexis
ops = phynexis.parsim.operators

# Velocity Verlet (default)
io = ops.integration.IntegratorOperator()
io.set_time_step(0.001)
print("method:", io.config().method)
print("dt:", io.time_step())

# Euler
io2 = ops.integration.IntegratorOperator(
    ops.integration.IntegratorMethod.Euler)
print("Euler method:", io2.config().method)
```

**Output:**
```text
method: IntegratorMethod.Verlet
dt: 0.001
Euler method: IntegratorMethod.Euler
```


## Force Operators (`operators.forces`)

### `Gravity(label="gravity")`

Gravitational force operator. Applies gravity to all nodes.

**Constructor:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `label` | `str` | — | Operator label |
| `gx, gy, gz` | `float` | — | Gravity components |
| `gravity_vector` | `Vec3d` | — | Gravity as vector (requires label) |

**Properties:**

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `gravity_vector` | `Vec3d` | read/write | Gravity vector (default `(0,0,-9.81)`) |

### `Damping(label, coefficient)`

Viscous damping operator. Applies damping proportional to velocity.

**Constructor:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `label` | `str` | — | Operator label |
| `coefficient` | `float` | — | Damping coefficient |

**Properties:**

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `coefficient` | `float` | read/write | Damping coefficient |

### `RepulsionForce`

Contact repulsion force operator. Requires a `RepulsionModel` to define the force law.

**Methods:**

| Method | Returns | Description |
|--------|---------|-------------|
| `initialize(nodes, edges)` | — | Bind to `NodeSet` and `EdgeSet` |
| `set_model(model)` | — | Set repulsion model (cloned) |
| `set_model_by_name(name)` | — | Set model by name from factory |
| `model()` | `RepulsionModel` | Get current model (reference) |

**Example:**
```python
import phynexis
ops = phynexis.parsim.operators

# Gravity
g = ops.forces.Gravity()
print("gravity:", g.name(), g.gravity_vector)

# Damping
d = ops.forces.Damping("viscous", 0.1)
print("damping:", d.name(), d.coefficient)
```

**Output:**
```text
gravity: gravity Vec3d(0, 0, -9.81)
damping: damping 0.1
```


## Interaction Operators (`operators.interaction`)

### `InteractionUpdate(label="")`

Updates interactions (edges/hyperedges) based on current node positions.

### `AdjacencyBuilder`

Builds adjacency structures using spatial index.

**Methods:**

| Method | Returns | Description |
|--------|---------|-------------|
| `initialize(spatial_index, nodes, domain_system)` | — | Initialize with spatial index |
| `config()` | `AdjacencyBuilderConfig` | Current config |
| `set_config(cfg)` | — | Set config |

**`AdjacencyBuilderConfig` properties:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `max_dirty_ratio` | `float` | 0.3 | Max dirty rebuild ratio |
| `max_invalid_ratio` | `float` | 0.3 | Max invalid rebuild ratio |

### `UniformGridIndexBuilder`

Builds the uniform grid spatial index.

**Methods:**

| Method | Returns | Description |
|--------|---------|-------------|
| `initialize(uniform_grid_index, nodes)` | — | Initialize with grid index and nodes |


## Output Operators (`operators.output`)

### `UnifiedOutput(output_dir="output/", format=VTK, frequency=100)`

Simulation output writer supporting VTK and HDF5 formats.

**Constructor:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `output_dir` | `str` | `"output/"` | Output directory |
| `format` | `OutputFormat` | `VTK` | File format |
| `frequency` | `int` | 100 | Output frequency (steps) |

**Methods:**

| Method | Returns | Description |
|--------|---------|-------------|
| `initialize(graph, state)` | — | Bind to graph and runtime state |
| `config()` | `UnifiedOutputConfig` | Current configuration |

### `OutputFormat`

| Value | Description |
|-------|-------------|
| `VTK` | VTK file format |
| `HDF5` | HDF5 file format |

### `OutputLogStyle`

| Value | Description |
|-------|-------------|
| `Summary` | Compact log output |
| `Verbose` | Detailed log output |
| `Silence` | No log output |

### `OutputMode`

| Value | Description |
|-------|-------------|
| `ByStep` | Output every N steps |
| `ByTime` | Output every N time units |

### `UnifiedOutputConfig`

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `format` | `OutputFormat` | read/write | Output file format |
| `output_dir` | `str` | read/write | Output directory |
| `frequency` | `int` | read/write | Output frequency |
| `output_mode` | `OutputMode` | read/write | Output mode (step/time based) |
| `time_interval` | `float` | read/write | Time interval for ByTime mode |
| `time_stamp_adjustable` | `bool` | read/write | Adjustable timestamps |
| `edges` | `bool` | read/write | Output edges |
| `hyper_edges` | `bool` | read/write | Output hyperedges |
| `shapes` | `bool` | read/write | Output shapes |
| `log_style` | `OutputLogStyle` | read/write | Log verbosity |

**Example:**
```python
import phynexis
ops = phynexis.parsim.operators

# VTK output (default)
uo = ops.output.UnifiedOutput("sim_output/", ops.output.OutputFormat.VTK)
print("output:", uo.name())

cfg = uo.config()
print("format:", cfg.format)
print("frequency:", cfg.frequency)
```

**Output:**
```text
output: unified_output
format: OutputFormat.VTK
frequency: 100
```
