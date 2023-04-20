###

[User manual](user_manual.md)
┊ [Previous](ref_dem.md)
┊ [Next](ref_domain.md)

-------

### ModifierManager

This class manages a collection of modifiers that can be enabled or disabled.

#### Constructor

##### `ModifierManager()`

Creates a new instance of the ModifierManager class.

#### Methods

##### `Insert(modifier)`

Inserts a modifier into the manager.

- `modifier` (Modifier): The modifier to insert.

##### `Enable(modifier)`

Enables a modifier.

- `modifier` (Modifier): The modifier to enable.

##### `Enable(name)`

Enables a modifier by name.

- `name` (string): The name of the modifier to enable.

##### `Disable(modifier)`

Disables a modifier.

- `modifier` (Modifier): The modifier to disable.

##### `Disable(name)`

Disables a modifier by name.

- `name` (string): The name of the modifier to disable.

-------

### Modifier

This class represents a modifier.

#### Constructor

##### `Modifier()`

Creates a new instance of the Modifier class.

#### Attributes

##### `label`

A string label for the modifier.

##### `cycle_point`

An integer representing the cycle point at which the modifier will be executed.

##### `sim`

A pointer to the simulation object associated with the modifier.

##### `scene`

A pointer to the scene object associated with the modifier.

##### `update_with_scene`

A boolean indicating whether the modifier should update with the scene.

##### `enable_logging`

A boolean indicating whether logging should be enabled for the modifier.

#### Methods

##### `Clone()`

Creates a new instance of the modifier.

##### `Init()`

Initializes the modifier.

##### `Enable()`

Enables the modifier.

##### `Disable()`

Disables the modifier.

##### `Execute()`

Executes the modifier.

##### `Update()`

Updates the modifier.

-------

### BreakageAnalysisPD

This class represents a breakage analysis for particles in a DEM simulation.

#### Constructor

##### `BreakageAnalysisPD()`

Creates a new instance of the BreakageAnalysisPD class.

#### Attributes

##### `particle_id_list`

A list of particle IDs to include in the breakage analysis.

##### `use_particles_in_scene`

A boolean indicating whether to use all particles in the scene or only the particles in the particle_id_list.

##### `pd_dem_coupler`

An instance of the PdDemCoupler class used to couple the breakage analysis with the DEM simulation.

#### Methods

##### `SetRootPath(root_path)`

Sets the root path for the breakage analysis output files.

- `root_path` (string): The path to the root directory for the output files.

##### `SetExecuteByTime(start_time, end_time, time_step)`

Sets the time range and time step for the breakage analysis execution.

- `start_time` (float): The start time for the breakage analysis.
- `end_time` (float): The end time for the breakage analysis.
- `time_step` (float): The time step for the breakage analysis.

##### `SetExecuteByCycles(start_cycle, end_cycle, cycle_step)`

Sets the cycle range and cycle step for the breakage analysis execution.

- `start_cycle` (int): The start cycle for the breakage analysis.
- `end_cycle` (int): The end cycle for the breakage analysis.
- `cycle_step` (int): The cycle step for the breakage analysis.

##### `SetParticlesFromScene()`

Sets the particles to include in the breakage analysis based on the particles in the current DEM simulation scene.

##### `SetParticles(particles)`

Sets the particles to include in the breakage analysis.

- `particles` (list of ints or initializer list of ints): The list of particle IDs to include in the breakage analysis.

##### `Cast()`

Returns a reference to the current instance of the BreakageAnalysisPD class as a Modifier object.

-------

### DataDumper

This class is responsible for dumping data from the simulation to file.

#### Constructor

##### `DataDumper()`

Creates a new instance of the DataDumper class.

#### Attributes

##### `dump_particle_info`

A boolean flag indicating whether particle information should be dumped.

##### `dump_wall_info`

A boolean flag indicating whether wall information should be dumped.

##### `dump_contact_info`

A boolean flag indicating whether contact information should be dumped.

##### `dump_shape_info`

A boolean flag indicating whether shape information should be dumped.

##### `dump_mesh`

A boolean flag indicating whether mesh information should be dumped.

##### `dump_reconstructed`

A boolean flag indicating whether reconstructed information should be dumped.

##### `time_stamp_adjustable`

A boolean flag indicating whether the time stamp is adjustable.

#### Methods

##### `SetRootPath(root_path)`

Sets the root path where the data will be dumped.

- `root_path` (string): The root path where the data will be dumped.

##### `SetSaveByTime(save_by_time, time_interval)`

Sets whether the data should be saved based on a time interval.

- `save_by_time` (bool): A boolean flag indicating whether the data should be saved based on a time interval.
- `time_interval` (float): The time interval for saving the data.

##### `SetSaveByCycles(save_by_cycles, cycle_interval)`

Sets whether the data should be saved based on a cycle interval.

- `save_by_cycles` (bool): A boolean flag indicating whether the data should be saved based on a cycle interval.
- `cycle_interval` (int): The cycle interval for saving the data.

##### `ClearHistories()`

Clears the history of data.

##### `SaveParticleInfoAsVTK(particles, file_name)`

Saves the particle information as a VTK file.

- `particles` (list): A list of particles.
- `file_name` (string): The name of the file to save.

##### `SaveParticleMeshAsVTK(particles, file_name)`

Saves the particle mesh information as a VTK file.

- `particles` (list): A list of particles.
- `file_name` (string): The name of the file to save.

##### `SaveShapeInfoAsSTL()`

Saves the shape information as an STL file.

##### `SaveShapeInfoAsJson()`

Saves the shape information as a JSON file.

##### `Print()`

Prints the current configuration of the data dumper.

##### `Cast()`

Casts the Modifier instance to a DataDumper instance.

-------

### MembraneWall

This class represents a wall in a membrane system.

#### Constructor

The MembraneWall class has multiple constructors to create a new instance of the class. Each constructor takes a different set of parameters.

##### `MembraneWall()`

Default constructor with no arguments.

##### `MembraneWall(double)`

Constructor with a single argument, the thickness of the wall.

##### `MembraneWall(double, double)`

Constructor with two arguments, the thickness and the bending modulus of the wall.

##### `MembraneWall(double, double, double)`

Constructor with three arguments, the thickness, the bending modulus, and the stretching modulus of the wall.

##### `MembraneWall(double, double, double, double, double, double)`

Constructor with six arguments, the thickness, the bending modulus, the stretching modulus, the repulsion strength, the friction coefficient, and the adhesion energy of the wall.

#### Attributes

##### `enable_deformation`

A boolean flag indicating whether the wall is deformable or not.

##### `dump_info`

A boolean flag indicating whether to dump information about the wall.

##### `facing_outside`

A boolean flag indicating whether the wall is facing outward or inward.

##### `wall_list`

A list of walls.

#### Methods

##### `SetRootPath(path)`

Set the root path for the wall.

##### `SetSaveByTime(interval)` 

Set the time interval for saving the wall.

##### `SetSaveByCycles(num)`

Set the number of cycles between saving the wall.

##### `Init()`

Initialize the wall.

##### `SetDimensions(nx, ny, nz)`

Set the dimensions of the wall.

##### `SetPressure(pressure)` 

Set the pressure on the wall.

##### `Cast()`

Cast the wall as a MembraneWall object.

-------

### ParticleGroup

This class represents a group of particles.

#### Constructor

##### `ParticleGroup()`

Creates a new instance of the ParticleGroup class.

#### Attributes

##### `particle_list`

A reference to the list of particles in the group.

#### Methods

##### `Add(id)`

Adds a particle to the group.

- `id` (int): The ID of the particle to add.

##### `Remove(id)`

Removes a particle from the group.

- `id` (int): The ID of the particle to remove.

##### `Add(id_list)`

Adds multiple particles to the group.

- `id_list` (list of int): A list of particle IDs to add.

##### `Remove(id_list)`

Removes multiple particles from the group.

- `id_list` (list of int): A list of particle IDs to remove.

##### `SetVelocity(v)`

Sets the velocity of all particles in the group.

- `v` (Vec3d): The velocity vector to set.

##### `SetSpin(w)`

Sets the spin of all particles in the group.

- `w` (Vec3d): The spin vector to set.

##### `Clear()`

Removes all particles from the group.

##### `Cast()`

Casts the Modifier object to a ParticleGroup object.

-------

### ParticleMotionControl

This class represents a modifier that controls the motion of particles.

#### Constructor

##### `ParticleMotionControl()`

Creates a new instance of the ParticleMotionControl class.

#### Methods

##### `SetFixed(fixed)`

Set the particle to be fixed.

- `fixed` (bool): A boolean value indicating whether the particle should be fixed or not.

##### `SetLinearVelocity(velocity)`

Set the linear velocity of the particle.

- `velocity` (Vec3d): A 3D vector representing the linear velocity of the particle.

##### `SetSinVelocity(velocity, frequency)`
Set the sinusoidal velocity of the particle.

- `velocity` (Vec3d): A 3D vector representing the amplitude of the sinusoidal velocity of the particle.
- `frequency` (float): The frequency of the sinusoidal velocity.

##### `SyncToAllProcessors()`

Synchronize the state of the particle with all processors.

##### `Clear()`

Clear the state of the particle.

#### Inheritance

This class inherits from the Modifier class.

-------

### WallGroup

This class represents a group of walls in the simulation.

#### Inheritance

WallGroup inherits from the Modifier class.

#### Constructor

##### `WallGroup()`

Creates a new instance of the WallGroup class.

#### Attributes

##### `wall_list`

A reference to the list of walls in the group.

#### Methods

##### `Add(wall_id)`

Add a wall to the group by ID.

- `wall_id` (int): The ID of the wall to add.

##### `Remove(wall_id)`

Remove a wall from the group by ID.

- `wall_id` (int): The ID of the wall to remove.

##### `Add(wall_ids)`

Add a list of walls to the group by their IDs.

- `wall_ids` (list of int): The IDs of the walls to add.

##### `Remove(wall_ids)`

Remove a list of walls from the group by their IDs.

- `wall_ids` (list of int): The IDs of the walls to remove.

##### `SetVelocity(vel)`

Set the velocity of all walls in the group.

- `vel` (Vec3d): The velocity to set.

##### `SetSpin(spin)`

Set the spin of all walls in the group.

- `spin` (Vec3d): The spin to set.

##### `Clear()`

Remove all walls from the group.

##### `Cast()`

Cast the WallGroup object to a Modifier object.

-------

### WallDispControl

This class represents a modifier that controls the displacement of walls.

#### Constructor

##### `WallDispControl()`

Creates a new instance of the WallDispControl class.

#### Attributes

##### `vel`

The velocity of the walls.

##### `spin`

The spin of the walls.

#### Methods

##### `SetVelocity(vel)`

Sets the velocity of the walls.

- `vel` (Vec3d): The velocity to set.

##### `SetSpin(spin)`

Sets the spin of the walls.

- `spin` (Vec3d): The spin to set.

##### `SetWalls(wall_ids)`

Sets the walls that this modifier will act on.

##### `wall_ids` (VecXT<int> or list of int): The IDs of the walls to act on.

##### `Cast()`

Casts the Modifier base class to a WallDispControl object.

##### `__init__()`

The Python constructor for the WallDispControl class.

-------

### WallMotionIntegrator

This class represents a wall motion integrator.

#### Constructor

##### `WallMotionIntegrator()`

Creates a new instance of the WallMotionIntegrator class.

#### Attributes

##### `mass`

The mass of the wall.

##### `moi_principal`

The principal moments of inertia of the wall.

##### `enable_translation`

A boolean indicating whether or not translation of the wall is enabled.

##### `enable_rotation`

A boolean indicating whether or not rotation of the wall is enabled.

#### Methods

##### `Cast()`

Returns a pointer to the WallMotionIntegrator object.

##### `SetMass(mass)`

Sets the mass of the wall.

- `mass` (float): The mass to set for the wall.

##### `SetMomentOfInertia(principal_moments)`

Sets the principal moments of inertia of the wall.

- `principal_moments` (Vec3d): A 3D vector containing the principal moments of inertia.

##### `SetTranslationEnabled(enabled)`

Sets whether or not translation of the wall is enabled.

- `enabled` (bool): Whether or not translation of the wall is enabled.

##### `SetRotationEnabled(enabled)`
Sets whether or not rotation of the wall is enabled.

- `enabled` (bool): Whether or not rotation of the wall is enabled.

-------

### WallServoControl

This class represents a wall servo control.

#### Constructor

##### `WallServoControl(kn, area)`

Creates a new instance of the WallServoControl class.

- `kn` (float): The spring constant.
- `area` (float): The area of the wall.

#### Attributes

##### `kn`

The spring constant of the wall servo control.

##### `area`

The area of the wall servo control.

##### `target_pressure`

The target pressure of the wall servo control.

##### `vel_max`

The maximum velocity of the wall servo control.

##### `study_rate`

The study rate of the wall servo control.

##### `tol`

The tolerance of the wall servo control.

##### `enable_warning`

The flag to enable warnings of the wall servo control.

##### `enable_auto_area`

The flag to enable automatic area of the wall servo control.

##### `achieved`

The achieved flag of the wall servo control.

#### Methods

##### `SetWalls(walls)`

Sets the walls for the wall servo control.

- `walls` (list or array of integers): The walls to set.

##### `AddWall(wall)`

Adds a wall to the wall servo control.

- `wall` (integer): The wall to add.

##### `Cast()`

Casts the modifier to a WallServoControl object.

-------
[User manual](user_manual.md)
┊ [Previous](ref_dem.md)
┊ [Next](ref_domain.md)