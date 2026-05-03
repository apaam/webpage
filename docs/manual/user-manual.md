---
title: "Phynexis Overview"
---

## Phynexis Overview

Phynexis is a high-performance C++ particle engine for computational mechanics of granular and particulate materials. It unifies discrete element method (DEM) simulation, CFD-DEM fluid-particle coupling, and machine-learning acceleration under a single framework, scaling from desktop workstations to HPC clusters.

### Core Modules

| Module | Description |
|--------|-------------|
| **NetDEM** | Discrete element solver with sphere, GJK, and signed-distance-field (SDF) contact algorithms for arbitrary particle shapes. Supports hybrid OpenMP/MPI parallelism. |
| **CFDDEM** | Coupled CFD-DEM solvers (hybridCFDdem, interIBdem, semiResolvedCFDdem) for fluid-particle interaction, built on OpenFOAM. |
| **Peridigm** | Peridynamics-based particle breakage analysis with level-set domain splitting for fragment reconstruction. |
| **FEM** | Finite element module for deformable particles and membranes with neo-Hookean constitutive models. |
| **ML Interface** | PyTorch integration for neural-network-based shape representation (NetSDF, NetSPF) and ANN contact solvers with GPU acceleration. |

The table above is **capability-oriented**. Import paths in Python follow **`phynexis.<submodule>`** names (`netdem`, `cfddem`, `netfem`, …)—see the **[Python API overview](../python-api/index.md)** for the authoritative submodule list and coverage on this site.

### Supported Particle Shapes

Phynexis supports a comprehensive set of particle geometric representations:

- **Analytical**: sphere, ellipsoid, cylinder, plane, triangle
- **Parametric**: poly-super-ellipsoid, poly-super-quadrics, spherical harmonics
- **Mesh-based**: triangular mesh (STL/OFF), level set
- **Neural**: NetSDF, NetSPF (learned implicit representations)

### Site layout

**Docs** (header) opens the [manual home](index.md). Use the sidebar for full navigation; [Installation](installation.md) is the usual next step for setup.

**Using Phynexis** — After installation: [Basic usage](basic-usage.md), [visualization](paraview-rendering.md), [CFD–DEM coupling](cfddem-simulation.md), [restart and checkpoint](tips/read-restart.md), and the [Python API](../python-api/index.md) (also under **API → Python** in the header).

**Extending Phynexis** — [Architecture and code design](developer-manual.md), [Pybind11 binding conventions](dev-pybind-styles.md), [theory background](dem-wiki.md), particle models and homogenization in the sidebar, plus [HPC and containers](docker-hpc.md).

### C++ API reference

The C++ API is documented with Doxygen. Use **API → C++ (Doxygen)** in the site header.
