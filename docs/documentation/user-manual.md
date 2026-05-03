## User manual

- [Installation](installation.md): installation, tests, and dependencies.
- [Basic usage](basic-usage.md): running a simulation, particle shape reconstruction, post-processing, etc.
- [Computer tips](computer-tips.md): useful Linux/computer tips, e.g., GitHub token, DNS issues, etc.
- [ParaView rendering](paraview-rendering.md): hints and procedures for ParaView visualization.
- [Blender rendering](blender-rendering.md): hints and procedures for Blender visualization.
- [CFD-DEM simulation](cfddem-simulation.md): coupled CFD-DEM simulation using OpenFOAM and Phynexis.
- [Read restart](tips/read-restart.md): restart simulation from saved state, both on the DEM and CFD sides.

## Python API reference

- [dem](python-api/ref-dem.md): basic classes for DEM calculations, including contact model, contact solver, etc.
- [domain](python-api/ref-domain.md): classes for domain management, including CellManager, Domain, DomainManager, etc.
- [fem](python-api/ref-fem.md): FEM calculations, including TetMesh and Membrane.
- [modifier](python-api/ref-modifier.md): classes for modifying DEM calculations, such as adding gravity, dumping simulation data, prescribing particle velocities, etc.
- [mpi](python-api/ref-mpi.md): exchanging particle information through MPI parallel computing.
- [netdem](python-api/ref-netdem.md): top-level module that exposes utils, fem, dem, domain, peridigm, shape, scene, modifier, mpi, simulation, etc.
- [peridigm](python-api/ref-peridigm.md): interface to couple with Peridigm for modeling particle breakage.
- [scene](python-api/ref-scene.md): basic classes for DEM units, including Scene, Particle, Wall, ContactPP, etc.
- [shape](python-api/ref-shape.md): shape templates, including Sphere, Ellipsoid, TriMesh, etc.
- [simulation](python-api/ref-simulation.md): a class for handling all the resources of a DEM simulation, including domain_manager, mpi_manager, modifier_manager, scene, dem_solver, mech_time, mech_cycles, enable_logging, etc.
- [utils](python-api/ref-utils.md): utility classes and functions, including Math, STLReader, STLModel, etc.
