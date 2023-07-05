###

### Conventions

- For each class, it is suggested to bind a `Print` method (if exists) to a python method `__repr__`. For example

    ```cpp
    pybind11::class_<Sphere>(m, "Sphere")
      .def("__repr__", &Sphere::Print);
    ```

- 