---
layout: layouts/base.njk
title: "Модуль urllib — Работа с URL"
description: "Документация urllib: HTTP запросы, парсинг URL, GET/POST"
language: ru
---

# urllib — Модули для работы с URL

Модуль `urllib` объединяет несколько библиотек для работы с URL: `request`, `error`, `parse` и `robotparser`.

```python
import urllib.request
import urllib.parse
```

## Простые GET запросы

```python
import urllib.request

url = 'http://example.com'
with urllib.request.urlopen(url) as response:
    html = response.read()           # Бинарные данные (bytes)
    text = html.decode('utf-8')      # Текстовые данные
    
    print(response.status)           # 200
```

## POST запросы

Данные нужно закодировать перед отправкой:

```python
import urllib.request
import urllib.parse

url = 'http://httpbin.org/post'
data = {'name': 'Алиса', 'age': 30}

bytes_data = urllib.parse.urlencode(data).encode('utf-8')
req = urllib.request.Request(url, data=bytes_data)

with urllib.request.urlopen(req) as response:
    print(response.read().decode('utf-8'))
```

## Добавление заголовков (User-Agent)

```python
import urllib.request

req = urllib.request.Request('http://example.com', headers={
    'User-Agent': 'Mozilla/5.0'
})
urllib.request.urlopen(req)
```

## Обработка ошибок

```python
import urllib.request
import urllib.error

try:
    urllib.request.urlopen('http://example.com/404')
except urllib.error.HTTPError as e:
    print(f"Ошибка HTTP: {e.code}")
except urllib.error.URLError as e:
    print(f"Ошибка сети: {e.reason}")
```

## Парсинг URL (urllib.parse)

```python
from urllib.parse import urlparse, parse_qs, urlencode

parsed = urlparse('https://example.com/path?query=1#hash')
print(parsed.query)      # 'query=1'

params = parse_qs(parsed.query)
print(params)            # {'query': ['1']}

# Создание строки запроса
print(urlencode({'q': 'поиск'})) # 'q=%D0%BF%D0%BE%D0%B8%D1%81%D0%BA'
```

## Альтернатива: библиотека requests

> **Примечание:** Несмотря на то, что `urllib` встроенный, большинство Python-разработчиков предпочитают использовать внешнюю библиотеку `requests`, так как её API значительно проще.

## Официальная документация

[urllib — URL handling modules](https://docs.python.org/3/library/urllib.html)

## Полный справочник API (API Reference)

### urllib.request (Запросы)

| Функция/Класс | Описание |
|---------------|----------|
| `urllib.request.urlopen(url, data=None)`| Выполняет запрос к URL (GET по умолчанию или POST, если есть `data`). Возвращает объект ответа. |
| `urllib.request.Request(url, data, headers)`| Класс-обертка для формирования сложного запроса с кастомными заголовками (например, `User-Agent`). |

### Объект HTTPResponse (Возвращается urlopen)

| Метод/Атрибут | Описание |
|---------------|----------|
| `response.read([size])` | Считывает всё тело ответа (возвращает `bytes`, не `str`!). |
| `response.geturl()` | Возвращает итоговый URL после всех возможных редиректов. |
| `response.info()`| Возвращает объект с HTTP-заголовками ответа. |
| `response.status`| HTTP статус-код (например, `200` или `404`). |

### urllib.parse (Разбор)

| Функция | Описание |
|---------|----------|
| `urllib.parse.urlparse(url)`| Разбивает URL на 6 частей (протокол, домен, путь, параметры, etc.). |
| `urllib.parse.parse_qs(qs)`| Преобразует строку параметров `?a=1&b=2` в Python словарь. |
| `urllib.parse.urlencode(dict)`| Преобразует словарь в закодированную строку параметров для URL. |
