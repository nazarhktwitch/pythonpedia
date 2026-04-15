---
layout: layouts/base.njk
title: "hashlib Module — Secure Hashes"
description: "Python hashlib: SHA256, MD5, and message digests"
---

# hashlib — Secure Hashes and Message Digests

This module implements a common interface to many different secure hash and message digest algorithms. 

```python
import hashlib
```

## Basic Hashing

Data sent to hashlib must be passed as **bytes**, not standard strings.

```python
import hashlib

# 1. Create a hash object
m = hashlib.sha256()

# 2. Add data (must be encoded to bytes)
m.update(b"Nobody inspects")
m.update(b" the spammish repetition")

# 3. Get the digest
print(m.digest())      # Returns bytes
print(m.hexdigest())   # Returns a hexadecimal string (most common)
# '031edd7d41651593c5fe5c006fa5752b37fddff7bc4e843aa6af0c950f4b9406'
```

## One-liner Hashing

```python
import hashlib

# MD5 (Warning: considered cryptographically broken, use only for checksums)
hash_str = hashlib.md5(b"Hello World").hexdigest()

# SHA-256 (Recommended for general secure hashing)
hash_str = hashlib.sha256(b"Hello World").hexdigest()

# SHA-512
hash_str = hashlib.sha512(b"Hello World").hexdigest()
```

## Checking Available Algorithms

```python
import hashlib

# Algorithms guaranteed to be available on all platforms
print(hashlib.algorithms_guaranteed)
# {'sha224', 'sha256', 'sha384', 'sha512', 'md5', 'sha1', 'blake2b', 'blake2s'}

# Algorithms available on your specific system via OpenSSL
print(hashlib.algorithms_available)
```

## Hashing Files Efficiently

To hash a large file without loading the entire file into memory, read it in chunks:

```python
import hashlib

def sha256_file(filename):
    sha256_hash = hashlib.sha256()
    
    with open(filename, "rb") as f:
        # Read and update hash in 4K chunks
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
            
    return sha256_hash.hexdigest()

print(sha256_file("large_video.mp4"))
```

## Password Hashing (pbkdf2)

For hashing passwords securely, you should use key derivation functions like `pbkdf2_hmac`. (Note: The `secrets` module or external libraries like `bcrypt` are often better alternatives).

```python
import hashlib
import os

password = b"super_secret_password"
salt = os.urandom(32) # A random salt is required for security

# Use SHA-256 with 100,000 iterations
key = hashlib.pbkdf2_hmac('sha256', password, salt, 100000)

print(key.hex())
```

## Official Documentation

[hashlib — Secure hashes and message digests](https://docs.python.org/3/library/hashlib.html)


## API Reference

### Hash Algorithms Construction
| Function | Description |
|----------|-------------|
| `hashlib.sha256([data])` | Return a new SHA-256 hash object; optionally initialized with a bytes-like object `data`. |
| `hashlib.md5([data])` | Return a new MD5 hash object. |
| `hashlib.new(name, [data])`| Generic constructor that takes the string name of the desired algorithm as its first parameter. |

### Hash Object Methods
| Method | Description |
|--------|-------------|
| `hash.update(data)` | Update the hash object with the bytes-like object. |
| `hash.digest()` | Return the digest of the data passed to the `update()` method so far as a bytes object. |
| `hash.hexdigest()` | Like `digest()` except the digest is returned as a string object of double length. |

### Key Derivation
| Function | Description |
|----------|-------------|
| `hashlib.pbkdf2_hmac(hash_name, password, salt, iterations)`| The function provides PKCS#5 password-based key derivation function 2. |
