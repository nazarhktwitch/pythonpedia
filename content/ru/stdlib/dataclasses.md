---
layout: layouts/base.njk
title: "Модуль dataclasses — Датаклассы"
description: "Документация dataclasses: автоматические __init__, __repr__, __eq__"
language: ru
---

# dataclasses — Датаклассы

```python
from dataclasses import dataclass, field

@dataclass
class Point:
    x: float
    y: float

p = Point(3.0, 4.0)
print(p)  # Point(x=3.0, y=4.0)

@dataclass
class User:
    name: str
    email: str
    age: int = 0
    tags: list = field(default_factory=list)  # Мутабельное значение!

@dataclass(frozen=True)  # Неизменяемый
class Coordinate:
    lat: float
    lon: float
```

## Частые ошибки

- **Мутабельные умолчания** — используйте `field(default_factory=list)` а не `= []`
- **Порядок полей** — поля с умолчаниями после полей без

## Официальная документация

[dataclasses — Data Classes](https://docs.python.org/3/library/dataclasses.html)

## Полный справочник API (API Reference)

### Декораторы и Функции

| Функция | Описание |
|---------|----------|
| `@dataclass(*, init=True, repr=True, eq=True, order=False, frozen=False)`| Главный декоратор, генерирующий "магические" методы. Укажите `frozen=True` для неизменяемости. |
| `dataclasses.field(default=..., default_factory=...)`| Позволяет тонко настраивать конкретные поля (например, задать изменяемое значение по умолчанию через фабрику). |
| `dataclasses.asdict(obj)`| Превращает объект датакласса в обычный словарь `dict`. |
| `dataclasses.astuple(obj)`| Превращает объект датакласса в стандартный кортеж `tuple`. |
