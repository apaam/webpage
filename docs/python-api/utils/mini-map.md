---
title: "MiniMap"
displayed_sidebar: pythonApiSidebar
---

# MiniMap

> **C++**: `phynexis::utils::MiniMap<Int64, Int64>`
> **Python**: `phynexis.utils.MiniMapIdx64`
> **Header**: `src/utils/mini_map.hpp`

Lightweight hash map optimized for index-to-index lookups. Uses flat hash map internally for cache-friendly access.


## Constructor

#### `MiniMapIdx64()`

Creates an empty map.


## Methods

### `exist(key)`

Check if a key exists in the map.

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `key` | `int` | Key to look up |

**Returns:**`bool` — True if key exists

### `size()`

Return the number of entries.

**Returns:**`int` — Entry count

### `clear()`

Remove all entries.


## Python Protocols

### `map[key]` (getitem)

Retrieve value by key. Raises `KeyError` if key not found.

### `map[key] = value` (setitem)

Insert or update a key-value pair.

### `key in map` (contains)

Check membership. Equivalent to `exist(key)`.


## Example

```python
import phynexis

m = phynexis.utils.MiniMapIdx64()

# Insert entries
m[10] = 100
m[20] = 200
m[30] = 300

print(f"size: {m.size()}")
print(f"m[10] = {m[10]}")
print(f"20 in map: {20 in m}")
print(f"99 in map: {99 in m}")
print(f"exist(10): {m.exist(10)}")

# Update
m[10] = 999
print(f"updated m[10] = {m[10]}")

# Clear
m.clear()
print(f"after clear: {m.size()}")
```

**Output:**
```text
size: 3
m[10] = 100
20 in map: True
99 in map: False
exist(10): True
updated m[10] = 999
after clear: 0
```


## Unexposed C++ API

`MiniMap` is a template class. Only the `Int64→Int64` instantiation (`MiniMapIdx64`) is exposed. Other instantiations (e.g., `int→double`) are not available in Python.
