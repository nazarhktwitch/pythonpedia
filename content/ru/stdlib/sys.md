---
layout: layouts/base.njk
title: "Модуль sys — Параметры интерпретатора"
description: "Документация модуля sys: аргументы командной строки, пути, стандартный ввод/вывод"
language: ru
---

# sys — Системные параметры и функции

Модуль `sys` предоставляет доступ к переменным и функциям интерпретатора Python.

```python
import sys
```

## Аргументы командной строки

```python
import sys

# python script.py arg1 arg2
print(sys.argv)     # ['script.py', 'arg1', 'arg2']
print(sys.argv[0])  # 'script.py' — имя скрипта
print(sys.argv[1:]) # ['arg1', 'arg2'] — аргументы
```

## Пути поиска модулей

```python
import sys

# Список путей, где Python ищет модули
for p in sys.path:
    print(p)

# Добавить свой путь
sys.path.append('/my/custom/modules')

# Загруженные модули
print(list(sys.modules.keys())[:10])
```

## Стандартные потоки ввода/вывода

```python
import sys

# Стандартный вывод
sys.stdout.write("Hello\n")  # Аналог print()

# Стандартный вывод ошибок
sys.stderr.write("Error message\n")

# Перенаправление вывода в файл
original_stdout = sys.stdout
sys.stdout = open('output.txt', 'w')
print("Это запишется в файл")
sys.stdout = original_stdout  # Восстановить
```

## Информация о системе

```python
import sys

sys.version         # '3.12.0 (main, Oct 2 2023, ...)'
sys.version_info    # sys.version_info(major=3, minor=12, ...)
sys.platform        # 'linux', 'win32', 'darwin'
sys.executable      # '/usr/bin/python3'
sys.prefix          # '/usr' — путь к установке Python
sys.byteorder       # 'little' или 'big'
sys.maxsize         # 9223372036854775807 (максимальный размер int)
sys.float_info      # Информация о float
```

## Выход из программы

```python
import sys

# Завершить программу
sys.exit()       # Код выхода 0 (успех)
sys.exit(1)      # Код выхода 1 (ошибка)
sys.exit("Ошибка: файл не найден")  # Печатает сообщение и код 1
```

## Рекурсия

```python
import sys

# Максимальная глубина рекурсии
print(sys.getrecursionlimit())  # 1000 (по умолчанию)

# Изменить лимит (осторожно!)
sys.setrecursionlimit(5000)
```

## Размер объектов

```python
import sys

sys.getsizeof(42)          # 28 байт
sys.getsizeof("hello")    # 54 байт
sys.getsizeof([1, 2, 3])  # 88 байт
sys.getsizeof({})          # 64 байт
```

## Частые ошибки

- **`sys.exit()` бросает `SystemExit`** — это исключение, его можно поймать через `try/except`
- **Изменение `sys.path` глобально** — влияет на весь процесс
- **Увеличение `recursionlimit`** — может привести к переполнению стека

## Официальная документация

[sys — System-specific parameters and functions](https://docs.python.org/3/library/sys.html)

## Полный справочник API (API Reference)

### Атрибуты

| Атрибут | Описание |
|---------|----------|
| sys.argv | Список аргументов командной строки, переданных Python-скрипту. |
| sys.executable| Абсолютный путь к исполняемому файлу интерпретатора Python. |
| sys.modules | Словарь загруженных модулей (имя модуля -> объект модуля). |
| sys.path | Список строк, определяющий пути поиска модулей при импорте. |
| sys.platform | Строка-идентификатор платформы (например, 'linux', 'win32'). |
| sys.version | Строка, содержащая версию интерпретатора Python. |

### Функции

| Функция | Описание |
|---------|----------|
| sys.exit([arg]) | Выход из Python. Генерирует исключение SystemExit. |
| sys.getsizeof(object) | Возвращает размер объекта в байтах. |
| sys.getrecursionlimit() | Возвращает текущий лимит рекурсии (максимальную глубину стека вызовов). |
| sys.setrecursionlimit(limit)| Устанавливает максимальную глубину рекурсии в limit. |
