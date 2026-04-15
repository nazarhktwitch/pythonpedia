---
layout: layouts/base.njk
title: "shutil Module — High-level File Operations"
description: "Python shutil: copy files, move directories, create archives"
---

# shutil — High-level file operations

The `shutil` module offers a number of high-level operations on files and collections of files. In particular, functions are provided which support file copying and removal. For operations on individual files, see also the `os` module.

```python
import shutil
```

## Copying Files and Directories

```python
import shutil

# Copy a single file (metadata is NOT preserved, e.g. modification time)
shutil.copy('source.txt', 'destination.txt')
shutil.copy('source.txt', 'backup_dir/')  # Copies into target directory

# Copy file AND preserve metadata (permissions, timestamps)
shutil.copy2('source.txt', 'destination.txt')

# Recursively copy an entire directory tree
shutil.copytree('project/', 'project_backup/')
```

## Moving and Deleting

```python
import shutil

# Move a file or directory (can be used for renaming)
shutil.move('old_folder/', 'new_folder/')
shutil.move('file.txt', 'archive/file.txt')

# Recursively delete a directory tree (use with CAUTION!)
# This is equivalent to 'rm -rf' in Linux
shutil.rmtree('old_project/')
```

## Archiving (Zipping)

The `shutil` module provides a very simple interface for creating and extracting zip/tar archives.

```python
import shutil

# Create a zip archive of the 'project' folder
# usage: make_archive(archive_name, format, root_dir)
shutil.make_archive('project_backup', 'zip', 'project/')
# Results in 'project_backup.zip'

# Supported formats: 'zip', 'tar', 'gztar', 'bztar', 'xztar'

# Extract an archive
shutil.unpack_archive('project_backup.zip', 'extracted_folder/')
```

## Disk Usage

You can check how much space is left on your drive using `shutil` (Python 3.3+).

```python
import shutil

# Get usage statistics for the given path
total, used, free = shutil.disk_usage("/")

print(f"Total: {total // (2**30)} GiB")
print(f"Used: {used // (2**30)} GiB")
print(f"Free: {free // (2**30)} GiB")
```

---

## API Reference

### File and Directory Operations
| Function | Description |
|----------|-------------|
| `shutil.copy(src, dst)` | Copies file data and mode bits. |
| `shutil.copy2(src, dst)` | Copies file data and all stat info (timestamps, etc.). |
| `shutil.copyfile(src, dst)` | Copies the contents of the file named src to dst. |
| `shutil.copytree(src, dst)` | Recursively copy an entire directory tree rooted at src. |
| `shutil.rmtree(path)` | Delete an entire directory tree. |
| `shutil.move(src, dst)` | Recursively move a file or directory to another location. |
| `shutil.which(cmd)` | Return the path to an executable (like the UNIX `which` command). |

### Archiving Operations
| Function | Description |
|----------|-------------|
| `shutil.make_archive(base_name, format, root_dir)`| Create an archive file (eg. zip or tar). |
| `shutil.unpack_archive(filename, extract_dir)`| Unpack an archive. |
| `shutil.get_archive_formats()`| Return a list of supported archive formats. |
