###

### Installation

#### Prerequisites

The compilation requires ``gcc``, ``autoconf``, ``automake``, ``cmake``, ``mpi``, ``boost``, which can be obtained using

```
# For MacOS: use brew install, such as
brew install gcc autoconf automake cmake openmpi boost
        
# For Ubuntu: use apt-get install, such as
sudo apt install build-essential
sudo apt-get install -y autoconf-archive automake cmake texinfo
sudo apt-get install openmpi-bin libopenmpi-dev libboost-all-dev
```

#### Compile and build

```
make sync_submodule
make
``` 

If some third-party libraries have not been or cannot be downloaded successfully, you can delete them and do a ``git checkout contrib`` and ``make sync_submodule`` again.


#### Test the installation

```
./scripts/run_tests.sh
```

### Related to installation 

#### Installation on Apple M1

(As of Dec. 20 2021)

OpenMP seems not compitible with Apple M1. To enforce an OpenMP installation, set ``USE_INTERNAL_OPENMP`` in netdem ``CMakeLists.txt`` to ``OFF``, and use ``brew install libomp`` to install a pre-built copy of OpenMP.

Add M1 support to ``fast_winding_number`` functional in ``igl`` via ``SIMDE`` (please see the discussion in [https://github.com/sideeffects/WindingNumber/pull/3/files](https://github.com/sideeffects/WindingNumber/pull/3/files)): 

- Install simde using ``brew install simde``.
- Add ``-flax-vector-conversions`` to the gcc complier flag in netdem ``CMakeLists.txt``.
- Add the following lines to the ``FastWindingNumberForSoups`` in igl and comment out the ``#include <emmintrin.h>`` line.

```
#define SIMDE_ENABLE_NATIVE_ALIASES
#include <simde/x86/sse.h>
#include <simde/x86/sse4.1.h>

// Recent GCC define the macro in x86intrin.h
#ifndef _MM_MK_INSERTPS_NDX
#define _MM_MK_INSERTPS_NDX(srcField, dstField, zeroMask) (((srcField)<<6) | ((dstField)<<4) | (zeroMask))
#endif
```

Build netdem following the original procedures.

#### Dependencies

 - [git](https://git-scm.com), [gcc](https://gcc.gnu.org), [cmake](https://cmake.org): for code developing, configuring and compiling
 - [open mpi](https://www.open-mpi.org): for parallel computing
 - [json](https://github.com/ArthurSonzogni/nlohmann_json_cmake_fetchcontent.git): for input data interchange
 - [cork](https://github.com/libigl/cork.git): for mesh boolean operation
    - [gmp](https://gmplib.org)
 - [igl](https://github.com/libigl/libigl.git): another option of mesh boolean operation (robust but much slower than cork)
    - [cgal](https://github.com/CGAL/cgal.git) (requires [boost](https://github.com/boostorg/boost.git), [gmp](https://gmplib.org), [mpfr](https://www.mpfr.org)), [openmp](https://openmp.llvm.org/), [eigen](https://gitlab.com/libeigen/eigen.git)
 - [googletest](https://github.com/google/googletest.git): for tests
 - [mlpack](https://github.com/mlpack/mlpack.git): for machine learning libraries
    - [armadillo](http://arma.sourceforge.net/download.html) (requires [lapack](https://github.com/Reference-LAPACK/lapack.git), [arpack](https://github.com/opencollab/arpack-ng.git), [openblas](https://github.com/xianyi/OpenBLAS.git)), [ensmallen](https://github.com/mlpack/ensmallen), [cereal](https://github.com/USCiLab/cereal), [boost](https://github.com/boostorg/boost.git), [stb](https://github.com/nothings/stb.git)
- [pybind](https://github.com/pybind/pybind11.git): for python interface 

Using dependencies already in the system would save the time required by the compilation of the whole project. Some dependencies (e.g., mlpack) would take fairly long time to compile. One can check out the log files in contrib/[package]/ep/src/[package]-stamp/ for the compiling, building and installing progresses of the dependencies. Some packages (e.g., ``boost`` and ``mpi``) could take forever to compile. It is recommended that you install pre-build ``boost`` and ``mpi`` using tools such as ``brew install `` in mac os, or ``apt-get install`` in ubantu.

### Basic usage

#### Run built-in examples

There are some built-in examples defined in the ``examples/`` directory. Once the software is installed, it will create an excutable file in the ``build/bin`` directory. 

Run an example using the following command in the root directory. The results will be stored in ``tmp/out/`` directory after the running of the example, and can be visualized in [paraview](https://www.paraview.org).

```
./build/bin/netdem_example_random_packing
```
  
```
python3 example/00_random_packing/pynetdem_1_gjk_solver.py
```

#### <a name="recon_mesh_ref"></a>Reconstruct mesh of particles and walls

For irregular-shaped particles, use the following command to generate the results with particles represented by triangle meshes.

```
./build/bin/netdem_tool_point2mesh [in.vtk] [out.vtk] [shape_dir]
```

In case one need to do the generation in batch, the following command can be used

```
./scripts/batch_data_point2mesh.sh [in_dir] [out_dir] [shape_dir]
```

or easier

```        
./scripts/auto_mesh_particle.sh [out_dir]
./scripts/auto_mesh_wall.sh [out_dir]
```

#### Customized simulation

Please follow the built-in examples to write the c++ or python scripts.

### Visualize in paraview

Results can be dumped as VTK files, which can be visualized in [paraview](https://www.paraview.org/).

#### Spherical particles

- Import particle info into paraview;
- Set ``Representation`` to ``Point Gaussian``, and adjust the radius;
- In case particles are of various sizes, enable ``Toggle advanced properties``, enable ``Use Scale Array``, select the proper ``Scale Array Component``, and adjust the ``Range``.

#### General particles and walls

- [Reconstruc the mesh of particles and walls](#recon_mesh_ref);
- Import to praview;

#### Contact force chain

- Enable dump contact force by set: ``data_dump.dump_contact_info = true``;
- Import contact info into paraview;
- Add a ``tube`` filter to the contact force data in paraview, and adjust the radius of the contact tubes.

#### Ray tracing

- ``Enable Ray Tracing`` at the end of Properties section;
- Change the ``Back end`` to ``OsPRay pathtracer``;
- Increase the ``Samples Per Pixel``, which gives fair results with a value 5 in reasonble rendering time;
- Set the ``Background mode`` to ``Backplase``, which is while as suggested.
- One can play with the ``Material`` options in the middle-while of the Properties section.

#### Create animation

- In paraview, go ``File`` &rarr; ``Save Animation``;
- Select the ``avi`` option and specify the name;
- Suggest to set the image resolution with ``1920 x 1080``, i.e., 1080p, and Set the Frame Rate to ``24`` (a minimal value to give fluent animation);
- Compress the avi animation with third-party tools, such as ``ffmpeg`` or ``Tencent Cloud``;
    - For ``Tencent Cloud``, it is suggested to select ``TESHD-H264-MP4-720P`` format.

### Post-process

We have a [side-repository](https://github.com/net-dem/dem_postprocess_scripts) that provides some matlab or python scripts for post-process (e.g., VTK io, stress-strain, spherical histograms of contact anisotropy).