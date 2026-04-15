---
layout: layouts/base.njk
title: CherryPy Framework
description: CherryPy minimalist Python web framework
---

# CherryPy

CherryPy is a minimalist Python web framework that allows developers to build web applications in much the same way they would build any other object-oriented Python program

<img src="/assets/images/cherrypy-logo.png" width="200">

## Overview

CherryPy is object-oriented and designed to be minimalistic but extensible

## Key Features

### Object-Oriented Design

```python
import cherrypy

class HelloWorld:
    @cherrypy.expose
    def index(self):
        return "Hello World!"

if __name__ == '__main__':
    cherrypy.quickstart(HelloWorld())
```

### Built-in Server

Includes production-ready HTTP server

### Plugin System

Extensible through plugins and tools

## Installation

```bash
pip install cherrypy
```

## Common Use Cases

- Embedded web applications
- Small to medium web apps
- REST APIs
- Web services

## Advantages

- Object-oriented
- Minimalist
- Built-in server
- Easy to use

## Disadvantages

- Smaller community
- Less features than Django
- Less documentation

## Official Documentation

[CherryPy Documentation](https://cherrypy.org/)

## Version Information

- Latest stable: CherryPy 18.8+
- Python requirement: Python 3.5+
- License: BSD


