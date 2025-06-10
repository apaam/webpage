###

[User manual](user_manual.md)
┊ [Previous](ref_simulation.md)

-----
### LevelSetFunction

This class represents a level set function.

#### Constructor

##### `LevelSetFunction()`

Creates a new instance of the LevelSetFunction class.

#### Attributes

##### `corner`

A vector representing the corner of the level set function.

##### `spacing`

A vector representing the spacing of the level set function.

##### `dim`

An integer representing the dimension of the level set function.

#### Methods

##### `SetCorner(corner)`

Set the corner of the level set function.

- `corner` (vector): A vector representing the corner to set.

##### `SetSpacing(spacing)`

Set the spacing of the level set function.

- `spacing` (vector): A vector representing the spacing to set.

##### `SetDimension(dim)`

Set the dimension of the level set function.

- `dim` (int): An integer representing the dimension to set.

##### `SignedDistance(pos)`

Compute the signed distance at a given position.

- `pos` (vector): A vector representing the position to compute the signed distance.

##### `GradientInterpolate(pos) `

Compute the gradient at a given position using interpolation.

- `pos` (vector): A vector representing the position to compute the gradient.

##### `GradientMinus(pos)`

Compute the gradient at a given position using the minus side.

- `pos` (vector): A vector representing the position to compute the gradient.

##### `GradientPlus(pos)`

Compute the gradient at a given position using the plus side.

- `pos` (vector): A vector representing the position to compute the gradient.

##### `Reinitialization()`

Reinitialize the level set function.

##### `Reinitialization(iterations, cfl)`

Reinitialize the level set function with the given number of iterations and CFL coefficient.

- `iterations` (int): The number of iterations to perform. Default is 1.
- `cfl` (double): The CFL coefficient to use. Default is 0.5.

----- 

### STLReader

This class is used for reading STL files.

#### Constructor

##### `STLReader()`

Creates a new instance of the STLReader class.

#### Methods

##### `ReadFile(filename)`

Reads an STL file and returns the vertices and triangles.

- `filename` (string): The name of the STL file to read.

-----

### STLModel

This class represents a 3D model loaded from an STL file.

#### Constructor

##### `STLModel()`

Creates a new instance of the STLModel class.

##### `STLModel(vertices, facets)`

Creates a new instance of the STLModel class with the specified vertices and facets.

- `vertices` (list): A list of vertices in the model, where each vertex is a 3D vector.
facets (list): A list of facets in the model, where each facet is a tuple of three vertex indices.

#### Attributes

##### `vertices`

A list of vertices in the model, where each vertex is a 3D vector.

##### `facets`

A list of facets in the model, where each facet is a tuple of three vertex indices.

#### Methods

##### `InitFromSTL(file_path)`

Loads an STL file and initializes the model from it.

- `file_path` (string): The path to the STL file.

##### `InitFromOFF(file_path)`

Loads an OFF file and initializes the model from it.

- `file_path` (string): The path to the OFF file.

##### `Translate(translation)`

Translates the model by the specified translation vector.

- `translation` (list): A 3D vector representing the translation.

##### `Rotate(rotation)`

Rotates the model by the specified rotation matrix.

- `rotation` (list): A 3x3 rotation matrix.

##### `CopyPose()`

Creates a copy of the model's current pose.

##### `CopyPoseDev()`

Creates a copy of the model's current pose on the device.

##### `SaveAsVTK(file_path)`

Saves the model as a VTK file.

- `file_path` (string): The path to the output VTK file.

##### `SaveAsSTL(file_path)`

Saves the model as an STL file.

- `file_path` (string): The path to the output STL file.

##### `RemoveUnreferencedVertices()`

Removes any vertices from the model that are not referenced by any facets.

##### `RemoveDuplicateVertices()`

Removes any duplicate vertices from the model.

##### `ReorientFacets()`

Reorients the facets in the model so that their normals point outward.

##### `Decimate(target_num_faces)`

Reduces the number of facets in the model using mesh decimation.

- `target_num_faces` (int): The desired number of facets in the decimated model.

##### `Standardize()`

Standardizes the model by centering it at the origin and scaling it to unit size.

##### `SetSize(size)`

Scales the model to the specified size.

- `size` (float): The desired size of the model.

##### `MakeConvex()`

Converts the model to a convex hull.

##### `SmoothMesh(smoothing_iterations)`

Smooths the mesh by averaging the position of each vertex with the positions of its neighbors.

- `smoothing_iterations` (int): The number of smoothing iterations to perform.

##### `MergeSTLModel(other_model)`

Merges the current model with another STLModel.

- `other_model` (STLModel): The model to merge with.

##### `GetTriangleStrips()`

Returns the model as a list of triangle strips.

##### `IsFaceOutside(facet_index, point)`

Checks whether a given point is outside the face with the specified index.

- `facet_index` (int): The index of the face to check.
- `point` (list): A 3D vector representing the point to check.

##### `IsConvex()`

Checks whether the model is convex.

-----

### WSCVTSampler

This class represents a sampler using the weighted stochastic collocation (WSC) method with the variable transformation technique (VTT).

#### Constructor

##### `WSCVTSampler(max_iters=1000, tol=1e-6)`

Creates a new instance of the WSCVTSampler class.

- `max_iters` (int, optional): The maximum number of iterations for the optimization algorithm. Default is 1000.
- `tol` (float, optional): The tolerance for the optimization algorithm. Default is 1e-6.

#### Attributes

##### `max_iters`

The maximum number of iterations for the optimization algorithm.

##### `tol`

The tolerance for the optimization algorithm.

Methods

##### `GetInstance()`

Returns a singleton instance of the WSCVTSampler class.

##### `Get(num_samples, new_random=False)`

Generates a set of samples using the WSC method with VTT.

- `num_samples` (int): The number of samples to generate.
- `new_random` (bool, optional): If True, generate a new set of random numbers. Default is False.

-----

### Voronoi

This class represents a Voronoi object.

#### Methods

##### `Solve(points, stl_model, bool_val)`

Computes Voronoi tessellation given a set of points and an STLModel.

- `points` (VecXT<Vec3d>): A vector of Vec3d points.
- `stl_model` (STLModel): An instance of the STLModel.
- `bool_val` (bool): A boolean value.

##### `Solve(stl_model, int_val1, int_val2, double_val, bool_val)`

Computes Voronoi tessellation given an STLModel, and specified parameters.

- `stl_model` (STLModel): An instance of the STLModel.
- `int_val1` (int): An integer value.
- `int_val2` (int): An integer value.
- `double_val` (double): A double value.
- `bool_val` (bool): A boolean value.

##### `SaveAsVTK()`

Saves the Voronoi tessellation as a VTK file.

-----

### Cork

This class provides methods for boolean operations on triangle meshes.

#### Constructor

##### `Cork()`

Creates a new instance of the Cork class.

#### Methods

##### `MeshIntersect(vertices1, triangles1, vertices2, triangles2, vertices_out=None, triangles_out=None, labels_out=None)`

Computes the intersection between two triangle meshes.

- `vertices1` (VecXT<Vec3d>): A vector of vertices defining the first mesh.
- `triangles1` (VecXT<Vec3i>): A vector of triangles defining the first mesh.
- `vertices2` (VecXT<Vec3d>): A vector of vertices defining the second mesh.
- `triangles2` (VecXT<Vec3i>): A vector of triangles defining the second mesh.
- `vertices_out` (VecXT<Vec3d>, optional): A vector to store the output vertices. If not provided, a new vector will be created.
- `triangles_out` (VecXT<Vec3i>, optional): A vector to store the output triangles. If not provided, a new vector will be created.
- `labels_out` (VecXT<int>, optional): A vector to store the output labels. If not provided, a new vector will be created.

##### `MeshUnion(vertices1, triangles1, vertices2, triangles2, vertices_out=None, triangles_out=None, labels_out=None)`

Computes the union of two triangle meshes.

- `vertices1` (VecXT<Vec3d>): A vector of vertices defining the first mesh.
- `triangles1` (VecXT<Vec3i>): A vector of triangles defining the first mesh.
- `vertices2` (VecXT<Vec3d>): A vector of vertices defining the second mesh.
- `triangles2` (VecXT<Vec3i>): A vector of triangles defining the second mesh.
- `vertices_out` (VecXT<Vec3d>, optional): A vector to store the output vertices. If not provided, a new vector will be created.
- `triangles_out` (VecXT<Vec3i>, optional): A vector to store the output triangles. If not provided, a new vector will be created.
- `labels_out` (VecXT<int>, optional): A vector to store the output labels. If not provided, a new vector will be created.

##### `MeshDifference(vertices1, triangles1, vertices2, triangles2, vertices_out=None, triangles_out=None, labels_out=None)`

Computes the difference between two triangle meshes.

- `vertices1` (VecXT<Vec3d>): A vector of vertices defining the first mesh.
- `triangles1` (VecXT<Vec3i>): A vector of triangles defining the first mesh.
- `vertices2` (VecXT<Vec3d>): A vector of vertices defining the second mesh.
- `triangles2` (VecXT<Vec3i>): A vector of triangles defining the second mesh.
- `vertices_out` (VecXT<Vec3d>, optional): A vector to store the output vertices. If not provided, a new vector will be created.
- `triangles_out` (VecXT<Vec3i>, optional): A vector to store the output triangles. If not provided, a new vector will be created.
- `labels_out` (VecXT<int>, optional): A vector to store the output labels. If not provided

-----

### OpenMP

This module provides bindings for `OpenMP`, a specification for parallel programming in C++.

#### Functions

`omp_get_max_threads() -> int`

Returns the maximum number of threads that can be used in parallel sections.

`omp_set_num_threads(num_threads: int) -> None`

Sets the number of threads to be used in parallel sections.

- `num_threads (int)`: The number of threads to be used.

--------

[User manual](user_manual.md)
┊ [Previous](ref_simulation.md)
