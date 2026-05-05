---
title: "workflow"
displayed_sidebar: pythonApiSidebar
---

# phynexis.workflow

Workflow automation module providing a graph-based execution framework for building and running procedural pipelines. Supports node registration, method introspection, and JSON-driven graph execution.

## Import

```python
import phynexis

# Bind locally
from phynexis import workflow
g = workflow.Graph()
print(type(g).__name__)
```

## Module Overview

| Class / Function | Description |
|------------------|-------------|
| [PortInfo](port-info.md) | Port descriptor for method signature I/O |
| [MethodSignature](port-info.md#methodsignature) | Method signature description |
| WorkflowObject | Abstract base class for workflow-enabled objects |
| Node | Node representing an object instance in a workflow graph |
| MethodCall | Method invocation within a node |
| Graph | Workflow graph managing nodes and method calls |
| Executor | Graph executor that processes calls in topological order |
| Registry | Global registry for workflow node types |
| `register_type()` | Register a Python class as a workflow node type |
| `run_graph_from_json()` | Run a workflow from a JSON string |

## Free Functions

| Function | Description |
|----------|-------------|
| `register_type(name, pycls)` | Register a Python class as a workflow node type |
| `run_graph_from_json(json_str)` | Parse JSON, build graph, execute, return outputs |
