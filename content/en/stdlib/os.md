---
layout: layouts/base.njk
title: "os Module — Operating System Interface"
description: "Python os module documentation: file system, environment variables, processes"
---

# os — Operating System Interface

The `os` module provides functions for interacting with the operating system: file and directory operations, environment variables, and process management.

```python
import os
```

## Working with Paths and Directories

```python
import os

# Current working directory
cwd = os.getcwd()
print(cwd)  # /home/user/project

# Change directory
os.chdir('/tmp')

# Create directories
os.mkdir('new_folder')              # Single directory
os.makedirs('a/b/c', exist_ok=True) # Recursive creation

# Remove directories
os.rmdir('empty_folder')            # Only empty dirs
os.removedirs('a/b/c')              # Recursive removal of empty dirs

# List files in directory
files = os.listdir('.')
print(files)  # ['file1.py', 'file2.txt', 'folder1']

# Walk directory tree
for root, dirs, files in os.walk('/path/to/dir'):
    for file in files:
        full_path = os.path.join(root, file)
        print(full_path)
```

## File Operations

```python
import os

# Rename
os.rename('old_name.txt', 'new_name.txt')

# Delete file
os.remove('unwanted_file.txt')

# Check existence
os.path.exists('/path/to/file')   # True/False
os.path.isfile('/path/to/file')   # Is it a file?
os.path.isdir('/path/to/dir')     # Is it a directory?

# File info
stat = os.stat('file.txt')
print(stat.st_size)   # Size in bytes
print(stat.st_mtime)  # Last modification time
```

## os.path — Path Manipulation

```python
import os.path

path = '/home/user/documents/report.pdf'

os.path.basename(path)    # 'report.pdf'
os.path.dirname(path)     # '/home/user/documents'
os.path.split(path)       # ('/home/user/documents', 'report.pdf')
os.path.splitext(path)    # ('/home/user/documents/report', '.pdf')
os.path.join('a', 'b', 'c.txt')  # 'a/b/c.txt' (or 'a\\b\\c.txt' on Windows)

# Absolute path
os.path.abspath('file.txt')  # '/home/user/project/file.txt'

# File size
os.path.getsize('file.txt')  # 1024 (bytes)
```

## Environment Variables

```python
import os

# Get a variable
home = os.environ.get('HOME', '/default/path')
path = os.getenv('PATH')

# Set a variable (current process only)
os.environ['MY_VAR'] = 'my_value'

# Delete a variable
del os.environ['MY_VAR']

# All environment variables
for key, value in os.environ.items():
    print(f"{key}={value}")
```

## System Information

```python
import os

os.name         # 'posix', 'nt' (Windows), 'java'
os.sep          # '/' or '\\'
os.linesep      # '\n' or '\r\n'
os.cpu_count()  # Number of CPU cores
os.getpid()     # PID of current process
os.getlogin()   # Current username
```

## Common Pitfalls

- **Using `os.path` instead of `pathlib`** — for new code, prefer `pathlib`
- **Forgetting `exist_ok=True`** in `makedirs()` — raises error if directory exists
- **Platform-dependent paths** — always use `os.path.join()` or `pathlib.Path()`

## Tip

> For most path-related tasks, consider the `pathlib` module — it provides an object-oriented API that's often more convenient.

## Official Documentation

[os — Miscellaneous operating system interfaces](https://docs.python.org/3/library/os.html)

## API Reference

### Core Functions
| Function | Description |
|----------|-------------|
| os.getcwd() | Return a string representing the current working directory. |
| os.chdir(path) | Change the current working directory to path. |
| os.listdir(path='.') | Return a list containing the names of the entries in the directory given by path. |
| os.mkdir(path, mode=0o777) | Create a directory named path with numeric mode. |
| os.makedirs(name, mode=0o777, exist_ok=False)| Recursive directory creation function. |
| os.remove(path) | Remove (delete) the file path. |
| os.rename(src, dst) | Rename the file or directory src to dst. |
| os.rmdir(path) | Remove (delete) the directory path (must be empty). |

### Environment Variables
| Attribute | Description |
|-----------|-------------|
| os.environ | A mapping object representing the string environment. |
| os.getenv(key, default=None) | Return the value of the environment variable key. |

### Path Module (os.path)
| Function | Description |
|----------|-------------|
| os.path.abspath(path) | Return a normalized absolutized version of the pathname path. |
| os.path.basename(path)| Return the base name of pathname path. |
| os.path.dirname(path) | Return the directory name of pathname path. |
| os.path.exists(path) | Return True if path refers to an existing path or an open file descriptor. |
| os.path.join(path, *paths) | Join one or more path components intelligently. |
