---
layout: layouts/base.njk
title: "sys Module — System Parameters"
description: "Python sys module: command-line args, paths, stdin/stdout, interpreter info"
---

# sys — System-specific Parameters and Functions

The `sys` module provides access to interpreter variables and functions.

```python
import sys
```

## Command-Line Arguments

```python
import sys

# python script.py arg1 arg2
print(sys.argv)     # ['script.py', 'arg1', 'arg2']
print(sys.argv[0])  # 'script.py' — script name
print(sys.argv[1:]) # ['arg1', 'arg2'] — arguments
```

## Module Search Paths

```python
import sys

# List of paths where Python looks for modules
for p in sys.path:
    print(p)

# Add custom path
sys.path.append('/my/custom/modules')

# Loaded modules
print(list(sys.modules.keys())[:10])
```

## Standard I/O Streams

```python
import sys

# Standard output
sys.stdout.write("Hello\n")  # Like print()

# Standard error
sys.stderr.write("Error message\n")

# Redirect output to file
original_stdout = sys.stdout
sys.stdout = open('output.txt', 'w')
print("This goes to file")
sys.stdout = original_stdout  # Restore
```

## System Information

```python
import sys

sys.version         # '3.12.0 (main, Oct 2 2023, ...)'
sys.version_info    # sys.version_info(major=3, minor=12, ...)
sys.platform        # 'linux', 'win32', 'darwin'
sys.executable      # '/usr/bin/python3'
sys.prefix          # '/usr' — Python installation path
sys.byteorder       # 'little' or 'big'
sys.maxsize         # 9223372036854775807 (max int size)
```

## Exiting the Program

```python
import sys

sys.exit()       # Exit code 0 (success)
sys.exit(1)      # Exit code 1 (error)
sys.exit("Error: file not found")  # Prints message, exits with code 1
```

## Recursion

```python
import sys

print(sys.getrecursionlimit())  # 1000 (default)
sys.setrecursionlimit(5000)     # Change limit (careful!)
```

## Object Sizes

```python
import sys

sys.getsizeof(42)          # 28 bytes
sys.getsizeof("hello")    # 54 bytes
sys.getsizeof([1, 2, 3])  # 88 bytes
sys.getsizeof({})          # 64 bytes
```

## Common Pitfalls

- **`sys.exit()` raises `SystemExit`** — it's an exception, can be caught with `try/except`
- **Modifying `sys.path` is global** — affects the entire process
- **Increasing `recursionlimit`** — can cause stack overflow

## Official Documentation

[sys — System-specific parameters and functions](https://docs.python.org/3/library/sys.html)

## API Reference

### Important Attributes
| Attribute | Description |
|-----------|-------------|
| sys.argv | The list of command line arguments passed to a Python script. |
| sys.executable | A string giving the absolute path of the executable binary for the Python interpreter. |
| sys.modules | A dictionary that maps module names to modules which have already been loaded. |
| sys.path | A list of strings that specifies the search path for modules. |
| sys.platform | A string designating the platform identifier (e.g., 'linux', 'win32'). |
| sys.version | A string containing the version number of the Python interpreter. |

### Important Functions
| Function | Description |
|----------|-------------|
| sys.exit([arg]) | Exit from Python. This is implemented by raising the SystemExit exception. |
| sys.getsizeof(object) | Return the size of an object in bytes. |
| sys.getrecursionlimit() | Return the current value of the recursion limit (max depth of the Python interpreter stack). |
| sys.setrecursionlimit(limit)| Set the maximum depth of the Python interpreter stack to limit. |
