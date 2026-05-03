---
title: "Docker and HPC"
---

## Docker and HPC

Phynexis can be containerized for reproducible deployment on local workstations or HPC clusters. The snippets below assume you have the **Phynexis C++ source** under the terms of your distribution (this documentation repo does not ship the engine).

Containers help keep compiler, MPI, and dependency stacks consistent across development, testing, and production machines.

Official or lab-maintained images (if any) take precedence over ad hoc Dockerfiles—ask your Phynexis distributor before relying on the sketch below.

### Building a Docker Image

Below is a **minimal** Dockerfile on Ubuntu 22.04. Real builds usually need additional physics/MPI/OpenFOAM dependencies from your release notes. Targets such as `make sync_submodule` must exist in **your** engine `Makefile`; rename or split steps if your tree uses another bootstrap flow.

```dockerfile
FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    build-essential cmake git openmpi-bin libopenmpi-dev \
    libboost-all-dev libgmp-dev

# Copy Phynexis source into the image
COPY phynexis /opt/phynexis
WORKDIR /opt/phynexis
RUN make sync_submodule && make -j$(nproc)
```

Build and run:

```bash
docker build -t phynexis .
docker run --rm -it -v $(pwd)/data:/data phynexis
```

### Singularity / Apptainer for HPC

Many HPC centers do not support Docker directly. Convert the image to Singularity/Apptainer format:

```bash
# From a local Docker daemon
singularity build phynexis.sif docker-daemon://phynexis:latest

# Run on the cluster
singularity exec phynexis.sif ./build/bin/your_simulation
```

For multi-node MPI runs, consult your cluster's Singularity documentation for binding host MPI and network fabrics.

### HPC Best Practices

- **Pre-install dependencies**: build a base image with all third-party libraries to avoid recompiling on every deployment.
- **Bind mounts**: mount case directories and output folders into the container rather than copying data in.
- **MPI compatibility**: ensure the container's MPI matches the host MPI, or use the host MPI to launch the container.

:::info
Detailed Dockerfiles and HPC deployment scripts are maintained internally. Contact the authors for production-ready configurations tailored to your cluster environment.
:::
