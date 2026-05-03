---
title: "Software & Tools"
---

## Software & Tools

### Phynexis

Phynexis is distributed to academic and industrial collaborators under a research license agreement. For access to the source code, pre-built binaries, or licensing inquiries, please [contact us](../about/index.md).

### Post-Processing Scripts

A collection of MATLAB and Python scripts for common post-processing tasks is available separately:

- VTK file I/O and field extraction
- Stress–strain analysis from DEM simulations
- Contact anisotropy histograms and fabric tensors
- Spherical harmonic shape reconstruction

Contact the authors to request access to the post-processing toolkit.

### Python API Reference

A complete PDF reference of the phynexis Python API (auto-generated from documentation):

[Download phynexis-python-api.pdf](pathname:///pdf/phynexis-python-api.pdf)

### Related Open-Source Software

Keep this table aligned with **Third-Party Software** on [About](../about/index.md); edit both when dependencies change.

Projects Phynexis **interfaces with directly** or ships **wrappers** for:

| Package | Role | License (typical) |
|---------|------|-------------------|
| [OpenFOAM](https://www.openfoam.com) | CFD–DEM coupling | Open Source |
| [Peridigm](https://github.com/peridigm/peridigm) | Peridynamics / breakage | BSD |
| [Eigen](https://eigen.tuxfamily.org) | Linear algebra | MPL2 |
| [Boost](https://www.boost.org) | C++ utilities | Boost |
| [CGAL](https://www.cgal.org) | Computational geometry | GPL/LGPL (depends on component) |
| [libigl](https://libigl.github.io/) | Mesh algorithms | MPL2 |
| [Cork](https://github.com/gilvi/cork) | Mesh booleans (wrappers) | LGPL |
| [TetGen](https://wias-berlin.de/software/index.jsp?id=TetGen) | Tetrahedral meshing (wrappers) | AGPL / commercial |
| [mlpack](https://www.mlpack.org) | ML algorithms | BSD |
| [pybind11](https://pybind11.readthedocs.io) | Python bindings | BSD |
| [PyTorch](https://pytorch.org) | Optional Python ML (NetSDF, ANN contact, …) | BSD-style |
| MPI / OpenMP | Distributed and shared-memory parallelism | (implementation-dependent) |

Common **workflow tools** (visualization, meshes, etc.) used alongside Phynexis:

| Package | Role | License |
|---------|------|---------|
| [ParaView](https://www.paraview.org) | VTK visualization | BSD |
| [Blender](https://www.blender.org) | Offline rendering | GPL |

Paper references and bibliographies are listed on the [APAAM lab site](https://apaam.github.io/mywebpage/), not in this download section.
