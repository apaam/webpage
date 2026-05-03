---
title: "FieldMeta"
displayed_sidebar: pythonApiSidebar
---

# FieldMeta

> **C++**: `phynexis::fields::FieldMeta`
> **Python**: `phynexis.fields.FieldMeta`
> **Header**: `src/fields/core/field_meta.hpp`

Schema-level metadata describing a field's name, value type, and field type (scalar vs variable-length vector). Used by `FieldSchema` and `FieldManager` for runtime field registration and I/O.

---

## Enums

### `FieldType`

Discriminates scalar fields from variable-length vector fields.

| Value | Description |
|-------|-------------|
| `Scalar` | One value per grid index |
| `VecX` | Variable-length vector per grid index |

### `ValueType`

Type tag for scalar values. Maps to phynexis primitive types.

| Value | C++ Type | Size |
|-------|----------|------|
| `Bool` | `bool` | 1 byte |
| `Char` | `char` | 1 byte |
| `Float` | `float` | 4 bytes |
| `Double` | `double` | 8 bytes |
| `Int8` | `int8_t` | 1 byte |
| `Int16` | `int16_t` | 2 bytes |
| `Int32` | `int32_t` | 4 bytes |
| `Int64` | `int64_t` | 8 bytes |

---

## Constructors

### `FieldMeta()`

Default constructor. Creates a scalar double field named `"default"`.

### `FieldMeta(name, field_type, value_type)`

Create metadata with explicit parameters.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `str` | Field name |
| `field_type` | `FieldType` | `FieldType.Scalar` or `FieldType.VecX` |
| `value_type` | `ValueType` | One of the `ValueType` enum values |

---

## Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `name` | `str` | read/write | Field name |
| `field_type` | `FieldType` | read/write | Scalar or VecX |
| `value_type` | `ValueType` | read/write | Primitive value type |

---

## Example

```python
import phynexis

# Default construction
meta = phynexis.fields.FieldMeta()
print("default:", meta.name, meta.field_type, meta.value_type)

# Explicit construction
meta2 = phynexis.fields.FieldMeta(
    "velocity",
    phynexis.fields.FieldType.VecX,
    phynexis.fields.ValueType.Double,
)
print("explicit:", meta2.name, meta2.field_type, meta2.value_type)

# Modify properties
meta2.name = "pressure"
meta2.field_type = phynexis.fields.FieldType.Scalar
meta2.value_type = phynexis.fields.ValueType.Float
print("modified:", meta2.name, meta2.field_type, meta2.value_type)

# Enum values
print("FieldType:", list(phynexis.fields.FieldType.__members__.keys()))
print("ValueType:", list(phynexis.fields.ValueType.__members__.keys()))
```

**Output:**

```text
default: default FieldType.Scalar ValueType.Double
explicit: velocity FieldType.VecX ValueType.Double
modified: pressure FieldType.Scalar ValueType.Float
FieldType: ['Scalar', 'VecX']
ValueType: ['Bool', 'Char', 'Float', 'Double', 'Int8', 'Int16', 'Int32', 'Int64']
```

---

## Unexposed C++ API

- `to_string(FieldType)` / `from_string(String)` — string conversion helpers
- `to_json(json&, FieldType)` / `from_json(json&, FieldType&)` — JSON serialization
- `to_json(json&, const FieldMeta&)` / `from_json(json&, FieldMeta&)` — JSON serialization
