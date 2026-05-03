---
title: "Discovery Log"
---

# Discovery Log

> This document records discoveries, issues, and pending fixes during phynexis Python API documentation. For cross-agent session synchronization.

---

## Record Format

| Date | Module | Type | Content | Status |
|------|--------|------|---------|--------|

**Types**: `issue` / `note` / `todo` / `fix`

---

## utils Module

### 2026-05-03

| Date | Module | Type | Content | Status |
|------|--------|------|---------|--------|
| 2026-05-03 | utils | issue | `STLModel.vertices` / `facets` direct access throws `TypeError: Unregistered type VecX<Vec3d>` | open |
| 2026-05-03 | utils | note | `Vec3d` constructor only accepts 3 float args, not list: `Vec3d(1.0, 2.0, 3.0)` OK, `Vec3d([1,2,3])` FAILS | noted |
| 2026-05-03 | utils | note | `LevelSetField` default constructor initializes a default grid; `is_initialized()` returns True because default construction allocates | noted |
| 2026-05-03 | utils | issue | `CorkWrapper` has no default constructor exposed to Python, cannot instantiate directly | open |
| 2026-05-03 | utils | issue | `Voronoi` class does not exist in Python API; actual exposure is `voronoi.Tessellation` (static methods) and `voronoi.Diagram` (result container) | noted |
| 2026-05-03 | utils | note | `Tessellation.compute_centroidal()` on sphere.stl produces many "point out of computing domain" warnings, possibly due to small model size | noted |
| 2026-05-03 | utils | todo | `FlatHashMap`, `SurfaceMesh`, `Shape`, `DataIO` and other classes not yet documented | pending |
| 2026-05-03 | utils | todo | `math`, `sampling`, `vtk`, `wrappers` submodules not yet documented | pending |
| 2026-05-03 | utils | note | `to_string(float)` uses scientific notation: `3.140000e+00` | noted |
| 2026-05-03 | utils | note | `info()` output includes ANSI color codes and timestamp prefix, format: `[INFO] [HH:MM:SS.mmm] message` | noted |
| 2026-05-03 | utils | issue | `SurfaceMesh.vertices` / `facets` direct access throws `TypeError` because `VecX<Vec3d>` / `VecX<Vec3u>` are not registered | open |
| 2026-05-03 | utils | fix | `FlatHashMap.items()`/`keys()`/`values()` returned `VecX<T>` unregistered; fixed by changing return type to `py::list` | fixed |
| 2026-05-03 | utils | fix | All `VecX<T>` type_caster not registered — `pyvecx_type_caster.hpp` existed but was never included. Added `#include "types/pyvecx_type_caster.hpp"` to `init_registry.hpp`. After `make pywheel install`, all VecX-dependent APIs work: STLModel.vertices/facets, SurfaceMesh.vertices/facets, Shape.surface_nodes/sample_surface_points/support_points, DataIO.import_data/save_data | fixed |
| 2026-05-03 | utils | issue | Wrapper methods (IGLWrapper, CorkWrapper, CGALWrapper) use `VecX<T>&` (mutable ref) in lambda bindings. Temporary objects from type_caster cannot bind to non-const refs. Need binding fixes to accept by-value or return tuples. | open |

| 2026-05-03 | fields | fix | `pyfield_meta.cpp` duplicated `Int32` and `Int64` enum values causing `ValueType: element "Int32" already exists!` on import | fixed |
| 2026-05-03 | fields | fix | `pyfields.cpp` missing `pybind11::module::import("phynexis.lib.pyutils")` caused `SaveOptions` default arg conversion failure | fixed |
| 2026-05-03 | fields | fix | `pymanager.cpp`: `FieldHandle` not registered in pyfields — `create_field()` return value crashed. Added `pybind11::class_<FieldHandle>` with `index`, `epoch`, `__repr__`, `__eq__`, `__ne__` | fixed |
| 2026-05-03 | fields | fix | `pymanager.cpp`: `create_fields()` returned `VecX<FieldHandle>` (unregistered). Wrapped to return `py::list`. | fixed |
| 2026-05-03 | fields | fix | `pymanager.cpp`: `get_field_names()` returned `VecX<String>` (unregistered). Wrapped to return `py::list`. | fixed |
| 2026-05-03 | fields | fix | `pymanager.cpp`: `get_inconsistent_fields()` returned `VecX<String>` (unregistered). Wrapped to return `py::list`. | fixed |
| 2026-05-03 | fields | fix | `pymanager.cpp`: `get_field_ptrs()` returned `VecX<FieldBase*>` (unregistered). Wrapped to return `py::list` with RTTI-resolved concrete types. | fixed |
| 2026-05-03 | fields | fix | `pyfield_schema.cpp`: missing `#include <pybind11_json/pybind11_json.hpp>` caused `resolve_json()` to reject Python dicts. Added include. | fixed |
| 2026-05-03 | fields | fix | `pyfield_schema.cpp`: `append()` methods not exposed. Added overloads for `append(FieldSlot)` and `append(FieldSchema)`. | fixed |
| 2026-05-03 | fields | issue | `Field<T>` not registered as subclass of `FieldBase` in pybind. `pybind11::class_<Field<T>>(m, name)` should be `pybind11::class_<Field<T>, FieldBase>(m, name)`. Effect: `isinstance(sf, FieldBase)` is False, `FieldBase` methods (`ensure_capacity`, `is_same_type`, `erase_indices`, `reorder`, `reset_value`, `swap_elements`, `copy_element`) are unreachable from any field instance. | open |
| 2026-05-03 | fields | issue | `Field` declares `pybind11::buffer_protocol()` but no `def_buffer` callback. `np.array(field, copy=False)` and `memoryview(field)` segfault. Use `to_numpy()` (always copies). | open |
| 2026-05-03 | fields | issue | `Field<T>::operator==` compares `data_` pointer + `name_` (identity), not values. Two fields with identical contents and names compare unequal. Document the semantics; consider exposing a value-equality helper. | noted |
| 2026-05-03 | fields | issue | `Field::operator[]` does no bounds check; `field[-1]` reads garbage memory. `at(i)` is the safe variant. | noted |
| 2026-05-03 | fields | issue | `Field::data()` lambda returns `T*`; pybind dereferences to a single element instead of a buffer. Practically useless from Python. | noted |
| 2026-05-03 | fields | issue | `Field::append_span(buffer)` takes `VecX<T>` by const ref, but `VecX<T>` is not exposed in `phynexis.fields` (only `VecX` enum tag from `FieldType`). Method is unreachable from Python. | open |
| 2026-05-03 | fields | note | `Field<T>` exposed Python types: `ScalarField` (alias `Field`) for `Field<double>`; `Int32Field` (alias `Idx32Field`); `Int64Field` (alias `Idx64Field`); `BoolField`. Arithmetic operators (`+ - * /`) are bound only for `ScalarField`. | noted |
| 2026-05-03 | fields | note | `FieldHolder.get()` and `release()` return the **concrete** field type (`ScalarField` etc.) rather than `FieldBase`, even though the C++ API returns `FieldBase*`. pybind resolves the runtime type via RTTI. | noted |
| 2026-05-03 | fields | issue | `FieldHolder` only exposes `as_field_double()` and `as_field_int()` (Int32). No casts for `Int64Field` or `BoolField`. Workaround: use `holder.get()` which returns the concrete subclass. | open |
| 2026-05-03 | fields | issue | `Field<T>::subset(mask)` produces a holder whose inner field has `name == ""` — the source field's name is not propagated. | noted |

---

## Known Issues in Detail

### STLModel.vertices / facets type not registered

**Symptom**:
```python
model = phynexis.utils.STLModel()
print(model.vertices)  # TypeError: Unregistered type VecX<Vec3d>
```

**Analysis**:
Binding code has `.def_readwrite("vertices", &STLModel::vertices)`, but `VecX<Vec3d>` to Python list conversion is not registered. `VecX<double>` may be registered (`SDFCalculator.signed_distances` returns list), but `VecX<Vec3d>` is not.

**Suggested Fix**:
Add `VecX<Vec3d>` type_caster or vector binding in `bindings/utils/`, or expose via `py::buffer_protocol` / numpy arrays.

**Workaround**:
- Use `init_from_stl()` / `init_from_off()` to load from files
- Use static methods `CenterOf()`, `VolumeOf()`, etc. to process raw data

---

### Vec3d does not support list construction

**Symptom**:
```python
phynexis.utils.Vec3d([1.0, 2.0, 3.0])  # TypeError
phynexis.utils.Vec3d(1.0, 2.0, 3.0)     # OK
```

**Analysis**:
pybind only bound the 3-argument constructor; no list/tuple conversion constructor was added.

**Suggested Fix**:
Add `.def(pybind11::init([](py::list l){ ... }))` or `py::implicitly_convertible<py::list, Vec3d>()`.

---

### CorkWrapper has no constructor

**Symptom**:
```python
phynexis.utils.wrappers.CorkWrapper()  # TypeError: No constructor defined
```

**Analysis**:
Binding for `CorkWrapper` only has method bindings, no `.def(pybind11::init<>())`. C++ side may have a global instance or factory creation.

**Suggested Fix**:
Check `src/utils/wrappers/cork_wrapper.hpp` for a default constructor; if present, add binding. If not, consider exposing a global instance or factory function.

---

### FlatHashMap.items/keys/values return unregistered VecX

**Symptom**:
```python
m = phynexis.utils.FlatHashMap()
m.items()  # TypeError: Unregistered type VecX<std::pair<long long, int>>
```

**Analysis**:
`pyflat_hash_map.cpp` used `VecX<T>` as return type for `items()` / `keys()` / `values()`, but `VecX<std::pair<K,V>>` and `VecX<K>` were not registered with pybind.

**Fix** (2026-05-03):
Modified `bindings/utils/types/pyflat_hash_map.cpp`, changed return type from `VecX<T>` to `pybind11::list`:

```cpp
// Before fix
.def("items", [](Map &self) {
  VecX<std::pair<K, V>> items;  // ...
  return items;
})

// After fix
.def("items", [](Map &self) {
  pybind11::list items;
  for (const auto &pair : self) {
    items.append(pybind11::make_tuple(pair.first, pair.second));
  }
  return items;
})
```

Compile: `make pywheel install`

**Status**: Fixed

---

## Example Scripts Archive

### Verify phynexis installation
```python
import phynexis
print(phynexis)  # should output module path
```

### utils core classes quick test
```python
import phynexis

# Console
phynexis.utils.info("test")
phynexis.utils.plain("test")

# String
print(phynexis.utils.to_string(42))
print(phynexis.utils.to_string(3.14))

# Time
print(phynexis.utils.get_time_micros())

# MiniMap
m = phynexis.utils.MiniMapIdx64()
m[1] = 100
print(m[1], m.size(), 1 in m)

# SDF
model = phynexis.utils.STLModel()
model.init_from_stl("/path/to/sphere.stl")
sdf = phynexis.utils.SDFCalculator()
sdf.init_from_stl(model)
print(sdf.signed_distance(phynexis.utils.Vec3d(0, 0, 0)))

# LevelSetField
lsf = phynexis.utils.LevelSetField()
lsf.set_corner(phynexis.utils.Vec3d(0, 0, 0))
lsf.set_spacing(0.1)
lsf.set_dimension(phynexis.utils.Vec3u(11, 11, 11))
print(lsf.get_dimensions())

# OpenMP
print(phynexis.utils.omp_get_max_threads())
phynexis.utils.omp_set_num_threads(4)
```

---

## Cross-Agent Collaboration Guide

1. **Before resuming work**: read `progress.json` and this file to understand current state
2. **Discovering new issues**: append to this file with date, module, and type
3. **Fix verification**: after modifying phynexis bindings, run the corresponding example to verify, then update this file's status to `fix`
4. **Completing docs**: update the corresponding class status in `progress.json` to `done`
5. **Before committing**: run `cd webpage && npm run build` to ensure no broken links
