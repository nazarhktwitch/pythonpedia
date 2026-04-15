---
layout: layouts/base.njk
title: "Модуль math — Математика"
description: "Документация math: математические функции, константы, тригонометрия"
language: ru
---

# math — Математические функции

```python
import math
```

## Константы

```python
math.pi    # 3.141592653589793
math.e     # 2.718281828459045
math.inf   # Бесконечность
math.nan   # Not a Number
```

## Основные функции

```python
math.ceil(4.2)     # 5 (округление вверх)
math.floor(4.7)    # 4 (округление вниз)
math.factorial(5)  # 120
math.gcd(12, 8)    # 4 (НОД)
math.sqrt(16)      # 4.0
math.pow(2, 10)    # 1024.0
math.log(100)      # Натуральный логарифм
math.log10(100)    # 2.0
```

## Тригонометрия

```python
math.sin(math.pi / 2)   # 1.0
math.cos(0)              # 1.0
math.degrees(math.pi)   # 180.0
math.radians(180)        # π
math.hypot(3, 4)         # 5.0
```

## Сравнение чисел

```python
math.isclose(0.1 + 0.2, 0.3)  # True
math.isinf(float('inf'))      # True
math.isnan(float('nan'))      # True
```

## Частые ошибки

- **Точность float** — используйте `math.isclose()` вместо `==`
- **Углы в радианах** — конвертируйте через `math.radians()`
- **`math.pow` vs `**`** — `math.pow` всегда возвращает float

## Официальная документация

[math — Mathematical functions](https://docs.python.org/3/library/math.html)

## Полный справочник API (API Reference)

### Математические функции

| Функция | Описание |
|---------|----------|
| `math.ceil(x)` | Округление x вверх (мельчайшее целое >= x). |
| `math.floor(x)`| Округление x вниз (наибольшее целое <= x). |
| `math.isclose(a, b, *, rel_tol=1e-09)`| Возвращает `True`, если `a` и `b` почти равны (защита от ошибок float). |
| `math.sqrt(x)` | Квадратный корень. |
| `math.pow(x, y)` | Возводит x в степень y (возвращает float). |
| `math.log(x, [base])` | Логарифм числа x (натуральный по умолчанию). |
| `math.gcd(*integers)` | Наибольший общий делитель. |

### Константы

| Константа | Описание |
|-----------|----------|
| `math.pi` | Константа π = 3.141592... |
| `math.e` | Константа e = 2.718281... |
| `math.inf` | Положительная бесконечность. |
| `math.nan` | Значение "не число" (NaN). |
