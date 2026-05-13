---
title: "peridigm"
displayed_sidebar: pythonApiSidebar
---

# phynexis.peridigm

Peridynamics simulation module. Provides classes for domain discretization,
peridynamic block management, boundary conditions, material and damage models,
and a top-level simulator that orchestrates the full simulation pipeline.

## Import

```python
import phynexis

# Access submodule directly
sim = phynexis.peridigm.PeriDigmSimulator()

# Or bind locally
from phynexis import peridigm
sim = peridigm.PeriDigmSimulator()
```

## Module Overview

| Class | Description |
|-------|-------------|
| [PeriDigmSimulator](peridigm-simulator.md) | Top-level simulator that manages blocks, materials, boundary conditions, and runs the simulation |
| [PeriDigmDiscretization](peridigm-discretization.md) | Domain discretization into peridynamic nodes from STL or distance maps |
| [PeriDigmBlock](peridigm-block.md) | A peridynamic block with material, damage model, and node indices |
| [PeriDigmBoundaryCondition](peridigm-boundary-condition.md) | Boundary condition with prescribed displacement or body force |
| [PeriDigmMaterial](peridigm-material.md) | Material model (currently elastic) |
| [PeriDigmDamageModel](peridigm-damage-model.md) | Damage model (currently critical stretch) |
| [PeriDigmSettings](peridigm-settings.md) | Simulation settings: timestep, horizon, output frequency, etc. |
| [PeriDigmStrength](peridigm-strength.md) | Weibull-distributed strength model for quasi-brittle materials |
| [DomainSplittor](domain-splittor.md) | Abstract base for domain splitting algorithms |
| [LevelSetSplittor](level-set-splittor.md) | Domain splitting based on a level set representation |
| [TetMeshSplittor](tet-mesh-splittor.md) | Domain splitting based on a tetrahedral mesh |

## C++ Namespace

`phynexis::peridigm`

## pybind Module

`pyperidigm` (lazy-loaded via `phynexis.peridigm`)
