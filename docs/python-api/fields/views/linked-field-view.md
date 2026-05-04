---
title: "LinkedFieldView"
displayed_sidebar: pythonApiSidebar
---

# LinkedFieldView

> **C++**: `phynexis::fields::LinkedFieldView`
> **Python**: `phynexis.fields.LinkedFieldView`
> **Header**: `src/fields/views/linked_field_view.hpp`

Bidirectional many-to-many link view over two `VecXField<Int64>` storages (`a_to_b` and `b_to_a`). Each row stores a list of linked indices. `LinkedFieldView` itself does not allocate index storage; it borrows the two `VecXField` objects and provides thread-safe `link()` / `unlink()` operations.

`LinkedFieldView` also supports **attached data**: `VecXField<T>` objects can be registered via `attach()`. When a link is created or removed, the attached fields are updated in sync (append on link, swap-remove on unlink).

---

## Related Types

| Python Class | C++ Type | Description |
|--------------|----------|-------------|
| `LinkedFieldView` | `LinkedFieldView` | Bidirectional link manager |
| `LinkedFieldRowView` | `LinkedFieldRowView` | Read-only view of one link row |
| `ILinkedFieldAttachedData` | `ILinkedFieldAttachedData` | Abstract base for attached data adapters |
| `VecXFieldAttachedAdapterDouble` | `VecXFieldAttachedAdapter<Double>` | Adapter for `VecXdField` attached data |
| `VecXFieldAttachedAdapterInt32` | `VecXFieldAttachedAdapter<Int32>` | Adapter for `VecXiField` attached data |

---

## LinkedFieldView

### Constructors

| Signature | Description |
|-----------|-------------|
| `LinkedFieldView()` | Empty (invalid) view. |
| `LinkedFieldView(a_to_b, b_to_a)` | Links over two `VecXlField` instances. |

The constructor takes **pointers** (kept alive by pybind11) and stores them internally.

**Example:**
```python
import phynexis
F = phynexis.fields

# Two VecXlField storages: 3 targets (A) x 3 sources (B)
a2b = F.VecXlField(3)
b2a = F.VecXlField(3)

lfv = F.LinkedFieldView(a2b, b2a)
print(lfv.size_targets(), lfv.size_sources())  # 3 3

# Create links
lfv.link(0, 1)
lfv.link(0, 2)
lfv.link(1, 0)

# Query targets of A=0
row = lfv.get_targets(0)
print(row.size())       # 2
print(row[0], row[1])   # 1 2

# Query sources of B=1
row2 = lfv.get_sources(1)
print(row2[0])          # 0
```

### `link(a, b)`

Creates a bidirectional link between `a` (target index) and `b` (source index). Thread-safe.

### `unlink(a, b)`

Removes the bidirectional link between `a` and `b`. Uses swap-remove on the internal rows, so link order is not preserved. Thread-safe.

### `clear_links()`

Removes all links and clears attached data rows.

### `size_targets()` / `size_sources()`

Returns the number of rows in `a_to_b` / `b_to_a` respectively.

### `get_targets(a)` / `get_sources(b)`

Returns a `LinkedFieldRowView` containing the linked indices for target `a` / source `b`.

### `a_to_b_ptr()` / `b_to_a_ptr()`

Returns the underlying `VecXlField` pointers.

### `attach(field)`

Attaches a `VecXdField` or `VecXiField` to be kept in sync with links. On `link(a, b)`, a new element is appended to row `a` of the attached field. On `unlink(a, b)`, the element at the same index is swap-removed.

**Supported field types:** `VecXdField`, `VecXiField`

### `attached_count()`

Returns the number of attached data fields.

---

## LinkedFieldRowView

Read-only view of a single row in a `LinkedFieldView`. Created by `get_targets()` or `get_sources()`.

### `size()` / `__len__()`

Returns the number of linked indices in this row.

### `__getitem__(i)`

Returns the linked index at position `i`.

### `data()`

Returns the raw row data as a Python `list`. **Known issue:** This method may segfault due to lifetime issues with the underlying proxy pointer.

**Workaround:** Iterate using `__getitem__` or `for i in range(row.size()): row[i]`.

---

## Attached Data Adapters

`ILinkedFieldAttachedData` is the abstract base class for attached data. Two concrete adapters are exposed:

### `VecXFieldAttachedAdapterDouble(field)`

Wraps a `VecXdField` for use as attached data. The field must have the same row layout as the `a_to_b` storage.

### `VecXFieldAttachedAdapterInt32(field)`

Wraps a `VecXiField` for use as attached data.

**Example:**
```python
# Create a VecXdField with matching row layout
weights = F.VecXdField(3)
weights.push_back(0, 1.0)
weights.push_back(1, 2.0)

# Attach to LinkedFieldView
lfv.attach(weights)
print(lfv.attached_count())  # 1

# Now link() will append a default value to row 'a' of weights
lfv.link(0, 2)
```

---

## Known Issues

### `LinkedFieldRowView.data()` segfault

Calling `.data()` on a `LinkedFieldRowView` may crash. The underlying C++ `RowView` holds a raw pointer to `VecXField` row data; the Python binding does not extend the parent `LinkedFieldView` lifetime.

**Workaround:** Access elements by index.

**Status**: noted

### `LinkedFieldView` default constructor not bound

`LinkedFieldView()` (no-arg default constructor) is **not exposed** in Python.

**Workaround:** Always construct with two `VecXlField` arguments.

**Status**: noted

### `get_name()` requires explicit delimiter

Same as other field views: `view.get_name(".")` works; `view.get_name()` raises `TypeError`.

**Status**: noted
