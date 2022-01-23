###

[User manual](user_manual.md)
┊ [Previous](installation.md)
┊ [Next](blender_rendering.md)

-------

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
./scripts/batch_data_point2mesh.sh [in_dir] [out_dir] [shape_dir] [0, 1]

```

Option [0, 1] is for importing shape informaiton, such that ``0`` indicates using the ``json`` shape info (i.e., shape_000_000000000000000.json), ``1`` indicates using ``stl`` shape files. For ``json`` shape info, please specify the exact file name for ``[shape_dir]``, whereas the directory ``shape/`` for ``stl`` shape info.

or easier

```        
./scripts/auto_mesh_particle.sh [out_dir] [0, 1, or 2]
./scripts/auto_mesh_wall.sh [out_dir] [0, 1, or 2]
```

Option [0, 1, or 2] is for importing shape informaiton, such that ``0`` indicates using the 0-time-step shape info (i.e., shape_000_000000000000000.json) in the ``shape/`` sub-directory of the result root, ``1`` indicates using ``STL`` shape files, whereas ``2`` indicates using time specific shape info (e.g., shape_000_0000000xxxxxxxxx.json). 

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
    - For ``Tencent Cloud``, suggested procedures (in Chinese):
    - 选择云产品``云点播``，在``媒资管理`` &rarr; ``音视频管理``中，上传视频;
    - 上传视频后，选择待处理的视频，进行``视频处理``，建议选择``TESHD-H264-MP4-720P``转码模板;
    - 点击右侧的``管理``，可查看视频封面和视频播放地址等链接，可用于网页制作.

### Post-process

We have a [side-repository](https://github.com/net-dem/dem_postprocess_scripts) that provides some matlab or python scripts for post-process (e.g., VTK io, stress-strain, spherical histograms of contact anisotropy).

-------

[User manual](user_manual.md)
┊ [Previous](installation.md)
┊ [Next](blender_rendering.md)