---
title: "Operators"
displayed_sidebar: pythonApiSidebar
---

# Operators

> **Python**: `phynexis.fields`
> **Headers**: `src/fields/operators/*.hpp`

Free functions for element-wise math, reductions, prefix sums, and sorting on `Field` objects. All functions operate on `phynexis.fields` types and return new fields or scalar values.

---

## Math

Element-wise mathematical operations. All functions accept `ScalarField` and return a new `ScalarField` of the same size.

| Function | Signature | Description |
|----------|-----------|-------------|
| `sqrt` | `sqrt(field)` | Square root |
| `sqr` | `sqr(field)` | Square (`x * x`) |
| `sin` | `sin(field)` | Sine |
| `cos` | `cos(field)` | Cosine |
| `exp` | `exp(field)` | Exponential (`e^x`) |
| `abs` | `abs(field)` | Absolute value |
| `log` | `log(field)` | Natural logarithm |
| `pow` | `pow(field, exponent)` | Power (`x ** exponent`) |
| `tan` | `tan(field)` | Tangent |
| `floor` | `floor(field)` | Floor |
| `ceil` | `ceil(field)` | Ceiling |
| `round` | `round(field)` | Round to nearest integer |
| `fabs` | `fabs(field)` | Floating-point absolute value |
| `atan` | `atan(field)` | Arc tangent |
| `sinh` | `sinh(field)` | Hyperbolic sine |
| `max` | `max(a, b)` / `max(field, value)` | Element-wise maximum |
| `min` | `min(a, b)` / `min(field, value)` | Element-wise minimum |

**Example:**
```python
import phynexis
F = phynexis.fields

fm = F.FieldManager()
h = fm.create_field(F.FieldMeta("x", F.FieldType.Scalar, F.ValueType.Double))
f = fm.get_field(h)
f.resize(3)
f[0] = 1.0
f[1] = 4.0
f[2] = 9.0

print(F.sqrt(f)[0])   # 1.0
print(F.sqrt(f)[1])   # 2.0
print(F.sqr(f)[0])    # 1.0
print(F.pow(f, 0.5)[1])  # 2.0
```

### Factory Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `zeros` | `zeros(size)` | ScalarField of zeros |
| `ones` | `ones(size)` | ScalarField of ones |
| `linspace` | `linspace(start, end, num)` | `num` evenly spaced values |
| `arange` | `arange(start, end, step=1)` | Range with step |
| `fill` | `fill(field, value)` | Fill field with a scalar value |

**Example:**
```python
z = F.zeros(5)
o = F.ones(3)
ls = F.linspace(0.0, 1.0, 5)   # [0.0, 0.25, 0.5, 0.75, 1.0]
ar = F.arange(0.0, 5.0, 1.0)   # [0.0, 1.0, 2.0, 3.0, 4.0]
```

### Vector Operations

#### `dot(a, b)`

Element-wise dot product of two `Vec3dField` objects. Returns a `ScalarField`.

**Example:**
```python
a = F.Vec3dField(ax, ay, az)
b = F.Vec3dField(bx, by, bz)
d = F.dot(a, b)  # ScalarField of a[i] . b[i]
```

#### `cross(a, b)`

Element-wise cross product of two `Vec3dField` objects.

**Returns:** `_Vec3dFieldCrossResult` — call `.get()` to obtain the `Vec3dField`.

**Example:**
```python
c = F.cross(a, b)
cv = c.get()
print(cv.x(0), cv.y(0), cv.z(0))
```

**Known issue:** Calling `.get()` may produce a segfault in some cases due to lifetime issues with the internal `shared_ptr` fields.

---

## Reduction

Aggregate operations that return a single scalar value.

| Function | Signature | Description |
|----------|-----------|-------------|
| `sum` | `sum(field)` | Sum of all elements |
| `mean` | `mean(field)` | Arithmetic mean |
| `variance` | `variance(field)` | Population variance |
| `std_dev` | `std_dev(field)` | Standard deviation |
| `max_element` | `max_element(field)` | Maximum value |
| `min_element` | `min_element(field)` | Minimum value |
| `any` | `any(bool_field)` | `True` if any element is `True` |
| `all` | `all(bool_field)` | `True` if all elements are `True` |
| `count` | `count(bool_field)` | Count of `True` elements |

**Example:**
```python
print(F.sum(f))         # 55.0
print(F.mean(f))        # 11.0
print(F.max_element(f)) # 25.0
print(F.min_element(f)) # 1.0
```

---

## Prefix Sum

Cumulative sum operations.

### `PrefixSumMode` enum

| Value | Description |
|-------|-------------|
| `PrefixSumMode.Inclusive` | Include current element in sum |
| `PrefixSumMode.Exclusive` | Exclude current element in sum |

### Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `prefix_sum_inclusive` | `prefix_sum_inclusive(field)` | Inclusive scan (returns new field) |
| `prefix_sum_exclusive` | `prefix_sum_exclusive(field)` | Exclusive scan (returns new field) |
| `prefix_sum` | `prefix_sum(field, mode=Inclusive)` | Generic scan (returns new field) |
| `prefix_sum_serial` | `prefix_sum_serial(field, mode=Inclusive)` | Single-threaded scan |
| `prefix_sum_inplace_inclusive` | `prefix_sum_inplace_inclusive(field)` | In-place inclusive scan |
| `prefix_sum_inplace_exclusive` | `prefix_sum_inplace_exclusive(field)` | In-place exclusive scan |
| `prefix_sum_inplace` | `prefix_sum_inplace(field, mode=Inclusive)` | Generic in-place scan |

**Example:**
```python
f.resize(5)
for i in range(5):
    f[i] = float(i + 1)  # [1, 2, 3, 4, 5]

ps = F.prefix_sum_inclusive(f)
print([ps[i] for i in range(5)])  # [1, 3, 6, 10, 15]

ps2 = F.prefix_sum_exclusive(f)
print([ps2[i] for i in range(5)])  # [0, 1, 3, 6, 10]
```

---

## Sort

### `sort(field)`

In-place sort of a `ScalarField` in ascending order.

### `sort(keys, values)`

Sort `keys` and reorder `values` accordingly (key-value sort).

### `sort_by_value(keys, values)`

Sort `keys` by the corresponding `values` (indirect sort).

**Supported types:** `ScalarField`, `Int32Field`, `Int64Field` for both keys and values.

**Example:**
```python
k = F.Int32Field(5)
v = F.ScalarField(5)
for i in range(5):
    k[i] = 4 - i
    v[i] = float(i)

F.sort_by_value(k, v)
print([k[i] for i in range(5)])  # [0, 1, 2, 3, 4]
```

---

## Radix Sort

High-performance integer sort using radix sort algorithm.

### `radix_sort(keys, values)`

Sort integer `keys` and reorder `values` accordingly.

### `radix_sort_by_value(keys, values)`

Sort `keys` by integer `values`.

**Supported types:** `Int32Field`, `Int64Field` for both keys and values.

**Example:**
```python
k = F.Int32Field(5)
v = F.Int32Field(5)
for i in range(5):
    k[i] = 4 - i
    v[i] = i

F.radix_sort(k, v)
print([k[i] for i in range(5)])  # [0, 1, 2, 3, 4]
```

---

## Known Issues

### `cross().get()` may segfault

The `cross()` function returns a `_Vec3dFieldCrossResult` object. Calling `.get()` on it can crash in some environments due to `shared_ptr` lifetime management between pybind11 and the internal `Vec3Field` view.

**Workaround:** Use manual component-wise cross product if stability is required.

**Status**: noted
