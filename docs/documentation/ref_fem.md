###

[User manual](user_manual.md)
┊ [Previous](ref_domain.md)
┊ [Next](ref_modifier.md)

-------

### TetMesh

This class represents a tetrahedral mesh.

#### Constructor

##### `TetMesh()`

Creates a new instance of the TetMesh class.

##### `TetMesh(nodes, elements, scale)`

Creates a new instance of the TetMesh class from the given nodes and elements, with the specified scale.

- `nodes` (list of Vec3d): The list of nodes.
- `elements` (list of Vec3i): The list of elements.
- `scale` (float): The scaling factor.

#### Attribution

##### `nodes`

The list of nodes.

##### `elements`

The list of elements.

##### `bound_facets`

The list of boundary facets.

##### `bound_edges`

The list of boundary edges.

##### `bound_nodes`

The list of boundary nodes.

##### `surface_nodes`

The list of surface nodes.

##### `surface_facets`

The list of surface facets.

##### `surface_node_linked_boundaries`

The list of surface node linked boundaries.

#### Methods

##### `GetSurfaceSTL()`

Returns the surface mesh in STL format.

##### `SaveAsVTK(filename)`

Saves the mesh in VTK format to the specified file.

- `filename` (str): The name of the file to save to.

##### `Init()`

Initializes the mesh.

-------

### Membrane

This class represents a membrane in a simulation.

#### Constructor

##### `__init__(radius, height)`

Creates a new instance of the PyMembrane class.

- `radius` (float): The radius of the membrane.
- `height` (float): The height of the membrane.

##### `__init__(radius, height, mesh_size)`

Creates a new instance of the PyMembrane class.

- `radius` (float): The radius of the membrane.
- `height` (float): The height of the membrane.
- `mesh_size` (float): The size of the mesh.

##### `__init__(radius, height, mesh_size, neo_k, neo_mu, density)`

Creates a new instance of the PyMembrane class.

- `radius` (float): The radius of the membrane.
- `height` (float): The height of the membrane.
- `mesh_size` (float): The size of the mesh.
- `neo_k` (float): The Neo-Hookean constant of the membrane.
- `neo_mu` (float): The Neo-Hookean coefficient of the membrane.
- `density` (float): The density of the membrane.

#### Attributes

##### `radius` (float): 

The radius of the membrane.

##### `height` (float): 

The height of the membrane.

##### `mesh_size` (float): 

The size of the mesh.

##### `center` (tuple of floats): 

The center coordinates of the membrane.

- `neo_k` (float): The Neo-Hookean constant of the membrane.
- `neo_mu` (float): The Neo-Hookean coefficient of the membrane.
- `density` (float): The density of the membrane.
- `thickness` (float): The thickness of the membrane.
- `damp_coef` (float): The damping coefficient of the membrane.
- `timestep` (float): The timestep of the membrane.

- `nodes` (list of tuples of floats): The coordinates of the nodes in the membrane.
- `elements` (list of tuples of ints): The connectivity of the elements in the membrane.
- `elemental_stress` (list of tuples of floats): The elemental stress of the membrane.
- `nodal_vols` (list of floats): The nodal volumes of the membrane.
- `nodal_vels` (list of tuples of floats): The nodal velocities of the membrane.
- `bc_facet_pressure` (list of floats): The boundary condition pressure of the membrane.
- `bc_facet_forces` (list of tuples of floats): The boundary condition forces of the membrane.
- `bc_nodal_vels` 
(list of tuples of floats): 

The boundary condition nodal velocities of the membrane.

#### Methods

##### `Remesh()`

Remeshes the membrane.

##### `SetBCNodalVelocity(nodal_vels)`
Sets the boundary condition nodal velocities of the membrane.

- `nodal_vels` (list of tuples of floats): The boundary condition nodal velocities of the membrane.

##### `Init()`

Initializes the membrane.

##### `Solve()`

Solves the membrane.

##### `SaveAsVTK(filename: str)`

Saves the membrane as a VTK file.

- `filename` (str): The filename of the VTK file.

-------

[User manual](user_manual.md)
┊ [Previous](ref_domain.md)
┊ [Next](ref_modifier.md)