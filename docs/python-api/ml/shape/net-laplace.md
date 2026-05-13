---
title: "NetLaplace"
displayed_sidebar: pythonApiSidebar
---

# NetLaplace

> **C++**: `phynexis::ml::shape::NetLaplace`  
> **Python**: `phynexis.ml.shape.NetLaplace`  
> **Header**: `src/ml/shape/net_laplace.hpp`

## Description

Neural network-based Laplace field. Supports PDE verification, surface extraction via marching cubes or spherical projection, and fitting from surface point clouds. Inherits from [`NetField`](net-field.md).

## Constructors

### `NetLaplace()`

Creates a Laplace field with `field_type = FieldType.Laplace`.

## Methods

### `init_from_model_files(net_laplace_file)`

Initializes from a saved Laplace model file.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| net_laplace_file | str | Path to the model file |

### `laplacian(pos)`

Computes the Laplacian ($\\nabla^2 f$) at a single position.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| pos | Vec3d | Position |

**Returns:** `float` — Laplacian value

### `laplacians(points)`

Computes Laplacian values for multiple points.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| points | list[Vec3d] | Positions |

**Returns:** `list[float]` — Laplacian values

### `verify_surface_bc(surface_points)`

Verifies the surface boundary condition ($f=0$).

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| surface_points | list[Vec3d] | Surface points |

**Returns:** `float` — mean squared error

### `verify_interior_bc(interior_points)`

Verifies the interior boundary condition ($f=1$).

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| interior_points | list[Vec3d] | Interior points |

**Returns:** `float` — mean squared error

### `verify_boundary_bc(boundary_points, boundary_value=-1.0)`

Verifies a boundary condition with a custom value.

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| boundary_points | list[Vec3d] | — | Boundary points |
| boundary_value | float | `-1.0` | Target field value |

**Returns:** `float` — mean squared error

### `verify_pde_constraint(domain_points)`

Verifies the PDE constraint ($\\nabla^2 f = 0$).

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| domain_points | list[Vec3d] | Domain points |

**Returns:** `float` — mean squared error

### `extract_isosurface(bounds_min, bounds_max, iso_value=NaN)`

Extracts an isosurface using marching cubes.

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| bounds_min | Vec3d | — | Minimum bounds |
| bounds_max | Vec3d | — | Maximum bounds |
| iso_value | float | `NaN` | Isosurface value (default: `laplace_config.iso_value`) |

**Returns:** `STLModel`

### `fit_from_surface_points(surface_points, layers)`

Fits the Laplace field model from a surface point cloud using PINN training.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| surface_points | list[Vec3d] | Surface points |
| layers | list[int] | Network layer sizes (e.g. `[3, 64, 64, 64, 1]`) |

### `get_stl_model(num_nodes=200)`

Generates an STL model from the Laplace field.

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| num_nodes | int | `200` | Target number of surface nodes |

**Returns:** `STLModel`

### `surface_projection(pos)`

Projects a point onto the surface using Newton's method.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| pos | Vec3d | Position to project |

**Returns:** `Vec3d` — projected surface point

### `sample_surface_points()`

Samples surface points.

### `compute_bounds_from_points(points)`

Computes axis-aligned bounding box with expansion.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| points | list[Vec3d] | Point cloud |

**Returns:** `(Vec3d, Vec3d)` — (bounds_min, bounds_max)

## Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `laplace_config` | `LaplaceConfig` | read/write | Laplace-specific configuration |

### Inherited from NetField

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `net_model` | `NeuralNet` | read/write | Neural network model |
| `field_type` | `FieldType` | read/write | Field type (always `Laplace`) |
| `surface_config` | `SurfaceConfig` | read/write | Surface extraction configuration |
