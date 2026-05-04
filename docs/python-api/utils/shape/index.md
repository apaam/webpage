---
title: "Shape"
displayed_sidebar: pythonApiSidebar
---

# Shape

> **C++**: `phynexis::utils::shape::Shape`
> **Python**: `phynexis.utils.Shape` (alias), `phynexis.utils.shape.Shape`
> **Header**: `src/utils/shape/shape.hpp`

Base class for all geometric shapes in phynexis. Provides common interface for volume, inertia, bounding box, signed distance, surface sampling, and serialization. Subclasses implement specific geometries (sphere, cuboid, ellipsoid, etc.).

---

## Constructor

### `Shape()`

Creates a default shape (sphere-like defaults: size=1.0, volume=0.5236).

---

## Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `tag` | `int` | read-only | Geometry family tag (see Tag enum) |
| `shape_type` | `int` | read-only | Alias for `tag` |
| `features` | `int` | read-only | Capability/feature flags |
| `name` | `str` | read-only | Registered shape name |
| `render_mesh` | `STLModel` | read-only | Surface mesh for rendering |

---

## Methods

### `size()`

Return shape size (diameter of equal-volume sphere).

**Returns:** `float`

### `volume()`

Return the volume of the shape.

**Returns:** `float`

### `inertia()`

Return the inertia tensor.

**Returns:** `Mat3d`

### `inertia_principal()`

Return principal moments of inertia as a Vec3d.

**Returns:** `Vec3d`

### `bound_sphere_radius()`

Return bounding sphere radius for broad-phase contact detection.

**Returns:** `float`

### `bound_aabb()` / `bound_aabb(pos, quat)`

Return axis-aligned bounding box as `(min, max)` tuple.

**Parameters (overloaded):**

| Parameter | Type | Description |
|-----------|------|-------------|
| `pos` | `Vec3d` | Position offset |
| `quat` | `Vec4d` | Quaternion orientation |

**Returns:** `tuple[Vec3d, Vec3d]`

### `is_convex()`

Check if the shape is convex.

**Returns:** `bool`

### `signature()`

Return a stable integer signature for solver lookup and caching.

**Returns:** `int`

### `signed_distance(pos)`

Compute signed distance from a point to the shape surface.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `pos` | `Vec3d` | Query point |

**Returns:** `float`

### `enclose(pos)`

Check if a point is inside the shape.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `pos` | `Vec3d` | Query point |

**Returns:** `bool`

### `support_point(dir)`

Get the support point in a given direction.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `dir` | `Vec3d` | Direction vector |

**Returns:** `Vec3d`

### `surface_projection(pos)`

Find the closest surface point to an intruding node.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `pos` | `Vec3d` | Query point |

**Returns:** `Vec3d`

### `get_stl_model(num_nodes=200)`

Generate an STL model representation of the shape.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `num_nodes` | `int` | 200 | Number of nodes for mesh generation |

**Returns:** `STLModel`

### `update_surface_nodes()` / `update_render_mesh(num_nodes=200)` / `update_shape_properties()`

Refresh internal data (surface nodes, render mesh, cached properties).

### `enable_surface_nodes()` / `disable_surface_nodes()` / `surface_nodes_enabled()`

Toggle and query surface node usage for contact solver.

### `surface_node_num()` / `surface_node_spacing()`

Return surface node count and spacing.

**Returns:** `int` / `float`

### `set_size(d)` / `set_surface_node_num(num)`

Set shape size or surface node count.

### `transpose(pos)`

Translate the shape to a new position.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `pos` | `Vec3d` | New position |

### `clone()`

Create a copy of the shape.

**Returns:** `Shape`

### `check_principal()`

Check if the shape is in principal orientation.

**Returns:** `bool`

### `print_info()`

Print shape properties to console.

### `save_to(path, file, opt=SaveOptions())` / `load_from(path, file, opt=LoadOptions())`

Save/load shape to/from file.

### `to_json()` / `from_json(js)`

Serialize/deserialize shape to/from JSON.

---

## Example

```python
import phynexis

# Create a sphere of size 2.0 (radius 1.0)
s = phynexis.utils.shape.Sphere(2.0)
print("tag:", s.tag, "name:", s.name)
print("size:", s.size(), "volume:", s.volume())
print("inertia:", s.inertia())
print("bound_aabb:", s.bound_aabb())
print("is_convex:", s.is_convex())

# Signed distance and enclosure
print("sd at origin:", s.signed_distance(phynexis.utils.Vec3d(0, 0, 0)))
print("enclose(0,0,0):", s.enclose(phynexis.utils.Vec3d(0, 0, 0)))
print("enclose(2,0,0):", s.enclose(phynexis.utils.Vec3d(2, 0, 0)))

# Support point
print("support:", s.support_point(phynexis.utils.Vec3d(1, 0, 0)))

# Generate STL model
stl = s.get_stl_model(50)
print("stl size:", stl.size())

# Transform
s.transpose(phynexis.utils.Vec3d(1.0, 0.0, 0.0))
print("aabb after translate:", s.bound_aabb())
```

**Output:**
```text
tag: 2 name: sphere
size: 2.0 volume: 4.1887902047863905
inertia: Mat3d([1.67552, 0, 0], [0, 1.67552, 0], [0, 0, 1.67552])
bound_aabb: (Vec3d(-1, -1, -1), Vec3d(1, 1, 1))
is_convex: True
sd at origin: 1.0
enclose(0,0,0): True
enclose(2,0,0): True
support: Vec3d(1, 0, 0)
stl size: 0.18819206523895264
aabb after translate: (Vec3d(0, -1, -1), Vec3d(2, 1, 1))
```

---

## Shape Subclasses

All subclasses inherit from `Shape` and are available under `phynexis.utils.shape`.

### Sphere

```python
s = phynexis.utils.shape.Sphere()      # default size=1.0
s = phynexis.utils.shape.Sphere(2.0)   # size=2.0
```

### Cuboid

```python
c = phynexis.utils.shape.Cuboid()                               # center=(0,0,0), length=(1,1,1)
c = phynexis.utils.shape.Cuboid(center, length)                 # custom center and dimensions
```

| Property | Type | Description |
|----------|------|-------------|
| `center` | `Vec3d` | Center position (read/write) |
| `length` | `Vec3d` | Side lengths in x, y, z (read/write) |

### Ellipsoid

```python
e = phynexis.utils.shape.Ellipsoid()              # default axes (1,1,1)
e = phynexis.utils.shape.Ellipsoid(2.0, 3.0, 4.0) # semi-axes a, b, c
```

| Property | Type | Description |
|----------|------|-------------|
| `axis_a` | `float` | Semi-axis a (read/write) |
| `axis_b` | `float` | Semi-axis b (read/write) |
| `axis_c` | `float` | Semi-axis c (read/write) |

### Cylinder

```python
cy = phynexis.utils.shape.Cylinder()         # default r=0.5, h=1.0
cy = phynexis.utils.shape.Cylinder(1.0, 2.0) # radius=1.0, height=2.0
```

| Property | Type | Description |
|----------|------|-------------|
| `radius` | `float` | Cylinder radius (read/write) |
| `height` | `float` | Cylinder height (read/write) |

### Plane

```python
p = phynexis.utils.shape.Plane()                              # default at origin, normal +z
p = phynexis.utils.shape.Plane(center, normal)                # custom center and normal
p.set_extent(10.0)
p.set_center(phynexis.utils.Vec3d(0, 0, 0))
p.set_normal(phynexis.utils.Vec3d(0, 0, 1))
```

| Property | Type | Description |
|----------|------|-------------|
| `center` | `Vec3d` | Plane center (read/write) |
| `dir_n` | `Vec3d` | Normal direction (read/write) |
| `extent` | `float` | Plane extent (read/write) |

### Triangle

```python
t = phynexis.utils.shape.Triangle()
t = phynexis.utils.shape.Triangle(v0, v1, v2)  # three Vec3d vertices
t.set_vertices(v0, v1, v2)
```

| Property | Type | Description |
|----------|------|-------------|
| `vertices` | `Mat3d` | 3x3 matrix of vertex positions (read/write) |
| `dir_n` | `Vec3d` | Normal direction (read/write) |

### PointSphere

Degenerate sphere representing a point mass (size=1.0, volume=0.5236).

```python
ps = phynexis.utils.shape.PointSphere()
```

### Other Shapes

The following shapes are also exposed but have more specialized APIs:

- `PolySuperEllipsoid` — Super-ellipsoids with polynomial corrections
- `PolySuperQuadrics` — Super-quadric shapes
- `SphericalHarmonics` — Shapes represented by spherical harmonic coefficients
- `TriMesh` — Triangle mesh shape wrapper
- `LevelSet` — Implicit level-set shape
- `Polybezier` — Bezier curve-based shape
- `BoundingBox` — Axis-aligned bounding box shape

---

## Example: Surface nodes and sampling

```python
import phynexis

s = phynexis.utils.shape.Sphere(2.0)
s.enable_surface_nodes()
s.update_surface_nodes()

print("surface_node_num:", s.surface_node_num())
print("surface_nodes_enabled:", s.surface_nodes_enabled())
print("surface_node_spacing:", s.surface_node_spacing())

# Access surface nodes and areas
nodes = s.surface_nodes()
areas = s.surface_node_areas()
print("num nodes:", len(nodes), "num areas:", len(areas))
print("first node:", nodes[0])

# Sample surface points
pts = s.sample_surface_points(5)
print("sampled points:", len(pts))
for p in pts:
    print(" ", p)

# Support points in a direction
supp = s.support_points(phynexis.utils.Vec3d(1.0, 0.0, 0.0))
print("support points:", supp)

# Render mesh
s.update_render_mesh(50)
rm = s.render_mesh
print("render_mesh size:", rm.size())
```

**Output:**
```text
surface_node_num: 1000
surface_nodes_enabled: True
surface_node_spacing: 0.12629780026048754
num nodes: 1000 num areas: 1000
first node: Vec3d(0.0191123, 0.0177418, 0.999641)
sampled points: 5
  Vec3d(0.510644, -0.334648, 0.790675)
  Vec3d(-0.547768, -0.458434, 0.699488)
  Vec3d(0.170926, 0.70943, 0.683829)
  Vec3d(-0.252001, -0.842175, 0.475395)
  Vec3d(-0.93542, -0.101945, 0.338865)
support points: [Vec3d(1, 0, 0)]
render_mesh size: 0.18819206523895264
```

---

## Unexposed C++ API

- `Feature` enum and `FeatureMask` bitflags
- `pack_common` / `pack_specific` / `unpack_common` / `unpack_specific` (internal serialization hooks)
- `vertices_of_aabb` static method
