---
layout: layouts/base.njk
title: Quart
description: Асинхронный фреймворк Quart, совместимый с Flask
language: ru
---

# Quart

Quart — асинхронный веб-фреймворк Python на основе Flask

![Quart Logo](/assets/images/quart-logo.png)

## Обзор

Quart — асинхронная версия Flask, которая сохраняет совместимость с Flask, добавляя поддержку async

## Основные возможности

### Совместимость с Flask

Quart имеет тот же API, что и Flask

```python
from quart import Quart

app = Quart(__name__)

@app.route('/')
async def hello():
    return 'Hello World!'

app.run()
```

### Поддержка Async

Полная поддержка async/await

```python
@app.route('/data')
async def get_data():
    data = await fetch_data()
    return jsonify(data)
```

### Поддержка WebSocket

```python
@app.websocket('/ws')
async def ws():
    while True:
        data = await websocket.receive()
        await websocket.send(f"Echo: {data}")
```

## Установка

```bash
pip install quart
```

## Типичные случаи использования

- Асинхронные приложения Flask
- Приложения WebSocket
- Высокопроизводительные API
- Приложения реального времени

## Преимущества

- API совместимый с Flask
- Поддержка async
- Поддержка WebSocket
- Легкая миграция с Flask

## Недостатки

- Меньшее сообщество
- Менее зрелый, чем Flask
- Требует знания async

## Официальная документация

[Документация Quart](https://quart.palletsprojects.com/)

## Информация о версии

- Последняя стабильная: Quart 0.19+
- Требование Python: Python 3.8+
- Лицензия: MIT
