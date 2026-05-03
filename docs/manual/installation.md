---
title: "Installation"
---

## Installation

The **Docs** link in the header opens the [manual home](index.md). Use this page first if you need to install or upgrade the Python package; use the sidebar for every other guide.

Phynexis is distributed as a Python package. The recommended way to install is via `pip` using the wheel file provided by the authors.

Bundled assets for this site (API PDF, pointers to tooling) live on **[Software & Tools](../download/index.md)**—open that page after install if you need the downloadable reference or related links.

### Requirements

- Python 3.9 or newer
- A 64-bit operating system: Linux, macOS, or Windows (via WSL)
- For CFD-DEM coupling: OpenFOAM (see [CFD-DEM simulation](cfddem-simulation.md))

### Install Phynexis

```bash
pip install phynexis-<version>-<platform>.whl
```

Or, if the package is hosted on an internal index:

```bash
pip install phynexis --index-url <internal-index-url>
```

Verify the installation by importing the package in Python:

```python
import phynexis
print(phynexis.__version__)
```

### GPU Support (Optional)

For neural-network-accelerated contact solvers (NetSDF, NetSPF, ANN contact), a CUDA-capable GPU is recommended. The GPU features are automatically available if PyTorch with CUDA is installed in the same environment:

```bash
pip install torch --index-url https://download.pytorch.org/whl/cu118
```

### Update

To update to a newer version:

```bash
pip install --upgrade phynexis --index-url <internal-index-url>
```

### Uninstall

```bash
pip uninstall phynexis
```
