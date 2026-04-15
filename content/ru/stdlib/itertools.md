---
layout: layouts/base.njk
title: "Модуль itertools — Итераторы"
description: "Документация itertools: комбинации, перестановки, цепочки, фильтрация"
language: ru
---

# itertools — Строительные блоки итераторов

Модуль `itertools` предоставляет быстрые и эффективные инструменты для работы с итераторами.

```python
import itertools
```

## Бесконечные итераторы

```python
import itertools

# count — бесконечный счётчик
for i in itertools.count(10, 2):  # 10, 12, 14, ...
    if i > 20: break

# cycle — бесконечный цикл
colors = itertools.cycle(['red', 'green', 'blue'])

# repeat — повторение
list(itertools.repeat('hello', 3))  # ['hello', 'hello', 'hello']
```

## Комбинаторика

```python
import itertools

# Перестановки
list(itertools.permutations('ABC', 2))
# Сочетания
list(itertools.combinations('ABC', 2))
# Декартово произведение
list(itertools.product('AB', '12'))
```

## Цепочки и слияние

```python
import itertools

list(itertools.chain([1, 2], [3, 4]))           # [1, 2, 3, 4]
list(itertools.chain.from_iterable([[1,2],[3]])) # [1, 2, 3]
```

## Фильтрация и срезы

```python
import itertools

list(itertools.takewhile(lambda x: x < 5, [1, 3, 5, 2]))  # [1, 3]
list(itertools.dropwhile(lambda x: x < 5, [1, 3, 5, 2]))  # [5, 2]
list(itertools.islice(range(100), 5, 10))                    # [5,6,7,8,9]
```

## Группировка

```python
import itertools

data = sorted(items, key=lambda x: x[0])  # ОБЯЗАТЕЛЬНО отсортировать!
for key, group in itertools.groupby(data, key=lambda x: x[0]):
    print(key, list(group))
```

## Частые ошибки

- **`groupby` требует отсортированных данных**
- **Итераторы потребляются один раз**
- **Возвращают итераторы, не списки** — экономят память

## Официальная документация

[itertools — Functions creating iterators](https://docs.python.org/3/library/itertools.html)

## Полный справочник API (API Reference)

### Бесконечные итераторы

| Функция | Описание |
|---------|----------|
| `count(start=0, step=1)` | Бесконечный счетчик с заданного числа. |
| `cycle(iterable)` | Бесконечно повторяет элементы переданной коллекции по кругу. |
| `repeat(object[, times])`| Повторяет один объект бесконечно (или заданное число раз). |

### Конечные итераторы

| Функция | Описание |
|---------|----------|
| `accumulate(iterable)` | Итератор, возвращающий накопленные суммы элементов. |
| `chain(*iterables)` | Объединяет несколько итераторов в один. |
| `compress(data, selectors)`| Фильтрует элементы по параллельному списку булевых значений. |
| `dropwhile(predicate, list)`| Пропускает элементы, пока условие истинно, затем возвращает все оставшиеся. |
| `takewhile(predicate, list)`| Возвращает элементы, пока условие истинно, и затем останавливается. |
| `group_by(list, key=None)`| Группирует подряд идущие одинаковые элементы. |
