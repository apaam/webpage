###

[User manual](user_manual.md)
┊ [Previous](ref_shape.md)
┊ [Next](ref_utils.md)

-------

### Simulation

This class represents a simulation.

#### Attributes

##### `domain_manager`

The domain manager used in the simulation.

##### `mpi_manager`

The MPI manager used in the simulation.

##### `modifier_manager`

The modifier manager used in the simulation.

##### `scene`

The scene used in the simulation.

##### `dem_solver`

The DEM solver used in the simulation.

##### `mech_time`

The mechanical time used in the simulation.

##### `mech_cycles`

The mechanical cycles used in the simulation.

##### `enable_logging`

A flag indicating whether logging is enabled for the simulation.

#### Methods

##### `Run()`

Run the simulation.

##### `AutoReadRestart()`

Automatically read the restart file for the simulation.

##### `SetTimeAndCycles()`(time, cycles)

Set the mechanical time and cycles for the simulation.

time (float): The mechanical time to set.
cycles (int): The mechanical cycles to set.

-------

[User manual](user_manual.md)
┊ [Previous](ref_shape.md)
┊ [Next](ref_utils.md)