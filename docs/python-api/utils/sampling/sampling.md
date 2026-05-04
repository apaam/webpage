---
title: "sampling"
displayed_sidebar: pythonApiSidebar
---

# sampling

> **C++**: `phynexis::utils::sampling`
> **Python**: `phynexis.utils.sampling`
> **Header**: `src/utils/sampling/*.hpp`

Sampling utilities for distributions, spatial points, orientations, and spherical arrangements.

Most sampler classes support a common interface. Distribution samplers return a single value; spherical/spatial samplers return a single point or take a `num_samples` argument.

| Method | Returns | Description |
|--------|---------|-------------|
| `sample()` | `float` / `Vec3d` | Draw a random sample (distribution/spatial/orientation) |
| `sample(N)` | `list[Vec3d]` | Draw N samples at once (spherical samplers) |
| `reset()` | — | Reset the internal RNG state |
| `get_seed()` | `int` | Get current random seed |
| `set_seed(seed)` | — | Set random seed for reproducibility |


## Distribution Sampling

Generates random scalar values from probability distributions.

### `Uniform(min, max)`

Uniform distribution in [min, max]. Alias: `sampling.UniformDistribution`.

**Constructor:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `min` | `float` | Lower bound |
| `max` | `float` | Upper bound |

### `Normal(mean, std)`

Normal (Gaussian) distribution. Alias: `sampling.Normal`.

**Constructor:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `mean` | `float` | Mean value |
| `std` | `float` | Standard deviation |

### `Exponential(lambda)`

Exponential distribution. Alias: `sampling.Exponential`.

**Constructor:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `lambda` | `float` | Rate parameter |

**Example:**
```python
import phynexis

# Uniform distribution
u = phynexis.utils.sampling.UniformDistribution(0.0, 10.0)
print("uniform sample:", u.sample())
print("uniform sample:", u.sample())
u.reset()
print("after reset:", u.sample())

# Normal distribution
n = phynexis.utils.sampling.Normal(0.0, 1.0)
print("normal sample:", n.sample())

# Exponential distribution
e = phynexis.utils.sampling.Exponential(1.0)
print("exponential sample:", e.sample())
```

**Output:**
```text
uniform sample: 3.591168210525055
uniform sample: 9.928038367790007
after reset: 3.591168210525055
normal sample: -0.5704137239746693
exponential sample: 1.3265582842979053
```


## Spatial Sampling

Generate points within a shape's bounding volume. All take a `Shape` as the first argument and provide `sample()` returning `Vec3d`.

| Class | Alias | Extra Constructor Params |
|-------|-------|------------------------|
| `Random(shape)` | `sampling.Random` | — |
| `Grid(shape, resolution)` | `sampling.Grid` | `resolution: Vec3i` — grid divisions |
| `CVT(shape)` | `sampling.CVT` | optional `max_iter`, `tol` |
| `Voronoi(shape, seeds)` | `sampling.Voronoi` | `seeds: list[Vec3d]` — initial seed points |
| `WCVT(shape, weight_func)` | `sampling.WCVT` | `weight_func` — callable (requires `<functional>` include) |

### Additional Methods

Spatial samplers provide:

| Method | Returns | Description |
|--------|---------|-------------|
| `get_shape()` | `Shape` | Get bound shape |
| `set_shape(shape)` | — | Set bound shape |
| `volume()` | `float` | Sample volume |
| `is_inside(point)` | `bool` | Test if point is inside |
| `get_bounding_box()` | `BoundingBox` | Bounding box |
| `get_center()` | `Vec3d` | Shape center |

Type-specific:

| Sampler | Method | Description |
|---------|--------|-------------|
| `Grid` | `get_resolution()` / `set_resolution(v)` | Grid divisions |
| `CVT` | `set_max_iter(n)` / `set_tol(t)` | Convergence control |
| `WCVT` | `set_weight_func(f)` / `set_max_iter(n)` / `set_tol(t)` | Weight function and convergence |
| `Voronoi` | `get_seeds()` / `set_seeds(s)` / `get_voronoi_diagram()` | Seed management |

**Example:**
```python
import phynexis

# Create a sphere shape
sphere = phynexis.utils.shape.Sphere(1.0)

# Random points inside sphere
random_sampler = phynexis.utils.sampling.Random(sphere)
print("random point:", random_sampler.sample())
print("volume:", random_sampler.volume())

# Grid sampling
grid_sampler = phynexis.utils.sampling.Grid(sphere, phynexis.utils.Vec3i(3, 3, 3))
print("grid point:", grid_sampler.sample())
```

**Output:**
```text
random point: Vec3d(0.0801163, 0.315637, 0.00687753)
volume: 4.1887902047863905
grid point: Vec3d(0, 0, 0.471405)
```


## Orientation Sampling

Generate random 3D orientations (rotation quaternions as `Vec4d`).

| Class | Constructor Parameters | Alias |
|-------|----------------------|-------|
| `Uniform()` | — | `sampling.orientation.Uniform` |
| `ConeDir(target_dir, body_axis, max_angle, roll_mode, ...)` | `target_dir: Vec3d`, `body_axis: Vec3d`, `max_angle: float`, `roll_mode: RollMode` | — |
| `ConeRef(reference_quat, max_angle)` | `reference_quat: Vec4d`, `max_angle: float` | — |

**Example:**
```python
import phynexis

# Uniform orientations
o = phynexis.utils.sampling.orientation.Uniform()
print("orientation quat:", o.sample())
```

**Output:**
```text
orientation quat: Vec4d(0.556432, -0.514359, -0.475483, 0.449191)
```


## Spherical Sampling

Generate points uniformly distributed on a sphere surface.

| Class | Alias | Extra Params |
|-------|-------|-------------|
| `Uniform()` | `sampling.spherical.Uniform` | — |
| `CVT()` | `sampling.spherical.CVT` | optional `max_iters`, `tol` |
| `WCVT(weight_func)` | — | `weight_func: callable` (requires `<functional>` include) |
| `GoldenSpiral()` | `sampling.spherical.GoldenSpiral` | — |

**Example:**
```python
import phynexis

# Uniform spherical sampling (returns list of Vec3d)
su = phynexis.utils.sampling.spherical.Uniform()
pts = su.sample(3)
print("uniform points:", len(pts), "first:", pts[0])

# Golden spiral distribution
gs = phynexis.utils.sampling.spherical.GoldenSpiral()
pts2 = gs.sample(5)
print("golden spiral points:", len(pts2), "first:", pts2[0])
```

**Output:**
```text
uniform points: 3 first: Vec3d(0.4735, 0.86313, -0.175515)
golden spiral points: 5 first: Vec3d(0.530863, 0, 0.847458)
```


## Unexposed C++ API

- `Factory` — string-based sampler factory (creates samplers by name)
- `DistributionStrategy` / `SpatialStrategy` / `OrientationStrategy` / `SphericalStrategy` — internal strategy base classes
