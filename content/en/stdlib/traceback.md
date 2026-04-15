---
layout: layouts/base.njk
title: "traceback Module — Print or Retrieve Stack Traces"
description: "Python traceback module: extract and format stack traces of exceptions."
---

# traceback — Print or retrieve a stack trace

This module provides a standard interface to extract, format and print stack traces of Python programs. It exactly mimics the behavior of the Python interpreter when it prints a stack trace. This is incredibly useful when you want to catch an exception, log its full trace, but NOT crash your program.

```python
import traceback
```

## Printing Tracebacks without Crashing

Normally, uncaught exceptions crash the program and print a traceback to the console. If you wrap code in a `try...except` block to prevent a crash, the traceback is usually lost. The `traceback` module fixes this:

```python
import traceback

def risky_function():
    return 1 / 0

try:
    risky_function()
except Exception as e:
    print("Oh no, an error occurred, but the program continues!")
    
    # 1. Print the RED traceback to the console (sys.stderr)
    traceback.print_exc()

print("Program is still running here...")
```

## Extracting Tracebacks as Strings

If you want to save the traceback to a database, send it via email to a developer, or log it securely to a file (instead of just printing it), you can format it into a standard string.

```python
import traceback
import sys

try:
    risky_function()
except Exception as e:
    # 2. Get the traceback as a massive string
    error_string = traceback.format_exc()
    
    # Now you can save it anywhere!
    with open('error_log.txt', 'a') as f:
        f.write("\n--- ERROR ---\n")
        f.write(error_string)
```

---

## API Reference

### Important Functions
| Function | Description |
|----------|-------------|
| `traceback.print_exc(limit=None, file=None)`| This is a shorthand for `print_exception(sys.exc_info())`. It prints the exception information and stack trace to standard error (or to `file`). |
| `traceback.format_exc(limit=None)`| This is like `print_exc()` but returns a string instead of printing to a file. |
| `traceback.print_stack(f=None, limit=None, file=None)`| Print a stack trace from its invocation point (where the function is called) up to the top. Useful to find "How did the code get here?". |
| `traceback.format_stack(f=None, limit=None)`| Similar to `print_stack()`, but returns a list of strings instead of printing. |
| `traceback.extract_tb(tb, limit=None)`| Return a `StackSummary` object representing a list of "pre-processed" stack trace entries extracted from the traceback object `tb`. Useful for highly customized parsing. |
