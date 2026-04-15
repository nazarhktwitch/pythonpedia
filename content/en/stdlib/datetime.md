---
layout: layouts/base.njk
title: "datetime Module — Dates and Times"
description: "Python datetime module: date, time, timedelta, formatting and parsing"
---

# datetime — Date and Time

The `datetime` module provides classes for working with dates, times, and time intervals.

```python
from datetime import datetime, date, time, timedelta
```

## Current Date and Time

```python
from datetime import datetime, date

now = datetime.now()
print(now)  # 2024-01-15 10:30:45.123456

today = date.today()
print(today)  # 2024-01-15

# UTC time
utc_now = datetime.utcnow()
```

## Creating Date/Time Objects

```python
from datetime import datetime, date, time

# Specific date
d = date(2024, 1, 15)

# Specific time
t = time(10, 30, 45)

# Specific datetime
dt = datetime(2024, 1, 15, 10, 30, 45)

# Access components
print(dt.year)    # 2024
print(dt.month)   # 1
print(dt.day)     # 15
print(dt.hour)    # 10
print(dt.minute)  # 30
print(dt.second)  # 45
print(dt.weekday())  # 0 (Monday) - 6 (Sunday)
```

## Formatting (datetime → string)

```python
from datetime import datetime

now = datetime.now()

# strftime — format to string
print(now.strftime("%Y-%m-%d"))          # 2024-01-15
print(now.strftime("%d/%m/%Y %H:%M"))   # 15/01/2024 10:30
print(now.strftime("%B %d, %Y"))         # January 15, 2024
print(now.strftime("%I:%M %p"))          # 10:30 AM

# ISO format
print(now.isoformat())  # 2024-01-15T10:30:45.123456
```

## Parsing (string → datetime)

```python
from datetime import datetime

# strptime — parse from string
dt = datetime.strptime("2024-01-15", "%Y-%m-%d")
dt = datetime.strptime("15/01/2024 10:30", "%d/%m/%Y %H:%M")

# ISO format
dt = datetime.fromisoformat("2024-01-15T10:30:00")
```

## Time Differences (timedelta)

```python
from datetime import datetime, timedelta

now = datetime.now()

# Add/subtract time
tomorrow = now + timedelta(days=1)
last_week = now - timedelta(weeks=1)
two_hours_later = now + timedelta(hours=2)

# Difference between dates
birthday = datetime(1990, 6, 15)
age = now - birthday
print(age.days)  # Number of days since birthday

# Create timedelta
delta = timedelta(days=5, hours=3, minutes=30)
print(delta.total_seconds())  # Total seconds
```

## Format Codes

| Code | Meaning | Example |
|------|---------|---------|
| `%Y` | Year (4 digits) | 2024 |
| `%m` | Month (01-12) | 01 |
| `%d` | Day (01-31) | 15 |
| `%H` | Hour 24h (00-23) | 10 |
| `%M` | Minute (00-59) | 30 |
| `%S` | Second (00-59) | 45 |
| `%A` | Weekday name | Monday |
| `%B` | Month name | January |
| `%I` | Hour 12h (01-12) | 10 |
| `%p` | AM/PM | AM |

## Common Pitfalls

- **Timezone-naive vs aware** — `datetime.now()` is naive (no timezone info)
- **Month is 1-indexed** — January = 1, not 0
- **`strptime` is slow** — for bulk parsing consider `dateutil.parser`
- **Mutable dates** — `date` and `datetime` are immutable, you must create new objects

## Tip

> For serious timezone handling, use `zoneinfo` (Python 3.9+) or the `pytz` library.

## Official Documentation

[datetime — Basic date and time types](https://docs.python.org/3/library/datetime.html)


## API Reference

### Classes
| Class | Description |
|-------|-------------|
| `datetime.date(year, month, day)` | An idealized naive date. |
| `datetime.time(hour, min, sec, microsec, tzinfo)`| An idealized time. |
| `datetime.datetime(year, month, day, hour, ...)` | A combination of a date and a time. |
| `datetime.timedelta(days, seconds, microseconds)`| A duration expressing the difference between two date/times. |
| `datetime.timezone(offset, name=None)` | A class that implements the `tzinfo` abstract base class. |

### Important datetime/date Methods
| Method | Description |
|--------|-------------|
| `datetime.now(tz=None)` | Return the current local date and time. |
| `datetime.utcnow()` | Return the current UTC date and time (deprecated in 3.12, use `now(UTC)`). |
| `date.today()` | Return the current local date. |
| `obj.strftime(format)` | Return a string representing the date/time. |
| `datetime.strptime(date_string, format)`| Return a datetime corresponding to date_string. |
