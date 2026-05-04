---
title: "Simulator"
displayed_sidebar: pythonApiSidebar
---

# Simulator

> **Python**: `phynexis.parsim`
> **Headers**: `src/parsim/simulator/*.hpp`, `src/parsim/context/*.hpp`

Simulation driver, context management, and operator system.

---

## Simulator

Main simulation driver.

### Constructors

| Signature | Description |
|-----------|-------------|
| `Simulator()` | Default simulator. |

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `step()` | — | Advance one time step |
| `run()` | — | Run until end condition |
| `context()` | `Context` | Simulation context |
| `operators()` | `OperatorSystem` | Operator system |
| `config()` | `SimulationConfig` | Current configuration |
| `save_to(path, file, opt)` | — | Save state |
| `load_from(path, file, opt)` | — | Load state |

**Example:**
```python
import phynexis
pm = phynexis.parsim

sim = pm.Simulator()
ctx = sim.context()
print(type(ctx).__name__)  # Context
```

---

## SimulationConfig

Configuration struct.

| Attribute | Type | Description |
|-----------|------|-------------|
| `time_step` | `float` | Simulation time step |
| `end_time` | `float` | Simulation end time |
| `max_steps` | `int` | Maximum number of steps |
| `enable_gravity` | `bool` | Enable gravity |
| `gravity` | `Vec3d` | Gravity vector |
| `enable_logging` | `bool` | Enable logging |

---

## Context

Central simulation context managing all resources.

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `initialize()` | — | Initialize context |
| `finalize()` | — | Finalize context |
| `graph()` | `ComputationalGraph` | The computational graph |
| `domain()` | `DomainSystem` | Domain decomposition system |
| `state()` | `RuntimeState` | Runtime state |
| `spatial_index()` | `SpatialIndex` | Spatial index (may be None) |
| `ensure_spatial_index()` | — | Ensure spatial index is created |
| `find_resource(name)` | `tuple` | Find resource handle `(index, epoch)` |
| `resource(name)` | `object` | Get typed resource (4 hardcoded keys) |
| `save_to(path, file, opt)` | — | Save context |
| `load_from(path, file, opt)` | — | Load context |

**Resource keys:**
- `"computational_graph"` → `ComputationalGraph`
- `"domain_system"` → `DomainSystem`
- `"runtime_state"` → `RuntimeState`
- `"uniform_grid_index"` → `UniformGridIndex`

**Example:**
```python
ctx = pm.Context()
ctx.initialize()
g = ctx.graph()
print(g.is_empty())  # True
```

---

## OperatorSystem

Container for simulation operators.

### Methods

| Method | Description |
|--------|-------------|
| `insert(op)` | Insert an operator |
| `insert_with_label(label, op)` | Insert with a label |
| `get(label)` | Get operator by label |
| `get(handle)` | Get operator by handle |
| `erase(label)` | Remove operator by label |
| `enable(handle)` | Enable operator |
| `disable(handle)` | Disable operator |
| `size()` | Number of operators |
| `empty()` | True if no operators |
| `clear()` | Remove all operators |

**Known issue:** `BaseOperator` is not bound in Python, so `insert()` is only usable with C++-created operators. The `operators` submodule exposes concrete operators but their insertion API is incomplete.

**Status**: noted

### OperatorSystemEntry

Metadata for an operator.

| Attribute | Type | Description |
|-----------|------|-------------|
| `op` | `handle` | Operator handle |
| `label` | `str` | Operator label |

---

## RuntimeState

Time and step tracking.

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `step()` | `int` | Current step |
| `time()` | `float` | Current time |
| `time_step()` | `float` | Time step size |
| `set_step(v)` | — | Set step |
| `set_time(v)` | — | Set time |
| `set_time_step(v)` | — | Set time step |
| `advance(dt)` | — | Advance time by dt |
| `history()` | — | Get history recorder |

---

## DomainSystem

Spatial domain decomposition for MPI.

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `initialize()` | — | Initialize domain decomposition |
| `config()` | `DomainSystemConfig` | Configuration |
| `subdomain_count()` | `int` | Number of subdomains |
| `domain_bound()` | `BoundingBox` | Global domain bounds |
| `self_subdomain_id()` | `int` | Local subdomain ID |
| `self_subdomain_bound()` | `BoundingBox` | Local subdomain bounds |
| `get_overlapped_subdomain(position)` | `int` | Subdomain overlapping position |
| `is_judge_domain(bbox_a, bbox_b)` | `bool` | Whether this rank judges bbox pair |

### DomainSystemConfig

| Attribute | Type | Description |
|-----------|------|-------------|
| `min_bound` | `Vec3d` | Domain minimum corner |
| `max_bound` | `Vec3d` | Domain maximum corner |
| `subdivisions` | `Vec3i` | Subdivision counts per axis |

---

## SpatialIndex

Abstract base for spatial indexing.

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `build(nodes)` | — | Build index from NodeSet |
| `query(position, radius)` | `list[int]` | Query nodes within radius |
| `update()` | — | Update index |

---

## UniformGridIndex

Uniform grid spatial index.

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `build(nodes)` | — | Build index from NodeSet |
| `query(position, radius)` | `list[int]` | Query nodes within radius |
| `update()` | — | Update index |
| `config()` | `UniformGridIndexConfig` | Current config |

### UniformGridIndexConfig

| Attribute | Type | Description |
|-----------|------|-------------|
| `min_bound` | `Vec3d` | Grid minimum corner |
| `max_bound` | `Vec3d` | Grid maximum corner |
| `grid_size` | `Vec3d` | Cell size |
| `update_mode` | `str` | Update strategy |

---

## ResourceRegistry / ContextResource

Resource factory pattern for extensible context resources.

### ResourceRegistry

| Method | Description |
|--------|-------------|
| `register_factory(name, factory)` | Register a resource factory |
| `create(name)` | Create a resource by name |

### ContextResource

Base class for context-managed resources.

---

## Known Issues

### `OperatorSystem.insert()` unusable from Python

`BaseOperator` is not exposed in Python bindings, so operators created in Python cannot be inserted into `OperatorSystem`.

**Workaround:** Use C++-side operator creation or the `Simulator` factory methods.

**Status**: noted

### `Context.resource()` only supports 4 hardcoded keys

Extensible resources fall through to an exception.

**Status**: noted
