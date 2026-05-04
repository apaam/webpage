---
title: "Python API Overview"
displayed_sidebar: pythonApiSidebar
sidebar_position: 0
---

# Python API Overview

Use the header **Docs** item for the [manual / guides](../manual/index.md). On API pages the left sidebar shows **only** this Python reference tree (no manual outline).

Phynexis exposes its C++ core through pybind11 bindings. The table below lists the **nine lazy-loaded Python submodules** in a typical build. **On this documentation site**, detailed reference pages are maintained primarily under **`utils`** and **`fields`** (plus historical notes under **`deprecated`**). Other rows describe modules that ship with the package; page-level coverage may still be thin—use the **[coverage tracker](pathname:///logs/python-api-meta/progress.json)** and the **[PDF export](#pdf-export)** for the broadest automated snapshot.

| Module | Python Import | C++ Namespace | Description |
|--------|--------------|---------------|-------------|
| **utils** | `phynexis.utils` | `phynexis::utils` | [Utilities: console, SDF, string helpers](utils/index.md) |
| **fields** | `phynexis.fields` | `phynexis::fields` | [Field quantities and level sets](fields/index.md) |
| **parsim** | `phynexis.parsim` | `phynexis::parsim` | [Parallel simulation framework](parsim/index.md) |
| **netdem** | `phynexis.netdem` | `phynexis::netdem` | Discrete Element Method (DEM) |
| **netfem** | `phynexis.netfem` | `phynexis::netfem` | Finite Element Method (FEM) |
| **cfddem** | `phynexis.cfddem` | `phynexis::cfddem` | CFD-DEM coupling |
| **ml** | `phynexis.ml` | `phynexis::ml` | Machine learning interfaces |
| **peridigm** | `phynexis.peridigm` | `phynexis::peridigm` | Peridynamics |
| **workflow** | `phynexis.workflow` | `phynexis::workflow` | Workflow automation |

## Import Pattern

```python
import phynexis

# Lazy-loaded submodules
scene = phynexis.netdem.Scene()
mesh = phynexis.netfem.TetMesh()
```

## Coverage Status

See [progress tracker](pathname:///logs/python-api-meta/progress.json) for the current documentation coverage by module.

## PDF Export

A compiled PDF merges the same Markdown tree (including pages with sparse prose). Regenerate locally after large binding updates:

`python scripts/export-python-api-pdf.py`

Published build:

[Download phynexis-python-api.pdf](pathname:///pdf/phynexis-python-api.pdf)

