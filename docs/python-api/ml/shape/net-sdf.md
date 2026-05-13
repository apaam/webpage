---
title: "NetSDF"
displayed_sidebar: pythonApiSidebar
---

# NetSDF

> **C++**: `phynexis::ml::shape::NetSDF`  
> **Python**: `phynexis.ml.shape.NetSDF`  
> **Header**: `src/ml/shape/net_sdf.hpp`

## Description

Neural network-based signed distance function. Inherits from [`NetField`](net-field.md).

## Constructors

### `NetSDF()`

Creates an SDF with `field_type = FieldType.SDF`.

## Methods

### `init_from_model_files(net_sdf_file)`

Initializes the SDF from a saved model file.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| net_sdf_file | str | Path to the SDF model file |

### Inherited from NetField

- `initialize()`

## Properties

### Inherited from NetField

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `net_model` | `NeuralNet` | read/write | Neural network model |
| `field_type` | `FieldType` | read/write | Field type (always `SDF`) |
| `surface_config` | `SurfaceConfig` | read/write | Surface extraction configuration |
