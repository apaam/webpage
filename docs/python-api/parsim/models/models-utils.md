---
title: "Models and Utils"
displayed_sidebar: pythonApiSidebar
---

# Models and Utils

> **Python**: `phynexis.parsim`
> **Headers**: `src/parsim/models/*.hpp`, `src/parsim/utils/*.hpp`

Contact models, node generation utilities, and spatial indexing helpers.

---

## RepulsionModel

Base class for contact repulsion models.

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `name()` | `str` | Model name |
| `clone()` | `RepulsionModel*` | Deep copy |

---

## LinearRepulsionModel

Simple linear spring repulsion.

### Constructors

| Signature | Description |
|-----------|-------------|
| `LinearRepulsionModel()` | Default stiffness. |
| `LinearRepulsionModel(stiffness)` | Specify stiffness. |

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `stiffness()` | `float` | Current stiffness |
| `set_stiffness(v)` | — | Set stiffness |

**Example:**
```python
import phynexis
pm = phynexis.parsim

model = pm.LinearRepulsionModel(1000.0)
print(model.stiffness())  # 1000.0
print(model.name())       # "LinearRepulsionModel"

clone = model.clone()
print(type(clone).__name__)  # LinearRepulsionModel
```

---

## RepulsionModelFactory

Factory for creating repulsion models by name.

### Static Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `create_model(name)` | `RepulsionModel*` | Create model by name |
| `get_available_models()` | `list[str]` | List registered model names |
| `is_registered(name)` | `bool` | Check if name is registered |
| `print_info()` | — | Print factory info |

**Example:**
```python
print(pm.RepulsionModelFactory.get_available_models())
model = pm.RepulsionModelFactory.create_model("LinearRepulsionModel")
```

---

## NodeGenerator

Generates node property sets from field samplers.

### Constructors

| Signature | Description |
|-----------|-------------|
| `NodeGenerator()` | Empty generator. |

### Methods

| Method | Description |
|--------|-------------|
| `add_field(slot, sampler)` | Add a field slot with sampler |
| `add_field(name, sampler)` | Add Vec3 field by name (spatial sampler) |
| `add_field(name, dist)` | Add scalar field by name (distribution) |
| `add_field(name, generator)` | Add field by callable (double/Vec3/JSON) |
| `erase_field(name)` | Remove a field slot |
| `contains(name)` | Check if slot exists |
| `slots()` | Get all slots |
| `num_slots()` | Number of slots |
| `slot(i)` / `slot(name)` | Get slot by index or name |
| `generate_one()` | Generate one node's properties (JSON) |
| `generate(count)` | Generate `count` nodes (list of JSON) |
| `clear()` | Remove all slots |
| `print_slots()` | Print slot info to stderr |

**Example:**
```python
import phynexis
pm = phynexis.parsim
U = phynexis.utils

gen = pm.NodeGenerator()

# Add a scalar field with fixed value
gen.add_field("radius", lambda: 0.5)

# Add a Vec3 field with random position
sampler = U.sampling.spatial.UniformBoxSampler(
    U.Vec3d(0, 0, 0), U.Vec3d(1, 1, 1)
)
gen.add_field("pos", sampler)

# Generate 3 nodes
nodes = gen.generate(3)
print(len(nodes))  # 3
print(nodes[0])    # {'radius': 0.5, 'pos': [x, y, z]}
```

---

## FieldSampler

Factory for creating field samplers used by `NodeGenerator`.

### Static Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `make_scalar(dist)` | `FieldSampler` | From distribution |
| `make_scalar(generator)` | `FieldSampler` | From callable `() -> double` |
| `make_scalar(value)` | `FieldSampler` | From constant value |
| `make_vec3(sampler)` | `FieldSampler` | From spatial sampler |
| `make_vec3(generator)` | `FieldSampler` | From callable `() -> Vec3d` |
| `make_vec4(sampler)` | `FieldSampler` | From orientation sampler |
| `make_json(generator)` | `FieldSampler` | From callable `() -> dict` |

---

## Node Property Utils

Free functions for node property manipulation.

### `apply_density(view, density)`

Applies density to node mass/inertia fields.

### `assign_shape(view, shape_id)`

Assigns a shape ID to nodes.

### `update_node_bounds(nodes, skin_factor=0.05, margin_factor=0.1)`

Updates AABB bounds for all nodes.

**Example:**
```python
ns = pm.NodeSet()
# ... setup and initialize ...

pm.update_node_bounds(ns, 0.05, 0.1)
```

---

## SpatialIndex / UniformGridIndex

See [simulator](../simulator/simulator.md) for full documentation.

Quick example:
```python
idx = pm.UniformGridIndex()
config = idx.config()
config.min_bound = U.Vec3d(0, 0, 0)
config.max_bound = U.Vec3d(10, 10, 10)
config.grid_size = U.Vec3d(1, 1, 1)

idx.build(ns)
result = idx.query(U.Vec3d(5, 5, 5), 2.0)
print(result)  # list of node indices within radius 2.0
```

---

## Known Issues

### `NodeGenerator.generate()` returns `list[dict]` not `VecX[json]`

The binding wraps `VecX<json>` to `py::list` for compatibility.

**Status**: noted
