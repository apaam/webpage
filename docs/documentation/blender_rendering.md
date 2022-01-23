###

[User manual](user_manual.md)
┊ [Previous](basic_usage.md)

------

### Install blender and add-ons

- Install blender, which can be obtained from [https://www.blender.org](https://www.blender.org).

- Install ``VTK`` inside the blender python environment.

    Hint: to add vtk support in blender, please visit [https://github.com/simboden/BVtkNodes/blob/master/build_vtk.md](https://github.com/simboden/BVtkNodes/blob/master/build_vtk.md).

- Install ``BVtkNodes`` add-on, which can be obtained from [https://github.com/tkeskita/BVtkNodes](https://github.com/tkeskita/BVtkNodes). Thanks Silvano Imboden (s.imboden@cineca.it), Lorenzo Celli, and Paul Mc Manus for the [original work](https://github.com/simboden/BVtkNodes), and Tuomo Keskitalo for functionality extending and maintaining. 

    Hint: to install add-on in blender: go to ``Edit`` &rarr; ``Preferences`` &rarr; ``add-on``, and ``install`` the add-on by selecting teh zip file downloaded from the github main/master branch.

### Rendering

- Switch to the ``BVTK Node Tree`` editor, and new a node tree similar to the following figure.

![blender_enditor_layout](../img/blender_enditor_layout.png "Layouts of the blender editors."){:style="width:80%"}

![node_example](../img/node_example.png "Example of node layout for importing and rendering vtk polydate in blender."){:style="width:80%"}

- Switch back to the ``3D Viewport`` editor, and you should get a scene as following.

![render_example](../img/render_example.png "Example of layort view."){:style="width:80%"}

- Play with the VTK filters and blender feature to polish the scene (color represents the stress). Below is an animation of membrane pulling and twisting, where the result data is simulated and created in ``NetDEM``.

<center>
<video controls width="80%" poster="https://1307405355.vod2.myqcloud.com/7eb7938bvodtranscq1307405355/6450ee7e387702294825734594/coverBySnapshot/coverBySnapshot_10_0.jpg">
  <source src="https://1307405355.vod2.myqcloud.com/7eb7938bvodtranscq1307405355/6450ee7e387702294825734594/v.f100840.mp4" type="video/mp4">
</video>
</center>

Hints:

- Shortkeys: ``ctrl``+``alt``+``NumPad 0`` to set the camera to current view; ``G`` to translate the selected object; ``x`` to delete the selected object; ``ctrl`` or ``shift`` + mouse operalaitons to pan, zoom-in and zoom-out the view.

- Rendering settings: suggest to use ``cycles`` engine, with the ``Max Samples`` set to ``10``.

- For rendering animaiton: the ``Time Selector`` filter will change the file name according to the index of frame. At current stage, the file names should indexed with sequential numbers, i.e., ``xx_000.vtk``, ``xx_001.vtk``, ``xx_999.vtk``, etc. One can play with the vtk filters for possible entension.

------

[User manual](user_manual.md)
┊ [Previous](basic_usage.md)