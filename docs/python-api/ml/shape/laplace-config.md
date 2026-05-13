---
title: "LaplaceConfig"
displayed_sidebar: pythonApiSidebar
---

# LaplaceConfig

> **C++**: `phynexis::ml::shape::NetLaplace::LaplaceConfig`  
> **Python**: `phynexis.ml.shape.LaplaceConfig`  
> **Header**: `src/ml/shape/net_laplace.hpp`

## Description

Configuration struct for Laplace field training and surface extraction. Inherits all fields from `NetField.SurfaceConfig`.

## Constructors

### `LaplaceConfig()`

Creates a configuration with default values.

## Properties

### Inherited from SurfaceConfig

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `extraction_method` | `ExtractionMethod` | `SphericalProjection` | Surface extraction method |
| `projection_tolerance` | `float` | `1e-5` | Surface projection tolerance |
| `projection_max_iterations` | `int` | `100` | Maximum projection iterations |
| `alpha` | `float` | `0.0` | Alpha shape parameter |
| `use_alpha_shape` | `bool` | `False` | Use alpha shape |
| `grid_resolution` | `int` | `64` | Grid resolution for marching cubes |
| `iso_value` | `float` | `0.0` | Isosurface value |

### Laplace-specific

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `expansion_factor` | `float` | `1.5` | AABB expansion factor for bounds |
| `num_domain_points` | `int` | `5000` | Number of domain points for PDE training |
| `num_interior_points` | `int` | `100` | Number of interior points (deprecated) |
| `num_boundary_points` | `int` | `200` | Number of boundary points for BC training |
| `interior_weight_scale` | `float` | `50.0` | Weight scale for interior point loss |
| `use_siren` | `bool` | `True` | Use SIREN activation |
| `omega_0` | `float` | `30.0` | SIREN frequency parameter |
| `epochs` | `int` | `2000` | Training epochs |
| `lr` | `float` | `0.001` | Learning rate |
| `lambda_pde` | `float` | `1.0` | PDE loss weight |
| `lambda_bc` | `float` | `10.0` | Boundary condition loss weight |
