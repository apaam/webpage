---
title: "views"
displayed_sidebar: pythonApiSidebar
---

# views

> **C++**: `phynexis::parsim::{NodeView,EdgeView,HyperEdgeView,PropertiesView}`
> **Python**: `phynexis.parsim.{NodeViewByIndex,NodeViewById,EdgeViewByIndex,EdgeViewById,HyperEdgeViewByIndex,HyperEdgeViewById,PropertiesView}`
> **Header**: `src/parsim/views/*.hpp`

View classes provide indexed or ID-based access to graph elements and their properties. Each view wraps a stable reference to the underlying set and supports conversion between index-based and ID-based access.

## Node Views

### `NodeViewByIndex(dense_index, nodes)`

View a node by its contiguous (dense) index.

### `NodeViewById(node_id, nodes)`

View a node by its stable integer ID.

**Constructor Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `dense_index` / `node_id` | `int` | Position or ID in the node set |
| `nodes` | `NodeSet` | The node set (kept alive by the view) |

**Methods:**

| Method | Returns | Description |
|--------|---------|-------------|
| `refresh()` | — | Re-validate the view after set mutations |
| `is_valid()` | `bool` | Whether the view points to a live node |
| `id()` | `int` | Stable node ID |
| `dense_index()` | `int` | Contiguous dense index |
| `epoch()` | `int` | Set modification epoch |
| `nodes()` | `NodeSet` | The underlying node set (reference) |
| `to_by_id()` | `NodeViewById` | Convert to ID-based view |
| `to_by_index()` | `NodeViewByIndex` | Convert to index-based view |
| `properties()` | `PropertiesView` | Property accessor for this node |

Cross-conversion constructors allow creating an index view from an ID view and vice versa.

**Example:**
```python
import phynexis
P = phynexis.parsim

# Create a node set
g = P.ComputationalGraph()
ns = g.nodes()
# ... initialize and populate ...

# Create views
by_index = P.NodeViewByIndex(0, ns)
print("valid:", by_index.is_valid())
print("dense_index:", by_index.dense_index())

# Convert to ID-based view
by_id = P.NodeViewById(by_index.id(), ns)
print("by_id valid:", by_id.is_valid())
```

**Output:**
```text
valid: False
dense_index: 0
by_id valid: False
```


## Edge Views

### `EdgeViewByIndex(dense_index, edges)`

View an edge by its dense index.

### `EdgeViewById(edge_id, edges)`

View an edge by its stable ID.

**Constructor Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `dense_index` / `edge_id` | `int` | Position or ID in the edge set |
| `edges` | `EdgeSet` | The edge set (kept alive by the view) |

**Methods:**

| Method | Returns | Description |
|--------|---------|-------------|
| `refresh()` | — | Re-validate after set mutations |
| `is_valid()` | `bool` | Whether the view is live |
| `edge_id()` | `int` | Stable edge ID |
| `dense_index()` | `int` | Contiguous dense index |
| `source_node_id()` | `int` | Source node ID |
| `target_node_id()` | `int` | Target node ID |
| `edge_type()` | `int` | Edge type tag |
| `set_edge_type(type)` | — | Set edge type |
| `edges()` | `EdgeSet` | The underlying edge set |
| `to_by_id()` / `to_by_index()` | — | Convert between access modes |
| `properties()` | `PropertiesView` | Property accessor |


## HyperEdge Views

### `HyperEdgeViewByIndex(dense_index, hyper_edges)`

View a hyperedge by dense index.

### `HyperEdgeViewById(hyper_edge_id, hyper_edges)`

View a hyperedge by stable ID.

**Methods:**

| Method | Returns | Description |
|--------|---------|-------------|
| `refresh()` | — | Re-validate after set mutations |
| `is_valid()` | `bool` | Whether the view is live |
| `hyper_edge_id()` | `int` | Stable hyperedge ID |
| `dense_index()` | `int` | Contiguous dense index |
| `hyper_edges()` | `HyperEdgeSet` | The underlying set |
| `to_by_id()` / `to_by_index()` | — | Convert between access modes |
| `properties()` | `PropertiesView` | Property accessor |
| `to_json()` | `dict` | Serialize to JSON |
| `from_json(j)` | — | Deserialize from JSON |


## PropertiesView

Generic property accessor for node/edge/hyperedge views. Provides dict-style access to field values and field manager introspection.

**Methods:**

| Method | Returns | Description |
|--------|---------|-------------|
| `field_manager()` | `FieldManager` | Get the underlying field manager |
| `dense_index()` | `int` | Current dense index |
| `is_valid()` | `bool` | Whether the view is valid |
| `to_json()` | `dict` | Serialize all properties to JSON |
| `from_json(j)` | — | Deserialize all properties from JSON |
| `print_info()` | — | Print schema information |

**Dict-style access:**

| Method | Description |
|--------|-------------|
| `pv["name"]` | Get property value by name |
| `pv["name"] = value` | Set property value by name |

**Example:**
```python
import phynexis
P = phynexis.parsim

# Access properties through node view
g = P.ComputationalGraph()
ns = g.nodes()
nvi = P.NodeViewByIndex(0, ns)
pv = nvi.properties()

print("valid:", pv.is_valid())
print("field_manager:", type(pv.field_manager()).__name__)
```

**Output:**
```text
valid: False
field_manager: FieldManager
```
