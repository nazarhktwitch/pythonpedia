---
layout: layouts/base.njk
title: Web2py Framework
description: Web2py full-stack Python web framework
---

# Web2py

Web2py is a free, open-source web framework for agile development of secure database-driven web applications

<img src="/assets/images/web2py-logo.png" width="800">

## Overview

Web2py is a full-stack framework that includes a web-based IDE and requires no installation

## Key Features

### No Installation Required

Web2py can run from a USB drive without installation

### Web-based IDE

Built-in web-based development environment

### Database Abstraction

Works with multiple databases

```python
db = DAL('sqlite://storage.db')
db.define_table('person',
    Field('name'),
    Field('email'))
```

### Built-in Security

Automatic protection against common vulnerabilities

## Installation

Download and extract web2py, no pip install needed

## Common Use Cases

- Rapid prototyping
- Educational purposes
- Small to medium applications
- Database-driven applications

## Advantages

- No installation required
- Web-based IDE
- Built-in security
- Easy to learn

## Disadvantages

- Less flexible than Flask
- Smaller community
- Less modern than newer frameworks

## Official Documentation

[Web2py Documentation](http://www.web2py.com/)

## Version Information

- Latest stable: Web2py 2.24+
- Python requirement: Python 2.7+ or 3.5+
- License: LGPL


