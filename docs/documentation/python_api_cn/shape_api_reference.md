# NetDEM Python API 参考文档 - Shape模块

本文档提供了NetDEM软件中Shape模块相关的Python API接口说明。Shape模块包含了各种几何形状的定义和操作，为离散元模拟中的颗粒和墙体提供几何表示。

## 目录

- [Shape](#shape)
- [Sphere](#sphere)
- [PointSphere](#pointsphere)
- [Plane](#plane)
- [Triangle](#triangle)
- [Cylinder](#cylinder)
- [Ellipsoid](#ellipsoid)
- [SphericalHarmonics](#sphericalharmonics)
- [PolySuperEllipsoid](#polysuperellipsoid)
- [PolySuperQuadrics](#polysuperquadrics)
- [LevelSet](#levelset)
- [TriMesh](#trimesh)

## Shape

`Shape`是所有几何形状的基类，提供了形状的基本属性和方法。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `id` | `int` | 形状的唯一标识符 |
| `label` | `str` | 形状的标签 |
| `shape_type` | `Shape.Type` | 形状的类型 |
| `shape_name` | `str` | 形状的名称 |
| `use_customized_solver` | `bool` | 是否使用自定义求解器 |
| `render_mesh` | `STLModel` | 用于渲染的网格模型 |

### 枚举

| 枚举 | 值 | 描述 |
|------|-----|------|
| `Shape.Type` | `none` | 未指定类型 |
| | `point_sphere` | 点球体类型 |
| | `sphere` | 球体类型 |
| | `spherical_harmonics` | 球谐函数类型 |
| | `trimesh` | 三角网格类型 |
| | `trimesh_convex` | 凸三角网格类型 |
| | `ellipsoid` | 椭球体类型 |
| | `polybezier` | 多重贝塞尔曲线类型 |
| | `triangle` | 三角形类型 |
| | `plane` | 平面类型 |
| | `cylinder` | 圆柱体类型 |
| | `poly_super_ellipsoid` | 多重超椭球体类型 |
| | `poly_super_quadrics` | 多重超二次曲面类型 |
| | `level_set` | 水平集类型 |
| | `netsdf` | 网络符号距离函数类型 |
| | `coded_netsdf` | 编码网络符号距离函数类型 |
| | `num_shapes` | 形状类型总数 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的Shape实例 |
| `PackJson` | 无 | `dict` | 将形状数据打包为JSON格式 |
| `InitFromJsonFile` | `filename: str` | - | 从JSON文件初始化形状 |
| `GetSize` | 无 | `float` | 获取形状的尺寸（等体积球的直径） |
| `GetVolume` | 无 | `float` | 获取形状的体积 |
| `GetInertia` | 无 | `Mat3d` | 获取形状的惯性张量 |
| `GetInertiaPrincipal` | 无 | `Vec3d` | 获取形状的主惯性 |
| `GetBoundAABB` | 无 | `tuple[Vec3d, Vec3d]` | 获取形状的轴对齐包围盒（最小点和最大点） |
| `GetBoundAABB` | `pos: Vec3d, quat: Vec4d` | `tuple[Vec3d, Vec3d]` | 获取指定位置和方向下形状的轴对齐包围盒 |
| `GetBoundSphereRadius` | 无 | `float` | 获取形状的包围球半径 |
| `GetSkin` | 无 | `float` | 获取形状的皮肤厚度（用于接触检测） |
| `GetSkinFactor` | 无 | `float` | 获取形状的皮肤系数 |
| `EnableSurfaceNodes` | 无 | - | 启用表面节点 |
| `DisableSurfaceNodes` | 无 | - | 禁用表面节点 |
| `IsSurfaceNodesEnabled` | 无 | `bool` | 检查表面节点是否启用 |
| `GetSurfaceNodeNum` | 无 | `int` | 获取表面节点数 |
| `GetSurfaceNodes` | 无 | `VecXT<Vec3d>` | 获取表面节点列表 |
| `GetSurfaceNodeAreas` | 无 | `VecXT<float>` | 获取表面节点面积列表 |
| `GetSurfaceNodeSpacing` | 无 | `float` | 获取表面节点间距 |
| `GetRenderMesh` | 无 | `STLModel` | 获取渲染用的网格模型 |
| `CheckConvexity` | 无 | `bool` | 检查形状是否为凸形状 |
| `Translate` | `translation: Vec3d` | - | 平移形状 |
| `UpdateSurfaceNodes` | 无 | - | 更新表面节点 |
| `UpdateRenderMesh` | `num_nodes: int=200` | - | 更新渲染网格 |
| `UpdateShapeProperties` | 无 | - | 更新形状属性 |
| `SetSize` | `size: float` | - | 设置形状的尺寸 |
| `SetSkin` | `skin: float` | - | 设置形状的皮肤厚度 |
| `SetSkinFactor` | `factor: float` | - | 设置形状的皮肤系数 |
| `SetSurfaceNodeNum` | `num: int` | - | 设置表面节点数 |
| `SetSurfaceNodes` | `nodes: VecXT<Vec3d>` | - | 设置表面节点 |
| `SetSurfaceNodes` | `stl_model: STLModel` | - | 从STL模型设置表面节点 |
| `Clone` | 无 | `Shape` | 克隆形状 |
| `GetSTLModel` | `num_nodes: int=200` | `STLModel` | 获取形状的STL模型 |
| `SaveAsVTK` | `filename: str` | - | 将形状保存为VTK文件 |
| `SaveAsSTL` | `filename: str` | - | 将形状保存为STL文件 |
| `SupportPoint` | `direction: Vec3d` | `Vec3d` | 获取给定方向上的支撑点 |
| `SupportPoints` | `direction: Vec3d` | `VecXT<Vec3d>` | 获取给定方向上的多个支撑点 |
| `SignedDistance` | `position: Vec3d` | `float` | 计算点到形状的有符号距离 |
| `SurfacePoint` | `position: Vec3d` | `Vec3d` | 计算给定点最近的表面点 |
| `Enclose` | `position: Vec3d` | `bool` | 检查点是否在形状内部 |
| `CheckPrincipal` | 无 | `bool` | 检查形状是否按主轴对齐 |
| `Print` | 无 | - | 打印形状信息 |

## Sphere

`Sphere`类表示一个球体形状。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| 继承自`Shape`的所有属性 | | |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个默认球体 |
| `__init__` | `diameter: float` | - | 创建一个指定直径的球体 |
| `Clone` | 无 | `Sphere` | 克隆球体 |
| `PackJson` | 无 | `dict` | 将球体数据打包为JSON格式 |
| `InitFromJson` | `json_data: dict` | - | 从JSON数据初始化球体 |
| `Init` | 无 | - | 初始化球体 |
| `UpdateSurfaceNodes` | 无 | - | 更新表面节点 |
| `UpdateShapeProperties` | 无 | - | 更新形状属性 |
| `GetSTLModel` | `num_nodes: int=200` | `STLModel` | 获取球体的STL模型 |
| `SupportPoint` | `direction: Vec3d` | `Vec3d` | 获取给定方向上的支撑点 |
| `SupportPoints` | `direction: Vec3d` | `VecXT<Vec3d>` | 获取给定方向上的多个支撑点 |
| `SignedDistance` | `position: Vec3d` | `float` | 计算点到球体的有符号距离 |
| `SurfacePoint` | `position: Vec3d` | `Vec3d` | 计算给定点最近的表面点 |

## PointSphere

`PointSphere`类表示一个点球体形状，通常用于离散元模拟中的接触检测优化。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `node_area_corrector` | `float` | 节点面积校正系数 |
| 继承自`Shape`的所有属性 | | |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个默认点球体 |
| `__init__` | `diameter: float` | - | 创建一个指定直径的点球体 |

## Plane

`Plane`类表示一个平面形状。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `center` | `Vec3d` | 平面的中心点 |
| `dir_n` | `Vec3d` | 平面的法向量 |
| `extent` | `float` | 平面的扩展范围 |
| 继承自`Shape`的所有属性 | | |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个默认平面 |
| `__init__` | `center_x: float, center_y: float, center_z: float, normal_x: float, normal_y: float, normal_z: float` | - | 创建一个指定中心点和法向量的平面 |
| `SetExtent` | `extent: float` | - | 设置平面的扩展范围 |
| `SetCenter` | `center: Vec3d` | - | 设置平面的中心点 |
| `SetNormal` | `normal: Vec3d` | - | 设置平面的法向量 |

## Triangle

`Triangle`类表示一个三角形形状。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `vertices` | `VecXT<Vec3d>` | 三角形的三个顶点 |
| `dir_n` | `Vec3d` | 三角形的法向量 |
| 继承自`Shape`的所有属性 | | |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个默认三角形 |
| `__init__` | `v1: Vec3d, v2: Vec3d, v3: Vec3d` | - | 创建一个由三个顶点定义的三角形 |
| `SetVertices` | `v1: Vec3d, v2: Vec3d, v3: Vec3d` | - | 设置三角形的顶点 |

## Cylinder

`Cylinder`类表示一个圆柱体形状。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `radius` | `float` | 圆柱体的半径 |
| `height` | `float` | 圆柱体的高度 |
| 继承自`Shape`的所有属性 | | |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个默认圆柱体 |
| `__init__` | `radius: float, height: float` | - | 创建一个指定半径和高度的圆柱体 |
| `Init` | 无 | - | 初始化圆柱体 |

## Ellipsoid

`Ellipsoid`类表示一个椭球体形状。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `axis_a` | `float` | 椭球体的x轴半径 |
| `axis_b` | `float` | 椭球体的y轴半径 |
| `axis_c` | `float` | 椭球体的z轴半径 |
| 继承自`Shape`的所有属性 | | |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个默认椭球体 |
| `__init__` | `axis_a: float, axis_b: float, axis_c: float` | - | 创建一个指定三轴半径的椭球体 |
| `Init` | 无 | - | 初始化椭球体 |

## SphericalHarmonics

`SphericalHarmonics`类表示一个由球谐函数定义的形状。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `degree` | `int` | 球谐函数的次数 |
| `a_nm` | `VecXT<float>` | 球谐系数 |
| 继承自`Shape`的所有属性 | | |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个默认球谐形状 |
| `__init__` | `degree: int` | - | 创建一个指定次数的球谐形状 |
| `Init` | 无 | - | 初始化球谐形状 |
| `InitFromSTL` | `filename: str` | - | 从STL文件初始化球谐形状 |
| `InitFromSTL` | `stl_model: STLModel` | - | 从STL模型初始化球谐形状 |

## PolySuperEllipsoid

`PolySuperEllipsoid`类表示一个多重超椭球体形状。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `axis_a` | `float` | x轴半径 |
| `axis_b` | `float` | y轴半径 |
| `axis_c` | `float` | z轴半径 |
| `order_ab` | `float` | xy平面的形状参数 |
| `order_c` | `float` | z方向的形状参数 |
| 继承自`Shape`的所有属性 | | |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个默认多重超椭球体 |
| `__init__` | `axis_a: float, axis_b: float, axis_c: float, order_ab: float, order_c: float, ...` | - | 创建一个指定参数的多重超椭球体 |
| `Init` | 无 | - | 初始化多重超椭球体 |

## PolySuperQuadrics

`PolySuperQuadrics`类表示一个多重超二次曲面形状。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `axis_a` | `float` | x轴半径 |
| `axis_b` | `float` | y轴半径 |
| `axis_c` | `float` | z轴半径 |
| `order_a` | `float` | x方向的形状参数 |
| `order_b` | `float` | y方向的形状参数 |
| `order_c` | `float` | z方向的形状参数 |
| 继承自`Shape`的所有属性 | | |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个默认多重超二次曲面 |
| `__init__` | `axis_a: float, axis_b: float, axis_c: float, order_a: float, order_b: float, order_c: float, ...` | - | 创建一个指定参数的多重超二次曲面 |
| `Init` | 无 | - | 初始化多重超二次曲面 |

## LevelSet

`LevelSet`类表示一个由水平集函数定义的形状。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个默认水平集形状 |
| `InitFromSTL` | `filename: str, resolution: int` | - | 从STL文件初始化水平集形状 |
| `InitFromSTL` | `stl_model: STLModel, resolution: int` | - | 从STL模型初始化水平集形状 |
| `InitFromDistanceMap` | `distance_map: array` | - | 从距离图初始化水平集形状 |
| `SurfacePoint` | `position: Vec3d` | `Vec3d` | 计算给定点最近的表面点 |
| `AlignAxes` | 无 | - | 将水平集对齐到主轴 |

## TriMesh

`TriMesh`类表示一个由三角形网格定义的形状。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `vertices` | `VecXT<Vec3d>` | 三角网格的顶点列表 |
| `facets` | `VecXT<Vec3i>` | 三角网格的面片列表，每个面片包含三个顶点索引 |
| 继承自`Shape`的所有属性 | | |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个默认三角网格形状 |
| `Init` | 无 | - | 初始化三角网格形状 |
| `InitFromSTL` | `filename: str` | - | 从STL文件初始化三角网格形状 |
| `InitFromOFF` | `filename: str` | - | 从OFF文件初始化三角网格形状 |
| `InitFromSTL` | `stl_model: STLModel` | - | 从STL模型初始化三角网格形状 |
| `Decimate` | `num_nodes: int` | - | 简化三角网格到指定节点数 |
| `MakeConvex` | 无 | - | 将三角网格转换为凸包 |
| `AlignAxes` | 无 | - | 将三角网格对齐到主轴 | 