# NetDEM Python API 参考文档 - MPI模块

本文档提供了NetDEM软件中MPI并行计算相关的Python API接口说明。这些接口用于支持大规模并行离散元模拟。

## 目录

- [MPIManager](#mpimanager)

## MPIManager

`MPIManager`是MPI并行计算的核心管理类，负责进程间通信和数据同步。

### 属性

在Python接口中没有直接暴露属性。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的MPIManager实例 |
| `GetSelfRank` | 无 | `int` | 获取当前进程的MPI等级 |
| `GetTotalRank` | 无 | `int` | 获取MPI进程总数 |
| `IsMasterRank` | 无 | `bool` | 检查当前进程是否为主进程（rank=0） |
| `SyncShapeToAllProcessors` | `shape: Shape` | - | 将形状数据同步到所有进程 |
| `SyncDataAmongProcessors` | `data: VecXT<int>` | - | 同步整数数组数据到所有进程 |
| `SyncDataAmongProcessors` | `data: VecXT<double>` | - | 同步浮点数数组数据到所有进程 |
| `GetSelfRankStatic` | 无 | `int` | 静态方法，获取当前进程的MPI等级 |
| `GetTotalRankStatic` | 无 | `int` | 静态方法，获取MPI进程总数 |
| `IsMasterRankStatic` | 无 | `bool` | 静态方法，检查当前进程是否为主进程（rank=0） | 