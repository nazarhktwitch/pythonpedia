---
layout: layouts/base.njk
title: "string Module — String Operations"
description: "Python string module: ASCII constants, punctuation, custom formatting"
---

# string — Common String Operations

Before Python 2.0, the `string` module accommodated many string-manipulation functions. Today, most of those functions are methods of the `str` object itself (like `string.join` becoming `''.join()`). 

However, the `string` module remains highly useful for its **Constants** (which save you from typing out `abcdefg...`) and the `Template` class.

```python
import string
```

## String Constants

When you need a list of letters or digits (e.g., for generating passwords or random tokens), never type them manually. Use these constants.

```python
import string
import random

print(string.ascii_lowercase) # 'abcdefghijklmnopqrstuvwxyz'
print(string.digits)          # '0123456789'
print(string.punctuation)     # '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'

# Generate a fast random 8-character password
chars = string.ascii_letters + string.digits
pwd = ''.join(random.choice(chars) for _ in range(8))
print(pwd)
```

## Template Strings

Template strings provide simpler string substitutions as described in PEP 292. They are sometimes preferred by users looking for a simpler formatting syntax than `%`-formatting or `.format()`/f-strings, especially for internationalization (i18n) where complex f-string syntax might confuse translators.

```python
from string import Template

s = Template('$who likes $what')
result = s.substitute(who='Tim', what='kung pao')

print(result) # 'Tim likes kung pao'
```

---

## API Reference

### Constants
| Constant | Value description |
|----------|-------------------|
| `string.ascii_letters` | The concatenation of ascii_lowercase and ascii_uppercase. |
| `string.ascii_lowercase` | The lowercase letters 'abcdefghijklmnopqrstuvwxyz'. |
| `string.ascii_uppercase` | The uppercase letters 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'. |
| `string.digits` | The string '0123456789'. |
| `string.hexdigits` | The string '0123456789abcdefABCDEF'. |
| `string.octdigits` | The string '01234567'. |
| `string.punctuation` | String of ASCII characters which are considered punctuation characters in the C locale. |
| `string.printable` | A string of characters which are considered printable (letters, digits, punctuation, and whitespace). |
| `string.whitespace` | A string containing all ASCII characters that are considered whitespace (`space`, `tab`, `linefeed`, `return`, `formfeed`, and `vertical tab`). |

### Classes
| Class | Description |
|-------|-------------|
| `string.Template(template)`| Class for creating safe string templates using `$`-based substitutions (similar to bash variables). |
| `string.Formatter` | Implements the same layout and capabilities as the built-in `str.format()` method, allowing custom formatting syntax. |
