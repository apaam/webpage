###

[User manual](user_manual.md)
┊ [Previous](ref_scene.md)
┊ [Next](ref_simulation.md)

-------

### Shape

This class represents a shape.

#### Constructor

##### `Shape()`

Creates a new instance of the Shape class.

#### Attributes

##### `id`

An integer ID for the shape.

##### `label`

A string label for the shape.

##### `shape_type`

An enumeration representing the type of the shape.

##### `shape_name`

A string name for the shape.

##### `size`

A Vec3d vector representing the size of the shape.

##### `volume`

A double representing the volume of the shape.

##### `inertia`

A Vec3d vector representing the inertia tensor of the shape.

##### `bound_sphere_radius`

A double representing the radius of the bounding sphere of the shape.

##### `skin`

A bool indicating whether the shape has a skin.

##### `skin_factor`

A double representing the skin factor of the shape.

##### `bound_aabb_min`

A Vec3d vector representing the minimum corner of the axis-aligned bounding box of the shape.

##### `bound_aabb_max`

A Vec3d vector representing the maximum corner of the axis-aligned bounding box of the shape.

##### `use_node`

A bool indicating whether the shape uses a node.

##### `node_num`

An integer representing the number of nodes used by the shape.

##### `node_spacing`

A double representing the spacing between nodes of the shape.

##### `nodes`

A vector of Vec3d vectors representing the nodes of the shape.

##### `is_convex`

A bool indicating whether the shape is convex.

##### `use_customized_solver`

A bool indicating whether the shape uses a customized solver.

#### Methods

##### `PackJson()`

Pack the shape data into a JSON object.

##### `InitFromJson(json_data)`

Initialize the shape from a JSON object.

- `json_data` (JSON object): A JSON object containing the data to initialize the shape.

##### `InitFromJsonFile(json_file)`

Initialize the shape from a JSON file.

- `json_file` (string): The path of the JSON file to load.

##### `UpdateNodes()`

Update the nodes of the shape.

##### `UpdateShapeProperties()`

Update the properties of the shape.

##### `SetSize(size)`

Set the size of the shape.

- `size` (Vec3d): The new size of the shape.

##### `Clone()`

Create a new instance of the shape that is a copy of the current shape.

##### `GetSTLModel()`

Get the STL model of the shape.

##### `SaveAsVTK(filename)`

Save the shape as a VTK file.

- `filename` (string): The path of the file to save.

##### `SaveAsSTL(filename)`

Save the shape as an STL file.

- `filename` (string): The path of the file to save.

##### `GetBoundAABB()`

Get the axis-aligned bounding box of the shape.

##### `SignedDistance(point)`

Compute the signed distance between a point and the surface of the shape.

- `point` (Vec3d): The point to compute the signed distance from.

##### `SurfacePoint(point)`

Find the surface point of the shape closest to a given point.

- `point` (Vec3d): The point to find the closest surface point to.

##### `Enclose(shapes)`

Create a new shape that encloses a set of shapes.

- `shapes` (vector of Shape objects): The set of shapes to enclose.

##### `Print()`

Print the properties of the shape to the console.

------

### Sphere

Represents a sphere.

#### Constructor

##### `Sphere()`

Creates a new instance of the Sphere class.

##### `Sphere(radius: float)`

Creates a new instance of the Sphere class with the given radius.

- `radius` (float): The radius of the sphere.

------

### PointSphere

Represents a point sphere.

#### Constructor

##### `PointSphere()`

Creates a new instance of the PointSphere class.

##### `PointSphere(radius: float)`

Creates a new instance of the PointSphere class with the given radius.

- `radius` (float): The radius of the point sphere.

------

### Plane

Represents a plane.

#### Constructor

##### `Plane()`

Creates a new instance of the Plane class.

##### `Plane(center: Vec3d, dir_n: Vec3d, extent: float)`

Creates a new instance of the Plane class with the given center, normal vector, and extent.

- `center` (Vec3d): The center point of the plane.
- `dir_n` (Vec3d): The normal vector of the plane.
- `extent` (float): The extent of the plane.

Attributes

##### `center`

The center point of the plane.

##### `dir_n`

The normal vector of the plane.

##### `extent`

The extent of the plane.

Methods

##### `SetExtent(extent: float)`

Sets the extent of the plane.

- `extent` (float): The extent to set for the plane.

##### `SetCenter(center: Vec3d)`

Sets the center point of the plane.

- `center` (Vec3d): The center point to set for the plane.

##### `SetNormal(dir_n: Vec3d)`

Sets the normal vector of the plane.

- `dir_n` (Vec3d): The normal vector to set for the plane.

------

### Triangle

Represents a triangle.

#### Constructor

##### `Triangle()`

Creates a new instance of the Triangle class.

##### `Triangle(v1: Vec3d, v2: Vec3d, v3: Vec3d)`

Creates a new instance of the Triangle class with the given vertices.

- `v1` (Vec3d): The first vertex of the triangle.
- `v2` (Vec3d): The second vertex of the triangle.
- `v3` (Vec3d): The third vertex of the triangle.

#### Attributes

##### `vertices`

The vertices of the triangle.

##### `dir_n`

The normal vector of the triangle.

#### Methods

##### `SetVertices(v1: Vec3d, v2: Vec3d, v3: Vec3d)`

Sets the vertices of the triangle.

- `v1` (Vec3d): The first vertex of the triangle.
- `v2` (Vec3d): The second vertex of the triangle.
- `v3` (Vec3d): The third vertex of the triangle.


------

### Cylinder
This class represents a cylinder.

#### Constructor

##### `Cylinder()`

Creates a new instance of the Cylinder class with default values.

##### `Cylinder(radius, height)` 

Creates a new instance of the Cylinder class with the given radius and height values.

#### Attributes

##### `radius`

The radius of the cylinder.

##### `height`

The height of the cylinder.

#### Methods

##### `Init()`

Initializes the cylinder with default values.

##### `Init(radius, height)`

Initializes the cylinder with the given radius and height values.

------

### Ellipsoid

This class represents an ellipsoid.

#### Constructor

##### `Ellipsoid()`

Creates a new instance of the Ellipsoid class with default values.

##### `Ellipsoid(axis_a, axis_b, axis_c)` 

Creates a new instance of the Ellipsoid class with the given axis_a, axis_b, and axis_c values.

#### Attributes

##### `axis_a`

The length of the semi-axis along the x-axis.

##### `axis_b`

The length of the semi-axis along the y-axis.

##### `axis_c`

The length of the semi-axis along the z-axis.

#### Methods

##### `Init()`

Initializes the ellipsoid with default values.

##### `Init(axis_a, axis_b, axis_c)`

Initializes the ellipsoid with the given axis_a, axis_b, and axis_c values.

------

### SphericalHarmonics

This class represents a spherical harmonics shape.

#### Constructor

##### `SphericalHarmonics()`

Creates a new instance of the SphericalHarmonics class with default values.

##### `SphericalHarmonics(degree)`

Creates a new instance of the SphericalHarmonics class with the given degree value.

#### Attributes

##### `degree`

The degree of the spherical harmonics shape.

##### `a_nm`

The coefficients of the spherical harmonics shape.

#### Methods

##### `Init()`

Initializes the spherical harmonics shape with default values.

##### `Init(degree)`

Initializes the spherical harmonics shape with the given degree value.

##### `InitFromSTL(file_path)`

Initializes the spherical harmonics shape from an STL file located at file_path.

##### `InitFromSTL(stl_model)`

Initializes the spherical harmonics shape from an STLModel object stl_model.

------

### PolySuperEllipsoid

This class represents a poly super ellipsoid shape.

#### Constructor

##### `PolySuperEllipsoid()`

Creates a new instance of the PolySuperEllipsoid class.

#### Attributes

##### `axis_a`

The axis a value of the poly super ellipsoid.

##### `axis_b`

The axis b value of the poly super ellipsoid.

##### `axis_c`

The axis c value of the poly super ellipsoid.

##### `order_ab`

The order ab value of the poly super ellipsoid.

##### `order_c`

The order c value of the poly super ellipsoid.

#### Methods

##### `Init(axis_a, axis_b, axis_c, order_ab, order_c)`

Initializes the poly super ellipsoid with the given parameters.

- `axis_a` (float): The axis a value to set.
- `axis_b` (float): The axis b value to set.
- `axis_c` (float): The axis c value to set.
- `order_ab` (float): The order ab value to set.
- `order_c` (float): The order c value to set.

------

### PolySuperQuadrics

This class represents a poly superquadric shape.

#### Constructor

##### `PolySuperQuadrics` 
(axis_a=1, axis_b=1, axis_c=1, order_a=2, order_b=2, order_c=2, x=0, y=0, z=0, qx=0, qy=0, qz=0)

Creates a new instance of the PolySuperQuadrics class.

- `axis_a` (float, optional): The scaling factor for the x axis. Default is 1.
- `axis_b` (float, optional): The scaling factor for the y axis. Default is 1.
- `axis_c` (float, optional): The scaling factor for the z axis. Default is 1.
- `order_a` (float, optional): The order of the polynomial for the x axis. Default is 2.
- `order_b` (float, optional): The order of the polynomial for the y axis. Default is 2.
- `order_c` (float, optional): The order of the polynomial for the z axis. Default is 2.
- `x` (float, optional): The x-coordinate of the position. Default is 0.
- `y` (float, optional): The y-coordinate of the position. Default is 0.
- `z` (float, optional): The z-coordinate of the position. Default is 0.
- `qx` (float, optional): The x-component of the rotation quaternion. Default is 0.
- `qy` (float, optional): The y-component of the rotation quaternion. Default is 0.
- `qz` (float, optional): The z-component of the rotation quaternion. Default is 0.

#### Attributes

##### `axis_a`

The scaling factor for the x axis.

##### `axis_b`

The scaling factor for the y axis.

##### `axis_c`

The scaling factor for the z axis.

##### `order_a`

The order of the polynomial for the x axis.

##### `order_b`

The order of the polynomial for the y axis.

##### `order_c`

The order of the polynomial for the z axis.

#### Methods

##### `Init()`

Initialize the poly superquadric shape.

##### `InitFromJSON(json_data)`

Initialize the poly superquadric shape from a JSON object.

- `json_data` (JSON object): A JSON object containing the parameters to set.

##### `Init(axis_a, axis_b, axis_c, order_a, order_b, order_c)`

Initialize the poly superquadric shape.

- `axis_a` (float): The scaling factor for the x axis.
- `axis_b` (float): The scaling factor for the y axis.
- `axis_c` (float): The scaling factor for the z axis.
- `order_a` (float): The order of the polynomial for the x axis.
- `order_b` (float): The order of the polynomial for the y axis.
- `order_c` (float): The order of the polynomial for the z axis.

------

### LevelSet

This class represents a level set.

#### Constructor

##### `LevelSet()`

Creates a new instance of the LevelSet class.

#### Methods

##### `InitFromSTL(stl_file, sign)`

Initialize the level set from an STL file.

- `stl_file` (string): The name of the STL file.
- `sign` (int): The sign of the level set.

##### `InitFromSTL(stl_model, sign)`

Initialize the level set from an STL model.

- `stl_model` (STLModel): The STL model.
- `sign` (int): The sign of the level set.

##### `InitFromDistanceMap(distance_map)`

Initialize the level set from a distance map.

- `distance_map` : The distance map.

##### `SurfacePoint(point)`

Get the surface point of the level set.

- `point` (Vector3d): The point.

##### `AlignAxes()`

Align the axes of the level set.

------

### TriMesh

This class represents a triangular mesh.

#### Constructor

##### `TriMesh()`

Creates a new instance of the TriMesh class.

#### Attributes

##### `vertices`

A list of vertices that make up the mesh.

##### `facets`

A list of facets that make up the mesh.

#### Methods

##### `Init()`

Initialize the triangular mesh.

##### `InitFromSTL(file_name)`

Initialize the triangular mesh from an STL file.

- `file_name` (string): The name of the STL file.

##### `InitFromOFF(file_name)`

Initialize the triangular mesh from an OFF file.

- `file_name` (string): The name of the OFF file.

##### `Decimate(num_faces)`

Decimate the mesh to reduce the number of faces.

- `num_faces` (int): The target number of faces for the decimated mesh.

##### `MakeConvex()`

Make the mesh convex.

##### `AlignAxes()`

Align the axes of the mesh.

------

### InitPyShapeModule

This function initializes a Python module with various shape classes and functions. The following functions are called to add their respective classes to the module:

#### `InitPyShape`
#### `InitPySphere`
#### `InitPyPointSphere`
#### `InitPyPlane`
#### `InitPyTriangle`
#### `InitPyCylinder`
#### `InitPyEllipsoid`
#### `InitPySphericalHarmonics`
#### `InitPyPolySuperEllipsoid`
#### `InitPyPolySuperQuadrics`
#### `InitPyLevelSet`
#### `InitPyTriMesh`


-------

[User manual](user_manual.md)
┊ [Previous](ref_scene.md)
┊ [Next](ref_simulation.md)