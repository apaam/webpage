---
title: "Field / ScalarField"
displayed_sidebar: pythonApiSidebar
---

# Field / ScalarField

> **C++**: `phynexis::fields::Field<T>`
> **Python**: `phynexis.fields.ScalarField` / `Int32Field` / `Int64Field` / `BoolField`
> **Header**: `src/fields/core/field.hpp`

Concrete one-dimensional homogeneous field container, the workhorse type of the
`fields` module. The C++ template `Field<T>` is exposed in Python as one
non-templated class per primitive value type. `Field` is an alias for
`ScalarField` (i.e. `Field<double>`), and `Idx32Field` / `Idx64Field` are
aliases for `Int32Field` / `Int64Field`.

| Python class | C++ instantiation | Element type |
|--------------|-------------------|--------------|
| `ScalarField` (alias `Field`) | `Field<double>` | `float` (64-bit) |
| `Int32Field` (alias `Idx32Field`) | `Field<Int32>` | `int` (32-bit) |
| `Int64Field` (alias `Idx64Field`) | `Field<Int64>` | `int` (64-bit) |
| `BoolField` | `Field<bool>` | `bool` |


## Constructors

| Signature | Description |
|-----------|-------------|
| `ScalarField()` | Empty field, no name. |
| `ScalarField(size)` | Default-initialised field of length `size`. |
| `ScalarField(size, value)` | Field of length `size` filled with `value`. |
| `ScalarField(name, size=0)` | Named field, optionally pre-sized. |
| `ScalarField(name, size, value)` | Named field, pre-sized and filled. |
| `ScalarField(data, name)` | Build from a `VecX<T>` buffer with a name. |
| `ScalarField(other)` | Copy constructor. |

The `ScalarField(data: VecX<T>)` and `ScalarField(name, data: VecX<T>)` overloads exist
in the binding but require a `VecX<T>` instance, which is not exposed in Python.
Use `from_numpy` (see below) for the numpy round-trip instead.

**Example:**

```python
import phynexis

F = phynexis.fields

print(repr(F.ScalarField()))
print(repr(F.ScalarField(5)))
print(repr(F.ScalarField(5, 3.14)))
print(repr(F.ScalarField("rho", 5)))
print(repr(F.ScalarField("rho", 5, 1000.0)))
```

**Output:**

```text
ScalarField(size=0, name='')
ScalarField(size=5, name='')
ScalarField(size=5, name='')
ScalarField(size=5, name='rho')
ScalarField(size=5, name='rho')
```


## NumPy Interop

### `to_numpy()`

Returns a 1-D `numpy.ndarray` with a **copy** of the field data.

**Returns:** `numpy.ndarray` — same dtype as the field element type.

### class method `from_numpy(array)`

Creates a new field whose contents are copied from `array`. The element type is
fixed by the binding type, so the dtype must match (`float64` for `ScalarField`,
`int32` for `Int32Field`, etc.).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `array` | `numpy.ndarray` | 1-D array; dtype must match the field type |

**Example:**

```python
import numpy as np
import phynexis

F = phynexis.fields

sf = F.ScalarField.from_numpy(np.linspace(0.0, 1.0, 5))
print(repr(sf))
print(sf.to_numpy())
```

**Output:**

```text
ScalarField(size=5, name='')
[0.   0.25 0.5  0.75 1.  ]
```


## Element Access

| Method / operator | Description |
|-------------------|-------------|
| `field[idx]` | Read/write element. **No bounds check** — out-of-range indices read uninitialised memory. |
| `len(field)` | Equivalent to `field.size()`. |
| `at(index)` | Bounds-checked read/write. Raises `IndexError` if out of range. |
| `at_const(index)` | Bounds-checked read-only access. |
| `data()` | Returns the value at index 0 (not a buffer). Mostly useful as a presence check. |

**Example:**

```python
import phynexis

F = phynexis.fields

sf = F.ScalarField("v", 4, 0.0)
sf[0], sf[1], sf[2], sf[3] = 1.0, 2.0, 3.0, 4.0
print("len(sf):", len(sf))
print("sf[2]:", sf[2])
print("sf.at(2):", sf.at(2))

try:
    sf.at(99)
except IndexError as e:
    print("sf.at(99):", repr(e))
```

**Output:**

```text
len(sf): 4
sf[2]: 3.0
sf.at(2): IndexError('Field index out of range')
```

:::warning
`field[idx]` does not validate the index. Negative indices or indices beyond
`size()` will return arbitrary memory contents instead of raising. Use
`field.at(idx)` whenever the index is not statically known.
:::


## Capacity

| Method | Description |
|--------|-------------|
| `size()` | Number of elements currently stored. |
| `empty()` | `True` if `size() == 0`. |
| `capacity()` | Allocated buffer size; always `>= size()`. |
| `resize(new_size)` | Grow / shrink to `new_size`; new elements are default-initialised. |
| `resize(new_size, value)` | Grow to `new_size`, padding with `value`. |
| `reserve(capacity)` | Pre-allocate to avoid reallocation. Does not change `size()`. |
| `clear()` | Sets `size()` to 0. Capacity is retained. |
| `push_back(value)` | Append a single element. |
| `pop_back()` | Remove the last element. |

**Example:**

```python
import phynexis

F = phynexis.fields

sf = F.ScalarField()
sf.reserve(100)
print("after reserve(100): size=", sf.size(), "capacity=", sf.capacity())

sf.push_back(1.0)
sf.push_back(2.0)
print("after 2 push_back:", sf.to_numpy(),
      "size=", sf.size(), "capacity=", sf.capacity())

sf.pop_back()
print("after pop_back:", sf.to_numpy())

sf.clear()
print("after clear: size=", sf.size(), "capacity=", sf.capacity())

sf.resize(3)
print("resize(3):", sf.to_numpy())

sf.resize(5, 9.0)
print("resize(5, 9.0):", sf.to_numpy())
```

**Output:**

```text
after reserve(100): size= 0 capacity= 100
after 2 push_back: [1. 2.] size= 2 capacity= 100
after pop_back: [1.]
after clear: size= 0 capacity= 100
resize(3): [0. 0. 0.]
resize(5, 9.0): [0. 0. 0. 9. 9.]
```


## Bulk Operations

| Method | Description |
|--------|-------------|
| `fill(value)` | Set all elements to `value`. |
| `append(other)` | Concatenate `other` (same field type) onto the end of this field. |
| `append_span(buffer)` | Append from a `VecX<T>` buffer (not exposed in Python — see notes below). |
| `swap(other)` | Swap contents with another field of the same type, including names. |
| `subset(mask)` | Build a [`FieldHolder`](field-holder.md) containing only elements where `mask[i] == True`. The mask must be a `BoolField` of the same length. |

**Example:**

```python
import numpy as np
import phynexis

F = phynexis.fields

# fill
sf = F.ScalarField("a", 4, 0.0)
sf.fill(7.0)
print("after fill(7):", sf.to_numpy())

# append
a = F.ScalarField("a", 3, 1.0)
b = F.ScalarField("b", 2, 9.0)
a.append(b)
print("a.append(b):", a.to_numpy())

# swap (note: name is swapped too)
a = F.ScalarField("a", 3, 1.0)
b = F.ScalarField("b", 3, 2.0)
a.swap(b)
print(f"after swap: a name={a.name} data={a.to_numpy()}")
print(f"            b name={b.name} data={b.to_numpy()}")

# subset
sf = F.ScalarField.from_numpy(np.array([10.0, 20.0, 30.0, 40.0, 50.0]))
mask = F.BoolField.from_numpy(np.array([True, False, True, False, True]))
holder = sf.subset(mask)
print("subset returns:", type(holder).__name__)
```

**Output:**

```text
after fill(7): [7. 7. 7. 7.]
a.append(b): [1. 1. 1. 9. 9.]
after swap: a name=b data=[2. 2. 2.]
            b name=a data=[1. 1. 1.]
subset returns: FieldHolder
```


## Arithmetic (Double only)

`ScalarField` (i.e. `Field<double>`) supports element-wise arithmetic with both
scalars and other `ScalarField`s of the same length. **Integer and bool fields
do not implement these operators** — only `Field<double>`.

| Operator | Field, Field | Field, scalar | scalar, Field |
|----------|--------------|---------------|---------------|
| `+` | element-wise | broadcast | broadcast |
| `-` | element-wise | broadcast | broadcast |
| `*` | element-wise | broadcast | broadcast |
| `/` | element-wise | broadcast | — |

**Example:**

```python
import phynexis

F = phynexis.fields

a = F.ScalarField("a", 4, 1.0)
b = F.ScalarField("b", 4, 2.0)

print("a + b:", (a + b).to_numpy())
print("a - b:", (a - b).to_numpy())
print("a * b:", (a * b).to_numpy())
print("b / a:", (b / a).to_numpy())
print("a + 5:", (a + 5).to_numpy())
print("5 + a:", (5 + a).to_numpy())
print("5 - a:", (5 - a).to_numpy())
print("3 * a:", (3 * a).to_numpy())
```

**Output:**

```text
a + b: [3. 3. 3. 3.]
a - b: [-1. -1. -1. -1.]
a * b: [2. 2. 2. 2.]
b / a: [2. 2. 2. 2.]
a + 5: [6. 6. 6. 6.]
5 + a: [6. 6. 6. 6.]
5 - a: [4. 4. 4. 4.]
3 * a: [3. 3. 3. 3.]
```

The mismatched-size case raises `RuntimeError("Field sizes must match")`.


## Comparison Semantics

`==` and `!=` test **identity**, not value equality:

```cpp
return data_ == other.data_ && name_ == other.name_;
```

That is, two fields compare equal only if they share the same internal pointer
*and* have the same name — effectively only when comparing a field with itself
or an alias.

```python
import phynexis

F = phynexis.fields

a = F.ScalarField("x", 3, 1.0)
b = F.ScalarField("x", 3, 1.0)  # same name and contents, different storage
print("identical contents, separate fields a == b:", a == b)
print("self-comparison           a == a:", a == a)
```

**Output:**

```text
identical contents, separate fields a == b: False
self-comparison           a == a: True
```

For **value-equality**, compare `to_numpy()` arrays.


## Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `name` | `str` | read/write | Field name (used by `FieldManager`, I/O, etc.). |


## Type Aliases and Integer / Bool Fields

```python
import phynexis

F = phynexis.fields

print("Field is ScalarField:    ", F.Field is F.ScalarField)
print("Idx32Field is Int32Field:", F.Idx32Field is F.Int32Field)
print("Idx64Field is Int64Field:", F.Idx64Field is F.Int64Field)

i32 = F.Int32Field("idx", 5, 7)
i32[2] = 999
print("Int32Field:", i32.to_numpy())

i64 = F.Int64Field("idx", 3, 10**12)
print("Int64Field:", i64.to_numpy())

bf = F.BoolField("active", 4, True)
bf[1] = False
print("BoolField :", bf.to_numpy())
```

**Output:**

```text
Field is ScalarField:     True
Idx32Field is Int32Field: True
Idx64Field is Int64Field: True
Int32Field: [  7   7 999   7   7]
Int64Field: [1000000000000 1000000000000 1000000000000]
BoolField : [ True False  True  True]
```


## Known Issues

- **`field[idx]` is unchecked.** Use `field.at(idx)` whenever the index might be
  out of range or negative — `field[-1]` returns garbage instead of the last
  element.
- **`data()` returns the first element**, not a buffer pointer. Use `to_numpy()`
  to obtain the data as an array.
- **`np.array(field, copy=False)` segfaults.** The class declares
  `pybind11::buffer_protocol()` but no `def_buffer` callback. Use `to_numpy()`.
- **`==` is identity equality**, not value equality (see above).
- **`Field<T>` is not registered as a subclass of `FieldBase`** in pybind, so
  `isinstance(field, FieldBase)` is `False` and the `FieldBase`-only methods
  (`ensure_capacity`, `is_same_type`, `erase_indices`, `reorder`, `reset_value`,
  `swap_elements`, `copy_element`) are unreachable from Python field instances.
  Tracked in `binding-repair-backlog.md` (2026-05-03 entry).


## Unexposed C++ API

The following C++ methods exist on `Field<T>` but are not bound:

- `value_type()` / `field_type()` — type tag queries (`ValueType`, `FieldType`).
- `is_same_type(other)` — type-tag equivalent of `isinstance` for fields.
- `erase_indices(indices)`, `reorder(new_to_old)` — bulk index operations.
- `reset_value(i)` / `reset_values()` / `set_value(i, void*)` / `get_value_ptr(i)`
  — generic value pokes used by `FieldHolder` internals.
- `subset_inplace(mask)` — in-place variant of `subset`.
- `save_to(path, file, opt)` / `load_from(path, file, opt)` — file persistence;
  the alternative free-function entry points are `write_binary` / `read_binary`
  (documented separately under field I/O).
- `to_binary(out)` / `from_binary(in)` / `pack(out, idx)` / `unpack(in, idx)` —
  binary serialisation hooks consumed by the manager.
- `Field<T>(name, comp_id, size, value)` — component-field constructor used by
  schema-driven layouts.
- Iteration via `begin()` / `end()` — Python-side iteration is available through
  `to_numpy()` or `[i]` access.
