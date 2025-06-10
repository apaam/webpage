# NetDEM Python API 参考文档 - Modifier模块

本文档提供了NetDEM软件中修改器(Modifier)相关的Python API接口说明。修改器用于在模拟过程中修改和控制模拟对象的行为。

## 目录

- [Modifier](#modifier)
- [ModifierManager](#modifiermanager)
- [DataDumper](#datadumper)
- [WallGroup](#wallgroup)
- [ParticleGroup](#particlegroup)
- [ExternalForce](#externalforce)
- [Gravity](#gravity)
- [BoundaryPeriodic](#boundaryperiodic)
- [WallServoControl](#wallservocontrol)
- [WallMotionControl](#wallmotioncontrol)
- [ParticleMotionControl](#particlemotioncontrol)
- [ParticleInjector](#particleinjector)
- [MembraneWall](#membranewall)
- [DeformationAnalysis](#deformationanalysis)
- [BreakageAnalysis](#breakageanalysis)
- [ParticleStressEvaluator](#particlestressevaluator)
- [ParticleEnergyEvaluator](#particleenergyevaluator)
- [UnbalForceRatioEvaluator](#unbalforceratioevaluator)

## Modifier

`Modifier`是所有修改器的基类，定义了修改器的基本属性和方法。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `label` | `str` | 修改器的描述性标签 |
| `sim` | `Simulation` | 关联的模拟器实例 |
| `scene` | `Scene` | 关联的场景实例 |
| `refresh_with_scene` | `bool` | 是否随场景一起刷新 |
| `enable_logging` | `bool` | 是否启用日志记录 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的Modifier实例 |
| `Clone` | 无 | `Modifier` | 创建当前修改器的副本 |
| `Init` | `sim: Simulation` | - | 初始化修改器 |
| `Enable` | 无 | - | 启用修改器 |
| `Disable` | 无 | - | 禁用修改器 |
| `Execute` | `cycle_point: DEMSolver.CyclePoint` | - | 执行修改器操作 |
| `Refresh` | 无 | - | 刷新修改器状态 |
| `Print` | `prefix: str = ""` | - | 打印修改器信息 |

## ModifierManager

`ModifierManager`是一个用于管理所有修改器的类。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的ModifierManager实例 |
| `Init` | 无 | - | 初始化管理器 |
| `Insert` | `modifier: Modifier` | - | 添加一个修改器到管理器中 |
| `Remove` | `modifier: Modifier` | - | 移除一个修改器 |
| `GetModifier` | `label: str` | `Modifier` | 根据标签获取修改器 |
| `FindModifier` | `label: str` | `Modifier` | 查找修改器 |
| `Enable` | `label: str` 或 `modifier: Modifier` | - | 启用修改器 |
| `Disable` | `label: str` 或 `modifier: Modifier` | - | 禁用修改器 |
| `ClearModifierLibrary` | 无 | - | 清空修改器库 |
| `ClearModifierEnabled` | 无 | - | 清空已启用的修改器 |

## DataDumper

`DataDumper`是一个用于导出模拟数据的修改器。

### 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `output_dir` | `str` | `"output"` | 输出目录路径 |
| `prefix` | `str` | `"dump"` | 输出文件名前缀 |
| `dump_interval` | `int` | `100` | 数据导出间隔（步数） |
| `dump_vtk` | `bool` | `True` | 是否导出VTK格式文件 |
| `dump_contact` | `bool` | `False` | 是否导出接触信息 |
| `dump_wall` | `bool` | `True` | 是否导出墙体信息 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的DataDumper实例 |
| `SetOutputDir` | `dir_path: str` | - | 设置输出目录路径 |
| `SetPrefix` | `prefix: str` | - | 设置输出文件名前缀 |
| `SetDumpInterval` | `interval: int` | - | 设置数据导出间隔 |

## WallGroup

`WallGroup`是一个用于管理墙体组的修改器。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的WallGroup实例 |
| `AddWall` | `id: int` 或 `ids: list[int]` 或 `ids: initializer_list[int]` | - | 添加墙体到组中 |
| `RemoveWall` | `id: int` 或 `ids: list[int]` 或 `ids: initializer_list[int]` | - | 从组中移除墙体 |
| `SetWall` | `id: int` 或 `ids: list[int]` 或 `ids: initializer_list[int]` | - | 设置组中的墙体 |
| `GetWalls` | 无 | `list[int]` | 获取组中的所有墙体ID |
| `Clear` | 无 | - | 清空墙体组 |

## ParticleGroup

`ParticleGroup`是一个用于管理颗粒组的修改器。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的ParticleGroup实例 |
| `AddParticle` | `id: int` 或 `ids: list[int]` 或 `ids: initializer_list[int]` | - | 添加颗粒到组中 |
| `RemoveParticle` | `id: int` 或 `ids: list[int]` 或 `ids: initializer_list[int]` | - | 从组中移除颗粒 |
| `SetParticle` | `id: int` 或 `ids: list[int]` 或 `ids: initializer_list[int]` | - | 设置组中的颗粒 |
| `GetParticles` | 无 | `list[int]` | 获取组中的所有颗粒ID |
| `SetParticleFromScene` | 无 | - | 从场景中设置颗粒 |
| `Clear` | 无 | - | 清空颗粒组 |

## ExternalForce

`ExternalForce`是一个用于施加外力的修改器。

### 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `force` | `Vec3d` | `(0.0, 0.0, 0.0)` | 外力向量 |
| `moment` | `Vec3d` | `(0.0, 0.0, 0.0)` | 外力矩向量 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的ExternalForce实例 |
| `SetForce` | `id: int` 或 `ids: list[int], fx: float, fy: float, fz: float` | - | 设置外力 |
| `SetMoment` | `id: int` 或 `ids: list[int], mx: float, my: float, mz: float` | - | 设置力矩 |
| `AddForce` | `id: int` 或 `ids: list[int], fx: float, fy: float, fz: float` | - | 添加外力 |
| `AddMoment` | `id: int` 或 `ids: list[int], mx: float, my: float, mz: float` | - | 添加力矩 |
| `GetForceAndMoment` | `id: int = None` | `tuple[Vec3d, Vec3d]` | 获取力和力矩 |
| `SyncToAllProcessors` | 无 | - | 同步到所有处理器 |
| `Clear` | 无 | - | 清空外力 |

## Gravity

`Gravity`是一个用于施加重力的修改器。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `coeffs` | `Vec3d` | 重力系数 |
| `ref_pos` | `Vec3d` | 参考位置 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 或 `gx: float, gy: float, gz: float` | - | 创建一个新的Gravity实例 |

## BoundaryPeriodic

`BoundaryPeriodic`是一个用于设置周期性边界条件的修改器。

### 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `periodic_x` | `bool` | `False` | x方向是否周期性 |
| `periodic_y` | `bool` | `False` | y方向是否周期性 |
| `periodic_z` | `bool` | `False` | z方向是否周期性 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的BoundaryPeriodic实例 |
| `SetPairWalls` | `wall_ids: list[int]` | - | 设置成对的墙体 |
| `SetCoordSysFirst` | `coord_sys: CoordSys` | - | 设置第一个坐标系 |
| `SetCoordSysSecond` | `coord_sys: CoordSys` | - | 设置第二个坐标系 |
| `GetWallGroups` | 无 | `list[WallGroup]` | 获取所有墙体组 |
| `GetWallGroupFirst` | 无 | `WallGroup` | 获取第一个墙体组 |
| `GetWallGroupSecond` | 无 | `WallGroup` | 获取第二个墙体组 |
| `ClearMappedParticles` | 无 | - | 清空映射的颗粒 |
| `SaveMappedIDsDict` | 无 | - | 保存映射的ID字典 |

## WallServoControl

`WallServoControl`是一个用于控制墙体伺服的修改器。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `kn` | `float` | 法向刚度 |
| `area` | `float` | 面积 |
| `target_pressure` | `float` | 目标压力 |
| `vel_max` | `float` | 最大速度 |
| `study_rate` | `float` | 研究速率 |
| `tol` | `float` | 容差 |
| `enable_warning` | `bool` | 是否启用警告 |
| `enable_auto_area` | `bool` | 是否启用自动面积 |
| `achieved` | `bool` | 是否达到目标 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | `kn: float, area: float` | - | 创建一个新的WallServoControl实例 |

## WallMotionControl

`WallMotionControl`是一个用于控制墙体运动的修改器。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的WallMotionControl实例 |
| `SetVelocity` | `vx: float, vy: float, vz: float` | - | 设置速度 |
| `SetSpin` | `wx: float, wy: float, wz: float` | - | 设置自旋 |

## ParticleMotionControl

`ParticleMotionControl`是一个用于控制颗粒运动的修改器。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的ParticleMotionControl实例 |
| `SetFixed` | `fixed: bool` | - | 设置是否固定 |
| `SetFixRotation` | `fix_rotation: bool` | - | 设置是否固定旋转 |
| `SetLinearSpin` | `wx: float, wy: float, wz: float` | - | 设置线性自旋 |
| `SetLinearVelocity` | `vx: float, vy: float, vz: float` | - | 设置线性速度 |
| `SetSinVelocity` | `amplitude: float, frequency: float, phase: float` | - | 设置正弦速度 |
| `SyncToAllProcessors` | 无 | - | 同步到所有处理器 |
| `Clear` | 无 | - | 清空运动控制 |

## ParticleInjector

`ParticleInjector`是一个用于注入颗粒的修改器。

### 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `rate` | `float` | `1.0` | 颗粒注入速率（个/秒） |
| `region` | `Box` | - | 注入区域 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的ParticleInjector实例 |
| `SetParticles` | `particles: list[Particle]` | - | 设置要注入的颗粒 |
| `SetInjectByTime` | `time: float` | - | 设置按时间注入 |
| `SetInjectByCycles` | `cycles: int` | - | 设置按周期注入 |
| `SetInjectTimes` | `times: int` | - | 设置注入次数 |
| `Clear` | 无 | - | 清空注入器 |

## MembraneWall

`MembraneWall`是一个用于模拟膜墙的修改器。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `enable_deformation` | `bool` | 是否启用变形 |
| `dump_info` | `bool` | 是否导出信息 |
| `facing_outside` | `bool` | 是否朝外 |
| `wall_list` | `list[int]` | 墙体列表 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 或 `radius: float, height: float` 或 `radius: float, height: float, thickness: float` 或 `x: float, y: float, z: float, rx: float, ry: float, rz: float` | - | 创建一个新的MembraneWall实例 |
| `SetRootPath` | `path: str` | - | 设置根路径 |
| `SetSaveByTime` | `time: float` | - | 设置按时间保存 |
| `SetSaveByCycles` | `cycles: int` | - | 设置按周期保存 |
| `Init` | 无 | - | 初始化膜墙 |
| `SetDimensions` | `dimensions: list[float]` | - | 设置尺寸 |
| `SetPressure` | `pressure: float` | - | 设置压力 |

## DeformationAnalysis

`DeformationAnalysis`是一个用于分析变形的修改器。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的DeformationAnalysis实例 |
| `GetStrain` | 无 | `Vec6d` | 获取应变张量（Voigt记号） |
| `GetStress` | 无 | `Vec6d` | 获取应力张量（Voigt记号） |

## BreakageAnalysis

`BreakageAnalysis`是一个用于分析断裂的修改器。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的BreakageAnalysis实例 |
| `GetBreakageRatio` | 无 | `float` | 获取断裂率 |
| `GetBrokenBonds` | 无 | `list[Bond]` | 获取已断裂的键 |

## ParticleStressEvaluator

`ParticleStressEvaluator`是一个用于评估颗粒应力的修改器。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的ParticleStressEvaluator实例 |
| `GetStress` | 无 | `list[float]` | 获取应力 |

## ParticleEnergyEvaluator

`ParticleEnergyEvaluator`是一个用于评估颗粒能量的修改器。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的ParticleEnergyEvaluator实例 |
| `GetKineticEnergy` | `particle: Particle` | `float` | 获取指定颗粒的动能 |
| `GetPotentialEnergy` | `particle: Particle` | `float` | 获取指定颗粒的势能 |
| `GetTotalEnergy` | `particle: Particle` | `float` | 获取指定颗粒的总能量 |

## UnbalForceRatioEvaluator

`UnbalForceRatioEvaluator`是一个用于评估非平衡力比的修改器。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的UnbalForceRatioEvaluator实例 |
| `GetUnbalForceRatio` | 无 | `float` | 获取当前系统的非平衡力比 | 