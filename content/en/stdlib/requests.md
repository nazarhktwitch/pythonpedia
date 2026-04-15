---
layout: layouts/base.njk
title: "requests Library — HTTP for Humans"
description: "requests: the standard defacto package for making HTTP requests in Python."
---

# requests — HTTP for Humans™

While Python has the built-in `urllib` module, the **`requests`** library is the universally accepted standard for making HTTP requests in Python. It is an external library that must be installed via pip, but it is so ubiquitous that it is often treated as part of the ecosystem.

*Note: This is a third-party library. To install it, run `pip install requests`.*

```python
import requests
```

## Basic GET Request

Making a request with `requests` is incredibly straightforward compared to `urllib`. Note how JSON parsing is built right in!

```python
import requests

# Make a GET request
response = requests.get('https://api.github.com/events')

# Check the status code (e.g. 200 is OK, 404 is Not Found)
print(response.status_code)

# Check the final URL (useful if you got redirected)
print(response.url)

# Print the text content of the response
print(response.text)

# If the response is JSON, you can decode it immediately!
data = response.json()
print(data[0]['id'])
```

## Sending Data (POST Request)

Sending JSON, uploading files, or submitting forms is handled magically for you.

```python
import requests

url = 'https://httpbin.org/post'
my_payload = {'username': 'bob', 'password': '123'}

# To send a Form (x-www-form-urlencoded):
r1 = requests.post(url, data=my_payload)

# To send pure JSON (automatically sets headers!):
r2 = requests.post(url, json=my_payload)

print(r2.text)
```

## Adding Headers and Parameters

```python
import requests

url = 'https://api.example.com/search'
query_params = {'limit': 10, 'q': 'python'}
custom_headers = {'Authorization': 'Bearer YOUR_TOKEN'}

response = requests.get(
    url, 
    params=query_params, 
    headers=custom_headers,
    timeout=5 # Never forget a timeout!
)
```

---

## API Reference

### Core Request Methods
All these methods return a `Response` object.
| Method | Description |
|--------|-------------|
| `requests.get(url, params=None, **kwargs)`| Sends a GET request. `params` acts as the query string URL variables. |
| `requests.post(url, data=None, json=None, **kwargs)`| Sends a POST request. Use `data` for forms or files, use `json` for direct object uploads. |
| `requests.put(url, data=None, **kwargs)`| Sends a PUT request. |
| `requests.delete(url, **kwargs)`| Sends a DELETE request. |

### Vital Parameters (`**kwargs`)
Passed into any of the request methods above.
| Parameter | Description |
|-----------|-------------|
| `headers={...}` | A dictionary of HTTP headers to send with the request. |
| `cookies={...}` | A dictionary or CookieJar of cookies to send with the request. |
| `auth=(user, pass)`| A tuple to enable Basic/Digest HTTP auth. |
| `timeout=int` | How many seconds to wait for the server to send data before giving up (throws Timeout Exception). |

### Response Object Attributes
| Attribute / Method | Description |
|--------------------|-------------|
| `response.text` | Content of the response, in unicode. |
| `response.content` | Direct raw bytes of the response payload (for images/files). |
| `response.json()` | Parses the JSON response body into a Python dict/list. |
| `response.status_code`| Integer Code of the response (e.g. 200). |
| `response.ok` | Returns `True` if `status_code` is less than 400. |
| `response.headers` | A case-insensitive dictionary of the server response headers. |
| `response.raise_for_status()`| Raises an `HTTPError`, if one occurred (useful for crashing exactly when the server fails). |
