InfoReq-Node
============

The intention of this application is to send requests from client to server, and server send information back.

The client:
-----------
```
calin@nb:~/git/inforeq-node$ node client.js
Connection created. Start requesting information!
What type of OS do you run?
Received data from server:
"Linux"
What's the uptime?
Received data from server:
20533.975374253
Could you tell me the arch?
Received data from server:
"x64"
```

The server:
-----------
```
calin@nb:~/git/inforeq-node$ node server.js
Server has been started!
Client connect at 17:39:3
Client disconnect at 17:39:22
Client connect at 17:39:25
```

The purpose of writing was to learn develop real-time applications with Node.js

Under MIT Open Source License
