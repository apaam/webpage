# NetDEM Python API 参考文档 - Utils模块

本文档提供了NetDEM软件中Utils模块相关的Python API接口说明。Utils模块包含了各种实用工具类和函数，为其他模块提供基础功能支持。

## 目录

- [Math](#math)
- [LevelSetFunction](#levelsetfunction)
- [STLReader](#stlreader)
- [STLModel](#stlmodel)
- [WSCVTSampler](#wscvtsampler)
- [Voronoi](#voronoi)
- [CorkWrapper](#corkwrapper)

## Math

`Math`子模块提供了基本的数学常量和函数。

### 常量

| 常量名 | 类型 | 描述 |
|--------|------|------|
| `PI` | `float` | 圆周率π的值 |

## LevelSetFunction

`LevelSetFunction`类用于处理水平集函数，可以用来表示和操作隐式几何形状。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的LevelSetFunction实例 |
| `SetCorner` | `corner: Vec3d` | - | 设置计算域的角点 |
| `SetSpacing` | `spacing: Vec3d` | - | 设置网格间距 |
| `SetDimension` | `dim: Vec3i` | - | 设置计算域的维度 |
| `GetSignedDistance` | `pos: Vec3d` | `float` | 获取指定位置的有符号距离 |
| `SignedDistance` | `pos: Vec3d` | `float` | 计算指定位置的有符号距离 |
| `GradientInterpolate` | `pos: Vec3d` | `Vec3d` | 计算指定位置的梯度（插值） |
| `GradientMinus` | `pos: Vec3d` | `Vec3d` | 计算指定位置的向后差分梯度 |
| `GradientPlus` | `pos: Vec3d` | `Vec3d` | 计算指定位置的向前差分梯度 |
| `Reinitialization` | `max_iter: int, dt: float` | - | 重新初始化水平集函数（带参数） |
| `Reinitialization` | 无 | - | 重新初始化水平集函数（使用默认参数） |

## STLReader

`STLReader`类用于读取STL格式的3D模型文件。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的STLReader实例 |
| `ReadFile` | `filename: str` | `STLModel` | 从文件读取STL模型（静态方法） |

## STLModel

`STLModel`类用于表示和操作三角网格模型。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `vertices` | `VecXT<Vec3d>` | 顶点列表 |
| `facets` | `VecXT<Vec3i>` | 面片列表（每个面片包含三个顶点索引） |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个空的STLModel实例 |
| `__init__` | `vertices: VecXT<Vec3d>, facets: VecXT<Vec3i>` | - | 用给定的顶点和面片创建STLModel实例 |
| `InitFromSTL` | `filename: str` | - | 从STL文件初始化模型 |
| `InitFromOFF` | `filename: str` | - | 从OFF文件初始化模型 |
| `Translate` | `translation: Vec3d` | - | 平移模型 |
| `Rotate` | `rotation: Vec4d` | - | 旋转模型（四元数） |
| `CopyPose` | `other: STLModel` | - | 复制另一个模型的位姿 |
| `CopyPoseDev` | `other: STLModel` | - | 复制另一个模型的位姿（带偏差） |
| `SaveAsVTK` | `filename: str` | - | 保存为VTK文件 |
| `SaveAsSTL` | `filename: str` | - | 保存为STL文件 |
| `RemoveUnreferencedVertices` | 无 | - | 移除未被引用的顶点 |
| `RemoveDuplicateVertices` | 无 | - | 移除重复的顶点 |
| `ReorientFacets` | 无 | - | 重新定向面片（使法向量一致） |
| `Decimate` | `target_count: int` | - | 简化网格到指定的面片数量 |
| `Standardize` | 无 | - | 标准化模型（居中和缩放） |
| `SetSize` | `size: float` | - | 设置模型的尺寸 |
| `MakeConvex` | 无 | - | 将模型转换为凸包 |
| `SmoothMesh` | 无 | - | 平滑网格 |
| `MergeSTLModel` | `other: STLModel` | - | 合并另一个STL模型 |
| `GetTriangleStrips` | 无 | `VecXT<Vec3i>` | 获取三角形带 |
| `IsFaceOutside` | `face_id: int` | `bool` | 检查面片是否朝外 |
| `CheckConvexity` | 无 | `bool` | 检查模型是否为凸形状 |
| `Enclose` | `point: Vec3d` | `bool` | 检查点是否在模型内部 |
| `Print` | 无 | - | 打印模型信息 |
| `GetSize` | 无 | `float` | 获取模型的尺寸 |
| `GetCenter` | 无 | `Vec3d` | 获取模型的中心点 |
| `GetSurfaceArea` | 无 | `float` | 获取模型的表面积 |
| `GetVolume` | 无 | `float` | 获取模型的体积 |
| `GetInertia` | 无 | `Mat3d` | 获取模型的惯性张量 |

## WSCVTSampler

`WSCVTSampler`类实现了加权球面质心Voronoi镶嵌（Weighted Spherical Centroidal Voronoi Tessellation）采样算法。

### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `max_iters` | `int` | 最大迭代次数 |
| `tol` | `float` | 收敛容差 |

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `GetInstance` | 无 | `WSCVTSampler` | 获取单例实例 |
| `Get` | `num_samples: int, new_random: bool=false` | `VecXT<Vec3d>` | 获取采样点。参数说明：<br>- `num_samples`: 采样点数量<br>- `new_random`: 是否使用新的随机种子 |

## Voronoi

`Voronoi`类用于生成和处理Voronoi图。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的Voronoi实例 |
| `Solve` | `points: VecXT<Vec3d>, stl_model: STLModel, check_boundary: bool` | - | 根据给定点集和STL模型求解Voronoi图 |
| `Solve` | `stl_model: STLModel, num_points: int, max_iter: int, tol: float, check_boundary: bool` | - | 在STL模型内生成并求解Voronoi图 |
| `SaveAsVTK` | `filename: str` | - | 将Voronoi图保存为VTK文件 |

## CorkWrapper

`CorkWrapper`类提供了布尔运算相关的功能。

### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `__init__` | 无 | - | 创建一个新的CorkWrapper实例 |
| `MeshIntersect` | `vertices1: VecXT<Vec3d>, facets1: VecXT<Vec3i>, vertices2: VecXT<Vec3d>, facets2: VecXT<Vec3i>` | `tuple[VecXT<Vec3d>, VecXT<Vec3i>]` | 计算两个网格的交集 |

### 使用示例

```python
# 使用STLModel读取和处理3D模型
reader = netdem.STLReader()
model = reader.ReadFile("model.stl")
model.SetSize(1.0)  # 设置模型尺寸
model.MakeConvex()  # 转换为凸包
model.SaveAsVTK("output.vtk")  # 保存结果

# 使用WSCVTSampler生成均匀分布的球面点
sampler = netdem.WSCVTSampler.GetInstance()
sampler.max_iters = 100
sampler.tol = 1e-6
points = sampler.Get(1000)  # 生成1000个点

# 使用Voronoi生成剖分
voronoi = netdem.Voronoi()
voronoi.Solve(points, model, True)
voronoi.SaveAsVTK("voronoi.vtk")
``` 