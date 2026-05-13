---
title: "TrainingConfig"
displayed_sidebar: pythonApiSidebar
---

# TrainingConfig

> **C++**: `phynexis::ml::TrainingConfig`  
> **Python**: `phynexis.ml.TrainingConfig`  
> **Header**: `src/ml/neural_net.hpp`

## Description

Groups all training hyperparameters into a single struct for passing to `NeuralNet.train(data_x, data_y, config)`.

## Constructors

### `TrainingConfig()`

Creates a configuration with default values.

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
