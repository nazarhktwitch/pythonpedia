---
layout: layouts/base.njk
title: "dataclasses Module — Data Classes"
description: "Python dataclasses: automatic __init__, __repr__, __eq__, field defaults"
---

# dataclasses — Data Classes

Data classes automatically generate `__init__()`, `__repr__()`, `__eq__()` and other special methods.

```python
from dataclasses import dataclass, field
```

## Basic Usage

```python
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

p = Point(3.0, 4.0)
print(p)        # Point(x=3.0, y=4.0)   — auto __repr__
print(p.x)      # 3.0
print(p == Point(3.0, 4.0))  # True     — auto __eq__
```

## Default Values

```python
from dataclasses import dataclass, field

@dataclass
class User:
    name: str
    email: str
    age: int = 0                              # Simple default
    tags: list = field(default_factory=list)   # Mutable default

u = User("Alice", "alice@example.com")
print(u)  # User(name='Alice', email='alice@example.com', age=0, tags=[])
```

## Frozen (Immutable)

```python
@dataclass(frozen=True)
class Coordinate:
    lat: float
    lon: float

c = Coordinate(48.8566, 2.3522)
c.lat = 0  # FrozenInstanceError! Can't modify
```

## Post-Init

```python
@dataclass
class Rectangle:
    width: float
    height: float
    area: float = field(init=False)  # Not in __init__

    def __post_init__(self):
        self.area = self.width * self.height

r = Rectangle(5, 3)
print(r.area)  # 15.0
```

## Ordering

```python
@dataclass(order=True)
class Student:
    sort_index: float = field(init=False, repr=False)
    name: str
    grade: float

    def __post_init__(self):
        self.sort_index = self.grade

students = [Student("Alice", 95), Student("Bob", 87)]
sorted(students)  # Sorted by grade
```

## Inheritance

```python
@dataclass
class Animal:
    name: str
    sound: str

@dataclass
class Dog(Animal):
    breed: str

d = Dog("Rex", "Woof", "Labrador")
```

## Common Pitfalls

- **Mutable defaults** — use `field(default_factory=list)` NOT `tags: list = []`
- **Fields with defaults must come after fields without** — like function args
- **`frozen=True` uses `__hash__`** — allows use as dict keys / set members

## Official Documentation

[dataclasses — Data Classes](https://docs.python.org/3/library/dataclasses.html)


## API Reference

### Decorators & Functions
| Decorator/Function | Description |
|--------------------|-------------|
| `@dataclasses.dataclass(*, init=True, repr=True, eq=True, order=False, unsafe_hash=False, frozen=False)`| Decorator that adds generated special methods to classes. |
| `dataclasses.field(*, default=MISSING, default_factory=MISSING, init=True, repr=True, hash=None, compare=True)`| Helper function to customize individual fields. |
| `dataclasses.asdict(obj)`| Converts a dataclass instance to a dict. |
| `dataclasses.astuple(obj)`| Converts a dataclass instance to a tuple. |
