# NetDEM Python API 参考文档 - DEM模块

本文档提供了NetDEM软件中离散元法(DEM)相关的Python API接口说明。

## 目录

- [ContactModel](#contactmodel)
- [LinearSpring](#linearspring)
- [ParallelBond](#parallelbond)
- [ContactSolverSettings](#contactsolversettings)
- [ContactSolverFactory](#contactsolverfactory)
- [DEMSolver](#demsolver)

## ContactModel

`ContactModel`是所有接触模型的基类，定义了接触模型的基本属性和方法。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `label` | `str` | 接触模型的描述性标签 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的ContactModel实例 |
| `SetProperty` | `name: str, value: float` | - | 设置接触模型的特定属性值 |

## LinearSpring

`LinearSpring`是一个使用线性弹簧元素来评估接触力和力矩的接触模型，继承自`ContactModel`。

### 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `kn` | `float` | `2e6` | 法向刚度参数，用于计算接触力 |
| `kt` | `float` | `1e6` | 切向刚度参数，用于计算接触力 |
| `beta` | `float` | `0.7` | 恢复系数，用于计算接触力 |
| `mu` | `float` | `0.5` | 摩擦系数，用于计算接触力 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的LinearSpring实例，使用默认参数 |
| `__init__` | `kn: float, kt: float, mu: float, beta: float` | - | 创建一个新的LinearSpring实例，使用指定的参数 |

## ParallelBond

`ParallelBond`是一个使用平行键模型来评估两个颗粒之间的力和力矩的接触模型，继承自`ContactModel`。

### 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `kn` | `float` | `2e6` | 法向刚度参数，用于计算接触力 |
| `kt` | `float` | `1e6` | 切向刚度参数，用于计算接触力 |
| `max_sig_n` | `float` | `1.0e6` | 最大法向应力，用于计算最大允许力 |
| `max_sig_t` | `float` | `1.0e6` | 最大切向应力，用于计算最大允许力 |
| `beta` | `float` | `0.0` | 阻尼系数 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的ParallelBond实例，使用默认参数 |
| `__init__` | `kn: float, kt: float, sig_n: float, sig_t: float, beta: float` | - | 创建一个新的ParallelBond实例，使用指定的参数 |

## ContactSolverSettings

`ContactSolverSettings`是一个包含接触求解器相关设置的容器类。

### 枚举

#### SolverType

| 值 | 描述 |
|-----|------|
| `gjk` | 使用GJK（Gilbert-Johnson-Keerthi）算法求解接触 |
| `sdf` | 使用SDF（Signed Distance Field）算法求解接触 |
| `automatic` | 自动选择合适的求解器 |

### 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `solver_type` | `SolverType` | `SolverType.automatic` | 用于接触计算的求解器类型 |
| `gjk_use_erosion` | `bool` | `False` | 是否在GJK求解器中使用侵蚀 |
| `gjk_erosion_ratio_initial` | `float` | `0.01` | GJK求解器中使用的初始侵蚀比率 |
| `gjk_erosion_ratio_increment` | `float` | `0.01` | GJK求解器中每次侵蚀比率的增量 |
| `sdf_potential_type` | `int` | `0` | SDF求解器中使用的势函数类型 |
| `sdf_use_equivalent_stiffness` | `bool` | `True` | 是否使用等效刚度，使其与传统线性或Hertz接触中的刚度相同 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的ContactSolverSettings实例，使用默认参数 |

## ContactSolverFactory

`ContactSolverFactory`是一个用于创建和管理接触求解器的工厂类。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `settings` | `ContactSolverSettings` | 用于接触求解器行为的设置 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的ContactSolverFactory实例 |
| `__init__` | `factory: ContactSolverFactory` | - | 从现有的ContactSolverFactory创建一个新实例（复制构造函数） |
| `__copy__` | 无 | `ContactSolverFactory` | 创建当前ContactSolverFactory的副本 |

## DEMSolver

`DEMSolver`是一个用于执行离散元方法(DEM)模拟的求解器类。

### 枚举

#### CyclePoint

| 值 | 描述 |
|-----|------|
| `pre_cycle` | 循环开始前的初始设置 |
| `pre_update_links` | 更新链接列表之前 |
| `pre_update_contact` | 更新接触之前 |
| `pre_update_fc_p` | 将接触力应用于颗粒之前 |
| `pre_update_fc_w` | 将接触力应用于墙壁之前 |
| `pre_update_motion_p` | 更新颗粒运动之前 |
| `pre_update_motion_w` | 更新墙壁运动之前 |
| `post_cycle` | 循环结束 |

### 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `timestep` | `float` | `1.0e-4` | 用于积分颗粒运动的时间步长 |
| `contact_solver_factory` | `ContactSolverFactory` | - | 用于存储颗粒和墙壁之间接触的求解器的工厂对象 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的DEMSolver实例 | 