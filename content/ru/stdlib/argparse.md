---
layout: layouts/base.njk
title: "Модуль argparse — Аргументы командной строки"
description: "Документация argparse: парсинг опций, аргументов и подкоманд CLI"
language: ru
---

# argparse — Парсинг аргументов командной строки

Модуль `argparse` позволяет легко создавать удобные интерфейсы командной строки.

```python
import argparse
```

## Базовое использование

```python
import argparse

# 1. Создаём парсер
parser = argparse.ArgumentParser(description="Моя CLI утилита")

# 2. Добавляем аргументы
# Позиционный аргумент (обязательный)
parser.add_argument('filename', help='Путь к файлу')

# Опциональный флаг (True/False)
parser.add_argument('-v', '--verbose', action='store_true', help='Больше логов')

# Опциональный аргумент со значением и типом
parser.add_argument('-p', '--port', type=int, default=8080, help='Порт')

# 3. Парсим аргументы
args = parser.parse_args()

# 4. Используем
print(f"Файл: {args.filename}, Порт: {args.port}")
```

## Подкоманды (Sub-commands)

Как в `git commit` и `git push`:

```python
parser = argparse.ArgumentParser()
subparsers = parser.add_subparsers(dest='command')

# Подкоманда 'start'
parser_start = subparsers.add_parser('start', help='Запуск сервера')
parser_start.add_argument('--host', default='localhost')

# Подкоманда 'stop'
parser_stop = subparsers.add_parser('stop', help='Остановка сервера')

args = parser.parse_args()
if args.command == 'start':
    print(f"Запуск на {args.host}")
```

## Выбор из вариантов (Choices)

```python
parser.add_argument('--env', choices=['dev', 'prod', 'test'], default='dev')
```

## Официальная документация

[argparse — Parser for command-line options](https://docs.python.org/3/library/argparse.html)

## Полный справочник API (API Reference)

### Классы и Методы

| Класс/Метод | Описание |
|-------------|----------|
| `argparse.ArgumentParser(description)`| Главный класс парсера. Создает новый парсер. |
| `ArgumentParser.add_argument()`| Добавляет описание ожидаемого аргумента или флага. |
| `ArgumentParser.parse_args()`| Парсит `sys.argv` и возвращает объект-namespace с результатами. |
| `ArgumentParser.add_subparsers()`| Позволяет создать подкоманды (как в `git add`, `git commit`). |

### Популярные параметры `add_argument`

| Параметр | Описание |
|----------|----------|
| `action="store_true"` | Если флаг указан (например, `--verbose`), возвращает `True`, иначе `False`. |
| `type=int` | Автоматически конвертирует прочитанную строку в указанный тип. |
| `choices=['a', 'b']` | Ограничивает допустимые значения заданным списком. |
| `required=True` | Делает именованный аргумент (с черточками `--`) обязательным к вводу. |
