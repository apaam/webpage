## 

There are varieties of features or functionalities can be implemented into the NetDEM to facilitate its application on scientific research or engineering production. If you have an interest to contribute to any part of this project, please let us know.

The users are also cautioned that this code is under active development. If you need help using NetDEM, or have found a bug, please [open an issue](https://github.com/net-dem/netdem/issues) or [submit a pull request](https://github.com/net-dem/netdem/pulls).

### Known issues

 - The compilation of mlpack and its relevant sources in netdem would consume a lot of memory (~10 G). It would also cause computers breakdown if compiling with multiple thread.

### TODOs

 - Remove dependency on Eigen3, implement a vec class to replace and unify the usage of vector, T[], etc.
 - The shapes and walls are assumed to exist in all MPI domains. Will need to change them to domain specific, as the case of particles.
 - Servo control of wall does not work properly in MPI. In MPI, it will need the contact information from all domains. Will need to implement that.
 - Implement rigid and soft bonds (i.e., clump vs. cluster) using evaluators.
