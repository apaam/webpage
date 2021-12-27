### 

[This page is prepared in Chinese, and will be part of a book aiming at beginers of DEM.]

-------

### 聚合超椭球（Poly-super-ellipsoid）

#### 表达式（Formulation）

超椭球的表面可表示为 [@Zhao_Zhao_2019]

$$
\begin{align}
  f(x, y, z) = \left( \left| \frac{x}{r_{x}} \right|^{\frac{2}{\epsilon_{1}}} 
    + \left| \frac{y}{r_{y}} \right|^{\frac{2}{\epsilon_{1}}} \right)^{\frac{\epsilon_{1}}{\epsilon_{2}}}
    + \left| \frac{z}{r_{z}} \right|^{\frac{2}{\epsilon_{2}}} - 1 = 0
  \label{eq:poly_super_ellipsoid}
\end{align}
$$

其中，$r_{x}$、$r_{y}$ 和 $r_{z}$ 分别为超椭球在 $x$、$y$ 和 $z$ 方向的半轴长（semi-pricinpal axis length）；$\epsilon_{1}$ 和 $\epsilon_{2}$ 是表征超椭球球度或块度（blockness）的两个形状参数。当参数 $\epsilon_{1}$ 和 $\epsilon_{2}$ 在 (0, 2) 区间内时，超椭球为凸型；否则为非凸型。对于聚合超椭球，半轴长参数 $r_{x}$ 在负X轴象限取 $r_{x^-}$，在正X轴象限取 $r_{x^+}$；$r_{y}$ 和 $r_{z}$ 亦然。

#### 支撑映射（Support mapping）

参考笛卡尔坐标系和球坐标系之间的坐标变换，超椭球的球坐标参数化可表示为（注，以第一象限为例、正负号已省略）

$$
\begin{align}
  x &= r_x (\sin\theta)^{\epsilon_2} (\cos\varphi)^{\epsilon_1} \\
  y &= r_y (\sin\theta)^{\epsilon_2} (\sin\varphi)^{\epsilon_1} \\
  z &= r_z (\cos\theta)^{\epsilon_2}
\end{align}
$$

其中，$\theta$ 和 $\varphi$ 分别为极角（polar angle）与方位角（azimuth angle）。把$x$、$y$ 和 $z$分别对$\theta$ 和 $\varphi$ 求偏导，可得超椭球表面的方向向量为

$$
\begin{align}
  x_\theta &= \epsilon_2 r_x (\sin\theta)^{\epsilon_2-1} (\cos\theta) 
    (\cos\varphi)^{\epsilon_1} \\
  y_\theta &= \epsilon_2 r_y (\sin\theta)^{\epsilon_2-1} (\cos\theta)
    (\sin\varphi)^{\epsilon_1} \\
  z_\theta &= \epsilon_2 r_z (\cos\theta)^{\epsilon_2-1} (-\sin\theta)
\end{align}
$$

以及

$$
\begin{align}
  x_\varphi &= \epsilon_1 r_x (\sin\theta)^{\epsilon_2} 
    (\cos\varphi)^{\epsilon_1-1} (-\sin\varphi) \\
  y_\varphi &= \epsilon_1 r_y (\sin\theta)^{\epsilon_2} 
    (\sin\varphi)^{\epsilon_1-1} (\cos\varphi) \\
  z_\varphi &= 0
\end{align}
$$

求两个方向向量的叉乘、并化简，可得到超椭球表面的法方向为（注，法方向各分量同时除于了 $\epsilon_1 \epsilon_2 r_x r_y r_z (\sin\theta)^{2\epsilon_2-1} (\cos\theta)^{\epsilon_2-1} (\sin\varphi)^{\epsilon_1-1} (\cos\varphi)^{\epsilon_1-1}$ ）

$$
\begin{align}
  n_x &= \frac{k}{r_x} (\sin\theta)^{2-\epsilon_2} (\cos\varphi)^{2-\epsilon_1}  \\
  n_y &= \frac{k}{r_y} (\sin\theta)^{2-\epsilon_2} (\sin\varphi)^{2-\epsilon_1}  \\
  n_z &= \frac{k}{r_z} (\cos\theta)^{2-\epsilon_2} 
\end{align}
$$

其中，$n_x$、$n_y$ 和 $n_z$ 为法方向在X、Y、Z三个方向的分量；$k$ 为一缩放系数使得($n_x$、$n_y$ 和 $n_z$)为单位向量。若给定某点的法方向，则该点的球坐标参数 $\theta$ 和 $\varphi$ 可由下式计算：

$$
\begin{align}
  \varphi &= \text{atan2}
    \left(
      (r_y n_y)^{\frac{1}{2-\epsilon_1}}, (r_x n_x)^{\frac{1}{2-\epsilon_1}}
    \right) \\
  \theta &= \text{atan2}
    \left(
      \left(r_x n_x / (\cos\varphi)^{2-\epsilon_1} \right)^{\frac{1}{2-\epsilon_2}}, 
        (r_z n_z)^{\frac{1}{2-\epsilon_2}}
    \right) \\
  \text{or} \quad
  \theta &= \text{atan2}
    \left(
      \left(r_y n_y / (\sin\varphi)^{2-\epsilon_1} \right)^{\frac{1}{2-\epsilon_2}}, 
        (r_z n_z)^{\frac{1}{2-\epsilon_2}}
    \right)
\end{align}
$$

#### 有向距离场（Signed distance field）

给定查询节点 $P$，该点在聚合超椭球表面的投影定义为

$$
\begin{align}
  \vec{x}_Q = (x_Q、y_Q、z_Q) = (c x_P、c y_P、c z_P)
\end{align}
$$

其中，$x$、$y$ 和 $z$ 表示点在X、Y、Z三个方向的坐标；下标 $P$ and $Q$ 表示点 $P$ 和 $Q$；参数 $c$ 为缩放系数使得点 $Q$ 在聚合超椭球上，即满足方程 \eqref{eq:poly_super_ellipsoid}。 将点 $Q$ 带入方程 \eqref{eq:poly_super_ellipsoid} 可求得参数 $c$，为

$$
\begin{align}
  c = \left( \frac{1}{f(\vec{x}_P)+1} \right)^{\frac{\epsilon_2}{2}}
\end{align}
$$

有向距离场可定义为点 $P$ 和 $Q$ 之间的距离，为

$$
\begin{align}
  \Phi(\vec{x}_P) = (c-1)||\vec{x}_P||
\end{align}
$$

其中，$||\vec{x}_P||$ 表示向量 $\vec{x}_P$ 的欧拉长度，即二阶范数。

-------

### 聚合超二次曲面（Poly-super-quadrics)

#### 表达式（Formulation）

超二次曲面可表示为

$$
\begin{align}
  f(x, y, z) = \left| \frac{x}{r_{x}} \right|^{\frac{2}{\epsilon_x}}
    + \left| \frac{y}{r_{y}} \right|^{\frac{2}{\epsilon_y}} 
    + \left| \frac{z}{r_{z}} \right|^{\frac{2}{\epsilon_z}} - 1 = 0
  \label{eq:poly_super_quadrics}
\end{align}
$$

其中，$r_{x}$、$r_{y}$ 和 $r_{z}$ 分别为超二次曲面在 $x$、$y$ 和 $z$ 方向的半轴长（semi-pricinpal axis length）；$\epsilon_{x}$、$\epsilon_{y}$ 和 $\epsilon_{z}$ 是表征超二次曲面球度或块度（blockness）的三个形状参数。当参数 $\epsilon_{x}$、$\epsilon_{y}$ 和 $\epsilon_{z}$ 在 (0, 2) 区间内时，超二次曲面为凸型；否则为非凸型。对于聚合超二次曲面，半轴长参数 $r_{x}$ 在负X轴象限取 $r_{x^-}$，在正X轴象限取 $r_{x^+}$；形状参数 $\epsilon_{x}$ 在负X轴象限取 $\epsilon_{x^-}$，在正X轴象限取 $\epsilon_{x^+}$；$r_{y}$、$r_{z}$、$\epsilon_{y}$ 和 $\epsilon_{z}$ 亦然。

#### 支撑映射（Support mapping）

参考笛卡尔坐标系和球坐标系之间的坐标变换，超椭球的球坐标参数化可表示为

$$
\begin{align}
  x &= r_x (\sin\theta)^{\epsilon_x} (\cos\varphi)^{\epsilon_x} \\
  y &= r_y (\sin\theta)^{\epsilon_y} (\sin\varphi)^{\epsilon_y} \\
  z &= r_z (\cos\theta)^{\epsilon_z}
\end{align}
$$

其中，$\theta$ 和 $\varphi$ 分别为极角（polar angle）与方位角（azimuth angle）。把$x$、$y$ 和 $z$分别对$\theta$ 和 $\varphi$ 求偏导，可得超椭球表面的方向向量为

$$
\begin{align}
  x_\theta &= \epsilon_x r_x (\sin\theta)^{\epsilon_x-1} (\cos\theta) 
    (\cos\varphi)^{\epsilon_x} \\
  y_\theta &= \epsilon_y r_y (\sin\theta)^{\epsilon_y-1} (\cos\theta)
    (\sin\varphi)^{\epsilon_y} \\
  z_\theta &= \epsilon_z r_z (\cos\theta)^{\epsilon_z-1} (-\sin\theta)
\end{align}
$$

以及

$$
\begin{align}
  x_\varphi &= \epsilon_x r_x (\sin\theta)^{\epsilon_x} 
    (\cos\varphi)^{\epsilon_x-1} (-\sin\varphi) \\
  y_\varphi &= \epsilon_y r_y (\sin\theta)^{\epsilon_y} 
    (\sin\varphi)^{\epsilon_y-1} (\cos\varphi) \\
  z_\varphi &= 0
\end{align}
$$

求两个方向向量的叉乘、并化简，可得到超椭球表面的法方向为（注，法方向各分量同时除于了 $\epsilon_x \epsilon_y \epsilon_z r_x r_y r_z (\sin\theta)^{\epsilon_x+\epsilon_y-1} (\cos\theta)^{\epsilon_z-1} (\sin\varphi)^{\epsilon_y-1} (\cos\varphi)^{\epsilon_x-1}$ ）

$$
\begin{align}
  n_x &= \frac{k}{\epsilon_x r_x} 
    (\sin\theta)^{2-\epsilon_x} (\cos\varphi)^{2-\epsilon_x}  \\
  n_y &= \frac{k}{\epsilon_y r_y} 
    (\sin\theta)^{2-\epsilon_y} (\sin\varphi)^{2-\epsilon_y}  \\
  n_z &= \frac{k}{\epsilon_z r_z} 
    (\cos\theta)^{2-\epsilon_z} 
\end{align}
$$

其中，$n_x$、$n_y$ 和 $n_z$ 为法方向在X、Y、Z三个方向的分量；$k$ 为一缩放系数使得($n_x$、$n_y$ 和 $n_z$)为单位向量。若给定某点的法方向，则该点的笛卡尔坐标可由下式计算：

$$
\begin{align}
  x &= r_x \left( \frac{\epsilon_x r_x n_x}{k} \right)^{\frac{\epsilon_x}{2-\epsilon_x}} \\
  y &= r_y \left( \frac{\epsilon_y r_y n_y}{k} \right)^{\frac{\epsilon_y}{2-\epsilon_y}} \\
  z &= r_z \left( \frac{\epsilon_z r_z n_z}{k} \right)^{\frac{\epsilon_z}{2-\epsilon_z}} \\
\end{align}
$$

将上式带入公式\eqref{eq:poly_super_quadrics}可求得系数 $k$，进而得到该点的坐标 $x$、$y$ 和 $z$。

\bibliography