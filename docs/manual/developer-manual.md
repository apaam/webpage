---
title: "Architecture & Development"
---

## Architecture & Development

This guide is for developers extending or maintaining the **Phynexis simulation engine** (C++ core and pybind11 layer). It assumes access to the licensed Phynexis **source tree**, not this repository—which only hosts the public documentation site.

### Code Architecture

Phynexis is organized into modular C++ libraries with Python bindings via pybind11. The core modules are:

| User-facing / Python | Internal libraries (this tree) |
|---------------------|--------------------------------|
| DEM / **`phynexis.netdem`** | `dem`, `domain`, `scene`, `shape`, `modifier`, `mpi` |
| FEM / **`phynexis.netfem`** | `fem` |
| CFD–DEM / **`phynexis.cfddem`** | Fluid–particle coupling stack (with OpenFOAM) |
| Peridynamics / **`phynexis.peridigm`** | `peridigm` |
| ML helpers / **`phynexis.ml`** | `mlpack` and related NN hooks |

| Module | Responsibility |
|--------|---------------|
| `dem` | Contact detection, contact models, DEM solver, time integration |
| `domain` | Spatial decomposition, linked-cell management, MPI domain splitting |
| `scene` | Particle and wall containers, shape registry, contact model tables |
| `shape` | Geometric shape templates and collision queries |
| `modifier` | External forces, data dumping, boundary controls, custom callbacks |
| `mpi` | Inter-rank particle and contact data exchange |
| `fem` | Finite element meshing and deformable body mechanics |
| `peridigm` | Interface to the Peridigm peridynamics library for breakage |
| `mlpack` | Machine learning wrappers for neural contact and shape models |
| `pybind` | Python binding layer exposing C++ classes to `phynexis` |

#### Simulation Lifecycle

A typical DEM simulation cycle proceeds as follows:

1. **Pre-modifier execution** — gravity, velocity prescriptions, and other external modifiers.
2. **Ghost particle exchange** — MPI ranks identify boundary-crossing particles and send proxies to neighbors.
3. **Linked-cell update** — spatial hash grid is rebuilt; particles and ghosts are binned.
4. **Contact detection** — neighbor cell pairs are traversed; new contacts are initialized, existing ones updated.
5. **Force evaluation** — contact models compute forces and moments from geometric overlaps.
6. **Ghost contact return** — forces on proxy contacts are sent back to owning ranks.
7. **Motion integration** — Newton-Euler equations update velocities and positions.
8. **Domain migration** — particles that have left the rank's domain are sent to their new owners.
9. **Post-modifier execution** — data output, breakage analysis, and custom callbacks.
10. **Ghost cleanup** — inactive ghost particles and stale contacts are removed.

### Coding Standards

We follow the [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html) with the following project-specific conventions.

#### Naming

| Entity | Convention | Example |
|--------|-----------|---------|
| Files | `snake_case` with `.hpp`/`.cpp` | `particle.hpp`, `contact_pp.cpp` |
| Variables | `snake_case` | `dir_n`, `time_step` |
| Classes / structs | `PascalCase` | `DataDumper`, `ContactSolver` |
| Macros | `ALL_CAPS` | `PI`, `DEM_DEBUG` |
| Abbreviations | Capitalize next word | `GJKsolver`, `DEMgjk` |

#### Comments and Documentation

- Use Doxygen for API documentation generation.
- Block documentation for classes:
  ```cpp
  /** Brief description of the class. */
  ```
- Inline documentation:
  ```cpp
  /// Brief description of the member
  ```
- Use `@todo`, `@warning`, `@bug` where appropriate.

#### Formatting

- Use [clang-format](https://clang.llvm.org/docs/ClangFormat.html) with the project `.clang-format` file.
- Prefer `auto` for local variables when the type is obvious.
- Mark parameters `const` when they are not modified.
- Pass read-only objects by `const` reference; pass objects that may be modified by pointer.
- Prefer C++ standard library headers (`<cmath>`) over C headers (`<math.h>`).
- **Do not use** smart pointers (`std::unique_ptr`, `std::shared_ptr`) in the core engine.
- **Never** use `using namespace` in header files.

#### Memory Management

Phynexis uses raw pointers and manual memory management in performance-critical code paths. When adding new classes:

- Objects owned by `Scene` (particles, walls, shapes) are managed by the scene's internal containers.
- Modifiers and external objects should be allocated on the stack or managed by the caller.
- Always pair `new` with explicit `delete` in non-scene code.

### Performance Profiling

Use `perf` for Linux-based profiling:

```bash
sudo perf stat build/bin/your_binary
sudo perf record -e task-clock -g build/bin/your_binary
sudo perf report -i perf.data
```

For flame graph visualization:

```bash
git clone --depth 1 https://github.com/brendangregg/FlameGraph.git
sudo perf script > out.perf
FlameGraph/stackcollapse-perf.pl out.perf > out.folded
FlameGraph/flamegraph.pl out.folded > out.svg
```

### Adding New Features

When extending Phynexis:

1. **New shape**: implement the `Shape` interface in `src/shape/`, add collision queries, and register in the pybind layer.
2. **New contact model**: inherit from `ContactModel`, implement force evaluation, and add to the scene's model table.
3. **New modifier**: inherit from `Modifier`, override `Execute()`, and bind to the modifier manager.
4. **Python exposure**: follow the [Pybind11 binding conventions](dev-pybind-styles.md).

All new code must compile without warnings under `-Wall -Wextra` and pass the existing test suite from the **Phynexis source repository root** (paths may vary by branch):

```bash
./scripts/run_tests.sh
```

### Related documentation

- [Pybind11 binding conventions](dev-pybind-styles.md) — how to expose new types to Python
- [Docker and HPC](docker-hpc.md) — containers and clusters
- [Developer tools](computer-tips.md) — GitHub CLI, proxies, workstation setup
- C++ class reference: site header **API → C++ (Doxygen)**
