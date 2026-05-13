---
title: "CodedNetSDF"
displayed_sidebar: pythonApiSidebar
---

# CodedNetSDF

> **C++**: `phynexis::ml::shape::CodedNetSDF`  
> **Python**: `phynexis.ml.shape.CodedNetSDF`  
> **Header**: `src/ml/shape/coded_net_sdf.hpp`

## Description

Signed distance function with latent code conditioning. Extends [`NetSDF`](net-sdf.md) with a latent code that modulates the neural network output.

## Constructors

### `CodedNetSDF()`

Creates an empty coded SDF.

## Methods

### `init_from_model_files(net_sdf_file, latent_code_file, id)`

Initializes from model and latent code files.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| net_sdf_file | str | Path to the SDF model file |
| latent_code_file | str | Path to the latent code file |
| id | int | Object ID |

### `initialize()`

Initializes from memory.

### `signed_distance(pos)`

Computes the signed distance at a position.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| pos | Vec3d | Position |

**Returns:** `float` — signed distance

### `print_info()`

Prints basic information about the coded SDF.

### Inherited from NetSDF / NetField

- `init_from_model_files(model_file)`
- `initialize()`

## Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `latent_code` | `list[float]` | read/write | Latent code vector |

### Inherited from NetField

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `net_model` | `NeuralNet` | read/write | Neural network model |
| `field_type` | `FieldType` | read/write | Field type |
| `surface_config` | `SurfaceConfig` | read/write | Surface extraction configuration |
