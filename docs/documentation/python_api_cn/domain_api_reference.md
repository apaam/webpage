# NetDEM Python API 参考文档 - Domain模块

本文档提供了NetDEM软件中域管理相关的Python API接口说明。

## 目录

- [Domain](#domain)
- [CellManager](#cellmanager)
- [DomainManager](#domainmanager)
- [Cell](#cell)

## Domain

`Domain`是一个用于管理模拟域和属于它的颗粒的类。默认情况下，域被设置为以原点为中心的单位立方体（-0.5到0.5）。主要用于并行计算中的域分解和接触检测。

### 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `cell_manager` | `CellManager` | - | 用于广相接触检测的单元管理器 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的Domain实例 |
| `GetSelfRank` | 无 | `int` | 获取域的MPI等级ID |
| `GetTotalRank` | 无 | `int` | 获取模拟的总MPI进程数 |
| `GetBound` | 无 | `tuple(Vec3d, Vec3d)` | 获取域的边界（最小点和最大点） |
| `SetBound` | `bmin_x: float, bmin_y: float, bmin_z: float, bmax_x: float, bmax_y: float, bmax_z: float` | - | 设置域的边界坐标 |
| `IsJudgeDomain` | `p1: Particle, p2: Particle` | `bool` | 检查两个颗粒是否需要在此域中进行接触检测 |
| `IsJudgeDomain` | `p: Particle, w: Wall` | `bool` | 检查颗粒和墙是否需要在此域中进行接触检测 |
| `Enclose` | `pos: Vec3d` | `bool` | 检查一个位置是否在此域的边界内 |
| `Print` | 无 | - | 打印域的信息到控制台 |

## CellManager

`CellManager`是一个用于管理空间划分单元的类，用于广相接触检测。它将空间划分为规则的网格单元，以加速接触检测过程。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的CellManager实例 |
| `Init` | 无 | - | 初始化单元管理器，创建空间网格 |
| `GetBound` | 无 | `tuple(Vec3d, Vec3d)` | 获取单元管理器的边界（最小点和最大点） |
| `GetSpacing` | 无 | `Vec3d` | 获取三个方向上的单元间距 |
| `GetCellSizes` | 无 | `Vec3i` | 获取三个方向上的单元数量 |
| `SetBound` | `bmin_x: float, bmin_y: float, bmin_z: float, bmax_x: float, bmax_y: float, bmax_z: float` | - | 设置单元管理器的边界坐标 |
| `SetSpacing` | `spacing: float` | - | 设置单元的统一间距 |
| `GetOverlappedCells` | `bound_min: Vec3d, bound_max: Vec3d` | `list[Cell]` | 获取与给定边界框重叠的所有单元 |
| `GetOverlappedCell` | `pos: Vec3d` | `Cell` | 获取包含给定位置的单元 |
| `GetSTLModel` | 无 | `STLModel` | 获取单元网格的STL模型表示，用于可视化 |

## DomainManager

`DomainManager`是一个用于管理多个计算域的类，主要用于MPI并行计算。它负责域的分解、通信和同步。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的DomainManager实例 |
| `Init` | 无 | - | 使用默认设置初始化域管理器 |
| `Init` | `simulation: Simulation` | - | 使用指定的模拟对象初始化域管理器 |
| `GetBound` | 无 | `tuple(Vec3d, Vec3d)` | 获取整个计算区域的边界 |
| `GetDecomposition` | 无 | `Vec3i` | 获取域分解的方式（每个方向上的子域数量） |
| `SetBound` | `bmin_x: float, bmin_y: float, bmin_z: float, bmax_x: float, bmax_y: float, bmax_z: float` | - | 设置整个计算区域的边界 |
| `SetDecomposition` | `nx: int, ny: int, nz: int` | - | 设置域分解的方式 |
| `SetCellSpacing` | `spacing: float` | - | 设置所有子域中单元的统一间距 |
| `GetGhostSubDomains` | 无 | `list[Domain]` | 获取当前进程的所有幽灵子域（用于边界通信） |
| `GetSelfGhostSubDomain` | 无 | `Domain` | 获取当前进程的幽灵子域 |
| `GetSelfSubDomain` | 无 | `Domain` | 获取当前进程的实际子域 |

## Cell

`Cell`是一个表示空间划分单元的类，用于广相接触检测。每个单元都是一个矩形盒子，包含了其边界信息和相关的检测方法。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的Cell实例 |
| `__init__` | `bound_min: Vec3d, bound_max: Vec3d` | - | 使用指定的边界创建Cell实例 |
| `GetBound` | 无 | `tuple(Vec3d, Vec3d)` | 获取单元的边界（最小点和最大点） |
| `IsJudgeCell` | `p1: Particle, p2: Particle` | `bool` | 检查是否需要在此单元中检测两个颗粒的接触 |
| `IsJudgeCell` | `p: Particle, w: Wall` | `bool` | 检查是否需要在此单元中检测颗粒和墙的接触 |
| `GetSTLModel` | 无 | `STLModel` | 获取单元的STL模型表示，用于可视化 |
| `Enclose` | `pos: Vec3d` | `bool` | 检查一个位置是否在此单元内 |
| `Print` | 无 | - | 打印单元的信息到控制台 | 