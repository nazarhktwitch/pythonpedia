---
layout: layouts/base.njk
title: "subprocess Module — Spawn Process"
description: "Python subprocess: running external commands, capturing output, pipes"
---

# subprocess — Subprocess Management

The `subprocess` module allows you to spawn new processes, connect to their input/output/error pipes, and obtain their return codes.

```python
import subprocess
```

## run() — The Recommended Approach

The `subprocess.run()` function was added in Python 3.5 and is the recommended way to invoke subprocesses.

```python
import subprocess

# Run a simple command
subprocess.run(["ls", "-l"])  # Prints output directly to console

# Capture output (stdout and stderr)
result = subprocess.run(["echo", "Hello World"], capture_output=True, text=True)

print(result.stdout)        # "Hello World\n"
print(result.returncode)    # 0 (success)
```

## Checking for Errors

```python
import subprocess

# check=True raises CalledProcessError if the command fails (return code != 0)
try:
    subprocess.run(["ls", "non_existent_file"], check=True, capture_output=True)
except subprocess.CalledProcessError as e:
    print(f"Command failed with code {e.returncode}")
    print(f"Error output: {e.stderr}")
```

## Passing Input to a Command

```python
import subprocess

result = subprocess.run(
    ["grep", "python"],
    input="I love python\nI love ruby\npython is great",
    text=True,
    capture_output=True
)
print(result.stdout)
# I love python
# python is great
```

## Popen — Advanced Interface

For more complex use cases (like background processes or streaming data), use the `Popen` class directly.

```python
import subprocess

# Start process without blocking
process = subprocess.Popen(["sleep", "10"])
print("Process is running in background...")

# Wait for it to finish
process.wait()
print("Process finished!")
```

## Shell Injection Warning

> **Security Warning:** Avoid using `shell=True` if you are taking input from untrusted sources, as it is vulnerable to shell injection attacks!

```python
import subprocess

user_input = "file.txt; rm -rf /" # Attack!

# SAFE: arguments are passed as a list, shell doesn't interpret them
subprocess.run(["cat", user_input]) 

# DANGEROUS: shell=True will execute the malicious command!
# subprocess.run(f"cat {user_input}", shell=True) 
```

## Common Pitfalls

- **Using `os.system()`** — deprecated, always use `subprocess.run()`.
- **String commands vs Lists** — always prefer passing commands as a list of strings `["git", "status"]` rather than a single string `"git status"`.
- **Forgetting `text=True`** — without it, `stdout` and `stderr` will return bytes (`b'output'`) instead of a string.

## Official Documentation

[subprocess — Subprocess management](https://docs.python.org/3/library/subprocess.html)


## API Reference

### Core Functions and Classes
| Function/Class | Description |
|----------------|-------------|
| `subprocess.run(args, *, capture_output=False, check=False, text=False)`| Run the command described by args. Wait for command to complete, then return a `CompletedProcess` instance. |
| `subprocess.CompletedProcess` | The return value from `run()`, representing a process that has finished. |
| `subprocess.Popen(args)`| Underlying class for executing child programs in a new process. Used for full control over streaming IO. |

### `CompletedProcess` Attributes
| Attribute | Description |
|-----------|-------------|
| `args` | The arguments used to launch the process (list or string). |
| `returncode` | Exit status of the child process (0 usually means success). |
| `stdout` | Captured stdout from the child process (bytes or string). |
| `stderr` | Captured stderr from the child process. |
