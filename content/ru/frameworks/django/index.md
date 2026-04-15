---
layout: layouts/base.njk
title: Django
description: Документация веб-фреймворка Django, возможности и примеры
language: ru
---

# Django

Django — высокоуровневый веб-фреймворк Python, который поощряет быструю разработку и чистый, прагматичный дизайн.

## Обзор

Django — полнофункциональный веб-фреймворк с философией «batteries-included». Предоставляет всё необходимое для веб-разработки из коробки.

## Основные возможности

### ORM (Object-Relational Mapping)

ORM позволяет работать с базой данных через Python-объекты:

```python
from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

# Примеры запросов
articles = Article.objects.all()              # SELECT * FROM article
recent = Article.objects.filter(             # WHERE + ORDER BY
    published_date__year=2024
).order_by('-published_date')
article = Article.objects.get(pk=1)          # SELECT ... WHERE id=1
```

### Админ-интерфейс

Автоматическая генерация админки:

```python
from django.contrib import admin
from .models import Article

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'published_date']
    search_fields = ['title', 'content']
    list_filter = ['published_date']
```

### Маршрутизация URL

Чистые URL-шаблоны с конвертерами путей:

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

### Шаблонизатор

Мощная система шаблонов с наследованием:

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

### Система аутентификации

Встроенная аутентификация и права доступа:

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

### Формы

Декларативная работа с формами и валидацией:

```python
from django import forms

class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ['title', 'content']
    
    def clean_title(self):
        title = self.cleaned_data['title']
        if len(title) < 5:
            raise forms.ValidationError("Заголовок слишком короткий")
        return title
```

## Установка

```bash
pip install django
django-admin startproject myproject
cd myproject
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Структура проекта

```text
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

## Типичные случаи использования

- CMS-системы
- Социальные сети
- Интернет-магазины
- REST API бэкенды
- Научные платформы
- Новостные порталы

## Преимущества

- Быстрая разработка — принцип «Don't Repeat Yourself»
- Встроенная защита (CSRF, XSS, SQL-инъекции)
- Масштабируемость (Instagram, Pinterest на Django)
- Огромная экосистема пакетов
- Отличная документация

## Недостатки

- Избыточен для простых проектов
- Крутая кривая обучения
- Монолитная архитектура
- ORM может уступать чистому SQL на сложных запросах

## Официальная документация

[Документация Django](https://docs.djangoproject.com/)

## Информация о версии

- Последняя стабильная: Django 5.0+
- Требование Python: Python 3.10+
- Лицензия: BSD-3-Clause
