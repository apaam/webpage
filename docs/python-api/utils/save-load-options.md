---
title: "SaveOptions / LoadOptions"
displayed_sidebar: pythonApiSidebar
---

# SaveOptions / LoadOptions

> **C++**: `phynexis::utils::SaveOptions`, `LoadOptions`, `SaveVtkOptions`, `FileFormat`
> **Python**: `phynexis.utils.SaveOptions`, `LoadOptions`, `SaveVtkOptions`, `FileFormat`
> **Header**: `src/utils/serde/save_options.hpp`

Configuration objects for file save/load operations used by `Shape.save_to()` / `Shape.load_from()` and other serializable types.

---

## FileFormat

Enum defining supported file formats.

| Value | Description |
|-------|-------------|
| `FileFormat.Auto` | Infer from file extension |
| `FileFormat.Json` | JSON format |
| `FileFormat.Binary` | Binary format |
| `FileFormat.VTK` | VTK format |
| `FileFormat.Stl` | STL mesh format |
| `FileFormat.Off` | OFF mesh format |

---

## SaveOptions

### Constructor

#### `SaveOptions()`

Default: `overwrite=True`, `create_directories=True`, `format_hint=Auto`.

### Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `overwrite` | `bool` | read/write | Overwrite existing files |
| `create_directories` | `bool` | read/write | Create parent directories |
| `format_hint` | `FormatHint` | read/write | Format override hint |

---

## SaveVtkOptions

Inherits from `SaveOptions`. Adds VTK-specific settings.

### Constructor

#### `SaveVtkOptions()`

Default: `binary=False`, `use_double=False`.

### Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `binary` | `bool` | read/write | Write VTK in binary mode |
| `use_double` | `bool` | read/write | Use double precision |

---

## LoadOptions

### Constructor

#### `LoadOptions()`

Default: `create_directories=False`, `format_hint=Auto`.

### Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `create_directories` | `bool` | read/write | Create parent directories |
| `format_hint` | `FormatHint` | read/write | Format override hint |

---

## Example

```python
import phynexis

# Save options with JSON format
opt = phynexis.utils.SaveOptions()
opt.overwrite = True
opt.create_directories = True
opt.format_hint.value = phynexis.utils.FileFormat.Json
print("format:", opt.format_hint.value)

# VTK options
vtk_opt = phynexis.utils.SaveVtkOptions()
vtk_opt.binary = True
vtk_opt.use_double = True
print("vtk binary:", vtk_opt.binary)

# Load options
load_opt = phynexis.utils.LoadOptions()
load_opt.create_directories = False
print("load create_dirs:", load_opt.create_directories)
```

**Output:**
```text
format: FileFormat.Json
vtk binary: True
load create_dirs: False
```
