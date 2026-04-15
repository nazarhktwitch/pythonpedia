---
layout: layouts/base.njk
title: "Модуль hashlib — Хеширование"
description: "Документация hashlib: SHA-256, MD5, хеширование паролей и файлов"
language: ru
---

# hashlib — Безопасные хеши и дайджесты сообщений

Модуль реализует общий интерфейс для множества алгоритмов хеширования (SHA1, SHA256, MD5 и т.д.).

```python
import hashlib
```

## Базовое хеширование

Данные для хеширования должны передаваться в виде **байт** (`bytes`), а не обычных строк.

```python
import hashlib

# 1. Выбор алгоритма
m = hashlib.sha256()

# 2. Добавление данных
m.update(b"Hello")
m.update(" World".encode('utf-8'))

# 3. Результат
print(m.hexdigest()) # Шестнадцатеричная строка (самый частый вариант)
```

Компактная запись:

```python
hash_str = hashlib.sha256("Текстовые данные".encode('utf-8')).hexdigest()
```

## Хеширование файлов (без перегрузки памяти)

Для больших файлов нужно обновлять хеш порциями (чанками):

```python
import hashlib

def get_file_hash(filename):
    h = hashlib.sha256()
    with open(filename, 'rb') as file:
        chunk = 0
        while chunk != b'':
            # Читаем по 4 КБ
            chunk = file.read(4096)
            h.update(chunk)
    return h.hexdigest()

print(get_file_hash("large_file.zip"))
```

## Хеширование паролей

Обычного SHA-256 недостаточно для паролей. Используйте генерацию ключей (PBKDF2):

```python
import hashlib
import os

password = b"my_password123"
salt = os.urandom(32) # Уникальная соль для каждого пользователя

# PBKDF2 с SHA256 и 100 000 итераций
hashed_key = hashlib.pbkdf2_hmac('sha256', password, salt, 100000)

print(hashed_key.hex())
```

> **Примечание:** Для промышленных решений управления паролями лучше использовать сторонние пакеты, например `bcrypt` или `argon2-cffi`, либо стандартный `secrets`.

## Официальная документация

[hashlib — Secure hashes and message digests](https://docs.python.org/3/library/hashlib.html)

## Полный справочник API (API Reference)

### Алгоритмы хеширования

| Функция | Описание |
|---------|----------|
| `hashlib.sha256([data])` | Создает объект алгоритма SHA-256 (самый рекомендуемый стандарт). Если передана строка в виде `bytes`, инициализирует ей. |
| `hashlib.md5([data])` | Создает объект устаревшего MD5-алгоритма. |
| `hashlib.new(name)`| Общий конструктор. Принимает имя алгоритма строкой, например `'sha1'`. |

### Методы объекта хеша

| Метод | Описание |
|-------|----------|
| `hash.update(data)` | Добавляет порцию новых байтовых данных к хешу (меняет внутреннее состояние). |
| `hash.digest()` | Возвращает готовый хеш в формате объекта `bytes`. |
| `hash.hexdigest()` | Возвращает готовый хеш в формате шестнадцатеричной строки `str` (состоит только из английских букв от a до f и цифр от 0 до 9). |

### Ключи и защита паролей

| Функция | Описание |
|---------|----------|
| `hashlib.pbkdf2_hmac(name, pwd, salt, iter)`| Мощная функция вычисления стойкого хеша для пароля на основе алгоритма вывода ключей PBKDF2. |
