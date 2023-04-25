###

### User manual

[Installation](installation.md): installation, test, and dependencies, etc.

[Basic usage](basic_usage.md): running simulation, particle shape reconstruction, post-processing, etc.

[Paraview rendering](paraview_rendering.md): hints and procedures in paraview visualization.

[Blender rendering](blender_rendering.md): hints and procedures in blender visualization.

[CFD-DEM simulation](cfddem_simulation.md): coupled CFD-DEM simulation using OpenFOAM NetDEM.

### Class reference

[dem](ref_dem.md): defines the basic classes for dem calculations, including contact model, contact solver, etc.

[domain](ref_domain.md):defines the basic classes for domain manager, including CellManager, Domain, DomainManager.

[fem](ref_fem.md): defines the basic classes for FEM calculations, including TetMesh and Membrane.

[modifier](ref_modifier.md): defines the bas

[mpi](ref_mpi.md): defines a class `MPIManager` for the MPI parallel. 

[netdem](ref_netdem.md): defines all the basic classes for NetDEM modelling, including utils, fem, dem, domain, peridigm, shape, scene, modifier, mpi, simulation.

[peridigm](ref_peridigm.md): defines the basic classes for DEM Peridigms, including Simulatior, DEMCoupler, etc.

[scene](ref_scene.md): defines the basic classes for DEM units, including Scene, Particle, Wall, ContactPP, etc.

[shape](ref_shape.md): defines the basic classes for DEM different shapes, including Sphere, Ellipsoid, TriMesh, etc. 

[simulation](ref_simulation.md): declares the basic simulation classes for the simulation, incluidng domain_manager, mpi_manager, modifier_manager, scene, dem_solver, mech_time, mech_cycles, enable_logging.

[utils](ref_utils.md): defines the basic classes for calculation, including Math, STLReader, STLModel, etc.

