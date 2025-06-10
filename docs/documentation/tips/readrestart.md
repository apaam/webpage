###

[User manual](user_manual.md)
┊ [Previous](user_manual.md)
┊ [Next](user_manual.md)

-------

### Read Restart Usage

NetDEM supports two restart mechanisms to facilitate flexible and efficient continuation of large-scale discrete element simulations. Users can choose between **VTK-based** and **JSON-based** restart options depending on the fidelity required and the intended use (e.g., visualization vs. simulation continuation).

#### Overview of Restart Mechanisms

##### VTK-Based Restart

The **VTK** format is used to export basic simulation results through the `DataDumper` module. It supports reading geometry information such as particles and walls but **does not currently support restoring contact information**. 

##### JSON-Based Restart

The **JSON** format is generated when `dump_read_restart` is enabled in `DataDumper`. It contains comprehensive simulation state data, including particle properties, wall status, and contact information. This mechanism is recommended for high-fidelity restart scenarios where exact simulation continuation is required.

#### Usage Instructions

A restart can be initiated using the following command:

```python
sim.scene.AutoReadRestart("packing/", 40000, 0, "json")
```

Where:
- `"packing/"` is the directory containing the saved restart data.
- `40000` specifies the target cycle or time step.
- `0` is the subdomain ID (used in parallel simulations).
- `"json"` or `"vtk"` sets the data format to be loaded.

If the `"vtk"` format is selected, please note that contact information will not be recovered. Use `"json"` if full state recovery is needed.

#### Resetting Simulation Time and Step

After reading restart data, the simulation clock and cycle count can be reset using:

```python
sim.SetTimeAndCycles(0, 0)
```

This is useful for cleanly defining the start of a new simulation stage and for consistent time tracking in post-processing.

Alternatively, users may set the original time and cycle values (e.g., from a previous run) using:

```python
sim.SetTimeAndCycles(4.0, 40000)
```

This allows the simulation to resume from the actual interruption point, ensuring continuity in both numerical progression and temporal tracking. It is especially important when simulation results need to be seamlessly integrated across different stages.

When restarting from a previous simulation, it is often necessary to recover the time series used by ParaView for animation and analysis. This can be done via:

```python
data_dumper.ReadTimeSeries("dem/")
```

This function reads the existing `.series` file to restore consistent visualization timelines. Without this, the file may be overwritten during restart.

#### Configuring DataDumper for Restart

To enable restart functionality and data output during the initial simulation, configure the `DataDumper` module accordingly.

##### VTK Output

To export results in VTK format for visualization in ParaView:

```python
data_dumper.SetSaveByTime(0.01)  # Save VTK files every 0.01 seconds
```

This generates geometry and field data at fixed time intervals, but does not include full simulation state (e.g., contact info). Use this option when your goal is primarily visualization and post-processing.

##### JSON Output for Simulation Restart

To save full simulation state for accurate restart:

```python
data_dumper.dump_read_restart = True
data_dumper.SetSaveReadRestartByTime(1.0)  # Save restart data every 1.0 seconds
```

These settings enable periodic dumping of complete simulation snapshots in JSON format, including contact models, particle states, wall conditions, and other metadata required for exact restart.

#### Restarting of the CFD Side (OpenFOAM)

On the CFD side (e.g., using OpenFOAM), restart is configured via the `controlDict` file located in the `system/` directory. To resume from a previously saved simulation state, modify the `startFrom` and `startTime` entries as follows:

```plaintext
startFrom       latestTime;
```

Where:
- startFrom latestTime tells OpenFOAM to automatically start from the latest available time folder in the case directory.
- You may alternatively replace latestTime with a specific time value, such as 4.0, to restart from that point explicitly.

Note: If you manually set startTime, make sure the corresponding time folder exists. Otherwise, OpenFOAM will return an error.

This configuration enables smooth continuation of a CFD simulation either from the latest available time or a chosen earlier time step, and is especially useful when coupling with DEM restart logic in hybrid simulations.

#### Restart Execution Script

In restart scenarios, it is recommended **not** to use the default `Allrun-parallel` or `Allclean` scripts, as they may overwrite or delete necessary data such as decomposed time directories or previous simulation logs.

Instead, use a minimal execution script (e.g., named `All-restart`) based on `Allrun-parallel`, with the following modifications:
- Skip mesh generation and decomposition steps.
- Back up and remove the previous solver log.
- Directly launch the solver using the existing decomposed case.

#### Example: `All-restart` script

```bash
#!/bin/sh
cd "${0%/*}" || exit                                # Run from this directory
. ${WM_PROJECT_DIR:?}/bin/tools/RunFunctions        # Tutorial run functions
#------------------------------------------------------------------------------

# Backup and clean previous log
mv log.$(getApplication) log.$(getApplication)-bak
rm -f log.$(getApplication)

# Run the solver in parallel (assumes case is already decomposed)
runParallel $(getApplication)

#------------------------------------------------------------------------------
```

Note: Ensure that the case has already been decomposed (i.e., decomposePar has been run previously), and that the necessary processor*/ directories exist before executing this script.

This streamlined script ensures a clean restart without overwriting mesh or field files, and is especially useful in CFD-DEM coupled simulations where DEM restart is coordinated in parallel.

-------

[User manual](user_manual.md)
┊ [Previous](user_manual.md)
┊ [Next](user_manual.md)