---
layout: layouts/base.njk
title: Flask Framework
description: Flask microframework documentation, features, and examples
---

# Flask

Flask is a lightweight WSGI web application framework designed to make getting started quick and easy

<img src="/assets/images/flask-logo.png" width="400">

## Overview

Flask is a microframework that provides the essentials for web development without imposing dependencies or project layout

## Key Features

### Minimal Core

Flask keeps the core simple and extensible

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run()
```

### Jinja2 Templating

Powerful template engine

```python
from flask import render_template

@app.route('/user/<name>')
def user(name):
    return render_template('user.html', name=name)
```

### URL Building

Generate URLs for routes

```python
from flask import url_for

url = url_for('user', name='John')
```

### Request Handling

Access request data easily

```python
from flask import request

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    return f'Logged in as {username}'
```

### Extensions

Flask extensions add functionality

- Flask-SQLAlchemy: Database ORM
- Flask-WTF: Form handling
- Flask-Login: User authentication
- Flask-RESTful: REST API support

## Installation

```bash
pip install flask
```

## Common Use Cases

- REST APIs
- Microservices
- Small to medium web applications
- Prototyping
- Learning web development

## Advantages

- Simple and lightweight
- Flexible and extensible
- Easy to learn
- Large ecosystem of extensions
- Minimal boilerplate

## Disadvantages

- Requires more decisions
- Less built-in functionality
- Need to choose extensions

## Official Documentation

[Flask Documentation](https://flask.palletsprojects.com/)

## Version Information

- Latest stable: Flask 3.0+
- Python requirement: Python 3.8+
- License: BSD
