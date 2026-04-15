---
layout: layouts/base.njk
title: "enum Module — Enumerations"
description: "Python enum: creating enumerations, categories, and constants"
---

# enum — Support for enumerations

An enumeration is a set of symbolic names (members) bound to unique, constant values.

```python
from enum import Enum, auto
```

## Basic Enum

```python
from enum import Enum

class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3

print(Color.RED)          # Color.RED
print(Color.RED.name)     # 'RED'
print(Color.RED.value)    # 1

# Access by value or name
print(Color(1))           # Color.RED
print(Color['GREEN'])     # Color.GREEN
```

## Auto values

```python
from enum import Enum, auto

class Day(Enum):
    MONDAY = auto()    # 1
    TUESDAY = auto()   # 2
    WEDNESDAY = auto() # 3
```

## Iteration and Comparison

```python
for c in Color:
    print(c)

# Comparison uses 'is' for enums
if my_color is Color.RED:
    print("It's red!")
```

## Official Documentation
[enum — Support for enumerations](https://docs.python.org/3/library/enum.html)


## API Reference

### Base Classes
| Class | Description |
|-------|-------------|
| `enum.Enum` | Base class for creating enumerated constants. |
| `enum.IntEnum`| Base class for creating enumerated constants that are also subclasses of `int`. |
| `enum.Flag` | Base class for creating enumerated constants that can be combined using the bitwise operators. |

### Utilities
| Function/Class | Description |
|----------------|-------------|
| `enum.auto()` | Instances are replaced with an appropriate value for Enum members. |
| `enum.unique` | Enum class decorator that ensures only one name is bound to any one value. |
