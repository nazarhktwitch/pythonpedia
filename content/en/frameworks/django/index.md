---
layout: layouts/base.njk
title: Django Framework
description: Django web framework documentation, features, and examples
---

# Django

Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.

<img src="/assets/images/django-logo.png" width="600">

## Overview

Django is a full-featured web framework that follows the "batteries-included" philosophy. It provides many built-in features for common web development tasks.

## Key Features

### ORM (Object-Relational Mapping)

Django's ORM allows you to interact with databases using Python code instead of SQL:

```python
from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

# Query examples
articles = Article.objects.all()              # SELECT * FROM article
recent = Article.objects.filter(             # WHERE + ORDER BY
    published_date__year=2024
).order_by('-published_date')
article = Article.objects.get(pk=1)          # SELECT ... WHERE id=1
```

### Admin Interface

Django automatically generates an admin interface for managing your models:

```python
from django.contrib import admin
from .models import Article

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'published_date']
    search_fields = ['title', 'content']
    list_filter = ['published_date']
```

### URL Routing

Clean URL patterns with path converters:

```python
from django.urls import path, include
from . import views

urlpatterns = [
    path('articles/', views.article_list, name='article-list'),
    path('articles/<int:pk>/', views.article_detail, name='article-detail'),
    path('articles/<slug:slug>/', views.article_by_slug),
    path('api/', include('api.urls')),
]
```

### Template Engine

Powerful templating system with inheritance:

{% raw %}
```html
{# base.html #}
<html>
<body>
  {% block content %}{% endblock %}
</body>
</html>

{# article_detail.html #}
{% extends "base.html" %}
{% block content %}
  <h1>{{ article.title }}</h1>
  <p>{{ article.content }}</p>
  {% for tag in article.tags.all %}
    <span>{{ tag.name }}</span>
  {% endfor %}
{% endblock %}
```
{% endraw %}

### Authentication System

Built-in user authentication and permissions:

```python
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

def login_view(request):
    user = authenticate(
        username=request.POST['username'],
        password=request.POST['password']
    )
    if user is not None:
        login(request, user)
        return redirect('home')

@login_required
def dashboard(request):
    return render(request, 'dashboard.html', {'user': request.user})
```

### Forms

Declarative form handling with validation:

```python
from django import forms

class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ['title', 'content']
    
    def clean_title(self):
        title = self.cleaned_data['title']
        if len(title) < 5:
            raise forms.ValidationError("Title too short")
        return title
```

### Middleware

Request/response processing pipeline:

```python
class TimingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        import time
        start = time.time()
        response = self.get_response(request)
        duration = time.time() - start
        response['X-Request-Duration'] = str(duration)
        return response
```

## Installation

```bash
pip install django
django-admin startproject myproject
cd myproject
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Project Structure

```
myproject/
├── manage.py
├── myproject/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
└── myapp/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── views.py
    ├── urls.py
    ├── templates/
    └── tests.py
```

## Common Use Cases

- Content management systems (CMS)
- Social networks and community platforms
- E-commerce platforms
- REST API backends
- Scientific computing dashboards
- News and publishing sites

## Advantages

- Rapid development — "Don't repeat yourself" philosophy
- Built-in security features (CSRF, XSS, SQL injection protection)
- Scalable architecture (Instagram, Pinterest use Django)
- Huge ecosystem of third-party packages
- Excellent official documentation

## Disadvantages

- Can be overkill for simple projects
- Steeper learning curve than microframeworks
- Monolithic — harder to swap components
- ORM performance can lag behind raw SQL for complex queries

## Official Documentation

[Django Documentation](https://docs.djangoproject.com/)

## Version Information

- Latest stable: Django 5.0+
- Python requirement: Python 3.10+
- License: BSD-3-Clause
