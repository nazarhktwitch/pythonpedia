---
layout: layouts/base.njk
title: "socket Module — Low-level Networking Interface"
description: "Python socket module: low-level networking, creating servers and clients."
---

# socket — Low-level networking interface

The `socket` module provides access to the BSD socket interface. It is the foundation of all network communication in Python. While high-level libraries (like `requests` for HTTP or `asyncio` for scalable servers) are preferred for application development, understanding sockets is crucial for low-level network programming.

```python
import socket
```

## Creating a Simple TCP Client

A client creates a socket, connects to a remote address, sends data, and receives a response.

```python
import socket

# 1. Create a socket object (IPv4, TCP)
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
    # 2. Connect to the server
    s.connect(("example.com", 80))
    
    # 3. Send data (must be bytes)
    request = b"GET / HTTP/1.1\r\nHost: example.com\r\n\r\n"
    s.sendall(request)
    
    # 4. Receive data
    response = s.recv(4096)
    print(response.decode('utf-8'))
finally:
    # 5. Always close the socket!
    s.close()
```

## Creating a Simple TCP Server

A server creates a socket, binds it to a local address and port, listens for incoming connections, and accepts them.

```python
import socket

# Use a context manager to ensure the socket closes automatically
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    # Allow port reuse (prevents "Address already in use" error)
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    
    # 1. Bind to an address and port
    # Empty string means all available interfaces
    s.bind(('', 65432))
    
    # 2. Listen for connections (allow up to 5 pending connections)
    s.listen(5)
    print("Server listening on port 65432...")
    
    # 3. Accept a connection (This blocks until a client connects)
    conn, addr = s.accept()
    with conn:
        print(f"Connected by: {addr}")
        while True:
            # Receive data
            data = conn.recv(1024)
            if not data:
                break
            
            # Echo data back to client
            conn.sendall(data)
```

---

## API Reference

### Core Constants
| Constant | Description |
|----------|-------------|
| `socket.AF_INET` | Address Family: IPv4 (e.g., `192.168.1.1`). |
| `socket.AF_INET6`| Address Family: IPv6. |
| `socket.SOCK_STREAM`| Socket Type: TCP (Transmission Control Protocol). Reliable, stream-oriented. |
| `socket.SOCK_DGRAM`| Socket Type: UDP (User Datagram Protocol). Fast, unreliable, message-oriented. |

### Socket Methods
| Method | Description |
|--------|-------------|
| `socket()` | Constructor. Creates a new socket object. |
| `s.bind(address)` | Bind the socket to `address`. The format of address depends on the address family. For IPv4, it's a tuple `(host, port)`. |
| `s.listen([backlog])`| Enable a server to accept connections. |
| `s.accept()` | Accept a connection. The socket must be bound and listening. Returns `(conn, address)`. |
| `s.connect(address)`| Connect to a remote socket at `address`. |
| `s.sendall(bytes)`| Send data to the socket. It continues to send data from bytes until either all data has been sent or an error occurs. |
| `s.recv(bufsize)` | Receive data from the socket. The return value is a bytes object. |
| `s.close()` | Mark the socket closed. |
| `s.settimeout(value)`| Set a timeout on blocking socket operations in seconds. |
