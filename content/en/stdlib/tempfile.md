---
layout: layouts/base.njk
title: "tempfile Module — Generate temporary files"
description: "Python tempfile module: safely create temporary files and directories."
---

# tempfile — Generate temporary files and directories

The `tempfile` module generates temporary files and directories. It works securely on all supported platforms, ensuring that only the creating user ID can read or write the temporary files.

The best way to use this module is via context managers (`with` statements), as they guarantee that the temporary file or directory is automatically destroyed when you're done.

```python
import tempfile
```

## Temporary Directories

A common use case is pulling data from a network, working on it, and then cleaning it up.

```python
import tempfile
import pathlib

# Creates the directory and securely removes it at the end of the block
with tempfile.TemporaryDirectory() as temp_dir:
    print(f"Created temporary directory: {temp_dir}")
    
    # You can perform standard file operations inside this folder
    path = pathlib.Path(temp_dir) / 'test.txt'
    path.write_text("Secret processing data")
    
print("Directory and all its contents have been deleted.")
```

## Temporary Files

You can create an anonymous, temporary file that can be read and written, and deletes itself when closed.

```python
import tempfile

# SpooledTemporaryFile keeps data in RAM until max_size is breached,
# then falls back to physical disk.
with tempfile.SpooledTemporaryFile(max_size=1024, mode='w+') as tf:
    tf.write("Hello World\n")
    tf.seek(0) # Rewind the reader back to the start!
    print(tf.read())
```

---

## API Reference

### Context Managers / Core Classes
| Class | Description |
|-------|-------------|
| `tempfile.TemporaryFile(mode='w+b', ...)`| Return a file-like object that can be used as a temporary storage area. Guarantees destruction on close. |
| `tempfile.NamedTemporaryFile()`| Similar to TemporaryFile, but the file is guaranteed to have a visible name in the file system (accessed via the `name` attribute). |
| `tempfile.SpooledTemporaryFile(max_size)`| Operates in memory until the file size exceeds `max_size`, then writes to disk. Faster for small operations. |
| `tempfile.TemporaryDirectory()`| Securely creates a temporary directory and recursively deletes it on cleanup. |

### Utilities
| Function | Description |
|----------|-------------|
| `tempfile.mkdtemp()` | Creates a temporary directory. Warning: You must delete it manually! |
| `tempfile.gettempdir()` | Return the name of the directory used for temporary files. |
| `tempfile.gettempdirb()`| Same as `gettempdir()` but as a bytes object. |
