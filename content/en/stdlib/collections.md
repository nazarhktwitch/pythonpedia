---
layout: layouts/base.njk
title: "collections Module — Specialized Containers"
description: "Python collections: Counter, defaultdict, OrderedDict, namedtuple, deque"
---

# collections — Specialized Container Datatypes

The `collections` module provides alternatives to Python's built-in containers (dict, list, set, tuple) with additional functionality.

```python
from collections import Counter, defaultdict, OrderedDict, namedtuple, deque
```

## Counter — Count Elements

```python
from collections import Counter

# Count occurrences
words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']
count = Counter(words)
print(count)  # Counter({'apple': 3, 'banana': 2, 'cherry': 1})

# Most common elements
print(count.most_common(2))  # [('apple', 3), ('banana', 2)]

# Count characters in string
Counter('mississippi')  # Counter({'s': 4, 'i': 4, 'p': 2, 'm': 1})

# Arithmetic
c1 = Counter(a=3, b=1)
c2 = Counter(a=1, b=2)
print(c1 + c2)  # Counter({'a': 4, 'b': 3})
print(c1 - c2)  # Counter({'a': 2})
```

## defaultdict — Dict with Default Values

```python
from collections import defaultdict

# Default value is a list
groups = defaultdict(list)
for name, dept in [('Alice', 'IT'), ('Bob', 'HR'), ('Carol', 'IT')]:
    groups[dept].append(name)
print(groups)  # {'IT': ['Alice', 'Carol'], 'HR': ['Bob']}

# Default value is int (0)
word_count = defaultdict(int)
for word in 'hello world hello'.split():
    word_count[word] += 1
print(word_count)  # {'hello': 2, 'world': 1}

# Default value is set
index = defaultdict(set)
```

## namedtuple — Named Fields

```python
from collections import namedtuple

# Create a named tuple class
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(p.x, p.y)    # 3 4
print(p[0], p[1])  # 3 4 (also accessible by index)

# With defaults (Python 3.6.1+)
Color = namedtuple('Color', ['r', 'g', 'b'], defaults=[0, 0, 0])
black = Color()          # Color(r=0, g=0, b=0)
red = Color(r=255)       # Color(r=255, g=0, b=0)

# Convert to dict
print(p._asdict())  # {'x': 3, 'y': 4}

# Create from iterable
p2 = Point._make([5, 6])
```

## deque — Double-Ended Queue

```python
from collections import deque

d = deque([1, 2, 3])

# Add elements
d.append(4)        # Right: deque([1, 2, 3, 4])
d.appendleft(0)    # Left: deque([0, 1, 2, 3, 4])

# Remove elements
d.pop()            # Right: returns 4
d.popleft()        # Left: returns 0

# Rotate
d = deque([1, 2, 3, 4, 5])
d.rotate(2)        # deque([4, 5, 1, 2, 3])
d.rotate(-2)       # deque([1, 2, 3, 4, 5])

# Fixed size (drops oldest)
d = deque(maxlen=3)
d.extend([1, 2, 3, 4, 5])
print(d)  # deque([3, 4, 5])
```

## OrderedDict

```python
from collections import OrderedDict

# Remembers insertion order (less useful since dict is ordered in 3.7+)
od = OrderedDict()
od['b'] = 2
od['a'] = 1
od['c'] = 3

# Move to end
od.move_to_end('b')         # Move 'b' to last
od.move_to_end('c', last=False)  # Move 'c' to first
```

## Common Pitfalls

- **`namedtuple` fields are immutable** — use `dataclasses` if you need mutability
- **`defaultdict` creates keys on access** — `d[key]` creates the entry even if you just check it  
- **`deque` is O(n) for random access** — only O(1) for ends

## Official Documentation

[collections — Container datatypes](https://docs.python.org/3/library/collections.html)


## API Reference

### Classes
| Class | Description |
|-------|-------------|
| `collections.namedtuple` | Factory function for creating tuple subclasses with named fields. |
| `collections.deque` | List-like container with fast appends and pops on either end. |
| `collections.ChainMap` | Dict-like class for creating a single view of multiple mappings. |
| `collections.Counter` | Dict subclass for counting hashable objects. |
| `collections.OrderedDict` | Dict subclass that remembers the order entries were added. |
| `collections.defaultdict` | Dict subclass that calls a factory function to supply missing values. |

### Counter Methods
| Method | Description |
|--------|-------------|
| `Counter.elements()` | Return an iterator over elements repeating each as many times as its count. |
| `Counter.most_common([n])`| Return a list of the n most common elements and their counts. |
| `Counter.subtract([iterable-or-mapping])`| Elements are subtracted from an iterable or from another mapping. |
