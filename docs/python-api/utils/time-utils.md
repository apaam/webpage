---
title: "TimeUtils"
displayed_sidebar: pythonApiSidebar
---

# TimeUtils

> **C++**: `phynexis::utils::get_time_micros`
> **Python**: `phynexis.utils.get_time_micros`
> **Header**: `src/utils/time_utils.hpp`

High-resolution time measurement utilities.


## Functions

### `get_time_micros()`

Returns the current time in microseconds since an arbitrary epoch. Useful for measuring elapsed time between two calls.

**Returns:**`int` — Time in microseconds

**Example:**
```python
import phynexis
import time

t0 = phynexis.utils.get_time_micros()
time.sleep(0.1)  # 100 ms
t1 = phynexis.utils.get_time_micros()

elapsed_ms = (t1 - t0) / 1000.0
print(f"elapsed: {elapsed_ms:.2f} ms")
```

**Output:**
```text
elapsed: 100.12 ms
```


## Unexposed C++ API

- `Timer` class — Scoped RAII timer with automatic logging
- `SleepMicros` / `SleepMillis` — Sleep functions
