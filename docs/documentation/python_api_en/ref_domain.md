###

[User manual](user_manual.md)
┊ [Previous](ref_dem.md)
┊ [Next](ref_fem.md)

-------

### CellManager

This class represents a cell manager.

#### Constructor

##### `CellManager()`

Creates a new instance of the CellManager class.

#### Methods

##### `SetSpacing(spacing)`

Set the spacing of the cell manager.

- `spacing` (float): The value of the spacing to set.

-----  
               
### Domain

This class represents a computational domain.

#### Constructor

##### `Domain()`

Creates a new instance of the Domain class.

#### Attributes

##### `cell_manager`

An instance of the CellManager class.

##### `self_rank`

The rank of the current process.

##### `total_rank`

The total number of processes.

##### `bound_min`

The minimum bound of the domain.

##### `bound_max`

The maximum bound of the domain.

#### Methods

##### `SetBound(bound_min, bound_max)`

Set the bounds of the domain.

- `bound_min` (Vec3): The minimum bound of the domain.
- `bound_max` (Vec3): The maximum bound of the domain.

##### `SetCellSpacing(spacing)`

Set the spacing between cells.

- `spacing` (Vec3): The spacing between cells.

##### `IsJudgeDomain(particle1, particle2)`

Check if two particles belong to the same domain.

- `particle1` (Particle): The first particle.
- `particle2` (Particle): The second particle.

##### `IsJudgeDomain(particle, wall)`

Check if a particle and a wall belong to the same domain.

- `particle` (Particle): The particle.
- `wall` (Wall): The wall.

##### `IsBelongToDomain(particle)`

Check if a particle belongs to the domain.

- `particle` (Particle): The particle.

##### `IsBelongToDomain(particle_data)`

Check if a particle data belongs to the domain.

- `particle_data` (ParticleData): The particle data. 

-----

### DomainManager

This class manages the domains in a distributed computing environment.

#### Constructor

##### `DomainManager()`

Creates a new instance of the DomainManager class.

#### Methods

##### `SetBound(bound_min, bound_max)`

Sets the bounding box of the domains.

- `bound_min` (tuple of floats): The minimum coordinates of the bounding box.
- `bound_max` (tuple of floats): The maximum coordinates of the bounding box.

##### `SetDecomposition(num_subdomains)`

Sets the number of subdomains for decomposition.

- `num_subdomains` (int): The number of subdomains to decompose the domain into.

##### `SetCellSpacing(spacing)`

Sets the cell spacing for the subdomains.

- `spacing` (float): The cell spacing for the subdomains.

##### `GetGhostSubDomains()`

Returns a list of ghost subdomains.

##### `GetSelfGhostSubDomain()`

Returns the ghost subdomain for the current process.

##### `GetSelfSubDomain()`

Returns the subdomain for the current process.

-------

[User manual](user_manual.md)
┊ [Previous](ref_dem.md)
┊ [Next](ref_fem.md)