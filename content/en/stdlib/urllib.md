---
layout: layouts/base.njk
title: "urllib Module — URL Handling"
description: "Python urllib: fetching URLs, parsing, making HTTP requests"
---

# urllib — URL Handling Modules

`urllib` is a package that collects several modules for working with URLs:

* `urllib.request` for opening and reading URLs
* `urllib.error` containing the exceptions raised by `urllib.request`
* `urllib.parse` for parsing URLs
* `urllib.robotparser` for parsing `robots.txt` files

```python
import urllib.request
import urllib.parse
```

## Making Simple GET Requests

```python
import urllib.request

url = 'http://example.com/'
with urllib.request.urlopen(url) as response:
    html = response.read()
    print(html[:100])  # Read first 100 bytes (returns bytes, not string)
    
    # Check headers and status
    print(response.status)         # 200
    print(response.geturl())       # 'http://example.com/'
    print(response.info())         # Response headers
```

## Making POST Requests

To send data, use the `data` parameter. Data must be encoded to bytes.

```python
import urllib.request
import urllib.parse

url = 'http://httpbin.org/post'
data = {'username': 'Alice', 'action': 'login'}

# 1. URL encode the data
encoded_data = urllib.parse.urlencode(data).encode('utf-8')

# 2. Make the request
req = urllib.request.Request(url, data=encoded_data)
with urllib.request.urlopen(req) as response:
    result = response.read().decode('utf-8')
    print(result)
```

## Adding Custom Headers (e.g., User-Agent)

```python
import urllib.request

url = 'http://example.com/'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}

req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req) as response:
    html = response.read()
```

## Handling Exceptions

```python
import urllib.request
import urllib.error

try:
    with urllib.request.urlopen('http://example.com/nonexistent') as response:
        html = response.read()
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code} - {e.reason}")
    # HTTP Error: 404 - Not Found
except urllib.error.URLError as e:
    print(f"Server not found: {e.reason}")
```

## Parsing URLs (urllib.parse)

```python
from urllib.parse import urlparse, parse_qs, urlencode

# Parse a URL
url = 'https://www.example.com/search?q=python&sort=desc#results'
parsed = urlparse(url)

print(parsed.scheme)    # 'https'
print(parsed.netloc)    # 'www.example.com'
print(parsed.path)      # '/search'
print(parsed.query)     # 'q=python&sort=desc'
print(parsed.fragment)  # 'results'

# Parsing the query string into a dictionary
qs = parse_qs(parsed.query)
print(qs)  # {'q': ['python'], 'sort': ['desc']}

# Building a query string
print(urlencode({'q': 'python basics', 'page': 1}))
# 'q=python+basics&page=1'
```

## Third-Party Alternative: requests

> **Note:** While `urllib` is powerful and built-in, the community standard for making HTTP requests in Python is the third-party `requests` library. It provides a much simpler and more developer-friendly API.

```bash
pip install requests
```

```python
# Equivalent using requests:
import requests
response = requests.get('http://example.com')
print(response.text)
```

## Official Documentation

[urllib — URL handling modules](https://docs.python.org/3/library/urllib.html)


## API Reference

### urllib.request
| Function/Class | Description |
|----------------|-------------|
| `urllib.request.urlopen(url, data=None, [timeout])`| Open the URL url, which can be either a string or a `Request` object. Returns an HTTPResponse object. |
| `urllib.request.Request(url, data=None, headers={})`| This class is an abstraction of a URL request. |

### HTTPResponse Object (from urlopen)
| Method/Attribute | Description |
|------------------|-------------|
| `response.read([size])` | Read and return the response body as bytes. |
| `response.geturl()` | Return the URL of the resource retrieved (helps check for redirects). |
| `response.info()`| Return the meta-information of the page, such as headers. |
| `response.status`| The HTTP status code of the response (e.g. 200). |

### urllib.parse
| Function | Description |
|----------|-------------|
| `urllib.parse.urlparse(urlstring)`| Parse a URL into six components (scheme, netloc, path, params, query, fragment). |
| `urllib.parse.parse_qs(qs)`| Parse a query string given as a string argument into a Python dictionary. |
| `urllib.parse.urlencode(query)`| Convert a mapping object or a sequence of two-element tuples to a percent-encoded string. |
