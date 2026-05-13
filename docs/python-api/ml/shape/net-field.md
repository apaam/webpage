---
title: "NetField"
displayed_sidebar: pythonApiSidebar
---

# NetField

> **C++**: `phynexis::ml::shape::NetField`  
> **Python**: `phynexis.ml.shape.NetField`  
> **Header**: `src/ml/shape/net_field.hpp`

## Description

Base class for neural-network field representations. Holds the neural network model, field type, and surface extraction configuration.

## Constructors

### `NetField()`

Default constructor with `FieldType.SDF`.

### `NetField(type)`

Creates a field with the specified type.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| type | FieldType | Field type (`SDF` or `Laplace`) |

## Methods

### `init_from_model_files(model_file)`

Initializes the field from a saved model file.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| model_file | str | Path to the model file |

### `initialize()`

Initializes the field from memory.

## Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `net_model` | `NeuralNet` | read/write | Neural network model |
| `field_type` | `FieldType` | read/write | Field type |
| `surface_config` | `SurfaceConfig` | read/write | Surface extraction configuration |

## Nested Types

### `SurfaceConfig`

Configuration for surface extraction.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `extraction_method` | `ExtractionMethod` | `SphericalProjection` | Method for extracting the surface |
| `projection_tolerance` | `float` | `1e-5` | Projection convergence tolerance |
| `projection_max_iterations` | `int` | `100` | Maximum projection iterations |
| `alpha` | `float` | `0.0` | Alpha shape parameter |
| `use_alpha_shape` | `bool` | `False` | Use alpha shape for extraction |
| `grid_resolution` | `int` | `64` | Grid resolution for marching cubes |
| `iso_value` | `float` | `0.0` | Isosurface value |

### `SurfaceConfig.ExtractionMethod`

| Value | Description |
|-------|-------------|
| `SphericalProjection` | Spherical projection method |
| `MarchingCubes` | Marching cubes method |
