---
layout: layouts/base.njk
title: "Модуль logging — Логирование"
description: "Документация logging: логгеры, обработчики, форматирование, уровни логов"
language: ru
---

# logging — Система логирования

```python
import logging
```

## Базовое использование

```python
import logging

logging.basicConfig(level=logging.DEBUG)

logging.debug("Отладочное сообщение")
logging.info("Информационное сообщение")
logging.warning("Предупреждение")
logging.error("Ошибка")
logging.critical("Критическая ошибка!")
```

## Настройка вывода

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='app.log',
    filemode='a'
)
```

## Именованные логгеры

```python
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# Обработчик консоли
console = logging.StreamHandler()
console.setLevel(logging.INFO)
logger.addHandler(console)

# Обработчик файла
file_handler = logging.FileHandler('debug.log')
file_handler.setLevel(logging.DEBUG)
logger.addHandler(file_handler)
```

## Уровни логирования

| Уровень | Значение | Когда использовать |
|---------|----------|-------------------|
| DEBUG | 10 | Детальная диагностика |
| INFO | 20 | Подтверждение работы |
| WARNING | 30 | Что-то неожиданное |
| ERROR | 40 | Серьёзная проблема |
| CRITICAL | 50 | Программа может упасть |

## Логирование исключений

```python
try:
    result = 1 / 0
except ZeroDivisionError:
    logging.exception("Ошибка деления")  # Включает traceback
```

## Официальная документация

[logging — Logging facility](https://docs.python.org/3/library/logging.html)

## Полный справочник API (API Reference)

### Конфигурация и Логгеры

| Функция | Описание |
|---------|----------|
| `logging.basicConfig(**kwargs)`| Базовая настройка корневого логгера (уровни, формат, файл). Можно вызвать только ОДИН раз за запуск. |
| `logging.getLogger(name=None)` | Возвращает логгер по имени (обычно используется `__name__`). |

### Методы логгера по уровням

| Метод | Описание |
|-------|----------|
| `logger.debug(msg)` | Детальная диагностическая информация. |
| `logger.info(msg)` | Информационные сообщения (подтверждение обычной работы). |
| `logger.warning(msg)` | Предупреждения о потенциальных проблемах. |
| `logger.error(msg)` | Ошибки (программа не смогла выполнить функцию). |
| `logger.critical(msg)` | Критические ошибки (вероятно, падение программы). |
| `logger.exception(msg)` | Выводит сообщение уровня ERROR ПЛЮС traceback (стек вызовов) исключения. |

### Обработчики (Handlers)

| Обработчик | Описание |
|------------|----------|
| `logging.StreamHandler()` | Выводит логи в консоль (`stdout` или `stderr`). |
| `logging.FileHandler(file)`| Записывает логи в указанный файл. |
