###

There are varieties of features or functionalities can be implemented into the NetDEM to facilitate its application on scientific research or engineering production. If you have an interest to contribute to any part of this project, please let us know.

The users are also cautioned that this code is under active development. If you need help using NetDEM, or have found a bug, please [open an issue](https://github.com/apaam/netdem/issues) or [submit a pull request](https://github.com/apaam/netdem/pulls).

### Known issues

 - The compilation of mlpack and its relevant sources in netdem with ``debug`` option would consume a lot of memory (~10 G), wihch might cause computers breakdown if compiling with multiple thread.
 - GJK and EPA will encounter convergence issue for two particles contacting at a plane.

### TODOs

 - Servo control of wall does not work properly in MPI. In MPI, it will need the contact information from all domains. 
 - GPU.

### Contact

- Dr. Zhengshou Lai, laizhengsh [AT] mail.sysu.edu.cn