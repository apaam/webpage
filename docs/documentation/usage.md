### 

#### Run built-in examples

There are some built-in examples defined in the ``examples/`` directory. Once the software is installed, it will create an excutable file in the ``build/bin`` directory. 

1. Run an example using the following command in the root directory. The results will be stored in ``tmp/out/`` directory after the running of the example.

        ./build/bin/netdem_example_random_packing

2. Visualize the results in [paraview](https://www.paraview.org).

3. For irregular-shaped particles, use the following command to generate the results with particles represented by triangle meshes.

        ./build/bin/netdem_tool_point2mesh [in.vtk] [out.vtk] [shape_dir]

    Note that ``shape_dir`` should contains a slash at the end, such as ``tmp/out/shape/``. In case one need to do the generation in batch, the following command can be used

        ./scripts/batch_data_point2mesh.sh [in_dir] [out_dir] [shape_dir]

    or more easier
        
        ./scripts/auto_data_point2mesh.sh [out_dir]

#### How to cite