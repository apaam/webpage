---
title: "DataIO"
displayed_sidebar: pythonApiSidebar
---

# DataIO

> **C++**: `phynexis::utils::DataIO`
> **Python**: `phynexis.utils.DataIO`
> **Header**: `src/utils/serde/data_io.hpp`

Utility class for importing and exporting tabular data (CSV, TSV, space-separated) with automatic delimiter detection.

---

## Methods

### `import_data(filename, lines_to_skip=0)`

Import numeric data from a file. Supports comma, tab, and space delimiters with auto-detection.

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `filename` | `str` | — | Path to data file |
| `lines_to_skip` | `int` | 0 | Number of header lines to skip |

**Returns:** `list[list[float]]` — 2D array of doubles

### `save_data(data, head, filename)`

Save tabular data to a file with the given header string.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `data` | `list[list[int]]` or `list[list[float]]` | 2D data array |
| `head` | `str` | Header line (e.g. `"x,y,z"`) |
| `filename` | `str` | Output file path |

### `file_exist(filename)`

Check if a file exists.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `filename` | `str` | File path to check |

**Returns:** `bool`

---

## Example

```python
import phynexis

# Save integer data
phynexis.utils.DataIO.save_data(
    [[1, 2, 3], [4, 5, 6]],
    "x,y,z",
    "/tmp/data_int.csv"
)

# Save float data
phynexis.utils.DataIO.save_data(
    [[1.5, 2.5, 3.5], [4.5, 5.5, 6.5]],
    "x,y,z",
    "/tmp/data_float.csv"
)

# Import data (auto-detects delimiter)
data = phynexis.utils.DataIO.import_data("/tmp/data_float.csv")
print("rows:", len(data))
print("first row:", data[0])
print("second row:", data[1])

# File existence check
print("exists:", phynexis.utils.DataIO.file_exist("/tmp/data_float.csv"))
print("missing:", phynexis.utils.DataIO.file_exist("/tmp/nonexistent.csv"))
```

**Output:**
```text
rows: 2
first row: [1.5, 2.5, 3.5]
second row: [4.5, 5.5, 6.5]
exists: True
missing: False
```

---

## Unexposed C++ API

- `detect_delimiter()` / `parse_line()` — internal helpers
