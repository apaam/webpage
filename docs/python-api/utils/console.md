---
title: "Console"
displayed_sidebar: pythonApiSidebar
---

# Console

> **C++**: `phynexis::utils::console`
> **Python**: `phynexis.utils`
> **Header**: `src/utils/console.hpp`

Console logging and output control for phynexis. Supports leveled output (debug/info/warning/error/fatal), colorized terminal output, timestamps, and MPI rank display.

## Level

> **C++**: `phynexis::utils::console::Level`
> **Python**: `phynexis.utils.Level`

Enum controlling the minimum log level for output filtering.

| Value | Numeric | Description |
|-------|---------|-------------|
| `Level.DEBUG` | 0 | Debug messages |
| `Level.INFO` | 1 | Informational messages (default minimum) |
| `Level.WARNING` | 2 | Warning messages |
| `Level.ERROR` | 3 | Error messages |
| `Level.FATAL` | 4 | Fatal error messages |


## Config

> **C++**: `phynexis::utils::console::Config`
> **Python**: `phynexis.utils.Config`

Configuration object controlling the appearance and filtering of console output.

### Constructor

#### `Config()`

Creates a config with default settings (min_level=info, timestamps on, colors on).

### Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `min_level` | `Level` | read/write | Minimum log level to display |
| `show_timestamp` | `bool` | read/write | Show timestamps in output |
| `show_level` | `bool` | read/write | Show level tag (INFO, WARN, etc.) |
| `show_location` | `bool` | read/write | Show file/line location |
| `color_output` | `bool` | read/write | Enable ANSI color codes |
| `show_rank` | `bool` | read/write | Show MPI rank prefix |

### Methods

#### `set_min_level(level)`

Set minimum display level. Returns the Config object for chaining.

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `level` | `Level` | Minimum level to display |

#### `set_show_timestamp(enabled)`

Toggle timestamp display. Returns the Config object for chaining.

#### `set_show_level(enabled)`

Toggle level tag display. Returns the Config object for chaining.

#### `set_show_location(enabled)`

Toggle source location display. Returns the Config object for chaining.

#### `set_color_output(enabled)`

Toggle colorized output. Returns the Config object for chaining.

**Example:**
```python
import phynexis

cfg = phynexis.utils.custom()
cfg.show_timestamp = False
cfg.color_output = False

phynexis.utils.info("no timestamp, no color")
```

**Output:**
```text
[INFO] no timestamp, no color
```


## Logging Functions

Module-level functions for leveled console output.

### `debug(msg)`

Print a debug-level message. Only visible when min_level ≤ 0.

### `info(msg)`

Print an info-level message.

### `plain(msg)`

Print a plain message without any level prefix or formatting.

### `warning(msg)`

Print a warning-level message.

### `error(msg)`

Print an error-level message.

### `fatal(msg)`

Print a fatal-level message and terminate.

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `msg` | `str` | Message string to print |

### Broadcast Variants

Each level has an `_all` variant that broadcasts to all MPI ranks:

- `debug_all(msg)`
- `info_all(msg)`
- `warning_all(msg)`
- `error_all(msg)`
- `fatal_all(msg)`

**Example:**
```python
import phynexis

phynexis.utils.info("simulation started")
phynexis.utils.debug("debug info: dt=1e-5")
phynexis.utils.warning("mesh quality low")
phynexis.utils.plain("raw output without prefix")
```

**Output:**
```text
[INFO] [12:01:05.232] simulation started
[DEBUG] [12:01:05.233] debug info: dt=1e-5
[WARNING] [12:01:05.233] mesh quality low
raw output without prefix
```


## Control Functions

### `set_level(level)`

Set the global minimum log level.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `level` | `Level` or `int` | Minimum level, e.g. `Level.WARNING` or `2` |

### `set_verbose(enabled)`

Enable or disable verbose (debug) output. Equivalent to `set_level(0)`.

### `set_color(enabled)`

Enable or disable colorized output globally.

### `custom()`

Return a reference to the global `Config` object. Modifications to the returned object take effect immediately.

**Returns:** `Config` — global configuration (mutable reference)

**Example:**
```python
import phynexis

phynexis.utils.set_level(2)   # Only warning and above
phynexis.utils.info("hidden")
phynexis.utils.warning("visible")
```

**Output:**
```text
[WARNING] visible
```
