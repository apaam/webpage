---
title: Manual
sidebar_label: Start here
description: Entry point for Phynexis guides, installation, examples, and API reference.
sidebar_position: 0
---

Use the sidebar to browse every guide—under **Getting Started**, **Phynexis Overview** comes first for the product summary; **Start here** (this page) is the manual hub with setup tables and links to everything else, then installation, usage, and visualization. The header **API** menu jumps straight to Python or C++ reference pages.

## Setup

| Step | Page |
|------|------|
| Read the product overview | [Phynexis overview](user-manual.md) |
| Install the Python package | [Installation](installation.md) |
| Run simulations from Python | [Basic usage](basic-usage.md) |

## Product overview

| Page | What it covers |
|------|----------------|
| [Phynexis overview](user-manual.md) | Modules, particle shapes, capabilities |
| [CFD–DEM simulation](cfddem-simulation.md) | Fluid–particle coupling |
| [Restart and checkpoint](tips/read-restart.md) | Continuing runs |

## Visualization

| Page | What it covers |
|------|----------------|
| [ParaView rendering](paraview-rendering.md) | Scientific visualization |
| [Blender rendering](blender-rendering.md) | Offline rendering |

## Developer guide

For anyone extending the C++ core or bindings: read **[Architecture & development](developer-manual.md)** first (profiling, pybind rules, Doxygen). Environment and tooling for building or running on clusters are grouped here too.

| Page | What it covers |
|------|----------------|
| [Architecture & development](developer-manual.md) | Code layout, lifecycle, coding standards |
| [Pybind11 binding style](dev-pybind-styles.md) | Python binding conventions |
| [Docker & HPC](docker-hpc.md) | Containers and clusters |
| [Developer tools](computer-tips.md) | GitHub CLI, proxies, workstation setup |

## Theory & models

| Page | What it covers |
|------|----------------|
| [Theory overview](dem-wiki.md) | Hub linking DEM basics, homogenization, particle models |
| [DEM basics](dem-basics.md) | Discrete element fundamentals |
| [Discrete to continuum](discrete-to-continuum.md) | Continuum stress / homogenization *(page body in Chinese — draft)* |
| [Particle models](particle-models.md) | Poly-super-ellipsoid formulations *(page body in Chinese — draft)* |

## API reference

Python reference pages use their **own left sidebar** (module tree only). Open **API → Python** or the [Python API overview](../python-api/index.md) to switch.

| Resource | How to open |
|----------|-------------|
| Python | Header **API → Python**, or [Python API overview](../python-api/index.md) |
| C++ | Header **API → C++ (Doxygen)** (new tab), or [Doxygen HTML](pathname:///doxygen/html/) |

## Outside this manual

- [Examples](../examples/index.md) — runnable scripts
- [Gallery — animations](../gallery/animations.md), [snapshots](../gallery/snapshots.md)
- [Download](../download/index.md) — software, tools, PDF export
