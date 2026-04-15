---
layout: layouts/base.njk
title: "Модуль unittest — Модульное тестирование"
description: "Документация unittest: фреймворк для тестирования, assertions, моки (mocks)"
language: ru
---

# unittest — Фреймворк тестирования

Модуль `unittest` (вдохновленный JUnit) предоставляет богатый набор инструментов для написания и запуска тестов.

```python
import unittest
```

## Базовый тест

```python
import unittest

def add(a, b): return a + b

class TestMath(unittest.TestCase):
    
    def setUp(self):
        # Выполняется перед каждым тестом
        self.a = 10
        self.b = 5

    def test_add(self):
        # Имя метода должно начинаться с 'test_'
        self.assertEqual(add(self.a, self.b), 15)

if __name__ == '__main__':
    unittest.main()
```

## Основные проверки (Assertions)

```python
self.assertEqual(a, b)      # Равенство
self.assertTrue(x)          # Истинность
self.assertIsNone(x)        # Проверка на None
self.assertIn(a, b)         # Вхождение
```

## Тестирование исключений

```python
def test_error(self):
    with self.assertRaises(ValueError):
        int("не число")
```

## Пропуск тестов

```python
import sys

@unittest.skip("В разработке")
def test_future(self): pass

@unittest.skipIf(sys.platform == "win32", "Не для Windows")
def test_linux(self): pass
```

## Моки (unittest.mock)

```python
from unittest.mock import patch
import unittest

class TestAPI(unittest.TestCase):
    @patch('requests.get')
    def test_api_call(self, mock_get):
        mock_get.return_value.json.return_value = {'name': 'Alice'}
        # ... тест с использованием замоканного запроса ...
```

## Запуск тестов

```bash
# Все тесты в файле
python -m unittest test_file.py

# Автоматический поиск тестов в папке
python -m unittest discover
```

## Официальная документация

[unittest — Unit testing framework](https://docs.python.org/3/library/unittest.html)

## Полный справочник API (API Reference)

### Основные классы и методы

| Класс/Метод | Описание |
|-------------|----------|
| `unittest.TestCase` | Базовый класс для создания набора тестов. |
| `TestCase.setUp()` | Метод, вызываемый ПЕРЕД каждым тестом в классе (подготовка). |
| `TestCase.tearDown()`| Метод, вызываемый ПОСЛЕ каждого теста (очистка). |
| `TestCase.assertEqual(a, b)`| Проверка равенства `a == b`. |
| `TestCase.assertTrue(x)` | Проверка истинности `bool(x) == True`. |
| `TestCase.assertRaises(exc)`| Менеджер контекста: проверяет, генерирует ли код исключение `exc`. |

### Мокирование (Mock)

| Объект | Описание |
|--------|----------|
| `unittest.mock.MagicMock` | Объект-"заглушка", у которого реализованы все магические методы Python (можно подставить вместо реального объекта). |
| `@unittest.mock.patch()`  | Декоратор для временной (на время теста) замены (мока) функции или класса по указанному пути. |
