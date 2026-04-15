---
layout: layouts/base.njk
title: "csv Module — CSV File Reading and Writing"
description: "Python csv: reading and writing CSV files, DictReader, DictWriter"
---

# csv — CSV File Reading and Writing

The `csv` module implements classes to read and write tabular data in CSV format.

```python
import csv
```

## Reading CSV Files

```python
import csv

# Example: data.csv contains:
# Name,Age,City
# Alice,30,New York
# Bob,25,London

with open('data.csv', mode='r', encoding='utf-8') as file:
    reader = csv.reader(file)
    header = next(reader)  # Read header row
    for row in reader:
        print(row)
        # ['Alice', '30', 'New York']
        # ['Bob', '25', 'London']
```

## Writing CSV Files

```python
import csv

data = [
    ['Name', 'Age', 'City'],
    ['Alice', 30, 'New York'],
    ['Bob', 25, 'London']
]

# Important: newline='' is required to prevent double-spacing on Windows
with open('output.csv', mode='w', encoding='utf-8', newline='') as file:
    writer = csv.writer(file, quoting=csv.QUOTE_MINIMAL)
    writer.writerows(data)
```

## Using DictReader (Recommended)

Maps the information in each row to a `dict` whose keys are given by the first row.

```python
import csv

with open('data.csv', mode='r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row['Name'], row['Age'])
        # Alice 30
        # Bob 25
```

## Using DictWriter

```python
import csv

data = [
    {'Name': 'Alice', 'Age': 30, 'City': 'New York'},
    {'Name': 'Bob', 'Age': 25, 'City': 'London'}
]

with open('output.csv', mode='w', encoding='utf-8', newline='') as file:
    fieldnames = ['Name', 'Age', 'City']
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    writer.writeheader()  # Write the column names
    writer.writerows(data)
```

## Custom Dialects / Delimiters

```python
import csv

# Using TSV (Tab-Separated Values)
with open('data.tsv', mode='r') as file:
    reader = csv.reader(file, delimiter='\t')
    
# Using semicolons
with open('data.csv', mode='w', newline='') as file:
    writer = csv.writer(file, delimiter=';')
```

## Common Pitfalls

- **Not using `newline=''`** when writing will cause blank lines between rows on Windows.
- **Numbers are read as strings** — you must manually convert them via `int()` or `float()`.

## Tip

> For large datasets and data analysis, the `pandas` library (`pandas.read_csv()`) is vastly more powerful and handles type conversion automatically.

## Official Documentation

[csv — CSV File Reading and Writing](https://docs.python.org/3/library/csv.html)


## API Reference

### Reader Objects
| Object/Method | Description |
|---------------|-------------|
| `csv.reader(csvfile, dialect='excel')`| Return a reader object which will iterate over lines in the given csvfile. |
| `csv.DictReader(csvfile)`| Create an object that operates like a regular reader but maps the information in each row to a dict. |

### Writer Objects
| Object/Method | Description |
|---------------|-------------|
| `csv.writer(csvfile)` | Return a writer object responsible for converting the user's data into formatted strings. |
| `csv.DictWriter(csvfile, fieldnames)`| Create an object which operates like a regular writer but maps dictionaries onto output rows. |
| `DictWriter.writeheader()`| Write a row with the field names (as specified in the constructor). |
