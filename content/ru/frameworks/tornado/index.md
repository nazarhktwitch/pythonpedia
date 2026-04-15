---
layout: layouts/base.njk
title: Tornado
description: Асинхронный веб-фреймворк Tornado
language: ru
---

# Tornado

Tornado — веб-фреймворк Python и библиотека асинхронного сетевого взаимодействия

![Tornado Logo](/assets/images/tornado-logo.png)

## Обзор

Tornado разработан для создания масштабируемых, неблокирующих веб-приложений

## Основные возможности

### Асинхронный I/O

Неблокирующий I/O для высокой производительности

```python
import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
    async def get(self):
        self.write("Hello, world")

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
```

### Поддержка WebSocket

Встроенная поддержка WebSocket

```python
class EchoWebSocket(tornado.websocket.WebSocketHandler):
    def open(self):
        print("WebSocket opened")

    def on_message(self, message):
        self.write_message(u"You said: " + message)

    def on_close(self):
        print("WebSocket closed")
```

### Возможности реального времени

Идеален для веб-сервисов реального времени и long polling

## Установка

```bash
pip install tornado
```

## Типичные случаи использования

- Веб-сервисы реального времени
- Приложения WebSocket
- Long polling
- Высокопроизводительные API
- Чат-приложения

## Преимущества

- Высокая производительность
- Неблокирующий I/O
- Поддержка WebSocket
- Хорош для приложений реального времени

## Недостатки

- Другая парадигма (async)
- Меньшее сообщество
- Сложнее, чем Flask

## Официальная документация

[Документация Tornado](https://www.tornadoweb.org/)

## Информация о версии

- Последняя стабильная: Tornado 6.4+
- Требование Python: Python 3.7+
- Лицензия: Apache 2.0
