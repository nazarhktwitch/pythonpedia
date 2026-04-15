---
layout: layouts/base.njk
title: "itertools Module — Iterator Building Blocks"
description: "Python itertools: efficient iteration, combinations, permutations, chains"
---

# itertools — Iterator Building Blocks

The `itertools` module provides fast, memory-efficient tools for working with iterators.

```python
import itertools
```

## Infinite Iterators

```python
import itertools

# count — infinite counter
for i in itertools.count(10, 2):  # 10, 12, 14, ...
    if i > 20: break
    print(i)

# cycle — repeat endlessly
colors = itertools.cycle(['red', 'green', 'blue'])
print([next(colors) for _ in range(7)])
# ['red', 'green', 'blue', 'red', 'green', 'blue', 'red']

# repeat
list(itertools.repeat('hello', 3))  # ['hello', 'hello', 'hello']
```

## Combinatoric Iterators

```python
import itertools

# Permutations (order matters)
list(itertools.permutations('ABC', 2))
# [('A','B'), ('A','C'), ('B','A'), ('B','C'), ('C','A'), ('C','B')]

# Combinations (order doesn't matter)
list(itertools.combinations('ABC', 2))
# [('A','B'), ('A','C'), ('B','C')]

# Combinations with replacement
list(itertools.combinations_with_replacement('AB', 2))
# [('A','A'), ('A','B'), ('B','B')]

# Cartesian product
list(itertools.product('AB', '12'))
# [('A','1'), ('A','2'), ('B','1'), ('B','2')]
```

## Chain and Merge

```python
import itertools

# Chain — concatenate iterables
list(itertools.chain([1, 2], [3, 4], [5]))
# [1, 2, 3, 4, 5]

# Chain from iterable of iterables
lists = [[1, 2], [3, 4], [5, 6]]
list(itertools.chain.from_iterable(lists))
# [1, 2, 3, 4, 5, 6]

# Zip longest
list(itertools.zip_longest([1, 2], [3, 4, 5], fillvalue=0))
# [(1, 3), (2, 4), (0, 5)]
```

## Filtering and Slicing

```python
import itertools

# takewhile — take while condition is true
list(itertools.takewhile(lambda x: x < 5, [1, 3, 5, 2, 1]))
# [1, 3]

# dropwhile — skip while condition is true
list(itertools.dropwhile(lambda x: x < 5, [1, 3, 5, 2, 1]))
# [5, 2, 1]

# filterfalse — opposite of filter
list(itertools.filterfalse(lambda x: x % 2, range(10)))
# [0, 2, 4, 6, 8]

# islice — slice an iterator
list(itertools.islice(range(100), 5, 10))
# [5, 6, 7, 8, 9]
```

## Grouping

```python
import itertools

# groupby — group consecutive elements
data = [('A', 1), ('A', 2), ('B', 3), ('B', 4), ('A', 5)]
data.sort(key=lambda x: x[0])  # Must be sorted first!

for key, group in itertools.groupby(data, key=lambda x: x[0]):
    print(key, list(group))
# A [('A', 1), ('A', 2), ('A', 5)]
# B [('B', 3), ('B', 4)]
```

## Accumulate

```python
import itertools
import operator

# Running total
list(itertools.accumulate([1, 2, 3, 4, 5]))
# [1, 3, 6, 10, 15]

# Running product
list(itertools.accumulate([1, 2, 3, 4], operator.mul))
# [1, 2, 6, 24]

# Running max
list(itertools.accumulate([3, 1, 4, 1, 5, 9], max))
# [3, 3, 4, 4, 5, 9]
```

## Common Pitfalls

- **`groupby` requires sorted data** — consecutive identical keys only
- **Iterators are consumed once** — can't reuse without `itertools.tee()`
- **Memory** — most functions return iterators, not lists (memory-efficient)

## Official Documentation

[itertools — Functions creating iterators](https://docs.python.org/3/library/itertools.html)


## API Reference

### Infinite Iterators
| Function | Description |
|----------|-------------|
| `count(start=0, step=1)` | Make an iterator that returns evenly spaced values starting with number `start`. |
| `cycle(iterable)` | Make an iterator returning elements from the iterable and saving a copy of each. |
| `repeat(object[, times])`| Make an iterator that returns `object` over and over again. |

### Iterators Terminating on the Shortest Input Sequence
| Function | Description |
|----------|-------------|
| `accumulate(iterable[, func])`| Make an iterator that returns accumulated sums, or accumulated results of other binary functions. |
| `chain(*iterables)` | Make an iterator that returns elements from the first iterable until it is exhausted, then proceeds to the next. |
| `compress(data, selectors)`| Make an iterator that filters elements from `data` returning only those that have a corresponding true selector. |
| `dropwhile(predicate, iterable)`| Make an iterator that drops elements from the iterable as long as the predicate is true. |
| `takewhile(predicate, iterable)`| Make an iterator that returns elements from the iterable as long as the predicate is true. |
| `group_by(iterable, key=None)`| Make an iterator that returns consecutive keys and groups from the iterable. |
