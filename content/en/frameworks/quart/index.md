---
layout: layouts/base.njk
title: Quart Framework
description: Quart async Flask-compatible framework
---

# Quart

Quart is an async Python web framework based on Flask

<img src="/assets/images/quart-logo.png" width="400">

## Overview

Quart is an async version of Flask that maintains Flask compatibility while adding async support

## Key Features

### Flask Compatibility

Quart has the same API as Flask

```python
from quart import Quart

app = Quart(__name__)

@app.route('/')
async def hello():
    return 'Hello World!'

app.run()
```

### Async Support

Full async/await support

```python
@app.route('/data')
async def get_data():
    data = await fetch_data()
    return jsonify(data)
```

### WebSocket Support

```python
@app.websocket('/ws')
async def ws():
    while True:
        data = await websocket.receive()
        await websocket.send(f"Echo: {data}")
```

## Installation

```bash
pip install quart
```

## Common Use Cases

- Async Flask applications
- WebSocket applications
- High-performance APIs
- Real-time applications

## Advantages

- Flask-compatible API
- Async support
- WebSocket support
- Easy migration from Flask

## Disadvantages

- Smaller community
- Less mature than Flask
- Requires async knowledge

## Official Documentation

[Quart Documentation](https://quart.palletsprojects.com/)

## Version Information

- Latest stable: Quart 0.19+
- Python requirement: Python 3.8+
- License: MIT


