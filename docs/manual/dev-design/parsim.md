---
title: "Parsim Module Design"
sidebar_label: "Parsim Design"
---

# Parsim Module Design

`phynexis::parsim` (Parallel Simulation) is the core simulation framework of Phynexis. It is not a physics model — it is the orchestration layer that defines how simulations are structured, executed, and parallelized. All domain-specific modules (DEM, FEM, CFD-DEM, peridynamics) build on top of parsim.

This document explains the computational graph model, the phase-based operator system, domain decomposition, and the deferred initialization pattern that enables domain-specific extensions.

---

## 1. Core Design Principles

### 1.1 Computational Graph Model: G = (V, E, H)

Every simulation in Phynexis is represented as a computational graph:

| Component | Symbol | Meaning | Example |
|-----------|--------|---------|---------|
| NodeSet | V | Physical entities | Particles, walls, FEM nodes |
| EdgeSet | E | Pairwise interactions | Contacts, bonds, repulsion forces |
| HyperEdgeSet | H | Multi-node elements | FEM tetrahedra, constraints |

This graph is **pure structure** — it contains no simulation logic. All physics is implemented as **operators** that read and mutate the graph. This separation makes the framework domain-agnostic: the same graph infrastructure serves DEM (particles + contacts), FEM (nodes + elements), and hybrid simulations.

### 1.2 Phase-Based Operator System

Simulation execution is not hard-coded as a sequence of function calls. Instead, it is an **operator pipeline**:

```
Simulator.step():
  for phase in pipeline:
    for operator in operators_for(phase):
      operator.execute(phase)
```

Each operator registers which phases it cares about. The pipeline is a configurable `VecX<PhaseId>`. Domain-specific modules can insert custom phases (e.g., MPI exchange, contact model resolution) without modifying the core framework.

### 1.3 Pure Data Container, Logic in Operators

`ComputationalGraph`, `NodeSet`, `EdgeSet`, and `HyperEdgeSet` are data containers only. They own `FieldManager`s for SoA storage, `IdPool`s for ID allocation, and `ShapeStore`s for geometry catalogs — but they know nothing about gravity, contact forces, or time integration.

All simulation logic lives in operators (`Integrator`, `Gravity`, `RepulsionForce`, `MpiExchanger`, etc.). This is the **Strategy pattern** at the framework level: parsim provides the stage, operators perform the play.

### 1.4 Deferred Initialization

`Simulator` uses a deferred initialization pattern to allow domain-specific derived classes to inject their own `Context` and `Solver` types:

```cpp
class Simulator {
  Simulator(DeferredSimulatorInit);  // base ctor: no bootstrap
  virtual void init();               // virtual: derived class overrides
protected:
  virtual Context* create_context() = 0;  // netdem::Scene, netfem::MeshContext, etc.
  virtual Solver* create_solver() = 0;    // DEMSolver, FEMSolver, etc.
};
```

`netdem::Simulator` derives from `parsim::Simulator` and overrides `create_context()` to return a `Scene` (a `Context` with DEM-specific resources like contact model tables). The base class cannot know about `Scene` — deferred initialization breaks the circular dependency.

---

## 2. Class Architecture

### 2.1 Top-Level: Simulator

```
Simulator
├── Config { time_step, end_time, max_steps, gravity }
├── MPIRuntime              # MPI comm, rank, size
├── Context (unique_ptr)    # Resource container
│   ├── ComputationalGraph
│   ├── DomainSystem
│   ├── SimulationState
│   ├── SpatialIndex
│   └── [extensible resources]
└── Solver (unique_ptr)     # Phase pipeline executor
    ├── OperatorSystem
    ├── PhaseRegistry
    ├── StepPipeline
    └── ParsimProfiler
```

`Simulator` is the user-facing API. A typical DEM simulation:

```cpp
auto sim = netdem::Simulator(config);
sim.context().graph().nodes().emplace(particle_data);
sim.context().graph().edges().emplace(contact_data);
sim.init();
for (int i = 0; i < max_steps; ++i) {
  sim.step();
}
```

### 2.2 Context — Resource Container

`Context` is a `KeyedObjectPool<std::string, ContextResource>` with typed accessors:

```cpp
class Context {
  KeyedObjectPool<String, ContextResource> resources_;
public:
  ComputationalGraph& graph() { return *ensure_resource<ComputationalGraph>("graph"); }
  DomainSystem& domain() { return *ensure_resource<DomainSystem>("domain"); }
  SimulationState& state() { return *ensure_resource<SimulationState>("state"); }
  // ...
};
```

Default resources are auto-created via `ResourceRegistry` (static factory + `REGISTER_DEFAULT_RESOURCE` macro):

| Key | Resource Type | Purpose |
|-----|--------------|---------|
| `"graph"` | `ComputationalGraph` | V/E/H data |
| `"domain"` | `DomainSystem` | Domain decomposition |
| `"state"` | `SimulationState` | Step index, physical time |
| `"spatial_index"` | `SpatialIndex` | Neighbor queries |

The pool-based design means new resources can be added without modifying `Context`. `ensure_resource<T>(key)` lazily creates the resource if absent.

### 2.3 ComputationalGraph

```cpp
class ComputationalGraph : ContextResource {
  NodeSet nodes_;           // V
  EdgeSet edges_;           // E
  HyperEdgeSet hyper_edges_; // H
  ShapeStore shape_store_;   // Shared shape catalog
};
```

**ShapeStore** is a `KeyedObjectPool` of `Shape*` objects. Nodes reference shapes by handle (not by pointer or copy), so a single sphere shape can be shared by 1M particles without 1M copies of the mesh data.

### 2.4 SetBase — Lifecycle Management

All graph sets (`NodeSet`, `EdgeSet`, `HyperEdgeSet`) inherit from `SetBase`:

```cpp
class SetBase {
protected:
  FieldManager field_manager_;   // SoA field storage
  IdPool id_pool_;               // MPI-safe ID allocation
  SetView set_view_;             // (id, alive, epoch) lifecycle slots
  FlatHashMap<Int64, Int64> id_to_index_map_;  // O(1) id → slot lookup
};
```

**MPI-safe IDs**: `IdPool` encodes IDs as `(process_id << 48) | local_id`. With 48 bits for local ID and 16 bits for process ID, each MPI rank can allocate up to 2^48 IDs independently — no communication required for ID allocation. IDs are only recycled within the same process.

**Lifecycle slots**: Every entity has `(id, alive, epoch)` fields:
- `id` — global unique identifier
- `alive` — boolean, false = logically deleted (slot reused on compact)
- `epoch` — generation counter, detects stale references

**O(1) lookup**: `id_to_index_map_` provides fast ID-to-slot translation. This is essential for edge construction (edges store node IDs, not indices, because indices change on compaction but IDs are stable).

### 2.5 Phase-Based Operator System

#### PhaseRegistry

Standard phases are reserved (0–9). Custom phases start at 10:

| Phase | ID | Purpose |
|-------|-----|---------|
| PreStep | 0 | Setup before step |
| PreBoundary | 1 | Boundary condition prep |
| PostBoundary | 2 | Boundary condition apply |
| PreInteraction | 3 | Interaction detection prep |
| PostInteraction | 4 | Interaction detection |
| PreForces | 5 | Force computation prep |
| PostForces | 6 | Force computation |
| PreIntegration | 7 | Integration prep |
| PostIntegration | 8 | Integration |
| PostStep | 9 | Cleanup / output |

Custom phases (examples):
- `MpiPreIntegrationWeightedAverage` (10) — ghost node averaging
- `MpiPostIntegrationExchange` (11) — post-integration MPI exchange

#### BaseOperator

Operators register phase handlers in their constructor:

```cpp
class Gravity : public BaseOperator {
  Gravity() {
    register_phase_handler(phases::PostForces, "apply_gravity",
                           [this]() { execute_apply_gravity(); });
  }
  void execute_apply_gravity() {
    // Read mass from NodeSet, write force to NodeSet
  }
};
```

`execute(PhaseId)` does O(1) indexed dispatch to the handler. No virtual call per phase — handlers are stored in a `VecX<std::function>` indexed by phase ID.

#### OperatorSystem

Manages operators in a `KeyedObjectPool` with label-based indexing. Within each phase, operators are sorted by `order` (priority). The `timing_map_` precomputes which operators run in which phase, so `execute(phase)` does not scan all operators — it only iterates the relevant subset.

### 2.6 Solver::step() Execution

```cpp
void Solver::step() {
  flush_config_if_stale();           // Propagate config changes once
  for (PhaseId phase : pipeline_) {  // 10 phases by default
    ops_.execute(phase);              // Run phase handlers
  }
  context_->state().advance(time_step_);  // Increment step, time
}
```

**Config stale-checking**: `Simulator` and `Solver` track `config_last_pushed_`. Changing config (e.g., gravity, time step) does not immediately propagate. `flush_config_if_stale()` applies changes once per step, batching multiple config updates.

### 2.7 DomainSystem — Domain Decomposition

```cpp
class DomainSystem : ContextResource {
  Config config_;                    // domain_bound, decomposition strategy
  VecX<BoundingBox> subdomain_bounds_;  // Per-rank bounding box
  Int64 self_rank_;
  Int64 total_ranks_;
public:
  Int64 get_overlapped_subdomain(const Vec3d& pos);
  VecX<Int64> get_overlapped_other_subdomains(const BoundingBox& bbox);
  bool is_judge_domain(const BoundingBox& a, const BoundingBox& b);
};
```

**Judge domain**: For a pairwise interaction between two bounding boxes A and B, only the subdomain containing the "judge point" computes the interaction. The judge point is the componentwise maximum of the two min corners:

```
judge_point = max(A.min, B.min)  // componentwise
owner = domain_system.get_overlapped_subdomain(judge_point)
```

This guarantees exactly one rank computes each interaction — no duplicates, no missed pairs.

**Subdomain overlap**: `get_overlapped_other_subdomains(bbox)` returns all ranks whose subdomain overlaps the given bounding box. Used to determine which ranks need ghost copies of a particle.

### 2.8 SpatialIndex — Neighbor Queries

`SpatialIndex` is an abstract interface. The default implementation is `UniformGridIndex`:

```cpp
class UniformGridIndex : SpatialIndex {
  Vec3d corner_;      // Grid origin
  Vec3d spacing_;     // Cell size
  Vec3i dim_;         // Grid dimensions
  FlatArray3D<VecX<Int64>> cells_;  // Cell → node indices
};
```

Used by `RepulsionEdgeBuilder` to find candidate node pairs for interaction. The grid is rebuilt each step (or incrementally updated) by the `UniformGridIndexBuilder` operator.

---

## 3. MPI Parallelization

### 3.1 Ghost Cloning

MPI exchange in parsim uses a **ghost clone** pattern:

1. A node (particle) near a subdomain boundary is identified as needing ghost copies on neighboring ranks.
2. The owning rank sends the node's data to overlapping ranks.
3. Receiving ranks insert the node into their local `NodeSet` with `alive = GhostCloned` and a weight factor.
4. After force computation, ghost clones contribute weighted values back to the original.
5. `MpiExchanger` runs in custom phases (10 and 11) to average ghost contributions and exchange updated states.

### 3.2 MpiExchanger

Implements the `IExchangeAdapter` interface:

```cpp
class MpiExchanger : BaseOperator, IExchangeAdapter {
  void gather(Int64 target_rank, VecX<char>& buffer);   // Pack local nodes
  void merge(Int64 source_rank, const VecX<char>& buffer); // Receive, mark GhostCloned
  void run_exchange();                                      // Non-blocking MPI send/recv
};
```

The exchange uses a single MPI tag and non-blocking `MPI_Isend`/`MPI_Irecv`. After integration, ghost nodes are reclassified (live vs. ghost) based on their current position relative to subdomain boundaries.

---

## 4. SoA + Schema + View in Parsim

Parsim uses the fields module's three-layer pattern consistently:

```
Schema (compile-time)          BoundLayout (runtime)          View (typed access)
    |                                |                              |
NodeKinematicsSchema              layout.bind(manager)      NodeKinematicsView
  - position (vec3)                → position.x, .y, .z      → view.pos(i)
  - velocity (vec3)                → velocity.x, .y, .z      → view.vel(i)
  - force (vec3)                   → force.x, .y, .z         → view.force(i)
```

Schema definitions are in `parsim/schema/`. Views are in `parsim/views/`. The pattern:
1. Schema defines the logical field layout (e.g., `NodeKinematicsSchema` = position + velocity + force).
2. `ensure_fields(schema)` creates missing fields in the `NodeSet`'s `FieldManager`.
3. `BoundLayout` resolves schema slots to actual `FieldBase*` handles.
4. `CachedView` lazily rebuilds the typed view when the layout changes.

This is the same pattern described in the [Fields module design](fields.md), applied to simulation entities instead of generic data arrays.

---

## 5. Integration with Other Modules

### 5.1 netdem (DEM Specialization)

```
netdem::Simulator ──► parsim::Simulator
  create_context() ──► Scene (has contact model table)
  create_solver() ──► DEMSolver (adds contact resolution)

Scene ──► parsim::Context
  + contact_model_table
  + wall_manager
  + particle_group_manager
```

`DEMSolver` extends `Solver` with contact model management. The phase pipeline adds DEM-specific operators (`ContactDetector`, `ContactResolver`) in the `PostInteraction` and `PostForces` phases.

### 5.2 fields (Data Layer)

Every `SetBase` owns a `FieldManager`. All node/edge/hyper-edge data is stored as SoA fields. The schema/view system provides typed, zero-cost access to this data.

### 5.3 utils (Infrastructure)

- `KeyedObjectPool` — Context resources, OperatorSystem, ShapeStore
- `FlatHashMap` — id-to-index mapping
- `BinaryPack` — Checkpoint/restart serialization
- `MPIWrapper` — Type-safe MPI collectives
- `BoundingBox`, `Vec3d` — Geometry primitives

---

## 6. Design Decisions

### 6.1 Why a computational graph instead of a scene hierarchy?

A scene hierarchy (e.g., `Scene` owns `Particles` owns `Contacts`) hard-codes the entity relationships. A graph model (V/E/H) is more flexible:
- Same infrastructure for DEM (particles + contacts), FEM (nodes + elements), and hybrid.
- Edges can represent any pairwise interaction — contacts, bonds, springs, constraints.
- Hyper-edges support arbitrary multi-node elements without special cases.

The trade-off is slightly more boilerplate (graph sets instead of direct `particles_` vector), but the flexibility pays off for multi-physics coupling.

### 6.2 Why phase-based operators instead of a hard-coded step function?

A hard-coded `step()` would look like:

```cpp
void step() {
  apply_boundary_conditions();
  detect_contacts();
  compute_forces();
  integrate();
}
```

This works for simple DEM but breaks when:
- You need FEM stiffness matrix assembly between force and integration.
- You need CFD-DEM coupling at a specific point in the pipeline.
- You need custom output or analysis operators.

Phase-based operators let domain-specific modules insert logic at any point without modifying the core loop. The pipeline is data (`VecX<PhaseId>`), not code.

### 6.3 Why MPI-safe IDs instead of global ID allocation?

Global ID allocation would require an MPI_Allreduce or centralized counter on every entity creation — a synchronization bottleneck for dynamic simulations where particles are created/destroyed frequently. The `(process_id << 48) | local_id` encoding gives each rank 2^48 independent IDs with zero communication.

The 48-bit local ID limit means a single rank can have at most ~281 trillion entities. For a typical DEM simulation with 1M particles per rank, this is effectively unlimited.

### 6.4 Why judge domain instead of spatial hashing for interaction assignment?

Spatial hashing assigns interactions based on geometric location. The judge domain uses a deterministic rule (componentwise max of min corners) that:
- Requires no additional data structure.
- Is symmetric: both ranks compute the same judge point.
- Guarantees exactly one owner per interaction pair.

The trade-off is that load imbalance can occur if interactions cluster near subdomain boundaries. For most DEM simulations, this is acceptable because particle motion distributes interactions dynamically.

### 6.5 Why deferred initialization instead of template parameters?

An alternative design would template `Simulator` on `ContextT` and `SolverT`:

```cpp
template <typename ContextT, typename SolverT>
class Simulator { ... };
```

This avoids virtual calls but explodes compile times and binary size. Deferred initialization uses virtual factory methods (`create_context()`, `create_solver()`) with a single virtual call at initialization time. The hot path (`step()`) has no virtual dispatch — operators are stored as `std::function` callbacks, which inline through the function pointer.

### 6.6 Why ghost clones with weighted averaging instead of force return?

Two common MPI patterns for parallel particle methods:

| Pattern | How it works | Trade-off |
|---------|-------------|-----------|
| Force return | Compute forces on ghosts, send forces back to owner | Requires force data exchange, complex for multi-body forces |
| Ghost clone + weighted average | Each rank computes full state for ghosts, average states afterward | Simpler for complex interactions, but duplicates computation |

Parsim uses ghost clones because:
- It generalizes to any interaction type (not just pairwise forces).
- It handles constraint equations and implicit solvers naturally.
- The duplicate computation is typically a small fraction of total work (ghosts are only boundary particles).

---

## 7. Code Navigation Guide

| Want to understand... | Start here |
|----------------------|-----------|
| How the step loop works | `simulator/solver.cpp` → `step()` |
| How operators register phases | `operators/base_operator.hpp` → `register_phase_handler()` |
| How the graph stores data | `graph/computational_graph.hpp` → `NodeSet`, `EdgeSet` |
| How IDs are allocated | `utils/id_pool.hpp` → `allocate()` |
| How domain decomposition works | `context/domain_system.hpp` → `is_judge_domain()` |
| How MPI exchange works | `operators/mpi_exchanger.hpp` → `run_exchange()` |
| How spatial indexing works | `context/uniform_grid_index.hpp` → `query()` |
| How schema binds to fields | `schema/node_kinematics_schema.hpp` + `views/node_kinematics_view.hpp` |
| How deferred init works | `simulator/simulator.hpp` → `DeferredSimulatorInit` |
| How config propagates | `simulator/solver.hpp` → `flush_config_if_stale()` |
