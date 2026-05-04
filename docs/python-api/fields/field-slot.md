---
title: "FieldSlot"
---

# FieldSlot

> **C++**: `phynexis::fields::FieldSlot`
> **Python**: `phynexis.fields.FieldSlot`
> **Header**: `src/fields/core/field_slot.hpp`

## Description

`FieldSlot` describes a single field entry within a `FieldSchema`. It stores the field's name, type, dimension, and component naming rules. Think of it as a blueprint for one column in a structured data layout.

`FieldSlot` is a plain data struct exposed to Python with read/write attributes.

## Constructors

### `FieldSlot()`

Creates a default slot with name `"default"`, `FieldType.Scalar`, `ValueType.Double`, and dimension 1.

**Example:**
```python
import phynexis
slot = phynexis.fields.FieldSlot()
print(slot.name, slot.field_type, slot.value_type, slot.dimension)
```

**Output:**
```text
default FieldType.Scalar ValueType.Double 1
```

## Factory Methods

Factory methods are the recommended way to create `FieldSlot` instances. They set sensible defaults and generate appropriate component names.

### `FieldSlot.make_scalar(name, type=ValueType.Double)`

Creates a scalar slot.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | `str` | — | Field name |
| `type` | `ValueType` | `ValueType.Double` | Value type |

**Returns:** `FieldSlot`

**Example:**
```python
import phynexis
F = phynexis.fields

s = F.FieldSlot.make_scalar("pressure", F.ValueType.Double)
print(s.name, s.dimension, s.get_field_names())
```

**Output:**
```text
pressure 1 ['pressure']
```

---

### `FieldSlot.make_vec3(name, type=ValueType.Double)`

Creates a 3-component vector slot. Component names default to `['x', 'y', 'z']`.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | `str` | — | Base name (prefix) |
| `type` | `ValueType` | `ValueType.Double` | Value type |

**Returns:** `FieldSlot`

**Example:**
```python
import phynexis
F = phynexis.fields

s = F.FieldSlot.make_vec3("velocity")
print(s.get_field_names())
print(s.get_component_names())
```

**Output:**
```text
['velocity.x', 'velocity.y', 'velocity.z']
['x', 'y', 'z']
```

---

### `FieldSlot.make_vec4(name, type=ValueType.Double)`

Creates a 4-component vector slot. Component names default to `['x', 'y', 'z', 'w']`.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | `str` | — | Base name |
| `type` | `ValueType` | `ValueType.Double` | Value type |

**Returns:** `FieldSlot`

---

### `FieldSlot.make_vec6(name, type=ValueType.Double)`

Creates a 6-component vector slot. Component names default to `['xx', 'yy', 'zz', 'xy', 'xz', 'yz']`.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | `str` | — | Base name |
| `type` | `ValueType` | `ValueType.Double` | Value type |

**Returns:** `FieldSlot`

---

### `FieldSlot.make_vecn(name, dimension, type=ValueType.Double, delimiter=".", component_names=[])`

Creates an N-component vector slot with arbitrary dimension.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | `str` | — | Base name |
| `dimension` | `int` | — | Number of components |
| `type` | `ValueType` | `ValueType.Double` | Value type |
| `delimiter` | `str` | `"."` | Separator between base name and component |
| `component_names` | `list[str]` | `[]` | Custom component names (auto-generated if empty) |

**Returns:** `FieldSlot`

**Example:**
```python
import phynexis
F = phynexis.fields

s = F.FieldSlot.make_vecn("pos", 5, delimiter="_")
print(s.get_field_names())
```

**Output:**
```text
['pos_c0', 'pos_c1', 'pos_c2', 'pos_c3', 'pos_c4']
```

---

### `FieldSlot.make_vecx(name, type=ValueType.Double)`

Creates a variable-length vector (`VecX`) slot.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | `str` | — | Field name |
| `type` | `ValueType` | `ValueType.Double` | Value type |

**Returns:** `FieldSlot`

**Example:**
```python
import phynexis
F = phynexis.fields

s = F.FieldSlot.make_vecx("features")
print(s.name, s.field_type, s.dimension)
```

**Output:**
```text
features FieldType.VecX 1
```

## Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `name` | `str` | read/write | Field name or base name |
| `field_type` | `FieldType` | read-only | `Scalar` or `VecX` |
| `value_type` | `ValueType` | read-only | `Double`, `Int32`, `Bool`, etc. |
| `dimension` | `int` | read-only | Number of components (1 for scalar, 3 for vec3, etc.) |
| `delimiter` | `str` | read/write | Separator used in expanded field names |
| `component_names` | `list[str]` | read/write | Component names (e.g. `['x', 'y', 'z']`) |

## Methods

### `get_field_names()`

Returns the fully expanded field names for this slot.

- **Scalar**: returns `[name]`
- **Vec3**: returns `[name.x, name.y, name.z]`
- **VecN**: returns `[name.c0, name.c1, ...]` or custom component names

**Returns:** `list[str]`

**Example:**
```python
import phynexis
F = phynexis.fields

s1 = F.FieldSlot.make_scalar("p")
s2 = F.FieldSlot.make_vec3("v")
s3 = F.FieldSlot.make_vecn("c", 2, component_names=["r", "g"])

print(s1.get_field_names())
print(s2.get_field_names())
print(s3.get_field_names())
```

**Output:**
```text
['p']
['v.x', 'v.y', 'v.z']
['c.r', 'c.g']
```

---

### `get_component_names()`

Returns the component names for this slot.

**Returns:** `list[str]`

**Example:**
```python
import phynexis
F = phynexis.fields

s = F.FieldSlot.make_vec6("stress")
print(s.get_component_names())
```

**Output:**
```text
['xx', 'yy', 'zz', 'xy', 'xz', 'yz']
```
