### Code design

#### General framework

The program currently contains 7 modules:

- domain: Define the computational domain
- evaluator: Define some personalized calculations of the discrete element model, such as adding external forces, exporting data, etc. Because these personalized calculations are not required for every calculation model, they can be added to the model freely through this subscription method. Generally, the evaluator is defined first, and then attached to a simulation and activated. When the discrete element is calculated to a certain node, the subscribed evaluator will be called uniformly. Currently, two evaluators are defined: pre_evaluator and post_evaluator. pre_evaluator is called at the beginning of each calculation cycle, and post_evaluator is called at the end of each calculation cycle.
- input: Used to interpret the input file. It is planned to adopt the json format as the data exchange format. Each json object corresponds to a command, and the simulation is constructed or modified through the execution of the command. The commands in plan definition 6: create, get, set, fix, unfix, run.
    - create: create objects such as shape, particle, wall, contact model, evaluator, etc.
    - get: get object properties
    - set: set object properties
    - fix: Bind the defined evaluator to simulation to activate.
    - unfix: Unbind the defined evalua to make it invalid.
    - run: start discrete element calculation
- mpi: data interaction between different parallel computing cores
- scene: contains shape tmplates, particle, wall, contact model, evaluator, etc.
- solver: Discrete element solver
- utils: other tool functions

#### Basic elements

- Particles:
    - Particles have variables or attributes such as shape, position, speed, and force
    - The movement of particles obeys Newton's law of motion
    - The particles are in contact with each other to generate contact force, which is calculated according to the corresponding contact model

- Wall or boundary:

    - The boundary has variables or attributes such as shape, position, and force
    - The boundary is generally assumed to be massless, so there is no need to calculate - Newtonian motion, just update its position according to the preset motion law

- Contact:
    - particle-to-particle, or particle-to-boundary contact
    - with contact geometric characteristics, contact force and other attributes
    - The contact model describes the relationship between contact force and contact geometric characteristics

#### Calculation procedures

The basic calculation process of discrete element (DEMSolver calculation process):

- Traverse all the "particles" in this calculation domain, and clear the force and torque to zero.
- Perform pre_evaluator, such as gravity.
- Traverse all the "particles" in this computational domain to determine whether its contours touch other computational domains: if so, use MPI to transfer its data to the computational domain, and create a new particle in the target computational domain based on the particle data, as The particle is a proxy in the target computing domain, and the proxy particle can come into contact with other particles. The particles in this computing domain are called "particle agents to be sent", and the particles in the target computing domain are called "received particle agents".
- Receive the "particle agent" data and create an instance of the particle agent:
    - If this calculation domain already contains the id of the particle agent, find the particle pointer through particlem_map, and update the particle instance with the received particle agent data;
    - If the id of the particle agent does not exist, create a new "particle_ghost" instance, and update the particle instance with the received particle agent data;
- Traverse the "granular agent to be sent" and send its corresponding "contact data" to the target computing domain.
- Receive contact data and create contact instances:
    - Determine the pointer of the particle according to the particle id, and determine the pointer of the contact model according to the contact model id
    - Determine whether the contact exists through the contact_pp_list of the particle
        - If it exists, update the contact instance from the received contact data.
        - If it does not exist, establish a contact first, and use the received particle agent data to update the particle instance,
- Traverse all contacts and set their updated to false.
- Divide the computational domain into grids, traverse all the "particles" and "received particle agents" in the computational domain, and classify them into each grid. The classification criteria are: If the circumscribed cube of the particle or particle agent contacts a certain grid, then the particle or particle agent is added to the grid.
- Traverse all grids:
    - Traverse the particles and particle agents in this grid to determine whether they are in contact. If touched:
        - Determine whether it was in contact at the previous time step
            - If yes, find the contact instance, update its contact geometric features and contact force, and set the updated of the contact to true
            - If not, create a new contact instance, initialize the contact geometric features and calculate the contact force, and set the updated of the contact to true
        - Apply contact force to particles and boundaries
- Traverse the "received particle agent":
    - Traverse the contact of the particle agent, if the updated state of the contact is true, use MPI to send the contact data back to the original computing domain
    - Receive contacts returned from other computing domains and reconstruct contact instances
        - If the contact already exists, use the returned data to update the original contact
        - If the contact does not exist, create a new contact and rebuild the particle pointer in the contact
            - If the particle exists in the computational domain, the particle pointer is found through particle_map and particle id.
            - If the particle does not exist in the computational domain, create a new "particle illusion" and set the "particle illusion" pointer to the contact.
    - Apply contact force to particles
- Traverse all contacts
    - If its updated status is false, delete the contact;
- Traverse all particles
        - Update its speed, position and other attributes according to Newton's law of motion
- Add the partial_proxy_list to the particle_ghost_list and clear the partial_proxy_list
- According to the updated particle position, traverse each particle to determine whether it exceeds the calculation domain:
    - If so, send its data to the new computational domain of the particle, and move the particle to particle_ghost_list.
- Receive the "particle" data and create an instance of the particle:
    - If this calculation domain already contains the id of the particle, find the particle pointer through particlem_map, and update the particle instance with the received particle data;
    - If the id of the particle does not exist, create a new particle instance and update the particle instance with the received particle data;
- Traverse particle_ghost_list 
    - If it is not in contact with any particles or boundaries, delete the "particle phantom"
- Perform post_evaluator, such as data output and other functions.