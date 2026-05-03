---
title: "FieldSchema"
---

# FieldSchema

> **C++**: `phynexis::fields::FieldSchema`
> **Python**: `phynexis.fields.FieldSchema`
> **Header**: `src/fields/core/field_schema.hpp`

## Description

`FieldSchema` defines a structured layout of fields. It is a collection of `FieldSlot` objects that describe the names, types, and dimensions of all fields in a data model. A schema can be converted to a `FieldLayout` (used by `FieldManager` to create fields) or used to resolve/normalize JSON dictionaries.

## Constructors

### `FieldSchema()`

Creates an empty schema with default name `"default"`.

**Example:**
```python
import phynexis
schema = phynexis.fields.FieldSchema()
print(schema.name(), schema.num_slots())
```

**Output:**
```text
default 0
```

## Methods

### `append(slot)` / `append(schema)`

Appends a `FieldSlot` or merges another `FieldSchema`. Duplicate slot names are silently skipped.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `slot` | `FieldSlot` | Slot to append |
| `schema` | `FieldSchema` | Schema whose slots are appended |

**Example:**
```python
import phynexis
F = phynexis.fields

schema = F.FieldSchema()
schema.append(F.FieldSlot.make_scalar("pressure"))
schema.append(F.FieldSlot.make_vec3("velocity"))
print(schema.num_slots())

# Merge another schema
schema2 = F.FieldSchema()
schema2.append(F.FieldSlot.make_scalar("temperature"))
schema.append(schema2)
print(schema.num_slots())
```

**Output:**
```text
2
3
```

---

### `name()`

Returns the schema name.

**Returns:** `str`

---

### `num_slots()`

Returns the number of slots.

**Returns:** `int`

---

### `slots()`

Returns all slots as a list.

**Returns:** `list[FieldSlot]`

**Example:**
```python
import phynexis
F = phynexis.fields

schema = F.FieldSchema()
schema.append(F.FieldSlot.make_scalar("p"))
schema.append(F.FieldSlot.make_vec3("v"))
for s in schema.slots():
    print(s.name, s.dimension)
```

**Output:**
```text
p 1
v 3
```

---

### `slot(index)`

Returns the slot at the given index.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `index` | `int` | Zero-based slot index |

**Returns:** `FieldSlot`

---

### `make_layout()`

Converts the schema to a `FieldLayout`. Vector slots (e.g. `vec3`) are expanded into individual scalar component entries.

**Returns:** `FieldLayout`

**Example:**
```python
import phynexis
F = phynexis.fields

schema = F.FieldSchema()
schema.append(F.FieldSlot.make_scalar("pressure"))
schema.append(F.FieldSlot.make_vec3("velocity"))
schema.append(F.FieldSlot.make_vecx("features"))

layout = schema.make_layout()
print(len(layout))
for meta in layout:
    print(meta.name, meta.field_type, meta.value_type)
```

**Output:**
```text
5
pressure FieldType.Scalar ValueType.Double
velocity.x FieldType.Scalar ValueType.Double
velocity.y FieldType.Scalar ValueType.Double
velocity.z FieldType.Scalar ValueType.Double
features FieldType.VecX ValueType.Double
```

---

### `resolve_json(j)`

Normalizes a JSON dictionary according to the schema.

- Keys that match schema slots are kept.
- Vector values (lists) are expanded into component keys (`velocity` → `velocity.x`, `velocity.y`, `velocity.z`).
- Extra keys not in the schema are dropped.
- `null` values are skipped.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `j` | `dict` | Input dictionary |

**Returns:** `dict` — normalized dictionary

**Example:**
```python
import phynexis
F = phynexis.fields

schema = F.FieldSchema()
schema.append(F.FieldSlot.make_scalar("pressure"))
schema.append(F.FieldSlot.make_vec3("velocity"))

j = {
    "pressure": 1.0,
    "velocity": [2.0, 3.0, 4.0],
    "extra": 999,  # will be dropped
}
result = schema.resolve_json(j)
print(result)
```

**Output:**
```text
{'pressure': 1.0, 'velocity.x': 2.0, 'velocity.y': 3.0, 'velocity.z': 4.0}
```

---

### `print_info()`

Prints a human-readable summary of the schema to stdout.

**Example:**
```python
import phynexis
F = phynexis.fields

schema = F.FieldSchema()
schema.append(F.FieldSlot.make_scalar("pressure"))
schema.append(F.FieldSlot.make_vec3("velocity"))
schema.print_info()
```

**Output:**
```text
FieldSchema: default
  Slots: 2
    pressure (scalar, double, 1)
    velocity (scalar, double, 3)
```

## Unexposed C++ API

The following C++ APIs are not exposed via pybind:

- Schema construction helpers (`add_scalar`, `add_vec3`, `add_vec4`, `add_vec6`, `add_vecn`, `add_vecx`) — equivalent to `append(FieldSlot.make_*(...))` in Python.
- `to_json` / `from_json` free functions — JSON serialization of the schema itself.

## Known Issues

### `slots()` returns a snapshot

`schema.slots()` returns a Python `list` of `FieldSlot` objects. If you call `append()` after `slots()`, the returned list is not automatically updated. Call `slots()` again to get the latest state.
