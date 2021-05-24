**NetDEM** is a C++ program library targeted at the computational mechanics of irregular granular materials and utilizing machine learning tools to boost the computational effciency.

### 0. Contents

  1. [Introduction](#1-introduction)
  2. [Dependencies](#2-dependencies)
  3. [Installation](#3-installation)
  4. [Tutorials](#4-tutorials)
  5. [Known issues](#5-known-issues)
  6. [Support](#5-support)

### 1. Introduction

This project explores and developes the machine learning (neural networks typically) enabled discrete element method (NetDEM) for the computational mechanics of irregular-shaped particles. The conventional DEM encompasses four main steps in one typical calculation cycle, namely, (1) the detection and resolution of contacts, (2) the evaluation of contact behavior, (3) the calculation of particle motion, and (4) the updating of particle geometric descriptions. NetDEM exploits the inference ability of neural networks at two levels: level 1, which is to take particle geometric descriptors as inputs and output the contact status and contact geometric features; level 2, which is to take particle geometric descriptors as inputs and directly output the particle accelerations. 

### 2. Dependencies

 - [git](https://git-scm.com), [gcc](https://gcc.gnu.org), [cmake](https://cmake.org): for code developing, configuring and compiling
 - [mpich](www.mpich.org) or [open mpi](www.open-mpi.org): for parallel computing
 - [json](https://github.com/ArthurSonzogni/nlohmann_json_cmake_fetchcontent.git): for input data interchange
 - [cork](https://github.com/libigl/cork.git): for mesh boolean operation
   - [gmp](https://gmplib.org)
 - [igl](https://github.com/libigl/libigl.git): another option of mesh boolean operation (robust but much slower than cork)
   - [cgal](https://github.com/CGAL/cgal.git) (requires [boost](https://github.com/boostorg/boost.git), [gmp](https://gmplib.org), [mpfr](https://www.mpfr.org)), [openmp](https://openmp.llvm.org/), [eigen](https://gitlab.com/libeigen/eigen.git)
 - [googletest](https://github.com/google/googletest.git): for tests
 - [mlpack](https://github.com/mlpack/mlpack.git): for machine learning libraries
   - [armadillo](http://arma.sourceforge.net/download.html) (requires [lapack](https://github.com/Reference-LAPACK/lapack.git), [arpack](https://github.com/opencollab/arpack-ng.git), [openblas](https://github.com/xianyi/OpenBLAS.git)), [ensmallen](https://github.com/mlpack/ensmallen), [cereal](https://github.com/USCiLab/cereal), [boost](https://github.com/boostorg/boost.git), [stb](https://github.com/nothings/stb.git)

### 3. Installation

 0. Preparation: install gcc, autoconf, automake, cmake, mpi, boost.

   - For **MacOS**: 

     - Use ``brew install`` to install the dependencies: gcc, autoconf, automake, cmake, mpi, boost

       ```
       brew install gcc autoconf automake cmake mpi boost
       ```

   - For **Ubuntu**: 

     - Use ``apt-get install`` to install the dependencies: gcc, cmake, mpi, boost

       ```
       sudo apt install build-essential
       sudo apt-get install -y autoconf-archive automake cmake texinfo
       sudo apt-get install openmpi-bin libopenmpi-dev libboost-all-dev
       ```

   - For **Windows** (vscode + cmake + mingw64): 

     - Install vscode, cmake, [mingw64](http://www.mingw-w64.org/doku.php/download). Note that you might need to add the path of cmake and mingw64 to the PATH in Windows environment.
     - Go to mingw64 installation directory, make a copy of ``gcc`` and ``mingw32-make`` in bin, and respectively rename them as ``cc`` and ``make``.
     - Install ``c/c++``, `cmake`, and ``cmake tools`` extensions in vscode.
     - [to do: install mpi, boost dependencies]

 1. Download the source codes of the dependent packages:

    ```
    make prepare
    ```

    NetDEM maintains a local copy of all the dependencies using git submodules (in directory contrib/). These sources could be used to compile the required packages if they are not already installed in the system.

 2. Modify the options in the CMakeLists.txt in the root directory. For example:

    ```
    option(USE_INTERNAL_ARMADILLO "use internal armadillo" ON)
    ```

    Using dependencies already in the system would save the time required by the compilation of the whole project. Some dependencies (e.g., mlpack) would take fairly long time to compile. One can check out the log files in contrib/[package]/ep/src/[package]-stamp/ for the compiling, building and installing progresses of the dependencies. Some packages (e.g., ``boost`` and ``mpi``) could take forever to compile. It is recommended that you install pre-build ``boost`` and ``mpi`` using tools such as ``brew install `` in mac os, or ``apt-get install`` in ubantu.

 3. Configure, compile and install NetDEM:

    ```
    make debug
    ```

 4. To test the installation:

    ```
    ./run_test.sh
    ```

### 4. Tutorials

Some preliminary examples are located under directory examples/.

[TODO: documentation and manual.]

### 5. Known issues

1. The compilation of mlpack and its relevant sources in netdem would consume a lot of memory (~10 G). It would also cause computers breakdown if compiling with multiple thread.

### 6. Support

There are varieties of features or functionalities can be implemented into the NetDEM to facilitate its application on scientific research or engineering production. If you have an interest to contribute to any part of this project, please let us know.

The users are also cautioned that this code is under active development. If you need help using NetDEM, or have found a bug, please [open an issue](https://github.com/net-dem/netdem/issues) or [submit a pull request](https://github.com/net-dem/netdem/pulls).

``TODOs``:

 - Remove dependency on Eigen3, implement a vec class to replace and unify the usage of vector, T[], etc.
 - The shapes and walls are assumed to exist in all MPI domains. Will need to change them to domain specific, as the case of particles.
 - Servo control of wall does not work properly in MPI. In MPI, it will need the contact information from all domains. Will need to implement that.
 - Implement rigid and soft bonds (i.e., clump vs. cluster) using evaluators.
