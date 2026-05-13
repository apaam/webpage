---
title: "PeriDigmDamageModel"
displayed_sidebar: pythonApiSidebar
---

# PeriDigmDamageModel

> **C++**: `phynexis::peridigm::PeriDigmDamageModel`  
> **Python**: `phynexis.peridigm.PeriDigmDamageModel`  
> **Header**: `src/peridigm/peridigm_damage_model.hpp`

## Description

Damage model for peridynamic simulations. Currently supports the critical stretch model.

## Constructors

### `PeriDigmDamageModel()`

Creates a damage model with default critical stretch value.

**Example:**
```python
import phynexis
dm = phynexis.peridigm.PeriDigmDamageModel()
print(dm.type, dm.critical_stretch)
```

**Output:**
```text
Type.Critical_Stretch 0.01
```

## Methods

### `initialize_from_energy_release_rate(youngs_modulus, poissons_ratio, horizon, energy_release_rate)`

Computes the critical stretch from the energy release rate and material properties.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| youngs_modulus | float | Young's modulus |
| poissons_ratio | float | Poisson's ratio |
| horizon | float | Peridynamic horizon |
| energy_release_rate | float | Energy release rate |

### `get_stretch_from_energy_release_rate(youngs_modulus, poissons_ratio, horizon, energy_release_rate)`

Static method that computes the stretch value from energy release rate without modifying the object.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| youngs_modulus | float | Young's modulus |
| poissons_ratio | float | Poisson's ratio |
| horizon | float | Peridynamic horizon |
| energy_release_rate | float | Energy release rate |

**Returns:** `float` — computed stretch value

**Example:**
```python
dm = phynexis.peridigm.PeriDigmDamageModel()
stretch = dm.get_stretch_from_energy_release_rate(70e9, 0.33, 0.001, 100)
print(f"stretch = {stretch:.6f}")
```

### `write_input_file(os, damage_model_id)`

Writes the damage model definition to a stream.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| os | file-like | Output stream |
| damage_model_id | int | Damage model index |

## Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `type` | `PeriDigmDamageModel.Type` | read/write | Damage model type |
| `critical_stretch` | `float` | read/write | Critical stretch threshold |

## Enums

### `Type`

| Value | Description |
|-------|-------------|
| `Critical_Stretch` | Critical stretch damage model |
