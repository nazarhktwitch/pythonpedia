---
layout: layouts/base.njk
title: "random Module — Random Numbers"
description: "Python random: random numbers, choices, shuffling, sampling"
---

# random — Generate Random Numbers

```python
import random
```

## Basic Random Numbers

```python
import random

random.random()           # Float in [0.0, 1.0)
random.uniform(1.0, 10.0) # Float in [1.0, 10.0]
random.randint(1, 100)    # Integer in [1, 100]
random.randrange(0, 100, 5) # Random from range(0, 100, 5)
```

## Sequences

```python
import random

items = ['apple', 'banana', 'cherry', 'date']

random.choice(items)              # Random element
random.choices(items, k=3)        # 3 random with replacement
random.sample(items, k=2)         # 2 random without replacement
random.shuffle(items)             # Shuffle in-place
```

## Weighted Choice

```python
import random

options = ['win', 'lose', 'draw']
weights = [10, 70, 20]  # 10%, 70%, 20%
result = random.choices(options, weights=weights, k=1000)
```

## Reproducible Results

```python
import random

random.seed(42)          # Set seed for reproducibility
print(random.random())   # Always same result with same seed
```

## Distributions

```python
random.gauss(0, 1)         # Gaussian (normal) distribution
random.expovariate(1.0)    # Exponential distribution
random.betavariate(2, 5)   # Beta distribution
```

## Security Warning

> For cryptographic purposes, use `secrets` module instead — `random` is NOT cryptographically secure!

```python
import secrets
token = secrets.token_hex(16)     # Cryptographically secure
secure_int = secrets.randbelow(100)
```

## Official Documentation

[random — Generate pseudo-random numbers](https://docs.python.org/3/library/random.html)


## API Reference

### Core Functions
| Function | Description |
|----------|-------------|
| `random.seed(a=None, version=2)` | Initialize the random number generator. |
| `random.getstate()` | Return an object capturing the current internal state of the generator. |
| `random.setstate(state)` | Restore the internal state of the generator. |

### Functions for Integers
| Function | Description |
|----------|-------------|
| `random.randrange(start, stop[, step])` | Return a randomly selected element from `range(start, stop, step)`. |
| `random.randint(a, b)` | Return a random integer N such that `a <= N <= b`. |

### Functions for Sequences
| Function | Description |
|----------|-------------|
| `random.choice(seq)` | Return a random element from the non-empty sequence `seq`. |
| `random.choices(population, weights=None, *, k=1)`| Return a `k` sized list of elements chosen from the `population` with replacement. |
| `random.shuffle(x[, random])` | Shuffle the sequence `x` in place. |
| `random.sample(population, k)` | Return a `k` length list of unique elements chosen from the population sequence. |

### Real-valued Distributions
| Function | Description |
|----------|-------------|
| `random.random()` | Return the next random floating point number in the range [0.0, 1.0). |
| `random.uniform(a, b)` | Return a random floating point number N such that `a <= N <= b`. |
