---
title: "LayerType"
displayed_sidebar: pythonApiSidebar
---

# LayerType

> **C++**: `phynexis::ml::LayerType`  
> **Python**: `phynexis.ml.LayerType`  
> **Header**: `src/ml/neural_net.hpp`

## Description

Enumeration of layer types for `NeuralNet.add_layer()`.

## Values

| Value | Description |
|-------|-------------|
| `Identity` | Identity layer (no-op) |
| `Linear` | Fully connected linear layer |
| `ReLU` | ReLU activation |
| `LeakyReLU` | Leaky ReLU activation |
| `ELU` | Exponential linear unit |
| `Tanh` | Hyperbolic tangent activation |
| `Softmax` | Softmax activation |
| `LogSoftMax` | Log-softmax activation |

## Example

```python
import phynexis

net = phynexis.ml.NeuralNet()
net.add_layer(phynexis.ml.LayerType.Linear, 64)
net.add_layer(phynexis.ml.LayerType.ReLU)
net.add_layer(phynexis.ml.LayerType.Linear, 1)
```
