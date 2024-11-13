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

## Documentation

To get started with NetDEM, we recommend exploring the following resources:

- **[Getting Started Guide](documentation/user_manual.md)**: Step-by-step instructions for setting up and running basic simulations in NetDEM.
  
- **[Examples](gallery/animations.md)**: A collection of example simulations, including animations, to illustrate the core functionality and diverse applications of the library.

- **[Code Doxygen](doxygen/html/index.html)**: Full documentation for the NetDEM codebase, including function references, classes, and usage examples.

- **[GitHub Repository](https://github.com/apaam/netdem)**: The source code repository for NetDEM, containing the latest updates, releases, and community contributions.

We recommend new users start by examining the [example codes](https://github.com/apaam/netdem/tree/main/examples). Currently, NetDEM uses [ParaView](https://www.paraview.org) for visualization.

## Contact

Use the GitHub [issue tracker](https://github.com/apaam/netdem/issues) to report [bugs](https://github.com/apaam/netdem/issues/new?labels=bug), post [questions](https://github.com/apaam/netdem/issues/new?labels=question), or share [comments](https://github.com/apaam/netdem/issues/new?labels=comment).

</div><div class="col-md-6 news-table" markdown="1">

## Features

NetDEM is a versatile, neural network-enabled C++ library specifically designed for performing discrete element method (DEM) simulations. Its robust feature set includes:

- **Sphere and Triangle Facet Contact Solver**: A solver designed for accurate and efficient modeling of interactions between spherical particles and triangular surface facets.
  
- **GJK (Gilbert-Johnson-Keerthi) Contact Solver for Convex Particles**: This solver efficiently handles contact detection between convex particles, utilizing the GJK algorithm to provide rapid collision detection and response.
  
- **SDF (Signed Distance Function) Contact Solver for Arbitrary Particles**: The SDF contact solver supports both convex and concave particles, allowing for simulation of a broad range of particle geometries. This makes it especially useful for complex, irregularly shaped particles encountered in realistic scenarios.

- **Hybrid OpenMP and MPI Parallel Computing**: NetDEM uses hybrid parallel computing approaches to optimize performance. OpenMP is employed for multi-threading on shared-memory architectures, while MPI supports parallelism across distributed systems. This hybrid approach enables efficient handling of large-scale simulations.

- **Integrated [mlpack](https://www.mlpack.org/) Machine Learning Environment**: With mlpack integration, NetDEM users can leverage machine learning techniques directly within DEM simulations. This enables data-driven decision-making and predictive modeling to improve simulation efficiency and analysis.

NetDEM supports a wide range of particle shapes, including spheres, cylinders, poly-super-ellipsoids, poly-super-quadrics, spherical harmonics, triangle meshes, level sets, and more. This extensive shape support allows for flexible, highly customizable simulations applicable across a range of scientific and engineering applications.

## License & Citation

NetDEM is distributed under the GPL license. See [copyright and license](about/acknowledgement.md) for details.

See the [about](about/acknowledgement.md) page for acknowledgements and citation information.

</div><div class="col-md-12 bottom"></div>