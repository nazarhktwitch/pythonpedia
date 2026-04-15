---
layout: layouts/base.njk
title: "asyncio Module — Async I/O"
description: "Python asyncio: async/await, tasks, event loop, coroutines"
---

# asyncio — Asynchronous I/O

The `asyncio` module provides infrastructure for writing concurrent code using `async`/`await` syntax.

```python
import asyncio
```

## Basic async/await

```python
import asyncio

async def say_hello():
    print("Hello")
    await asyncio.sleep(1)  # Non-blocking sleep
    print("World")

asyncio.run(say_hello())
```

## Running Multiple Coroutines

```python
import asyncio

async def fetch_data(name, delay):
    print(f"Fetching {name}...")
    await asyncio.sleep(delay)
    return f"{name} data"

async def main():
    # Run concurrently
    results = await asyncio.gather(
        fetch_data("users", 2),
        fetch_data("posts", 1),
        fetch_data("comments", 3)
    )
    print(results)  # All three complete in ~3 seconds, not 6

asyncio.run(main())
```

## Tasks

```python
import asyncio

async def background_task(name, interval):
    while True:
        print(f"{name}: tick")
        await asyncio.sleep(interval)

async def main():
    task1 = asyncio.create_task(background_task("A", 1))
    task2 = asyncio.create_task(background_task("B", 2))
    
    await asyncio.sleep(5)  # Let tasks run for 5 seconds
    
    task1.cancel()
    task2.cancel()

asyncio.run(main())
```

## Timeouts

```python
import asyncio

async def slow_operation():
    await asyncio.sleep(10)
    return "done"

async def main():
    try:
        result = await asyncio.wait_for(slow_operation(), timeout=3.0)
    except asyncio.TimeoutError:
        print("Operation timed out!")

asyncio.run(main())
```

## Async Context Managers and Iterators

```python
import asyncio

# Async context manager
class AsyncResource:
    async def __aenter__(self):
        print("Acquiring resource")
        return self
    
    async def __aexit__(self, *args):
        print("Releasing resource")

async def main():
    async with AsyncResource() as r:
        print("Using resource")

# Async iterator
async def countdown(n):
    while n > 0:
        yield n
        await asyncio.sleep(0.5)
        n -= 1

async def main2():
    async for num in countdown(5):
        print(num)
```

## Synchronization

```python
import asyncio

lock = asyncio.Lock()
semaphore = asyncio.Semaphore(3)  # Max 3 concurrent

async def safe_operation(name):
    async with lock:
        print(f"{name} has the lock")
        await asyncio.sleep(1)

async def limited_operation(name):
    async with semaphore:
        print(f"{name} running (max 3 at a time)")
        await asyncio.sleep(1)
```

## Common Pitfalls

- **Don't call `asyncio.run()` inside async code** — use `await` instead
- **`await asyncio.sleep()` ≠ `time.sleep()`** — `time.sleep` blocks everything
- **CPU-bound work blocks the event loop** — use `asyncio.to_thread()` (3.9+) or `ProcessPoolExecutor`
- **All coroutines must be awaited** — forgetting `await` returns a coroutine object, not the result

## Official Documentation

[asyncio — Asynchronous I/O](https://docs.python.org/3/library/asyncio.html)


## API Reference

### Important Functions
| Function | Description |
|----------|-------------|
| `asyncio.run(coro)` | Execute the coroutine `coro` and return the result. |
| `asyncio.create_task(coro)`| Wrap the coroutine `coro` into a Task and schedule its execution. |
| `asyncio.sleep(delay)` | Block for `delay` seconds. |
| `asyncio.gather(*aws)` | Run awaitable objects in the `aws` sequence concurrently. |
| `asyncio.wait_for(aw, timeout)`| Wait for the awaitable `aw` to complete with a timeout. |
