---
title: "Binding Repair Backlog"
---

# Binding Repair Backlog

> Self-contained entries for binding bugs that require significant refactoring or C++ review. Each entry includes a minimal repro script so a senior agent can pick it up without prior context.

---

## 2026-05-03: IGLWrapper methods use `VecX<T>&` mutable ref parameters

**Module**: utils  
**Class/Function**: `IGLWrapper` (all methods)  
**Problem**: Lambda bindings accept `VecX<Vec3d>&` / `VecX<Vec3u>&` as output parameters. Temporary objects from `type_caster` cannot bind to non-const references.

**Repro**:
```python
import phynexis
v = phynexis.utils.Vec3d
vertices = [v(0,0,0), v(1,0,0), v(0,1,0), v(0,0,1)]
facets = [phynexis.utils.Vec3u(0,2,1), phynexis.utils.Vec3u(0,3,2), phynexis.utils.Vec3u(0,1,3), phynexis.utils.Vec3u(1,2,3)]
# All of these will TypeError
phynexis.utils.wrappers.IGLWrapper.convex_hull(vertices, facets)
phynexis.utils.wrappers.IGLWrapper.mesh_decimate(vertices, facets, 10)
phynexis.utils.wrappers.IGLWrapper.mesh_refine(vertices, facets)
phynexis.utils.wrappers.IGLWrapper.reorient_facets(vertices, facets)
phynexis.utils.wrappers.IGLWrapper.remove_duplicate_vertices(vertices, facets)
phynexis.utils.wrappers.IGLWrapper.remove_unreferenced_vertices(vertices, facets)
phynexis.utils.wrappers.IGLWrapper.check_winding(vertices, facets)
phynexis.utils.wrappers.IGLWrapper.facet_components(vertices, facets)
phynexis.utils.wrappers.IGLWrapper.mesh_intersect(v(0,0,0), v(1,0,0), vertices, facets)
phynexis.utils.wrappers.IGLWrapper.get_points_inside_mesh(vertices, vertices, facets)
phynexis.utils.wrappers.IGLWrapper.tetmesh_boundary(vertices, [phynexis.utils.Vec4u(0,1,2,3)])
```

**Root cause**: `bindings/utils/wrappers/pyigl.cpp` uses lambda signatures like `[](VecX<Vec3d> &vertices, VecX<Vec3u> &facets, ...)`. When Python passes a `list` of `Vec3d`, pybind11 converts it to a temporary `VecX<Vec3d>` via `type_caster`, but C++ cannot bind a temporary to a non-const reference.

**Suggested fix**: Change lambdas to accept `VecX<Vec3d>` and `VecX<Vec3u>` by value, or restructure to return tuples of `(vertices, facets)` instead of mutating in/out params.

**File**: `phynexis/bindings/utils/wrappers/pyigl.cpp`  
**Status**: open

---

## 2026-05-03: CorkWrapper methods use `VecX<T>&` mutable ref parameters

**Module**: utils  
**Class/Function**: `CorkWrapper` (`mesh_union`, `mesh_intersect`, `mesh_difference`, `mesh_xor`)  
**Problem**: Same as IGLWrapper — lambda bindings use mutable ref output parameters.

**Repro**:
```python
import phynexis
v = phynexis.utils.Vec3d
u = phynexis.utils.Vec3u
vertices = [v(0,0,0), v(1,0,0), v(0,1,0)]
facets = [u(0,1,2)]
phynexis.utils.wrappers.CorkWrapper.mesh_union(vertices, facets, vertices, facets)
```

**Root cause**: `bindings/utils/wrappers/pycork.cpp` lambda signatures use `VecX<Vec3d>&` / `VecX<Vec3u>&`.

**Suggested fix**: Accept by value or return `std::tuple<VecX<Vec3d>, VecX<Vec3u>>`.

**File**: `phynexis/bindings/utils/wrappers/pycork.cpp`  
**Status**: open

---

## 2026-05-03: CGALWrapper methods use `VecX<T>&` mutable ref parameters

**Module**: utils  
**Class/Function**: `CGALWrapper` (`get_alpha_shape`, `get_tetmesh`, `smooth_mesh`)  
**Problem**: Same pattern — mutable ref output parameters.

**Repro**:
```python
import phynexis
v = phynexis.utils.Vec3d
u = phynexis.utils.Vec3u
vertices = [v(0,0,0), v(1,0,0), v(0,1,0), v(0,0,1)]
facets = [u(0,2,1), u(0,3,2), u(0,1,3), u(1,2,3)]
phynexis.utils.wrappers.CGALWrapper.get_alpha_shape(vertices, 1.0)
phynexis.utils.wrappers.CGALWrapper.get_tetmesh(vertices, facets)
phynexis.utils.wrappers.CGALWrapper.smooth_mesh(vertices, facets, 1)
```

**Root cause**: `bindings/utils/wrappers/pycgal.cpp` lambda signatures use `VecX<Vec3d>&` / `VecX<Vec3u>&`.

**Suggested fix**: Accept by value or return tuples.

**File**: `phynexis/bindings/utils/wrappers/pycgal.cpp`  
**Status**: open

---

## 2026-05-03: CorkWrapper has no default constructor exposed

**Module**: utils  
**Class/Function**: `CorkWrapper.__init__`  
**Problem**: Binding has no `.def(pybind11::init<>())`. Cannot instantiate `CorkWrapper()`.

**Repro**:
```python
import phynexis
phynexis.utils.wrappers.CorkWrapper()  # TypeError: No constructor defined
```

**Root cause**: `pycork.cpp` only binds static/class methods, no constructor registration.

**Suggested fix**: Check if `CorkWrapper` in C++ has a default constructor. If yes, add `.def(pybind11::init<>())`. If not, document that it is a static-only class (already done in docs).

**File**: `phynexis/bindings/utils/wrappers/pycork.cpp`  
**Status**: open  
**Note**: If this is by design (static-only utility), convert this from `issue` to `note` and update docs.

---

## 2026-05-03: Vec3d does not support list/tuple construction

**Module**: utils  
**Class/Function**: `Vec3d.__init__`  
**Problem**: Only the 3-argument constructor is bound. Pythonic `Vec3d([1,2,3])` or `Vec3d((1,2,3))` fails.

**Repro**:
```python
import phynexis
phynexis.utils.Vec3d([1.0, 2.0, 3.0])   # TypeError
phynexis.utils.Vec3d((1.0, 2.0, 3.0))   # TypeError
phynexis.utils.Vec3d(1.0, 2.0, 3.0)     # OK
```

**Root cause**: No list/tuple conversion constructor or `py::implicitly_convertible` in `pyvecxd.cpp`.

**Suggested fix**: Add `.def(pybind11::init([](py::sequence s) { return Vec3d(s[0].cast<double>(), s[1].cast<double>(), s[2].cast<double>()); }))` or `py::implicitly_convertible<py::tuple, Vec3d>()` + `py::implicitly_convertible<py::list, Vec3d>()`.

**File**: `phynexis/bindings/utils/types/pyvecxd.cpp` (or equivalent Vec3d binding file)  
**Status**: open  
**Note**: Same issue likely affects `Vec2d`, `Vec3i`, `Vec3u`, `Vec4d`, `Vec6d`.

---

## 2026-05-03: Vec3u displays as Vec3i in Python type and repr

**Module**: utils  
**Class/Function**: `Vec3u`  
**Problem**: `type(v)` shows `Vec3i` and `repr(v)` shows `Vec3i(...)` for unsigned 3-vector.

**Repro**:
```python
import phynexis
v = phynexis.utils.Vec3u(1, 2, 3)
print(type(v))   # <class 'phynexis.utils.Vec3i'>  (WRONG)
print(repr(v))   # Vec3i(1, 2, 3)                  (WRONG)
```

**Root cause**: Binding likely registers `Vec3u` under the wrong Python type name, or shares the same pybind11 class object as `Vec3i`.

**Suggested fix**: Check `pyvec3u.cpp` (or equivalent) for `pybind11::class_<Vec3u>(m, "Vec3i")` typo.

**File**: `phynexis/bindings/utils/types/pyvec3u.cpp` (or equivalent)  
**Status**: open

---

## 2026-05-03: Vec6d missing Python sequence protocols

**Module**: utils  
**Class/Function**: `Vec6d`  
**Problem**: No `__len__`, `__getitem__`, `__setitem__`, `__repr__`, `__str__`. Only named component access (`v.x`, `v.y`, etc.) works.

**Repro**:
```python
import phynexis
v = phynexis.utils.Vec6d(1,2,3,4,5,6)
len(v)       # TypeError
v[0]         # TypeError
print(v)     # <phynexis.utils.Vec6d object at 0x...>
```

**Root cause**: Binding only exposes named fields, not sequence methods.

**Suggested fix**: Add `.def("__len__", [](const Vec6d&) { return 6; })`, `.def("__getitem__", ...)`, `.def("__setitem__", ...)`, `.def("__repr__", ...)`, `.def("__str__", ...)`.

**File**: `phynexis/bindings/utils/types/pyvec6d.cpp` (or equivalent)  
**Status**: open  
**Note**: Same issue may affect other vector types if they lack these protocols.

---

## 2026-05-03: `Field<T>` not registered as subclass of `FieldBase`

**Module**: fields
**Class/Function**: `Field<T>` / `ScalarField` / `Int32Field` / `Int64Field` / `BoolField`
**Problem**: `bind_field<T>` registers `pybind11::class_<Field<T>>(...)` without the `FieldBase` base parameter, so the C++ inheritance is invisible in Python. `isinstance(sf, FieldBase)` is False and the `FieldBase`-only methods (`ensure_capacity`, `is_same_type`, `erase_indices`, `reorder`, `reset_value`, `swap_elements`, `copy_element`) cannot be called from any concrete field instance.

**Repro**:
```python
import phynexis
F = phynexis.fields
sf = F.ScalarField("x", 5, 0.0)
print(isinstance(sf, F.FieldBase))   # False (should be True)
sf.ensure_capacity(50)               # AttributeError
sf.is_same_type(F.Int32Field())      # AttributeError
```

**Root cause**: `phynexis/bindings/fields/core/pyfield.cpp:38` —
```cpp
auto cls = pybind11::class_<Field<T>>(m, name.c_str(), pybind11::buffer_protocol())
```
should declare the C++ base class:
```cpp
auto cls = pybind11::class_<Field<T>, FieldBase>(m, name.c_str(), pybind11::buffer_protocol())
```

**Suggested fix**: Add `FieldBase` to the template parameter pack of `pybind11::class_<...>`. Once that lands, the duplicated bindings of `size`, `empty`, `resize`, `reserve`, `clear`, `name` on each `Field<T>` can be removed (they are inherited from `FieldBase`).

**File**: `phynexis/bindings/fields/core/pyfield.cpp`
**Status**: open

---

## 2026-05-03: `Field<T>` declares `buffer_protocol()` but no `def_buffer` — segfaults

**Module**: fields
**Class/Function**: `Field<T>` / `ScalarField` etc.
**Problem**: `pybind11::class_<Field<T>>(m, name, pybind11::buffer_protocol())` is set, but no `.def_buffer(...)` callback is provided. Any code that exercises the buffer protocol crashes the process.

**Repro**:
```python
import numpy as np
import phynexis
sf = phynexis.fields.ScalarField("p", 4, 7.0)
np.array(sf, copy=False)        # SIGSEGV / SIGBUS, exit 138
# memoryview(sf)                # also crashes
```

**Root cause**: `phynexis/bindings/fields/core/pyfield.cpp:38` enables the buffer protocol flag but `bind_field<T>` never installs the callback.

**Suggested fix**: Either drop the `pybind11::buffer_protocol()` flag (and rely on `to_numpy()` for array interop), or add:
```cpp
.def_buffer([](Field<T> &self) -> pybind11::buffer_info {
  return pybind11::buffer_info(
      self.data(),
      sizeof(T),
      pybind11::format_descriptor<T>::format(),
      1,
      { static_cast<ssize_t>(self.size()) },
      { static_cast<ssize_t>(sizeof(T)) }
  );
})
```
The latter is preferable since it enables zero-copy `np.array(field, copy=False)` and `memoryview(field)`.

**File**: `phynexis/bindings/fields/core/pyfield.cpp`
**Status**: open

---

## 2026-05-03: `Field<T>::data()` returns first element, not buffer pointer

**Module**: fields
**Class/Function**: `Field<T>::data()` / `Field<T>::data_const()`
**Problem**: The lambda binding returns `T*`, but with no `return_value_policy::reference_internal` plus a converter that turns the pointer into a single element. From Python `sf.data()` evaluates to `sf[0]`, which is misleading.

**Repro**:
```python
import phynexis
sf = phynexis.fields.ScalarField("s", 3, 5.0)
print(type(sf.data()), sf.data())   # <class 'float'> 5.0
```

**Root cause**: `phynexis/bindings/fields/core/pyfield.cpp:104-111` — `T*` cannot be sensibly returned to Python without an opaque pointer type or buffer view.

**Suggested fix**: Remove the `data()` / `data_const()` bindings (they are not useful from Python), or rebind to return `pybind11::memoryview` / `numpy.ndarray` view.

**File**: `phynexis/bindings/fields/core/pyfield.cpp`
**Status**: open

---

## 2026-05-03: `Field<T>::operator[]` is unchecked; `field[-1]` returns garbage

**Module**: fields
**Class/Function**: `Field<T>.__getitem__` / `__setitem__`
**Problem**: Lambda binding returns `self[idx]` directly, which uses the unchecked `T& Field<T>::operator[](Int64)`. Negative indices and out-of-range indices read uninitialised memory instead of raising.

**Repro**:
```python
import phynexis
sf = phynexis.fields.ScalarField("s", 5, 0.0)
for i in range(5):
    sf[i] = float(i + 10)
print(sf[-1])     # arbitrary memory, e.g. 2.35e-313
print(sf[100])    # arbitrary memory
```

**Root cause**: `phynexis/bindings/fields/core/pyfield.cpp:60-68`.

**Suggested fix**: Forward to `at(idx)`, which throws on out-of-range, and add normalisation `if (idx < 0) idx += self.size();` so Pythonic negative indexing works.

**File**: `phynexis/bindings/fields/core/pyfield.cpp`
**Status**: open

---

## 2026-05-03: `Field<T>::append_span` is unreachable — `VecX<T>` not exposed

**Module**: fields
**Class/Function**: `Field<T>::append_span(VecX<T>)`
**Problem**: The method is bound directly with `&Field<T>::append_span`, expecting a `VecX<T>`. But `phynexis.fields.VecX` is the `FieldType` enum tag, not the C++ container type, and there is no other Python alias for `VecX<double>` / `VecX<int32>` / etc. So `append_span` cannot be called from Python at all.

**Repro**:
```python
import phynexis
sf = phynexis.fields.ScalarField("s", 2, 5.0)
sf.append_span([11.0, 22.0])               # TypeError: incompatible function arguments
sf.append_span(numpy.array([11.0, 22.0]))  # TypeError
```

**Root cause**: `phynexis/bindings/fields/core/pyfield.cpp:129` — `&Field<T>::append_span` accepts `VecX<T>`, no Python conversion path exists.

**Suggested fix**: Wrap in a lambda that accepts `pybind11::sequence` (or numpy array) and forwards element-by-element via `push_back`:
```cpp
.def("append_span", [](Field<T> &self, pybind11::sequence seq) {
  for (auto h : seq) self.push_back(h.cast<T>());
}, pybind11::arg("buffer"))
```
Or expose `VecX<T>` properly under a stable Python name and document the round-trip.

**File**: `phynexis/bindings/fields/core/pyfield.cpp`
**Status**: open

---

## 2026-05-03: `Field<T>::operator==` is identity, not value equality

**Module**: fields
**Class/Function**: `Field<T>::operator==` / `operator!=`
**Problem**: `field.tpp` implements `operator==` as `data_ == other.data_ && name_ == other.name_` — pointer identity plus name match, not element-wise comparison. Two fields with identical contents compare unequal unless they share storage.

**Repro**:
```python
import phynexis
F = phynexis.fields
a = F.ScalarField("x", 3, 1.0)
b = F.ScalarField("x", 3, 1.0)
print(a == b)   # False (surprising — same name, same contents)
print(a == a)   # True
```

**Root cause**: `phynexis/src/fields/core/field.tpp` (search `operator==`). This is a C++ source design choice rather than a binding bug.

**Suggested fix**: This requires a C++ developer review. Options:
- Change the C++ semantics to value equality (preferred — matches user expectations and how `Vec3d` etc. compare).
- Keep identity semantics but expose a `equals(other)` method for value equality.
- Document the existing behaviour and let users compare `to_numpy()` arrays.

**File**: `phynexis/src/fields/core/field.tpp` — **do not modify, escalate to C++ owner**.
**Status**: open
**Note**: Source-side issue, not a binding bug. Logged here for visibility.

---

## Backlog Format

When adding a new entry, use this template:

```markdown
## YYYY-MM-DD: Brief description

**Module**: {module}
**Class/Function**: {class_or_function}
**Problem**: One sentence.

**Repro**:
```python
import phynexis
# minimal repro
```

**Root cause**: File and line number if known.
**Suggested fix**: Brief description.
**File**: `phynexis/bindings/...`
**Status**: open | in_progress | fixed
```
