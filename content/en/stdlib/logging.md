---
layout: layouts/base.njk
title: "logging Module — Application Logging"
description: "Python logging: loggers, handlers, formatters, log levels"
---

# logging — Logging Facility

```python
import logging
```

## Basic Usage

```python
import logging

logging.basicConfig(level=logging.DEBUG)

logging.debug("Debug message")      # Detailed diagnostic info
logging.info("Info message")        # Confirmation things work
logging.warning("Warning message")  # Something unexpected
logging.error("Error message")      # Serious problem
logging.critical("Critical!")       # Program may crash
```

## Configuring Output

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
    filename='app.log',  # Log to file (omit for console)
    filemode='a'         # 'a' = append, 'w' = overwrite
)
```

## Named Loggers

```python
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# Console handler
console = logging.StreamHandler()
console.setLevel(logging.INFO)
console.setFormatter(logging.Formatter('%(name)s - %(levelname)s - %(message)s'))
logger.addHandler(console)

# File handler
file_handler = logging.FileHandler('debug.log')
file_handler.setLevel(logging.DEBUG)
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(message)s'))
logger.addHandler(file_handler)

logger.info("This goes to console AND file")
logger.debug("This goes to file only")
```

## Log Levels

| Level | Value | Usage |
|-------|-------|-------|
| DEBUG | 10 | Detailed diagnostic |
| INFO | 20 | Normal operation confirmation |
| WARNING | 30 | Something unexpected (default) |
| ERROR | 40 | Serious problem |
| CRITICAL | 50 | Program may crash |

## Exception Logging

```python
import logging

try:
    result = 1 / 0
except ZeroDivisionError:
    logging.error("Division failed", exc_info=True)
    # or
    logging.exception("Division failed")  # Same, always includes traceback
```

## Common Pitfalls

- **`basicConfig` only works once** — call it before any logging
- **Root logger vs named loggers** — use `getLogger(__name__)` in modules
- **Don't use `print()` for logging** — use `logging` module for production code

## Official Documentation

[logging — Logging facility for Python](https://docs.python.org/3/library/logging.html)


## API Reference

### Configuration
| Function | Description |
|----------|-------------|
| `logging.basicConfig(**kwargs)`| Basic configuration for the logging system. Sets root logger formatting and handlers. |
| `logging.getLogger(name=None)` | Return a logger with the specified name or the root logger. |

### Log Levels Methods
| Method | Description |
|--------|-------------|
| `logger.debug(msg)` | Logs a message with level `DEBUG`. |
| `logger.info(msg)` | Logs a message with level `INFO`. |
| `logger.warning(msg)` | Logs a message with level `WARNING`. |
| `logger.error(msg)` | Logs a message with level `ERROR`. |
| `logger.critical(msg)` | Logs a message with level `CRITICAL`. |
| `logger.exception(msg)` | Logs an ERROR level message with the current exception traceback. |

### Handlers
| Handler | Description |
|---------|-------------|
| `logging.StreamHandler` | Sends logging output to streams such as `sys.stdout` or `sys.stderr`. |
| `logging.FileHandler` | Sends logging output to a disk file. |
