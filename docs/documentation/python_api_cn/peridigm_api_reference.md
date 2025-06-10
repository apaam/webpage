# NetDEM Python API 参考文档 - PeriDigm模块

本文档提供了NetDEM软件中PeriDigm相关的Python API接口说明。这些接口用于支持基于近场动力学（Peridynamics）的物体断裂和破碎模拟。

## 目录

- [DomainSplittor](#domainsplittor)
- [LevelSetSplittor](#levelsetsplittor)
- [TetMeshSplittor](#tetmeshsplittor)
- [PeriDigmDiscretization](#peridigmdiscretization)
- [PeriDigmMaterial](#peridigmmaterial)
- [PeriDigmDamageModel](#peridigmdamagemodel)
- [PeriDigmBlock](#peridigmblock)
- [PeriDigmBoundaryCondition](#peridigmboundarycondition)
- [PeriDigmSettings](#peridigmsettings)
- [DEMFragment](#demfragment)
- [PeriDigmStrength](#peridigmstrength)
- [PeriDigmSimulator](#peridigmsimulator)
- [PeriDigmDEMCoupler](#peridigmdemcoupler)

## DomainSplittor

`DomainSplittor`是域划分器的基类，用于将计算域分割成适合近场动力学计算的节点。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `InitFromSTL` | `stl_file: str, resolution: int` | - | 从STL文件初始化域划分器 |

## LevelSetSplittor

`LevelSetSplittor`是基于水平集方法的域划分器，继承自`DomainSplittor`。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的LevelSetSplittor实例 |
| `InitFromDistanceMap` | `distance_map_file: str` | - | 从距离图文件初始化水平集 |
| `InitFromDistanceMap` | `min_x: float, min_y: float, min_z: float, grid_size: float, nx: int, ny: int, nz: int, distance_values: VecXT<double>` | - | 从距离值数组初始化水平集 |
| `InitFromSTL` | `stl_model: STLModel, resolution: int` | - | 从STL模型初始化水平集 |
| `GetPeriDigmNodes` | 无 | `tuple[VecXT<Vec3d>, VecXT<double>]` | 获取PeriDigm节点和体积 |
| `MakePorosity` | 无 | - | 生成多孔结构 |
| `GetSTLModel` | 无 | `STLModel` | 获取STL模型 |
| `GetSTLModel` | `indices: VecXT<int>` | `STLModel` | 根据索引获取STL模型的子集 |

## TetMeshSplittor

`TetMeshSplittor`是基于四面体网格的域划分器，继承自`DomainSplittor`。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的TetMeshSplittor实例 |
| `InitFromSTL` | `stl_model: STLModel, resolution: int` | - | 从STL模型初始化四面体网格 |
| `GetPeriDigmNodes` | 无 | `tuple[VecXT<Vec3d>, VecXT<double>]` | 获取PeriDigm节点和体积 |
| `MakePorosity` | 无 | - | 生成多孔结构 |
| `GetSTLModel` | 无 | `STLModel` | 获取STL模型 |
| `GetSTLModel` | `indices: VecXT<int>` | `STLModel` | 根据索引获取STL模型的子集 |

## PeriDigmDiscretization

`PeriDigmDiscretization`用于管理PeriDigm的空间离散化。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `type` | `PeriDigmDiscretization.Type` | 离散化类型（level_set或tetmesh） |
| `domain_splittor` | `DomainSplittor` | 域划分器 |
| `nodes` | `VecXT<Vec3d>` | 节点坐标列表 |
| `node_block_indices` | `VecXT<int>` | 节点块索引 |
| `node_vols` | `VecXT<double>` | 节点体积 |

### 枚举

| 枚举值 | 描述 |
|--------|------|
| `Type.level_set` | 基于水平集的离散化 |
| `Type.tetmesh` | 基于四面体网格的离散化 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的PeriDigmDiscretization实例 |
| `InitFromSTL` | `stl_file: str, resolution: int` | - | 从STL文件初始化离散化 |
| `InitFromSTL` | `stl_model: STLModel, resolution: int` | - | 从STL模型初始化离散化 |
| `InitFromDistanceMap` | `distance_map_file: str` | - | 从距离图文件初始化离散化 |
| `InitFromGrid` | 无 | - | 从网格初始化离散化 |
| `MakePorosity` | 无 | - | 生成多孔结构 |
| `WriteInputFile` | `file_name: str` | - | 将节点信息写入输入文件 |
| `GetNodeSize` | 无 | `float` | 获取平均节点大小 |

## PeriDigmMaterial

`PeriDigmMaterial`用于定义PeriDigm中的材料属性。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `type` | `PeriDigmMaterial.Type` | 材料类型 |
| `density` | `float` | 材料密度 |
| `youngs_modulus` | `float` | 杨氏模量 |
| `poissons_ratio` | `float` | 泊松比 |

### 枚举

| 枚举值 | 描述 |
|--------|------|
| `Type.Elastic` | 弹性材料 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的PeriDigmMaterial实例 |
| `WriteInputFile` | `file_name: str` | - | 将材料属性写入输入文件 |

## PeriDigmDamageModel

`PeriDigmDamageModel`用于定义PeriDigm中的损伤模型。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `type` | `str` | 损伤模型类型 |
| `critical_stretch` | `float` | 临界拉伸值 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的PeriDigmDamageModel实例 |
| `InitFromEnergyReleaseRate` | `energy_release_rate: float, horizon: float, bulk_modulus: float` | - | 从能量释放率初始化损伤模型 |
| `GetStretchFromEnergyReleaseRate` | `energy_release_rate: float, horizon: float, bulk_modulus: float` | `float` | 从能量释放率计算临界拉伸值 |
| `WriteInputFile` | `file_name: str` | - | 将损伤模型写入输入文件 |

## PeriDigmBlock

`PeriDigmBlock`用于定义PeriDigm中的计算块。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `node_indices` | `VecXT<int>` | 节点索引列表 |
| `material_id` | `int` | 材料ID |
| `damage_model_id` | `int` | 损伤模型ID |
| `horizon` | `float` | 近场动力学视界半径 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的PeriDigmBlock实例 |
| `WriteInputFile` | `file_name: str` | - | 将块配置写入输入文件 |

## PeriDigmBoundaryCondition

`PeriDigmBoundaryCondition`用于定义PeriDigm中的边界条件。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `type` | `PeriDigmBoundaryCondition.Type` | 边界条件类型 |
| `node_indices` | `VecXT<int>` | 边界节点索引 |
| `dim_activated` | `Vec3i` | 激活的维度（xyz方向） |
| `disp_rate` | `Vec3d` | 位移速率 |
| `loading_rate` | `Vec3d` | 载荷速率 |
| `disp` | `Vec3d` | 最终位移 |
| `loading` | `Vec3d` | 最终载荷 |
| `mech_time` | `float` | 机械加载时间 |

### 枚举

| 枚举值 | 描述 |
|--------|------|
| `Type.Prescribed_Displacement` | 预设位移边界条件 |
| `Type.Body_Force` | 体力边界条件 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的PeriDigmBoundaryCondition实例 |
| `InsertNode` | `node_id: int` | - | 添加边界节点 |
| `SetActivatedDimensions` | `activated: Vec3i` | - | 设置激活的维度 |
| `SetByDisplacementRate` | `disp_rate: Vec3d, mech_time: float` | - | 通过位移速率设置边界条件 |
| `SetByLoadingRate` | `loading_rate: Vec3d, mech_time: float` | - | 通过载荷速率设置边界条件 |
| `SetByUltimateDisplacement` | `disp: Vec3d, mech_time: float` | - | 通过最终位移设置边界条件 |
| `SetByUltimateLoading` | `loading: Vec3d, mech_time: float` | - | 通过最终载荷设置边界条件 |
| `WriteInputFile` | `file_name: str` | - | 将边界条件写入输入文件 |

## PeriDigmSettings

`PeriDigmSettings`用于配置PeriDigm求解器的参数。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `result_dir` | `str` | 结果目录 |
| `peridigm_exe` | `str` | PeriDigm可执行文件路径 |
| `horizon_factor` | `float` | 视界因子 |
| `use_auto_timestep` | `bool` | 是否自动计算时间步长 |
| `timestep` | `float` | 时间步长 |
| `timestep_factor` | `float` | 时间步长因子 |
| `mech_time` | `float` | 机械加载时间 |
| `loading_radius_factor` | `float` | 载荷半径因子 |
| `constrain_radius_factor` | `float` | 约束半径因子 |
| `output_freqency` | `int` | 输出频率 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的PeriDigmSettings实例 |
| `WriteInputFile` | `file_name: str` | - | 将设置写入输入文件 |

## DEMFragment

`DEMFragment`表示离散元破碎后的碎片。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `shape_type` | `str` | 形状类型 |
| `sphere_size` | `float` | 球体大小 |
| `stl_model` | `STLModel` | STL模型 |
| `vel` | `Vec3d` | 碎片速度 |
| `spin` | `Vec3d` | 碎片旋转速度 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的DEMFragment实例 |
| `InitLevelSet` | 无 | - | 初始化水平集 |
| `ResolverOverlap` | 无 | - | 解决重叠问题 |
| `ReInitSTLModel` | 无 | - | 重新初始化STL模型 |

## PeriDigmStrength

`PeriDigmStrength`用于定义材料强度参数。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `ref_size` | `float` | 参考尺寸 |
| `ref_energy_release_rate` | `float` | 参考能量释放率 |
| `weibull_modulus` | `float` | 韦布尔模量 |
| `weibull_coef_a` | `float` | 韦布尔系数a |
| `weibull_coef_b` | `float` | 韦布尔系数b |
| `min_breakable_size` | `float` | 最小可破碎尺寸 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的PeriDigmStrength实例 |
| `GetEnergyReleaseRate` | `size: float` | `float` | 计算给定尺寸的能量释放率 |
| `GetEnergyReleaseRate` | `size: float, random_value: float` | `float` | 计算给定尺寸和随机值的能量释放率 |

## PeriDigmSimulator

`PeriDigmSimulator`是PeriDigm模拟器的主类，用于进行近场动力学模拟。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `discretization` | `PeriDigmDiscretization` | 空间离散化 |
| `materials` | `VecXT<PeriDigmMaterial>` | 材料列表 |
| `damage_models` | `VecXT<PeriDigmDamageModel>` | 损伤模型列表 |
| `blocks` | `VecXT<PeriDigmBlock>` | 计算块列表 |
| `boundary_conditions` | `VecXT<PeriDigmBoundaryCondition>` | 边界条件列表 |
| `settings` | `PeriDigmSettings` | 求解器设置 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的PeriDigmSimulator实例 |
| `Clear` | 无 | - | 清除所有数据 |
| `InsertMaterial` | 无 | `PeriDigmMaterial&` | 添加材料并返回引用 |
| `InsertDamageModel` | 无 | `PeriDigmDamageModel&` | 添加损伤模型并返回引用 |
| `InsertBlock` | 无 | `PeriDigmBlock&` | 添加计算块并返回引用 |
| `InsertBoundaryCondition` | 无 | `PeriDigmBoundaryCondition&` | 添加边界条件并返回引用 |
| `InitDefaultSetup` | 无 | - | 初始化默认设置 |
| `InitAutoTimestep` | 无 | - | 初始化自动时间步长 |
| `WriteNodeFile` | `file_name: str` | - | 将节点信息写入文件 |
| `WriteNodeSetFile` | `file_name: str` | - | 将节点集信息写入文件 |
| `WriteInputFile` | `file_name: str` | - | 将输入信息写入文件 |
| `Solve` | 无 | - | 执行求解 |
| `SetUpResultDirectory` | 无 | - | 设置结果目录 |
| `CleanUpResultDirectory` | 无 | - | 清理结果目录 |

## PeriDigmDEMCoupler

`PeriDigmDEMCoupler`用于耦合PeriDigm和DEM模拟。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `particle` | `Particle` | 颗粒 |
| `pd_sim` | `PeriDigmSimulator` | PeriDigm模拟器 |
| `base_dir` | `str` | 基础目录 |
| `sub_dir_index` | `int` | 子目录索引 |
| `mesh_res` | `