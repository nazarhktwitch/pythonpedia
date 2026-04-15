---
layout: layouts/base.njk
title: "base64 Module — Base16, Base32, Base64 Encoding"
description: "Python base64: encode binary data to printable ASCII characters"
---

# base64 — Base16, Base32, Base64 Data Encodings

The `base64` module provides functions for encoding binary data to printable ASCII characters and decoding such encodings back to binary data. This is typically used to safely send binary data (like images or compiled code) as text over protocols that are designed to handle only text, such as HTTP headers or JSON.

```python
import base64
```

## Basic Base64 Encoding/Decoding

Note: The functions work strictly with `bytes`, so strings must be encoded before passing them to the functions, and decoded afterward.

```python
import base64

text = "Hello, Python developers!"
# Convert to bytes
byte_data = text.encode('utf-8')

# 1. Encode to Base64
encoded_bytes = base64.b64encode(byte_data)

print(encoded_bytes) 
# b'SGVsbG8sIFB5dGhvbiBkZXZlbG9wZXJzIQ=='

print(encoded_bytes.decode('utf-8'))
# SGVsbG8sIFB5dGhvbiBkZXZlbG9wZXJzIQ==

# 2. Decode back to original
decoded_bytes = base64.b64decode(encoded_bytes)
original_text = decoded_bytes.decode('utf-8')
print(original_text) # Hello, Python developers!
```

## URL-Safe Encoding

Standard Base64 contains `+` and `/` characters, which have special meanings in URLs. To send Base64 in a URL, use `urlsafe_b64encode`, which substitutes `-` and `_` instead.

```python
import base64

payload = b"\x00\x11\x22\x33\x44" # Binary payload

# Standard returns: b'ABEiM0Q='
# URL safe returns: b'ABEiM0Q=' (same if no tricky chars, but vital mathematically)
url_safe = base64.urlsafe_b64encode(payload)
```

## Other Encodings (Base16 / Base32)

Base16 exactly corresponds to simple hexadecimal representation. Base32 is a larger set but doesn't use lowercase letters.

```python
import base64

data = b"Some data"

print(base64.b16encode(data)) # b'536F6D65... ' (Hex)
print(base64.b32encode(data)) # b'KNXW2ZJA...'
```

---

## API Reference

### Modern API
| Function | Description |
|----------|-------------|
| `base64.b64encode(s, altchars=None)` | Encode the bytes-like object `s` using Base64. |
| `base64.b64decode(s, altchars=None, validate=False)`| Decode the Base64 encoded bytes-like object. |
| `base64.standard_b64encode(s)`| Encode `s` using the standard Base64 alphabet. |
| `base64.urlsafe_b64encode(s)`| Encode using the URL- and filesystem-safe alphabet. |
| `base64.urlsafe_b64decode(s)`| Decode a URL-safe Base64 string. |
| `base64.b32encode(s)` | Encode the bytes-like object using Base32. |
| `base64.b16encode(s)` | Encode the bytes-like object using Base16 (hexadecimal). |

### Legacy API (For Files)
| Function | Description |
|----------|-------------|
| `base64.encode(input, output)` | Encode the `input` file object into the `output` file object. |
| `base64.decode(input, output)` | Decode the `input` file object into the `output` file object. |
