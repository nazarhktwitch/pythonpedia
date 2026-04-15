---
layout: layouts/base.njk
title: "Модуль csv — Работа с CSV-файлами"
description: "Документация csv: чтение и запись CSV, DictReader, DictWriter"
language: ru
---

# csv — Чтение и запись CSV файлов

Модуль `csv` предоставляет инструменты для работы с табличными данными в формате CSV.

```python
import csv
```

## Чтение (DictReader)

Лучший способ чтения CSV — `DictReader`, который преобразует строки в словари по заголовку.

```python
import csv

with open('data.csv', mode='r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row['Name'], row['Age'])
```

## Запись (DictWriter)

```python
import csv

data = [
    {'Name': 'Alice', 'Age': 30},
    {'Name': 'Bob', 'Age': 25}
]

# newline='' обязателен для корректной записи на Windows
with open('output.csv', mode='w', encoding='utf-8', newline='') as file:
    writer = csv.DictWriter(file, fieldnames=['Name', 'Age'])
    
    writer.writeheader()  # Записать заголовки
    writer.writerows(data)
```

## Простое чтение и запись (Списки)

```python
import csv

# Чтение
with open('data.csv', 'r') as file:
    reader = csv.reader(file)
    for row in reader:
        print(row) # Список строк

# Запись
with open('out.csv', 'w', newline='') as file:
    writer = csv.writer(file, delimiter=';') # CSV с точкой с запятой
    writer.writerow(['ID', 'Name'])
    writer.writerow([1, 'Alice'])
```

## Частые ошибки

- **Забытый `newline=''` при записи** (только на Windows вызывает лишние пустые строки).
- **Данные всегда читаются как строки**. Нужно вручную делать `int(row['Age'])`.

## Совет

> Для сложного анализа данных лучше применять библиотеку `pandas` (`pandas.read_csv()`), которая мощнее и автоматически определяет типы столбцов.

## Официальная документация

[csv — CSV File Reading and Writing](https://docs.python.org/3/library/csv.html)

## Полный справочник API (API Reference)

### Чтение

| Объект/Метод | Описание |
|--------------|----------|
| `csv.reader(file)` | Читатель файлов, возвращает каждую строку как список `list` строк. |
| `csv.DictReader(file)` | Читатель, воспринимающий первую строку как заголовки. Возвращает строки как словари `dict`. |

### Запись

| Объект/Метод | Описание |
|--------------|----------|
| `csv.writer(file)` | Писатель для стандартной записи списков `writer.writerow(['id', 'name'])`. |
| `csv.DictWriter(file, fieldnames)`| Писатель словарей. Обязателен список заголовков `fieldnames`. |
| `DictWriter.writeheader()`| Метод, формально записывающий строку заголовков в файл. |
