---
title: "ml"
displayed_sidebar: pythonApiSidebar
---

# phynexis.ml

Machine learning module. Provides neural network training and inference (via PyTorch backend), plus ML-based shape representations using signed distance functions (SDF) and Laplace fields.

## Import

```python
import phynexis

# Access submodule directly
net = phynexis.ml.NeuralNet()

# Or bind locally
from phynexis import ml
net = ml.NeuralNet()
```

## Module Overview

| Class | Description |
|-------|-------------|
| [NeuralNet](neural-net.md) | Unified neural network supporting classification, regression, and gradient computation |
| [TrainingConfig](training-config.md) | Training hyperparameters (step size, batch size, epochs, etc.) |
| [LayerType](layer-type.md) | Layer type enumeration (Linear, ReLU, Tanh, etc.) |
| [PyTorchUtils](pytorch-utils.md) | Utility functions for PyTorch interoperability |
| [NetField](shape/net-field.md) | Base class for neural-network field representations |
| [NetSDF](shape/net-sdf.md) | Neural network-based signed distance function |
| [NetLaplace](shape/net-laplace.md) | Neural network-based Laplace field |
| [CodedNetSDF](shape/coded-net-sdf.md) | SDF with latent code conditioning |
| [CodedNetLaplace](shape/coded-net-laplace.md) | Laplace field with latent code conditioning |
| [LaplaceConfig](shape/laplace-config.md) | Configuration for Laplace field training and extraction |
| [FieldType](shape/field-type.md) | Field type enumeration (SDF / Laplace) |

## C++ Namespace

`phynexis::ml`

## pybind Module

`pyml` (lazy-loaded via `phynexis.ml`)
