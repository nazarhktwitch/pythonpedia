---
layout: layouts/base.njk
title: "secrets Module — Cryptographic Randomness"
description: "Python secrets: generating secure random numbers and tokens for passwords"
---

# secrets — Generate secure random numbers

The `secrets` module is used for generating cryptographically strong random numbers suitable for managing data such as passwords, account authentication, and security tokens. It is preferred over the `random` module for security-related tasks.

```python
import secrets
```

## Generating Tokens

```python
import secrets

# Generate a secure random token in hex format (great for API keys/URLs)
token = secrets.token_hex(16)  # 16 bytes = 32 hex digits
print(token)  # '639f727c9bdcc... '

# URL-safe text token (Base64)
url_safe = secrets.token_urlsafe(32)

# Raw bytes
byte_token = secrets.token_bytes(16)
```

## Secure Random Choices

```python
import secrets
import string

# Create a secure 12-character alphanumeric password
alphabet = string.ascii_letters + string.digits
password = ''.join(secrets.choice(alphabet) for i in range(12))
print(password)
```

## Secure Comparison

```python
import secrets

# Use this to compare tokens/passwords to prevent timing attacks
secrets.compare_digest("secret_token", "secret_token") # True
```


## API Reference

### Random Generation
| Function | Description |
|----------|-------------|
| `secrets.choice(seq)` | Return a randomly chosen element from a non-empty sequence. |
| `secrets.randbelow(n)`| Return a random int in the range [0, n). |
| `secrets.randbits(k)` | Return an int with k random bits. |

### Tokens
| Function | Description |
|----------|-------------|
| `secrets.token_bytes([nbytes=None])`| Return a random byte string containing nbytes number of bytes. |
| `secrets.token_hex([nbytes=None])`| Return a random text string, in hexadecimal. The string has 2 * nbytes characters. |
| `secrets.token_urlsafe([nbytes=None])`| Return a random URL-safe text string, containing nbytes random bytes. |

### Utilities
| Function | Description |
|----------|-------------|
| `secrets.compare_digest(a, b)`| Return True if strings a and b are equal, using a timing-attack resistant comparison. |
