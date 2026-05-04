---
title: "Schemas"
displayed_sidebar: pythonApiSidebar
---

# Schemas

> **Python**: `phynexis.parsim`
> **Headers**: `src/parsim/schema/*.hpp`

Schema definitions for particle node properties. Each schema describes a set of field slots (position, velocity, radius, etc.) that are allocated in a `FieldManager` and bound to a `NodeSet` via a `BoundLayout`.

All schemas inherit from `phynexis.fields.FieldSchema`.


## Schema Types

| Python Class | Description | Slots |
|--------------|-------------|-------|
| `NodeKinematicsSchema` | Position, velocity, acceleration, orientation | `pos`, `vel`, `acc`, `quat` |
| `NodeShapeSchema` | Shape ID and radius | `shape_id`, `radius` |
| `NodeInertiaSchema` | Mass and inertia tensor | `mass`, `inertia` |
| `NodeBoundsSchema` | AABB bounding box | `min_bound`, `max_bound` |
| `NodeNodeLinkSchema` | Node-to-node connectivity | `target`, `link_type` |
| `NodeGridLinkSchema` | Grid-cell linkage | `cell_id`, `grid_level` |
| `NodeDomainLinkSchema` | MPI domain linkage | `domain_id`, `rank` |

### Constructors

All schemas have a default constructor:

```python
schema = pm.NodeKinematicsSchema()
```

### `with_prefix(prefix)` (NodeNodeLinkSchema only)

Returns a copy of the schema with the given slot name prefix. Static method.

```python
schema = pm.NodeNodeLinkSchema.with_prefix("bond_")
```


## BoundLayout

A `BoundLayout` binds a schema to a concrete `FieldManager`, allocating the actual fields.

| Python Class | Schema |
|--------------|--------|
| `BoundLayoutNodeKinematicsSchema` | `NodeKinematicsSchema` |
| `BoundLayoutNodeShapeSchema` | `NodeShapeSchema` |
| `BoundLayoutNodeInertiaSchema` | `NodeInertiaSchema` |
| `BoundLayoutNodeBoundsSchema` | `NodeBoundsSchema` |
| `BoundLayoutNodeNodeLinkSchema` | `NodeNodeLinkSchema` |
| `BoundLayoutNodeGridLinkSchema` | `NodeGridLinkSchema` |
| `BoundLayoutNodeDomainLinkSchema` | `NodeDomainLinkSchema` |
| `BoundLayoutSetSchema` | Generic set schema |

### Factory Methods

#### `make_bound(manager, schema)`

Static factory. Creates a bound layout and allocates fields in the given `FieldManager`.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `manager` | `FieldManager` | Target field manager |
| `schema` | `*Schema` | Schema instance |

**Returns:** `BoundLayout*` (concrete subclass)

**Example:**
```python
import phynexis
pm = phynexis.parsim
F = phynexis.fields

fm = F.FieldManager()
schema = pm.NodeKinematicsSchema()
layout = pm.BoundLayoutNodeKinematicsSchema.make_bound(fm, schema)
print(layout.is_valid())  # True
```

### Instance Methods

| Method | Description |
|--------|-------------|
| `bind(manager)` | (Re-)bind to a different field manager |
| `refresh()` | Refresh field handles from manager |
| `is_valid()` | Returns `True` if all slots are bound |
| `manager()` | Returns the bound `FieldManager` |
| `handles()` | Returns a list of `FieldHandle` objects |
| `fields()` | Returns a list of `FieldBase*` objects |
| `slot_fields(slot)` | Returns fields for a named slot |
| `slot_fields_count(slot)` | Returns number of fields in a slot |
| `slot_fields_offset(slot)` | Returns offset of a slot in the handle list |

**Example:**
```python
# Access fields via the layout
fields = layout.fields()
print(len(fields))

# Access a specific slot
pos_fields = layout.slot_fields("pos")
print(len(pos_fields))
```


## Known Issues

### `fields()` returns `FieldBase*` without RTTI resolution

`layout.fields()` returns a list of `FieldBase*` pointers. The concrete subclass (e.g., `ScalarField`) is not resolved via RTTI in the current binding.

**Workaround:** Use `layout.handles()` to get `FieldHandle` objects, then retrieve fields via `manager.get_field(handle)`.

**Status**: noted
