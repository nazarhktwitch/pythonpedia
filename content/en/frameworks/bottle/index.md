---
layout: layouts/base.njk
title: Bottle Framework
description: Bottle simple Python microframework
---

# Bottle

Bottle is a fast, simple and lightweight WSGI micro web-framework for Python

<img src="/assets/images/bottle-logo.png" width="300">

## Overview

Bottle is distributed as a single file module and has no dependencies except the Python Standard Library

## Key Features

### Single File

Bottle is a single file that can be dropped into any project

```python
from bottle import route, run

@route('/hello')
def hello():
    return "Hello World!"

run(host='localhost', port=8080)
```

### Built-in Server

Includes a development server

```python
from bottle import run
run(host='localhost', port=8080, debug=True)
```

### Template Engine

Simple template engine

```python
from bottle import route, template

@route('/hello/<name>')
def hello(name):
    return template('Hello {{name}}!', name=name)
```

## Installation

```bash
pip install bottle
```

Or just download `bottle.py` and include it in your project

## Common Use Cases

- Simple web applications
- Prototyping
- Small APIs
- Learning web development
- Embedded applications

## Advantages

- Single file, no dependencies
- Very simple
- Easy to learn
- Lightweight

## Disadvantages

- Limited features
- Not suitable for large applications
- Small community

## Official Documentation

[Bottle Documentation](https://bottlepy.org/)

## Version Information

- Latest stable: Bottle 0.12+
- Python requirement: Python 3.6+
- License: MIT
