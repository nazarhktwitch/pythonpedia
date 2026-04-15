---
layout: layouts/base.njk
title: Sanic
description: Асинхронный веб-фреймворк Sanic для Python
language: ru
---

# Sanic

Sanic — веб-фреймворк Python, построенный на uvloop, разработанный для быстрых HTTP ответов через синтаксис async/await

![Sanic Logo](/assets/images/sanic-logo.png)

## Обзор

Sanic — асинхронный веб-фреймворк, разработанный для скорости и производительности

## Основные возможности

### Async/Await

```python
from sanic import Sanic
from sanic.response import json

app = Sanic("MyApp")

@app.route("/")
async def test(request):
    return json({"hello": "world"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
```

### Высокая производительность

Построен на uvloop для максимальной производительности

### Поддержка WebSocket

```python
@app.websocket('/feed')
async def feed(request, ws):
    while True:
        data = 'hello!'
        await ws.send(data)
```

## Установка

```bash
pip install sanic
```

## Типичные случаи использования

- Высокопроизводительные API
- Приложения реального времени
- Микросервисы
- Приложения WebSocket

## Преимущества

- Очень быстрый
- Поддержка async/await
- Поддержка WebSocket
- Современные возможности Python

## Недостатки

- Меньшее сообщество
- Меньше документации
- Требует знания async

## Официальная документация

[Документация Sanic](https://sanic.dev/)

## Информация о версии

- Последняя стабильная: Sanic 23.3+
- Требование Python: Python 3.8+
- Лицензия: MIT
