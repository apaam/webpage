###

[User manual](user_manual.md)
┊ [Previous](ref_netdem.md)
┊ [Next](ref_scene.md)

-------

### Peridigm

### DomainSplittor

This class represents a domain splittor.

#### Constructor

##### `DomainSplittor()`

Creates a new instance of the DomainSplittor class.

#### Methods

##### `InitFromSTL(filename, num_parts)`

Initializes the domain splittor from an STL file.

- `filename` (string): The name of the STL file to read.
- `num_parts` (int): The number of parts to split the domain into.

-------

### LevelSetSplittor

This class represents a level set splittor, which is a type of domain splittor.

#### Constructor

##### `LevelSetSplittor()`

Creates a new instance of the LevelSetSplittor class.

#### Methods

##### `InitFromDistanceMap(filename)`

Initializes the level set splittor from a distance map file.

- `filename` (string): The name of the distance map file to read.

##### `InitFromDistanceMap (x_min, x_max, y_min, y_max, z_min, z_max, num_parts, distance_map)`

Initializes the level set splittor from a distance map.

- `x_min` (double): The minimum x coordinate of the domain.
- `x_max` (double): The maximum x coordinate of the domain.
- `y_min` (double): The minimum y coordinate of the domain.
- `y_max` (double): The maximum y coordinate of the domain.
- `z_min` (double): The minimum z coordinate of the domain.
- `z_max` (double): The maximum z coordinate of the domain.
- `num_parts` (int): The number of parts to split the domain into.
- `distance_map` (VecXT<double>): A vector containing the distance map data.

##### `InitFromSTL(stl_model, num_parts)`

Initializes the level set splittor from an STL model.

- `stl_model` (STLModel): The STL model to initialize from.
- `num_parts` (int): The number of parts to split the domain into.

##### `GetPeriDigmNodes()`

Returns the Peridigm node data for the domain.

##### `MakePorosity(radius)`

Adds porosity to the domain.

- `radius` (double): The radius of the porosity.

##### `GetSTLModel()`

Returns the STL model for the domain.

##### `GetSTLModel(part_ids)`

Returns the STL model for a specific set of domain parts.

- `part_ids` (VecXT<int>): A vector containing the IDs of the domain parts to include in the model.

--------

### TetMeshSplittor

This class represents a tetrahedral mesh splittor.

#### Constructor

##### `TetMeshSplittor()`

Creates a new instance of the TetMeshSplittor class.

#### Methods

##### `InitFromSTL(stl_model, num_partitions)`

Initialize the tetrahedral mesh splittor from an STL model.

- `stl_model` (STLModel): The STL model to use for initialization.
- `num_partitions` (int): The number of partitions to split the mesh into.

##### `GetPeriDigmNodes()`

Get the Peridigm nodes.

##### `MakePorosity()`

Make porosity in the mesh.

##### `GetSTLModel()`

Get the STL model.

Returns a VecXT<int> object representing the STL model.

##### `GetSTLModel(node_id)

Get the STL model.

- `node_id` (VecXT<int>): The node ID to get the STL model for.

Returns a VecXT<int> object representing the STL model for the specified node ID.

--------

### PeriDigmDiscretization

This class represents a discretization of a PeriDigm model.

#### Constructor

##### `PeriDigmDiscretization()`

Creates a new instance of the PeriDigmDiscretization class.

#### Attributes

##### `type`

An enumeration that specifies the type of the discretization. Possible values are:

##### `level_set`

a level set discretization

##### `tetmesh`

a tetrahedral mesh discretization

##### `domain_splittor`

The domain splittor used to split the domain into blocks.

##### `nodes`

The nodes of the discretization.

##### `node_block_indices`

The block indices of the nodes.

##### `node_vols`

The volumes of the nodes.

#### Methods

##### `InitFromSTL(stl_file_path, num_partitions)`

Initialize the discretization from an STL file.

- `stl_file_path` (string): The path to the STL file.
- `num_partitions` (int): The number of partitions to split the domain into.

##### `InitFromSTL(stl_model, num_partitions)`

Initialize the discretization from an STL model.

- `stl_model` (STLModel): The STL model to use.
- `num_partitions` (int): The number of partitions to split the domain into.

##### `InitFromDistanceMap(distance_map_file_path, num_partitions)`

Initialize the discretization from a distance map file.

- `distance_map_file_path` (string): The path to the distance map file.
- `num_partitions` (int): The number of partitions to split the domain into.

##### `InitFromGrid(grid_file_path, num_partitions)`

Initialize the discretization from a grid file.

- `grid_file_path` (string): The path to the grid file.
- `num_partitions` (int): The number of partitions to split the domain into.

##### `MakePorosity(porosity)`

Add porosity to the discretization.

- `porosity` (float): The porosity to add.

##### `WriteInputFile(node_file_path)`

Write the input file of the discretization.

- `node_file_path` (string): The path to write the node file.

##### `GetNodeSize()`

Get the size of the nodes in the discretization.

--------

### PeriDigmDiscretization

This class represents a PeriDigm discretization.

#### Constructor

##### `PeriDigmDiscretization()`

Creates a new instance of the PeriDigmDiscretization class.

#### Enum

##### `Type`

An enum class for different types of PeriDigm discretization. 
The available values are:

- `level_set`
- `tetmesh`

#### Attributes

##### `type`

A Type value representing the type of PeriDigm discretization.

##### `domain_splittor`

The domain splitter for the PeriDigm discretization.

##### `nodes`

A vector of Node objects representing the nodes of the PeriDigm discretization.

##### `node_block_indices`

A vector of int values representing the block indices of the nodes.

##### `node_vols`

A vector of double values representing the volumes of the nodes.

#### Methods

##### `InitFromSTL(filename, numBlocks)`

Initialize the PeriDigm discretization from an STL file.

- `filename` (string): The filename of the STL file to load.
- `numBlocks` (int): The number of blocks to create.

##### `InitFromSTL(stl_model, numBlocks)`

Initialize the PeriDigm discretization from an STL model.

- `stl_model` (STLModel): The STL model to use for initialization.
- `numBlocks` (int): The number of blocks to create.

##### `InitFromDistanceMap(distanceMap, numBlocks)`

Initialize the PeriDigm discretization from a distance map.

- `distanceMap` (DistanceMap): The distance map to use for initialization.
- `numBlocks` (int): The number of blocks to create.

##### `InitFromGrid(grid, numBlocks)`

Initialize the PeriDigm discretization from a grid.

- `grid` (Grid): The grid to use for initialization.
- `numBlocks` (int): The number of blocks to create.

##### `MakePorosity(porosity)`

Set the porosity of the PeriDigm discretization.

- `porosity` (double): The porosity to set.

##### `WriteInputFile(filename)`

Write the PeriDigm discretization to a file.

- `filename` (string): The filename to write to.

##### `GetNodeSize()`

Return the size of the nodes in the PeriDigm discretization.

--------

### PeriDigmMaterial

This class represents a material model in PeriDigm.

#### Constructor

##### `PeriDigmMaterial()`

Creates a new instance of the PeriDigmMaterial class.

#### Attributes

##### `type`

An enum value that represents the type of material. The possible values are:

- `Elastic`

##### `density`

The density of the material.

##### `youngs_modulus`

The Young's modulus of the material.

##### `poissons_ratio`

The Poisson's ratio of the material.

#### Methods

##### `WriteInputFile(filename)`

Writes the material properties to an input file.

- `filename` (string): The name of the file to write to.

--------

### PeriDigmDamageModel

This class represents a damage model in the PeriDigm library.

#### Constructor

##### `PeriDigmDamageModel()`

Creates a new instance of the PeriDigmDamageModel class.

#### Attributes

##### `type`

A string representing the type of the damage model.

##### `critical_stretch`

A double representing the critical stretch for the damage model.

#### Methods

##### `InitFromEnergyReleaseRate(energy_release_rate)`

Initializes the damage model based on the energy release rate.

- `energy_release_rate` (double): The energy release rate.

##### `GetStretchFromEnergyReleaseRate(energy_release_rate)`

Returns the stretch based on the energy release rate.

- `energy_release_rate` (double): The energy release rate.

##### `WriteInputFile(file_name)`

Writes the input file for the damage model.

- `file_name` (string): The name of the input file to write.

--------

### PeriDigmBlock

This class represents a block in a PeriDigm simulation.

#### Constructor

##### `PeriDigmBlock()`

Creates a new instance of the PeriDigmBlock class.

#### Attributes

##### `node_indices`

A list of the node indices that make up the block.

##### `material_id`

An integer ID for the material that the block is composed of.

##### `damage_model_id`

An integer ID for the damage model used to simulate damage in the block.

##### `horizon`

The horizon used in the simulation.

#### Methods

##### `WriteInputFile(file_name)`

Writes the block information to an input file.

- `file_name` (string): The name of the file to write to.

---------

### PeriDigmBoundaryCondition

This class represents a boundary condition in the PeriDigm code.

#### Constructor

##### `PeriDigmBoundaryCondition()`

Creates a new instance of the PeriDigmBoundaryCondition class.

#### Attributes

##### `type`

An enum that specifies the type of boundary condition. The possible values are:

##### `Prescribed_Displacement`

The boundary condition is specified by a prescribed displacement.

##### `Body_Force`

The boundary condition is specified by a body force.

##### `node_indices`

A list of integers that specify the indices of the nodes that the boundary condition applies to.

##### `dim_activated`

A list of integers that specify the dimensions that the boundary condition is activated in. The possible values are 0, 1, and 2, which correspond to the x, y, and z directions, respectively.

##### `disp_rate`

A float that specifies the rate of displacement for the boundary condition.

##### `loading_rate`

A float that specifies the rate of loading for the boundary condition.

##### `disp`

A float that specifies the displacement for the boundary condition.

##### `loading`

A float that specifies the loading for the boundary condition.

##### `mech_time`

A float that specifies the mechanical time for the boundary condition.

#### Methods

##### `InsertNode(node_index)`

Insert a node into the list of nodes that the boundary condition applies to.

- `node_index` (int): The index of the node to insert.

##### `SetActivatedDimensions(dimensions)`

Set the dimensions that the boundary condition is activated in.

- `dimensions` (list of int): A list of integers that specify the dimensions that the boundary condition is activated in.

##### `SetByDisplacementRate(rate)`

Set the boundary condition by a prescribed displacement rate.

- `rate` (float): The rate of displacement to use.

##### `SetByLoadingRate(rate)`

Set the boundary condition by a prescribed loading rate.

- `rate` (float): The rate of loading to use.

##### `SetByUltimateDisplacement(displacement)`

Set the boundary condition by a prescribed ultimate displacement.

- `displacement` (float): The ultimate displacement to use.

##### `SetByUltimateLoading(loading)`

Set the boundary condition by a prescribed ultimate loading.

- `loading` (float): The ultimate loading to use.

##### `WriteInputFile(filename)`

Write the boundary condition to an input file.

- `filename` (string): The name of the file to write to.

----------

### PeriDigmSettings

This class represents the settings for the PeriDigm code.

#### Constructor

##### `PeriDigmSettings()`

Creates a new instance of the PeriDigmSettings class.

#### Attributes

##### `result_dir`

A string representing the directory where the simulation results are stored.

##### `peridigm_exe`

A string representing the path to the PeriDigm executable.

##### `horizon_factor`

A float representing the factor used to determine the horizon for each particle.

##### `use_auto_timestep`

A boolean indicating whether to use an automatic time step or not.

##### `timestep`

A float representing the time step size to be used.

##### `timestep_factor`

A float representing the factor used to determine the time step size for each particle.

##### `mech_time`

A float representing the total mechanical time of the simulation.

##### `loading_radius_factor`

A float representing the factor used to determine the loading radius for each particle.

##### `constrain_radius_factor`

A float representing the factor used to determine the constrain radius for each particle.

##### `output_freqency`

An integer representing the frequency of output data.

#### Methods

##### `WriteInputFile(input_file_path)`

Writes the input file for the PeriDigm code.

- `input_file_path` (string): The path to the input file to write.

----------

### DEMFragment

This class represents a discrete element method (DEM) fragment.

#### Constructor

##### `DEMFragment()`

Creates a new instance of the DEMFragment class.

#### Attributes

##### `shape_type`

An integer that represents the shape type of the fragment.

##### `sphere_size`

A float that represents the sphere size of the fragment.

##### `stl_model`

A STLModel object that represents the STL model of the fragment.

##### `vel`

A Vec3d object that represents the velocity of the fragment.

##### `spin`

A Vec3d object that represents the spin of the fragment.

#### Methods

InitLevelSet(level_set)

Applies a boundary force to the fragment based on the given level set.

- `level_set` (LevelSet): A level set that represents the boundary.

##### `ResolverOverlap(other_frag)`

Resolves the overlap between this fragment and another fragment.

- `other_frag` (DEMFragment): The other fragment to resolve the overlap with.

##### `ReInitSTLModel()`

Re-initializes the STL model of the fragment.

--------

### ParticleStrengthParameters

This class represents the strength parameters of a particle.

#### Constructor

##### `ParticleStrengthParameters()`

Creates a new instance of the ParticleStrengthParameters class.

#### Attributes

##### `ref_size`

The reference size of the particle.

##### `ref_energy_release_rate`

The reference energy release rate of the particle.

##### `weibull_modulus`

The Weibull modulus of the particle.

##### `weibull_coef_a`

The Weibull coefficient A of the particle.

##### `weibull_coef_b`

The Weibull coefficient B of the particle.

##### `min_breakable_size`

The minimum breakable size of the particle.

#### Methods

##### `GetEnergyReleaseRate(size)`

Calculates the energy release rate of the particle for a given size.

- `size` (float): The size of the particle.

##### `GetEnergyReleaseRate(size, strength)`

Calculates the energy release rate of the particle for a given size and strength.

- `size` (float): The size of the particle.
- `strength` (float): The strength of the particle.

--------

### PeriDigmSimulator

This class represents a PeriDigm simulator.

#### Constructor

##### `PeriDigmSimulator()`

Creates a new instance of the PeriDigmSimulator class.

#### Attributes

##### `discretization`

The discretization used in the simulation.

##### `materials`

The materials used in the simulation.

##### `damage_models`

The damage models used in the simulation.

##### `blocks`

The blocks used in the simulation.

##### `boundary_conditions`

The boundary conditions used in the simulation.

##### `settings`

The settings used in the simulation.

#### Methods

##### `Clear()`

Clears all data associated with the simulator.

##### `InsertMaterial(material)`

Inserts a material into the simulator.

- `material` (Material): The material to insert.

##### `InsertDamageModel(damage_model)`

Inserts a damage model into the simulator.

- `damage_model` (DamageModel): The damage model to insert.

##### `InsertBlock(block)`

Inserts a block into the simulator.

- `block` (Block): The block to insert.

##### `InsertBoundaryCondition(boundary_condition)`

Inserts a boundary condition into the simulator.

- `boundary_condition` (BoundaryCondition): The boundary condition to insert.

##### `InitDefaultSetup()`

Initializes the simulator with default settings.

##### `InitAutoTimestep()`

Initializes the simulator with automatic timestep settings.

##### `WriteNodeFile()`

Writes the node file for the simulator.

##### `WriteNodeSetFile()`

Writes the node set file for the simulator.

##### `WriteInputFile()`

Writes the input file for the simulator.

##### `Solve()`

Runs the simulation.

##### `SetUpResultDirectory()`

Sets up the result directory for the simulation.

##### `CleanUpResultDirectory()`

Cleans up the result directory for the simulation.

--------

### PeriDigmDEMCoupler

This class represents a coupler between the Peridynamics and DEM models.

#### Constructor

##### `PeriDigmDEMCoupler()`

Creates a new instance of the PeriDigmDEMCoupler class.

#### Attributes

##### `particle`

The Peridynamics particle system.

##### `pd_sim`

The Peridynamics simulation.

##### `base_dir`

The base directory for output files.

##### `sub_dir_index`

The sub-directory index for output files.

##### `mesh_res`

The resolution of the DEM mesh.

##### `node_size_ave`

The average size of the DEM mesh nodes.

##### `mech_time`

The mechanical time step size.

##### `surface_stl`

The path to the STL file representing the surface of the simulation domain.

##### `boundary_force_nodes`

The nodes on the boundary where forces are applied.

##### `boundary_force_node_vols`

The volumes associated with the boundary force nodes.

##### `boundary_force_values`

The values of the boundary forces.

##### `unbalanced_force_nodes`

The nodes where unbalanced forces are applied.

##### `unbalanced_force_values`

The values of the unbalanced forces.

##### `use_customized_loading_rate`

A flag indicating whether to use a customized loading rate.

##### `loading_rate`

The loading rate.

##### `loading_steps`

The number of loading steps.

##### `is_broken`

A flag indicating whether the material is broken.

##### `damage_fraction_limit`

The damage fraction limit.

##### `fragment_vol_limit`

The fragment volume limit.

##### `ignore_fines`

A flag indicating whether to ignore fines.

##### `use_alpha_shape`

A flag indicating whether to use alpha shape.

##### `fragment_alpha`

The alpha value for fragmenting.

##### `strength_params`

The strength parameters.

##### `material_params`

The material parameters.

#### Methods

##### `Init()`

Initializes the DEM coupler.

##### `ApplyBoundaryForce()`

Applies the boundary forces.

##### `Solve()`

Solves the DEM coupler.

##### `CheckBreakage()`

Checks for breakage.

##### `GetFragments()`

Gets the fragments.

--------

[User manual](user_manual.md)
┊ [Previous](ref_netdem.md)
┊ [Next](ref_scene.md)