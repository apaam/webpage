---
title: "Field Views"
displayed_sidebar: pythonApiSidebar
---

# Field Views

> **C++**: `phynexis::fields::{FieldViewBase, ScalarFieldView, Vec3FieldView, Vec4FieldView, Vec6FieldView, VecNFieldView, VecXFieldView}`
> **Python**: `phynexis.fields`
> **Headers**: `src/fields/views/*.hpp`

Field views are **non-owning wrappers** over existing scalar/vector fields. They provide a unified, type-safe interface for reading and writing field data without copying memory. Views are commonly used for SOA (Structure of Arrays) access patterns — e.g., treating three scalar fields `x`, `y`, `z` as a single vector field.

All view types inherit from `FieldViewBase`.

---

## Type Summary

| Python Class | C++ Type | Element / Component Type |
|--------------|----------|--------------------------|
| `FieldViewBase` | `FieldViewBase` | — (abstract) |
| `ScalarFieldView` (alias `FieldView`) | `ScalarFieldView<Double>` | `float` |
| `Int32FieldView` (alias `Idx32FieldView`) | `ScalarFieldView<Int32>` | `int` (32-bit) |
| `Int64FieldView` (alias `Idx64FieldView`) | `ScalarFieldView<Int64>` | `int` (64-bit) |
| `BoolFieldView` | `ScalarFieldView<bool>` | `bool` |
| `Vec3dField` | `Vec3FieldView<Double>` | `float` |
| `Vec3iField` | `Vec3FieldView<Int32>` | `int` (32-bit) |
| `Vec4dField` (alias `QuaternionField`) | `Vec4FieldView<Double>` | `float` |
| `Vec6dField` | `Vec6FieldView<Double>` | `float` |
| `VecNdField` | `VecNFieldView<Double>` | `float` |
| `VecXdFieldView` | `VecXFieldView<Double>` | `float` |
| `VecXiFieldView` | `VecXFieldView<Int32>` | `int` (32-bit) |

---

## Common API (FieldViewBase)

All views share the following methods.

### `is_valid()`

Returns `True` if the view references valid (non-null) underlying fields.

### `__bool__()`

Same as `is_valid()`. Allows `if view:` syntax.

### `size()` / `__len__()`

Returns the number of elements (rows) in the view.

### `empty()`

Returns `True` if `size() == 0`.

### `get_name(delimiter)`

Returns the base name of the view. For compound views (Vec3, Vec4, etc.), this strips the component suffix using the given delimiter.

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `delimiter` | `str` | `"."` | Delimiter used to split component names |

**Known issue:** The `delimiter` default is not automatically supplied from Python. Pass it explicitly: `view.get_name(".")`.

### `get_field_names()`

Returns a `list[str]` of the underlying field names.

---

## ScalarFieldView

Single-field view. Wraps one `Field<T>` and provides direct element access.

### Constructors

| Signature | Description |
|-----------|-------------|
| `ScalarFieldView()` | Empty (invalid) view. |
| `ScalarFieldView(field)` | View over a `ScalarField` (or `FieldBase`). |

**Example:**
```python
import phynexis
F = phynexis.fields

fm = F.FieldManager()
h = fm.create_field(F.FieldMeta("temp", F.FieldType.Scalar, F.ValueType.Double))
f = fm.get_field(h)

view = F.ScalarFieldView(f)
print(view.size(), view.is_valid())  # 0 True

# Element access
view.resize(3)
view[0] = 1.0
view[1] = 2.0
print(view[0], view[1])  # 1.0 2.0
```

### `field_ptr()`

Returns the underlying `Field<T>*` pointer.

### `field_ref()`

Returns a reference to the underlying field. Same as dereferencing `field_ptr()`.

### `data()`

Returns a pointer to the raw data buffer. **Unsafe** from Python — use `__getitem__` / `__setitem__` instead.

### `__getitem__(idx)` / `__setitem__(idx, value)`

Direct element read/write. No bounds checking; use with caution.

### `__getattr__(name)`

Forwards unknown attribute access to the underlying field object. Allows calling field methods through the view.

---

## Vec3FieldView

View over three scalar fields interpreted as `(x, y, z)` components.

### Constructors

| Signature | Description |
|-----------|-------------|
| `Vec3dField(x, y, z)` | View over three `ScalarField` (or `FieldBase`) objects. |
| `Vec3iField(x, y, z)` | View over three `Int32Field` objects. |

**Example:**
```python
import phynexis
F = phynexis.fields

fm = F.FieldManager()
hx = fm.create_field(F.FieldMeta("pos.x", F.FieldType.Scalar, F.ValueType.Double))
hy = fm.create_field(F.FieldMeta("pos.y", F.FieldType.Scalar, F.ValueType.Double))
hz = fm.create_field(F.FieldMeta("pos.z", F.FieldType.Scalar, F.ValueType.Double))

x = fm.get_field(hx)
y = fm.get_field(hy)
z = fm.get_field(hz)

for f in [x, y, z]:
    f.resize(3)

v3 = F.Vec3dField(x, y, z)
print(v3.size())        # 3
print(v3.get_name(".")) # "pos"

# Component access (returns ScalarFieldView)
print(v3.x().size())    # 3

# Indexed component access (returns scalar value)
print(v3.x(0))          # 0.0 (default-initialized)

# __getitem__ returns Vec3d (Double version only)
v3.x()[0] = 1.0
v3.y()[0] = 2.0
v3.z()[0] = 3.0
print(v3[0])            # Vec3d(1.0, 2.0, 3.0)
```

### Component Access

| Method | Returns | Description |
|--------|---------|-------------|
| `x()` | `ScalarFieldView` | View over the x-component field |
| `y()` | `ScalarFieldView` | View over the y-component field |
| `z()` | `ScalarFieldView` | View over the z-component field |
| `x(i)` | `float` / `int` | Value of x at index `i` |
| `y(i)` | `float` / `int` | Value of y at index `i` |
| `z(i)` | `float` / `int` | Value of z at index `i` |

---

## Vec4FieldView

View over four scalar fields interpreted as `(w, x, y, z)` components. Exposed as `Vec4dField` and aliased as `QuaternionField`.

### Constructors

| Signature | Description |
|-----------|-------------|
| `Vec4dField(w, x, y, z)` | View over four `ScalarField` (or `FieldBase`) objects. |

### Component Access

| Method | Returns | Description |
|--------|---------|-------------|
| `w()` | `ScalarFieldView` | View over the w-component field |
| `x()` | `ScalarFieldView` | View over the x-component field |
| `y()` | `ScalarFieldView` | View over the y-component field |
| `z()` | `ScalarFieldView` | View over the z-component field |
| `w(i)` | `float` | Value of w at index `i` |
| `x(i)` | `float` | Value of x at index `i` |
| `y(i)` | `float` | Value of y at index `i` |
| `z(i)` | `float` | Value of z at index `i` |

---

## Vec6FieldView

View over six scalar fields interpreted as symmetric tensor components `(xx, yy, zz, xy, xz, yz)`.

### Constructors

| Signature | Description |
|-----------|-------------|
| `Vec6dField(xx, yy, zz, xy, xz, yz)` | View over six `ScalarField` (or `FieldBase`) objects. |

### Component Access

| Method | Returns | Description |
|--------|---------|-------------|
| `xx()` | `ScalarFieldView` | View over the xx-component field |
| `yy()` | `ScalarFieldView` | View over the yy-component field |
| `zz()` | `ScalarFieldView` | View over the zz-component field |
| `xy()` | `ScalarFieldView` | View over the xy-component field |
| `xz()` | `ScalarFieldView` | View over the xz-component field |
| `yz()` | `ScalarFieldView` | View over the yz-component field |

**Note:** Indexed component access (`xx(i)`, etc.) is **not bound** in Python.

---

## VecNFieldView

View over N scalar fields of arbitrary dimension. Unlike Vec3/Vec4/Vec6, the dimension is determined at runtime by the number of fields passed.

### Constructors

| Signature | Description |
|-----------|-------------|
| `VecNdField()` | Empty (invalid) view. |

**Note:** Constructors taking a field list (`VecX<FieldBase*>`) are **not bound** in Python because `VecX<FieldBase*>` is not exposed. Create views through `FieldManager` layouts or C++ APIs instead.

### `__getitem__(index)`

Returns a `ScalarFieldView` over the field at the given index.

---

## VecXFieldView

View over a `VecXField<T>` (ragged/jagged array field). Provides row-level access.

### Constructors

| Signature | Description |
|-----------|-------------|
| `VecXdFieldView(field)` | View over a `VecXdField`. |
| `VecXiFieldView(field)` | View over a `VecXiField`. |

### `__call__(i, j)`

Access element at row `i`, column `j`. Returns a mutable reference.

```python
vxf = F.VecXdField(3)
vxf.push_back(0, 1.0)
vxf.push_back(0, 2.0)

view = F.VecXdFieldView(vxf)
print(view(0, 0))  # 1.0
print(view(0, 1))  # 2.0
```

### `row_size(i)`

Returns the number of elements in row `i`.

### `row_capacity(i)`

Returns the allocated capacity of row `i`.

### `get_total_elements()`

Returns the total number of stored elements across all rows.

### `__getitem__(i)`

Returns a `VecXFieldRowView<T>` for row `i`.

---

## Known Issues

### `get_name()` requires explicit delimiter argument

The C++ default argument `delimiter = "."` is not propagated through pybind11. Always pass a delimiter string:

```python
name = view.get_name(".")  # OK
name = view.get_name()      # TypeError
```

**Status**: noted

### `LinkedFieldRowView.data()` may segfault

Iterating a `LinkedFieldRowView` returned from `LinkedFieldView.get_targets()` or `get_sources()` can crash. The underlying C++ `RowView` is a proxy type whose lifetime rules are not fully captured by the Python binding.

**Workaround:** Access individual elements by index instead of calling `.data()`.

**Status**: noted

### `VecNFieldView` list constructor not exposed

`VecNdField(fields: list[FieldBase])` is not available because `VecX<FieldBase*>` is not registered with pybind11.

**Workaround:** Use default constructor; practical construction requires C++-side `BoundLayout` or `FieldManager` integration.

**Status**: noted

### `Vec6FieldView` indexed accessors not bound

`xx(i)`, `yy(i)`, etc. are not exposed in Python. Use the component view (`v6.xx()`) and then index the `ScalarFieldView`.

**Workaround:**
```python
v6.xx()[i]  # instead of v6.xx(i)
```

**Status**: noted
