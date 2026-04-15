---
layout: layouts/base.njk
title: "json Module — JSON Serialization"
description: "Python json module: encoding and decoding JSON data"
---

# json — JSON Encoder and Decoder

The `json` module provides functions for encoding Python objects to JSON strings and decoding JSON strings to Python objects.

```python
import json
```

## Encoding (Python → JSON)

```python
import json

data = {
    "name": "Alice",
    "age": 30,
    "languages": ["Python", "JavaScript"],
    "active": True,
    "address": None
}

# Convert to JSON string
json_str = json.dumps(data)
print(json_str)
# {"name": "Alice", "age": 30, "languages": ["Python", "JavaScript"], "active": true, "address": null}

# Pretty print
json_pretty = json.dumps(data, indent=2)
print(json_pretty)

# Write to file
with open('data.json', 'w') as f:
    json.dump(data, f, indent=2)

# Sort keys
json.dumps(data, sort_keys=True)

# Non-ASCII characters
json.dumps({"name": "Алиса"}, ensure_ascii=False)
# '{"name": "Алиса"}' instead of '{"name": "\\u0410\\u043b\\u0438\\u0441\\u0430"}'
```

## Decoding (JSON → Python)

```python
import json

json_str = '{"name": "Alice", "age": 30, "active": true}'

# Parse JSON string
data = json.loads(json_str)
print(data['name'])   # Alice
print(type(data))     # <class 'dict'>

# Read from file
with open('data.json', 'r') as f:
    data = json.load(f)
```

## Type Mapping

| JSON | Python |
|------|--------|
| object `{}` | dict |
| array `[]` | list |
| string `""` | str |
| number (int) | int |
| number (float) | float |
| `true`/`false` | `True`/`False` |
| `null` | `None` |

## Custom Serialization

```python
import json
from datetime import datetime

class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

data = {"created": datetime.now()}
json.dumps(data, cls=DateTimeEncoder)
# '{"created": "2024-01-15T10:30:00"}'

# Using default parameter
json.dumps(data, default=str)
# '{"created": "2024-01-15 10:30:00"}'
```

## Working with Complex Objects

```python
import json

class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

# Serialize using __dict__
user = User("Alice", "alice@example.com")
json.dumps(user.__dict__)

# Custom decoder
def user_decoder(d):
    if 'name' in d and 'email' in d:
        return User(d['name'], d['email'])
    return d

user = json.loads('{"name":"Alice","email":"alice@example.com"}',
                  object_hook=user_decoder)
```

## Common Pitfalls

- **Single quotes are invalid JSON** — use `"double quotes"` only
- **Trailing commas are invalid** — `{"a": 1,}` will fail
- **Python sets, tuples can't be serialized** — convert to list first
- **`json.load` vs `json.loads`** — `load` reads from file, `loads` from string
- **`NaN` and `Infinity`** — not valid JSON, Python allows by default

## Official Documentation

[json — JSON encoder and decoder](https://docs.python.org/3/library/json.html)


## API Reference

### Important Functions
| Function | Description |
|----------|-------------|
| `json.dumps(obj, *, skipkeys=False, ensure_ascii=True, indent=None)` | Serialize `obj` to a JSON formatted `str`. |
| `json.dump(obj, fp, *, skipkeys=False, ensure_ascii=True, indent=None)` | Serialize `obj` as a JSON formatted stream to `fp`. |
| `json.loads(s, *, cls=None, object_hook=None)` | Deserialize `s` (a `str`, `bytes` or `bytearray` containing a JSON document) to a Python object. |
| `json.load(fp, *, cls=None, object_hook=None)` | Deserialize `fp` to a Python object. |

### Important Classes
| Class | Description |
|-------|-------------|
| `json.JSONEncoder` | Extensible JSON encoder for Python data structures. |
| `json.JSONDecoder` | Simple JSON decoder. |
