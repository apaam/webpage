###

[Example](index.md)
┊ [Previous](random_packing.md)
┊ [Next](index.md)

-------

### Blade mixing

#### Whole script

The code is a C++ implementation of a simulation using the netdem library. It sets up a simulation environment, including the simulation domain, contact model, shapes, walls, gravity, data dumping, and runs the simulation.

```cpp
#include "data_dumper.hpp"
#include "gen_pack.hpp"
#include "gen_wall_box_plane.hpp"
#include "gravity.hpp"
#include "model_linear_spring.hpp"
#include "shape_cylinder.hpp"
#include "shape_sphere.hpp"
#include "shape_triangle.hpp"
#include "simulation.hpp"
#include <iostream>
#include <unordered_map>
using namespace netdem;
using namespace std;

void ImportWall(Simulation *sim) {
  STLModel cylinder_stl;
  cylinder_stl.InitFromSTL("data/cylinder.stl");
  for (auto &vert : cylinder_stl.vertices) {
    vert[2] *= 0.5;
  }
  cylinder_stl.SaveAsSTL("tmp/tests/cylinder_outer.stl");
  for (auto &facet : cylinder_stl.facets) {
    Triangle triangle(cylinder_stl.vertices[facet[0]],
                      cylinder_stl.vertices[facet[1]],
                      cylinder_stl.vertices[facet[2]]);
    auto shape_ptr = sim->scene.InsertShape(&triangle);
    Wall wall(shape_ptr);
    sim->scene.InsertWall(wall);
  }

  for (auto &vert : cylinder_stl.vertices) {
    vert[0] *= 0.15;
    vert[1] *= 0.15;
    vert[2] *= 0.64;
    vert[2] -= 0.10;
  }
  cylinder_stl.SaveAsSTL("tmp/tests/cylinder_inner.stl");
  for (auto &facet : cylinder_stl.facets) {
    Triangle triangle(cylinder_stl.vertices[facet[0]],
                      cylinder_stl.vertices[facet[1]],
                      cylinder_stl.vertices[facet[2]]);
    auto shape_ptr = sim->scene.InsertShape(&triangle);
    Wall wall(shape_ptr);
    sim->scene.InsertWall(wall);
  }

  STLModel propeller_stl;
  propeller_stl.InitFromSTL("data/copyleft/propeller.stl");
  propeller_stl.Standardize();
  for (auto &vert : propeller_stl.vertices) {
    vert[0] *= 0.14;
    vert[1] *= 0.14;
    vert[2] *= 0.8;
    vert[2] -= 0.075;
  }
  propeller_stl.SaveAsSTL("tmp/tests/propeller.stl");
  for (auto &facet : propeller_stl.facets) {
    Triangle triangle(propeller_stl.vertices[facet[0]],
                      propeller_stl.vertices[facet[1]],
                      propeller_stl.vertices[facet[2]]);
    triangle.skin *= 10.0;
    auto shape_ptr = sim->scene.InsertShape(&triangle);
    Wall wall;
    wall.SetShape(shape_ptr, true);
    wall.SetVelocitySpin(0, 0, -2.0 * Math::PI);
    sim->scene.InsertWall(wall);
  }
}

int main(int argc, char **argv) {
  Simulation *sim = new Simulation();

  sim->domain_manager.SetBound(-0.6, -0.6, -0.6, 0.6, 0.6, 0.6);
  sim->domain_manager.SetCellSpacing(0.2, 0.2, 0.2);

  LinearSpring cnt_model = LinearSpring(1.0e4, 1.0e4, 0.7, 0.5);
  sim->scene.InsertContactModel(&cnt_model);
  sim->scene.SetNumberOfMaterials(1);
  sim->scene.SetCollisionModel(0, 0, cnt_model.label);

  Sphere sphere = Sphere(0.02);
  sphere.skin *= 1.0;
  auto shape_ptr = sim->scene.InsertShape(&sphere);

  VecXT<Particle> particle_list = PackGenerator::GetGridPack(
      0.7, 0.7, 0.1, 0, 0, 0.2, 25, 20, 2, sim->scene.GetShapes());
  for (auto &p : particle_list) {
    p.SetVelocity(0, 0, -2.0);
  }

  ImportWall(sim);

  Gravity grav;
  grav.Init(sim);
  sim->modifier_manager.Insert(&grav);
  sim->modifier_manager.Enable(grav.label);

  DataDumper data_dumper;
  data_dumper.Init(sim);
  data_dumper.SetRootPath("tmp/out/");
  data_dumper.SetSaveByCycles(100);
  data_dumper.dump_wall_info = true;
  data_dumper.dump_shape_info = true;
  sim->modifier_manager.Insert(&data_dumper);
  sim->modifier_manager.Enable(data_dumper.label);

  for (int i = 0; i < 20; i++) {
    sim->scene.InsertParticle(particle_list);
    sim->Run(0.1);
  }
  sim->Run(2.0);

  delete sim;
}
```

#### Step-by-step explaination

Here's a breakdown of the code:

```cpp
void ImportWall(Simulation *sim) {
  // ...
}
```
This function defines the `ImportWall` function, which is used to import wall shapes into the simulation. The walls are created based on STL models and inserted into the simulation scene.

```cpp
int main(int argc, char **argv) {
  Simulation *sim = new Simulation();
```
The `main` function initializes a new `Simulation` object and assigns it to the `sim` pointer.

```cpp
  sim->domain_manager.SetBound(-0.6, -0.6, -0.6, 0.6, 0.6, 0.6);
  sim->domain_manager.SetCellSpacing(0.2, 0.2, 0.2);
```
The boundary and cell spacing of the simulation domain are set using the methods `SetBound` and `SetCellSpacing` of the `domain_manager` object.

```cpp
  LinearSpring cnt_model = LinearSpring(1.0e4, 1.0e4, 0.7, 0.5);
  sim->scene.InsertContactModel(&cnt_model);
  sim->scene.SetNumberOfMaterials(1);
  sim->scene.SetCollisionModel(0, 0, cnt_model.label);
```
A linear spring contact model is created and inserted into the simulation scene using the `InsertContactModel` method of the `scene` object. The number of materials in the scene is set to 1, and the collision model at index 0 is updated with the label of the contact model.

```cpp
  Sphere sphere = Sphere(0.02);
  sphere.skin *= 1.0;
  auto shape_ptr = sim->scene.InsertShape(&sphere);
```
A sphere shape is created and inserted into the simulation scene using the `InsertShape` method of the `scene` object. The sphere's skin (radius) is adjusted, and the resulting shape pointer is stored for later use.

```cpp
  VecXT<Particle> particle_list = PackGenerator::GetGridPack(
      0.7, 0.7, 0.1, 0, 0, 0.2, 25, 20, 2, sim->scene.GetShapes());
  for (auto &p : particle_list) {
    p.SetVelocity(0, 0, -2.0);
  }
```
A grid-based particle pack is generated using the `GetGridPack` method of the `PackGenerator` class. The parameters provided determine the position, size, and layout of the particles in the grid. The initial velocity of each particle in the pack is set to move downward.

```cpp
  ImportWall(sim);
```
The `ImportWall` function is called to import wall shapes into the simulation.

```cpp
  Gravity grav;
  grav.Init(sim);
  sim->modifier_manager.Insert(&grav);
  sim->modifier_manager.Enable(grav.label);
```
A gravity modifier is created, initialized with the simulation object, inserted into the modifier manager, and enabled.

```cpp
  DataDumper data_dumper;
  data_dumper.Init(sim);
  data_dumper.SetRootPath("tmp/out/");
  data_dumper.SetSaveByCycles(100);
  data_dumper.dump_wall_info = true;
  data_dumper.dump_shape_info = true;
  sim->modifier_manager.Insert(&data_dumper);
  sim->modifier_manager.Enable(data_dumper.label);
```
A data dumper object is created, initialized with the simulation object, and configured to save data by cycles. The root path for saving files is set, and options for dumping wall and shape information are enabled. The data dumper object is then inserted into the modifier manager and enabled.

```cpp
  for (int i = 0; i < 20; i++) {
    sim->scene.InsertParticle(particle_list);
    sim->Run(0.1);
  }
  sim->Run(2.0);

  delete sim;
}
```
A loop is used to insert particles from the particle list into the simulation scene, and the simulation is run for a duration of 0.1 time units. This loop allows the particles to settle in the simulation before further simulation steps. After the loop, the simulation is run for an additional 2.0 time units. Finally, the `sim` pointer is deleted to free the memory.

#### Simulation result


-------

[Example](index.md)
┊ [Previous](random_packing.md)
┊ [Next](index.md)