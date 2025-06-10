# NetDEM Python API 参考文档 - Simulation模块

本文档提供了NetDEM软件中Simulation模块相关的Python API接口说明。Simulation模块是NetDEM的核心模块，负责管理和执行整个离散元模拟过程。

## Simulation

`Simulation`类是离散元模拟的主要管理类，它整合了所有必要的组件来执行一个完整的DEM模拟。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `domain_manager` | `DomainManager` | 管理计算域和子域的划分，用于并行计算 |
| `mpi_manager` | `MPIManager` | 管理MPI进程间的数据交换和通信 |
| `modifier_manager` | `ModifierManager` | 管理各种修改器，用于自定义评估和数据输出 |
| `scene` | `Scene` | 包含和管理基本的DEM对象（如形状、颗粒、墙体等） |
| `dem_solver` | `DEMSolver` | 实现DEM算法来求解场景（只读） |
| `mech_time` | `float` | 模拟世界中的力学时间 |
| `mech_cycles` | `int` | 力学循环次数，每个循环对应一个时间步长的增量 |
| `enable_logging` | `bool` | 是否在屏幕上输出日志信息 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的Simulation实例 |
| `Run` | `time: float` | - | 运行模拟直到指定的时间 |
| `AutoReadRestart` | `path: str, mech_cyc: int, shape_info_case: int=0, filecase: str="vtk"` | - | 从输出文件重启模拟。参数说明：<br>- `path`: 输出文件路径<br>- `mech_cyc`: 力学循环次数<br>- `shape_info_case`: 形状信息情况（0：零步骤json，2：特定时间json）<br>- `filecase`: 文件类型（默认为"vtk"） |
| `SetTimeAndCycles` | `t: float, cycs: int` | - | 设置当前时间和循环次数（通常在AutoReadRestart后调用）。参数说明：<br>- `t`: 模拟时间<br>- `cycs`: 循环次数 |

### 使用示例

```python
# 创建模拟实例
sim = netdem.Simulation()

# 设置场景和求解器参数
sim.scene.AddParticle(...)
sim.dem_solver.timestep = 1e-6

# 添加修改器
data_dumper = netdem.DataDumper()
sim.modifier_manager.AddModifier(data_dumper)

# 运行模拟
sim.Run(1.0)  # 运行到t=1.0s

# 从输出文件重启模拟
sim.AutoReadRestart("output", 1000)
sim.SetTimeAndCycles(0.1, 1000)
sim.Run(2.0)  # 继续运行到t=2.0s
```

### 注意事项

1. `Simulation`类是一个高层次的管理类，它通过组合其他模块的功能来实现完整的DEM模拟。

2. 在使用`AutoReadRestart`时，需要确保：
   - 输出文件路径正确且文件存在
   - 力学循环次数与输出文件匹配
   - 形状信息情况参数与保存时的设置一致

3. `dem_solver`属性是只读的，这是为了保护求解器的内部状态。要修改求解器的参数，应该通过其提供的方法进行。

4. 启用日志输出（`enable_logging = True`）可以帮助监控模拟进度，但在某些情况下可能会影响性能。 