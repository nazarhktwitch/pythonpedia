---
layout: layouts/base.njk
title: "Модуль random — Случайные числа"
description: "Документация random: случайные числа, выбор, перемешивание"
language: ru
---

# random — Генерация случайных чисел

```python
import random

random.random()            # Float [0.0, 1.0)
random.uniform(1.0, 10.0)  # Float [1.0, 10.0]
random.randint(1, 100)     # Целое [1, 100]

items = ['яблоко', 'банан', 'вишня']
random.choice(items)       # Один случайный
random.shuffle(items)      # Перемешать на месте
random.sample(items, k=2)  # 2 без повторений

random.seed(42)            # Воспроизводимость
```

## Предупреждение

> Для криптографии используйте модуль `secrets` — `random` НЕ криптографически безопасен!

## Официальная документация

[random — Generate pseudo-random numbers](https://docs.python.org/3/library/random.html)

## Полный справочник API (API Reference)

### Основные функции

| Функция | Описание |
|---------|----------|
| `random.seed(a=None)` | Инициализирует генератор случайных чисел фиксированным значением. |
| `random.getstate()` | Возвращает текущее внутреннее состояние генератора. |

### Целые числа

| Функция | Описание |
|---------|----------|
| `random.randrange(start, stop[, step])` | Случайное число из диапазона `range(start, stop, step)`. |
| `random.randint(a, b)` | Случайное целое число N: `a <= N <= b`. |

### Последовательности

| Функция | Описание |
|---------|----------|
| `random.choice(seq)` | Выбирает случайный элемент из последовательности. |
| `random.choices(population, weights=None, *, k=1)`| Возвращает список из `k` элементов с возвратом (можно задать веса). |
| `random.shuffle(x)` | Перемешивает последовательность на месте. |
| `random.sample(population, k)` | Возвращает список уникальных элементов без возврата. |

### Вещественные числа

| Функция | Описание |
|---------|----------|
| `random.random()` | Случайное float число от 0.0 до 1.0. |
| `random.uniform(a, b)` | Случайное float число от `a` до `b`. |
