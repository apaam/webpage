---
title: "OpenMP"
displayed_sidebar: pythonApiSidebar
---

# OpenMP

> **C++**: `phynexis::utils::parallel` / OpenMP runtime
> **Python**: `phynexis.utils`
> **Header**: `src/utils/parallel/parallel.hpp`

Thread-level parallelism control. These functions map directly to OpenMP runtime calls.


## Functions

### `omp_get_max_threads()`

Return the maximum number of threads available.

**Returns:**`int`

### `omp_set_num_threads(num_threads)`

Set the number of threads for subsequent parallel regions.

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `num_threads` | `int` | Number of threads |

### `parallel_max_threads()`

Alias for `omp_get_max_threads()`.

### `parallel_set_num_threads(num_threads)`

Alias for `omp_set_num_threads()`.

### `parallel_in_parallel()`

Return `True` if the current code is executing inside a parallel region.

**Returns:**`bool`

### `parallel_num_procs()`

Return the number of processors available.

**Returns:**`int`

### `parallel_thread_num()`

Return the current thread number within a parallel region (0-based).

**Returns:**`int`


## Example

```python
import phynexis

print("max threads:", phynexis.utils.omp_get_max_threads())
phynexis.utils.omp_set_num_threads(4)
print("set to 4 threads")
print("num procs:", phynexis.utils.parallel_num_procs())
print("in parallel:", phynexis.utils.parallel_in_parallel())
```

**Output:**
```text
max threads: 10
set to 4 threads
num procs: 10
in parallel: False
```


## Note

- These functions affect the **global** OpenMP thread pool.
- Setting threads via `parallel_set_num_threads()` also calls `omp_set_num_threads()` internally.
