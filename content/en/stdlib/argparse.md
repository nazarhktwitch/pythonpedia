---
layout: layouts/base.njk
title: "argparse Module — Command-Line Parsing"
description: "Python argparse: parsing command-line options, arguments and sub-commands"
---

# argparse — Parser for command-line options and arguments

The `argparse` module makes it easy to write user-friendly command-line interfaces. The program defines what arguments it requires, and `argparse` will figure out how to parse those out of `sys.argv`.

```python
import argparse
```

## Basic Usage

```python
import argparse

# 1. Create parser
parser = argparse.ArgumentParser(description="Process some integers.")

# 2. Add arguments
parser.add_argument('integers', metavar='N', type=int, nargs='+',
                    help='an integer for the accumulator')
parser.add_argument('--sum', dest='accumulate', action='store_const',
                    const=sum, default=max,
                    help='sum the integers (default: find the max)')

# 3. Parse arguments
args = parser.parse_args()

# 4. Use arguments
print(args.accumulate(args.integers))
```

To run this script:
```bash
$ python script.py 1 2 3 4
4
$ python script.py 1 2 3 4 --sum
10
```

## Adding Arguments

```python
parser = argparse.ArgumentParser()

# Positional argument (required by default)
parser.add_argument("filename", help="Config file to read")

# Optional argument (starts with - or --)
parser.add_argument("-v", "--verbose", help="Increase output verbosity",
                    action="store_true") # Sets arg.verbose = True if present

# Optional with value
parser.add_argument("-o", "--output", help="Output file name")

# Type conversion
parser.add_argument("-p", "--port", type=int, default=8080, help="Port to bind")

# Choices
parser.add_argument("--mode", choices=['debug', 'prod', 'test'], default='prod')
```

## Sub-commands

```python
parser = argparse.ArgumentParser()
subparsers = parser.add_subparsers(dest='command', help='sub-command help')

# 'commit' command
parser_commit = subparsers.add_parser('commit', help='commit changes')
parser_commit.add_argument('-m', '--message', required=True, help='commit message')

# 'push' command
parser_push = subparsers.add_parser('push', help='push to remote')
parser_push.add_argument('remote', help='remote name')

args = parser.parse_args()
if args.command == 'commit':
    print(f"Committing: {args.message}")
elif args.command == 'push':
    print(f"Pushing to {args.remote}")
```

## Common Pitfalls

- **Confusing positional and optional arguments** — optional arguments start with `-`, positional do not.
- **Using `sys.argv` manually** — just let `argparse` handle it!

## Official Documentation

[argparse — Parser for command-line options](https://docs.python.org/3/library/argparse.html)


## API Reference

### Important Classes and Methods
| Method | Description |
|--------|-------------|
| `argparse.ArgumentParser(prog, description)`| Create a new ArgumentParser object. |
| `ArgumentParser.add_argument(name, ...)`| Define how a single command-line argument should be parsed. |
| `ArgumentParser.parse_args(args=None)`| Convert argument strings to objects and assign them as attributes of the namespace. |
| `ArgumentParser.add_subparsers()`| Add sub-command parsers (like `git clone`, `git commit`). |

### Common `add_argument` Parameters
| Parameter | Description |
|-----------|-------------|
| `action="store_true"` | Stores `True` if the flag is provided, otherwise `False`. |
| `type=int` | Automtically converts the input string to the specified type. |
| `choices=[...]` | Restricts the argument to a specific set of allowed values. |
| `required=True` | Makes an optional argument (e.g., `--name`) strictly required. |
