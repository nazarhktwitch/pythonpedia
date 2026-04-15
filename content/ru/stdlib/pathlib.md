---
layout: layouts/base.njk
title: "Модуль pathlib — Объектно-ориентированные пути"
description: "Документация pathlib: современная работа с путями файловой системы"
language: ru
---

# pathlib — Объектно-ориентированные пути

Модуль `pathlib` — современная альтернатива `os.path` для работы с путями файловой системы.

```python
from pathlib import Path
```

## Создание путей

```python
from pathlib import Path

p = Path('.')                     # Текущий каталог
p = Path.home()                   # Домашний каталог
p = Path.cwd()                    # Рабочий каталог
p = Path('/home') / 'user' / 'file.txt'  # Соединение через /
```

## Свойства пути

```python
from pathlib import Path

p = Path('/home/user/project/main.py')

p.name       # 'main.py'
p.stem       # 'main'
p.suffix     # '.py'
p.parent     # Path('/home/user/project')
p.parts      # ('/', 'home', 'user', 'project', 'main.py')
```

## Операции с файлами

```python
from pathlib import Path

p = Path('example.txt')

# Чтение/Запись
p.write_text('Привет мир', encoding='utf-8')
content = p.read_text(encoding='utf-8')

# Проверки
p.exists()     # Существует?
p.is_file()    # Файл?
p.is_dir()     # Каталог?

# Удаление
p.unlink(missing_ok=True)
```

## Операции с каталогами

```python
from pathlib import Path

d = Path('my_project')
d.mkdir(parents=True, exist_ok=True)

# Поиск файлов
for py_file in Path('.').glob('**/*.py'):
    print(py_file)

# Содержимое каталога
for item in d.iterdir():
    print(item.name)
```

## pathlib vs os.path

| Задача | os.path | pathlib |
|--------|---------|---------|
| Соединить | `os.path.join(a, b)` | `Path(a) / b` |
| Имя файла | `os.path.basename(p)` | `p.name` |
| Расширение | `os.path.splitext(p)[1]` | `p.suffix` |
| Существует | `os.path.exists(p)` | `p.exists()` |
| Чтение | `open(p).read()` | `p.read_text()` |

## Официальная документация

[pathlib — Object-oriented filesystem paths](https://docs.python.org/3/library/pathlib.html)

## Полный справочник API (API Reference)

### Свойства объекта Path

| Свойство | Описание |
|----------|----------|
| `Path.name` | Имя файла вместе с расширением (базовое имя). |
| `Path.stem` | Имя файла без расширения. |
| `Path.suffix` | Расширение файла (например, `.txt`). |
| `Path.parent` | Родительская директория пути. |

### Важные методы

| Метод | Описание |
|-------|----------|
| `Path.cwd()` | Возвращает объект пути для текущей рабочей директории. |
| `Path.home()`| Возвращает домашнюю директорию пользователя. |
| `Path.exists()` | `True`, если путь физически существует на диске. |
| `Path.is_dir()` | `True`, если это директория. |
| `Path.is_file()`| `True`, если это файл. |
| `Path.mkdir(parents=False, exist_ok=False)`| Создает директорию по указанному пути. |
| `Path.read_text()` | Открывает файл, читает его содержимое в строку и закрывает файл. |
| `Path.write_text(data)`| Записывает строку в файл, автоматически его закрывая. |
| `Path.iterdir()`| Возвращает итератор с содержимым директории. |
| `Path.glob(pattern)`| Поиск файлов по шаблону (например, `*.txt`) в директории. |
| `Path.rglob(pattern)`| Рекурсивный поиск файлов (по всем поддиректориям). |
