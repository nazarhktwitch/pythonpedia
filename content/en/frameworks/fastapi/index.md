---
layout: layouts/base.njk
title: FastAPI Framework
description: FastAPI modern web framework for building APIs
---

# FastAPI

FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.8+ based on standard Python type hints

![FastAPI Logo](/assets/images/fastapi-logo.png)

## Overview

FastAPI is designed for building APIs with automatic interactive documentation, high performance, and easy-to-use features

## Key Features

### High Performance

FastAPI is one of the fastest Python frameworks, comparable to NodeJS and Go

- Based on Starlette and Pydantic
- Async/await support
- High throughput

### Automatic API Documentation

Interactive API documentation automatically generated

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}
```

Documentation available at `/docs` (Swagger UI) and `/redoc`

### Type Hints

Full type hint support

```python
from fastapi import FastAPI
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool = False

@app.post("/items/")
async def create_item(item: Item):
    return item
```

### Async/Await Support

Native async support

```python
@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
```

### Data Validation

Automatic request validation using Pydantic

```python
from pydantic import BaseModel, EmailStr

class User(BaseModel):
    email: EmailStr
    age: int
    name: str
```

## Installation

```bash
pip install fastapi uvicorn
```

## Running

```bash
uvicorn main:app --reload
```

## Common Use Cases

- REST APIs
- Microservices
- Real-time applications
- Machine learning APIs
- High-performance web services

## Advantages

- Very fast performance
- Automatic API documentation
- Type safety with type hints
- Easy to use
- Modern Python features

## Disadvantages

- Newer framework (smaller community)
- Less third-party packages
- Requires understanding of async

## Official Documentation

[FastAPI Documentation](https://fastapi.tiangolo.com/)

## Version Information

- Latest stable: FastAPI 0.100+
- Python requirement: Python 3.8+
- License: MIT


