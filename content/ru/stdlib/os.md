---
layout: layouts/base.njk
title: "Модуль os — Работа с операционной системой"
description: "Документация модуля os Python: файловая система, переменные окружения, процессы"
language: ru
---

# os — Интерфейс операционной системы

Модуль `os` предоставляет функции для взаимодействия с операционной системой: работа с файлами, каталогами, переменными окружения и процессами.

```python
import os
```

## Работа с путями и каталогами

```python
import os

# Текущий рабочий каталог
cwd = os.getcwd()
print(cwd)  # /home/user/project

# Сменить каталог
os.chdir('/tmp')

# Создание каталогов
os.mkdir('new_folder')              # Один каталог
os.makedirs('a/b/c', exist_ok=True) # Рекурсивное создание

# Удаление каталогов
os.rmdir('empty_folder')            # Только пустой
os.removedirs('a/b/c')              # Рекурсивное удаление пустых

# Список файлов в каталоге
files = os.listdir('.')
print(files)  # ['file1.py', 'file2.txt', 'folder1']

# Обход дерева каталогов
for root, dirs, files in os.walk('/path/to/dir'):
    for file in files:
        full_path = os.path.join(root, file)
        print(full_path)
```

## Работа с файлами

```python
import os

# Переименование
os.rename('old_name.txt', 'new_name.txt')

# Удаление файла
os.remove('unwanted_file.txt')

# Проверка существования
os.path.exists('/path/to/file')   # True/False
os.path.isfile('/path/to/file')   # Это файл?
os.path.isdir('/path/to/dir')     # Это каталог?

# Информация о файле
stat = os.stat('file.txt')
print(stat.st_size)   # Размер в байтах
print(stat.st_mtime)  # Время последнего изменения
```

## os.path — Манипуляция путями

```python
import os.path

path = '/home/user/documents/report.pdf'

os.path.basename(path)    # 'report.pdf'
os.path.dirname(path)     # '/home/user/documents'
os.path.split(path)       # ('/home/user/documents', 'report.pdf')
os.path.splitext(path)    # ('/home/user/documents/report', '.pdf')
os.path.join('a', 'b', 'c.txt')  # 'a/b/c.txt' (или 'a\\b\\c.txt' на Windows)

# Абсолютный путь
os.path.abspath('file.txt')  # '/home/user/project/file.txt'

# Размер файла
os.path.getsize('file.txt')  # 1024 (байт)
```

## Переменные окружения

```python
import os

# Получить переменную
home = os.environ.get('HOME', '/default/path')
path = os.getenv('PATH')

# Установить переменную (только для текущего процесса)
os.environ['MY_VAR'] = 'my_value'

# Удалить переменную
del os.environ['MY_VAR']

# Все переменные окружения
for key, value in os.environ.items():
    print(f"{key}={value}")
```

## Информация о системе

```python
import os

os.name         # 'posix', 'nt' (Windows), 'java'
os.sep          # '/' или '\\'
os.linesep      # '\n' или '\r\n'
os.cpu_count()  # Количество CPU ядер
os.getpid()     # PID текущего процесса
os.getlogin()   # Имя текущего пользователя
```

## Частые ошибки

- **Использование `os.path` вместо `pathlib`** — для нового кода рекомендуется `pathlib`
- **Забыть `exist_ok=True`** в `makedirs()` — вызовет ошибку если каталог существует
- **Платформозависимые пути** — используйте `os.path.join()` или `pathlib.Path()`

## Совет

> Для большинства задач с путями рассмотрите модуль `pathlib` — он предоставляет объектно-ориентированный API, который часто удобнее.

## Официальная документация

[os — Miscellaneous operating system interfaces](https://docs.python.org/3/library/os.html)

## Полный справочник API (API Reference)

### Основные функции

| Функция | Описание |
|---------|----------|
| os.getcwd() | Возвращает строку с текущим рабочим каталогом. |
| os.chdir(path) | Изменяет текущий рабочий каталог на path. |
| os.listdir(path='.')| Возвращает список имен файлов и каталогов внутри path. |
| os.mkdir(path, mode=0o777) | Создает каталог path с правами mode. |
| os.makedirs(name, mode=0o777, exist_ok=False)| Рекурсивное создание каталогов. |
| os.remove(path) | Удаляет файл path. |
| os.rename(src, dst) | Переименовывает файл или каталог src в dst. |
| os.rmdir(path) | Удаляет каталог path (должен быть пустым). |

### Переменные окружения

| Атрибут | Описание |
|---------|----------|
| os.environ | Объект-словарь, содержащий переменные окружения. |
| os.getenv(key, default=None) | Возвращает значение переменной окружения key. |

### Модуль путей (os.path)

| Функция | Описание |
|---------|----------|
| os.path.abspath(path) | Возвращает абсолютный путь для path. |
| os.path.basename(path)| Возвращает базовое имя пути (конец пути). |
| os.path.dirname(path) | Возвращает имя директории (все, кроме конца пути). |
| os.path.exists(path) | Возвращает True, если путь существует. |
| os.path.join(path, *paths) | Умное соединение путей (автоматически ставит нужные слеши). |
