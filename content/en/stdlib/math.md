---
layout: layouts/base.njk
title: "math Module — Mathematics"
description: "Python math: mathematical functions, constants, trigonometry"
---

# math — Mathematical Functions

```python
import math
```

## Constants

```python
import math

math.pi       # 3.141592653589793
math.e        # 2.718281828459045
math.tau      # 6.283185307179586 (2π)
math.inf      # Infinity
math.nan      # Not a Number
```

## Basic Functions

```python
math.ceil(4.2)     # 5 (round up)
math.floor(4.7)    # 4 (round down)
math.trunc(4.7)    # 4 (truncate towards zero)
math.fabs(-5.5)    # 5.5 (absolute value as float)
math.factorial(5)  # 120
math.gcd(12, 8)    # 4 (greatest common divisor)
math.lcm(12, 8)    # 24 (least common multiple, 3.9+)
```

## Power and Logarithms

```python
math.sqrt(16)      # 4.0
math.pow(2, 10)    # 1024.0
math.exp(1)        # 2.718... (e^1)
math.log(100)      # 4.605... (natural log)
math.log10(100)    # 2.0
math.log2(1024)    # 10.0
math.log(8, 2)     # 3.0 (log base 2 of 8)
```

## Trigonometry

```python
math.sin(math.pi / 2)    # 1.0
math.cos(0)               # 1.0
math.tan(math.pi / 4)    # ~1.0
math.degrees(math.pi)    # 180.0
math.radians(180)         # 3.14159...
math.atan2(1, 1)          # 0.785... (π/4)
math.hypot(3, 4)          # 5.0
```

## Rounding & Comparison

```python
math.isclose(0.1 + 0.2, 0.3)       # True (with tolerance)
math.isclose(0.1 + 0.2, 0.3, rel_tol=1e-9)
math.isinf(float('inf'))           # True
math.isnan(float('nan'))           # True
math.isfinite(42)                  # True

math.comb(5, 2)    # 10 (combinations, 3.8+)
math.perm(5, 2)    # 20 (permutations, 3.8+)
```

## Common Pitfalls

- **Floating point precision** — use `math.isclose()` instead of `==`
- **`math.pow` vs `**`** — `math.pow` always returns float; `**` can return int
- **Angles are in radians** — convert with `math.radians()` / `math.degrees()`

## Official Documentation

[math — Mathematical functions](https://docs.python.org/3/library/math.html)


## API Reference

### Mathematical Functions
| Function | Description |
|----------|-------------|
| `math.ceil(x)` | Return the ceiling of x, the smallest integer greater than or equal to x. |
| `math.floor(x)` | Return the floor of x, the largest integer less than or equal to x. |
| `math.isclose(a, b, *, rel_tol=1e-09, abs_tol=0.0)`| Return `True` if the values `a` and `b` are close to each other. |
| `math.sqrt(x)` | Return the square root of x. |
| `math.pow(x, y)` | Return x raised to the power y. |
| `math.log(x, [base])` | Return the natural logarithm of x (to base e), or logarithm to given base. |
| `math.gcd(*integers)` | Return the greatest common divisor of the specified integer arguments. |

### Constants
| Constant | Description |
|----------|-------------|
| `math.pi` | The mathematical constant π = 3.141592... |
| `math.e` | The mathematical constant e = 2.718281... |
| `math.inf` | A floating-point positive infinity. |
| `math.nan` | A floating-point "not a number" (NaN) value. |
