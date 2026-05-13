---
title: "PeriDigmStrength"
displayed_sidebar: pythonApiSidebar
---

# PeriDigmStrength

> **C++**: `phynexis::peridigm::PeriDigmStrength`  
> **Python**: `phynexis.peridigm.PeriDigmStrength`  
> **Header**: `src/peridigm/peridigm_strength.hpp`

## Description

Weibull-distributed strength model for quasi-brittle materials. Computes the critical energy release rate for a given particle size, incorporating random strength variation according to the Weibull distribution.

## Constructors

### `PeriDigmStrength()`

Default constructor with reference values calibrated for typical rock-like materials.

**Example:**
```python
import phynexis
strength = phynexis.peridigm.PeriDigmStrength()
print(strength.weibull_modulus)
```

**Output:**
```text
3.1
```

## Methods

### `get_energy_release_rate(size)`

Computes a random energy release rate for the given particle size using the Weibull distribution.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| size | float | Particle size |

**Returns:** `float` — energy release rate

**Example:**
```python
strength = phynexis.peridigm.PeriDigmStrength()
rate = strength.get_energy_release_rate(1.0e-3)
print(f"rate = {rate:.2f}")
```

### `get_energy_release_rate(size, percentile)`

Computes the energy release rate at a specific Weibull percentile (deterministic).

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| size | float | Particle size |
| percentile | float | Weibull percentile (0–1) |

**Returns:** `float` — energy release rate at the given percentile

**Example:**
```python
strength = phynexis.peridigm.PeriDigmStrength()
# Median strength
rate_50 = strength.get_energy_release_rate(1.0e-3, 0.5)
print(f"median rate = {rate_50:.2f}")
```

## Properties

| Property | Type | Default | Access | Description |
|----------|------|---------|--------|-------------|
| `ref_size` | `float` | `1.5e-3` | read/write | Reference particle size |
| `ref_energy_release_rate` | `float` | `60.0` | read/write | Reference energy release rate |
| `weibull_modulus` | `float` | `3.1` | read/write | Weibull modulus |
| `weibull_coef_a` | `float` | `-0.76` | read/write | Weibull coefficient a |
| `weibull_coef_b` | `float` | `1.13` | read/write | Weibull coefficient b |
| `min_breakable_size` | `float` | `0.02` | read/write | Minimum breakable size fraction |
