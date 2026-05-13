---
title: "PeriDigmSettings"
displayed_sidebar: pythonApiSidebar
---

# PeriDigmSettings

> **C++**: `phynexis::peridigm::PeriDigmSettings`  
> **Python**: `phynexis.peridigm.PeriDigmSettings`  
> **Header**: `src/peridigm/peridigm_settings.hpp`

## Description

Simulation settings for a peridynamic run. Controls timestep computation, horizon sizing, output frequency, and result directory paths. Settings are written to the Peridigm input file by `write_input_file()`.

## Constructors

### `PeriDigmSettings()`

Creates settings with sensible defaults.

**Example:**
```python
import phynexis
settings = phynexis.peridigm.PeriDigmSettings()
print(settings.horizon_factor, settings.use_auto_timestep)
```

**Output:**
```text
3.01 True
```

## Methods

### `write_input_file(os)`

Writes the complete solver, compute class, and output sections to a stream in Peridigm-compatible format.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| os | file-like | Output stream |

## Properties

| Property | Type | Default | Access | Description |
|----------|------|---------|--------|-------------|
| `result_dir` | `str` | `"tmp/out/peridigm/"` | read/write | Output directory |
| `peridigm_exe` | `str` | `"Peridigm"` | read/write | Executable name |
| `horizon_factor` | `float` | `3.01` | read/write | Horizon = node_size × factor |
| `use_auto_timestep` | `bool` | `True` | read/write | Use automatic timestep |
| `timestep` | `float` | `1.0e-6` | read/write | Fixed timestep (if auto is off) |
| `timestep_factor` | `float` | `0.95` | read/write | Safety factor for auto timestep |
| `mech_time` | `float` | `0.0` | read/write | Simulation mechanical time |
| `loading_radius_factor` | `float` | `1.5` | read/write | Contact loading radius multiplier |
| `constrain_radius_factor` | `float` | `1.5` | read/write | Contact constraint radius multiplier |
| `output_freqency` | `int` | `10` | read/write | Output write frequency |
