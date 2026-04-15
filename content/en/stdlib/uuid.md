---
layout: layouts/base.njk
title: "uuid Module — Universally Unique Identifiers"
description: "Python uuid module: generating unique IDs, UUIDv4"
---

# uuid — UUID objects

The `uuid` module provides immutable UUID objects (the `UUID` class) and the functions `uuid1()`, `uuid3()`, `uuid4()`, `uuid5()` for generating universally unique identifiers.

For general use-cases where you just need a random unique ID, **UUIDv4** is exactly what you need.

```python
import uuid
```

## Generating Random UUIDs (v4)

UUID version 4 is fully randomized. It relies on the system's cryptographically secure random number generator.

```python
import uuid

# Generate a UUIDv4
my_id = uuid.uuid4()

print(my_id)
# 43763f08-0158-45eb-9730-84a275f6aa3d

# Access internal representations
print(my_id.hex)     # 43763f08015845eb973084a275f6aa3d
print(my_id.int)     # 89793540263300898495574706595460598333
```

## Creating UUIDs from specific data

*   **uuid1()**: Based on the host's MAC address and current time. (Can pose a privacy risk and is predictable).
*   **uuid3() / uuid5()**: Based on the MD5/SHA-1 hash of a namespace identifier and a name. If you generate a UUID5 from the identical namespace and name twice, you get the exact same UUID.

```python
import uuid

# Generate UUID based on a URL (UUID5 is recommended over UUID3)
name = 'python.org'
namespace = uuid.NAMESPACE_DNS
my_id = uuid.uuid5(namespace, name)

print(my_id) 
# 886313e1-3b8a-5372-9b90-0c9aee199e5d
```

---

## API Reference

### Core Functions
| Function | Description |
|----------|-------------|
| `uuid.uuid1(node=None, clock_seq=None)`| Generate a UUID from a host ID, sequence number, and the current time. |
| `uuid.uuid3(namespace, name)` | Generate a UUID based on the MD5 hash of a namespace identifier and a name. |
| `uuid.uuid4()` | Generate a random UUID. |
| `uuid.uuid5(namespace, name)` | Generate a UUID based on the SHA-1 hash of a namespace identifier and a name. |

### The UUID Class
| Attribute | Description |
|-----------|-------------|
| `UUID(hex=None, bytes=None, ...)`| Constructor. You can pass a string of 32 hex digits. |
| `UUID.bytes` | The UUID as a 16-byte string. |
| `UUID.hex` | The UUID as a 32-character hexadecimal string, unhyphenated. |
| `UUID.int` | The UUID as a 128-bit integer. |
| `UUID.version` | The UUID version number (1 to 5). |
