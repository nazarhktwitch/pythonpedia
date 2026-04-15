---
layout: layouts/base.njk
title: "time Module — Time Access and Conversions"
description: "Comprehensive guide to the Python time module: clocks, timestamps, struct_time, parsing, and performance measuring."
---

# time — Time access and conversions

The `time` module provides various time-related functions. While the `datetime` module is generally preferred for object-oriented date and time manipulation, the `time` module remains essential for lower-level time operations, performance measurement, and interacting with the operating system's time facilities.

```python
import time
```

## Terminology and Core Concepts

Before diving into the functions, it's crucial to understand the concepts the `time` module relies on:

1.  **The Epoch**: The point where time begins according to the system. On Unix and Windows systems, the epoch is **January 1, 1970, 00:00:00 (UTC)**. You can find out what the epoch is on your system by looking at `time.gmtime(0)`.
2.  **Unix Timestamp (Seconds since the epoch)**: A floating-point number representing the total number of seconds that have elapsed since the epoch.
3.  **UTC (Coordinated Universal Time)**: The primary time standard by which the world regulates clocks and time (formerly GMT).
4.  **Local Time**: Time relative to a specific timezone.
5.  **DST (Daylight Saving Time)**: An adjustment of the timezone by an hour during a portion of the year.

## The `struct_time` Class

Many functions in this module return or accept a `time.struct_time` object. This represents time as a tuple of 9 integers, making it easy to access specific components like the year or minute.

| Index | Attribute | Values |
|-------|-----------|--------|
| 0 | `tm_year` | e.g. 2024 |
| 1 | `tm_mon` | 1 to 12 |
| 2 | `tm_mday` | 1 to 31 |
| 3 | `tm_hour` | 0 to 23 |
| 4 | `tm_min` | 0 to 59 |
| 5 | `tm_sec` | 0 to 61 (60/61 are leap seconds) |
| 6 | `tm_wday` | 0 to 6 (0 is Monday) |
| 7 | `tm_yday` | 1 to 366 (Day of the year) |
| 8 | `tm_isdst` | -1, 0, 1 (Summer time flag) |

Example:
```python
import time
t = time.localtime()
print(f"Year: {t.tm_year}, Month: {t.tm_mon}, Day: {t.tm_mday}")
```

## Getting the Current Time

### 1. `time.time()` and `time.time_ns()`

Returns the current time in seconds since the Epoch as a floating-point number.

```python
import time

timestamp = time.time()
print(f"Seconds since epoch: {timestamp}") # e.g., 1705324500.123456

# In Python 3.7+, you can get nanoseconds as an integer
# This avoids floating-point precision loss
nanoseconds = time.time_ns()
print(f"Nanoseconds: {nanoseconds}")
```

### 2. `time.localtime([secs])` and `time.gmtime([secs])`

Convert a timestamp (seconds since the epoch) to a `struct_time`.

*   `localtime()` converts to the local timezone.
*   `gmtime()` converts to UTC.

```python
import time

# Get struct_time for right now (local)
local = time.localtime()
print(f"Local time: {local.tm_hour}:{local.tm_min}")

# Get struct_time for UTC
utc = time.gmtime()
print(f"UTC time: {utc.tm_hour}:{utc.tm_min}")

# Convert a specific timestamp
specific_time = time.localtime(1000000000) # Sept 9, 2001
```

## Pausing Execution: `time.sleep()`

The `time.sleep(secs)` function suspends the execution of the current thread for the given number of seconds. The argument may be a floating-point number to indicate a more precise sleep time.

```python
import time

print("Loading...")
time.sleep(2.5)  # Pause for 2.5 seconds
print("Done!")
```
*Note: The actual suspension time may be less or more than requested due to the scheduling of the operating system.*

## High-Precision Clocks for Performance Measurement

When measuring the performance of your code, **do not use `time.time()`**. System clocks can be synchronized entirely (e.g., via NTP) which might cause time to jump backwards or forwards, ruining your measurements. Instead, use the specialized performance clocks.

### 1. `time.perf_counter()` (Recommended for benchmarking)

A clock with the highest available resolution to measure a short duration. It does include time elapsed during sleep and is system-wide.

```python
import time

start_time = time.perf_counter()

# Expensive operation
total = sum(i * i for i in range(10_000_000))

end_time = time.perf_counter()
print(f"Operation took {end_time - start_time:.4f} seconds")
```

### 2. `time.process_time()`

Returns the sum of the system and user CPU time of the current process. It does **not** include time elapsed during sleep. Useful for profiling CPU usage exclusively.

```python
import time

start = time.process_time()
time.sleep(2) # This time is NOT counted!
end = time.process_time()

print(f"CPU time used: {end - start:.4f} seconds") # Near 0.0000
```

### 3. `time.monotonic()`

A clock that cannot go backwards (monotonic). It is not affected by system clock updates. Useful for measuring timeouts and deadlines.

## Formatting and Parsing Time

### 1. `time.strftime(format, t)`

Converts a `struct_time` (or tuple) `t` to a string as specified by the `format` argument.

```python
import time

t = time.localtime()

# "2024-01-15 14:30:00"
formatted = time.strftime("%Y-%m-%d %H:%M:%S", t)
print(formatted)

# "Monday, 15 January 2024"
pretty = time.strftime("%A, %d %B %Y", t)
print(pretty)
```

**Common Format Directives:**
*   `%Y`: Year with century (e.g., 2024)
*   `%y`: Year without century (00..99)
*   `%m`: Month as zero-padded number (01..12)
*   `%B`: Full month name (locale dependent)
*   `%d`: Day of the month (01..31)
*   `%H`: Hour (24-hour clock) (00..23)
*   `%I`: Hour (12-hour clock) (01..12)
*   `%M`: Minute (00..59)
*   `%S`: Second (00..59)
*   `%p`: Locale's equivalent of AM or PM

### 2. `time.strptime(string, format)`

The inverse of `strftime`. Parses a string representing a time according to a format and returns a `struct_time`.

```python
import time

time_string = "21 June, 2018"
result = time.strptime(time_string, "%d %B, %Y")

print(result.tm_year) # 2018
print(result.tm_mon)  # 6
```

### 3. Converting Structs to Timestamps: `time.mktime(t)`

The inverse of `localtime()`. Takes a `struct_time` representing local time and converts it into a floating-point Unix timestamp.

```python
import time

t = time.strptime("2024-01-01 00:00:00", "%Y-%m-%d %H:%M:%S")
timestamp = time.mktime(t)
print(timestamp) # e.g., 1704067200.0
```

## Timezones (`time.tzset()`)

On Unix systems, you can dynamically change the timezone rules by setting the `TZ` environment variable and calling `time.tzset()`.

```python
import os
import time

# Remember original time
print(time.strftime('%X %x %Z'))

# Switch to New York time (Unix environments)
os.environ['TZ'] = 'America/New_York'
try:
    time.tzset()
    print("In New York:", time.strftime('%X %x %Z'))
except AttributeError:
    print("time.tzset() is not available on this platform (e.g., Windows)")
```

## Summary of Conversion Functions

Here is a quick cheat-sheet map of how to convert between the different time representations:

*   **Timestamp → Local Struct**: `time.localtime(ts)`
*   **Timestamp → UTC Struct**: `time.gmtime(ts)`
*   **Local Struct → Timestamp**: `time.mktime(t)`
*   **UTC Struct → Timestamp**: Use `calendar.timegm(t)` (from the `calendar` module)
*   **Struct → String**: `time.strftime(fmt, t)`
*   **String → Struct**: `time.strptime(string, fmt)`

## Official Documentation

For the full list of format codes and platform-specific behavior, consult the official documentation:
[time — Time access and conversions](https://docs.python.org/3/library/time.html)
