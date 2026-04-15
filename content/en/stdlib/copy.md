---
layout: layouts/base.njk
title: "copy Module — Shallow and Deep Copy Operations"
description: "Python copy module: copy.copy() and copy.deepcopy() for collections."
---

# copy — Shallow and deep copy operations

Assignment statements in Python do not actually copy objects; they create bindings between a target and an object (meaning two variables point to the exact same list in memory). For collections that are mutable or contain mutable items, a true copy is sometimes needed so one can change one copy without altering the other. 

The `copy` module provides these operations.

```python
import copy
```

## The Problem

If you assign a list to a new variable, they share memory.

```python
original = [1, 2, [3, 4]]
fake_copy = original

fake_copy[0] = 99
print(original) # [99, 2, [3, 4]] -> The original changed!
```

## Shallow Copy (copy.copy)

A shallow copy constructs a new compound object and then inserts *references* into it to the objects found in the original.

```python
import copy

original = [1, 2, [3, 4]]
shallow = copy.copy(original) # Same as original.copy() or list(original)

# Changing top-level elements is safe
shallow[0] = 99
print(original) # [1, 2, [3, 4]] - Original is untouched!

# HOWEVER, changing nested elements affects both!
shallow[2][0] = 'Hacked'
print(shallow)   # [99, 2, ['Hacked', 4]]
print(original)  # [1, 2, ['Hacked', 4]]
```

## Deep Copy (copy.deepcopy)

A deep copy constructs a new compound object and then, recursively, inserts *copies* into it of the objects found in the original. This breaks all links between the objects.

```python
import copy

original = [1, 2, [3, 4]]
deep = copy.deepcopy(original)

deep[2][0] = 'Hacked'

print(deep)     # [1, 2, ['Hacked', 4]]
print(original) # [1, 2, [3, 4]] - Completely safe!
```

---

## API Reference

### Core Functions
| Function | Description |
|----------|-------------|
| `copy.copy(x)` | Return a shallow copy of x. |
| `copy.deepcopy(x, memo=None)`| Return a deep copy of x. The `memo` dict is used to avoid infinite recursion on self-referential structures. |

### Magic Methods
Classes can use magic methods to control how they are copied.
| Magic Method | Description |
|--------------|-------------|
| `__copy__(self)` | Called on a class to define its shallow copy behavior. |
| `__deepcopy__(self, memo)`| Called on a class to define its deep copy behavior. |
