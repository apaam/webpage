### 

#### Run built-in examples

There are some built-in examples defined in the ``examples/`` directory. Once the software is installed, it will create an excutable file in the ``build/bin`` directory. 

1. Run an example using the following command in the root directory. The results will be stored in ``tmp/out/`` directory after the running of the example.

```
./build/bin/netdem_example_random_packing
```

2. Visualize the results in [paraview](https://www.paraview.org).

3. For irregular-shaped particles, use the following command to generate the results with particles represented by triangle meshes.

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

#### Visualize & post-process

Results can be dumped as VTK files, which can be visualized in [paraview](https://www.paraview.org/).

We have a [side-repository](https://github.com/net-dem/dem_postprocess_scripts) that provides some matlab or python scripts for post-process (e.g., VTK io, stress-strain, spherical histograms of contact anisotropy).