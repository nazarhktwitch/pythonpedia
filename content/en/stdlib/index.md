---
layout: layouts/base.njk
title: "The Standard Library"
description: "Reference guide to Python's batteries-included built-in modules."
---

# The Python Standard Library

Python's standard library is incredibly extensive. It offers a wide range of facilities such as handling operating system functions, file systems, dates, networks, math, and much more. It's often said that Python comes with **"batteries included."**

Here are the most important, frequently used built-in modules every Python developer should know.

### System and Files
*   [os](/stdlib/os/) — Operating system interfaces and file paths.
*   [sys](/stdlib/sys/) — System-specific parameters and functions (like `sys.argv`).
*   [subprocess](/stdlib/subprocess/) — Spawn new processes and execute commands.
*   [pathlib](/stdlib/pathlib/) — Object-oriented filesystem paths.
*   [shutil](/stdlib/shutil/) — High-level file operations (copy, move, rmtree).
*   [tempfile](/stdlib/tempfile/) — Generate temporary files and directories.

### Data Formats & Persistence
*   [json](/stdlib/json/) — JSON encoder and decoder.
*   [csv](/stdlib/csv/) — CSV File Reading and Writing.
*   [sqlite3](/stdlib/sqlite3/) — DB-API 2.0 interface for SQLite databases.
*   [pickle](/stdlib/pickle/) — Python object serialization (saving objects).

### Time and Math
*   [datetime](/stdlib/datetime/) — Basic date and time types.
*   [time](/stdlib/time/) — Time access and conversions (sleep, timestamps).
*   [calendar](/stdlib/calendar/) — General calendar-related functions.
*   [math](/stdlib/math/) — Mathematical functions.
*   [random](/stdlib/random/) — Generate pseudo-random numbers.
*   [statistics](/stdlib/statistics/) — Mathematical statistics functions.

### Data Structures & Algorithms
*   [collections](/stdlib/collections/) — Container datatypes (Counter, defaultdict).
*   [itertools](/stdlib/itertools/) — Functions creating iterators for efficient looping.
*   [copy](/stdlib/copy/) — Shallow and deep copy operations.
*   [enum](/stdlib/enum/) — Support for enumerations.

### Architecture & Typing
*   [dataclasses](/stdlib/dataclasses/) — Auto-generate `__init__` and `__repr__` for data objects.
*   [typing](/stdlib/typing/) — Support for type hints.
*   [functools](/stdlib/functools/) — Higher-order functions, partials, and caching.

### Error Handling & Debugging
*   [logging](/stdlib/logging/) — Professional logging facility for Python.
*   [argparse](/stdlib/argparse/) — Parser for command-line options and flags.
*   [traceback](/stdlib/traceback/) — Print or retrieve stack traces.
*   [inspect](/stdlib/inspect/) — Inspect live objects and source code.
*   [unittest](/stdlib/unittest/) — Unit testing framework.

### Networking & Security
*   [requests](/stdlib/requests/) — *External*: The HTTP for Humans library.
*   [urllib](/stdlib/urllib/) — Native URL handling and basic HTTP.
*   [socket](/stdlib/socket/) — Low-level networking interface.
*   [hashlib](/stdlib/hashlib/) — Secure hashes and message digests.
*   [secrets](/stdlib/secrets/) — Cryptographically strong random generators.
*   [uuid](/stdlib/uuid/) — Universally Unique Identifiers (UUIDv4).
*   [base64](/stdlib/base64/) — Base16, Base32, Base64 Data Encodings.

### Concurrency
*   [asyncio](/stdlib/asyncio/) — Asynchronous I/O, event loop, and coroutines.
*   [threading](/stdlib/threading/) — Thread-based parallelism.
*   [multiprocessing](/stdlib/multiprocessing/) — Process-based parallelism.

### Text & Media
*   [re](/stdlib/re/) — Regular expression operations.
*   [string](/stdlib/string/) — Common string operations and format templates.
*   [zipfile](/stdlib/zipfile/) — Work with ZIP archives.
