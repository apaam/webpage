<div class="col-md-6" markdown="1">

<div id="myCarousel" class="carousel slide" data-ride="carousel" markdown="1" style="margin-top:-10px;margin-bottom:0px;height:360px;">

<!-- Indicators -->
<ol class="carousel-indicators">
<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
<li data-target="#myCarousel" data-slide-to="1"></li>
<li data-target="#myCarousel" data-slide-to="2"></li>
<li data-target="#myCarousel" data-slide-to="3"></li>
<li data-target="#myCarousel" data-slide-to="4"></li>
</ol>

<!-- Wrapper for slides -->
<div class="carousel-inner">
<div class="item active">
<img class="d-block w-100" width="440" height="330" src="img/logo_4by3.png">
</div>

<div class="item">
<img class="d-block w-100" width="440" height="330" src="img/packing_gjk_poly_super_ellipsoid.png">
</div>

<div class="item">
<img class="d-block w-100" width="440" height="330" src="img/bolt_nut_sliding.png">
</div>

<div class="item">
<img class="d-block w-100" width="440" height="330" src="img/packing_sdf_bolt_nut.png">
</div>

<div class="item">
<img class="d-block w-100" width="440" height="330" src="img/granular_mixing_spheres.png">
</div>
</div>

<!-- Left and right controls -->
<a class="left carousel-control" href="#myCarousel" data-slide="prev">
<span class="glyphicon glyphicon-chevron-left"></span>
<span class="sr-only">Previous</span>
</a>
<a class="right carousel-control" href="#myCarousel" data-slide="next">
<span class="glyphicon glyphicon-chevron-right"></span>
<span class="sr-only">Next</span>
</a>
</div>

NetDEM is a neural network enabled C++ library for discrete element methods.

## Features

We aimed at providing peer researchers a basic DEM framework and collection of APIs, which can be used to develop new contact models, irregular-shaped particle models, contact detection and resolution algorithms, and etc. We put an emphasis on but not limited to:

 - Model irregular-shaped particles, such as ellipsoid, polybezier, polyhedron.
 - Develop new contact models and particle models, as well as contact detection and resolution algorithms.
 - Perform unit tests, including random packing, triaxial shear, direct shear, angle of repose, etc.
 - Explore the possibilities and integration of machine learning methods in DEM.

</div><div class="col-md-6 news-table" markdown="1">

## News

Date         | Message
------------ | -----------------------------------------------------------------
Sep 10, 2021 | Now we have poly-super-ellipsoid and poly-super-quadric.
Aug 15, 2021 | We generlized two types of contact solvers, namely GJK and signed distance field.
Apr 16, 2021 | Launched the [website](index.md).
Oct 07, 2020 | Launched the [project](https://github.com/net-dem/netdem).

<!-- ## Latest Release -->

<!-- [New features](https://github.com/net-dem/netdem/blob/v4.3/CHANGELOG) -->

<!-- [<button type="button" class="btn btn-success">
**Download mfem-4.3.tgz**
</button>](https://bit.ly/mfem-4-3)

[Older releases](download.md) ┊ [Python wrapper](https://github.com/mfem/PyMFEM) -->

## Documentation


[Building NetDEM](documentation/installation.md)
┊ [Getting Started](documentation/usage.md)
┊ [Examples](examples/gallery.md)
┊ [Code doxygen](doxygen/html/index.html)
┊ [Sources](https://github.com/net-dem/netdem)

We recommend new users to start by examining the [example codes](https://github.com/net-dem/netdem/tree/main/examples).

Currently, we use [paraview](https://www.paraview.org) for visualization.

## Contact

Use the GitHub [issue tracker](https://github.com/net-dem/netdem/issues)
to report [bugs](https://github.com/net-dem/netdem/issues/new?labels=bug)
or post [questions](https://github.com/net-dem/netdem/issues/new?labels=question)
or [comments](https://github.com/net-dem/netdem/issues/new?labels=comment).

## License & citation

NetDEM is distributed under the BSD 3-Clause license, see [copyright and license](about/acknowledgement.md) for details.

See&nbsp;the [about](about/acknowledgement.md) page for acknowledgements and citation information.

</div><div class="col-md-12 bottom"></div>