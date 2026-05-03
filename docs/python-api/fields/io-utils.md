---
title: "I/O and Utilities"
displayed_sidebar: pythonApiSidebar
---

# I/O and Utilities

> **Python**: `phynexis.fields`
> **Headers**: `src/fields/utils/*.hpp`

Free functions for field serialization, MPI communication, and console output. These are utility functions that complement the core field data structures.

---

## Console Output

### `field_to_string(field)`

Returns a human-readable string representation of a scalar field.

**Supported types:** `ScalarField`, `Int32Field`, `Int64Field`

**Example:**
```python
import phynexis
F = phynexis.fields

fm = F.FieldManager()
h = fm.create_field(F.FieldMeta("rho", F.FieldType.Scalar, F.ValueType.Double))
f = fm.get_field(h)
f.resize(3)
f[0] = 1.0
f[1] = 2.0
f[2] = 3.0

print(F.field_to_string(f))
# ' name="rho" size=3 [1, 2, 3]'
```

### `vecx_field_to_string(field)`

Returns a string representation of a `VecXdField` or `VecXiField`.

**Supported types:** `VecXdField`, `VecXiField`

---

## Field I/O

### VTK I/O

#### `write_vtk(field, path, file)`

Writes a scalar field to a VTK file.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `field` | `ScalarField` / `Int32Field` / `Int64Field` / `BoolField` | Field to write |
| `path` | `str` | Directory path |
| `file` | `str` | Filename |

#### `read_vtk(field, path, file)`

Reads a VTK file into an existing field.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `field` | `ScalarField` / `Int32Field` / `Int64Field` / `BoolField` | Field to populate |
| `path` | `str` | Directory path |
| `file` | `str` | Filename |

**Example:**
```python
# Write
F.write_vtk(f, "/tmp/data", "field.vtk")

# Read
f2 = F.ScalarField()
F.read_vtk(f2, "/tmp/data", "field.vtk")
```

### Binary I/O

#### `write_binary(field, path, file)`

Writes a field to a binary file.

#### `read_binary(field, path, file)`

Reads a binary file into an existing field.

**Example:**
```python
F.write_binary(f, "/tmp/data", "field.bin")

f2 = F.ScalarField()
F.read_binary(f2, "/tmp/data", "field.bin")
```

### JSON I/O

#### `field_to_json(field)`

Converts a field to a Python `dict`.

**Returns:** `dict` with keys `name`, `size`, `data`

**Example:**
```python
j = F.field_to_json(f)
print(j)
# {'name': 'rho', 'size': 3, 'data': [1.0, 2.0, 3.0]}
```

#### `field_from_json(field, json)`

Populates a field from a Python `dict`.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `field` | `ScalarField` / `Int32Field` / `Int64Field` / `BoolField` | Field to populate |
| `json` | `dict` | Dictionary with `name`, `size`, `data` keys |

**Example:**
```python
f2 = F.ScalarField(3)
F.field_from_json(f2, {'name': 'copy', 'size': 3, 'data': [10.0, 20.0, 30.0]})
print(f2[0])  # 10.0
```

**Supported types for all I/O operations:** `ScalarField`, `Int32Field`, `Int64Field`, `BoolField`

---

## Manager I/O

### `pack_manager(manager, indices)`

Serializes a subset of fields from a `FieldManager` into a `bytes` buffer.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `manager` | `FieldManager` | Source manager |
| `indices` | `list[int]` | Element indices to pack |

**Returns:** `bytes`

### `unpack_manager(data, manager, target_indices)`

Deserializes a `bytes` buffer into a `FieldManager` at the specified target indices.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `data` | `bytes` | Buffer from `pack_manager` |
| `manager` | `FieldManager` | Target manager |
| `target_indices` | `list[int]` | Target element indices |

**Example:**
```python
fm = F.FieldManager()
# ... populate fm ...

# Pack elements 0 and 2
blob = F.pack_manager(fm, [0, 2])

# Unpack into a new manager at indices 10 and 11
fm2 = F.FieldManager()
F.unpack_manager(blob, fm2, [10, 11])
```

---

## VecXField I/O

### `pack_vecx_field(field, indices)`

Packs a subset of elements from a `VecXdField` or `VecXiField` into a `bytes` buffer.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `field` | `VecXdField` / `VecXiField` | Source field |
| `indices` | `list[int]` | Row indices to pack |

**Returns:** `bytes`

### `unpack_vecx_field(field, data, target_indices)`

Unpacks a `bytes` buffer into a `VecXdField` or `VecXiField` at target rows.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `field` | `VecXdField` / `VecXiField` | Target field |
| `data` | `bytes` | Buffer from `pack_vecx_field` |
| `target_indices` | `list[int]` | Target row indices |

**Example:**
```python
vf = F.VecXdField(5)
vf.push_back(0, 1.0)
vf.push_back(0, 2.0)

blob = F.pack_vecx_field(vf, [0])

vf2 = F.VecXdField(5)
F.unpack_vecx_field(vf2, blob, [3])
print(vf2.get_row(3))  # [1.0, 2.0]
```

---

## MPI Utilities

> **Note:** These functions require `mpi4py` and an MPI environment.

### `gather_data(local, global)`

Gathers data from all MPI ranks into a single `global` field on the root rank.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `local` | `ScalarField` / `Int32Field` | Local data on each rank |
| `global` | `ScalarField` / `Int32Field` | Global buffer on root (pre-sized) |

**Supported types:** `ScalarField`, `Int32Field`

### `scatter_data(global, local, root, counts, displs)`

Scatters data from a `global` field on the root rank to `local` fields on all ranks.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `global` | `ScalarField` / `Int32Field` | Global data on root |
| `local` | `ScalarField` / `Int32Field` | Local buffer on each rank (pre-sized) |
| `root` | `int` | Root rank |
| `counts` | `list[int]` | Number of elements per rank |
| `displs` | `list[int]` | Displacement offsets per rank |

**Supported types:** `ScalarField`, `Int32Field`

**Example:**
```python
from mpi4py import MPI

comm = MPI.COMM_WORLD
rank = comm.Get_rank()

# Gather: each rank has 2 elements
local = F.ScalarField(2)
local[0] = float(rank * 2)
local[1] = float(rank * 2 + 1)

if rank == 0:
    global_field = F.ScalarField(comm.Get_size() * 2)
else:
    global_field = F.ScalarField()

F.gather_data(local, global_field)
```

---

## Known Issues

### `field_to_json` / `field_from_json` require pybind11_json

If `pybind11_json` is not included in the binding compilation, `field_to_json` raises `TypeError: Unregistered type: nlohmann::json...`.

**Status**: fixed (added `#include <pybind11_json/pybind11_json.hpp>` to `pyfield_io.cpp`)
