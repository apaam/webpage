###

[Example](index.md)
┊ [Previous](index.md)
┊ [Next](blade_mixing.md)

-------

### Random packing

#### Whole script

The script is written in Python and utilizes the `netdem` library to perform a simulation. It sets up a simulation environment with a defined boundary, contact models, triangular meshes, particle packs, walls, gravity, data dumping, and runs the simulation. It is important to note that the script assumes the required `netdem` library is properly installed and accessible in the Python environment. 

```python
import netdem

sim = netdem.Simulation()
sim.domain_manager.SetBound(-0.6, -0.6, -0.6, 0.6, 0.6, 0.6)
sim.domain_manager.SetCellSpacing(0.3, 0.3, 0.3)

cnt_model = netdem.LinearSpring(2.0e6, 1.0e6, 0.7, 0.5)
cnt_model_prt = sim.scene.InsertContactModel(cnt_model)
sim.scene.SetNumberOfMaterials(1)
sim.scene.SetCollisionModel(0, 0, cnt_model_prt)

tri_mesh = netdem.TriMesh()
tri_mesh.InitFromSTL("data/particle_template.stl")
tri_mesh.Decimate(400)
tri_mesh.MakeConvex()
tri_mesh.AlignAxes()
tri_mesh.SetSize(0.1)
tri_mesh_ptr = sim.scene.InsertShape(tri_mesh)

pack_generator = netdem.PackGenerator()
particle_list = pack_generator.GetGridPack(1, 1, 0.2, 0, 0, 0.4, 5, 5, 1, tri_mesh_ptr)
for p in particle_list:
    p.SetVelocity(0, 0, -2.0)

wall_box = netdem.WallBoxPlane(1, 1, 1, 0, 0, 0)
wall_box.ImportToScene(sim.scene)

grav = netdem.Gravity()
grav.Init(sim)
sim.modifier_manager.Insert(grav)
sim.modifier_manager.Enable(grav.label)

data_dumper = netdem.DataDumper()
data_dumper.Init(sim)
data_dumper.SetRootPath("tmp/out/")
data_dumper.SetSaveByCycles(100)
data_dumper.dump_contact_info = True
data_dumper.dump_wall_info = True
data_dumper.SaveShapeInfoAsSTL()
sim.modifier_manager.Insert(data_dumper)
sim.modifier_manager.Enable(data_dumper.label)

for i in range(20):
    sim.scene.InsertParticle(particle_list)
    sim.Run(0.1)

sim.Run(2.0)
```

#### Step-by-step explaination

Below is a detailed documentation of the script, explaining each line and its purpose.

```python
import netdem
```
This line imports the `netdem` module, which contains classes and functions necessary for the simulation.

```python
sim = netdem.Simulation()
```
Creates an instance of the `Simulation` class and assigns it to the variable `sim`. This object will be used to manage the simulation.

```python
sim.domain_manager.SetBound(-0.6, -0.6, -0.6, 0.6, 0.6, 0.6)
```
Sets the boundary of the simulation domain using the `SetBound` method of the `domain_manager` object. The specified coordinates (-0.6, -0.6, -0.6) and (0.6, 0.6, 0.6) define the minimum and maximum bounds of the simulation domain in three dimensions.

```python
sim.domain_manager.SetCellSpacing(0.3, 0.3, 0.3)
```
Sets the cell spacing of the simulation domain using the `SetCellSpacing` method of the `domain_manager` object. The specified values (0.3, 0.3, 0.3) determine the size of each cell in the simulation domain grid.

```python
cnt_model = netdem.LinearSpring(2.0e6, 1.0e6, 0.7, 0.5)
```
Creates an instance of the `LinearSpring` class from the `netdem` module and assigns it to the variable `cnt_model`. This model represents a linear spring with specified parameters: stiffness, damping, restitution, and friction.

```python
cnt_model_prt = sim.scene.InsertContactModel(cnt_model)
```
Inserts the contact model (`cnt_model`) into the simulation scene using the `InsertContactModel` method of the `scene` object. The resulting contact model is assigned to the variable `cnt_model_prt` for later use.

```python
sim.scene.SetNumberOfMaterials(1)
sim.scene.SetCollisionModel(0, 0, cnt_model_prt)
```
Sets the number of materials in the simulation scene to 1 and assigns the contact model (`cnt_model_prt`) to the collision model at index 0. These operations are performed using methods from the `scene` object.

```python
tri_mesh = netdem.TriMesh()
```
Creates an instance of the `TriMesh` class from the `netdem` module and assigns it to the variable `tri_mesh`. This object represents a triangular mesh.

```python
tri_mesh.InitFromSTL("data/particle_template.stl")
```
Initializes the `tri_mesh` object by loading a triangular mesh from an STL file located at "data/particle_template.stl". The provided STL file is used as a template for particles in the simulation.

```python
tri_mesh.Decimate(400)
```
Decimates the loaded triangular mesh, reducing the number of polygons while preserving the overall shape. The size of the decimation is determined by the parameter 400.

```python
tri_mesh.MakeConvex()
```
Converts the triangular mesh into a convex hull representation using the `MakeConvex` method. This step simplifies the geometry and improves simulation performance.

```python
tri_mesh.AlignAxes()
```
Aligns the axes of the triangular mesh using the `AlignAxes` method. This step ensures that the mesh aligns properly with the simulation coordinate system.

```python
tri_mesh.SetSize(0.1)
```
Sets the size of the triangular mesh using the `SetSize` method. The specified value (0.1) determines the new size of the mesh.

```python
tri_mesh_ptr = sim.scene.InsertShape(tri_mesh)
```
Inserts the triangular mesh object into the simulation scene using the `InsertShape` method of the `scene` object. The resulting shape is assigned to the variable `tri_mesh_ptr` for later use.

```python
pack_generator = netdem.PackGenerator()
```
Creates an instance of the `PackGenerator` class and assigns it to the variable `pack_generator`. This object is responsible for generating particle packs in the simulation.

```python
particle_list = pack_generator.GetGridPack(1, 1, 0.2, 0, 0, 0.4, 5, 5, 1, tri_mesh_ptr)
```
Generates a grid-based particle pack using the `GetGridPack` method of the `pack_generator` object. The generated particles are assigned to the `particle_list` variable. The parameters provided determine the number of particles in each dimension of the grid (1 particle in the x-direction, 1 particle in the y-direction), the spacing between particles (0.2), the position of the origin of the grid (0, 0, 0.4), the number of particles in each dimension (5 particles in the x-direction, 5 particles in the y-direction), the height of the particle pack (1), and the shape pointer (`tri_mesh_ptr`) used as a template for the particles.

```python
for p in particle_list:
    p.SetVelocity(0, 0, -2.0)
```
Sets the initial velocity of each particle in the `particle_list` to (0, 0, -2.0) using the `SetVelocity` method. This sets a downward velocity for the particles.

```python
wall_box = netdem.WallBoxPlane(1, 1, 1, 0, 0, 0)
wall_box.ImportToScene(sim.scene)
```
Creates an instance of the `WallBoxPlane` class with specified dimensions (1, 1, 1) and position (0, 0, 0). Then, it imports the wall box object into the simulation scene using the `ImportToScene` method of the `wall_box` object. This creates a box-shaped wall in the simulation.

```python
grav = netdem.Gravity()
grav.Init(sim)
sim.modifier_manager.Insert(grav)
sim.modifier_manager.Enable(grav.label)
```
Creates an instance of the `Gravity` class and assigns it to the variable `grav`. The `Init` method initializes the gravity object using the `sim` simulation object. The gravity object is then inserted into the modifier manager of the simulation and enabled. This ensures that gravity affects the particles in the simulation.

```python
data_dumper = netdem.DataDumper()
data_dumper.Init(sim)
data_dumper.SetRootPath("tmp/out/")
data_dumper.SetSaveByCycles(100)
data_dumper.dump_contact_info = True
data_dumper.dump_wall_info = True
data_dumper.SaveShapeInfoAsSTL()
sim.modifier_manager.Insert(data_dumper)
sim.modifier_manager.Enable(data_dumper.label)
```
Creates an instance of the `DataDumper` class and assigns it to the variable `data_dumper`. The `Init` method initializes the data dumper object using the `sim` simulation object. The following lines specify various settings for the data dumper, such as the root path for saving files ("tmp/out/"), the save frequency (every 100 cycles), and the types of data to be dumped (contact information and wall information). Additionally, the `SaveShapeInfoAsSTL` method is called to enable saving shape information as STL files. Finally, the data dumper object is inserted into the modifier manager of the simulation and enabled.

```python
for i in range(20):
    sim.scene.InsertParticle(particle_list)
    sim.Run(0.1)
```
In a loop that iterates 20 times, particles from the `particle_list` are inserted into the simulation scene using the `InsertParticle` method. Then, the simulation is run for a duration of 0.1 time units using the `Run` method. This loop allows the particles to settle in the simulation before further simulation steps.

```python
sim.Run(2.0)
```
Finally, the simulation is run for a duration of 2.0 time units using the `Run` method. This completes the simulation process.

#### Simulation result


-------

[Example](index.md)
┊ [Previous](index.md)
┊ [Next](blade_mixing.md)