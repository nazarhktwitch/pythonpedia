---
layout: layouts/base.njk
title: "Best Practices"
description: "Essential Python best practices and modern developer workflows."
---

# Python Best Practices

Writing Python code that works is easy. Writing Python code that is maintainable, fast, and robust requires following community best practices. 

## 1. Virtual Environments
**Never install packages globally.**
Always use a virtual environment to isolate your project's dependencies from other projects and the system Python.
```bash
# Create a virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

# Activate it (Linux/Mac)
source venv/bin/activate
```
*Modern alternatives:* Consider using `Poetry` or `uv` for advanced dependency management.

## 2. Type Hinting
Python is dynamically typed, but adding Type Hints (PEP 484) dramatically improves IDE autocomplete, catches bugs before running the code, and acts as living documentation.
```python
def process_user(user_id: int, roles: list[str]) -> bool:
    if not roles:
        return False
    # ...
    return True
```
Use `mypy` in your CI/CD pipeline to strictly enforce type checking.

## 3. List Comprehensions
Avoid slow and verbose `for` loops when constructing lists.
```python
# Bad
squares = []
for i in range(10):
    if i % 2 == 0:
        squares.append(i * i)

# Good
squares = [i * i for i in range(10) if i % 2 == 0]
```

## 4. Context Managers (`with`)
Always use the `with` statement when dealing with resources that need to be closed (files, sockets, database connections, locks). This ensures they are closed even if an exception occurs.
```python
# Bad: File remains open if an error occurs!
f = open('data.txt', 'w')
f.write('Hello')
f.close()

# Good
with open('data.txt', 'w') as f:
    f.write('Hello')
```

## 5. Use `pathlib` over `os.path`
`pathlib` provides an object-oriented, cross-platform way to interact with the file system.
```python
from pathlib import Path

# Good
data_folder = Path("source_data/text_files")
file_to_open = data_folder / "raw_data.txt"

if file_to_open.exists():
    text = file_to_open.read_text()
```

## 6. EAFP Principle
EAFP stands for *Easier to Ask for Forgiveness than Permission*. In Python, it is considered better practice to just try an operation and catch the exception, rather than preemptively checking if the operation is possible (LBYL - *Look Before You Leap*).
```python
# Bad (LBYL)
if "key" in my_dict:
    value = my_dict["key"]

# Good (EAFP)
try:
    value = my_dict["key"]
except KeyError:
    value = default_value
```

## 7. Testing
Always write unit tests for your logic. 
- Use the built-in `unittest` module for simple stuff.
- Use the external **`pytest`** library for professional projects—it has much simpler syntax and powerful fixtures.
