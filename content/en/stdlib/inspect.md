---
layout: layouts/base.njk
title: "inspect Module — Inspect Live Objects"
description: "Python inspect module: get info about live objects, source code, and signatures."
---

# inspect — Inspect live objects

The `inspect` module provides several useful functions to help get information about live objects such as modules, classes, methods, functions, tracebacks, frame objects, and code objects. For example, it can help you examine the contents of a class, retrieve the source code of a method, extract and format the argument list for a function, or get all the information you need to display a detailed traceback.

```python
import inspect
```

## Types and Members

You can easily check what type an object is at runtime.

```python
import inspect

def my_func():
    pass

class MyClass:
    pass

print(inspect.isfunction(my_func)) # True
print(inspect.isclass(MyClass))    # True
print(inspect.ismodule(inspect))   # True
```

## Retrieving Source Code

One of the most powerful features of `inspect` is the ability to read the actual source code of a live function directly from the file!

```python
import inspect

def secret_calculator(a, b):
    # This is a highly classified algorithm!
    return (a * b) + 42

# 1. Get the actual lines of code as a string
code = inspect.getsource(secret_calculator)
print(code)

# 2. Get the file it was defined in
print(inspect.getfile(secret_calculator))
```

## Function Signatures

You can dynamically inspect what arguments a function expects. This is heavily used by dependency injection frameworks (like FastAPI).

```python
import inspect

def greet(name: str, age: int = 18, *args, **kwargs):
    pass

sig = inspect.signature(greet)

for param_name, param in sig.parameters.items():
    print(f"Name: {param_name}, Type: {param.annotation}, Default: {param.default}")

# Output:
# Name: name, Type: <class 'str'>, Default: <class 'inspect._empty'>
# Name: age, Type: <class 'int'>, Default: 18
# Name: args, Type: <class 'inspect._empty'>, Default: <class 'inspect._empty'>
# Name: kwargs, Type: <class 'inspect._empty'>, Default: <class 'inspect._empty'>
```

---

## API Reference

### Checking Types
| Function | Description |
|----------|-------------|
| `inspect.ismodule(obj)` | Return `True` if the object is a module. |
| `inspect.isclass(obj)` | Return `True` if the object is a class. |
| `inspect.isfunction(obj)`| Return `True` if the object is a Python function. |
| `inspect.iscoroutinefunction(obj)`| Return `True` if the object is an async coroutine function. |

### Retrieving Source
| Function | Description |
|----------|-------------|
| `inspect.getdoc(obj)` | Get the documentation string for an object. |
| `inspect.getfile(obj)`| Return the name of the file in which an object was defined. |
| `inspect.getsource(obj)`| Return the text of the source code for an object. |

### Inspecting Signatures
| Function/Class | Description |
|----------------|-------------|
| `inspect.signature(callable)`| Return a `Signature` object for the given callable. |
| `Signature.parameters` | An ordered mapping of parameters' names to Parameter objects. |
| `Parameter.default` | The default value for the parameter, or `Parameter.empty`. |
| `Parameter.annotation`| The annotation for the parameter, or `Parameter.empty`. |
