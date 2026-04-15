---
layout: layouts/base.njk
title: Bottle
description: Простой микрофреймворк Bottle для Python
language: ru
---

# Bottle

Bottle — быстрый, простой и легковесный WSGI микро веб-фреймворк для Python

![Bottle Logo](/assets/images/bottle-logo.png)

## Обзор

Bottle распространяется как модуль из одного файла и не имеет зависимостей, кроме стандартной библиотеки Python

## Основные возможности

### Один файл

Bottle — один файл, который можно добавить в любой проект

```python
from bottle import route, run

@route('/hello')
def hello():
    return "Hello World!"

run(host='localhost', port=8080)
```

### Встроенный сервер

Включает сервер для разработки

```python
from bottle import run
run(host='localhost', port=8080, debug=True)
```

### Шаблонизатор

Простой шаблонизатор

```python
from bottle import route, template

@route('/hello/<name>')
def hello(name):
    return template('Hello {{name}}!', name=name)
```

## Установка

```bash
pip install bottle
```

Или просто скачайте `bottle.py` и включите его в свой проект

## Типичные случаи использования

- Простые веб-приложения
- Прототипирование
- Малые API
- Изучение веб-разработки
- Встроенные приложения

## Преимущества

- Один файл, без зависимостей
- Очень простой
- Легко изучать
- Легковесный

## Недостатки

- Ограниченные возможности
- Не подходит для крупных приложений
- Малое сообщество

## Официальная документация

[Документация Bottle](https://bottlepy.org/)

## Информация о версии

- Последняя стабильная: Bottle 0.12+
- Требование Python: Python 3.6+
- Лицензия: MIT
