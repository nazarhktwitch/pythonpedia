---
layout: layouts/base.njk
title: "Модуль functools — Функции высшего порядка"
description: "Документация functools: кеширование, partial, reduce, декораторы"
language: ru
---

# functools — Функции высшего порядка

```python
from functools import lru_cache, partial, reduce, wraps
```

## lru_cache — Кеширование результатов

```python
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2: return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(100))  # Мгновенно!
print(fibonacci.cache_info())  # Статистика кеша
fibonacci.cache_clear()        # Очистить кеш
```

## partial — Частичное применение аргументов

```python
from functools import partial

def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)
print(square(5))  # 25
```

## reduce — Свёртка

```python
from functools import reduce

reduce(lambda x, y: x + y, [1, 2, 3, 4, 5])  # 15
reduce(lambda x, y: x * y, [1, 2, 3, 4, 5])  # 120
```

## wraps — Сохранение метаданных декоратора

```python
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__}: {time.time()-start:.4f}с")
        return result
    return wrapper
```

## Частые ошибки

- **Аргументы `lru_cache` должны быть хешируемыми**
- **`reduce` сложно читать** — часто цикл `for` понятнее
- **`wraps` обязателен** — без него декорированная функция теряет имя и docstring

## Официальная документация

[functools — Higher-order functions](https://docs.python.org/3/library/functools.html)

## Полный справочник API (API Reference)

### Кэширование

| Декоратор | Описание |
|-----------|----------|
| `@functools.cache` | Простой декоратор кэширования без ограничения размера памяти. |
| `@functools.lru_cache(maxsize=128)`| Мемоизирует результаты функции. Сохраняет до `maxsize` последних вызовов (LRU - Least Recently Used). |

### Декораторы и частичные функции

| Функция/Декоратор | Описание |
|-------------------|----------|
| `functools.partial(func, *args, **kwargs)`| Возвращает новую «частичную» функцию с уже подставленными аргументами. |
| `@functools.wraps(func)`| Декоратор для декораторов. Копирует оригинальное имя `__name__` и документацию `__doc__` в новую функцию. |

### Свертка (Reduce)

| Функция | Описание |
|---------|----------|
| `functools.reduce(func, iterable)`| Применяет функцию от двух аргументов кумулятивно к элементам списка, сворачивая его в одно значение (например, факториал). |
