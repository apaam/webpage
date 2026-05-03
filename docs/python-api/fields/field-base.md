---
title: "FieldBase"
---

# FieldBase

> **C++**: `phynexis::fields::FieldBase`
> **Python**: `phynexis.fields.FieldBase`
> **Header**: `src/fields/core/field_base.hpp`

## Description

`FieldBase` is the abstract base class for all field containers in phynexis. It defines the common interface shared by `ScalarField`, `Int32Field`, `Int64Field`, `BoolField`, and all other typed field specializations.

**Important**: `FieldBase` cannot be instantiated directly in Python (or C++). Use concrete subclasses such as `ScalarField` instead.

**Known Issue**: Due to a pybind11 binding defect, `Field<T>` is not currently registered as a subclass of `FieldBase`. As a result, `FieldBase`-only methods (`ensure_capacity`, `erase_indices`, `reorder`, `swap_elements`, `copy_element`, `reset_value`, `is_same_type`) are **unreachable from any concrete field instance**. The methods that do work (`size`, `empty`, `resize`, `reserve`, `clear`, `name`) are available because each subclass re-binds them independently.

## Constructors

`FieldBase` has no exposed constructor. It is an abstract class.

## Methods

### `size()`

Returns the number of elements in the field.

**Returns:** `int` — element count

**Example:**
```python
import phynexis
sf = phynexis.fields.ScalarField("pressure", 100, 0.0)
print(sf.size())
```

**Output:**
```text
100
```

---

### `empty()`

Returns `True` if the field contains no elements.

**Returns:** `bool`

**Example:**
```python
import phynexis
sf = phynexis.fields.ScalarField("empty_field", 0, 0.0)
print(sf.empty())
```

**Output:**
```text
True
```

---

### `resize(new_size, value=None)`

Changes the number of elements. If `value` is provided, new elements are initialized to it; otherwise default construction is used.

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `new_size` | `int` | — | New element count |
| `value` | `float` / `int` / `bool` | `None` | Value for new elements |

**Example:**
```python
import phynexis
sf = phynexis.fields.ScalarField("x", 3, 1.0)
sf.resize(5)
print("size after resize:", sf.size())
sf.resize(5, 7.0)
print("values:", [sf[i] for i in range(5)])
```

**Output:**
```text
size after resize: 5
values: [1.0, 1.0, 1.0, 7.0, 7.0]
```

---

### `reserve(capacity)`

Pre-allocates internal storage for at least `capacity` elements without changing the logical size.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `capacity` | `int` | Minimum storage capacity |

---

### `clear()`

Removes all elements, setting size to 0.

**Example:**
```python
import phynexis
sf = phynexis.fields.ScalarField("x", 5, 1.0)
sf.clear()
print(sf.size(), sf.empty())
```

**Output:**
```text
0 True
```

---

### `ensure_capacity(total_needed)`

Ensures the field can hold at least `total_needed` elements. Equivalent to `reserve(total_needed)` if capacity is insufficient.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `total_needed` | `int` | Required minimum capacity |

**Status**: ⚠️ Unreachable — see Known Issues below.

---

### `erase_indices(idx_sorted_unique)`

Removes elements at the given indices. Indices must be sorted in ascending order and unique.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `idx_sorted_unique` | `list[int]` | Sorted unique indices to remove |

**Status**: ⚠️ Unreachable — see Known Issues below.

---

### `reorder(new_to_old)`

Reorders elements in-place according to the permutation map.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `new_to_old` | `list[int]` | For each new position `i`, `new_to_old[i]` gives the old index |

**Status**: ⚠️ Unreachable — see Known Issues below.

---

### `swap_elements(i, j)`

Swaps the elements at indices `i` and `j`.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `i` | `int` | First index |
| `j` | `int` | Second index |

**Status**: ⚠️ Unreachable — see Known Issues below.

---

### `copy_element(src_index, dst_index)`

Copies the value at `src_index` to `dst_index`.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `src_index` | `int` | Source index |
| `dst_index` | `int` | Destination index |

**Status**: ⚠️ Unreachable — see Known Issues below.

---

### `reset_value(index)`

Resets the element at `index` to its type's default value (`0.0`, `0`, or `False`).

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `index` | `int` | Index to reset |

**Status**: ⚠️ Unreachable — see Known Issues below.

---

### `is_same_type(other)`

Returns `True` if `other` has the same `ValueType` and `FieldType`.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `other` | `FieldBase` | Another field to compare with |

**Returns:** `bool`

**Status**: ⚠️ Unreachable — see Known Issues below.

## Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `name` | `str` | read/write | Field name identifier |

**Example:**
```python
import phynexis
sf = phynexis.fields.ScalarField("old_name", 10, 0.0)
print(sf.name)
sf.name = "new_name"
print(sf.name)
```

**Output:**
```text
old_name
new_name
```

## Unexposed C++ API

The following C++ APIs are not exposed via pybind:

- `append(other)` — append another field of the same type
- `reset_values()` — reset all elements to default
- `set_value(index, void* value)` — untyped value setter (not Python-friendly)
- `get_value_ptr(index)` — returns untyped pointer (not Python-friendly)
- `value_type()` — returns `ValueType` enum
- `field_type()` — returns `FieldType` enum
- `subset(mask)` — extract elements where `mask[i]` is `True`; returns `FieldHolder`
- `subset_inplace(mask)` — in-place subset
- `to_binary(out)` / `from_binary(in)` — binary serialization
- `pack(out, indices)` / `unpack(in, target_indices)` — selective binary I/O

## Known Issues

### `Field<T>` not registered as subclass of `FieldBase`

`pyfield.cpp` uses `pybind11::class_<Field<T>>(m, name)` without declaring `FieldBase` as the base class. As a result:

- `isinstance(scalar_field, FieldBase)` returns `False`
- `FieldBase`-only methods bound in `pyfield_base.cpp` are invisible on concrete field instances
- The methods that **do** work on subclasses (`size`, `empty`, `resize`, `reserve`, `clear`, `name`) are available because `pyfield.cpp` re-binds them independently

**Workaround**: None. Requires binding fix in `phynexis/bindings/fields/core/pyfield.cpp`:
```cpp
// Current (broken)
pybind11::class_<Field<T>>(m, name.c_str(), pybind11::buffer_protocol())

// Fixed
pybind11::class_<Field<T>, FieldBase>(m, name.c_str(), pybind11::buffer_protocol())
```
Once fixed, the duplicated bindings of `size`, `empty`, `resize`, `reserve`, `clear`, `name` on `Field<T>` can be removed (inherited from `FieldBase`).

**File**: `phynexis/bindings/fields/core/pyfield.cpp`
**Status**: open — tracked in `binding-repair-backlog.md`
