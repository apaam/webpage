---
title: "CSRMatrix"
displayed_sidebar: pythonApiSidebar
---

# CSRMatrix

> **C++**: `phynexis::fields::CSRMatrix<ValueType, IndexType>`
> **Python**: `phynexis.fields.CSRMatrix` (alias `CSRMatrixd`), `phynexis.fields.CSRMatrixi`
> **Header**: `src/fields/containers/csr_matrix.hpp`

## Description

`CSRMatrix` is a compressed sparse row (CSR) matrix for linear algebra operations. Each row stores `(column, value)` pairs sorted by column index. The class supports dynamic element insertion, row-wise queries, matrix–matrix and matrix–vector multiplication, and transpose.

Two concrete types are exposed:

| Python Type | Value Type | Index Type |
|-----------|------|------|
| `CSRMatrixd` / `CSRMatrix` | `double` | `Int64` |
| `CSRMatrixi` | `Int64` | `Int64` |

## Constructors

### `CSRMatrix()`

Creates an empty 0×0 matrix.

### `CSRMatrix(num_rows, num_cols)`

Creates a matrix with the given dimensions. All entries are initially zero (not stored).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `num_rows` | `int` | Number of rows |
| `num_cols` | `int` | Number of columns |

**Example:**
```python
import phynexis
m = phynexis.fields.CSRMatrix(3, 3)
print(m.get_num_rows(), m.get_num_cols())
```

**Output:**
```text
3 3
```

## Methods

### `resize(num_rows, num_cols)`

Resizes the matrix. Existing data is preserved where possible.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `num_rows` | `int` | New row count |
| `num_cols` | `int` | New column count |


### `set_element(row, col, value)`

Sets a single element. If the element already exists, its value is overwritten.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `row` | `int` | Row index |
| `col` | `int` | Column index |
| `value` | `float` / `int` | Value to set |

**Example:**
```python
import phynexis
m = phynexis.fields.CSRMatrix(3, 3)
m.set_element(0, 0, 1.0)
m.set_element(1, 1, 2.0)
m.set_element(2, 2, 3.0)
print(m.get_element(0, 0), m.get_element(1, 1))
```

**Output:**
```text
1.0 2.0
```


### `get_element(row, col)`

Returns the value at `(row, col)`. Returns `0.0` if the element is not explicitly stored.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `row` | `int` | Row index |
| `col` | `int` | Column index |

**Returns:** `float` / `int`


### `has_element(row, col)`

Returns `True` if the element is explicitly stored (non-zero and inserted).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `row` | `int` | Row index |
| `col` | `int` | Column index |

**Returns:** `bool`


### `set_row(row, cols, vals)`

Replaces the entire row with the given column indices and values.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `row` | `int` | Row index |
| `cols` | `list[int]` | Column indices |
| `vals` | `list[float]` | Corresponding values |

**Example:**
```python
import phynexis
m = phynexis.fields.CSRMatrix(3, 3)
m.set_row(0, [0, 2], [1.0, 3.0])
print(m.get_row(0))
print(m.get_row_indices(0))
```

**Output:**
```text
[1.0, 3.0]
[0, 2]
```


### `get_row(row)`

Returns the non-zero values in the given row.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `row` | `int` | Row index |

**Returns:** `list[float]` / `list[int]`


### `get_row_indices(row)`

Returns the column indices of non-zero values in the given row.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `row` | `int` | Row index |

**Returns:** `list[int]`


### `get_row_size(row)`

Returns the number of non-zero elements in the given row.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `row` | `int` | Row index |

**Returns:** `int`


### `set_elements(rows, cols, vals)`

Batch-sets multiple elements.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `rows` | `list[int]` | Row indices |
| `cols` | `list[int]` | Column indices |
| `vals` | `list[float]` | Values |

**Example:**
```python
import phynexis
m = phynexis.fields.CSRMatrix(2, 2)
m.set_elements([0, 1], [1, 0], [5.0, 7.0])
print(m.get_row(0), m.get_row(1))
```

**Output:**
```text
[5.0] [7.0]
```


### `add_elements(rows, cols, vals)`

Adds values to existing elements. If an element does not exist, it is created.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `rows` | `list[int]` | Row indices |
| `cols` | `list[int]` | Column indices |
| `vals` | `list[float]` | Values to add |

**Example:**
```python
import phynexis
m = phynexis.fields.CSRMatrix(2, 2)
m.set_elements([0], [0], [10.0])
m.add_elements([0], [0], [5.0])
print(m.get_element(0, 0))
```

**Output:**
```text
15.0
```


### `multiply(other)`

Matrix–matrix multiplication. Returns a new `CSRMatrix`.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `other` | `CSRMatrix` | Right-hand side matrix |

**Returns:** `CSRMatrix`


### `multiply(vector)`

Matrix–vector multiplication.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `vector` | `list[float]` | Dense vector (length must match column count) |

**Returns:** `list[float]`

**Example:**
```python
import phynexis
m = phynexis.fields.CSRMatrix(2, 2)
m.set_elements([0, 1], [0, 1], [2.0, 3.0])
v = m.multiply([1.0, 1.0])
print(v)
```

**Output:**
```text
[2.0, 3.0]
```


### `transpose()`

Returns the transpose of the matrix.

**Returns:** `CSRMatrix`

**Example:**
```python
import phynexis
m = phynexis.fields.CSRMatrix(2, 3)
m.set_element(0, 1, 5.0)
mt = m.transpose()
print(mt.get_num_rows(), mt.get_num_cols())
print(mt.get_element(1, 0))
```

**Output:**
```text
3 2
5.0
```


### `get_num_rows()` / `get_num_cols()`

Returns the matrix dimensions.

**Returns:** `int`


### `get_total_elements()`

Returns the total number of stored elements (including duplicates if any).

**Returns:** `int`


### `get_nnz()`

Returns the number of non-zero elements.

**Returns:** `int`


### `get_sparsity()`

Returns the sparsity ratio (`1 - nnz / (rows * cols)`).

**Returns:** `float`


### `get_memory_usage()`

Returns the estimated memory usage in bytes.

**Returns:** `int`


### `optimize_memory()`

Reclaims unused capacity in all rows.


### `size()`

Returns the total number of stored elements. Same as `get_total_elements()`.

**Returns:** `int`


### `empty()`

Returns `True` if the matrix contains no stored elements.

**Returns:** `bool`

## Unexposed C++ API

The following C++ APIs are not exposed via pybind:

- `clear()` — removes all elements
- `row(i)` — returns a row view (`CSRMatrixRowView`)
- `get_row_data_ptr(i)` — returns raw row data pointer

## Known Issues

### `clear()` not exposed

The `clear()` method is not bound to Python. To clear a matrix, create a new instance or use `resize(0, 0)` as a workaround.

**Status**: noted
