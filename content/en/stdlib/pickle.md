---
layout: layouts/base.njk
title: "pickle Module — Object Serialization"
description: "Python pickle module: saving and loading Python objects, serialization"
---

# pickle — Python object serialization

The `pickle` module implements binary protocols for serializing and de-serializing a Python object structure. "Pickling" is the process whereby a Python object hierarchy is converted into a byte stream, and "unpickling" is the inverse operation.

**⚠️ SECURITY WARNING:** The `pickle` module is NOT secure. Only unpickle data you trust. It is possible to construct malicious pickle data which will execute arbitrary code during unpickling. Never unpickle data received over an untrusted network.

```python
import pickle
```

## Basic Pickling to a File

```python
import pickle

# A complex Python object
my_data = {
    'name': 'Alice',
    'scores': [85, 92, 78],
    'active': True
}

# 1. Saving (Pickling)
# 'wb' means write in binary mode
with open('data.pkl', 'wb') as file:
    pickle.dump(my_data, file)

print("Data saved correctly!")
```

## Loading from a Pickle File

```python
import pickle

# 2. Loading (Unpickling)
# 'rb' means read in binary mode
with open('data.pkl', 'rb') as file:
    loaded_data = pickle.load(file)

print(loaded_data)
# {'name': 'Alice', 'scores': [85, 92, 78], 'active': True}
```

## Pickling to Bytes (Memory)

If you need to send the data over a network (like a trusted internal socket) or store it in a database column:

```python
import pickle

data = ["A", "B", "C"]

# Serialize to a bytes object Instead of a file
pickled_bytes = pickle.dumps(data)
print(pickled_bytes) # b'\x80\x04\x95\x11\x00...'

# Deserialize back into a Python object
original = pickle.loads(pickled_bytes)
print(original)
```

## What Can Be Pickled?

*   `None`, `True`, and `False`
*   Integers, floating-point numbers, complex numbers
*   Strings, bytes, bytearrays
*   Tuples, lists, sets, and dictionaries containing only picklable objects
*   Functions defined at the top level of a module (using `def`, not `lambda`)
*   Classes that are defined at the top level of a module

You **cannot** pickle network connections, database connections, open file handles, or generators.

---

## API Reference

### Serialization Functions
| Function | Description |
|----------|-------------|
| `pickle.dump(obj, file, protocol=None)`| Write the pickled representation of `obj` to the open file object `file`. |
| `pickle.dumps(obj, protocol=None)`| Return the pickled representation of the object as a `bytes` object, instead of writing it to a file. |
| `pickle.load(file)`| Read the pickled representation of an object from the open file object `file` and return the reconstituted object. |
| `pickle.loads(data)`| Return the reconstituted object hierarchy of the pickled representation `data` of an object. |

### Pickler / Unpickler Classes
For advanced usage and subclassing, the module provides classes.
| Class | Description |
|-------|-------------|
| `pickle.Pickler(file, protocol=None)`| This takes a binary file for writing a pickle data stream. |
| `pickle.Unpickler(file)` | This takes a binary file for reading a pickle data stream. |
