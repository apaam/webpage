# NetDEM Python API 参考文档 - Scene模块

本文档提供了NetDEM软件中Scene模块相关的Python API接口说明。Scene模块是NetDEM的核心部分，负责管理模拟中的所有元素，包括颗粒、墙体、形状和接触等。

## 目录

- [DEMObjectPool](#demobjectpool)
- [Scene](#scene)
- [PackGenerator](#packgenerator)
- [Particle](#particle)
- [Wall](#wall)
- [WallBoxPlane](#wallboxplane)
- [WallBoxPlate](#wallboxplate)
- [BondedSpheres](#bondedspheres)
- [BondedVoronois](#bondedvoronois)
- [ContactPP](#contactpp)
- [ContactPW](#contactpw)

## DEMObjectPool

`DEMObjectPool`是DEM对象池，用于管理DEM模拟中的颗粒和接触对象，采用对象池模式避免频繁的对象创建和销毁。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `init` | 无 | `DEMObjectPool` | 初始化并获取DEM对象池实例（单例模式） |
| `GetParticle` | 无 | `Particle` | 从对象池获取一个新的颗粒对象 |
| `GetContactPP` | 无 | `ContactPP` | 从对象池获取一个新的颗粒-颗粒接触对象 |
| `GetContactPW` | 无 | `ContactPW` | 从对象池获取一个新的颗粒-墙接触对象 |

## Scene

`Scene`是DEM模拟中的场景类，管理所有的颗粒、墙体、形状和接触模型。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `contact_model_map` | `MiniMap<int, ContactModel*>` | 接触模型映射表，通过ID索引接触模型 |
| `bond_model_table` | `VecXT<VecXT<ContactModel*>>` | 材料间粘结模型表，用于快速查找任意两种材料间的粘结模型 |
| `collision_model_table` | `VecXT<VecXT<ContactModel*>>` | 材料间碰撞模型表，用于快速查找任意两种材料间的碰撞模型 |
| `particle_list` | `VecXT<Particle*>` | 场景中的所有颗粒列表 |
| `wall_list` | `VecXT<Wall*>` | 场景中的所有墙体列表 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的Scene实例 |
| `InsertContactModel` | `contact_model: ContactModel` | `ContactModel` | 向场景中插入一个接触模型 |
| `InsertContactModel` | `contact_models: VecXT<ContactModel*>` | `VecXT<ContactModel*>` | 向场景中插入多个接触模型 |
| `SetNumberOfMaterials` | `num: int` | - | 设置场景中材料的数量 |
| `SetBondModel` | `mat_type_1: int, mat_type_2: int, model: ContactModel` | - | 设置两种材料之间的粘结模型 |
| `SetBondModel` | `mat_type_1: int, mat_type_2: int, label: str` | - | 通过标签设置两种材料之间的粘结模型 |
| `SetCollisionModel` | `mat_type_1: int, mat_type_2: int, model: ContactModel` | - | 设置两种材料之间的碰撞模型 |
| `SetCollisionModel` | `mat_type_1: int, mat_type_2: int, label: str` | - | 通过标签设置两种材料之间的碰撞模型 |
| `InsertShape` | `shape: Shape` | `Shape` | 向场景中插入一个形状 |
| `InsertShape` | `shapes: VecXT<Shape*>` | `VecXT<Shape*>` | 向场景中插入多个形状 |
| `InsertParticleLocal` | `particle: Particle` | `Particle` | 向场景中本地插入一个颗粒（无论其所属的子域） |
| `InsertParticle` | `particle: Particle` | `Particle` | 向场景中插入一个颗粒 |
| `InsertParticle` | `particles: VecXT<Particle>` | `VecXT<Particle*>` | 向场景中插入多个颗粒 |
| `InsertParticle` | `particles: VecXT<Particle*>` | `VecXT<Particle*>` | 向场景中插入多个颗粒（通过指针） |
| `InsertWall` | `wall: Wall` | `Wall` | 向场景中插入一个墙体 |
| `InsertWall` | `walls: VecXT<Wall>` | `VecXT<Wall*>` | 向场景中插入多个墙体 |
| `InsertWall` | `walls: VecXT<Wall*>` | `VecXT<Wall*>` | 向场景中插入多个墙体（通过指针） |
| `RemoveShape` | `shape: Shape*` | - | 从场景中移除一个形状 |
| `RemoveParticle` | `particle: Particle*` | - | 从场景中移除一个颗粒 |
| `RemoveParticle` | `id: int` | - | 通过ID从场景中移除一个颗粒 |
| `RemoveWall` | `wall: Wall*` | - | 从场景中移除一个墙体 |
| `RemoveWall` | `id: int` | - | 通过ID从场景中移除一个墙体 |
| `GetShapes` | 无 | `VecXT<Shape*>` | 获取场景中的所有形状 |
| `GetShapeMap` | 无 | `std::unordered_map<int, Shape*>` | 获取场景中的形状映射表 |
| `InScene` | `shape: Shape*` | `bool` | 检查形状是否在场景中 |
| `InScene` | `contact_model: ContactModel*` | `bool` | 检查接触模型是否在场景中 |
| `GetDomain` | 无 | `Domain` | 获取场景的计算域 |
| `GetBondModel` | `p1: Particle*, p2: Particle*` | `ContactModel*` | 获取两个颗粒之间的粘结模型 |
| `GetBondModel` | `p: Particle*, w: Wall*` | `ContactModel*` | 获取颗粒和墙体之间的粘结模型 |
| `GetBondModel` | `mat_type_1: int, mat_type_2: int` | `ContactModel*` | 根据材料类型获取粘结模型 |
| `GetCollisionModel` | `p1: Particle*, p2: Particle*` | `ContactModel*` | 获取两个颗粒之间的碰撞模型 |
| `GetCollisionModel` | `p: Particle*, w: Wall*` | `ContactModel*` | 获取颗粒和墙体之间的碰撞模型 |
| `GetCollisionModel` | `mat_type_1: int, mat_type_2: int` | `ContactModel*` | 根据材料类型获取碰撞模型 |
| `AutoReadRestart` | `path: str, mech_cyc: int, use_json: bool=True` | - | 自动读取重启文件 |
| `ReadRestartShapesVTK` | `file: str` | - | 从VTK文件读取形状重启数据 |
| `ReadRestartParticlesVTK` | `file: str` | - | 从VTK文件读取颗粒重启数据 |
| `ReadRestartWallsVTK` | `file: str` | - | 从VTK文件读取墙体重启数据 |
| `ReadRestartContactsVTK` | `file: str` | - | 从VTK文件读取接触重启数据 |
| `ReadRestartShapesJSON` | `file: str` | - | 从JSON文件读取形状重启数据 |
| `ReadRestartParticlesJSON` | `file: str` | - | 从JSON文件读取颗粒重启数据 |
| `ReadRestartWallsJSON` | `file: str` | - | 从JSON文件读取墙体重启数据 |
| `ReadRestartContactsJSON` | `file: str` | - | 从JSON文件读取接触重启数据 |
| `GetParticles` | 无 | `VecXT<Particle*>` | 获取场景中的所有颗粒 |
| `GetParticlesWithProxy` | 无 | `VecXT<Particle*>` | 获取场景中的所有颗粒和代理颗粒（用于调试） |
| `GetWalls` | 无 | `VecXT<Wall*>` | 获取场景中的所有墙体 |
| `GetContactPPs` | 无 | `VecXT<ContactPP*>` | 获取场景中的所有颗粒-颗粒接触 |
| `GetContactPWs` | 无 | `VecXT<ContactPW*>` | 获取场景中的所有颗粒-墙接触 |
| `ClearShape` | 无 | - | 清除场景中的所有形状 |
| `ClearParticle` | 无 | - | 清除场景中的所有颗粒 |
| `ClearWall` | 无 | - | 清除场景中的所有墙体 |
| `ClearContactModels` | 无 | - | 清除场景中的所有接触模型 |
| `ClearContacts` | 无 | - | 清除场景中的所有接触 |
| `FindParticle` | `id: int` | `Particle*` | 通过ID查找颗粒 |
| `SwichParticles` | `id_1: int, id_2: int` | - | 交换两个颗粒的ID |
| `FindWall` | `id: int` | `Wall*` | 通过ID查找墙体 |
| `ResetShapeID` | 无 | `std::unordered_map<int, int>` | 重置形状ID，返回旧ID到新ID的映射 |
| `ResetParticleID` | 无 | `std::unordered_map<int, int>` | 重置颗粒ID，返回旧ID到新ID的映射 |
| `ResetWallID` | 无 | `std::unordered_map<int, int>` | 重置墙体ID，返回旧ID到新ID的映射 |
| `UpdateContactForce` | `dt: double` | - | 更新所有接触力 |
| `UpdateMotion` | `dt: double` | - | 更新所有运动状态 |
| `UpdateBound` | 无 | - | 更新所有包围盒 |
| `UpdateBoundFast` | 无 | - | 快速更新所有包围盒 |
| `BackupContactToDict` | 无 | - | 将接触信息备份到字典 |
| `ClearContactDict` | 无 | - | 清除接触信息字典 |
| `UpdateLinkedCells` | 无 | - | 更新链接单元格 |
| `UpdateLinkedDomains` | 无 | - | 更新链接域 |
| `UpdateLinkedNeighs` | 无 | - | 更新链接邻居 |
| `GetContactPPs` | `particle: Particle*` | `VecXT<ContactPP*>` | 获取指定颗粒的所有颗粒-颗粒接触 |
| `GetContactPWs` | `particle: Particle*` | `VecXT<ContactPW*>` | 获取指定颗粒的所有颗粒-墙接触 |

## PackGenerator

`PackGenerator`是用于生成颗粒包的工具类。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `GetGridPack` | `len_x: float, len_y: float, len_z: float, center_x: float, center_y: float, center_z: float, num_x: int, num_y: int, num_z: int, shape: Shape*` | `VecXT<Particle>` | 生成单一形状的网格包 |
| `GetGridPack` | `len_x: float, len_y: float, len_z: float, center_x: float, center_y: float, center_z: float, num_x: int, num_y: int, num_z: int, shapes: VecXT<Shape*>` | `VecXT<Particle>` | 生成多种形状的网格包 |
| `GetGridPack` | `len_x: float, len_y: float, len_z: float, center_x: float, center_y: float, center_z: float, num_x: int, num_y: int, num_z: int, bonded_spheres: BondedSpheres` | `VecXT<Particle>` | 生成键合球体的网格包 |
| `GetGridPack` | `len_x: float, len_y: float, len_z: float, center_x: float, center_y: float, center_z: float, num_x: int, num_y: int, num_z: int, bonded_voronois: BondedVoronois` | `VecXT<Particle>` | 生成键合Voronoi的网格包 |
| `GetVoronoiPack` | `len_x: float, len_y: float, len_z: float, center_x: float, center_y: float, center_z: float, num_p: int, shape: Shape*` | `VecXT<Particle>` | 生成单一形状的Voronoi包 |
| `GetVoronoiPack` | `len_x: float, len_y: float, len_z: float, center_x: float, center_y: float, center_z: float, num_p: int, shapes: VecXT<Shape*>` | `VecXT<Particle>` | 生成多种形状的Voronoi包 |
| `GetVoronoiPack` | `stl_model: STLModel, num_p: int, shape: Shape*` | `VecXT<Particle>` | 在STL模型内生成单一形状的Voronoi包 |
| `GetVoronoiPack` | `stl_model: STLModel, num_p: int, shapes: VecXT<Shape*>` | `VecXT<Particle>` | 在STL模型内生成多种形状的Voronoi包 |

## Particle

`Particle`是DEM模拟中的颗粒类。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `id` | `int` | 颗粒ID |
| `shape` | `Shape*` | 颗粒形状 |
| `bound_min` | `Vec3d` | 包围盒最小点 |
| `bound_max` | `Vec3d` | 包围盒最大点 |
| `margin` | `double` | 颗粒边界余量 |
| `bound_disp` | `Vec3d` | 包围盒位移 |
| `material_type` | `int` | 材料类型 |
| `mass` | `double` | 颗粒质量 |
| `moi_principal` | `Vec3d` | 主惯性矩 |
| `damp_viscous` | `double` | 粘性阻尼系数 |
| `damp_numerical` | `double` | 数值阻尼系数 |
| `pos` | `Vec3d` | 颗粒位置 |
| `quaternion` | `Vec4d` | 颗粒四元数 |
| `vel` | `Vec3d` | 颗粒速度 |
| `spin` | `Vec3d` | 颗粒自旋 |
| `vel_m0p5` | `Vec3d` | 半步速度（用于速度Verlet算法） |
| `spin_principal` | `Vec3d` | 主系中的自旋 |
| `force` | `Vec3d` | 作用在颗粒上的力 |
| `moment` | `Vec3d` | 作用在颗粒上的力矩 |
| `dynamic_properties` | `MiniMap<string, double>` | 动态属性表 |
| `enable_bound_aabb` | `bool` | 是否启用AABB包围盒 |
| `need_update_stl_model` | `bool` | 是否需要更新STL模型 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个空的颗粒 |
| `__init__` | `shape: Shape*` | - | 创建一个指定形状的颗粒 |
| `Clone` | 无 | `Particle*` | 克隆颗粒 |
| `SetShape` | `shape: Shape*` | - | 设置颗粒形状 |
| `SetDensity` | `density: double` | - | 设置颗粒密度 |
| `GetDensity` | 无 | `double` | 获取颗粒密度 |
| `SetMargin` | `margin: double` | - | 设置颗粒边界余量 |
| `GetMargin` | 无 | `double` | 获取颗粒边界余量 |
| `SetForce` | `fx: double, fy: double, fz: double` | - | 设置作用在颗粒上的力 |
| `SetMoment` | `mx: double, my: double, mz: double` | - | 设置作用在颗粒上的力矩 |
| `SetPosition` | `pos_x: double, pos_y: double, pos_z: double` | - | 设置颗粒位置 |
| `SetRodrigues` | `angle: double, axis_x: double, axis_y: double, axis_z: double` | - | 使用罗德里格公式设置颗粒旋转 |
| `SetQuaternion` | `q_0: double, q_1: double, q_2: double, q_3: double` | - | 设置颗粒四元数 |
| `SetVelocity` | `v_x: double, v_y: double, v_z: double` | - | 设置颗粒速度 |
| `SetSpin` | `spin_x: double, spin_y: double, spin_z: double` | - | 设置颗粒自旋 |
| `GetVelocity` | `cnt_pos: Vec3d` | `Vec3d` | 获取指定点的速度 |
| `SetDynamicProperty` | `key: str, value: double` | - | 设置动态属性 |
| `GetDynamicProperty` | `key: str` | `double` | 获取动态属性 |
| `AddForce` | `force: Vec3d` | - | 添加力 |
| `AddMoment` | `moment: Vec3d` | - | 添加力矩 |
| `AddForceAtomic` | `force: Vec3d` | - | 线程安全地添加力 |
| `AddMomentAtomic` | `moment: Vec3d` | - | 线程安全地添加力矩 |
| `ClearForce` | 无 | - | 清除力 |
| `ClearMoment` | 无 | - | 清除力矩 |
| `ApplyContactForce` | `contact_pp: ContactPP*` | - | 应用颗粒-颗粒接触力 |
| `ApplyContactForce` | `contact_pw: ContactPW*` | - | 应用颗粒-墙接触力 |
| `UpdateContactForce` | 无 | - | 更新接触力 |
| `UpdateMotion` | `dt: double` | - | 更新运动状态 |
| `UpdateBound` | 无 | - | 更新包围盒 |
| `UpdateBoundFast` | 无 | - | 快速更新包围盒 |
| `BackupContactToDict` | 无 | - | 将接触信息备份到字典 |
| `ClearContactDict` | 无 | - | 清除接触信息字典 |
| `UpdateLinkedCells` | 无 | - | 更新链接单元格 |
| `UpdateLinkedDomains` | 无 | - | 更新链接域 |
| `UpdateLinkedNeighs` | 无 | - | 更新链接邻居 |
| `GetContactPPs` | 无 | `VecXT<ContactPP*>` | 获取所有颗粒-颗粒接触 |
| `GetContactPWs` | 无 | `VecXT<ContactPW*>` | 获取所有颗粒-墙接触 |

## Wall

`Wall`是DEM模拟中的墙体类。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `id` | `int` | 墙体ID |
| `id_in_list` | `int` | 墙体在墙体列表中的索引 |
| `label` | `str` | 墙体标签 |
| `shape` | `Shape*` | 墙体形状 |
| `material_type` | `int` | 材料类型 |
| `enable_rotation` | `bool` | 是否允许旋转 |
| `enable_bound_aabb` | `bool` | 是否启用AABB包围盒 |
| `bound_min` | `Vec3d` | 包围盒最小点 |
| `bound_max` | `Vec3d` | 包围盒最大点 |
| `bound_disp` | `Vec3d` | 包围盒位移 |
| `pos` | `Vec3d` | 墙体位置 |
| `quaternion` | `Vec4d` | 墙体四元数 |
| `force` | `Vec3d` | 作用在墙体上的力 |
| `moment` | `Vec3d` | 作用在墙体上的力矩 |
| `vel` | `Vec3d` | 墙体速度 |
| `spin` | `Vec3d` | 墙体自旋 |
| `dynamic_properties` | `MiniMap<string, double>` | 动态属性表 |
| `need_update_stl_model` | `bool` | 是否需要更新STL模型 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个空的墙体 |
| `__init__` | `shape: Shape*` | - | 创建一个指定形状的墙体 |
| `SetShape` | `shape: Shape*` | - | 设置墙体形状 |
| `SetPosition` | `pos_x: double, pos_y: double, pos_z: double` | - | 设置墙体位置 |
| `SetRodrigues` | `angle: double, axis_x: double, axis_y: double, axis_z: double` | - | 使用罗德里格公式设置墙体旋转 |
| `SetQuaternion` | `q_0: double, q_1: double, q_2: double, q_3: double` | - | 设置墙体四元数 |
| `SetVelocity` | `v_x: double, v_y: double, v_z: double` | - | 设置墙体速度 |
| `SetSpin` | `spin_x: double, spin_y: double, spin_z: double` | - | 设置墙体自旋 |
| `SetSpinWithRespectTo` | `spin_x: double, spin_y: double, spin_z: double, pos_x: double, pos_y: double, pos_z: double` | - | 设置相对于指定点的自旋 |
| `GetVelocity` | `cnt_pos: Vec3d` | `Vec3d` | 获取指定点的速度 |
| `SetDynamicProperty` | `key: str, value: double` | - | 设置动态属性 |
| `GetDynamicProperty` | `key: str` | `double` | 获取动态属性 |
| `AddForce` | `force: Vec3d` | - | 添加力 |
| `AddMoment` | `moment: Vec3d` | - | 添加力矩 |
| `AddForceAtomic` | `force: Vec3d` | - | 线程安全地添加力 |
| `AddMomentAtomic` | `moment: Vec3d` | - | 线程安全地添加力矩 |
| `ClearForce` | 无 | - | 清除力 |
| `ClearMoment` | 无 | - | 清除力矩 |
| `ClearMotion` | 无 | - | 清除运动（速度和自旋） |
| `ApplyContactForce` | `contact_pw: ContactPW*` | - | 应用颗粒-墙接触力 |
| `UpdateSTLModel` | 无 | - | 更新STL模型 |
| `GetSTLModel` | `num_nodes: int=200` | `STLModel` | 获取STL模型 |
| `SaveAsVTK` | `filename: str` | - | 保存为VTK文件 |
| `Print` | 无 | - | 打印墙体信息 |
| `Clone` | 无 | `Wall*` | 克隆墙体 |
| `Init` | 无 | - | 初始化墙体 |
| `UpdateContactForce` | 无 | - | 更新接触力 |
| `UpdateMotion` | `dt: double` | - | 更新运动状态 |
| `UpdateMotion` | `dt: double, pos: Vec3d` | - | 更新相对于指定点的运动状态 |
| `UpdateBound` | 无 | - | 更新包围盒 |
| `UpdateBoundFast` | 无 | - | 快速更新包围盒 |
| `BackupContactToDict` | 无 | - | 将接触信息备份到字典 |
| `UpdateLinkedCells` | 无 | - | 更新链接单元格 |
| `UpdateLinkedNeighs` | 无 | - | 更新链接邻居 |

## WallBoxPlane

`WallBoxPlane`是一个用于创建盒子形状平面墙体的工具类，用平面（Plane）形状创建六个墙体组成一个矩形盒子。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| 平面形状（私有） | `Plane` | 六个平面形状（p_mx, p_px, p_my, p_py, p_mz, p_pz） |
| 墙体（私有） | `Wall` | 六个墙体（w_mx, w_px, w_my, w_py, w_mz, w_pz） |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | `len_x: float, len_y: float, len_z: float, center_x: float, center_y: float, center_z: float` | - | 创建一个具有指定尺寸和中心位置的盒子墙体 |
| `GetShapes` | 无 | `VecXT<Shape*>` | 获取组成盒子的六个平面形状 |
| `GetWall` | 无 | `VecXT<Wall*>` | 获取组成盒子的六个墙体 |
| `ImportToScene` | `scene: Scene*` | - | 将盒子的形状和墙体导入到指定场景中 |

## WallBoxPlate

`WallBoxPlate`是一个用于创建盒子形状板墙体的工具类，用三维网格（TriMesh）形状创建六个墙体组成一个矩形盒子。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| 网格形状（私有） | `TriMesh` | 三个网格形状（p_x0, p_y0, p_z0），分别用于创建x、y、z方向的墙体 |
| 墙体（私有） | `Wall` | 六个墙体（w_mx, w_px, w_my, w_py, w_mz, w_pz） |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | `len_x: float, len_y: float, len_z: float, center_x: float, center_y: float, center_z: float` | - | 创建一个具有指定尺寸和中心位置的盒子墙体 |
| `GetShapes` | 无 | `VecXT<Shape*>` | 获取组成盒子的三个网格形状 |
| `GetWall` | 无 | `VecXT<Wall*>` | 获取组成盒子的六个墙体 |
| `ImportToScene` | `scene: Scene*` | - | 将盒子的形状和墙体导入到指定场景中 |

## BondedSpheres

`BondedSpheres`是键合球体类，用于创建由多个球体构成的复杂形状。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `center` | `Vec3d` | 中心位置 |
| `quat` | `Vec4d` | 四元数 |
| `sub_sphere_pos` | `VecXT<Vec3d>` | 子球体位置列表 |
| `sub_sphere_radius` | `VecXT<double>` | 子球体半径列表 |
| `sphere_list` | `VecXT<Shape*>` | 球体形状列表 |
| `particle_list` | `VecXT<Particle*>` | 颗粒列表 |
| `contact_list` | `VecXT<ContactPP*>` | 接触列表 |
| `bond_pair_list` | `VecXT<std::pair<int, int>>` | 键合对列表 |
| `bond_model` | `ContactModel*` | 键合接触模型 |
| `bond_margin` | `double` | 键合边界余量 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个空的键合球体 |
| `SetPosition` | `pos_x: double, pos_y: double, pos_z: double` | - | 设置位置 |
| `SetQuaternion` | `q_0: double, q_1: double, q_2: double, q_3: double` | - | 设置四元数 |
| `SetBondModel` | `model: ContactModel*` | - | 设置键合接触模型 |
| `SetBondMargin` | `margin: double` | - | 设置键合边界余量 |
| `Translate` | `dx: double, dy: double, dz: double` | - | 平移键合球体 |
| `RotateByRodrigues` | `angle: double, axis_x: double, axis_y: double, axis_z: double` | - | 使用罗德里格公式旋转键合球体 |
| `GetCentroid` | 无 | `Vec3d` | 获取质心位置 |
| `AddSubSphere` | `pos_x: double, pos_y: double, pos_z: double, radius: double` | - | 添加子球体 |
| `InitFromSTL` | `stl_file: str, resolution: int` | - | 从STL文件初始化 |
| `InitFromSTL` | `stl_model: STLModel, resolution: int` | - | 从STL模型初始化 |
| `InitFromGrid` | `len_x: float, len_y: float, len_z: float, num_x: int, num_y: int, num_z: int` | - | 从网格初始化 |
| `InitFromSpheres` | `spheres: VecXT<Shape*>` | - | 从球体列表初始化 |
| `AddSphere` | `sphere: Shape*` | - | 添加球体 |
| `MakePorosity` | 无 | - | 生成多孔结构 |
| `InitBonds` | 无 | - | 初始化键合 |
| `GetParticles` | 无 | `VecXT<Particle>` | 获取组成键合球体的颗粒列表 |
| `ImportToScene` | `scene: Scene*` | - | 将键合球体导入到场景中 |
| `Clear` | 无 | - | 清除所有子球体 |

## BondedVoronois

`BondedVoronois`是键合Voronoi类，用于创建由多个Voronoi单元构成的复杂形状。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `center` | `Vec3d` | 中心位置 |
| `quat` | `Vec4d` | 四元数 |
| `sub_points` | `VecXT<Vec3d>` | 子Voronoi点列表 |
| `sub_radii` | `VecXT<double>` | 子Voronoi半径列表 |
| `alpha` | `double` | Alpha值，控制Voronoi形状 |
| `beta` | `double` | Beta值，控制Voronoi形状 |
| `trimesh_list` | `VecXT<Shape*>` | 三维网格形状列表 |
| `particle_list` | `VecXT<Particle*>` | 颗粒列表 |
| `contact_list` | `VecXT<ContactPP*>` | 接触列表 |
| `bond_pair_list` | `VecXT<std::pair<int, int>>` | 键合对列表 |
| `cvt_max_iters` | `int` | CVT最大迭代次数 |
| `cvt_tol` | `double` | CVT收敛容差 |
| `bond_model` | `ContactModel*` | 键合接触模型 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个空的键合Voronoi |
| `SetPosition` | `pos_x: double, pos_y: double, pos_z: double` | - | 设置位置 |
| `SetQuaternion` | `q_0: double, q_1: double, q_2: double, q_3: double` | - | 设置四元数 |
| `SetBondModel` | `model: ContactModel*` | - | 设置键合接触模型 |
| `Translate` | `dx: double, dy: double, dz: double` | - | 平移键合Voronoi |
| `RotateByRodrigues` | `angle: double, axis_x: double, axis_y: double, axis_z: double` | - | 使用罗德里格公式旋转键合Voronoi |
| `GetCentroid` | 无 | `Vec3d` | 获取质心位置 |
| `AddSubPoint` | `pos_x: double, pos_y: double, pos_z: double, radius: double` | - | 添加子Voronoi点 |
| `InitFromSTL` | `stl_file: str, resolution: int` | - | 从STL文件初始化 |
| `InitFromSTL` | `stl_model: STLModel, resolution: int` | - | 从STL模型初始化 |
| `MakePorosity` | 无 | - | 生成多孔结构 |
| `InitBonds` | 无 | - | 初始化键合 |
| `GetParticles` | 无 | `VecXT<Particle>` | 获取组成键合Voronoi的颗粒列表 |
| `SaveAsVTK` | `filename: str` | - | 保存为VTK文件 |
| `ImportToScene` | `scene: Scene*` | - | 将键合Voronoi导入到场景中 |
| `Clear` | 无 | - | 清除所有子Voronoi点 |

## ContactPP

`ContactPP`是颗粒-颗粒接触类。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `particle_1` | `Particle*` | 接触中的第一个颗粒 |
| `particle_2` | `Particle*` | 接触中的第二个颗粒 |
| `bond_model` | `ContactModel*` | 粘结接触模型 |
| `collision_model` | `ContactModel*` | 碰撞接触模型 |
| `bond_entries` | `VecXT<BondEntry>` | 粘结点列表 |
| `collision_entries` | `VecXT<CollisionEntry>` | 碰撞点列表 |
| `active` | `bool` | 接触是否活跃 |
| `dynamic_properties` | `MiniMap<string, double>` | 动态属性表 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个空的颗粒-颗粒接触 |
| `__init__` | `p1: Particle*, p2: Particle*` | - | 创建一个指定颗粒对的接触 |
| `SetBondModel` | `model: ContactModel*` | - | 设置粘结接触模型 |
| `SetCollisionModel` | `model: ContactModel*` | - | 设置碰撞接触模型 |
| `SetDynamicProperty` | `key: str, value: double` | - | 设置动态属性 |
| `EvaluateForces` | `dt: double` | - | 计算接触力 |
| `ApplyToParticle` | 无 | - | 将接触力应用到颗粒 |
| `ApplyToParticle1` | 无 | - | 将接触力应用到第一个颗粒 |
| `ApplyToParticle2` | 无 | - | 将接触力应用到第二个颗粒 |
| `IsActive` | 无 | `bool` | 检查接触是否活跃 |
| `Clear` | 无 | - | 清除接触 |
| `Print` | 无 | - | 打印接触信息 |

## ContactPW

`ContactPW`是颗粒-墙接触类。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `particle` | `Particle*` | 接触中的颗粒 |
| `wall` | `Wall*` | 接触中的墙体 |
| `bond_model` | `ContactModel*` | 粘结接触模型 |
| `collision_model` | `ContactModel*` | 碰撞接触模型 |
| `bond_entries` | `VecXT<BondEntry>` | 粘结点列表 |
| `collision_entries` | `VecXT<CollisionEntry>` | 碰撞点列表 |
| `active` | `bool` | 接触是否活跃 |
| `dynamic_properties` | `MiniMap<string, double>` | 动态属性表 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个空的颗粒-墙接触 |
| `__init__` | `p: Particle*, w: Wall*` | - | 创建一个指定颗粒和墙体的接触 |
| `SetBondModel` | `model: ContactModel*` | - | 设置粘结接触模型 |
| `SetCollisionModel` | `model: ContactModel*` | - | 设置碰撞接触模型 |
| `SetDynamicProperty` | `key: str, value: double` | - | 设置动态属性 |
| `EvaluateForces` | `dt: double` | - | 计算接触力 |
| `ApplyToParticle` | 无 | - | 将接触力应用到颗粒 |
| `ApplyToWall` | 无 | - | 将接触力应用到墙体 |
| `IsActive` | 无 | `bool` | 检查接触是否活跃 |
| `Clear` | 无 | - | 清除接触 |
| `Print` | 无 | - | 打印接触信息 | 