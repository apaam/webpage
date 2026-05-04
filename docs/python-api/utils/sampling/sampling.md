---
title: "sampling"
displayed_sidebar: pythonApiSidebar
---

# sampling

> **C++**: `phynexis::utils::sampling`
> **Python**: `phynexis.utils.sampling`
> **Header**: `src/utils/sampling/sampling.hpp`

Sampling utilities for distributions, spatial points, orientations, and spherical arrangements.

---

## Distribution Sampling

| Class | Description |
|-------|-------------|
| `UniformDistribution(min, max)` | Uniform distribution in [min, max] |
| `Normal(mean, std)` | Normal (Gaussian) distribution |
| `Exponential(lambda)` | Exponential distribution |

---

## Spatial Sampling

Spatial samplers generate points within a shape's bounding volume.

| Class | Description |
|-------|-------------|
| `Random(shape)` | Random uniform sampling inside a shape |
| `Grid(shape)` | Regular grid sampling |
| `CVT(shape)` | Centroidal Voronoi tessellation sampling |
| `WCVT(shape)` | Weighted CVT sampling |
| `Voronoi(shape)` | Voronoi-based sampling |

---

## Orientation Sampling

| Class | Description |
|-------|-------------|
| `Uniform` | Uniform random orientations |
| `ConeDir` | Orientations within a cone |
| `ConeRef` | Orientations relative to a reference direction |

---

## Spherical Sampling

| Class | Description |
|-------|-------------|
| `Uniform` | Uniform points on sphere |
| `CVT` | Spherical CVT |
| `WCVT` | Weighted spherical CVT |
| `GoldenSpiral` | Fibonacci/golden spiral point distribution |

---

## Example

```python
import phynexis

# Distribution sampling
u = phynexis.utils.sampling.UniformDistribution(0.0, 1.0)
n = phynexis.utils.sampling.Normal(0.0, 1.0)
e = phynexis.utils.sampling.Exponential(1.0)
print("Uniform:", u)
print("Normal:", n)
print("Exponential:", e)
```

**Output:**
```text
Uniform: <phynexis.lib.pyutils.sampling.distribution.Uniform object at 0x...>
Normal: <phynexis.lib.pyutils.sampling.distribution.Normal object at 0x...>
Exponential: <phynexis.lib.pyutils.sampling.distribution.Exponential object at 0x...>
```

---

## Unexposed C++ API

- Distribution `sample()` methods returning scalar values
- Spatial samplers' `get_samples()` methods returning `VecX<Vec3d>` (unregistered)
- Orientation and spherical sampler detail methods
- `Factory` for creating samplers by name
