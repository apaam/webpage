---
title: "FieldManager"
---

# FieldManager

> **C++**: `phynexis::fields::FieldManager`
> **Python**: `phynexis.fields.FieldManager`
> **Header**: `src/fields/core/manager.hpp`

## Description

`FieldManager` provides centralized lifecycle management for a collection of fields. It maintains a `KeyedObjectPool` of `FieldBase*` pointers, tracks a `FieldLayout`, and ensures all managed fields share the same size. Use it to create, resize, subset, and persist groups of fields together.

## Constructors

### `FieldManager()`

Creates an empty manager with no fields and size 0.

**Example:**
```python
import phynexis
fm = phynexis.fields.FieldManager()
print(fm.field_size(), fm.get_field_count())
```

**Output:**
```text
0 0
```

## Methods

### `create_field(meta)`

Creates a single field from metadata and registers it.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `meta` | `FieldMeta` | Metadata for the new field |

**Returns:** `FieldHandle` — handle to the created field

**Example:**
```python
import phynexis
F = phynexis.fields

fm = F.FieldManager()
meta = F.FieldMeta("pressure", F.FieldType.Scalar, F.ValueType.Double)
h = fm.create_field(meta)
print(h)
fm.resize_fields(10)
print(fm.field_size())
```

**Output:**
```text
FieldHandle(index=0, epoch=0)
10
```

---

### `create_fields(metas)`

Creates multiple fields from a `FieldLayout` (or list of `FieldMeta`).

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `metas` | `FieldLayout` or `list[FieldMeta]` | Layout describing the fields to create |

**Returns:** `list[FieldHandle]`

**Example:**
```python
import phynexis
F = phynexis.fields

fm = F.FieldManager()
layout = F.FieldLayout([
    F.FieldMeta("x", F.FieldType.Scalar, F.ValueType.Double),
    F.FieldMeta("v", F.FieldType.VecX, F.ValueType.Double),
])
handles = fm.create_fields(layout)
print([str(h) for h in handles])
```

**Output:**
```text
['FieldHandle(index=0, epoch=0)', 'FieldHandle(index=1, epoch=0)']
```

---

### `ensure_fields(layout)` / `ensure_fields(metas)` / `ensure_fields(schema)`

Ensures all fields described by the layout/schema exist; creates any that are missing. Existing fields are left untouched.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `layout` | `FieldLayout` | Layout to ensure |
| `metas` | `list[FieldMeta]` | List of metadata (auto-converted to layout) |
| `schema` | `FieldSchema` | Schema to ensure |

**Returns:** `bool` — `True` if any new field was created

**Example:**
```python
import phynexis
F = phynexis.fields

fm = F.FieldManager()
fm.create_field(F.FieldMeta("x", F.FieldType.Scalar, F.ValueType.Double))
fm.resize_fields(5)

# "x" already exists, "y" will be created
fm.ensure_fields([
    F.FieldMeta("x", F.FieldType.Scalar, F.ValueType.Double),
    F.FieldMeta("y", F.FieldType.Scalar, F.ValueType.Double),
])
print(fm.get_field_count())
```

**Output:**
```text
2
```

---

### `remove_field(name)` / `remove_field(handle)`

Removes a field by name or by handle.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `str` | Field name |
| `handle` | `FieldHandle` | Field handle |

**Example:**
```python
import phynexis
F = phynexis.fields

fm = F.FieldManager()
fm.create_field(F.FieldMeta("x", F.FieldType.Scalar, F.ValueType.Double))
fm.remove_field("x")
print(fm.has_field("x"))
```

**Output:**
```text
False
```

---

### `has_field(name)`

Returns `True` if a field with the given name exists.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `str` | Field name to check |

**Returns:** `bool`

---

### `valid_field_handle(handle)`

Checks if a handle is still valid (index in range and epoch matches).

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `handle` | `FieldHandle` | Handle to validate |

**Returns:** `bool`

---

### `get_field(handle)`

Retrieves the concrete field instance for a handle. The runtime type is resolved via RTTI (e.g. `ScalarField`, `VecXdField`).

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `handle` | `FieldHandle` | Field handle |

**Returns:** concrete `Field` subclass (e.g. `ScalarField`)

**Example:**
```python
import phynexis
F = phynexis.fields

fm = F.FieldManager()
h = fm.create_field(F.FieldMeta("p", F.FieldType.Scalar, F.ValueType.Double))
fm.resize_fields(5)
f = fm.get_field(h)
print(type(f).__name__)
```

**Output:**
```text
ScalarField
```

---

### `find_field(name)`

Finds a field by name and returns its handle.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `str` | Field name |

**Returns:** `FieldHandle`

---

### `field_size()`

Returns the shared element count of all managed fields.

**Returns:** `int`

---

### `resize_fields(new_size)`

Resizes **all** managed fields to `new_size`.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `new_size` | `int` | New element count for all fields |

---

### `reserve_fields(capacity)`

Reserves capacity for all managed fields without changing their sizes.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `capacity` | `int` | Capacity to reserve |

---

### `clear_fields()`

Clears all elements from all fields (size becomes 0). Fields themselves remain registered.

---

### `clear()`

Removes all fields and resets the manager to its initial empty state.

---

### `subset_fields(mask)`

Extracts a subset of elements where `mask[i]` is `True`, returning a new `FieldManager`.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `mask` | `BoolField` | Boolean mask field |

**Returns:** `FieldManager` — new manager containing the subset

**Known Issue**: The returned manager may have `field_size() == 0` even when the subset is non-empty. This appears to be a C++ source behavior; the field count and names are correct.

**Example:**
```python
import phynexis
F = phynexis.fields

fm = F.FieldManager()
fm.create_field(F.FieldMeta("x", F.FieldType.Scalar, F.ValueType.Double))
fm.resize_fields(5)

mask = F.BoolField("mask", 5, True)
mask[0] = False
mask[2] = False

fm2 = fm.subset_fields(mask)
print(fm2.get_field_count(), fm2.get_field_names())
```

**Output:**
```text
1 ['x']
```

---

### `subset_fields_inplace(mask)`

Same as `subset_fields` but modifies the current manager in-place.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `mask` | `BoolField` | Boolean mask field |

---

### `check_size_consistency()`

Returns `True` if all fields have the same size.

**Returns:** `bool`

---

### `get_inconsistent_fields()`

Returns the names of fields whose size differs from the majority.

**Returns:** `list[str]`

---

### `reset_field_values(index)`

Resets all field values at `index` to their type defaults.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `index` | `int` | Element index to reset |

---

### `copy_field_values(src_index, dst_index)`

Copies all field values from `src_index` to `dst_index`.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `src_index` | `int` | Source index |
| `dst_index` | `int` | Destination index |

---

### `set_field_value(index, name, value)`

Sets a single field value by name at the given index.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `index` | `int` | Element index |
| `name` | `str` | Field name |
| `value` | `float` / `int` / `bool` | Value to set |

**Example:**
```python
import phynexis
F = phynexis.fields

fm = F.FieldManager()
fm.create_field(F.FieldMeta("p", F.FieldType.Scalar, F.ValueType.Double))
fm.resize_fields(3)
fm.set_field_value(1, "p", 99.5)
ok, val = fm.get_field_value(1, "p")
print(val)
```

**Output:**
```text
{'p': 99.5}
```

---

### `get_field_value(index, name)`

Reads a single field value by name at the given index.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `index` | `int` | Element index |
| `name` | `str` | Field name |

**Returns:** `tuple[bool, dict]` — `(success, {name: value})`

---

### `set_field_values(index, values)`

Sets multiple field values at an index from a JSON-like dict.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `index` | `int` | Element index |
| `values` | `dict` | `{field_name: value, ...}` |

---

### `get_field_values(index)`

Reads all field values at an index as a dict.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `index` | `int` | Element index |

**Returns:** `dict` — `{field_name: value, ...}`

**Example:**
```python
import phynexis
F = phynexis.fields

fm = F.FieldManager()
fm.create_field(F.FieldMeta("p", F.FieldType.Scalar, F.ValueType.Double))
fm.create_field(F.FieldMeta("t", F.FieldType.Scalar, F.ValueType.Double))
fm.resize_fields(2)
fm.set_field_value(0, "p", 1.0)
fm.set_field_value(0, "t", 300.0)
print(fm.get_field_values(0))
```

**Output:**
```text
{'p': 1.0, 't': 300.0}
```

---

### `save_to(path, file, opt=None)`

Saves all fields to a binary file.

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `path` | `str` | — | Parent directory |
| `file` | `str` | — | Filename |
| `opt` | `SaveOptions` | `SaveOptions()` | Save options |

---

### `load_from(path, file, opt=None)`

Loads fields from a binary file.

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `path` | `str` | — | Parent directory |
| `file` | `str` | — | Filename |
| `opt` | `LoadOptions` | `LoadOptions()` | Load options |

**Example:**
```python
import phynexis, tempfile, os
F = phynexis.fields

fm = F.FieldManager()
fm.create_field(F.FieldMeta("p", F.FieldType.Scalar, F.ValueType.Double))
fm.resize_fields(5)

with tempfile.TemporaryDirectory() as td:
    fm.save_to(td, "snapshot.dat")
    fm2 = F.FieldManager()
    fm2.load_from(td, "snapshot.dat")
    print(fm2.get_field_count(), fm2.field_size())
```

**Output:**
```text
1 5
```

---

### `inspect(filepath)`

Reads metadata from a snapshot file without loading data.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `filepath` | `str` | Full path to the snapshot file |

---

### `get_field_layout()`

Returns the current `FieldLayout` describing all registered fields.

**Returns:** `FieldLayout`

---

### `get_field_count()`

Returns the number of registered fields.

**Returns:** `int`

---

### `get_field_names()`

Returns the names of all registered fields.

**Returns:** `list[str]`

---

### `get_field_ptrs()`

Returns a list of concrete field instances. Each element is the runtime-resolved type (e.g. `ScalarField`, `VecXdField`).

**Returns:** `list[Field]`

---

### `print_info()`

Prints a summary of the manager to stdout.

**Example:**
```python
import phynexis
F = phynexis.fields

fm = F.FieldManager()
fm.create_field(F.FieldMeta("p", F.FieldType.Scalar, F.ValueType.Double))
fm.resize_fields(5)
fm.print_info()
```

**Output:**
```text
=== FieldManager ===
field count: 1
field size: 5
 - p (double)
```

## Unexposed C++ API

The following C++ APIs are not exposed via pybind:

- `remove_fields(handles)` / `remove_fields(names)` — batch remove by `VecX<FieldHandle>` or `VecX<String>`

## Known Issues

### `subset_fields` returns manager with `field_size() == 0`

When calling `subset_fields(mask)`, the returned `FieldManager` correctly contains the subset fields (names and count are accurate), but `field_size()` reports 0. This appears to be a C++ source-side behavior rather than a binding issue.

**Workaround**: Use `subset_fields_inplace(mask)` if in-place mutation is acceptable, or verify field sizes with `get_field_count()` and per-field `size()`.

**Status**: noted — source issue, not binding bug
