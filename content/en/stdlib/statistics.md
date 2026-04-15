---
layout: layouts/base.njk
title: "statistics Module — Mathematical Statistics Functions"
description: "Python statistics module: mean, median, mode, variance, stddev"
---

# statistics — Mathematical Statistics Functions

The `statistics` module provides functions to calculating mathematical statistics of numeric (Real-valued) data.

```python
import statistics
```

## Averages and Measures of Central Location

```python
import statistics

data = [1, 2, 2, 3, 4, 7, 9]

# Mean (Average)
print(statistics.mean(data))   # 4.0

# Median (Middle value)
print(statistics.median(data)) # 3

# Mode (Most common value)
print(statistics.mode(data))   # 2
```

## Measures of Spread

```python
import statistics

data = [1, 2, 2, 3, 4, 7, 9]

# Population Variance
print(statistics.pvariance(data))

# Standard Deviation
# Measures the amount of variation or dispersion of a set of values.
print(statistics.stdev(data))
```

---

## API Reference

### Averages
| Function | Description |
|----------|-------------|
| `statistics.mean(data)` | Arithmetic mean ("average") of data. |
| `statistics.median(data)`| Median (middle value) of data. |
| `statistics.median_low(data)`| Low median of data. |
| `statistics.median_high(data)`| High median of data. |
| `statistics.mode(data)` | Single most common value of discrete or nominal data. |
| `statistics.multimode(data)`| List of the most common values (handles ties). |
| `statistics.quantiles(data, *, n=4)`| Divide data into `n` continuous intervals with equal probability. |

### Measures of Spread
| Function | Description |
|----------|-------------|
| `statistics.stdev(data)` | Sample standard deviation of data. |
| `statistics.variance(data)`| Sample variance of data. |
| `statistics.pstdev(data)`| Population standard deviation of data. |
| `statistics.pvariance(data)`| Population variance of data. |
