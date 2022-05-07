###

[User manual](user_manual.md)
┊ [Previous](basic_usage.md)
┊ [Next](blender_rendering.md)

------

### Client/Server

- ``ssh`` to remote server and start a ``pvserver``;
- Establish tunneling using: (remote-hostname can be obtained from the prompt message of pvserver)

        ssh -L 11111:[remote-hostname]:11111 -p [port] [user]@[remote-ip]

- Open paraview in local, add and connect to server with type ``Client/Server``, host ``localhost`` and port ``11111``

------

[User manual](user_manual.md)
┊ [Previous](basic_usage.md)
┊ [Next](blender_rendering.md)