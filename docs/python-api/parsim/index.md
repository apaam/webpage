---
title: "parsim"
displayed_sidebar: pythonApiSidebar
---

# phynexis.parsim

> **Python**: `phynexis.parsim`
> **pybind module**: `pyparsim`
> **Header**: `src/parsim/parsim.hpp`

Particle simulation framework. Provides node/edge/hyperedge graph structures, spatial indexing, operator-based simulation loop, and model factories for contact mechanics.

---

## Module Status

| Class / Group | Status | Doc |
|---------------|--------|-----|
| Schemas & BoundLayouts | done | [schemas](schemas.md) |
| Graph (NodeSet, EdgeSet, HyperEdgeSet, ComputationalGraph) | done | [graph](graph.md) |
| Simulator, Context, OperatorSystem | done | [simulator](simulator.md) |
| Models & Utils | done | [models-utils](models-utils.md) |

---

## Submodules

- **schema** — `NodeKinematicsSchema`, `NodeShapeSchema`, `NodeInertiaSchema`, `NodeBoundsSchema`, `NodeNodeLinkSchema`, `NodeGridLinkSchema`, `NodeDomainLinkSchema`
- **graph** — `ComputationalGraph`, `NodeSet`, `EdgeSet`, `HyperEdgeSet`, `SetBase`, `ShapeStore`
- **simulator** — `Simulator`, `Context`, `OperatorSystem`, `RuntimeState`, `DomainSystem`
- **models** — `RepulsionModel`, `LinearRepulsionModel`, `RepulsionModelFactory`
- **utils** — `NodeGenerator`, `FieldSampler`, `SpatialIndex`, `UniformGridIndex`
- **operators** — `phases`, `integration`, `forces`, `interaction`, `output` submodules

---

## Quick Start

```python
import phynexis
pm = phynexis.parsim

# Create a graph with nodes
g = pm.ComputationalGraph()
ns = g.nodes()

# Add a node (requires schema + bound layout)
schema = pm.NodeKinematicsSchema()
layout = pm.BoundLayoutNodeKinematicsSchema.make_bound(ns.field_manager(), schema)
ns.set_view(layout)

# Initialize node storage
ns.initialize()
print(ns.size())  # 0
```

---

## See also

- [Python API overview](../index.md)
- [fields module](../fields/index.md) — field data structures used by parsim
