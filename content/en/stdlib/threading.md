---
layout: layouts/base.njk
title: "threading Module — Thread-based Parallelism"
description: "Comprehensive guide to Python threading: the GIL, Locks, Semaphores, Events, daemon threads, and ThreadPoolExecutor."
---

# threading — Thread-based parallelism

The `threading` module executes multiple operations concurrently within the same program space. Threads are lighter than processes, share the same memory space, and are ideal for writing programs that perform multiple I/O-bound tasks at once.

```python
import threading
```

## Understanding the GIL (Crucial Concept)

Before using `threading`, you must understand the **Global Interpreter Lock (GIL)** in CPython (the standard implementation of Python). 

The GIL acts as a global mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes at once. 
*   **What this means:** Even if you have an 8-core processor and create 8 threads, **only one thread runs Python code at any given exact microsecond**.
*   **When to use `threading`:** I/O-bound tasks. This includes HTTP requests, reading from disk, database queries, and waiting for user input. While one thread waits for a network response, the GIL is released, and another thread can run.
*   **When NOT to use `threading`:** CPU-bound tasks. Heavy mathematics, image processing, or big data parsing in pure Python will not speed up with `threading` (and might even slow down due to thread-switching overhead). Use the `multiprocessing` module instead.

## 1. Creating and Managing Threads

The most basic way to use threads is to define a target function and instantiate a `Thread` object.

```python
import threading
import time

def download_file(filename, delay):
    print(f"[Start] Downloading {filename}...")
    time.sleep(delay) # Simulate network IO
    print(f"[Finish] {filename} downloaded!")

# 1. Create thread objects
t1 = threading.Thread(target=download_file, args=("file1.zip", 2))
t2 = threading.Thread(target=download_file, args=("file2.zip", 1))

# 2. Start the threads (places them in the OS scheduler queue)
t1.start()
t2.start()

print("Main program continues immediately without waiting...")

# 3. Join the threads (Wait for them to finish)
# Without join(), the main program could exit before threads finish
t1.join()
t2.join()

print("All downloads complete!")
```

### Subclassing `Thread`

For complex threading behavior, you can subclass `threading.Thread` and override the `run()` method.

```python
import threading
import time

class FileDownloader(threading.Thread):
    def __init__(self, filename, delay):
        super().__init__() # CRITICAL: You must call init of the superclass
        self.filename = filename
        self.delay = delay
        
    def run(self):
        # This replaces the 'target' argument
        print(f"Subclass thread downloading {self.filename}")
        time.sleep(self.delay)

worker = FileDownloader("data.csv", 1.5)
worker.start()
worker.join()
```

## 2. Daemon Threads

By default, the main Python program will not exit until all non-daemon threads have completed. Sometimes, you want background tasks (like memory monitoring, heartbeat signals, or background cleanup) that simply die when the main program stops. These are **Daemon** threads.

```python
import threading
import time

def heartbeat():
    while True:
        print("<Heartbeat ping>")
        time.sleep(1)

# Set daemon=True during creation
monitor = threading.Thread(target=heartbeat, daemon=True)
monitor.start()

time.sleep(3.5)
print("Main thread exiting. The monitor will be forcefully killed now.")
```

## 3. Synchronization Primitives

Because threads share the same memory, chaos ensues if two threads try to modify the same variable simultaneously. This is called a **Race Condition**. `threading` provides several primitives to control access.

### The Lock (Mutex)

A `Lock` guarantees that only one thread can execute a block of code at a time.

```python
import threading

balance = 0
lock = threading.Lock()

def add_funds():
    global balance
    for _ in range(100_000):
        # BEST PRACTICE: Use context managers (with) to ensure the lock is 
        # always released, even if an exception occurs inside the block
        with lock:
            balance += 1
            
        # The above is equivalent to:
        # lock.acquire()
        # try:
        #     balance += 1
        # finally:
        #     lock.release()

threads = [threading.Thread(target=add_funds) for _ in range(10)]
for t in threads: t.start()
for t in threads: t.join()

print(f"Final Balance: {balance}") # Guaranteed to be exactly 1,000,000
```

### Reentrant Locks (RLock)

A standard `Lock` will block if the same thread tries to acquire it twice. An `RLock` allows a single thread to acquire the lock multiple times (recursively) without deadlocking itself. It must be released the same number of times it was acquired. Useful for recursive functions.

### Semaphore

A `Semaphore` is like a lock, but it allows a specific number of threads to proceed. Perfect for rate-limiting or limiting concurrent connections to a database or API.

```python
import threading
import time

# Allow maximum 3 concurrent connections
api_semaphore = threading.Semaphore(3)

def fetch_api(user_id):
    print(f"User {user_id} waiting to connect...")
    with api_semaphore:
        print(f"User {user_id} -> Connected! Processing...")
        time.sleep(2)
        print(f"User {user_id} <- Disconnected.")

for i in range(1, 8):
    threading.Thread(target=fetch_api, args=(i,)).start()
# You will see them process in batches of 3
```

### Event

An `Event` acts as a flag for communication between threads. One thread signals an event, and other threads wait for it.

```python
import threading
import time

event = threading.Event()

def task_waiter(name):
    print(f"{name} waiting for the green light...")
    event.wait() # Pauses thread until event is set
    print(f"{name} GO GO GO!")

def task_signaler():
    time.sleep(2)
    print("Signaler: Setting the event to True!")
    event.set()

threading.Thread(target=task_waiter, args=("Car 1",)).start()
threading.Thread(target=task_waiter, args=("Car 2",)).start()
threading.Thread(target=task_signaler).start()
```

## 4. Modern Approach: ThreadPoolExecutor

Managing individual `Thread` objects, keeping track of them, and gathering their return values is tedious. The `concurrent.futures` module provides the `ThreadPoolExecutor`, which abstract all of this management away into a "pool" of reusable threads.

**This is the officially recommended way to do threading in modern Python code.**

```python
import concurrent.futures
import time

def fetch_content(page_num):
    time.sleep(1) # Simulate slow network
    return f"Content of page {page_num}"

# The context manager ensures threads are properly cleaned up
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
    
    # Example 1: Submit individual tasks and get Future objects
    future1 = executor.submit(fetch_content, 1)
    future2 = executor.submit(fetch_content, 2)
    
    print("Task 1:", future1.result()) # result() is a blocking call
    
    # Example 2: The map() method (Best for processing huge lists)
    pages_to_fetch = [3, 4, 5, 6, 7]
    
    # maps the function to the iterable, assigning the work to the thread pool
    results = executor.map(fetch_content, pages_to_fetch)
    
    for res in results:
        print(res)
```

## Threading vs Asyncio

Python offers two prominent ways to handle concurrent I/O task: `threading` and `asyncio`.
*   **Threading:** The operating system preemptively switches between threads. Easy to apply to legacy synchronous code (like `requests` or standard database drivers). Downside: Harder to debug, prone to race conditions, heavier memory footprint.
*   **Asyncio:** Cooperative multitasking. Code explicitly yields control via `await`. Harder to integrate into legacy codebases because every function in the chain must natively support async. Downside: If a library doesn't support async, it will block the entire event loop.

## Official Documentation

[threading — Thread-based parallelism](https://docs.python.org/3/library/threading.html)
