---
layout: layouts/base.njk
title: "Модуль asyncio — Асинхронный I/O"
description: "Документация asyncio: async/await, задачи, цикл событий, корутины"
language: ru
---

# asyncio — Асинхронный ввод/вывод

```python
import asyncio
```

## Основы async/await

```python
import asyncio

async def say_hello():
    print("Привет")
    await asyncio.sleep(1)
    print("Мир")

asyncio.run(say_hello())
```

## Параллельный запуск

```python
import asyncio

async def fetch_data(name, delay):
    await asyncio.sleep(delay)
    return f"данные {name}"

async def main():
    results = await asyncio.gather(
        fetch_data("users", 2),
        fetch_data("posts", 1),
        fetch_data("comments", 3)
    )
    # Все три завершатся за ~3 секунды, не 6

asyncio.run(main())
```

## Задачи и таймауты

```python
import asyncio

async def main():
    task = asyncio.create_task(some_coroutine())
    
    try:
        result = await asyncio.wait_for(task, timeout=3.0)
    except asyncio.TimeoutError:
        print("Таймаут!")
```

## Синхронизация

```python
import asyncio

lock = asyncio.Lock()
semaphore = asyncio.Semaphore(3)

async def safe_operation():
    async with lock:
        await asyncio.sleep(1)
```

## Частые ошибки

- **`time.sleep()` блокирует всё** — используйте `await asyncio.sleep()`
- **CPU-задачи блокируют event loop** — используйте `asyncio.to_thread()`
- **Забыли `await`** — получите объект корутины вместо результата

## Официальная документация

[asyncio — Asynchronous I/O](https://docs.python.org/3/library/asyncio.html)

## Полный справочник API (API Reference)

### Важные функции

| Функция | Описание |
|----------|-------------|
| `asyncio.run(coro)` | Точка входа. Запускает главный цикл событий (event loop) и выполняет корутину `coro`. |
| `asyncio.create_task(coro)`| Планирует корутину `coro` на выполнение в фоне, возвращает объект `Task`. |
| `asyncio.sleep(delay)` | Асинхронная пауза на `delay` секунд (отдает управление обратно в event loop). |
| `asyncio.gather(*aws)` | Конкурентно запускает несколько корутин и возвращает список результатов. |
| `asyncio.wait_for(aw, timeout)`| Ждет выполнения корутины, бросает ошибку при превышении `timeout`. |
