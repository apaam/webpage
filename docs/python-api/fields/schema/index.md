---
title: "Field Schemas"
displayed_sidebar: pythonApiSidebar
---

# Field Schemas

> **C++**: `phynexis::fields::{Scalar,Vec3,Vec4,Vec6,VecN,VecX}FieldSchema`
> **Python**: `phynexis.fields.{ScalarFieldSchema,Vec3FieldSchema,Vec4FieldSchema,Vec6FieldSchema,VecNFieldSchema,VecXFieldSchema}`
> **Header**: `src/fields/schema/*.hpp`

Typed field schema classes that extend [FieldSchema](../core/field-schema.md). Each defines a single-slot field with a specific component layout (scalar, fixed-vector, variable-length, or runtime-sized).

All constructors accept a `base_name` (the slot name prefix) and an optional `ValueType` (default `Double`).

## Schema Types

| Class | Components | Slot Name Pattern | Extra Parameters |
|-------|-----------|-------------------|-----------------|
| `ScalarFieldSchema` | 1 | `{base_name}` | — |
| `Vec3FieldSchema` | 3 | `{base_name}_x`, `{base_name}_y`, `{base_name}_z` | — |
| `Vec4FieldSchema` | 4 | `{base_name}_w`, `{base_name}_x`, ... | — |
| `Vec6FieldSchema` | 6 | `{base_name}_xx`, `{base_name}_yy`, ... | — |
| `VecNFieldSchema` | N (fixed) | `{base_name}_0` ... `{base_name}_{N-1}` | `dimension: int` (default 1) |
| `VecXFieldSchema` | runtime | `{base_name}` (single slot) | — |

## Usage

Create individual schemas and compose them into a multi-slot `FieldSchema`:

**Example:**
```python
import phynexis
F = phynexis.fields

# Create typed field schemas
density_schema = F.ScalarFieldSchema("density")
velocity_schema = F.Vec3FieldSchema("velocity")
stress_schema = F.Vec6FieldSchema("stress")
data_schema = F.VecNFieldSchema("data", F.ValueType.Double, 7)
misc_schema = F.VecXFieldSchema("misc")

# Compose into a multi-slot schema
model = F.FieldSchema()
model.append(density_schema)
model.append(velocity_schema)
model.append(stress_schema)
model.append(data_schema)
model.append(misc_schema)

print("Model name:", model.name())
print("Slots:", model.num_slots())
```

**Output:**
```text
Model name: default
Slots: 5
```

The composed schema can be used to create `FieldMeta` entries (via `make_layout()`) for building fields with `FieldManager`.
