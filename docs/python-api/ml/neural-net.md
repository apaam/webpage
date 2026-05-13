---
title: "NeuralNet"
displayed_sidebar: pythonApiSidebar
---

# NeuralNet

> **C++**: `phynexis::ml::NeuralNet`  
> **Python**: `phynexis.ml.NeuralNet`  
> **Header**: `src/ml/neural_net.hpp`

## Description

Unified neural network class supporting classification, regression, and gradient computation via a PyTorch backend.

## Constructors

### `NeuralNet()`

Creates an empty neural network.

**Example:**
```python
import phynexis
net = phynexis.ml.NeuralNet()
print(net)
```

## Methods

### `add_layer(layer_type, out_features)`

Adds a Linear layer with the specified number of output features.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| layer_type | LayerType | Layer type (must be `LayerType.Linear`) |
| out_features | int | Number of output features |

### `add_layer(layer_type)`

Adds an activation layer.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| layer_type | LayerType | Activation type (ReLU, Tanh, ELU, etc.) |

### `train(data_x, data_y)`

Trains the network on the given data.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| data_x | ndarray | Input data (features × samples) |
| data_y | ndarray | Target data (outputs × samples) |

### `train(data_x, data_y, config)`

Trains with a custom `TrainingConfig`.

### `train_with_loss(loss_fn, data_dict)`

Trains with a custom loss function (e.g. for PINN).

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| loss_fn | callable | Loss function: `loss_fn(model, data_dict) -> loss_tensor` |
| data_dict | dict | Dictionary mapping string keys to data arrays |

### `predict(data_x)`

Performs regression prediction.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| data_x | ndarray | Input data |

**Returns:** `ndarray` — predicted output

### `classify(data_x)`

Performs classification and returns class labels.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| data_x | ndarray | Input data |

**Returns:** `ndarray` — class labels

### `regress(data_x)`

Alias for `predict()`.

### `gradient(data_x)`

Computes the gradient with respect to input.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| data_x | ndarray | Input data |

**Returns:** `ndarray` — gradient matrix

### `laplacian(data_x)`

Computes the Laplacian (second-order derivative) with respect to input.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| data_x | ndarray | Input data |

**Returns:** `ndarray` — Laplacian values

### `save(filename, label="model")`

Saves the model to a file.

### `load(filename, label="model")`

Loads the model from a file.

### `load_from_pytorch_model(pytorch_model)`

Loads weights from a PyTorch `nn.Module` object.

### `print_info()`

Prints basic model information.

### `print_detailed()`

Prints detailed model information including layer details.

### `reset_model()`

Resets the model.

## Properties

| Property | Type | Default | Access | Description |
|----------|------|---------|--------|-------------|
| `step_size` | `float` | `0.01` | read/write | Learning rate |
| `batch_size` | `int` | `32` | read/write | Batch size |
| `decay_rate_moment` | `float` | `0.9` | read/write | Momentum decay rate |
| `decay_rate_norm` | `float` | `0.9` | read/write | Norm decay rate |
| `gradient_init_param` | `float` | `1e-8` | read/write | Gradient initialization parameter |
| `epochs` | `int` | `100` | read/write | Number of training epochs |
| `stop_tol` | `float` | `1e-8` | read/write | Stopping tolerance |
| `enable_logging` | `bool` | `True` | read/write | Enable training log output |
