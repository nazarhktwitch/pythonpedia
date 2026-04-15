---
layout: layouts/base.njk
title: "multiprocessing Module — Process-based Parallelism"
description: "Python multiprocessing: bypassing the GIL, Process, Pool, parallel execution"
---

# multiprocessing — Process-based parallelism

The `multiprocessing` module allows you to write concurrent programs that bypass the Global Interpreter Lock (GIL) by using subprocesses instead of threads. This makes it ideal for CPU-bound tasks.

```python
import multiprocessing
```

## Basic Process

```python
import multiprocessing
import time

def calculate_square(number):
    print(f"Square of {number}: {number * number}")
    time.sleep(1)

# MUST be protected with if __name__ == '__main__': (especially on Windows)
if __name__ == '__main__':
    # 1. Create a process
    p = multiprocessing.Process(target=calculate_square, args=(10,))
    
    # 2. Start the process
    p.start()
    print("Main process doing other things...")
    
    # 3. Wait for process to finish
    p.join()
    print("Done!")
```

## The Pool Class (Recommended)

For executing functions concurrently across multiple CPU cores, `Pool` is the easiest and most effective way.

```python
import multiprocessing
import time

def heavy_computation(x):
    # Simulate heavy work
    time.sleep(1)
    return x * x

if __name__ == '__main__':
    data = [1, 2, 3, 4, 5, 6, 7, 8]
    
    start = time.time()
    
    # Automatically creates as many processes as you have CPU cores
    with multiprocessing.Pool() as pool:
        # Blocks until all processes finish
        results = pool.map(heavy_computation, data)
        
    print(results)  # [1, 4, 9, 16, 25, 36, 49, 64]
    print(f"Time taken: {time.time() - start:.2f} seconds")
```

## Sharing State: Queue

Because processes have independent memory spaces, you cannot share standard global variables. You must use `multiprocessing.Queue` to send data between them.

```python
import multiprocessing

def square_list(numbers, q):
    for n in numbers:
        q.put(n * n)

if __name__ == '__main__':
    numbers = [2, 3, 4]
    q = multiprocessing.Queue()
    
    p = multiprocessing.Process(target=square_list, args=(numbers, q))
    p.start()
    p.join()
    
    while not q.empty():
        print(q.get()) # Prints 4, 9, 16
```

## ProcessPoolExecutor (Modern Approach)

Introduced in `concurrent.futures`, this is the modern equivalent to `Pool`.

```python
import concurrent.futures
import math

def is_prime(n):
    if n < 2: return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0: return False
    return True

if __name__ == '__main__':
    numbers = [10**12 + 39, 10**12 + 61, 10**12 + 63, 10**12 + 91]
    
    with concurrent.futures.ProcessPoolExecutor() as executor:
        results = list(executor.map(is_prime, numbers))
        
    print(results)
```

## Common Pitfalls

- **Missing `if __name__ == '__main__':`** — This is strictly required on Windows to prevent recursive child process creation.
- **Passing unpicklable arguments** — Data sent between processes must be picklable (no open files, sockets, etc.).
- **Overhead** — Starting a process takes significant time/memory. Use it only for slow tasks where the computation takes longer than the process creation overhead.

## Official Documentation

[multiprocessing — Process-based parallelism](https://docs.python.org/3/library/multiprocessing.html)


## API Reference

### Process and Pool
| Class | Description |
|-------|-------------|
| `multiprocessing.Process`| Process objects represent activity that is run in a separate process. Takes `target` and `args`. |
| `multiprocessing.Pool`| A process pool object which controls a pool of worker processes to which jobs can be submitted. |

### Pool Methods
| Method | Description |
|--------|-------------|
| `Pool.map(func, iterable)`| A parallel equivalent of the map() built-in function. Blocks until result is ready. |
| `Pool.apply_async(func, args)`| Execution of func happens asynchronously without blocking. |
| `Pool.close()`| Prevents any more tasks from being submitted to the pool. |
| `Pool.join()`| Wait for the worker processes to exit. Must call `close()` or `terminate()` first. |

### Inter-process Communication
| Class | Description |
|-------|-------------|
| `multiprocessing.Queue`| A thread and process safe FIFO queue. |
| `multiprocessing.Pipe`| Returns a pair `(conn1, conn2)` representing the ends of a pipe. |
| `multiprocessing.Lock`| A non-recursive lock object. |
