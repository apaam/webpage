---
title: "fields"
displayed_sidebar: pythonApiSidebar
---

# phynexis.fields

> **Python**: `phynexis.fields`
> **pybind module**: `pyfields`

Field data structures for structured and unstructured grids. Provides typed scalar/vector fields, field layouts, views, schemas, and mathematical operators.

---

## Module Status

| Class | Status | Doc |
|-------|--------|-----|
| `FieldMeta` | done | [field-meta](field-meta.md) |
| `FieldType` | done | [field-meta](field-meta.md) |
| `ValueType` | done | [field-meta](field-meta.md) |
| `Field` / `ScalarField` / `Int32Field` / `Int64Field` / `BoolField` | done | [field](field.md) |
| `FieldHolder` | done | [field-holder](field-holder.md) |
| `FieldBase` | done | [field-base](field-base.md) |
| `FieldLayout` | done | [field-layout](field-layout.md) |
| `FieldManager` | done | [field-manager](field-manager.md) |
| `FieldSlot` | done | [field-slot](field-slot.md) |
| `FieldSchema` | done | [field-schema](field-schema.md) |
| `CSRMatrix` | done | [csr-matrix](csr-matrix.md) |
| Others | pending | — |

---

## Submodules

- **core** — `Field`, `FieldMeta`, `FieldLayout`, `FieldManager`, `FieldSchema`, `FieldSlot`, `FieldBase`, `FieldHolder`
- **containers** — `VecXField`, `CSRMatrix`
- **views** — `ScalarFieldView`, `Vec3FieldView`, `VecXFieldView`, `LinkedFieldView`, `FieldViewBase`
- **schema** — `ScalarFieldSchema`, `Vec3FieldSchema`, `Vec4FieldSchema`, `Vec6FieldSchema`, `VecNFieldSchema`, `VecXFieldSchema`
- **operators** — Math, reduction, prefix sum, sort, radix sort
- **utils** — I/O, MPI, console output

---

## See also

- [Manual home](../../manual/index.md) — installation, simulations, visualization
- [Python API overview](../index.md) — all submodules at a glance
- [Deprecated flat references](../deprecated/README.md) — legacy v0 pages
