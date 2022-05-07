###

[User manual](user_manual.md)
┊ [Previous](basic_usage.md)
┊ [Next](blender_rendering.md)

------

### Client/Server

- Establish tunneling using:

        ssh -L 11111:localhost:11111 -p [port] [user]@[remote-ip]

- Start ``pvserver`` on remote

        pvserver

- Open paraview at local, add and connect to server with type ``Client/Server``, host ``localhost`` and port ``11111``

------

[User manual](user_manual.md)
┊ [Previous](basic_usage.md)
┊ [Next](blender_rendering.md)