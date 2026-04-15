---
layout: layouts/base.njk
title: "typing Module — Type Hints"
description: "Python typing: type annotations, generics, Union, Optional, TypeVar"
---

# typing — Type Hints Support

The `typing` module provides support for type hints — annotations that help IDEs, linters, and other tools understand your code.

```python
from typing import List, Dict, Tuple, Optional, Union, Any, Callable
```

## Basic Type Hints

```python
# Variables
name: str = "Alice"
age: int = 30
height: float = 1.75
active: bool = True

# Functions
def greet(name: str) -> str:
    return f"Hello, {name}!"

def add(a: int, b: int) -> int:
    return a + b
```

## Collection Types

```python
from typing import List, Dict, Set, Tuple

# Python 3.9+: use built-in types directly
names: list[str] = ["Alice", "Bob"]
scores: dict[str, int] = {"Alice": 95, "Bob": 87}
coords: tuple[float, float] = (3.14, 2.71)
unique: set[int] = {1, 2, 3}

# Before 3.9: use typing module
from typing import List, Dict
names: List[str] = ["Alice", "Bob"]
scores: Dict[str, int] = {"Alice": 95}
```

## Optional and Union

```python
from typing import Optional, Union

# Optional — can be None
def find_user(user_id: int) -> Optional[str]:
    if user_id == 1:
        return "Alice"
    return None  # Can return None

# Union — multiple types
def process(value: Union[str, int]) -> str:
    return str(value)

# Python 3.10+: use | operator
def process(value: str | int) -> str:
    return str(value)

def find_user(user_id: int) -> str | None:
    ...
```

## Callable

```python
from typing import Callable

# Function type
def apply(func: Callable[[int, int], int], a: int, b: int) -> int:
    return func(a, b)

apply(lambda x, y: x + y, 3, 4)  # 7

# No specific signature
def run(callback: Callable) -> None:
    callback()
```

## TypeVar and Generics

```python
from typing import TypeVar, Generic

T = TypeVar('T')

def first(items: list[T]) -> T:
    return items[0]

# Generic class
class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: list[T] = []
    
    def push(self, item: T) -> None:
        self._items.append(item)
    
    def pop(self) -> T:
        return self._items.pop()

stack: Stack[int] = Stack()
stack.push(42)
```

## TypedDict (Python 3.8+)

```python
from typing import TypedDict

class UserDict(TypedDict):
    name: str
    age: int
    email: str

user: UserDict = {"name": "Alice", "age": 30, "email": "alice@example.com"}
```

## Literal (Python 3.8+)

```python
from typing import Literal

def set_mode(mode: Literal["read", "write", "append"]) -> None:
    print(f"Mode: {mode}")

set_mode("read")   # OK
set_mode("delete")  # Type error (caught by mypy/IDE)
```

## Important Notes

- Type hints are **not enforced at runtime** — they're for tools only
- Use `mypy` or IDE type checkers to validate
- Python 3.10+ has cleaner syntax with `X | Y` instead of `Union[X, Y]`
- Python 3.9+ allows `list[str]` instead of `List[str]`

## Official Documentation

[typing — Support for type hints](https://docs.python.org/3/library/typing.html)


## API Reference

### Core Primitive Types
| Type | Description |
|------|-------------|
| `typing.Any` | Special type indicating an unconstrained type. |
| `typing.Callable`| Callable type; `Callable[[int], str]` is a function of (int) -> str. |
| `typing.Union` | Union type; `Union[X, Y]` is equivalent to `X | Y` and means either X or Y. |
| `typing.Optional`| Optional type; `Optional[X]` is equivalent to `X | None`. |
| `typing.Tuple` | Tuple type; `Tuple[X, Y]` is the type of a tuple of two items with types X and Y. |
| `typing.Dict` | Dictionary type; `Dict[str, int]` represents a dictionary. |
| `typing.List` | List type; `List[int]` represents a list of integers. |

### Special Forms
| Form | Description |
|------|-------------|
| `typing.Literal` | A type that can be used to indicate to type checkers that the corresponding variable or function parameter has a value equivalent to the provided literal. |
| `typing.Final` | Special typing construct to indicate to type checkers that a name cannot be re-assigned or overridden in a subclass. |
