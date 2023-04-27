###

[User manual](user_manual.md)
┊ [Previous](basic_usage.md)
┊ [Next](blender_rendering.md)

------

### Rendering in paraview

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

#### Client/Server

- Establish tunneling using:

        ssh -L 11111:localhost:11111 -p [port] [user]@[remote-ip]

- Start ``pvserver`` on remote

        pvserver

- Open paraview at local, add and connect to server with type ``Client/Server``, host ``localhost`` and port ``11111``

------

[User manual](user_manual.md)
┊ [Previous](basic_usage.md)
┊ [Next](blender_rendering.md)