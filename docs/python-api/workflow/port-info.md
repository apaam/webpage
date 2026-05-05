---
title: "PortInfo / MethodSignature"
displayed_sidebar: pythonApiSidebar
---

# PortInfo / MethodSignature

> **C++**: `phynexis::workflow::PortInfo` / `phynexis::workflow::MethodSignature`
> **Python**: `phynexis.workflow.PortInfo` / `phynexis.workflow.MethodSignature`
> **Header**: `src/workflow/types.hpp`

## Description

`PortInfo` describes a single input or output port of a workflow method. `MethodSignature` aggregates multiple port descriptors with a method name and description to form a complete method signature for introspection and GUI discovery.

## PortInfo

### `PortInfo()`

Default constructor — creates an empty port descriptor with all fields default-initialized.

### Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `name` | `str` | read/write | Port name (e.g. `"position"`, `"velocity"`) |
| `valueType` | `str` | read/write | Value type string (e.g. `"Vec3d"`, `"double"`) |
| `optional` | `bool` | read/write | Whether this port is optional |
| `defaultValue` | `json` | read/write | Default value when optional and not connected |
| `description` | `str` | read/write | Human-readable port description |

**Example:**
```python
import phynexis

# Create and configure a port descriptor
port = phynexis.workflow.PortInfo()
port.name = "position"
port.valueType = "Vec3d"
port.optional = False
port.description = "Particle position vector"

print(f"Port: {port.name} ({port.valueType})")
print(f"Optional: {port.optional}")
print(f"Description: {port.description}")
```

**Output:**
```text
Port: position (Vec3d)
Optional: False
Description: Particle position vector
```

## MethodSignature

### `MethodSignature()`

Default constructor — creates an empty method signature.

### Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `methodName` | `str` | read/write | Method name (e.g. `"set_position"`) |
| `inputs` | `VecX[PortInfo]` | read/write | Input port descriptors |
| `outputs` | `VecX[PortInfo]` | read/write | Output port descriptors |
| `description` | `str` | read/write | Human-readable method description |

:::note
Direct access to `inputs` and `outputs` requires a `VecX<PortInfo>` type converter that may not be registered in all build configurations. If you encounter `TypeError: Unregistered type`, the internal storage uses `VecX<PortInfo>` which needs a type caster. As a workaround, these fields can still be set through the graph API.
:::

**Example:**
```python
import phynexis

# Build a method signature manually
sig = phynexis.workflow.MethodSignature()
sig.methodName = "set_position"
sig.description = "Sets the particle position"

# Create input port
input_port = phynexis.workflow.PortInfo()
input_port.name = "position"
input_port.valueType = "Vec3d"
input_port.description = "New position value"

print(f"Method: {sig.methodName}")
print(f"Description: {sig.description}")
print(f"Input port: {input_port.name} ({input_port.valueType})")
```

**Output:**
```text
Method: set_position
Description: Sets the particle position
Input port: position (Vec3d)
```
