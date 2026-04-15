---
layout: layouts/base.njk
title: "Code Standards"
description: "Python code style guides, PEP 8, and formatters."
---

# Python Code Standards

Adhering to community code standards ensures that your code is readable, maintainable, and uniform regardless of who wrote it. In Python, "The Zen of Python" and PEP 8 are the foundational documents of the ecosystem.

## PEP 8 — Style Guide for Python Code

[PEP 8](https://peps.python.org/pep-0008/) is the official style guide for Python. It covers indentation, line limits, and naming conventions. 

**Key rules:**
1. **Indentation:** Use 4 spaces per indentation level. Do not use tabs.
2. **Line Length:** Limit all lines to a maximum of 79 characters (or 88 characters if using modern formatters like Black).
3. **Blank Lines:** Surround top-level function and class definitions with two blank lines. Method definitions inside a class are surrounded by a single blank line.
4. **Imports:** Imports should be on separate lines. They should be grouped in the following order: standard library, related third party, local application.
5. **Naming Conventions:**
    - Classes: `CamelCase` 
    - Functions and Variables: `snake_case`
    - Constants: `UPPER_CASE_SNAKE`

## PEP 257 — Docstring Conventions

Docstrings are string literals that occur as the first statement in a module, function, class, or method definition.

```python
def fetch_data(url: str, timeout: int = 10):
    """
    Fetch data from a specified URL.

    Args:
        url (str): The target server endpoint.
        timeout (int): Rejection timeout in seconds.

    Returns:
        The raw bytes content of the response.
    """
    pass
```

## Automated Formatters (The Modern Approach)

Writing PEP8-compliant code manually is tedious. Today, virtually all professional Python teams rely on automated formatters.

### Black
**"The Uncompromising Code Formatter"**
Black is a deterministic formatter that reformats your entire file into a strict, standardized layout (using an 88-character length limit, standardizing quotes, etc.).
```bash
pip install black
black my_script.py
```

### isort
`isort` automatically sorts your imports alphabetically, and automatically separates them into standard library, third-party, and first-party sections.
```bash
pip install isort
isort my_script.py
```

### Flake8 & Ruff
**Linters** do not change your code; they analyze it for conceptual errors, unused imports, missing variables, or overly complex functions.
- `flake8`: The classical standard linter.
- `ruff`: An extremely fast Rust-based linter that replaces flake8, isort, and other tools all at once. Highly recommended for modern projects.

## Clean Code Principles
1. **Meaningful Names:** Variable names should reveal their intent (`elapsed_time_in_days` instead of `d`).
2. **Functions Should Do One Thing:** If your function contains the word "and" in its name or description, it probably does too much.
3. **Fail Fast:** Validate inputs and raise Exceptions early rather than relying on nested if-statements.
