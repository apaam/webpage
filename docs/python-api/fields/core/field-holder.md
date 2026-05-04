---
title: "FieldHolder"
displayed_sidebar: pythonApiSidebar
---

# FieldHolder

> **C++**: `phynexis::fields::FieldHolder`
> **Python**: `phynexis.fields.FieldHolder`
> **Header**: `src/fields/core/field_holder.hpp`

Owning move-only smart pointer around a heap-allocated `FieldBase`. C++ code uses
`FieldHolder` to return polymorphic field instances by value while keeping
ownership clear (it deletes the inner pointer on destruction). The most common
way to obtain one from Python is via `Field<T>.subset(mask)`.

`FieldHolder` is non-copyable; the move constructor is not exposed to Python, so
treat each holder as single-use.


## Constructors

| Signature | Description |
|-----------|-------------|
| `FieldHolder()` | Empty holder; `get()` is `None` and `bool(h)` is `False`. |
| `FieldHolder(ptr)` | Adopts an existing `FieldBase*`. Pass `None` to construct an empty holder. |

Practical sources of holders:

- `field.subset(mask)` — returns a new holder containing the masked subset.

**Example:**

```python
import numpy as np
import phynexis

F = phynexis.fields

empty = F.FieldHolder()
print("empty bool:", bool(empty), "get():", empty.get())

sf = F.ScalarField.from_numpy(np.array([10.0, 20.0, 30.0, 40.0, 50.0]))
mask = F.BoolField.from_numpy(np.array([True, False, True, False, True]))
holder = sf.subset(mask)
print("holder bool:", bool(holder))
print("inner field:", holder.get().to_numpy())
```

**Output:**

```text
empty bool: False get(): None
holder bool: True
inner field: [10. 30. 50.]
```


## Methods

### `get()`

Returns the contained field without transferring ownership. The Python object
returned reflects the **runtime** type of the field (e.g. `ScalarField`), so you
can call its full interface directly. Returns `None` if the holder is empty.

**Returns:** `ScalarField` / `Int32Field` / `Int64Field` / `BoolField` / `None`.

### `release()`

Transfers ownership of the inner field out of the holder. After release the
holder is empty (`bool(holder)` is `False`) and the returned object is owned by
the Python interpreter — it remains alive even if the holder is garbage
collected.

**Returns:** the inner field (typed concretely, e.g. `ScalarField`) or `None`
if the holder was already empty.

### `reset(ptr=None)`

Replaces the inner pointer. The previous content (if any) is deleted. Calling
`reset()` with no argument or `reset(None)` empties the holder.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `ptr` | `FieldBase` or `None` | `None` | New pointer to adopt. |

### `as_field_double()`

Down-cast the inner field to `Field<double>` (alias `ScalarField`). Raises
`RuntimeError("std::bad_cast")` if the inner field is not a double field, or if
the holder is empty.

**Returns:** `ScalarField`.

### `as_field_int()`

Down-cast the inner field to `Field<Int32>` (alias `Int32Field`). Raises
`RuntimeError("std::bad_cast")` on type mismatch or empty holder.

**Returns:** `Int32Field`.

### `__bool__()`

`True` when the holder owns a non-null pointer.


## Examples

### Lifetime semantics

`get()` returns a borrowed reference — the holder still owns the data, so the
returned field becomes invalid after the holder is collected. `release()`
transfers ownership to the returned object and is safe to keep beyond the
holder's lifetime.

```python
import numpy as np
import phynexis

F = phynexis.fields

sf = F.ScalarField.from_numpy(np.array([10.0, 20.0, 30.0]))
mask = F.BoolField.from_numpy(np.array([True, False, True]))
h = sf.subset(mask)

inner = h.release()
print("released:", inner.to_numpy())

del h  # safe — ownership already transferred
print("still alive after del h:", inner.to_numpy())

# Re-releasing an empty holder yields None
print("second release:", h.release())  # noqa: F821
```

(Re-using `h` here would actually fail because `del h` removes the binding —
the comment is illustrative.)

### Down-cast and type mismatch

```python
import numpy as np
import phynexis

F = phynexis.fields

double_holder = F.ScalarField.from_numpy(
    np.array([1.0, 2.0, 3.0])
).subset(F.BoolField.from_numpy(np.array([True, True, True])))

int_holder = F.Int32Field.from_numpy(
    np.array([10, 20, 30], dtype=np.int32)
).subset(F.BoolField.from_numpy(np.array([True, False, True])))

print("as double:", double_holder.as_field_double().to_numpy())
print("as int:", int_holder.as_field_int().to_numpy())

# Wrong cast raises bad_cast
try:
    double_holder.as_field_int()
except RuntimeError as e:
    print("wrong cast:", repr(e))
```

**Output:**

```text
as double: [1. 2. 3.]
as int: [10 30]
wrong cast: RuntimeError('std::bad_cast')
```

### Reset

```python
import numpy as np
import phynexis

F = phynexis.fields

sf = F.ScalarField.from_numpy(np.array([1.0, 2.0]))
mask = F.BoolField.from_numpy(np.array([True, True]))
h = sf.subset(mask)
print("before reset:", bool(h))

h.reset()       # equivalent to reset(None)
print("after reset():", bool(h))
```

**Output:**

```text
before reset: True
after reset(): False
```


## Known Issues

- The casts only cover `double` and `Int32`. There is no `as_field_int64()` or
  `as_field_bool()`, so `Int64Field` / `BoolField` subsets are reachable only
  through `get()`.
- `subset()` does not propagate the source field's `name`; the resulting field
  has `name == ""`.
- Because `Field<T>` is not registered as a subclass of `FieldBase`
  (see `binding-repair-backlog.md`), passing a generic `FieldBase`-typed
  reference back to Python loses no information in practice — pybind already
  resolves to the concrete subclass via runtime type info — but
  `isinstance(holder.get(), FieldBase)` is still `False`.


## Unexposed C++ API

- `template <typename T> T &as()` — generic templated cast; only the `Double`
  and `Int32` instantiations are exposed via the named `as_field_double` /
  `as_field_int` lambdas.
- Move constructor / move assignment — not bound (pybind does not need them
  for ownership transfer; `release()` is the Python-visible equivalent).
