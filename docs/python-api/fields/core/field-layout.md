---
title: "FieldLayout"
displayed_sidebar: pythonApiSidebar
---

# FieldLayout

> **C++**: `phynexis::fields::FieldLayout` (alias for `VecX<FieldMeta>`)
> **Python**: `phynexis.fields.FieldLayout`
> **Header**: `src/fields/core/field_layout.hpp`

## Description

`FieldLayout` is a sequential container of `FieldMeta` objects. It describes the structure of a group of fields — for example, which fields exist in a simulation domain, their types, and their value types. Each element is a `FieldMeta` instance.

In C++, `FieldLayout` is a type alias for `VecX<FieldMeta>`. In Python it is exposed as a standalone class with list-like semantics.

## Constructors

### `FieldLayout()`

Creates an empty layout.

**Example:**
```python
import phynexis
fl = phynexis.fields.FieldLayout()
print(len(fl), fl.empty())
```

**Output:**
```text
0 True
```


### `FieldLayout(metas)`

Creates a layout from a list of `FieldMeta` objects.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `metas` | `list[FieldMeta]` | Initial field metadata entries |

**Example:**
```python
import phynexis
F = phynexis.fields

meta1 = F.FieldMeta("pressure", F.FieldType.Scalar, F.ValueType.Double)
meta2 = F.FieldMeta("velocity", F.FieldType.VecX, F.ValueType.Double)
fl = F.FieldLayout([meta1, meta2])
print(len(fl))
```

**Output:**
```text
2
```

## Methods

### `__len__()`

Returns the number of `FieldMeta` entries.

**Returns:** `int`


### `__getitem__(index)`

Returns the `FieldMeta` at `index`.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `index` | `int` | Zero-based index |

**Returns:** `FieldMeta`

**Note**: Negative indices are **not supported** and raise `IndexError`.

**Example:**
```python
import phynexis
F = phynexis.fields

meta = F.FieldMeta("temperature", F.FieldType.Scalar, F.ValueType.Double)
fl = F.FieldLayout([meta])
print(fl[0])
```

**Output:**
```text
<FieldMeta object at 0x...>
```


### `size()`

Same as `len(layout)`. Returns the number of entries.

**Returns:** `int`


### `empty()`

Returns `True` if the layout contains no entries.

**Returns:** `bool`


### `append(meta)`

Appends a `FieldMeta` to the end of the layout.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `meta` | `FieldMeta` | Metadata to append |

**Example:**
```python
import phynexis
F = phynexis.fields

fl = F.FieldLayout()
fl.append(F.FieldMeta("x", F.FieldType.Scalar, F.ValueType.Double))
fl.append(F.FieldMeta("y", F.FieldType.Scalar, F.ValueType.Double))
print(fl.size())
```

**Output:**
```text
2
```

## Known Issues

### Negative indexing not supported

`layout[-1]` raises `IndexError` instead of returning the last element. The binding performs a direct bounds check without normalising negative indices.

**Workaround**: Use `layout[len(layout) - 1]` or iterate over the layout.

**File**: `phynexis/bindings/fields/core/pyfield_layout.cpp`
**Status**: noted
