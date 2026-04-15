---
layout: layouts/base.njk
title: "Модуль collections — Специализированные контейнеры"
description: "Документация collections: Counter, defaultdict, namedtuple, deque"
language: ru
---

# collections — Специализированные контейнеры

Модуль `collections` предоставляет альтернативы встроенным контейнерам Python с расширенной функциональностью.

```python
from collections import Counter, defaultdict, namedtuple, deque
```

## Counter — Подсчёт элементов

```python
from collections import Counter

words = ['яблоко', 'банан', 'яблоко', 'вишня', 'банан', 'яблоко']
count = Counter(words)
print(count)  # Counter({'яблоко': 3, 'банан': 2, 'вишня': 1})

print(count.most_common(2))  # Два самых частых

Counter('mississippi')  # Подсчёт символов
```

## defaultdict — Словарь с значением по умолчанию

```python
from collections import defaultdict

# Группировка
groups = defaultdict(list)
for name, dept in [('Алиса', 'IT'), ('Боб', 'HR'), ('Кэрол', 'IT')]:
    groups[dept].append(name)

# Подсчёт
word_count = defaultdict(int)
for word in 'привет мир привет'.split():
    word_count[word] += 1
```

## namedtuple — Именованные поля

```python
from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(p.x, p.y)      # 3 4
print(p._asdict())    # {'x': 3, 'y': 4}
```

## deque — Двусторонняя очередь

```python
from collections import deque

d = deque([1, 2, 3])
d.append(4)        # Справа
d.appendleft(0)    # Слева
d.pop()            # Удалить справа
d.popleft()        # Удалить слева

# Фиксированный размер
d = deque(maxlen=3)
d.extend([1, 2, 3, 4, 5])
print(d)  # deque([3, 4, 5])
```

## Частые ошибки

- **`namedtuple` неизменяемый** — используйте `dataclasses` если нужна мутабельность
- **`defaultdict` создаёт ключи при обращении** — `d[key]` создаёт запись даже при проверке
- **`deque` O(n) для случайного доступа** — O(1) только для концов

## Официальная документация

[collections — Container datatypes](https://docs.python.org/3/library/collections.html)

## Полный справочник API (API Reference)

### Классы

| Класс | Описание |
|-------|----------|
| `collections.namedtuple` | Функция-фабрика для кортежей с именованными полями. |
| `collections.deque` | Двусторонняя очередь с быстрым добавлением и удалением с обоих концов. |
| `collections.ChainMap` | Объединяет несколько словарей в одно логическое представление. |
| `collections.Counter` | Словарь для подсчета частотности элементов. |
| `collections.OrderedDict` | Словарь, сохраняющий порядок добавления (встроен в `dict` с Python 3.7+). |
| `collections.defaultdict` | Словарь, автоматически создающий пустые значения для новых ключей. |

### Методы Counter

| Метод | Описание |
|-------|----------|
| `Counter.elements()` | Возвращает итератор по элементам (повторяет элементы согласно их счетчику). |
| `Counter.most_common([n])`| Возвращает список `n` самых частых элементов. |
| `Counter.subtract(other)`| Вычитает элементы из другого iterable или словаря. |
