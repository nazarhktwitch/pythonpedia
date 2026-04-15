---
layout: layouts/base.njk
title: "Модуль json — Работа с JSON"
description: "Документация модуля json: сериализация и десериализация JSON данных"
language: ru
---

# json — Кодер и декодер JSON

Модуль `json` обеспечивает кодирование Python-объектов в строки JSON и декодирование JSON-строк в Python-объекты.

```python
import json
```

## Кодирование (Python → JSON)

```python
import json

data = {
    "name": "Алиса",
    "age": 30,
    "languages": ["Python", "JavaScript"],
    "active": True,
    "address": None
}

# Преобразование в JSON-строку
json_str = json.dumps(data, ensure_ascii=False)

# Красивый вывод
json_pretty = json.dumps(data, indent=2, ensure_ascii=False)
print(json_pretty)

# Запись в файл
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# Сортировка ключей
json.dumps(data, sort_keys=True, ensure_ascii=False)
```

## Декодирование (JSON → Python)

```python
import json

json_str = '{"name": "Алиса", "age": 30, "active": true}'

# Парсинг JSON-строки
data = json.loads(json_str)
print(data['name'])   # Алиса
print(type(data))     # <class 'dict'>

# Чтение из файла
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
```

## Соответствие типов

| JSON | Python |
|------|--------|
| object `{}` | dict |
| array `[]` | list |
| string `""` | str |
| number (целое) | int |
| number (дробное) | float |
| `true`/`false` | `True`/`False` |
| `null` | `None` |

## Пользовательская сериализация

```python
import json
from datetime import datetime

class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

data = {"created": datetime.now()}
json.dumps(data, cls=DateTimeEncoder)
# '{"created": "2024-01-15T10:30:00"}'

# Быстрый способ через default
json.dumps(data, default=str)
```

## Частые ошибки

- **Одинарные кавычки — невалидный JSON** — используйте только `"двойные"`
- **Запятая в конце — невалидно** — `{"a": 1,}` вызовет ошибку
- **set, tuple не сериализуются** — преобразуйте в list
- **`json.load` и `json.loads`** — `load` читает из файла, `loads` из строки
- **`ensure_ascii=False`** — нужен для кириллицы и других не-ASCII символов

## Официальная документация

[json — JSON encoder and decoder](https://docs.python.org/3/library/json.html)

## Полный справочник API (API Reference)

### Важные функции

| Функция | Описание |
|---------|----------|
| `json.dumps(obj, *, ensure_ascii=True, indent=None)` | Сериализует `obj` в JSON-строку. |
| `json.dump(obj, fp, *, ensure_ascii=True, indent=None)` | Сериализует `obj` в JSON и записывает в файл `fp`. |
| `json.loads(s, *, object_hook=None)` | Десериализует строку (или байты) `s` в объект Python. |
| `json.load(fp, *, object_hook=None)` | Десериализует JSON из файла `fp` в объект Python. |

### Классы

| Класс | Описание |
|-------|----------|
| `json.JSONEncoder` | Расширяемый кодировщик JSON (можно наследоваться). |
| `json.JSONDecoder` | Декодировщик JSON. |
