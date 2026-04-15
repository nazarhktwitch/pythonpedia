---
layout: layouts/base.njk
title: Sanic Framework
description: Sanic async Python web framework
---

# Sanic

Sanic is a Python web framework built on uvloop that is designed for fast HTTP responses via async/await syntax

<img src="/assets/images/sanic-logo.png" width="150">

## Overview

Sanic is an async web framework that is designed for speed and performance

## Key Features

### Async/Await

```python
from sanic import Sanic
from sanic.response import json

app = Sanic("MyApp")

@app.route("/")
async def test(request):
    return json({"hello": "world"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
```

### High Performance

Built on uvloop for maximum performance

### WebSocket Support

```python
@app.websocket('/feed')
async def feed(request, ws):
    while True:
        data = 'hello!'
        await ws.send(data)
```

## Installation

```bash
pip install sanic
```

## Common Use Cases

- High-performance APIs
- Real-time applications
- Microservices
- WebSocket applications

## Advantages

- Very fast
- Async/await support
- WebSocket support
- Modern Python features

## Disadvantages

- Smaller community
- Less documentation
- Requires async knowledge

## Official Documentation

[Sanic Documentation](https://sanic.dev/)

## Version Information

- Latest stable: Sanic 23.3+
- Python requirement: Python 3.8+
- License: MIT


