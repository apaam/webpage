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

`init()`

Initialize the DEMObjectPool.

`GetParticle()`

Get a reference to a particle object in the pool.

- Returns: A reference to a Particle object.

`GetContactPP()`

Get a reference to a ContactPP object in the pool.

- Returns: A reference to a ContactPP object.

`GetContactPW()`

Get a reference to a ContactPW object in the pool.

- Returns: A reference to a ContactPW object.

`Clone(contact_pp)`

Create a copy of a ContactPP object in the pool.

`contact_pp` (ContactPP const*): A pointer to the ContactPP object to clone.

- Returns: A reference to a new ContactPP object.

`Clone(contact_pw)`

Create a copy of a ContactPW object in the pool.

`contact_pw` (ContactPW const*): A pointer to the ContactPW object to clone.

- Returns:A reference to a new ContactPW object.

-------


-------

-------



-------




-------




-------

WallBoxPlane and WallBoxPlate
These classes represent wall objects in the simulation scene, with a box shape and a plane or a plate surface.

Constructors
WallBoxPlane(x, y, z, w, h, d)
Creates a new instance of the WallBoxPlane class with the following parameters:

x (float): x coordinate of the center of the box
y (float): y coordinate of the center of the box
z (float): z coordinate of the center of the box
w (float): width of the box
h (float): height of the box
d (float): depth of the box
WallBoxPlate(x, y, z, w, h, d)
Creates a new instance of the WallBoxPlate class with the following parameters:

x (float): x coordinate of the center of the box
y (float): y coordinate of the center of the box
z (float): z coordinate of the center of the box
w (float): width of the box
h (float): height of the box
d (float): depth of the box
Methods
GetShapes()
Returns a list of shape objects of the wall.

GetWalls()
Returns a list of wall objects of the wall.

ImportToScene()
Imports the wall object to the simulation scene.



-------

### InitPyBondedSpheres

This function initializes a PyBind11 module for the BondedSpheres class.

Parameters
m (PyBind11 module): The module to initialize.
Attributes
sphere
A Sphere object representing the bonded sphere.

particle_list
A list of Particle objects.

contact_list
A list of Contact objects.

bond_pair_list
A list of bonded particle pairs.

bond_model
A reference to the BondModel object used to calculate bonds.

Methods
__init__
The default constructor.

__init__(BondedSpheres)
A copy constructor that initializes a BondedSpheres object from another BondedSpheres object.

SetBondModel
Sets the bond model used to calculate bonds.

Translate
Translates the BondedSpheres object.

RotateByRodrigues
Rotates the BondedSpheres object using Rodrigues' rotation formula.

GetCentroid
Returns the centroid of the BondedSpheres object.

InitFromSTL
Initializes the BondedSpheres object from an STL file.

filename (string): The path to the STL file.
radius (float): The radius of the sphere.
InitFromGrid
Initializes the BondedSpheres object from a grid.

MakePorosity
Creates porosity in the BondedSpheres object.

InitBonds
Initializes the bonded pairs in the BondedSpheres object.

ImportToScene
Imports the BondedSpheres object to a scene.


-------

BondedVoronois
This class represents a bonded Voronois object.

Constructor
BondedVoronois()
Creates a new instance of the BondedVoronois class.

Attributes
trimesh_list
A list of trimeshes.

particle_list
A list of particles.

contact_list
A list of contacts.

bond_pair_list
A list of bond pairs.

cvt_max_iters
The maximum number of iterations for the CVT algorithm.

cvt_tol
The tolerance for the CVT algorithm.

bond_model
The bond model used by the BondedVoronois object.

Methods
SetBondModel(bond_model)
Set the bond model used by the BondedVoronois object.

bond_model (BondModel): The bond model to set.
Translate(x, y, z)
Translate the BondedVoronois object.

x (float): The amount to translate in the x direction.
y (float): The amount to translate in the y direction.
z (float): The amount to translate in the z direction.
RotateByRodrigues(theta, u)
Rotate the BondedVoronois object by the Rodrigues formula.

theta (float): The angle of rotation.
u (array-like): The axis of rotation.
GetCentroid()
Get the centroid of the BondedVoronois object.

InitFromSTL(stl_file, label='')
Initialize the BondedVoronois object from an STL file.

stl_file (string): The path to the STL file.
label (string, optional): A label for the object. Default is an empty string.
MakePorosity(porosity)
Make the BondedVoronois object porous.

porosity (float): The desired porosity.
InitBonds()
Initialize the bonds of the BondedVoronois object.

RefreshPointers()
Refresh the pointers of the BondedVoronois object.

SaveAsVTK(filename)
Save the BondedVoronois object as a VTK file.

filename (string): The name of the VTK file.
ImportToScene(scene)
Import the BondedVoronois object to a scene.

scene (Scene): The scene to import to.


-------

ContactPP
This class represents a contact model between two particles.

Constructor
ContactPP()
Creates a new instance of the ContactPP class.

ContactPP(particle_1, particle_2)
Creates a new instance of the ContactPP class with the given particles.

particle_1 (Particle* const): Pointer to the first particle.
particle_2 (Particle* const): Pointer to the second particle.

### Attributes

particle_1
Pointer to the first particle involved in the contact.

particle_2
Pointer to the second particle involved in the contact.

bond_entries
A vector of bond entries for the contact.

collision_entries
A vector of collision entries for the contact.

active
A boolean value indicating whether the contact is active or not.

dynamic_properties
A dictionary of dynamic properties for the contact.

Methods
SetBondModel(bond_model)
Set the bond model for the contact.

bond_model (BondModel*): Pointer to the bond model.
SetCollisionModel(collision_model)
Set the collision model for the contact.

collision_model (CollisionModel*): Pointer to the collision model.
EvaluateForceMoment()
Evaluate the force and moment for the contact.

ApplyToParticle()
Apply the contact force and moment to the particles.

ApplyToParticle1()
Apply the contact force and moment to the first particle.

ApplyToParticle2()
Apply the contact force and moment to the second particle.

IsActive()
Return a boolean indicating whether the contact is active or not.

Clear()
Clear the contact data.

Print()
Print the contact data.


-------

### ContactPW

This class represents a contact between a particle and a wall.

#### Constructor

`ContactPW(particle, wall)`

Creates a new instance of the `ContactPW` class with a given particle and wall.

- `particle` (Particle object): The particle involved in the contact.

- `wall` (Wall object): The wall involved in the contact.

#### Attributes

`particle`

The particle involved in the contact.

`wall`

The wall involved in the contact.

`bond_model`

The bond model used for the contact.

`collision_model`

The collision model used for the contact.

`bond_entries`

A list of bond entries for the contact.

collision_entries
A list of collision entries for the contact.

active
A boolean flag indicating whether the contact is currently active.

dynamic_properties
A dictionary of dynamic properties associated with the contact.

#### Methods

`SetBondModel(bond_model)`

Set the bond model for the contact.

- `bond_model` (BondModel object): The bond model to use for the contact.

`SetCollisionModel(collision_model)`

Set the collision model for the contact.

- `collision_model` (CollisionModel object): The collision model to use for the contact.

`EvaluateForceMoment()`

Calculate and return the force and moment of the contact.

`ApplyToParticle()`

Apply the contact to the particle involved in the contact.

`ApplyToWall()`

Apply the contact to the wall involved in the contact.

`IsActive()`

Return True if the contact is currently active, False otherwise.

`Clear()`

Clear all bond and collision entries for the contact.

`Print()`

Print information about the contact.


-------





-------

[User manual](user_manual.md)
┊ [Previous](ref_peridigm.md)
┊ [Next](ref_shape.md)