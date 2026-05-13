---
title: "shape"
displayed_sidebar: pythonApiSidebar
---

# phynexis.ml.shape

ML-based shape representations using neural network fields. Provides signed distance functions (SDF) and Laplace fields for geometry representation, surface extraction, and point cloud fitting.

## Classes

| Class | Description |
|-------|-------------|
| [NetField](net-field.md) | Base class for neural-network field representations |
| [NetSDF](net-sdf.md) | Neural network-based signed distance function |
| [NetLaplace](net-laplace.md) | Neural network-based Laplace field with PDE verification |
| [CodedNetSDF](coded-net-sdf.md) | SDF with latent code conditioning |
| [CodedNetLaplace](coded-net-laplace.md) | Laplace field with latent code conditioning |
| [LaplaceConfig](laplace-config.md) | Training and extraction configuration |
| [FieldType](field-type.md) | Field type enumeration (SDF / Laplace) |

## C++ Namespace

`phynexis::ml::shape`
