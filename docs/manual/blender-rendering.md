---
title: "Blender rendering"
---

## Blender rendering

Offline path-traced frames and animations using Blender’s **BVtkNodes** workflow. VTK sequences should use zero-padded indices (e.g. `case_000.vtk` … `case_999.vtk`) when driving time-dependent imports—see hints at the end of this page.

### Install Blender and add-ons

- Install [Blender](https://www.blender.org).

- Install ``VTK`` inside the blender python environment.

    Hint: to add vtk support in blender, please visit [https://github.com/simboden/BVtkNodes/blob/master/build_vtk.md](https://github.com/simboden/BVtkNodes/blob/master/build_vtk.md).

- Install ``BVtkNodes`` add-on, which can be obtained from [https://github.com/tkeskita/BVtkNodes](https://github.com/tkeskita/BVtkNodes). Thanks Silvano Imboden (s.imboden@cineca.it), Lorenzo Celli, and Paul Mc Manus for the [original work](https://github.com/simboden/BVtkNodes), and Tuomo Keskitalo for functionality extending and maintaining. 

    Hint: to install add-on in blender: go to ``Edit`` &rarr; ``Preferences`` &rarr; ``add-on``, and ``install`` the add-on by selecting the zip file downloaded from the github main/master branch.

### Rendering

- Switch to the ``BVTK Node Tree`` editor, and create a new node tree similar to the following figure.

![blender_enditor_layout](/img/blender-editor-layout.png "Layouts of the blender editors.")

![node_example](/img/node-example.png "Example of node layout for importing and rendering vtk polydata in blender.")

- Switch back to the ``3D Viewport`` editor, and you should get a scene as following.

![render_example](/img/render-example.png "Example of layout view.")

- Play with the VTK filters and blender feature to polish the scene (color represents the stress). Below is an animation of membrane pulling and twisting, where the result data is simulated and created in ``Phynexis``.

<video controls width="80%" poster="https://1307405355.vod2.myqcloud.com/7eb7938bvodtranscq1307405355/6450ee7e387702294825734594/coverBySnapshot/coverBySnapshot_10_0.jpg">
  <source src="https://1307405355.vod2.myqcloud.com/7eb7938bvodtranscq1307405355/6450ee7e387702294825734594/v.f100840.mp4" type="video/mp4" />
</video>

Hints:

- Shortkeys: ``ctrl``+``alt``+``NumPad 0`` to set the camera to current view; ``G`` to translate the selected object; ``x`` to delete the selected object; ``ctrl`` or ``shift`` + mouse operations to pan, zoom-in and zoom-out the view.

- Rendering settings: suggest to use ``cycles`` engine, with the ``Max Samples`` set to ``10``.

- For rendering animation: the ``Time Selector`` filter will change the file name according to the index of frame. At current stage, the file names should be indexed with sequential numbers, i.e., ``xx_000.vtk``, ``xx_001.vtk``, ``xx_999.vtk``, etc. One can play with the vtk filters for possible extension.