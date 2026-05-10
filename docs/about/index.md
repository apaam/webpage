---
title: About
sidebar_label: About
---

## Help & Support

Phynexis is under active development. For technical questions, bug reports, or collaboration inquiries, please contact us directly.

### Contact

- **Dr. Zhengshou Lai**, Associate Professor  
  School of Civil Engineering, Sun Yat-sen University  
  Email: [laizhengsh@mail.sysu.edu.cn](mailto:laizhengsh@mail.sysu.edu.cn)

### What to Include in a Support Request

To help us diagnose issues efficiently, please include:

1. Phynexis version or commit hash
2. Operating system and compiler version
3. A minimal script or case that reproduces the issue
4. Relevant error messages or log output
5. For parallel runs: MPI implementation and number of ranks

### Academic Collaboration

We welcome academic collaboration on topics related to granular mechanics, particle-based simulation, and computational geomechanics. Please reach out via email to discuss potential projects.

---

## Acknowledgements

### How to Cite

Phynexis does not yet have a single dedicated reference paper. When you publish work that used Phynexis, cite the **peer-reviewed articles that describe the numerical methods you relied on** (for example CFD–DEM coupling, irregular particles, or contact models as appropriate). Bibliographies and paper lists are maintained only on the **[APAAM lab website](https://lzhshou.github.io/docs/publications/papers/)** — they are not duplicated on this documentation site.

### Third-Party Software

A tabular summary of the same dependencies (plus workflow tools) also appears under **[Software & Tools](../download/index.md)**—update both sections together when the stack changes.

Phynexis integrates or calls into many open-source components. The engine couples **OpenFOAM** for CFD–DEM, links **Peridigm** for peridynamics-based breakage, uses **Eigen**, **Boost**, and **pybind11** throughout the C++ core, and exposes optional geometry / mesh stacks via **`phynexis.utils.wrappers`** (including **CGAL**, **libigl**, **Cork**, **TetGen**). Machine-learning-accelerated workflows use **mlpack** on the C++ side and typically **PyTorch** in the Python environment (NetSDF, NetSPF, ANN contact, etc.). Parallel runs rely on **MPI** and **OpenMP**. Results are often exchanged using **VTK**-family file formats via built-in I/O helpers.

| Project | Role in Phynexis |
|---------|------------------|
| [OpenFOAM](https://www.openfoam.com) | CFD–DEM coupled solvers |
| [Peridigm](https://github.com/peridigm/peridigm) | Peridynamics interface for breakage / fragments |
| [Eigen](https://eigen.tuxfamily.org) | Linear algebra |
| [Boost](https://www.boost.org) | C++ utilities |
| [CGAL](https://www.cgal.org) | Computational geometry (wrappers) |
| [libigl](https://libigl.github.io/) | Mesh processing (wrappers) |
| [Cork](https://github.com/gilvi/cork) | Mesh booleans (wrappers) |
| [TetGen](https://wias-berlin.de/software/index.jsp?id=TetGen) | Tetrahedral meshing (wrappers) |
| [mlpack](https://www.mlpack.org) | ML primitives in accelerated workflows |
| [pybind11](https://pybind11.readthedocs.io) | Python bindings |
| [PyTorch](https://pytorch.org) | Optional Python ML stack (see installation notes) |
| MPI / OpenMP | Distributed and shared-memory parallelism |

Visualization and documentation tooling used around Phynexis (not part of the solver binary itself) includes for example [ParaView](https://www.paraview.org), [Blender](https://www.blender.org), and [Docusaurus](https://docusaurus.io/) for this website.
