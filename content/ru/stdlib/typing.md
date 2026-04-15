---
layout: layouts/base.njk
title: "Модуль typing — Аннотации типов"
description: "Документация typing: аннотации типов, дженерики, Union, Optional"
language: ru
---

# typing — Поддержка аннотаций типов

```python
from typing import List, Dict, Optional, Union, Callable
```

## Базовые аннотации

```python
name: str = "Алиса"
age: int = 30

def greet(name: str) -> str:
    return f"Привет, {name}!"
```

## Коллекции

```python
# Python 3.9+
names: list[str] = ["Алиса", "Боб"]
scores: dict[str, int] = {"Алиса": 95}
coords: tuple[float, float] = (3.14, 2.71)
```

## Optional и Union

```python
from typing import Optional, Union

def find_user(user_id: int) -> Optional[str]:
    return "Алиса" if user_id == 1 else None

# Python 3.10+
def process(value: str | int) -> str:
    return str(value)
```

## Callable

```python
from typing import Callable

def apply(func: Callable[[int, int], int], a: int, b: int) -> int:
    return func(a, b)
```

## TypedDict

```python
from typing import TypedDict

class UserDict(TypedDict):
    name: str
    age: int
```

## Важно

- Аннотации **не проверяются при выполнении** — только для инструментов
- Используйте `mypy` для проверки типов
- Python 3.10+: `X | Y` вместо `Union[X, Y]`

## Официальная документация

[typing — Support for type hints](https://docs.python.org/3/library/typing.html)

## Полный справочник API (API Reference)

### Базовые типы

| Тип | Описание |
|------|----------|
| `typing.Any` | Любой тип (отключает проверку статического анализатора). |
| `typing.Callable`| Исполняемый объект (функция). `Callable[[int], str]` принимает int, возвращает str. |
| `typing.Union` | Объединение типов. `Union[int, str]` (эквивалент `int | str`). |
| `typing.Optional`| Опциональный тип, допускающий `None`. Эквивалент `Union[Тип, None]`. |
| `typing.Dict` | Словарь, например `Dict[str, int]`. *(Начиная с Python 3.9 используется просто `dict`)*. |
| `typing.List` | Список, например `List[int]`. *(Начиная с Python 3.9 используется просто `list`)*. |

### Специальные конструкции

| Конструкция | Описание |
|-------------|----------|
| `typing.Literal` | Позволяет указать точные конкретные значения, которые может принимать переменная, например `Literal['start', 'stop']`. |
| `typing.Final` | Указывает, что значение этой переменной (константы) нельзя перезаписывать. |
