###

[User manual](user_manual.md)
┊ [Previous](cfddem_simulation.md)
┊ [Next](ref_domain.md)

-------

### ContactModel

This class represents a contact model.

#### Constructor

##### `ContactModel(label='')`

Creates a new instance of the `ContactModel` class.

- `label` (string, optional): A string label for the contact model. Default is an empty string.

#### Attributes

##### `label`

A string label for the contact model.

#### Methods

##### `SetProperty(json_data)`

Set the properties of the contact model from a JSON object.

- `json_data` (JSON object): A JSON object containing the properties to set.

##### `SetProperty(prop_name, prop_value)`

Set a specific property of the contact model.

- `prop_name` (string): The name of the property to set.
- `prop_value` (float): The value to set for the property.

------

### LinearSpring

This class represents a linear spring.

#### Constructor

##### `LinearSpring()`

Creates a new instance of the LinearSpring class.

##### `LinearSpring(stiffness, damping, rest_length, contact_radius)`

Creates a new instance of the LinearSpring class with specific parameters.

- `stiffness` (float): The spring stiffness.
- `damping` (float): The spring damping.
- `rest_length` (float): The rest length of the spring.
- `contact_radius` (float): The contact radius of the spring.

-----

### ParallelBond

This class represents a parallel bond contact model.

#### Constructor

##### `ParallelBond()`

Creates a new instance of the ParallelBond class.

##### `ParallelBond(kn, kt, gamma, t0)`

Creates a new instance of the ParallelBond class with specified parameters.

- `kn` (float): Normal contact stiffness.
- `kt` (float): Tangential contact stiffness.
- `gamma` (float): Viscoelastic parameter.
- `t0` (float): Yield strength.

#### Inheritance

`ParallelBond` inherits from `ContactModel`

-----

### ContactSolverSettings Class

This class represents settings for the contact solver.

#### Attributes

##### `solver_type` (SolverType)

The type of contact solver to use. Default is SolverType.

##### `gjk_use_erosion` (bool)

Whether to use erosion for the GJK contact solver. 

##### `gjk_erosion_ratio_initial` (float)

The initial erosion ratio for the GJK contact solver.

##### `gjk_erosion_ratio_increment` (float)

The increment of erosion ratio for the GJK contact solver.

##### `sdf_potential_type` (int)

The type of potential function to use for the SDF contact solver.

#### SolverType Enumeration

This enumeration represents the type of contact solver.

##### `SolverType.gjk`: The GJK contact solver.

##### `SolverType.sdf`: The SDF contact solver.

##### `SolverType.automatic`: The automatic contact solver.

-----

### ContactSolverFactory

This class is responsible for creating instances of contact solvers based on settings.

#### Attributes

settings (ContactSolverSettings): The settings for the contact solver.

#### Methods

__init__(): Constructs a new instance of the ContactSolverFactory class with default settings.

__init__(factory: ContactSolverFactory): Constructs a new instance of the ContactSolverFactory class with settings copied from factory.

__copy__(): Copies the settings of the contact solver factory to a new instance of the ContactSolverFactory class.


-----

### DEMSolver

This class represents a discrete element method (DEM) solver.

#### Constructor

##### `DEMSolver()`

Creates a new instance of the `DEMSolver` class.

#### Attributes

##### `timestep`

The timestep used for the simulation.

##### `contact_solver_factory`

The contact solver factory used to create contact solvers for the simulation.

#### Enums

##### `CyclePoint`

An enumeration representing the different cycle points in the simulation.

- `pre`: The pre-collision cycle point.
- `mid_0`: The first mid-collision cycle point.
- `mid_1`: The second mid-collision cycle point.
- `mid_2`: The third mid-collision cycle point.
- `mid_3`: The fourth mid-collision cycle point.
- `mid_4`: The fifth mid-collision cycle point.
- `post`: The post-collision cycle point.

-----
[User manual](user_manual.md)
┊ [Previous](cfddem_simulation.md)
┊ [Next](ref_domain.md)