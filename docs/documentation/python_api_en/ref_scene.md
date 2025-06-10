###

[User manual](user_manual.md)
┊ [Previous](ref_peridigm.md)
┊ [Next](ref_shape.md)

-------

### DEMObjectPool

This class represents a pool of DEM objects.

#### Constructor

The DEMObjectPool class does not have a constructor.

#### Methods

##### `init()`

Initialize the DEMObjectPool.

##### `GetParticle()`

Get a reference to a particle object in the pool.

- Returns: A reference to a Particle object.

##### `GetContactPP()`

Get a reference to a ContactPP object in the pool.

- Returns: A reference to a ContactPP object.

##### `GetContactPW()`

Get a reference to a ContactPW object in the pool.

- Returns: A reference to a ContactPW object.

##### `Clone(contact_pp)`

Create a copy of a ContactPP object in the pool.

`contact_pp` (ContactPP const*): A pointer to the ContactPP object to clone.

- Returns: A reference to a new ContactPP object.

##### `Clone(contact_pw)`

Create a copy of a ContactPW object in the pool.

`contact_pw` (ContactPW const*): A pointer to the ContactPW object to clone.

- Returns:A reference to a new ContactPW object.

-------

### Scene

This class represents a simulation scene.

#### Constructor

##### `Scene()`

Creates a new instance of the Scene class.

#### Attributes

##### `gravity_coef`

A float representing the gravitational acceleration coefficient.

##### `contact_model_map`

A dictionary mapping contact model labels to their corresponding ContactModel objects.

##### `bond_model_table`

A list of bond model names.

##### `collision_model_table`

A list of collision model names.

##### `particle_list`

A list of Particle objects.

##### `particle_proxy_list`

A list of ParticleProxy objects.

##### `particle_ghost_list`

A list of ParticleGhost objects.

##### `wall_list`

A list of Wall objects.

##### `wall_ghost_list`

A list of WallGhost objects.

##### `particle_map`

A dictionary mapping particle IDs to their corresponding Particle objects.

##### `shape_map`

A dictionary mapping shape IDs to their corresponding Shape objects.

##### `local_shape_list`

A list of local shape IDs.

#### Methods

##### `InsertContactModel(contact_model)`

Inserts a contact model into the scene.

- `contact_model` (ContactModel): The contact model to insert.

##### `SetNumberOfMaterials(num_materials)`

Sets the number of materials in the scene.

- `num_materials` (int): The number of materials.

##### `SetCollisionModel(i, j, contact_model)`

Sets the collision model between two materials.

- `i` (int): The index of the first material.
- `j` (int): The index of the second material.
- `contact_model` (ContactModel): The contact model to use for the collision.

##### `InsertShape(shape)`

Inserts a shape into the scene.

- `shape` (Shape): The shape to insert.

##### `InsertShape(shapes)`

Inserts multiple shapes into the scene.

- `shapes` (list of Shape): The shapes to insert.

##### `InsertParticle(particle)`

Inserts a particle into the scene.

- `particle` (Particle): The particle to insert.

##### `InsertParticle(particles)`

Inserts multiple particles into the scene.

- `particles` (list of Particle): The particles to insert.

##### `InsertParticle(bonded_spheres)`

Inserts a bonded sphere into the scene.

- `bonded_spheres` (BondedSpheres): The bonded sphere to insert.

##### `InsertParticle(bonded_spheres_list)`

Inserts multiple bonded spheres into the scene.

- `bonded_spheres_list` (list of BondedSpheres): The bonded spheres to insert.

##### `InsertParticle(bonded_voronois)`

Inserts a bonded Voronoi into the scene.

- `bonded_voronois` (BondedVoronois): The bonded Voronoi to insert.

##### `InsertParticle(bonded_voronois_list)`

Inserts multiple bonded Voronois into the scene.

- `bonded_voronois_list` (list of BondedVoronois): The bonded Voronois to insert.

##### `InsertWall(wall)`

Inserts a wall into the scene.

- `wall` (Wall): The wall to insert.

##### `InsertWall(walls)`

Inserts multiple walls into the scene.

- `walls` (list of Wall): The walls to insert.

##### `RemoveShape(shape)`

Removes a shape from the scene.

- `shape` (Shape): The shape to remove.

##### `RemoveParticle(particle)`

Removes a particle from the scene.

- `particle` (Particle): The particle to remove.

##### `RemoveParticle(index)`

Removes a particle from the scene by its index.

- `index` (int): The index of the particle to remove.

##### `RemoveWall(wall)`

Removes a wall from the scene.

- `wall` (Wall): The wall to remove.

##### `RemoveWall(index)`

Removes a wall from the scene by its index.

- `index` (int): The index of the wall to remove.

##### `InsertContactModel(contact_model)`

Inserts a contact model into the scene.

- `contact_model` (ContactModel): The contact model to insert.

##### `GetShapes()`

Returns a reference to the vector of shapes in the scene.

##### `InScene(shape)`

Checks if a shape is in the scene.

- `shape` (Shape): The shape to check.

##### `InScene(contact_model)`

Checks if a contact model is in the scene.

- `contact_model` (ContactModel): The contact model to check.

##### `SetNumberOfMaterials(num_materials)`

Sets the number of materials in the scene.

- `num_materials` (int): The number of materials.

##### `SetBondModel(i, j, contact_model)`

Sets the bond model between two particles.

- `i` (int): The index of the first particle.
- `j` (int): The index of the second particle.
- `contact_model` (ContactModel): The contact model to use for the bond.


##### `SetBondModel(i, j, contact_model_label)`

Sets the bond model between two particles.

- `i` (int): The index of the first particle.
- `j` (int): The index of the second particle.
- `contact_model_label` (str): The label of the contact model to use for the bond.

##### `SetCollisionModel(i, j, contact_model)`

Sets the collision model between two particles.

- `i` (int): The index of the first particle.
- `j` (int): The index of the second particle.
- `contact_model` (ContactModel): The contact model to use for the collision.

##### `SetCollisionModel(i, j, contact_model_label)`

Sets the collision model between two particles.

- `i` (int): The index of the first particle.
- `j` (int): The index of the second particle.
- `contact_model_label` (str): The label of the contact model to use for the collision.

##### `SetGravity(gravity)`

Sets the gravity vector for the scene.

- `gravity` (Vec3): The gravity vector.

##### `GetBondModel(particle1, particle2)`

Gets the bond model between two particles.

- `particle1` (Particle): The first particle.
- `particle2` (Particle): The second particle.

##### `GetBondModel(particle, wall)`

Gets the bond model between a particle and a wall.

- `particle` (Particle): The particle.
- `wall` (Wall): The wall.

##### `GetCollisionModel(particle1, particle2)`

Returns a reference to the collision model between two particles.

- `particle1` (Particle): The first particle.
- `particle2` (Particle): The second particle.

##### `GetCollisionModel(particle, wall)`

Returns a reference to the collision model between a particle and a wall.

- `particle` (Particle): The particle.
- `wall` (Wall): The wall.

##### `AutoReadRestart()`

Automatically reads restart files and sets up the simulation accordingly.

##### `ReadRestartShapes()`

Reads the shape data from a restart file.

##### `ReadRestartParticles()`

Reads the particle data from a restart file.

##### `ReadRestartWalls()`

Reads the wall data from a restart file.

##### `ReadRestartContacts()`

Reads the contact data from a restart file.

##### `GetContactPPs()`

Returns a list of all particle-particle contacts in the simulation.

##### `GetContactPWs()`

Returns a list of all particle-wall contacts in the simulation.

##### `ClearShapes()`

Removes all shapes from the scene.

##### `ClearParticles()`

Removes all particles from the scene.

##### `ClearWalls()`

Removes all walls from the scene.

##### `ClearContactModels()`

Removes all contact models from the scene.

##### `ClearContacts()`

Removes all contacts from the scene.

##### `FindParticle(particle_id)`

Finds a particle in the simulation by its ID.

- `particle_id` (int): The ID of the particle.

##### `FindWall(wall_id)`

Finds a wall in the simulation by its ID.

- `wall_id` (int): The ID of the wall.

-------

### PackGenerator

This class represents a pack generator.

#### Constructor

##### `PackGenerator()`

Creates a new instance of the PackGenerator class.

#### Static Methods

##### `GetGridPack()`

Generates a pack using a grid-based algorithm.

GetGridPack(xmin, xmax, ymin, ymax, zmin, zmax, nx, ny, nz, shapes): Generates a pack using a grid-based algorithm with the given dimensions and number of cells in each direction, using the provided shapes.

GetGridPack(xmin, xmax, ymin, ymax, zmin, zmax, nx, ny, nz, shape_vec): Generates a pack using a grid-based algorithm with the given dimensions and number of cells in each direction, using the provided vector of shapes.

GetGridPack(xmin, xmax, ymin, ymax, zmin, zmax, nx, ny, nz, bonded_spheres): Generates a pack using a grid-based algorithm with the given dimensions and number of cells in each direction, using the provided bonded spheres.

GetGridPack(xmin, xmax, ymin, ymax, zmin, zmax, nx, ny, nz, bonded_voronois): Generates a pack using a grid-based algorithm with the given dimensions and number of cells in each direction, using the provided bonded Voronois.

GetVoronoiPack
Generates a pack using a Voronoi-based algorithm.

GetVoronoiPack(xmin, xmax, ymin, ymax, zmin, zmax, n, shapes): Generates a pack using a Voronoi-based algorithm with the given dimensions and number of cells in each direction, using the provided shapes.

GetVoronoiPack(xmin, xmax, ymin, ymax, zmin, zmax, n, shape_vec): Generates a pack using a Voronoi-based algorithm with the given dimensions and number of cells in each direction, using the provided vector of shapes.

GetVoronoiPack(stl_model, n, shape): Generates a pack using a Voronoi-based algorithm with the given STL model and number of cells in each direction, using the provided shape.

GetVoronoiPack(stl_model, n, shape_vec): Generates a pack using a Voronoi-based algorithm with the given STL model and number of cells in each direction, using the provided vector of shapes.


-------

### Particle

This class represents a particle in a simulation.

#### Constructor

##### `Particle()`

Creates a new instance of the Particle class.

#### Attributes

##### `id`

The ID of the particle.

##### `shape`

A reference to the shape of the particle.

##### `bound_min`

The minimum bound of the particle.

##### `bound_max`

The maximum bound of the particle.

##### `margin`

The margin of the particle.

##### `bound_disp`

The displacement of the particle.

##### `material_type`

The type of material of the particle.

##### `density`

The density of the particle.

##### `mass`

The mass of the particle.

##### `moi_principal`

The moment of inertia of the particle.

##### `damp_global`

The global damping of the particle.

##### `pos`

The position of the particle.

##### `quaternion`

The quaternion of the particle.

##### `vel`

The velocity of the particle.

##### `spin`

The spin of the particle.

##### `vel_m0p5`

The velocity of the particle divided by 0.5.

##### `spin_principal`

The principal spin of the particle.

##### `force`

The force acting on the particle.

##### `moment`

The moment acting on the particle.

##### `dynamic_properties`

The dynamic properties of the particle.

##### `enable_rotation`

Whether the particle is allowed to rotate.

##### `enable_bound_aabb`

Whether the particle is bound by an AABB.

##### `need_update_linked_list`

Whether the particle's linked list needs to be updated.

##### `linked_cell_list`

The linked cell list of the particle.

##### `linked_particle_list`

The linked particle list of the particle.

##### `linked_wall_list`

The linked wall list of the particle.

##### `contact_pp_lookup_table`

The lookup table for particle-particle contact.

##### `contact_pw_lookup_table`

The lookup table for particle-wall contact.

##### `is_on_edge`

Whether the particle is on an edge.

##### `need_send_out`

Whether the particle needs to be sent out.

##### `linked_domain_list`

The linked domain list of the particle.

##### `need_update_stl_model`

Whether the particle's STL model needs to be updated.

##### `stl_model`

The STL model of the particle.

-------

### Wall

This class represents a wall object.

#### Constructor

##### `Wall()`

Creates a new instance of the Wall class.

##### `Wall(shape)`

Creates a new instance of the Wall class with a specified shape.

- `shape` (Shape): The shape of the wall.

#### Attributes

##### `id`

An integer ID for the wall.

##### `label`

A string label for the wall.

##### `shape`

The shape of the wall.

##### `material_type`

The material type of the wall.

##### `enable_rotation`

A boolean indicating whether the wall is allowed to rotate.

##### `enable_bound_aabb`

A boolean indicating whether the wall has an axis-aligned bounding box.

##### `bound_min`

The minimum position of the bounding box.

##### `bound_max`

The maximum position of the bounding box.

##### `bound_disp`

The displacement of the bounding box.

##### `pos`

The position of the wall.

##### `quaternion`

The quaternion orientation of the wall.

##### `force`

The force acting on the wall.

##### `moment`
The moment acting on the wall.

##### `vel`

The velocity of the wall.

##### `spin`

The spin of the wall.

##### `vel_spin`

The velocity spin of the wall.

##### `dynamic_properties`

A map containing the dynamic properties of the wall.

##### `need_update_linked_list`

A boolean indicating whether the wall's linked list needs to be updated.

##### `linked_cell_list`

A list of linked cells.

##### `linked_particle_list`

A list of linked particles.

##### `contact_pw_lookup_table`

A lookup table for pairwise contacts.

##### `need_update_stl_model`

A boolean indicating whether the wall's STL model needs to be updated.

##### `stl_model`

The STL model of the wall.

#### Methods

##### `SetShape(shape)`

Sets the shape of the wall.

- `shape` (Shape): The shape of the wall.

##### `SetPosition(pos)`

Sets the position of the wall.

- `pos` (Vec3d): The position of the wall.

##### `SetRodrigues(rot)`

Sets the Rodrigues rotation of the wall.

- `rot` (Vec3d): The Rodrigues rotation of the wall.

##### `SetQuaternion(quat)`

Sets the quaternion orientation of the wall.

- `quat` (Vec4d): The quaternion orientation of the wall.

##### `SetVelocity(vel)`
Sets the velocity of the wall.

- `vel` (Vec3d): The velocity of the wall.

##### `SetSpin(spin)`

Sets the spin of the wall.

- `spin` (Vec3d): The spin of the wall.

##### `SetVelocitySpin(vel, spin)`

Sets the velocity and spin of the wall.

- `vel` (Vec3d): The velocity of the wall.
- `spin` (Vec3d): The spin of the wall.

##### `GetVelocity()`

Return: the velocity of the wall.

##### `SetDynamicProperty(prop_name, prop_value)`

Sets a dynamic property of the wall.

- `prop_name` (string): The name of the dynamic property to set.
- `prop_value` (float): The value to set for the dynamic property.

##### `GetDynamicProperty(prop_name)`

Returns the value of a dynamic property of the wall.

- `prop_name` (string): The name of the dynamic property.

##### `AddForce(force)`

Adds a force to the wall.

- `force` (Vec3d): The force to add.

##### `AddMoment(moment)`

Adds a moment to the wall.

- `moment` (Vec3d): The moment to add.

##### `AddForce(f)`

Add a force to the wall.

- `f` (Vec3d): The force to add.

##### `AddMoment(m)`

Add a moment to the wall.

- `m` (Vec3d): The moment to add.

##### `AddForceAtomic(f)`

Add an atomic force to the wall.

- `f` (Vec3d): The atomic force to add.

##### `AddMomentAtomic(m)`

Add an atomic moment to the wall.

- `m` (Vec3d): The atomic moment to add.

##### `ClearForce()`

Clear the total force on the wall.

##### `ClearMoment()`

Clear the total moment on the wall.

##### `ApplyContactForce(contact_pw, contact_force)`

Apply a contact force to the wall.

- `contact_pw` : The contact point on the wall.
- `contact_force` : The contact force to apply.

##### `UpdateContactForce(contact_pw, contact_force)`

Update the contact force on the wall.

- `contact_pw` (Vec3d): The contact point on the wall.
- `contact_force` (Vec3d): The new contact force.

##### `UpdateMotion()`

Update the motion of the wall.

- `t` (double, optional): The time step. Default is 0.

##### `UpdateMotion(pos, quat, t)`

Update the motion of the wall.

- `pos` (Vec3d): The position of the wall.
- `quat` (Vec4d): The quaternion of the wall.
- `t` (double, optional): The time step. Default is 0.

##### `UpdateMotion(pos, euler, t)`

Update the motion of the wall.

- `pos` (Vec3d): The position of the wall.
- `euler` (Vec3d): The Euler angles of the wall.
- `t` (double, optional): The time step. Default is 0.

##### `UpdateBound()`

Update the bounding box of the wall.

##### `ClearLinkedCells()`

Clear the linked cells of the wall.

##### `ClearLinkedNeighs()`

Clear the linked neighbors of the wall.

##### `BuildContactLookUpTable()`

Build the contact lookup table of the wall.

##### `ClearContactLookUpTable()`

Clear the contact lookup table of the wall.

##### `UpdateLinkedCells()`

Update the linked cells of the wall.

##### `UpdateLinkedNeighs()`

Update the linked neighbors of the wall.

##### `GetContactPWs()`

Get the contact points and weights of the wall.

##### `UpdateSTLModel() `

Update the STL model of the wall.

##### `SaveAsVTK(file_name)`

Save the wall as a VTK file.

- `file_name` (string): The name of the file to save.

##### `Print()`

Print the wall.

##### `FindLinked()`

Find the linked objects of the wall.

##### `FindContactRef(contact_pw)`

Find the contact reference object of the wall.

-------

### WallBoxPlane

#### Constructor

##### `WallBoxPlane(x, y, z, w, h, d)`

Creates a new instance of the WallBoxPlane class with the following parameters:

- `x` (float): x coordinate of the center of the box
- `y` (float): y coordinate of the center of the box
- `z` (float): z coordinate of the center of the box
- `w` (float): width of the box
- `h` (float): height of the box
- `d` (float): depth of the box

#### Methods

##### `GetShapes()`

Returns a list of shape objects of the wall.

##### `GetWalls()`

Returns a list of wall objects of the wall.

##### `ImportToScene()`

Imports the wall object to the simulation scene.

-------

### WallBoxPlate

These classes represent wall objects in the simulation scene, with a box shape and a plane or a plate surface.

#### Constructor

##### `WallBoxPlate(x, y, z, w, h, d)`

Creates a new instance of the WallBoxPlate class with the following parameters:

- `x` (float): x coordinate of the center of the box
- `y` (float): y coordinate of the center of the box
- `z` (float): z coordinate of the center of the box
- `w` (float): width of the box
- `h` (float): height of the box
- `d` (float): depth of the box


#### Methods

##### `GetShapes()`

Returns a list of shape objects of the wall.

##### `GetWalls()`

Returns a list of wall objects of the wall.

##### `ImportToScene()`

Imports the wall object to the simulation scene.

-------

### BondedSpheres

This function initializes a PyBind11 module for the BondedSpheres class.

#### Attributes

##### `sphere`

A Sphere object representing the bonded sphere.

##### `particle_list`

A list of Particle objects.

##### `contact_list`

A list of Contact objects.

##### `bond_pair_list`

A list of bonded particle pairs.

##### `bond_model`

A reference to the BondModel object used to calculate bonds.

#### Methods

##### `init()`

The default constructor.

##### `init(BondedSpheres)`

A copy constructor that initializes a BondedSpheres object from another BondedSpheres object.

##### `SetBondModel()`

Sets the bond model used to calculate bonds.

##### `Translate()`

Translates the BondedSpheres object.

##### `RotateByRodrigues()`

Rotates the BondedSpheres object using Rodrigues' rotation formula.

##### `GetCentroid()`
Returns the centroid of the BondedSpheres object.

##### `InitFromSTL()`
Initializes the BondedSpheres object from an STL file.

- `filename` (string): The path to the STL file.
- `radius` (float): The radius of the sphere.

##### `InitFromGrid()`

Initializes the BondedSpheres object from a grid.

##### `MakePorosity()`

Creates porosity in the BondedSpheres object.

##### `InitBonds()`

Initializes the bonded pairs in the BondedSpheres object.

##### `ImportToScene()`

Imports the BondedSpheres object to a scene.

-------

### BondedVoronois

This class represents a bonded Voronois object.

#### Constructor

##### `BondedVoronois()`

Creates a new instance of the BondedVoronois class.

#### Attributes

##### `trimesh_list`

A list of trimeshes.

##### `particle_list`

A list of particles.

##### `contact_list`

A list of contacts.

##### `bond_pair_list`

A list of bond pairs.

##### `cvt_max_iters`

The maximum number of iterations for the CVT algorithm.

##### `cvt_tol`

The tolerance for the CVT algorithm.

##### `bond_model`

The bond model used by the BondedVoronois object.

#### Methods

##### `SetBondModel(bond_model)`

Set the bond model used by the BondedVoronois object.

- `bond_model` (BondModel): The bond model to set.

##### `Translate(x, y, z)`

Translate the BondedVoronois object.

- `x` (float): The amount to translate in the x direction.
- `y` (float): The amount to translate in the y direction.
- `z` (float): The amount to translate in the z direction.

##### `RotateByRodrigues(theta, u)`

Rotate the BondedVoronois object by the Rodrigues formula.

- `theta` (float): The angle of rotation.
- `u` (array-like): The axis of rotation.

##### GetCentroid()

Get the centroid of the BondedVoronois object.

##### `InitFromSTL(stl_file, label='')`

Initialize the BondedVoronois object from an STL file.

- `stl_file` (string): The path to the STL file.

- `label` (string, optional): A label for the object. Default is an empty string.

##### `MakePorosity(porosity)`

Make the BondedVoronois object porous.

- `porosity` (float): The desired porosity.

##### `InitBonds()`

Initialize the bonds of the BondedVoronois object.

##### `RefreshPointers()`

Refresh the pointers of the BondedVoronois object.

##### `SaveAsVTK(filename)`

Save the BondedVoronois object as a VTK file.

- `filename` (string): The name of the VTK file.

##### `ImportToScene(scene)`

Import the BondedVoronois object to a scene.

- `scene` (Scene): The scene to import to.

-------

### ContactPP

This class represents a contact model between two particles.

#### Constructor

##### `ContactPP()`

Creates a new instance of the ContactPP class.

##### `ContactPP(particle_1, particle_2)`

Creates a new instance of the ContactPP class with the given particles.

- `particle_1` (Particle* const): Pointer to the first particle.

- `particle_2` (Particle* const): Pointer to the second particle.

#### Attributes

##### `particle_1`

Pointer to the first particle involved in the contact.

##### `particle_2`

Pointer to the second particle involved in the contact.

##### `bond_entries`

A vector of bond entries for the contact.

##### `collision_entries`

A vector of collision entries for the contact.

##### `active`

A boolean value indicating whether the contact is active or not.

##### `dynamic_properties`

A dictionary of dynamic properties for the contact.

#### Methods

##### `SetBondModel(bond_model)`

Set the bond model for the contact.

- `bond_model` (BondModel*): Pointer to the bond model.

##### `SetCollisionModel(collision_model)`

Set the collision model for the contact.

- `collision_model` (CollisionModel*): Pointer to the collision model.

##### `EvaluateForceMoment()`

Evaluate the force and moment for the contact.

##### `ApplyToParticle()`

Apply the contact force and moment to the particles.

##### `ApplyToParticle1()`

Apply the contact force and moment to the first particle.

##### `ApplyToParticle2()`

Apply the contact force and moment to the second particle.

##### `IsActive()`

Return a boolean indicating whether the contact is active or not.

##### `Clear()`

Clear the contact data.

##### `Print()`

Print the contact data.

-------

### ContactPW

This class represents a contact between a particle and a wall.

#### Constructor

##### `ContactPW(particle, wall)`

Creates a new instance of the `ContactPW` class with a given particle and wall.

- `particle` (Particle object): The particle involved in the contact.

- `wall` (Wall object): The wall involved in the contact.

#### Attributes

##### `particle`

The particle involved in the contact.

##### `wall`

The wall involved in the contact.

##### `bond_model`

The bond model used for the contact.

##### `collision_model`

The collision model used for the contact.

##### `bond_entries`

A list of bond entries for the contact.

##### `collision_entries`

A list of collision entries for the contact.

##### `active`

A boolean flag indicating whether the contact is currently active.

##### `dynamic_properties`

A dictionary of dynamic properties associated with the contact.

#### Methods

##### `SetBondModel(bond_model)`

Set the bond model for the contact.

- `bond_model` (BondModel object): The bond model to use for the contact.

##### `SetCollisionModel(collision_model)`

Set the collision model for the contact.

- `collision_model` (CollisionModel object): The collision model to use for the contact.

##### `EvaluateForceMoment()`

Calculate and return the force and moment of the contact.

##### `ApplyToParticle()`

Apply the contact to the particle involved in the contact.

##### `ApplyToWall()`

Apply the contact to the wall involved in the contact.

##### `IsActive()`

Return True if the contact is currently active, False otherwise.

##### `Clear()`

Clear all bond and collision entries for the contact.

##### `Print()`

Print information about the contact.

-------





-------

[User manual](user_manual.md)
┊ [Previous](ref_peridigm.md)
┊ [Next](ref_shape.md)