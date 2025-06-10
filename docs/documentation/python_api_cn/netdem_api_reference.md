# NetDEM Python API 参考文档

本文档提供了NetDEM软件的Python API接口说明，这些接口通过pybind11从C++代码绑定到Python。

## 模块划分

NetDEM的Python API分为以下十个模块：

1. [基础模块](base_api_reference.md)：包含基本的几何和物理对象，如向量、矩阵、颗粒、墙体等。
2. [FEM模块](fem_api_reference.md)：包含有限元相关的类，用于模拟可变形物体。
3. [Modifier模块](modifier_api_reference.md)：包含各种修改器，用于数据导出、力和运动控制、边界条件和分析工具。
4. [MPI模块](mpi_api_reference.md)：包含并行计算相关的类，用于大规模离散元模拟。
5. [PeriDigm模块](peridigm_api_reference.md)：包含近场动力学相关的类，用于模拟物体断裂和破碎。
6. [Scene模块](scene_api_reference.md)：包含场景管理相关的类，用于管理颗粒、墙体、形状和接触。
7. [Shape模块](shape_api_reference.md)：包含各种几何形状的定义和操作，为离散元模拟提供几何表示。
8. [Simulation模块](simulation_api_reference.md)：包含模拟管理相关的类，用于控制和执行整个DEM模拟过程。
9. [Solver模块](solver_api_reference.md)：包含求解器相关的类，用于模拟系统的动力学演化。
10. [Utils模块](utils_api_reference.md)：包含各种实用工具类和函数，为其他模块提供基础功能支持。

## 基础模块

基础模块包含了NetDEM中最基本的数据结构和功能类。详细信息请参考[基础模块文档](base_api_reference.md)。

## FEM模块

FEM模块提供了有限元分析相关的功能。详细信息请参考[FEM模块文档](fem_api_reference.md)。

## Modifier模块

Modifier模块包含了各种用于控制和分析模拟过程的工具。详细信息请参考[Modifier模块文档](modifier_api_reference.md)。

## MPI模块

MPI模块提供了并行计算相关的功能，用于支持大规模离散元模拟。目前主要包含：

- `MPIManager`类：用于管理MPI进程，提供进程间通信和数据同步功能
- 获取当前进程的等级和进程总数的方法
- 进程间数据同步功能

详细信息请参考[MPI模块文档](mpi_api_reference.md)。

## PeriDigm模块

PeriDigm模块实现了基于近场动力学的物体断裂和破碎模拟功能。主要包含：

- 域离散化工具（`DomainSplittor`、`LevelSetSplittor`和`TetMeshSplittor`）
- 材料和损伤模型（`PeriDigmMaterial`和`PeriDigmDamageModel`）
- 边界条件和计算块（`PeriDigmBoundaryCondition`和`PeriDigmBlock`）
- 模拟器和DEM耦合（`PeriDigmSimulator`和`PeriDigmDEMCoupler`）

详细信息请参考[PeriDigm模块文档](peridigm_api_reference.md)。

## Scene模块

Scene模块是NetDEM的核心部分，负责管理模拟中的所有元素。主要包含：

- 场景管理（`Scene`类，管理颗粒、墙体、形状和接触）
- 颗粒和墙体（`Particle`、`Wall`及其衍生类）
- 接触处理（`ContactPP`和`ContactPW`类）
- 颗粒生成工具（`PackGenerator`、`BondedSpheres`和`BondedVoronois`类）

详细信息请参考[Scene模块文档](scene_api_reference.md)。

## Shape模块

Shape模块提供了丰富的几何形状定义和操作功能，为模拟中的颗粒和墙体提供几何表示。主要包含：

- 基础形状类（`Shape`类及其衍生类）
- 简单形状（`Sphere`、`Plane`、`Triangle`、`Cylinder`、`Ellipsoid`等）
- 复杂形状（`SphericalHarmonics`、`PolySuperEllipsoid`、`TriMesh`等）
- 隐式形状表示（`LevelSet`、`NetSDF`等）

详细信息请参考[Shape模块文档](shape_api_reference.md)。

## Simulation模块

Simulation模块是NetDEM的顶层模块，负责管理和执行整个离散元模拟过程。主要包含：

- 模拟管理（`Simulation`类，整合所有必要的组件）
- 场景和求解器管理
- 并行计算支持
- 修改器系统集成
- 模拟状态控制

详细信息请参考[Simulation模块文档](simulation_api_reference.md)。

## Solver模块

Solver模块包含了各种求解器，用于模拟颗粒系统的动力学行为。详细信息请参考[Solver模块文档](solver_api_reference.md)。

## Utils模块

Utils模块提供了各种实用工具类和函数，为其他模块提供基础功能支持。主要包含：

- 数学工具（`Math`子模块，提供数学常量和函数）
- 几何处理（`STLModel`、`LevelSetFunction`等，用于处理3D模型和隐式几何）
- 网格生成（`WSCVTSampler`、`Voronoi`等，用于生成高质量的点分布和网格）
- 布尔运算（`CorkWrapper`，用于进行网格布尔运算）

详细信息请参考[Utils模块文档](utils_api_reference.md)。

请点击上述链接查看各模块的详细API说明。 