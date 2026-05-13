---
title: "CodedNetLaplace"
displayed_sidebar: pythonApiSidebar
---

# CodedNetLaplace

> **C++**: `phynexis::ml::shape::CodedNetLaplace`  
> **Python**: `phynexis.ml.shape.CodedNetLaplace`  
> **Header**: `src/ml/shape/coded_net_laplace.hpp`

## Description

Laplace field with latent code conditioning. Extends [`NetLaplace`](net-laplace.md) with a latent code that modulates the neural network output.

## Constructors

### `CodedNetLaplace()`

Creates an empty coded Laplace field.

## Methods

### `init_from_model_files(net_laplace_file, latent_code_file, id)`

Initializes from model and latent code files.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| net_laplace_file | str | Path to the Laplace model file |
| latent_code_file | str | Path to the latent code file |
| id | int | Object ID |

### `initialize()`

Initializes from memory.

### `signed_distance(pos)`

Computes the signed distance (field value) at a position.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| pos | Vec3d | Position |

**Returns:** `float` — field value

### `print_info()`

Prints basic information about the coded Laplace field.

### Inherited from NetLaplace

- `laplacian(pos)`, `laplacians(points)`
- `verify_surface_bc(surface_points)`, `verify_interior_bc(interior_points)`, `verify_boundary_bc(boundary_points, boundary_value=-1.0)`, `verify_pde_constraint(domain_points)`
- `extract_isosurface(bounds_min, bounds_max, iso_value=NaN)`
- `fit_from_surface_points(surface_points, layers)`
- `get_stl_model(num_nodes=200)`
- `surface_projection(pos)`
- `sample_surface_points()`
- `compute_bounds_from_points(points)`

## Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `latent_code` | `list[float]` | read/write | Latent code vector |
| `laplace_config` | `LaplaceConfig` | read/write | Laplace-specific configuration |

### Inherited from NetField

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `net_model` | `NeuralNet` | read/write | Neural network model |
| `field_type` | `FieldType` | read/write | Field type |
| `surface_config` | `SurfaceConfig` | read/write | Surface extraction configuration |
