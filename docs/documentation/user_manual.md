###

### User manual

[Installation](installation.md): installation, test, and dependencies, etc.

[Basic usage](basic_usage.md): running simulation, particle shape reconstruction, post-processing, etc.

[Computer tips](computer_tips.md): some useful tips in linux and computer methods, e.g., github token, DNS issue, etc.

[Paraview rendering](paraview_rendering.md): hints and procedures in paraview visualization.

[Blender rendering](blender_rendering.md): hints and procedures in blender visualization.

[CFD-DEM simulation](cfddem_simulation.md): coupled CFD-DEM simulation using OpenFOAM NetDEM.

[Read restart](tips/readrestart.md): restart simulation from saved state, both in DEM and CFD sides.

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

### Python API reference

#### Python API (English)

[dem](python_api_en/ref_dem.md): defines the basic classes for DEM calculations, including contact model, contact solver, etc.

[domain](python_api_en/ref_domain.md): defines classes for domain management, including CellManager, Domain, DomainManager, etc.

[fem](python_api_en/ref_fem.md): for FEM calculations, including TetMesh and Membrane, etc.

[modifier](python_api_en/ref_modifier.md): defines the classes for modifying DEM calculations, such as adding gravity, dumping simulation data, prescribing particle velocities, etc.

[mpi](python_api_en/ref_mpi.md): for exchanging particle information through MPI parallel computing.

[netdem](python_api_en/ref_netdem.md): defines all the basic classes for NetDEM modelling, including utils, fem, dem, domain, peridigm, shape, scene, modifier, mpi, simulation, etc.

[peridigm](python_api_en/ref_peridigm.md): interface to couple with Peridigm for modeling particle breakage.

[scene](python_api_en/ref_scene.md): defines the basic classes for DEM units, including Scene, Particle, Wall, ContactPP, etc.

[shape](python_api_en/ref_shape.md): defines a variety of shapes, including Sphere, Ellipsoid, TriMesh, etc.

[simulation](python_api_en/ref_simulation.md): a class for handling all the resources of a DEM simulation, including domain_manager, mpi_manager, modifier_manager, scene, dem_solver, mech_time, mech_cycles, enable_logging, etc.

[utils](python_api_en/ref_utils.md): other utility classes and functions, including Math, STLReader, STLModel, etc.

#### Python API (中文)

[dem](python_api_cn/dem_api_reference.md)：DEM 接口模块（C++ 核心绑定）

[domain](python_api_cn/domain_api_reference.md)：域管理模块（含并行划分）

[fem](python_api_cn/fem_api_reference.md)：有限元模块（绑定 FEM 数据结构）

[modifier](python_api_cn/modifier_api_reference.md)：修饰器模块（用于添加物理场等）

[mpi](python_api_cn/mpi_api_reference.md)：并行通信模块（MPI 支持）

[netdem](python_api_cn/netdem_api_reference.md)：NetDEM 总入口模块，统一接口封装

[peridigm](python_api_cn/peridigm_api_reference.md)：Peridigm 耦合模块（颗粒破坏模拟）

[scene](python_api_cn/scene_api_reference.md)：场景与粒子定义模块

[shape](python_api_cn/shape_api_reference.md)：几何与形状模块（Sphere, TriMesh 等）

[simulation](python_api_cn/simulation_api_reference.md)：模拟控制模块（顶层入口）

[utils](python_api_cn/utils_api_reference.md)：实用工具模块（数学函数、读写等）