---
title: "Graph"
displayed_sidebar: pythonApiSidebar
---

# Graph

> **Python**: `phynexis.parsim`
> **Headers**: `src/parsim/graph/*.hpp`

Graph data structures for particle simulations. `ComputationalGraph` is the top-level container holding `NodeSet`, `EdgeSet`, `HyperEdgeSet`, and `ShapeStore`.

---

## ComputationalGraph

Top-level graph container.

### Constructors

| Signature | Description |
|-----------|-------------|
| `ComputationalGraph()` | Empty graph. |

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `nodes()` | `NodeSet` | The node set |
| `edges()` | `EdgeSet` | The edge set |
| `hyper_edges()` | `HyperEdgeSet` | The hyperedge set |
| `shape_store()` | `ShapeStore` | The shape store |
| `node_count()` | `int` | Number of nodes |
| `edge_count()` | `int` | Number of edges |
| `hyper_edge_count()` | `int` | Number of hyperedges |
| `clear()` | — | Clear all sets |
| `is_empty()` | `bool` | True if all sets are empty |
| `save_to(path, file, opt)` | — | Save graph to file |
| `load_from(path, file, opt)` | — | Load graph from file |
| `inspect(filepath)` | — | Inspect file metadata |

**Example:**
```python
import phynexis
pm = phynexis.parsim

g = pm.ComputationalGraph()
print(g.is_empty())  # True

ns = g.nodes()
print(type(ns).__name__)  # NodeSet
```

---

## SetBase

Abstract base class for `NodeSet`, `EdgeSet`, `HyperEdgeSet`.

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `ensure_fields()` | — | Ensure all schema fields exist |
| `schema()` | `FieldSchema` | The set's schema |
| `field_manager()` | `FieldManager` | Underlying field manager |
| `set_view(layout)` | — | Bind a `BoundLayout` to this set |
| `count()` / `size()` | `int` | Number of elements |
| `empty()` | `bool` | True if size == 0 |
| `clear()` | — | Remove all elements |
| `emplace()` | `int` | Add a new element (returns ID) |
| `emplace_with_id(id)` | — | Add a new element with given ID |
| `erase(id)` | — | Remove element by ID |
| `allocate_id()` | `int` | Allocate a new unique ID |
| `save_to(path, file, opt)` | — | Save set data |
| `load_from(path, file, opt)` | — | Load set data |
| `inspect(filepath)` | — | Inspect file metadata |

---

## NodeSet

Particle/node storage.

### Constructors

| Signature | Description |
|-----------|-------------|
| `NodeSet()` | Empty node set. |

### Methods

| Method | Description |
|--------|-------------|
| `add_node(id, data)` | Add a node with JSON data |
| `add_nodes(data_list)` | Batch add nodes from list of JSON |
| `remove_node(id)` | Remove node by ID |
| `remove_nodes(ids)` | Batch remove nodes |
| `has_node(id)` | Check if node exists |
| `initialize()` | Initialize internal storage |
| `print_info()` | Print debug info |
| `inspect_fields()` | Inspect field layout |
| `views()` | Return node views |

**Example:**
```python
import phynexis
pm = phynexis.parsim
F = phynexis.fields

ns = pm.NodeSet()

# Bind a schema layout
fm = F.FieldManager()
schema = pm.NodeKinematicsSchema()
layout = pm.BoundLayoutNodeKinematicsSchema.make_bound(fm, schema)
ns.set_view(layout)
ns.initialize()

# Add nodes
ns.add_node(0, {"pos": [0.0, 0.0, 0.0]})
ns.add_node(1, {"pos": [1.0, 0.0, 0.0]})
print(ns.size())  # 2
```

---

## EdgeSet

Pairwise edge/link storage.

### Constructors

| Signature | Description |
|-----------|-------------|
| `EdgeSet()` | Empty edge set. |

### Methods

| Method | Description |
|--------|-------------|
| `initialize()` | Initialize internal storage |
| `print_info()` | Print debug info |
| `views()` | Return edge views |

**Note:** No direct `add_edge` / `remove_edge` methods are exposed. Use `SetBase.emplace()` / `erase()` for bulk operations.

---

## HyperEdgeSet

Many-to-many hyperedge storage.

### Constructors

| Signature | Description |
|-----------|-------------|
| `HyperEdgeSet()` | Empty hyperedge set. |

### Methods

| Method | Description |
|--------|-------------|
| `initialize()` | Initialize internal storage |
| `print_info()` | Print debug info |
| `views()` | Return hyperedge views |

---

## ShapeStore

Stores geometric shapes with stable handles.

### Constructors

| Signature | Description |
|-----------|-------------|
| `ShapeStore()` | Empty store. |

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `insert(shape)` | `int` | Insert shape clone, returns auto-allocated ID |
| `insert_with_id(id, shape)` | `int` | Insert with specified ID |
| `id_at(handle)` | `int` | Get ID from handle (-1 if invalid) |
| `find(id)` | `ShapeStoreHandle` | Find handle by ID |
| `get(handle)` | `ShapeStoreEntry` | Get entry by handle |
| `erase(id)` | — | Erase shape by ID |
| `contains(id)` | `bool` | Check if ID exists |
| `valid(handle)` | `bool` | Check if handle is valid |
| `set_label(id, label)` | — | Set label |
| `set_need_sync(id, need_sync)` | — | Set sync flag |
| `get_label_of(id)` | `str` | Get label |
| `initialize_mpi()` | — | Initialize MPI support |
| `sync()` | — | Sync across MPI ranks |
| `get_shape_ids()` | `list[int]` | All shape IDs |
| `size()` | `int` | Number of shapes |
| `to_json()` | `dict` | Export all shapes as JSON |
| `save_to(path, file, opt)` | — | Save to file |
| `load_from(path, file, opt)` | — | Load from file |
| `inspect(filepath)` | — | Inspect file metadata |

**Example:**
```python
import phynexis
pm = phynexis.parsim
U = phynexis.utils

ss = pm.ShapeStore()
sphere = U.shape.Sphere(0.5)
sid = ss.insert(sphere)
print(sid)  # 0

entry = ss.get(ss.find(sid))
print(entry.label)  # ''

ss.set_label(sid, "particle")
print(ss.get_label_of(sid))  # "particle"
```

### ShapeStoreEntry

Read-only entry returned by `ShapeStore.get()`.

| Attribute | Type | Description |
|-----------|------|-------------|
| `shape` | `Shape` | The stored shape |
| `label` | `str` | User-defined label |
| `need_sync` | `bool` | MPI sync flag |

### ShapeStoreHandle

Lightweight handle with `index` and `epoch` fields.

---

## Views

### NodeViewById / NodeViewByIndex

| Class | Description |
|-------|-------------|
| `NodeViewById` | View nodes by stable ID |
| `NodeViewByIndex` | View nodes by contiguous index |

### EdgeViewById / EdgeViewByIndex

| Class | Description |
|-------|-------------|
| `EdgeViewById` | View edges by stable ID |
| `EdgeViewByIndex` | View edges by contiguous index |

### HyperEdgeViewById / HyperEdgeViewByIndex

| Class | Description |
|-------|-------------|
| `HyperEdgeViewById` | View hyperedges by stable ID |
| `HyperEdgeViewByIndex` | View hyperedges by contiguous index |

### PropertiesView

Generic property accessor view for nodes/edges.

---

## Known Issues

### EdgeSet / HyperEdgeSet lack add/remove convenience methods

Only `initialize()`, `print_info()`, and `views()` are exposed. Use `SetBase.emplace()` / `erase()` for modifications.

**Status**: noted

### ShapeStoreHandle uses `module_local()`

`ShapeStoreHandle` is registered with `pybind11::module_local()` to avoid conflict with `FieldHandle` from `phynexis.fields`. Cross-module type checking (e.g., `isinstance(handle, FieldHandle)`) will not work.

**Status**: noted
