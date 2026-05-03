---
title: "Random packing"
description: "Rain-fall packing of irregular particles using STL templates."
---

## Random packing

Related guides: [Basic usage](../manual/basic-usage.md), [Python API overview](../python-api/index.md).

This example demonstrates how to perform a random packing simulation of irregular-shaped particles using the rain-falling approach. Particles are generated in a grid pattern above a container and fall under gravity to form a dense packing.

### Whole script

```python
import phynexis

sim = phynexis.Simulation()
sim.domain_manager.SetBound(-0.6, -0.6, -0.6, 0.6, 0.6, 0.6)
sim.domain_manager.SetCellSpacing(0.3, 0.3, 0.3)

cnt_model = phynexis.LinearSpring(2.0e6, 1.0e6, 0.7, 0.5)
cnt_model_prt = sim.scene.InsertContactModel(cnt_model)
sim.scene.SetNumberOfMaterials(1)
sim.scene.SetCollisionModel(0, 0, cnt_model_prt)

tri_mesh = phynexis.TriMesh()
tri_mesh.InitFromSTL("data/particle_template.stl")
tri_mesh.Decimate(400)
tri_mesh.MakeConvex()
tri_mesh.AlignAxes()
tri_mesh.SetSize(0.1)
tri_mesh_ptr = sim.scene.InsertShape(tri_mesh)

pack_generator = phynexis.PackGenerator()
particle_list = pack_generator.GetGridPack(1, 1, 0.2, 0, 0, 0.4, 5, 5, 1, tri_mesh_ptr)
for p in particle_list:
    p.SetVelocity(0, 0, -2.0)

wall_box = phynexis.WallBoxPlane(1, 1, 1, 0, 0, 0)
wall_box.ImportToScene(sim.scene)

grav = phynexis.Gravity()
grav.Init(sim)
sim.modifier_manager.Insert(grav)
sim.modifier_manager.Enable(grav.label)

data_dumper = phynexis.DataDumper()
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

### Step-by-step explanation

**Simulation setup.** A `Simulation` instance is created and the computational domain is defined as a box centered at the origin with bounds `[-0.6, 0.6]` in each dimension. The cell spacing for the linked-cell contact detection is set to `0.3`.

**Contact model.** A linear spring contact model is defined with stiffness `2.0e6`, damping `1.0e6`, restitution `0.7`, and friction `0.5`. It is inserted into the scene and assigned as the collision model for material pair `(0, 0)`.

**Particle shape.** A triangular mesh is loaded from an STL template file, decimated to 400 facets, converted to a convex hull, and aligned to principal axes. The mesh is then scaled to a characteristic size of `0.1` and registered in the scene.

**Particle generation and initialization.** A grid-based pack generator creates particles arranged in a 5×5 grid with spacing `0.2` and height `1.0`, positioned at `z = 0.4`. Each particle is assigned an initial downward velocity of `2.0` to accelerate the rain-falling process.

**Boundary conditions.** A box-shaped wall (`WallBoxPlane`) is created to confine the particles and imported into the scene.

**Gravity and data output.** A gravity modifier is initialized and enabled. A `DataDumper` is configured to save particle, wall, and contact data every 100 cycles to `tmp/out/`. Shape information is also exported as STL files for visualization.

**Execution.** The simulation runs in two stages: particles are injected in batches of 20 over `0.1` time units each, followed by a relaxation phase of `2.0` time units to allow the packing to settle.

### Simulation result

