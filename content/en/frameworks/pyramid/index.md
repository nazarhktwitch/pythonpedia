---
layout: layouts/base.njk
title: Pyramid Framework
description: Pyramid flexible web framework documentation
---

# Pyramid

Pyramid is a flexible, open source Python web framework that makes it easy to build web applications

![Pyramid Logo](/assets/images/pyramid-logo.png)

## Overview

Pyramid is a general-purpose web framework that can be used for both small and large applications

## Key Features

### Flexible Architecture

Pyramid provides flexibility in how you structure your application

```python
from pyramid.config import Configurator
from pyramid.response import Response

def hello_world(request):
    return Response('Hello World!')

config = Configurator()
config.add_route('hello', '/')
config.add_view(hello_world, route_name='hello')
app = config.make_wsgi_app()
```

### URL Traversal

Powerful URL traversal system

```python
config.add_route('article', '/articles/{id}')
```

### Authentication

Flexible authentication system

```python
from pyramid.security import authenticated_userid

def my_view(request):
    userid = authenticated_userid(request)
    return {'userid': userid}
```

### Database Support

Works with various databases through SQLAlchemy or other ORMs

## Installation

```bash
pip install pyramid
```

## Common Use Cases

- Large enterprise applications
- Content management systems
- Complex web applications
- Applications requiring fine-grained control

## Advantages

- Very flexible
- Scalable
- Good for large applications
- Fine-grained control

## Disadvantages

- Steeper learning curve
- More configuration needed
- Smaller community than Django/Flask

## Official Documentation

[Pyramid Documentation](https://docs.pylonsproject.org/projects/pyramid/)

## Version Information

- Latest stable: Pyramid 2.0+
- Python requirement: Python 3.7+
- License: BSD


