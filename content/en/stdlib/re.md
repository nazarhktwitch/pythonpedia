---
layout: layouts/base.njk
title: "re Module — Regular Expressions"
description: "Python re module: pattern matching, search, replace with regex"
---

# re — Regular Expressions

The `re` module provides regular expression matching operations for pattern searching, validation, and text manipulation.

```python
import re
```

## Basic Matching

```python
import re

# Search for pattern anywhere in string
match = re.search(r'\d+', 'Age: 25 years')
if match:
    print(match.group())  # '25'
    print(match.start())  # 5
    print(match.end())    # 7

# Match at beginning of string
match = re.match(r'Hello', 'Hello World')
if match:
    print(match.group())  # 'Hello'

# Full string match
match = re.fullmatch(r'\d{3}-\d{4}', '123-4567')
```

## Finding All Matches

```python
import re

text = "Call 555-1234 or 555-5678"

# Find all matches
numbers = re.findall(r'\d{3}-\d{4}', text)
print(numbers)  # ['555-1234', '555-5678']

# Find with groups
pairs = re.findall(r'(\d{3})-(\d{4})', text)
print(pairs)  # [('555', '1234'), ('555', '5678')]

# Iterator of match objects
for m in re.finditer(r'\d{3}-\d{4}', text):
    print(f"Found {m.group()} at position {m.start()}")
```

## Substitution

```python
import re

text = "Hello World"

# Simple replace
result = re.sub(r'World', 'Python', text)
print(result)  # 'Hello Python'

# Replace with function
def double(match):
    return str(int(match.group()) * 2)

re.sub(r'\d+', double, 'Price: 10, Tax: 5')
# 'Price: 20, Tax: 10'

# Limit replacements
re.sub(r'\d+', 'X', '1 2 3 4', count=2)
# 'X X 3 4'
```

## Splitting

```python
import re

# Split by pattern
re.split(r'[,;\s]+', 'one, two; three four')
# ['one', 'two', 'three', 'four']

# Split with limit
re.split(r'\s+', 'a b c d', maxsplit=2)
# ['a', 'b', 'c d']
```

## Common Patterns

```python
import re

# Email validation
email_pattern = r'^[\w.-]+@[\w.-]+\.\w{2,}$'
re.match(email_pattern, 'user@example.com')  # Match

# URL
url_pattern = r'https?://[\w.-]+(?:/[\w.-]*)*'

# Phone number
phone_pattern = r'\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'

# IP address
ip_pattern = r'\b(?:\d{1,3}\.){3}\d{1,3}\b'
```

## Compiled Patterns

```python
import re

# Compile for reuse (faster in loops)
pattern = re.compile(r'\b\w+@\w+\.\w+\b', re.IGNORECASE)
emails = pattern.findall('Contact us at info@site.com or help@site.com')
```

## Pattern Syntax Quick Reference

| Pattern | Meaning |
|---------|---------|
| `.` | Any character (except newline) |
| `\d` | Digit `[0-9]` |
| `\w` | Word character `[a-zA-Z0-9_]` |
| `\s` | Whitespace |
| `*` | 0 or more |
| `+` | 1 or more |
| `?` | 0 or 1 |
| `{n,m}` | n to m repetitions |
| `^` / `$` | Start / end of string |
| `[abc]` | Character class |
| `(...)` | Capture group |
| `(?:...)` | Non-capturing group |
| `\b` | Word boundary |

## Flags

```python
re.IGNORECASE  # Case-insensitive matching (re.I)
re.MULTILINE   # ^ and $ match line boundaries (re.M)
re.DOTALL      # . matches newline too (re.S)
re.VERBOSE     # Allow comments in pattern (re.X)

# Combine flags
pattern = re.compile(r"""
    \d{3}   # area code
    [-.]    # separator
    \d{4}   # number
""", re.VERBOSE)
```

## Common Pitfalls

- **Greedy vs lazy** — `.*` is greedy, `.*?` is lazy (minimal match)
- **Raw strings** — always use `r'pattern'` to avoid backslash issues
- **`match` vs `search`** — `match` only checks the beginning of string
- **Catastrophic backtracking** — nested quantifiers like `(a+)+` can hang

## Official Documentation

[re — Regular expression operations](https://docs.python.org/3/library/re.html)


## API Reference

### Important Functions
| Function | Description |
|----------|-------------|
| `re.compile(pattern, flags=0)` | Compile a regular expression pattern into a regular expression object. |
| `re.search(pattern, string, flags=0)` | Scan through string looking for the first location where pattern produces a match. |
| `re.match(pattern, string, flags=0)` | Determine if the RE matches at the beginning of the string. |
| `re.fullmatch(pattern, string, flags=0)` | Determine if the RE matches the entire string. |
| `re.split(pattern, string, maxsplit=0, flags=0)`| Split string by the occurrences of pattern. |
| `re.findall(pattern, string, flags=0)` | Return all non-overlapping matches of pattern in string, as a list of strings. |
| `re.sub(pattern, repl, string, count=0, flags=0)`| Return the string obtained by replacing the leftmost non-overlapping occurrences of pattern. |

### Match Object Attributes
| Attribute/Method | Description |
|------------------|-------------|
| `Match.group([group1, ...])` | Returns one or more subgroups of the match. |
| `Match.groups()` | Return a tuple containing all the subgroups of the match. |
| `Match.start([group])` | Return the indices of the start of the substring matched by group. |
| `Match.end([group])` | Return the indices of the end of the substring matched by group. |
| `Match.span([group])` | Return a 2-tuple `(m.start(group), m.end(group))`. |
