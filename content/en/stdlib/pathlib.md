---
layout: layouts/base.njk
title: "pathlib Module — Object-Oriented Paths"
description: "Python pathlib: modern file system paths, Path objects, glob patterns"
---

# pathlib — Object-Oriented Filesystem Paths

The `pathlib` module provides an object-oriented interface for working with filesystem paths. It's the modern, recommended alternative to `os.path`.

```python
from pathlib import Path
```

## Creating Paths

```python
from pathlib import Path

p = Path('.')                          # Current directory
p = Path('/home/user/documents')       # Absolute path
p = Path.home()                        # User home directory
p = Path.cwd()                         # Current working directory

# Join paths with /
p = Path('/home') / 'user' / 'file.txt'
print(p)  # /home/user/file.txt
```

## Path Properties

```python
from pathlib import Path

p = Path('/home/user/project/main.py')

p.name       # 'main.py'
p.stem       # 'main'
p.suffix     # '.py'
p.parent     # Path('/home/user/project')
p.parents    # [Path('/home/user/project'), Path('/home/user'), ...]
p.parts      # ('/', 'home', 'user', 'project', 'main.py')
p.anchor     # '/'

p.is_absolute()  # True
p.is_relative_to('/home')  # True (Python 3.9+)
```

## File Operations

```python
from pathlib import Path

p = Path('example.txt')

# Read/Write
p.write_text('Hello World', encoding='utf-8')
content = p.read_text(encoding='utf-8')
p.write_bytes(b'binary data')
data = p.read_bytes()

# Check existence
p.exists()      # True/False
p.is_file()     # Is it a file?
p.is_dir()      # Is it a directory?

# File info
stat = p.stat()
print(stat.st_size)    # Size in bytes
print(stat.st_mtime)   # Modification time

# Delete
p.unlink()               # Delete file
p.unlink(missing_ok=True) # No error if missing (3.8+)
```

## Directory Operations

```python
from pathlib import Path

d = Path('my_project')

# Create directories
d.mkdir()                          # Single directory
d.mkdir(parents=True, exist_ok=True)  # Recursive, no error if exists

# List contents
for item in d.iterdir():
    print(item.name, 'dir' if item.is_dir() else 'file')

# Glob patterns
for py_file in Path('.').glob('**/*.py'):  # Recursive
    print(py_file)

for txt in Path('.').glob('*.txt'):        # Current dir only
    print(txt)

# Remove empty directory
d.rmdir()
```

## Path Manipulation

```python
from pathlib import Path

p = Path('/home/user/document.txt')

# Change suffix
p.with_suffix('.md')    # Path('/home/user/document.md')

# Change name
p.with_name('readme.txt')  # Path('/home/user/readme.txt')

# Change stem (Python 3.9+)
p.with_stem('notes')    # Path('/home/user/notes.txt')

# Resolve symlinks and relative paths
p.resolve()  # Absolute canonical path
```

## Common Patterns

```python
from pathlib import Path

# Find all Python files recursively
python_files = list(Path('.').rglob('*.py'))

# Create file with parent directories
output = Path('output/reports/2024/summary.txt')
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text('Report content')

# Process all files in directory
for f in sorted(Path('data').glob('*.csv')):
    print(f"Processing {f.name}...")
```

## pathlib vs os.path

| Task | os.path | pathlib |
|------|---------|---------|
| Join | `os.path.join(a, b)` | `Path(a) / b` |
| Basename | `os.path.basename(p)` | `p.name` |
| Extension | `os.path.splitext(p)[1]` | `p.suffix` |
| Exists | `os.path.exists(p)` | `p.exists()` |
| Read | `open(p).read()` | `p.read_text()` |
| Glob | `glob.glob('*.py')` | `Path('.').glob('*.py')` |

## Official Documentation

[pathlib — Object-oriented filesystem paths](https://docs.python.org/3/library/pathlib.html)


## API Reference

### Classes
| Class | Description |
|-------|-------------|
| `pathlib.Path` | Pure path object that can handle disk operations. |
| `pathlib.PurePath`| Pure path operations but without accessing the filesystem. |

### Important Methods and Properties
| Method/Property | Description |
|-----------------|-------------|
| `Path.name` | A string representing the final path component. |
| `Path.stem` | The final path component, without its suffix. |
| `Path.suffix` | The file extension of the final component. |
| `Path.parent` | The logical parent of the path. |
| `Path.cwd()` | Return a new path object representing the current directory. |
| `Path.home()` | Return a new path object representing the user's home directory. |
| `Path.exists()` | Whether the path points to an existing file or directory. |
| `Path.is_dir()` | Return `True` if the path points to a directory. |
| `Path.is_file()` | Return `True` if the path points to a regular file. |
| `Path.mkdir(parents=False, exist_ok=False)`| Create a new directory at this given path. |
| `Path.read_text(encoding=None)`| Open the file in text mode, read it, and close the file. |
| `Path.write_text(data, encoding=None)`| Open the file in text mode, write to it, and close the file. |
| `Path.iterdir()`| When the path points to a directory, yield path objects of the directory contents. |
| `Path.glob(pattern)`| Glob the given relative pattern in the directory represented by this path. |
| `Path.rglob(pattern)`| This is like calling `Path.glob()` with `**/` added in front of the pattern. |
