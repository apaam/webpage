---
title: "FPE Traps"
displayed_sidebar: pythonApiSidebar
---

# FPE Traps

> **C++**: `phynexis::utils::fpe`
> **Python**: `phynexis.utils`
> **Header**: `src/utils/fpe_trap.hpp`

Floating-point exception (FPE) trap utilities for debugging numerical issues. When
enabled, the program catches floating-point exceptions (division by zero, invalid
operations, overflow) and prints a backtrace with source locations.

All functions are prefixed with `fpe_` to avoid name collisions.


## Functions

### `fpe_enable_traps()`

Enable hardware floating-point exception traps for:
- Division by zero
- Invalid operations (e.g. `sqrt(-1)`)
- Overflow

**Note:** On macOS, hardware traps may not be available; signal handlers still work.

### `fpe_enable_traps_for_thread()`

Enable FPE traps for the current thread. In multi-threaded programs (e.g. OpenMP),
each worker thread should call this after creation.

### `fpe_hardware_traps_available()`

Check if hardware FPE traps are available on this platform.

**Returns:** `bool`

### `fpe_init(enable)`

Initialize the FPE trap mechanism: install the SIGFPE handler and optionally
enable hardware traps.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `enable` | `bool` | If True, install handler and enable traps |

### `fpe_init_from_env()`

Initialize FPE traps from the `PHYNEXIS_SIGFPE` environment variable.
FPE traps are enabled by default; set `PHYNEXIS_SIGFPE=0` to disable.
Similar to OpenFOAM's `FOAM_SIGFPE` but with opposite default.

**Returns:** `bool` — True if traps were enabled

### `fpe_install_sigfpe_handler()`

Install the SIGFPE signal handler that prints a backtrace on floating-point
exceptions.

### `fpe_print_backtrace()`

Print a backtrace to stderr for debugging purposes.


## Example

```python
import phynexis

# Initialize FPE traps from environment
enabled = phynexis.utils.fpe_init_from_env()
print("FPE traps enabled:", enabled)
print("Hardware traps available:", phynexis.utils.fpe_hardware_traps_available())

# Install handler and enable traps
phynexis.utils.fpe_install_sigfpe_handler()
phynexis.utils.fpe_enable_traps()
print("FPE protection active")
```

**Output:**
```text
FPE traps enabled: True
Hardware traps available: True
FPE protection active
```


## Unexposed C++ API

- `sigfpe_handler(sig, info, ucontext)` — Raw signal handler (takes C signal types, not Python-bindable)
