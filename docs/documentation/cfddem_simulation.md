###

[User manual](user_manual.md)

-------

### Installation

- Install prerequisites: the compilation requires ``gcc``, ``autoconf``, ``automake``, ``cmake``, ``mpi``, ``boost``, which can be obtained using

        # For MacOS: use brew install, such as
        brew install gcc autoconf automake cmake openmpi boost
        
        # For Ubuntu: use apt-get install, such as
        sudo apt-get install build-essential cmake
        sudo apt-get install libopenmpi-dev openmpi-bin zlib1g-dev libboost-all-dev
        sudo apt-get install flex bison gnuplot libreadline-dev libncurses-dev libxt-dev 

 - Install ``netdem`` from [https://github.com/apaam](https://github.com/apaam).

        mkdir apaam
        cd apaam
          
        git clone https://github.com/apaam/netdem.git .
        cd netdem
        make
        cd ..

 - Install ``openfoam`` from [https://github.com/apaam](https://github.com/apaam).

        git clone https://github.com/apaam/openfoam_customized.git .
        cd openfoam_customized
        make
        cd ..

 - Init OpenFOAM environment by adding the following lines to and sourcing the ``.bashrc`` (where ``$path_apaam`` is the path of apaam)

        export APAAM_DIR=$path_apaam
        export path_openfoam=$path_apaam/openfoam_customized/OpenFOAM-build
        alias openfoam_init='source $path_openfoam/etc/bashrc'
        openfoam_init
        echo "using openfoam=$path_openfoam"

 - Install ``cfddem`` from [https://github.com/apaam](https://github.com/apaam).

        git clone https://github.com/apaam/cfddem.git .
        cd cfddem
        make
        cd ..

 - Add the library and binary directory to system PATH in ``.bashrc`` (where ``$path_apaam`` is the path of apaam)

        export PATH=$PATH:$path_apaam/cfddem/build/bin
        export PYTHONPATH=$path_apaam/netdem/build/lib

### Examples & tutorials

Some preliminary examples are located under directory ``examples/``, which can be run with, e.g., (in the example directory)


        ./Allrun

Note if the ``pynetdem`` package cannot be imported into python, one might need to exiplictly add the path (e.g., ``sys.path.append("/Users/lzhshou/Documents/Research/myProjects/apaam/repo/netdem/build/lib/")``) of the ``netdem`` python library in ``createDEM.py``.


### Run water entry example

 - Copy the example folder to a local directory

        cd cfddem
        cp -rf examples/interIBdem/water_entry local/interIBdem/

 - Run the example
     - Please note that ``system/fvSolution`` -> ``coupling`` specifies the DEM file and function that will be invoked for the coupling.

            cd local/interIBdem/water_entry
            ./Allclean
            ./Allrun-parallel

 - In case the run fails, please check the lib path has been correctly set in ``createDEM.py``, where the path is the directory of netdem libs.

### Paraview Rendering

 - Render CFD results
  
     - Open ``interIBdem.foam`` to paraview
     - Change the properties ``Type Case`` to ``Decomposed Case`` and uncheck ``Skip Zero Time`` (optional)
     - Play with the result fields
     - Optinal: for viaulizeing interal filed results, one can use the ``Clip`` or ``Slice`` filter
     - Optinal: to construct the interface of the water and air, one can add ``Contour`` filter to ``interIBdem.foam``, set ``Contour by`` to ``alpha.water`` and change the contour value to ``0.5``

 - Render DEM results

     - Open dem/particle_mesh_xxx.vtk.serries to paraview
     - Optional: select all particle_mesh_xxx.vtk.serries and add a ``Group Datesets`` filter
     - Optional: add a ``Caculator`` filter after the ``Group Datesets`` filter, set ``Result Array Name`` to ``U``, and input formulation ``vel``. This will add a ``U`` field to the particles, wihch can be linked with the CFD field ``U``
     - Optional: for probing the evolution of a property value with time, one can add a ``Plot Data Over Time`` filter to the ``Group Datesets``, and change the ``Field Associates`` to ``Cells``. Then, one can play with the property to show in the newly opened ``Line Chart View``

### Modify the water entry parameters

 - Fuild properties such as viscosity and density is specified in file ``constant/transportProperties``. 
     - Please note that fuilds being used are speficied in ``phases``.
 - Geometries are determined by the ``system/blockMeshDict``. Please note that when ``scale`` exist, the coordinates of the vertices with be multiplied by the scale when creating the real mesh.
     - Mesh size are govened by the three values before ``simpleGrading`` in the ``blocks`` -> ``hex`` entry. It is suggested to use cubic elements.
 - The inital volume fraction of the fuilds are specifed in ``system/setFiledsDict``. 
     - Please not that the ``scale`` parameter in ``system/blockMeshDict`` will not work here, thus the vertices here are their exact values.
     - Entry ``box (-0.05 -0.05 -0.15) (0.05 0.05 0.03)`` specifies the lower-left-front and upper-right-back coordicates of the box
     - Please note that the field entry ``alpha.glycerol`` should be consistent with that specified in ``constant/transportProperties`` -> ``phases``
 - File ``system/controlDict`` specifies the simulation time, timestep and writing interval, etc.
 - In ``createDEM.py`` -> ``oneSphere()`` funciton, one can modify the DEM domain geometries and particle properties.
     - Please note that in the present funciton, the parameter ``scale`` varies the size of the DEM domain, wall box and particle intertion region, whereas the ``p_size`` is the exact value of particle diameter.

-------

[User manual](user_manual.md)