---
layout: layouts/base.njk
title: Tornado Framework
description: Tornado asynchronous web framework
---

# Tornado

Tornado is a Python web framework and asynchronous networking library

![Tornado Logo](/assets/images/tornado-logo.png)

## Overview

Tornado is designed for building scalable, non-blocking web applications

## Key Features

### Asynchronous I/O

Non-blocking I/O for high performance

```python
import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
    async def get(self):
        self.write("Hello, world")

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
```

### WebSocket Support

Built-in WebSocket support

```python
class EchoWebSocket(tornado.websocket.WebSocketHandler):
    def open(self):
        print("WebSocket opened")

    def on_message(self, message):
        self.write_message(u"You said: " + message)

    def on_close(self):
        print("WebSocket closed")
```

### Real-time Features

Ideal for real-time web services and long polling

## Installation

```bash
pip install tornado
```

## Common Use Cases

- Real-time web services
- WebSocket applications
- Long polling
- High-performance APIs
- Chat applications

## Advantages

- High performance
- Non-blocking I/O
- WebSocket support
- Good for real-time apps

## Disadvantages

- Different paradigm (async)
- Smaller community
- More complex than Flask

## Official Documentation

[Tornado Documentation](https://www.tornadoweb.org/)

## Version Information

- Latest stable: Tornado 6.4+
- Python requirement: Python 3.7+
- License: Apache 2.0
