---
layout: layouts/base.njk
title: "functools Module — Higher-Order Functions"
description: "Python functools: decorators, caching, partial, reduce"
---

# functools — Higher-Order Functions and Callable Operations

```python
from functools import lru_cache, partial, reduce, wraps, cache
```

## lru_cache — Memoization

```python
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(100))  # Instant! Without cache would be impossibly slow

# Check cache stats
print(fibonacci.cache_info())
# CacheInfo(hits=98, misses=101, maxsize=128, currsize=101)

# Clear cache
fibonacci.cache_clear()
```

## cache — Unlimited Cache (Python 3.9+)

```python
from functools import cache

@cache
def factorial(n):
    return n * factorial(n-1) if n else 1

factorial(10)  # 3628800
```

## partial — Pre-fill Function Arguments

```python
from functools import partial

def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)

print(square(5))  # 25
print(cube(3))    # 27

# Useful with map/filter
int_from_binary = partial(int, base=2)
print(int_from_binary('1010'))  # 10
```

## reduce — Aggregate Values

```python
from functools import reduce

# Sum
reduce(lambda x, y: x + y, [1, 2, 3, 4, 5])  # 15

# Product
reduce(lambda x, y: x * y, [1, 2, 3, 4, 5])  # 120

# Maximum
reduce(lambda x, y: x if x > y else y, [3, 1, 4, 1, 5])  # 5

# With initial value
reduce(lambda x, y: x + y, [], 0)  # 0 (empty list with default)
```

## wraps — Preserve Function Metadata

```python
from functools import wraps
import time

def timer(func):
    @wraps(func)  # Preserves __name__, __doc__, etc.
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time()-start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    """This is a slow function."""
    time.sleep(1)

print(slow_function.__name__)  # 'slow_function' (not 'wrapper')
print(slow_function.__doc__)   # 'This is a slow function.'
```

## total_ordering — Complete Comparison Methods

```python
from functools import total_ordering

@total_ordering
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade
    
    def __eq__(self, other):
        return self.grade == other.grade
    
    def __lt__(self, other):
        return self.grade < other.grade
    
    # Now <=, >, >= are automatically generated!

s1 = Student('Alice', 90)
s2 = Student('Bob', 85)
print(s1 > s2)   # True
print(s1 >= s2)   # True
```

## Common Pitfalls

- **`lru_cache` arguments must be hashable** — no lists or dicts as args
- **`reduce` is hard to read** — often a `for` loop is clearer
- **`wraps` is essential** — without it, decorated function loses its identity

## Official Documentation

[functools — Higher-order functions](https://docs.python.org/3/library/functools.html)


## API Reference

### Caching
| Decorator | Description |
|-----------|-------------|
| `@functools.cache` | Simple lightweight unbounded function cache. |
| `@functools.lru_cache(maxsize=128)`| Decorator to wrap a function with a memoizing callable that saves up to the `maxsize` most recent calls. |

### Callable Modification
| Function/Decorator | Description |
|--------------------|-------------|
| `functools.partial(func, /, *args, **kwds)`| Return a new partial object which when called will behave like `func` called with the positional args and keyword args. |
| `@functools.wraps(wrapped)`| Convenience decorator for invoking `update_wrapper()`, copying `__name__` and `__doc__` mapping. |

### Reduction
| Function | Description |
|----------|-------------|
| `functools.reduce(function, iterable[, initializer])`| Apply a function of two arguments cumulatively to the items of a sequence, from left to right, to reduce the sequence to a single value. |
