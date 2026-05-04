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
| `FieldMeta` | done | [field-meta](core/field-meta.md) |
| `FieldType` | done | [field-meta](core/field-meta.md) |
| `ValueType` | done | [field-meta](core/field-meta.md) |
| `Field` / `ScalarField` / `Int32Field` / `Int64Field` / `BoolField` | done | [field](core/field.md) |
| `FieldHolder` | done | [field-holder](core/field-holder.md) |
| `FieldBase` | done | [field-base](core/field-base.md) |
| `FieldLayout` | done | [field-layout](core/field-layout.md) |
| `FieldManager` | done | [field-manager](core/field-manager.md) |
| `FieldSlot` | done | [field-slot](core/field-slot.md) |
| `FieldSchema` | done | [field-schema](core/field-schema.md) |
| `CSRMatrix` | done | [csr-matrix](containers/csr-matrix.md) |
| `FieldViewBase` / `ScalarFieldView` / `Vec3FieldView` / `Vec4FieldView` / `Vec6FieldView` / `VecNFieldView` / `VecXFieldView` | done | [field-views](views/field-views.md) |
| `LinkedFieldView` / `LinkedFieldRowView` | done | [linked-field-view](views/linked-field-view.md) |
| `Operators` (math, reduction, prefix_sum, sort, radix_sort) | done | [operators](operators/operators.md) |
| `I/O and Utilities` (VTK, binary, JSON, MPI, console) | done | [io-utils](utils/io-utils.md) |
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
