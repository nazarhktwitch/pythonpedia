---
layout: layouts/base.njk
title: FastAPI
description: Современный веб-фреймворк FastAPI для создания API
language: ru
---

# FastAPI

FastAPI — современный, быстрый (высокопроизводительный) веб-фреймворк для создания API с Python 3.8+ на основе стандартных type hints Python

![FastAPI Logo](/assets/images/fastapi-logo.png)

## Обзор

FastAPI разработан для создания API с автоматической интерактивной документацией, высокой производительностью и простыми в использовании возможностями

## Основные возможности

### Высокая производительность

FastAPI — один из самых быстрых фреймворков Python, сравнимый с NodeJS и Go

- Основан на Starlette и Pydantic
- Поддержка async/await
- Высокая пропускная способность

### Автоматическая документация API

Автоматически генерируемая интерактивная документация API

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}
```

Документация доступна на `/docs` (Swagger UI) и `/redoc`

### Type Hints

Полная поддержка type hints

```python
from fastapi import FastAPI
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool = False

@app.post("/items/")
async def create_item(item: Item):
    return item
```

### Поддержка Async/Await

Нативная поддержка async

```python
@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
```

### Валидация данных

Автоматическая валидация запросов с использованием Pydantic

```python
from pydantic import BaseModel, EmailStr

class User(BaseModel):
    email: EmailStr
    age: int
    name: str
```

## Установка

```bash
pip install fastapi uvicorn
```

## Запуск

```bash
uvicorn main:app --reload
```

## Типичные случаи использования

- REST API
- Микросервисы
- Приложения реального времени
- API машинного обучения
- Высокопроизводительные веб-сервисы

## Преимущества

- Очень высокая производительность
- Автоматическая документация API
- Безопасность типов с type hints
- Простота использования
- Современные возможности Python

## Недостатки

- Новый фреймворк (меньшее сообщество)
- Меньше сторонних пакетов
- Требует понимания async

## Официальная документация

[Документация FastAPI](https://fastapi.tiangolo.com/)

## Информация о версии

- Последняя стабильная: FastAPI 0.100+
- Требование Python: Python 3.8+
- Лицензия: MIT
