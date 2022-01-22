### 

[DEM wiki](dem_wiki.md)
┊ [Previous](particle_models.md)

-------

[This page is prepared in Chinese, and will be part of a book aiming at beginners of DEM.]

-------

### 应力 (Stress)

基于连续性介质理论，材料的动量守恒方程可表示为（忽略体力及加速度项）

$$
\begin{align}
  \boldsymbol{\nabla} \cdot \boldsymbol{\sigma} = \boldsymbol{0}
\end{align}
$$

采用爱因斯坦求和约定，上式可写作

$$
\begin{align}
  \nabla_i \sigma_{ij} =  0_j
\end{align}
$$

利用动量守恒方程可得等式

$$
\begin{align}
  \nabla_i (\sigma_{ij} x_k) 
    = \nabla_i \sigma_{ij} x_k + \sigma_{ij} \nabla_i x_k
    = \nabla_i \sigma_{ij} x_k + \sigma_{ij} \delta_{ik}
    = \sigma_{jk}
\end{align}
$$

针对某个颗粒 $p$，其内部应力的积分可计算为

$$
\begin{align}
  \int \sigma_{jk} ~\text{d} \Omega 
    = \int \nabla_i (\sigma_{ij} x_k) ~\text{d} \Omega
    = \int n_i (\sigma_{ij} x_k) ~\text{d} \Gamma
    = \int n_i (\sigma_{ij} x_k) ~\text{d} \Gamma
    = \int f_j x_k ~\text{d} \Gamma
    = \sum^c f_j x_k 
\end{align}
$$

其中，$c$ 表示该颗粒的所有接触、$f_j$ 表示接触力、 $x_k$ 表示接触位置。进而，利用颗粒在接触力作用下的静力平衡公式

$$
\begin{align}
  \sum^c f_j x_k^p = (\sum^c f_j) x_k^p = 0
\end{align}
$$

可得

$$
\begin{align}
  \int \sigma_{jk} ~\text{d} \Omega 
    = \sum^c f_j x_k 
    = \sum^c f_j (x_k - x_k^p)
    = \sum^c f_j b_k
\end{align}
$$

其中，$x_k^p$ 为颗粒质心、$b_k$ 为由接触点指向颗粒质心的向量（branch vector）。

针对代表单元体，其域内的平均应力可由其内部所有颗粒内部的应力积分，再除于代表单元体体积得到，表达为

$$
\begin{align}
  \bar{\sigma}_{jk}
    = \frac{1}{V} \int \sigma_{jk} ~\text{d} \Omega 
    = \sum^c (f_j b_k^p - f_j b_k^q)
    = \sum^c f_j d_k
\end{align}
$$

其中，$c$ 为代表单元体内的所有接触、$d_k$ 表示颗粒质心相对位置矢量。
 
### 应变 (Strain)

假设单元变形梯度（deformation gradient）为 $\boldsymbol{F}$，则变形后，颗粒 $p$（初始位置 $\boldsymbol{X}^p$）与 颗粒 $q$（初始位置 $(\boldsymbol{X}^q$）质心相对位置矢量 $\boldsymbol{d}$ 可计算为

$$
\begin{align}
  d_i = F_{ij} (X^p_j - X^q_j)
\end{align}
$$

### 本构张量 (Constitutive tangent moduli)

$$
\begin{align}
  \text{d} f_i = k_n (\text{d} F_{mn}) d_n n_n n_i + k_t (\text{d} F_{mn}) d_n t_n t_i
\end{align}
$$

$$
\begin{align}
  C_{ijkl} 
    = \frac{\partial \sigma_{ij}}{\partial F_{kl}} 
    = \sum^c k_n n_i d_j n_k d_l + k_t t_i d_j t_k d_l
\end{align}
$$

参考文献 [@Borja_Wren_1995] [@Bagi_1996] [@Wren_Borja_1997] [@Kruyt_Rothenburg_1998] [@Luding_2004]

-------

[DEM wiki](dem_wiki.md)
┊ [Previous](particle_models.md)

-------

### 参考文献 

\bibliography