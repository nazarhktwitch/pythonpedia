---
layout: layouts/base.njk
title: "calendar Module — General Calendar-Related Functions"
description: "Python calendar module: print calendars, calculate leap years, and dates."
---

# calendar — General calendar-related functions

This module allows you to output calendars like the Unix `cal` program, and provides additional useful functions related to the calendar. By default, these calendars have Monday as the first day of the week.

```python
import calendar
```

## Basic Console Calendar

You can print a simple, formatted text calendar for an entire year or a specific month.

```python
import calendar

# Print a month's calendar
# usage: prmonth(year, month)
calendar.prmonth(2024, 2)
# Output:
#    February 2024
# Mo Tu We Th Fr Sa Su
#           1  2  3  4
#  5  6  7  8  9 10 11
# ...

# Print an entire year
print(calendar.calendar(2024))
```

## Leap Years and Days

```python
import calendar

# Check if a year is a leap year
is_leap = calendar.isleap(2024)
print(f"Is 2024 a leap year? {is_leap}") # True

# Count leap years between dates (exclusive of y2)
leaps = calendar.leapdays(2000, 2025)
print(f"Leap years between 2000 and 2025: {leaps}")

# Find which day of the week a date falls on (0 is Monday, 6 is Sunday)
day_idx = calendar.weekday(2024, 2, 28)
print(f"Day of the week index: {day_idx}") # 2 (Wednesday)
```

---

## API Reference

### Core Functions
| Function | Description |
|----------|-------------|
| `calendar.isleap(year)` | Return `True` if year is a leap year, otherwise `False`. |
| `calendar.leapdays(y1, y2)`| Return the number of leap years in the range from y1 to y2 (exclusive). |
| `calendar.weekday(year, month, day)`| Return the day of the week (0 is Monday) for year (1970–...), month (1–12), day (1–31). |
| `calendar.monthrange(year, month)`| Returns weekday of first day of the month and number of days in month, for the specified year and month. |

### Calendar Classes
| Class | Description |
|-------|-------------|
| `calendar.Calendar(firstweekday=0)`| Creates a Calendar object. `firstweekday` is an integer specifying the first day of the week. |
| `calendar.TextCalendar(firstweekday=0)`| Subclass of Calendar that can generate plain text calendars. |
| `calendar.HTMLCalendar(firstweekday=0)`| Subclass of Calendar that can generate HTML calendars. Perfect for web frameworks. |
