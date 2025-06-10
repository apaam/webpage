# NetDEM Python API 参考文档 - FEM模块

本文档提供了NetDEM软件中有限元法(FEM)相关的Python API接口说明。

## 目录

- [FEMSimulator](#femsimulator)
- [TetMesh](#tetmesh)
- [Membrane](#membrane)
- [DeformableParticle](#deformableparticle)

## FEMSimulator

`FEMSimulator`是一个用于模拟物体变形的有限元方法(FEM)求解器。它使用四面体单元进行三维变形模拟，支持Neo-Hookean材料模型。

### 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `neo_k` | `float` | `6.94e5` | Neo-Hookean材料的体积模量 |
| `neo_mu` | `float` | `5.21e5` | Neo-Hookean材料的剪切模量 |
| `density` | `float` | `500.0` | 材料的密度 |
| `damp_coef` | `float` | `0.7` | 运动阻尼系数 |
| `gravity_coef` | `Vec3d` | `(0.0, 0.0, 0.0)` | 重力加速度向量 |
| `timestep` | `float` | `1.0e-4` | 时间步长 |
| `nodes` | `list[Vec3d]` | - | 四面体网格的当前节点位置 |
| `elements` | `list[Vec4i]` | - | 四面体网格的单元（每个单元由4个节点索引定义） |
| `nodes_ref` | `list[Vec3d]` | - | 四面体网格的初始参考节点位置 |
| `bound_facets` | `list[Vec3i]` | - | 边界表面的三角形面片（每个面片由3个节点索引定义） |
| `bound_nodes` | `list[int]` | - | 边界表面上的节点索引列表 |
| `elemental_vol` | `list[float]` | - | 每个四面体单元的体积 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的FEMSimulator实例 |

## TetMesh

`TetMesh`是一个用于表示和管理四面体网格的类。它可以从STL模型或节点-面片数据生成四面体网格。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `nodes` | `list[Vec3d]` | 网格节点的位置列表 |
| `elements` | `list[Vec4i]` | 四面体单元的节点索引列表 |
| `bound_facets` | `list[Vec3i]` | 边界表面三角形面片的节点索引列表 |
| `bound_edges` | `list[Vec2i]` | 边界边的节点索引列表 |
| `bound_nodes` | `list[int]` | 边界节点的索引列表 |
| `surface_nodes` | `list[int]` | 表面节点的索引列表 |
| `surface_facets` | `list[Vec3i]` | 表面三角形面片的节点索引列表 |
| `surface_node_linked_boundaries` | `list[int]` | 表面节点与边界的连接关系 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个空的TetMesh实例 |
| `__init__` | `stl_model: STLModel, mesh_size: float` | - | 从STL模型创建四面体网格，指定网格单元的目标尺寸 |
| `__init__` | `nodes: list[Vec3d], facets: list[Vec3i], mesh_size: float` | - | 从节点和表面面片创建四面体网格，指定网格单元的目标尺寸 |
| `GetSurfaceSTL` | 无 | `STLModel` | 获取网格表面的STL模型表示 |
| `SaveAsVTK` | `file_name: str` | - | 将网格保存为VTK文件 |
| `Init` | 无 | - | 初始化网格，计算边界信息和表面信息 |

## Membrane

`Membrane`是一个用于模拟薄膜的类，使用三角形单元进行二维变形模拟，支持Neo-Hookean材料模型。

### 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `radius` | `float` | `0.25` | 薄膜的半径 |
| `height` | `float` | `1.0` | 薄膜的高度 |
| `mesh_size` | `float` | `0.1` | 网格单元的目标尺寸 |
| `center` | `Vec3d` | `(0, 0, 0)` | 薄膜的中心位置 |
| `neo_k` | `float` | `6.94e5` | Neo-Hookean材料的体积模量 |
| `neo_mu` | `float` | `5.21e5` | Neo-Hookean材料的剪切模量 |
| `density` | `float` | `500.0` | 材料的密度 |
| `thickness` | `float` | `0.3e-3` | 薄膜的厚度 |
| `damp_coef` | `float` | `0.7` | 运动阻尼系数 |
| `timestep` | `float` | `1.0e-4` | 时间步长 |
| `nodes` | `list[Vec3d]` | - | 三角形网格的节点位置 |
| `elements` | `list[Vec3i]` | - | 三角形网格的单元（每个单元由3个节点索引定义） |
| `elemental_stress` | `list[Vec3d]` | - | 每个三角形单元的应力 |
| `nodal_vols` | `list[float]` | - | 每个节点的等效体积（用于集中质量法） |
| `nodal_vels` | `list[Vec3d]` | - | 每个节点的速度 |
| `bc_facet_pressure` | `list[float]` | - | 施加在边界边上的压力 |
| `bc_facet_forces` | `list[Vec3d]` | - | 施加在边界边上的力 |
| `bc_nodal_vels` | `list[Vec6d]` | - | 边界节点的预设速度和约束条件 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | `radius: float, height: float` | - | 创建一个新的Membrane实例 |
| `__init__` | `radius: float, height: float, mesh_size: float` | - | 创建一个新的Membrane实例，指定网格尺寸 |
| `__init__` | `radius: float, height: float, mesh_size: float, center_x: float, center_y: float, center_z: float` | - | 创建一个新的Membrane实例，指定所有参数 |
| `Remesh` | `ele_size: float` | - | 使用新的单元尺寸重新生成网格 |
| `SetBCNodalVelocity` | `nid: int, vx: float, vy: float, vz: float, use_prescribed_vx: bool, use_prescribed_vy: bool, use_prescribed_vz: bool` | - | 设置边界节点的预设速度和约束条件 |
| `Init` | 无 | - | 初始化薄膜，生成网格并设置初始条件 |
| `Solve` | `dt: float` | - | 求解一个时间步长的变形 |
| `SaveAsVTK` | `file_name: str` | - | 将模拟结果保存为VTK文件 |

## DeformableParticle

`DeformableParticle`是一个表示可变形颗粒的类。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的DeformableParticle实例 |
| `Clone` | 无 | `DeformableParticle` | 创建当前颗粒的副本 |
| `SetShape` | `shape: Shape` | - | 设置颗粒的形状 |
| `SetDensity` | `density: float` | - | 设置颗粒的密度 |
| `SetPosition` | `pos: Vec3d` | - | 设置颗粒的位置 |
| `SetRodrigues` | `rod: Vec3d` | - | 设置颗粒的Rodrigues旋转向量 |
| `SetQuaternion` | `quat: Vec4d` | - | 设置颗粒的四元数 |
| `SetVelocity` | `vel: Vec3d` | - | 设置颗粒的速度 |
| `GetVelocity` | 无 | `Vec3d` | 获取颗粒的速度 |
| `AddForce` | `force: Vec3d` | - | 给颗粒添加力 |
| `ClearForce` | 无 | - | 清除颗粒上的所有力 |
| `ApplyContactForce` | `contact: ContactPP` | - | 应用颗粒-颗粒接触力 |
| `ApplyContactForce` | `contact: ContactPW` | - | 应用颗粒-墙接触力 |
| `UpdateMotion` | `dt: float` | - | 更新颗粒的运动 |
| `UpdateShape` | 无 | - | 更新颗粒的形状 |
| `UpdateBound` | 无 | - | 更新颗粒的边界 |
| `SaveSurfaceAsVTK` | `file_name: str` | - | 将颗粒表面保存为VTK文件 |
| `SaveAsVTK` | `file_name: str` | - | 将颗粒保存为VTK文件 | 