---
title: "PeriDigmBlock"
displayed_sidebar: pythonApiSidebar
---

# PeriDigmBlock

> **C++**: `phynexis::peridigm::PeriDigmBlock`  
> **Python**: `phynexis.peridigm.PeriDigmBlock`  
> **Header**: `src/peridigm/peridigm_block.hpp`

## Description

Represents a peridynamic block: a group of nodes that share the same material and damage model.

## Constructors

### `PeriDigmBlock()`

Creates an empty block with default property values.

**Example:**
```python
import phynexis
block = phynexis.peridigm.PeriDigmBlock()
print(block.material_id, block.damage_model_id)
```

**Output:**
```text
0 0
```

## Methods

### `write_input_file(os, block_id)`

Writes the block definition to a stream in Peridigm input format.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| os | file-like | Output stream |
| block_id | int | Block index |

## Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `node_indices` | `list[int]` | read/write | Indices of nodes in this block |
| `material_id` | `int` | read/write | Index of the material |
| `damage_model_id` | `int` | read/write | Index of the damage model |
| `horizon` | `float` | read/write | Horizon for neighbor search |
