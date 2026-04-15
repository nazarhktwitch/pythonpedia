---
layout: layouts/base.njk
title: "Модуль sqlite3 — База данных SQLite"
description: "Документация sqlite3: встроенная SQL база данных, запросы"
language: ru
---

# sqlite3 — Интерфейс для баз данных SQLite

SQLite — это встроенная легковесная база данных, сохраняемая в один файл. Ей не нужен отдельный серверный процесс.

```python
import sqlite3
```

## Базовое подключение и курсор

```python
import sqlite3

# Подключение к файлу (создастся, если не существует)
con = sqlite3.connect("app.db")

# Можно использовать базу данных в оперативной памяти
# con = sqlite3.connect(":memory:")

# Создание курсора для выполнения запросов
cur = con.cursor()
```

## Создание таблиц и защита от инъекций

> **Важно:** Никогда не используйте f-строки для подстановки переменных в SQL-запрос. Это приводит к уязвимости SQL Injection. Используйте знак `?`.

```python
cur.execute("""
    CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        username TEXT NOT NULL,
        age INTEGER
    )
""")

# Безопасная подстановка переменных
username = "alice"
age = 30
cur.execute("INSERT INTO users (username, age) VALUES (?, ?)", (username, age))

# Множественная вставка
users_data = [("bob", 25), ("charlie", 35)]
cur.executemany("INSERT INTO users (username, age) VALUES (?, ?)", users_data)

# Сохранение изменений!
con.commit()
```

## Чтение данных

```python
# Получение одной строки
cur.execute("SELECT username FROM users WHERE age > ?", (28,))
row = cur.fetchone()
print(row)  # ('alice',)

# Получение всех строк
cur.execute("SELECT * FROM users")
print(cur.fetchall())

# Итерация по курсору
for row in cur.execute("SELECT username FROM users"):
    print(row[0])

# Закрытие соединения
con.close()
```

## Контекстные менеджеры

Блок `with con:` автоматически делает `commit()` при успехе или `rollback()` при ошибке.

```python
con = sqlite3.connect("app.db")

try:
    with con:
        con.execute("INSERT INTO users (username) VALUES ('dave')")
finally:
    con.close()
```

## Доступ по именам столбцов

```python
con = sqlite3.connect("app.db")
con.row_factory = sqlite3.Row  # Включаем поведение как у словарей
cur = con.cursor()

cur.execute("SELECT * FROM users LIMIT 1")
user = cur.fetchone()

print(user['username']) # Доступ по имени столбца
print(user[1])          # Доступ по индексу также работает
```

## Официальная документация

[sqlite3 — DB-API 2.0 interface for SQLite databases](https://docs.python.org/3/library/sqlite3.html)

## Полный справочник API (API Reference)

### Объект Connection (Подключение)

| Метод | Описание |
|-------|----------|
| `sqlite3.connect(database)`| Подключается к БД (или создает её, если нет) и возвращает объект соединения. |
| `Connection.cursor()` | Создает и возвращает объект курсора для управления запросами. |
| `Connection.commit()` | Сохраняет в файл изменения, которые были внесены запросами `INSERT`, `UPDATE`, `DELETE`. Без коммита данные сотрутся при закрытии скрипта! |
| `Connection.rollback()` | Откатывает базу к состоянию до текущих несохраненных изменений. |
| `Connection.close()` | Безопасно закрывает файл базы данных. |

### Объект Cursor (Курсор)

| Метод | Описание |
|-------|----------|
| `Cursor.execute(sql, [params])`| Выполняет один SQL запрос. Для подстановки безопасных переменных в SQL используйте знак `?`. |
| `Cursor.executemany(sql, params_list)`| Применяет один и тот же SQL-запрос ко всему массиву данных. (Супер-быстрая массовая вставка). |
| `Cursor.fetchone()` | Достает одну (следующую) строку из результатов запроса `SELECT`. |
| `Cursor.fetchall()` | Достает ВСЕ строки сразу из результата запроса `SELECT` в виде списка кортежей. |
