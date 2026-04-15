---
layout: layouts/base.njk
title: "Модуль datetime — Дата и время"
description: "Документация модуля datetime: дата, время, timedelta, форматирование"
language: ru
---

# datetime — Дата и время

Модуль `datetime` предоставляет классы для работы с датами, временем и временными интервалами.

```python
from datetime import datetime, date, time, timedelta
```

## Текущая дата и время

```python
from datetime import datetime, date

now = datetime.now()
print(now)  # 2024-01-15 10:30:45.123456

today = date.today()
print(today)  # 2024-01-15
```

## Создание объектов

```python
from datetime import datetime, date, time

d = date(2024, 1, 15)
t = time(10, 30, 45)
dt = datetime(2024, 1, 15, 10, 30, 45)

# Доступ к компонентам
print(dt.year)       # 2024
print(dt.month)      # 1
print(dt.day)        # 15
print(dt.weekday())  # 0 (Понедельник) - 6 (Воскресенье)
```

## Форматирование (datetime → строка)

```python
from datetime import datetime

now = datetime.now()
print(now.strftime("%Y-%m-%d"))          # 2024-01-15
print(now.strftime("%d.%m.%Y %H:%M"))   # 15.01.2024 10:30
print(now.isoformat())                    # 2024-01-15T10:30:45
```

## Парсинг (строка → datetime)

```python
from datetime import datetime

dt = datetime.strptime("2024-01-15", "%Y-%m-%d")
dt = datetime.strptime("15.01.2024 10:30", "%d.%m.%Y %H:%M")
dt = datetime.fromisoformat("2024-01-15T10:30:00")
```

## Разница во времени (timedelta)

```python
from datetime import datetime, timedelta

now = datetime.now()
tomorrow = now + timedelta(days=1)
last_week = now - timedelta(weeks=1)

# Разница между датами
birthday = datetime(1990, 6, 15)
age = now - birthday
print(age.days)  # Количество дней
```

## Коды форматирования

| Код | Значение | Пример |
|-----|----------|--------|
| `%Y` | Год (4 цифры) | 2024 |
| `%m` | Месяц (01-12) | 01 |
| `%d` | День (01-31) | 15 |
| `%H` | Час 24ч (00-23) | 10 |
| `%M` | Минута (00-59) | 30 |
| `%S` | Секунда (00-59) | 45 |
| `%A` | День недели | Monday |
| `%B` | Название месяца | January |

## Частые ошибки

- **Наивные vs осведомлённые** — `datetime.now()` без информации о часовом поясе
- **Месяц с 1** — январь = 1, не 0
- **`strptime` медленный** — для массового парсинга используйте `dateutil`

## Официальная документация

[datetime — Basic date and time types](https://docs.python.org/3/library/datetime.html)

## Полный справочник API (API Reference)

### Классы

| Класс | Описание |
|-------|----------|
| `datetime.date(year, month, day)` | Класс для работы с датами (без времени). |
| `datetime.time(hour, minute, ...)`| Класс для работы со временем (без даты). |
| `datetime.datetime(year, ...)` | Комбинация даты и времени. |
| `datetime.timedelta(days, ...)` | Временной интервал (разница между датами). |
| `datetime.timezone(offset)` | Класс часового пояса. |

### Базовые методы

| Метод | Описание |
|-------|----------|
| `datetime.now(tz=None)` | Возвращает текущую дату и время. |
| `datetime.utcnow()` | Возвращает текущее время по UTC. |
| `date.today()` | Возвращает текущую локальную дату. |
| `obj.strftime(format)` | Форматирует дату/время в строку по заданному шаблону. |
| `datetime.strptime(string, format)`| Парсит строку и возвращает объект `datetime`. |
