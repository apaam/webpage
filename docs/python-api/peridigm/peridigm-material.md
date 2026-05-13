---
title: "PeriDigmMaterial"
displayed_sidebar: pythonApiSidebar
---

# PeriDigmMaterial

> **C++**: `phynexis::peridigm::PeriDigmMaterial`  
> **Python**: `phynexis.peridigm.PeriDigmMaterial`  
> **Header**: `src/peridigm/peridigm_material.hpp`

## Description

Material model for peridynamic simulations. Currently supports linear elastic material.

## Constructors

### `PeriDigmMaterial()`

Creates a material with default elastic properties.

**Example:**
```python
import phynexis
mat = phynexis.peridigm.PeriDigmMaterial()
print(mat.type)
```

**Output:**
```text
Type.Elastic
```

## Methods

### `write_input_file(os)`

Writes the material definition to a stream in Peridigm input format.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| os | file-like | Output stream |

## Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `type` | `PeriDigmMaterial.Type` | read/write | Material type |
| `density` | `float` | read/write | Mass density |
| `youngs_modulus` | `float` | read/write | Young's modulus |
| `poissons_ratio` | `float` | read/write | Poisson's ratio |

## Enums

### `Type`

| Value | Description |
|-------|-------------|
| `Elastic` | Linear elastic material |
