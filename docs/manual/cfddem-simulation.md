---
title: "CFD–DEM simulation"
---

## CFD–DEM simulation

Phynexis couples discrete-element solids with fluid solvers based on **OpenFOAM**, using solver variants such as **hybridCFDdem**, **interIBdem**, and **semiResolvedCFDdem**. This page describes how to run **bundled OpenFOAM-style cases** that ship with the **licensed Phynexis / CFDDEM source tree**.

:::info Engine vs this website

Paths such as `cfddem/examples/...` refer to directories **inside your engine checkout**, not the **[Examples](../examples/index.md)** section of this documentation site. The site Examples are standalone **Python scripts**; CFD–DEM tutorials live next to OpenFOAM case files in the distribution you received.

:::

### Prerequisites

- A supported **OpenFOAM** environment compatible with your Phynexis build (see your distributor’s release notes).
- **Phynexis** Python bindings available to the case scripts (typically via `pip` / wheel as in [Installation](installation.md), or a developer build path—see below).
- Familiarity with OpenFOAM case layout (`system/`, `constant/`, `0/`).

### Case layout and drivers

Coupled cases use the usual OpenFOAM directory structure. DEM coupling is driven from Python (for example `createDEM.py`) while the fluid mesh and fields follow OpenFOAM conventions. In each case, **`system/fvSolution`** → **`coupling`** names the DEM script and callback used for that run—adjust there when you switch coupling strategies or DEM inputs.

### Running bundled examples

Example cases live under the **`examples/`** folder **inside the `cfddem` tree** of your source distribution (not under this repo). From an example directory you will typically use the provided Allwclean / Allrun scripts, for example:

```bash
./Allrun
```

Use `./Allrun-parallel` when the case ships it for parallel mesh decomposition.

If **`import phynexis` fails** inside `createDEM.py`, insert the library path for your build before importing, for example:

```python
import sys
sys.path.append("/path/to/phynexis/build/lib/")
import phynexis
```

Use the actual `lib` path from your installation or build instructions.

### Water entry example (`interIBdem`)

Illustrative workflow (paths relative to your **`cfddem`** checkout):

1. **Copy** the case tree to a writable location:

   ```bash
   cd cfddem
   cp -rf examples/interIBdem/water_entry local/interIBdem/
   ```

2. **Run** (after checking `system/fvSolution` → `coupling` points at the intended DEM script):

   ```bash
   cd local/interIBdem/water_entry
   ./Allclean
   ./Allrun-parallel
   ```

3. If execution fails, verify the Phynexis library path in **`createDEM.py`** matches the directory that contains your built Python modules.

### Visualization

- Open **`interIBdem.foam`** in ParaView for the fluid fields; set **Case Type** to **Decomposed Case** when working with decomposed meshes, and optionally disable **Skip Zero Time**.
- DEM VTK sequences typically appear under **`dem/`** (for example `particle_mesh_*.vtk.series`). For spherical particles you can group series and map velocities with ParaView filters; for CFD–fluid interfaces, a **Contour** on **`alpha.water`** at `0.5` is common for two-phase surfaces.

General ParaView workflows for Phynexis VTK output (particles, walls, contact tubes, rendering) are centralized in **[ParaView rendering](paraview-rendering.md)**.

### Modifying the water-entry case

- **Fluid properties** — `constant/transportProperties`; phase names must stay consistent with **`alpha.<phase>`** fields (for example in `system/setFieldsDict`).
- **Mesh / geometry** — `system/blockMeshDict`. If a **length scale** is applied there, vertex coordinates are multiplied accordingly when the mesh is built.
- **Mesh resolution** — controlled by the refinement near **`simpleGrading`** in the **`blocks`** → **`hex`** entry; prefer nearly cubic cells when possible.
- **Initial volume fractions** — `system/setFieldsDict`. Scaling from `blockMeshDict` does **not** apply here: coordinates are **physical**. A box entry such as `box (-0.05 -0.05 -0.15) (0.05 0.05 0.03)` sets lower-front-left and upper-back-right corners. Ensure **`alpha.<phase>`** names match **`transportProperties`** → **`phases`**.
- **Time control** — `system/controlDict` (end time, Δt, write interval).
- **DEM setup** — in **`createDEM.py`**, functions such as **`oneSphere()`** adjust DEM domain size, walls, and insertion regions. Parameters named **`scale`** may scale the overall DEM box and insertion zone, while **`p_size`** often sets the physical particle diameter—check the function body for your case variant.

For licensing, binaries, or case packs not present in your tree, use the contact channel on **[About](../about/index.md)**.
