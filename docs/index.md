NetDEM
------------
A neural network machine learning enabled DEM framework for computational particle mechanics.

### What is NetDEM

This project explores and developes the machine learning (neural networks typically) enabled discrete element method (NetDEM) for the computational mechanics of irregular-shaped particles. The conventional DEM encompasses four main steps in one typical calculation cycle, namely, (1) the detection and resolution of contacts, (2) the evaluation of contact behavior, (3) the calculation of particle motion, and (4) the updating of particle geometric descriptions. NetDEM exploits the inference ability of neural networks at two levels: level 1, which is to take particle geometric descriptors as inputs and output the contact status and contact geometric features; level 2, which is to take particle geometric descriptors as inputs and directly output the particle accelerations. 

### Features of NetDEM

As of 2021, the first release of this project is aimed at providing peer researchers a basic DEM framework and collection of APIs, which can be used to develop new contact models, irregular-shaped particle models, contact detection and resolution algorithms, and etc. This release puts an emphasis on but not limited to:

 - Model irregular-shaped particles, such as ellipsoid, polybezier, polyhedron.
 - Perform unit tests, including random packing, triaxial shear, direct shear, angle of repose, etc.
 - Develop new contact models and particle models, as well as contact detection and resolution algorithms.
 - Explore the possibilities and integration of machine learning methods in DEM.
 
We have a plan to implement the input functionality as well as the python interfaces, so that this project can be used by a broader comunity and for more general purposes.

### How to cite

### License

NetDEM is distributed under the BSD 3-Clause license, see [Copyright and license](user_manual/copyright_and_license.md) for details.

### Acknowledgement

This project is under active development. We would like to thank all the peer researchers that have directly or indrectly made a contribution to this project, by means of submitting commits or pull requests, making suggestions or discussions, finding and resolving bugs or difficulties during usage, etc. We would also like to thank the authors of thrid party software packages that are used by this project and have greatly faciliated the development of this project. The fundings that have supported the development of this project are acknowledged and will be updated accordingly. 

  - 2019-2022: National Natural Science Foundation of China (51909289)
  - 2020-2022: Hong Kong Scholar program (2020)
  - 2019-2021: China Postdoctoral Science Foundation (2019M663240)

### Contact

  - Zhengshou Lai, Hong Kong University of Science and Technology, [laizhengsh@ust.hk](mailto:laizhengsh@ust.hk)