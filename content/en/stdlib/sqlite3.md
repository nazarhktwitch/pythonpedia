---
layout: layouts/base.njk
title: "sqlite3 Module — SQLite Database"
description: "Python sqlite3: embedded SQL database, queries, parameterized statements"
---

# sqlite3 — DB-API 2.0 interface for SQLite databases

SQLite is a C library that provides a lightweight disk-based embedded database. It doesn't require a separate server process.

```python
import sqlite3
```

## Basic Connection and Cursor

```python
import sqlite3

# Connect to a file-based database (created if it doesn't exist)
con = sqlite3.connect("tutorial.db")

# Alternatively, use an in-memory database
# con = sqlite3.connect(":memory:")

# Create a cursor object using the cursor() method
cur = con.cursor()
```

## Creating Tables and Inserting

```python
import sqlite3
con = sqlite3.connect("tutorial.db")
cur = con.cursor()

# Create table
cur.execute("CREATE TABLE movie (title, year, score)")

# Insert a single row
cur.execute("""
    INSERT INTO movie VALUES
        ('Monty Python and the Holy Grail', 1975, 8.2),
        ('And Now for Something Completely Different', 1971, 7.5)
""")

# Save (commit) the changes
con.commit()
```

## Secure Insertion (Parameterized Queries)

> **Security Warning:** NEVER use f-strings or standard string formatting to insert variables into queries. It makes your code vulnerable to SQL Injection! Always use `?` placeholders.

```python
data = [
    ("The Matrix", 1999, 8.7),
    ("Inception", 2010, 8.8),
    ("Interstellar", 2014, 8.6)
]

# Use ? as placeholders, passing values as the second argument
cur.executemany("INSERT INTO movie VALUES (?, ?, ?)", data)
con.commit()
```

## Querying Data

```python
# Execute a SELECT statement
cur.execute("SELECT title, year FROM movie ORDER BY year")

# Fetch one row
print(cur.fetchone())  # ('And Now for Something Completely Different', 1971)

# Fetch all remaining rows
res = cur.fetchall()
print(res)
# [('Monty Python and the Holy Grail', 1975), ('The Matrix', 1999), ...]

# You can also iterate over the cursor
for row in cur.execute("SELECT score FROM movie"):
    print(row)
```

## Closing the Connection

Always close the connection when you're done.

```python
# Close the connection
con.close()
```

## Using Context Managers (Recommended)

Context managers (`with` statements) automatically commit changes if there are no errors, or roll back if an exception occurs. You still need to manually close the connection.

```python
import sqlite3

con = sqlite3.connect("tutorial.db")

try:
    with con: # Automatically commits!
        con.execute("INSERT INTO movie VALUES ('Dune', 2021, 8.0)")
finally:
    con.close()
```

## Row Factory (Dict-like Access)

By default, SQLite returns tuples. You can configure it to return objects that act like dictionaries.

```python
import sqlite3

con = sqlite3.connect("tutorial.db")
con.row_factory = sqlite3.Row  # Enable dict-like behavior
cur = con.cursor()

cur.execute("SELECT * FROM movie WHERE year = 1999")
row = cur.fetchone()

print(row['title']) # The Matrix
print(row['year'])  # 1999
print(row[0])       # The Matrix (index still works)
```

## Official Documentation

[sqlite3 — DB-API 2.0 interface for SQLite databases](https://docs.python.org/3/library/sqlite3.html)


## API Reference

### Connection Object
| Method | Description |
|--------|-------------|
| `sqlite3.connect(database)`| Opens a connection to the SQLite database file. |
| `Connection.cursor()` | Return a Cursor object. |
| `Connection.commit()` | Commit any pending transaction to the database. |
| `Connection.rollback()` | Roll back to the start of any pending transaction. |
| `Connection.close()` | Close the database connection. |

### Cursor Object
| Method | Description |
|--------|-------------|
| `Cursor.execute(sql, [parameters])`| Executes an SQL statement. |
| `Cursor.executemany(sql, seq_of_parameters)`| Executes an SQL command against all parameter sequences or mappings found in the sequence. |
| `Cursor.fetchone()` | Fetches the next row of a query result set. |
| `Cursor.fetchall()` | Fetches all remaining rows of a query result. |
