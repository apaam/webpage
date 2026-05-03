---
title: "Basic Usage"
---

## Basic Usage

This guide covers common tasks when working with the Phynexis Python API.

The examples use short `phynexis.<Class>` names where symbols are exposed at package scope for convenience. The canonical layout uses lazily loaded submodules (`phynexis.netdem`, `phynexis.workflow`, …); see the [Python API overview](../python-api/index.md) and adjust imports if your build differs.

### Run a Simulation

A minimal simulation script follows this pattern:

```python
import phynexis

# 1. Create the simulation
sim = phynexis.Simulation()
sim.domain_manager.SetBound(-0.6, -0.6, -0.6, 0.6, 0.6, 0.6)
sim.domain_manager.SetCellSpacing(0.3, 0.3, 0.3)

# 2. Define contact model
cnt_model = phynexis.LinearSpring(2.0e6, 1.0e6, 0.7, 0.5)
cnt_model_prt = sim.scene.InsertContactModel(cnt_model)
sim.scene.SetNumberOfMaterials(1)
sim.scene.SetCollisionModel(0, 0, cnt_model_prt)

# 3. Create particle shape
shape = phynexis.Sphere(0.02)
shape_ptr = sim.scene.InsertShape(shape)

# 4. Generate particles
pack_gen = phynexis.PackGenerator()
particles = pack_gen.GetGridPack(
    0.7, 0.7, 0.1, 0, 0, 0.2, 25, 20, 2, shape_ptr
)
for p in particles:
    p.SetVelocity(0, 0, -2.0)

# 5. Add boundaries
wall_box = phynexis.WallBoxPlane(1, 1, 1, 0, 0, 0)
wall_box.ImportToScene(sim.scene)

# 6. Register modifiers
grav = phynexis.Gravity()
grav.Init(sim)
sim.modifier_manager.Insert(grav)
sim.modifier_manager.Enable(grav.label)

dumper = phynexis.DataDumper()
dumper.Init(sim)
dumper.SetRootPath("tmp/out/")
dumper.SetSaveByCycles(100)
sim.modifier_manager.Insert(dumper)
sim.modifier_manager.Enable(dumper.label)

# 7. Run
sim.Run(2.0)
```

Results are written to the directory specified by `SetRootPath` (default `tmp/out/`) and can be visualized in [ParaView](https://www.paraview.org).

### Data Output and Restart

Configure the `DataDumper` to control what gets saved and how often:

```python
dumper.dump_particle_info = True      # particle positions, velocities
dumper.dump_wall_info = True          # wall positions
dumper.dump_contact_info = True       # contact forces
dumper.dump_shape_info = True         # shape geometry
dumper.SetSaveByTime(0.01)            # save every 0.01 seconds
# or
dumper.SetSaveByCycles(100)           # save every 100 cycles
```

To restart a simulation from a saved state:

```python
sim.scene.AutoReadRestart("tmp/out/", 40000, 0, "json")
sim.SetTimeAndCycles(0, 0)
```

See [Restart and Checkpoint](tips/read-restart.md) for full details.

### Visualization

VTK output from `DataDumper` opens directly in ParaView. Step-by-step recipes (point sprites vs reconstructed meshes, contact tubes, OSPRay, animations) are kept in **[ParaView rendering](paraview-rendering.md)** so this page stays focused on running and checkpointing simulations.

## Post-Processing

A set of Python and MATLAB scripts is available for common post-processing tasks, including VTK I/O, stress–strain curve extraction, and contact fabric analysis. Contact the authors to request access to the post-processing toolkit.
