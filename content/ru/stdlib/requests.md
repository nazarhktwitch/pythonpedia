---
layout: layouts/base.njk
title: "requests — HTTP для Людей"
description: "Документация requests: отправка GET/POST HTTP-запросов, заголовки, JSON"
language: ru
---

# requests — HTTP для Людей™

Хотя в Python есть встроенный `urllib`, именно пакет **`requests`** считается мировым де-факто стандартом для сетевых HTTP-запросов в языке. Это сторонняя библиотека, но без неё не обходится ни один серьезный проект, поэтому её часто включают в шпаргалки наравне со стандартными модулями.

*Внимание: Это сторонняя библиотека. Установите её: `pip install requests`.*

```python
import requests
```

## Простой GET-запрос

Отправка запросов через `requests` невероятно проста. Смотрите, как легко достать готовый словарь, ответственный за разбор JSON (даже не нужно импортировать модуль `json`):

```python
import requests

# Делаем простой запрос GET
response = requests.get('https://api.github.com/events')

# Проверка статус-кода (200 - Ок, 404 - Не найдено)
print(response.status_code)

# Получение текстового содержимого (HTML-код или ответ сервера)
print(response.text)

# Встроенный парсинг JSON ответа!
data = response.json()
print(data[0]['id'])
```

## Отправка данных (POST-запрос)

Отправка форм, загрузка файлов и передача JSON происходят магически без ручной настройки заголовков!

```python
import requests

url = 'https://httpbin.org/post'
payload = {'username': 'bob', 'password': '123'}

# 1. Отправить как обычную форму браузере (x-www-form-urlencoded):
r1 = requests.post(url, data=payload)

# 2. Отправить как чистый JSON-объект!
# Библиотека САМА поставит заголовок 'Content-Type: application/json'
r2 = requests.post(url, json=payload)
```

## Параметры и заголовки

Безопасное добавление параметров к URL-адресу (строит ссылку за вас) и авторизация:

```python
import requests

url = 'https://api.example.com/search'
query_params = {'limit': 10, 'search': 'python requests'}
headers = {'Authorization': 'Bearer ВАШ_ТОКЕН'}

# Важно: всегда используйте `timeout`, иначе скрипт может зависнуть навечно,
# если сервер просто перестанет отвечать!
response = requests.get(
    url, 
    params=query_params, 
    headers=headers,
    timeout=5 
)
```

---

## Полный справочник API (API Reference)

### Базовые функции запросов

Каждая из этих функций возвращает объект результата `Response`.
| Метод | Описание |
|-------|----------|
| `requests.get(url, params=None, **kwargs)`| Отправляет запрос GET. В `params` можно передать словарь url-переменных запроса. |
| `requests.post(url, data=None, json=None)`| Отправляет POST. Аргумент `data` используется для форм и файлов. Аргумент `json` для прямой отправки JSON-структур. |
| `requests.put(url, data=None)`| Отправляет запрос PUT для изменения ресурса. |
| `requests.delete(url)`| Отправляет запрос DELETE. |

### Важные параметры запроса (`**kwargs`)

Могут быть переданы в любую функцию (get, post...).
| Параметр | Описание |
|----------|----------|
| `headers=dict` | Словарь с кастомными HTTP-заголовками пользователя. |
| `cookies=dict` | Словарь для отправки готовых "куки"-файлов. |
| `auth=(user, pwd)`| Кортеж логин-пароль для простой Basic/Digest авторизации. |
| `timeout=int` | Сколько секунд скрипт должен ЖДАТЬ ответа на запрос (выдает Timeout Exception). |

### Свойства объекта Response (Ответ)

| Свойство / Метод | Описание |
|------------------|----------|
| `response.text` | Строка `str` (Юникод) с текстовым телом ответа сервера. |
| `response.content` | Сырая строка байт `bytes` тела ответа (Используйте для скачивания картинок, zip-файлов). |
| `response.json()` | Метод, автоматически декодирующий ответ в Python-словарь или список. |
| `response.status_code`| Число `int` HTTP кода возврата (например 200). |
| `response.ok` | Булево свойство. Истинно, если `status_code` < 400. |
| `response.headers` | Нечувствительный к регистру букв словарь всех заголовков, присланных сервером в ответ на наш запрос. |
| `response.raise_for_status()`| Вызывает исключение (краш ошибки `HTTPError`), если сервер ответил статусом 4xx или 5xx. Очень удобно, чтобы стопнуть код при неудаче. |
