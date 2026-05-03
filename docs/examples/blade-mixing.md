---
title: "Blade mixing"
description: "Rotating blade mixer with STL-imported walls and blade geometry."
---

## Blade mixing

Related guides: [Basic usage](../manual/basic-usage.md), [Python API overview](../python-api/index.md).

This example demonstrates a blade mixing simulation where spherical particles are agitated inside a cylindrical mixer driven by a rotating propeller blade. The mixer walls and blade geometry are imported from STL files and converted into boundary walls.

### Whole script

```python
import phynexis
import math


def import_walls(sim):
    # Outer cylinder
    cylinder_stl = phynexis.STLModel()
    cylinder_stl.InitFromSTL("data/cylinder.stl")
    for vert in cylinder_stl.vertices:
        vert[2] *= 0.5
    for facet in cylinder_stl.facets:
        tri = phynexis.Triangle(
            cylinder_stl.vertices[facet[0]],
            cylinder_stl.vertices[facet[1]],
            cylinder_stl.vertices[facet[2]],
        )
        shape_ptr = sim.scene.InsertShape(tri)
        wall = phynexis.Wall(shape_ptr)
        sim.scene.InsertWall(wall)

    # Inner cylinder
    for vert in cylinder_stl.vertices:
        vert[0] *= 0.15
        vert[1] *= 0.15
        vert[2] *= 0.64
        vert[2] -= 0.10
    for facet in cylinder_stl.facets:
        tri = phynexis.Triangle(
            cylinder_stl.vertices[facet[0]],
            cylinder_stl.vertices[facet[1]],
            cylinder_stl.vertices[facet[2]],
        )
        shape_ptr = sim.scene.InsertShape(tri)
        wall = phynexis.Wall(shape_ptr)
        sim.scene.InsertWall(wall)

    # Rotating propeller
    propeller_stl = phynexis.STLModel()
    propeller_stl.InitFromSTL("data/copyleft/propeller.stl")
    propeller_stl.Standardize()
    for vert in propeller_stl.vertices:
        vert[0] *= 0.14
        vert[1] *= 0.14
        vert[2] *= 0.8
        vert[2] -= 0.075
    for facet in propeller_stl.facets:
        tri = phynexis.Triangle(
            propeller_stl.vertices[facet[0]],
            propeller_stl.vertices[facet[1]],
            propeller_stl.vertices[facet[2]],
        )
        tri.skin *= 10.0
        shape_ptr = sim.scene.InsertShape(tri)
        wall = phynexis.Wall()
        wall.SetShape(shape_ptr, True)
        wall.SetVelocitySpin(0, 0, -2.0 * math.pi)
        sim.scene.InsertWall(wall)


# Simulation setup
sim = phynexis.Simulation()
sim.domain_manager.SetBound(-0.6, -0.6, -0.6, 0.6, 0.6, 0.6)
sim.domain_manager.SetCellSpacing(0.2, 0.2, 0.2)

# Contact model
cnt_model = phynexis.LinearSpring(1.0e4, 1.0e4, 0.7, 0.5)
sim.scene.InsertContactModel(cnt_model)
sim.scene.SetNumberOfMaterials(1)
sim.scene.SetCollisionModel(0, 0, cnt_model.label)

# Particle shape
sphere = phynexis.Sphere(0.02)
sphere.skin *= 1.0
shape_ptr = sim.scene.InsertShape(sphere)

# Particle generation
particle_list = phynexis.PackGenerator().GetGridPack(
    0.7, 0.7, 0.1, 0, 0, 0.2, 25, 20, 2, sim.scene.GetShapes()
)
for p in particle_list:
    p.SetVelocity(0, 0, -2.0)

# Import mixer geometry
import_walls(sim)

# Gravity
grav = phynexis.Gravity()
grav.Init(sim)
sim.modifier_manager.Insert(grav)
sim.modifier_manager.Enable(grav.label)

# Data output
dumper = phynexis.DataDumper()
dumper.Init(sim)
dumper.SetRootPath("tmp/out/")
dumper.SetSaveByCycles(100)
dumper.dump_wall_info = True
dumper.dump_shape_info = True
sim.modifier_manager.Insert(dumper)
sim.modifier_manager.Enable(dumper.label)

# Run
for i in range(20):
    sim.scene.InsertParticle(particle_list)
    sim.Run(0.1)
sim.Run(2.0)
```

### Step-by-step explanation

**Wall geometry import.** The `import_walls` function reads a cylindrical mixer STL and constructs the boundary from triangular facets. The outer cylinder is scaled to half height in the z-direction. An inner cylinder is created by further scaling and translating the same mesh downward. A propeller STL is loaded, standardized, scaled, and converted into a rotating wall with angular velocity $-2\pi$ rad/s about the z-axis.

**Simulation setup.** A `Simulation` instance is created with domain bounds $[-0.6, 0.6]^3$ and cell spacing `0.2` for contact detection.

**Contact model and particle shape.** A linear spring contact model is created and assigned to the single material in the scene. A spherical particle shape with radius `0.02` is inserted.

**Particle generation.** A grid pack of $25 \times 20 \times 2$ particles is generated and initialized with a downward velocity of `2.0`.

**Physics and output.** Gravity is added via a modifier. A `DataDumper` is configured to export wall and shape data every 100 cycles to `tmp/out/`.

**Execution.** Particles are injected in 20 batches over `0.1` time units each, followed by a `2.0` time-unit relaxation phase to allow the mixture to evolve under blade agitation.

### Simulation result

