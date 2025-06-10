###

[User manual](user_manual.md)
┊ [Previous](ref_modifier.md)
┊ [Next](ref_netdem.md)

-------

### MPIManager

This class provides an interface for MPI-based parallelism.

#### Constructor

##### `MPIManager()`

Creates a new instance of the MPIManager class.

#### Methods

##### `GetSelfRank()`

Returns the rank of the current process.

##### `GetTotalRank()`

Returns the total number of processes.

##### `SyncShapeToAllProcessors(shape)`

Synchronizes the shape of an array among all the processes.

- `shape` (numpy array): A numpy array that represents the shape to synchronize.

##### `SyncDataAmongProcessors(data)`

Synchronizes the data of an array among all the processes.

- `data` (numpy array): A numpy array that represents the data to synchronize.

Note: This method can be called with either an array of integers or an array of doubles.

-------

[User manual](user_manual.md)
┊ [Previous](ref_modifier.md)
┊ [Next](ref_netdem.md)