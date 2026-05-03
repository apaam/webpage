---
title: "Pybind11 binding conventions"
---

## Pybind11 binding conventions

This document summarizes conventions for exposing C++ classes and functions to Python via pybind11 in the **Phynexis source tree**. End-user imports appear under the `phynexis` package; see the [Python API overview](../python-api/index.md) for the submodule map (`phynexis.netdem`, `phynexis.utils`, …).

### `__repr__` binding

For each class that provides a `Print` method, bind it to Python's `__repr__` to enable informative object representations in the REPL and notebooks.

```cpp
pybind11::class_<Sphere>(m, "Sphere")
  .def("__repr__", &Sphere::Print);
```

### Constructors

Use `pybind11::init<...>()` for constructor binding. When multiple overloaded constructors exist, define each explicitly.

```cpp
pybind11::class_<LinearSpring>(m, "LinearSpring")
  .def(pybind11::init<>())
  .def(pybind11::init<double, double, double, double>());
```

### Attributes and properties

Expose public data members via `.def_readwrite` for simple attributes, or `.def_property` when getter/setter logic is required.

```cpp
pybind11::class_<Particle>(m, "Particle")
  .def_readwrite("pos", &Particle::pos)
  .def_readwrite("vel", &Particle::vel);
```

### Module organization

Align bindings with the Python layout in the [Python API overview](../python-api/index.md): group related C++ types into `phynexis` submodules (`utils`, `fields`, `parsim`, `netdem`, `netfem`, `cfddem`, `ml`, `peridigm`, `workflow`, …). Prefer one translation unit per area (e.g. `py_scene.cpp`, `py_shape.cpp`) registered from the main module initializer so lazy submodule loading stays predictable.

When adding types, mirror the existing namespace→submodule mapping used in Doxygen and in the shipped wheels so documentation and runtime imports stay consistent.
