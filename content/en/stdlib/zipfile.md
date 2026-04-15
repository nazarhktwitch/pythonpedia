---
layout: layouts/base.njk
title: "zipfile Module — Work with ZIP archives"
description: "Python zipfile module: creating, reading, and extracting ZIP archives."
---

# zipfile — Work with ZIP archives

The `zipfile` module provides tools to create, read, write, append, and list ZIP files. It supports compression.

```python
import zipfile
```

## Creating a ZIP Archive

```python
import zipfile

# Open archive in Write mode ('w')
# Use ZIP_DEFLATED to actually compress files (default stores uncompressed)
with zipfile.ZipFile('archive.zip', 'w', compression=zipfile.ZIP_DEFLATED) as zf:
    # write(filename_to_zip, name_inside_archive)
    zf.write('my_script.py', 'code/script.py')
    zf.write('data.csv', 'data/data.csv')
```

## Extracting a ZIP Archive

```python
import zipfile

with zipfile.ZipFile('archive.zip', 'r') as zf:
    # 1. Print all internal files
    print(zf.namelist())
    
    # 2. Extract thoroughly!
    # Using extractall securely in Python 3.12+ 
    # to prevent path-traversal attacks
    zf.extractall('extracted_folder/')
```

## Inspecting an Archive without Extracting

You can read the contents of a single file directly into memory without unpacking the entire archive.

```python
import zipfile

with zipfile.ZipFile('archive.zip', 'r') as zf:
    info = zf.getinfo('code/script.py')
    print(f"Original size: {info.file_size} bytes")
    print(f"Compressed size: {info.compress_size} bytes")
    
    # Read file content directly into memory
    with zf.open('code/script.py') as script_file:
        content = script_file.read()
        print(content.decode('utf-8'))
```

---

## API Reference

### `ZipFile` Class
| Method | Description |
|--------|-------------|
| `zipfile.ZipFile(file, mode='r', compression=ZIP_STORED)`| Open a ZIP file. Modes: `r` (read), `w` (write/truncate), `x` (exclusive create), `a` (append). |
| `ZipFile.close()` | Close the archive file. Must be called if you don't use the `with` statement. |
| `ZipFile.getinfo(name)` | Return a `ZipInfo` object with information about the archive member. |
| `ZipFile.namelist()`| Return a list of archive members by name. |
| `ZipFile.open(name, mode='r')`| Access a member of the archive as a binary file-like object. |
| `ZipFile.extract(member, path=None)`| Extract a single member from the archive to the current working directory or given path. |
| `ZipFile.extractall(path=None)`| Extract all members from the archive to the given path. |
| `ZipFile.read(name)`| Return the bytes of the file `name` from the archive. |
| `ZipFile.write(filename, arcname=None)`| Write the file `filename` to the archive under `arcname`. |
| `ZipFile.writestr(zinfo_or_arcname, data)`| Write a string or bytes to the archive dynamically (from memory). |
| `ZipFile.testzip()`| Read all the files in the archive and check their CRCs and file headers. |

### Constants
| Constant | Description |
|----------|-------------|
| `zipfile.ZIP_STORED` | The numeric constant for an uncompressed archive member. |
| `zipfile.ZIP_DEFLATED`| The standard ZIP compression method. (Requires `zlib` module). |
| `zipfile.ZIP_LZMA` | LZMA compression method. |
