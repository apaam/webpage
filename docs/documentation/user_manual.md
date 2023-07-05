###

### User manual

[Installation](installation.md): installation, test, and dependencies, etc.

[Basic usage](basic_usage.md): running simulation, particle shape reconstruction, post-processing, etc.

[Computer tips](computer_tips.md): some useful tips in linux and computer methods, e.g., github token, DNS issue, etc.

[Paraview rendering](paraview_rendering.md): hints and procedures in paraview visualization.

[Blender rendering](blender_rendering.md): hints and procedures in blender visualization.

[CFD-DEM simulation](cfddem_simulation.md): coupled CFD-DEM simulation using OpenFOAM NetDEM.

### Python API reference

[dem](ref_dem.md): defines the basic classes for dem calculations, including contact model, contact solver, etc.

[domain](ref_domain.md):defines classes for domain management, including CellManager, Domain, DomainManager, etc.

[fem](ref_fem.md): for FEM calculations, including TetMesh and Membrane, etc.

[modifier](ref_modifier.md): defines the classes for modify DEM calculations, such as adding gravity, dumping simulation data, prescribing particle velocities, etc.

[mpi](ref_mpi.md): for exchanging particle information through MPI parallel computing. 

[netdem](ref_netdem.md): defines all the basic classes for NetDEM modelling, including utils, fem, dem, domain, peridigm, shape, scene, modifier, mpi, simulation, etc.

[peridigm](ref_peridigm.md): interface to couple with peridigm for modeling particle breakage.

[scene](ref_scene.md): defines the basic classes for DEM units, including Scene, Particle, Wall, ContactPP, etc.

[shape](ref_shape.md): defines a variety of shapes, including Sphere, Ellipsoid, TriMesh, etc. 

[simulation](ref_simulation.md): a class for handling all the resources of a DEM simulation, incluidng domain_manager, mpi_manager, modifier_manager, scene, dem_solver, mech_time, mech_cycles, enable_logging, etc.

[utils](ref_utils.md): other ultility classes and functions, including Math, STLReader, STLModel, etc.

