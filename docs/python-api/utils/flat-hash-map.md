---
title: "FlatHashMap"
displayed_sidebar: pythonApiSidebar
---

# FlatHashMap

> **C++**: `phynexis::utils::FlatHashMap<Key, Value>`
> **Python**: `phynexis.utils.FlatHashMap` (alias for `FlatHashMap64_32`)
> **Header**: `src/utils/types/flat_hash_map.hpp`

Flat hash map with open addressing. Optimized for cache-friendly iteration and small data performance. Exposed as template instantiations with Pythonic dict-like interface.

---

## Available Instantiations

| Python Name | Key Type | Value Type | Description |
|-------------|----------|------------|-------------|
| `FlatHashMap` | `int64` | `int32` | Default alias (64→32) |
| `FlatHashMap64_32` | `int64` | `int32` | 64-bit key, 32-bit value |
| `FlatHashMap64_64` | `int64` | `int64` | 64-bit key, 64-bit value |
| `FlatHashMap32_32` | `int32` | `int32` | 32-bit key, 32-bit value |
| `FlatHashMap64_64i` | `int64` | `int64` | Alias for `FlatHashMap64_64` |

---

## Constructor

### `FlatHashMap()`

Creates an empty hash map with default capacity.

### `FlatHashMap(bucket_count)`

Creates a hash map with pre-allocated bucket count.

**Parameters:**
| Parameter | Type | Description |
|------|------|------|
| `bucket_count` | `int` | Initial number of buckets |

---

## Methods

### `empty()`

Return True if the map contains no elements.

### `size()` / `__len__()`

Return the number of key-value pairs.

### `max_size()`

Return the maximum possible size.

### `reserve(count)`

Pre-allocate space for at least `count` elements.

### `clear()`

Remove all elements.

### `insert(key, value)`

Insert a key-value pair. Returns `(inserted, value)` tuple.

### `erase(key)`

Remove the element with the given key. Returns number of elements removed (0 or 1).

### `find(key)`

Lookup a key. Returns `(found, value)` tuple.

### `contains(key)` / `key in map`

Check if a key exists.

### `count(key)`

Return 1 if key exists, 0 otherwise.

### `at(key)`

Access value by key with bounds checking.

### `load_factor()`

Return current load factor (size / capacity).

### `max_load_factor()` / `max_load_factor(ml)`

Get or set the maximum load factor threshold for rehashing.

### `rehash(count)`

Force rehash to at least `count` buckets.

---

## Python Protocols

### `map[key]` (getitem)

Access or default-insert a value.

### `map[key] = value` (setitem)

Insert or update a key-value pair.

### `key in map` (contains)

Check membership.

### `for k, v in map` (iteration)

Iterate over key-value pairs.

### `len(map)`

Return element count.

---

## Example

```python
import phynexis

# Create default map (int64 -> int32)
m = phynexis.utils.FlatHashMap()
print("empty:", m.empty())

# Insert via setitem
m[10] = 100
m[20] = 200
m[30] = 300

print("size:", m.size())
print("m[10]:", m[10])
print("m.at(20):", m.at(20))
print("contains 10:", m.contains(10))
print("contains 99:", 99 in m)
print("count 10:", m.count(10))
print("len:", len(m))

# find
found, val = m.find(10)
print("find(10):", found, val)
found2, val2 = m.find(99)
print("find(99):", found2, val2)

# insert method
result = m.insert(40, 400)
print("insert(40, 400):", result)

# items / keys / values
print("items:", m.items())
print("keys:", m.keys())
print("values:", m.values())

# iteration
for k, v in m:
    print(f"  {k} -> {v}")

# erase
m.erase(10)
print("after erase 10, size:", m.size())

# load factor
print("load_factor:", m.load_factor())

# reserve and rehash
m.reserve(100)
print("after reserve, size:", m.size())
m.rehash(256)
print("after rehash, load_factor:", m.load_factor())

# clear
m.clear()
print("after clear, size:", m.size())

# Bucket count constructor
m2 = phynexis.utils.FlatHashMap(64)
print("m2 size:", m2.size())

# 64->64 variant
m64 = phynexis.utils.FlatHashMap64_64()
m64[1] = 100
m64[2] = 200
print("64_64 size:", m64.size())

# 32->32 variant
m32 = phynexis.utils.FlatHashMap32_32()
m32[1] = 100
print("32_32 size:", m32.size())
```

**Output:**
```text
empty: True
size: 3
m[10]: 100
m.at(20): 200
contains 10: True
contains 99: False
count 10: 1
len: 3
find(10): True 100
find(99): False 0
insert(40, 400): (True, 400)
items: [(20, 200), (10, 100), (30, 300), (40, 400)]
keys: [20, 10, 30, 40]
values: [200, 100, 300, 400]
  20 -> 200
  10 -> 100
  30 -> 300
  40 -> 400
after erase 10, size: 3
load_factor: 0.046875
after reserve, size: 3
after rehash, load_factor: 0.01171875
after clear, size: 0
m2 size: 0
64_64 size: 2
32_32 size: 1
```

---

## Unexposed C++ API

The following methods are not yet exposed to Python:

- Copy/move constructors and assignment operators
- `emplace()` / `try_emplace()` — template methods difficult to bind
- Iterator-based `erase(pos)` — iterator not fully exposed
- `cbegin()` / `cend()` — const iterators

---

## Binding Fix Record

**2026-05-03**: `items()` / `keys()` / `values()` originally returned `VecX<T>` which threw `TypeError` because the type was not registered. Changed to return `py::list`. Issue fixed. See `discovery-log.md` for details.
