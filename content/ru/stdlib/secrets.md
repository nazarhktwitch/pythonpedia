---
layout: layouts/base.njk
title: "Модуль secrets — Безопасная генерация"
description: "Документация secrets: криптографически безопасные случайные числа"
language: ru
---

# secrets — Безопасные случайные числа

Модуль `secrets` следует применять вместо `random` при работе с паролями, токенами аутентификации и криптографией.

```python
import secrets
import string

# Генерация токенов (API ключи)
api_key = secrets.token_hex(32)
url_token = secrets.token_urlsafe(32)

# Безопасный выбор элементов (например, для пароля)
alphabet = string.ascii_letters + string.digits
password = ''.join(secrets.choice(alphabet) for i in range(12))

# Безопасное сравнение строк (защита от timing-атак)
is_valid = secrets.compare_digest("token_A", "token_B")
```

## Полный справочник API (API Reference)

### Выбор и числа

| Функция | Описание |
|---------|----------|
| `secrets.choice(seq)` | Выбирает криптографически безопасный случайный элемент из последовательности. |
| `secrets.randbelow(n)`| Случайное целое число в диапазоне от 0 до `n-1`. |
| `secrets.randbits(k)` | Возвращает целое число, состоящее из `k` случайных бит. |

### Токены и пароли

| Функция | Описание |
|---------|----------|
| `secrets.token_bytes([nbytes])`| Генерирует и возвращает сырые рандомные байты. |
| `secrets.token_hex([nbytes])`| Токен в формате безопасной 16-ричной строке (длина строки будет в два раза больше `nbytes`). |
| `secrets.token_urlsafe([nbytes])`| Генерирует токен (в формате Base64), где нет символов, ломающих URL-адрес (`+`, `/`, `=`). |

### Безопасность

| Функция | Описание |
|---------|----------|
| `secrets.compare_digest(a, b)`| Сравнивает строки полностью защищенным от атак по времени (Timing Attack) способом. |
