---
layout: layouts/base.njk
title: "Модуль subprocess — Запуск процессов"
description: "Документация subprocess: запуск внешних команд, чтение вывода, Popen"
language: ru
---

# subprocess — Управление подпроцессами

Модуль `subprocess` позволяет запускать новые процессы, подключаться к их каналам ввода/вывода/ошибок и получать коды возврата.

```python
import subprocess
```

## Функция run()

Для большинства задач используется `subprocess.run()`.

```python
import subprocess

# Просто запуск (вывод в консоль)
subprocess.run(["ls", "-l"])

# Перехват вывода (capture_output=True) и работа со строками (text=True)
result = subprocess.run(["echo", "Привет"], capture_output=True, text=True)

print(result.stdout)      # "Привет\n"
print(result.returncode)  # 0 (успех)
```

## Обработка ошибок

Если передать `check=True`, функция выбросит исключение при ошибке (коде возврата != 0):

```python
try:
    subprocess.run(["ls", "missing.txt"], check=True, capture_output=True)
except subprocess.CalledProcessError as e:
    print(f"Ошибка с кодом {e.returncode}")
```

## Класс Popen

Для тяжелых задач или работы с процессами в фоне используется класс `Popen`.

```python
import subprocess

# Запуск в фоне
p = subprocess.Popen(["sleep", "3"])
print("Процесс работает...")

# Ожидание завершения
p.wait()
print("Готово!")
```

## Безопасность (shell=True)

> **Критично:** Никогда не используйте `shell=True` с непроверенным пользовательским вводом во избежание shell-инъекций.

```python
user_input = "file.txt; rm -rf /"

# БЕЗОПАСНО: список аргументов
subprocess.run(["cat", user_input]) 

# ОПАСНО: shell выполнит команду rm!
# subprocess.run(f"cat {user_input}", shell=True) 
```

## Частые ошибки

- **Использование `os.system()`** — устаревший подход, используйте `subprocess`.
- **Строка вместо списка** — передавайте команды списком `["git", "status"]`.
- **Забыт `text=True`** — без него вывод будет в байтах `b"строка"`.

## Официальная документация

[subprocess — Subprocess management](https://docs.python.org/3/library/subprocess.html)

## Полный справочник API (API Reference)

### Основные функции

| Функция/Класс | Описание |
|---------------|----------|
| `subprocess.run(args, *, capture_output=True, text=True, check=True)`| Рекомендуемая функция. Запускает команду, дожидается её выполнения и возвращает объект результата `CompletedProcess`. |
| `subprocess.CompletedProcess` | Результат функции `run()`. Содержит код возврата и вывод команды. |
| `subprocess.Popen(args)`| Низкоуровневый класс. Запускает процесс в фоне, не блокируя основной поток выполнения Python до ручного вызова `.wait()`. |

### Атрибуты `CompletedProcess` (возвращаемое `run()` значение)

| Атрибут | Описание |
|---------|----------|
| `returncode`| Код возврата операционной системы (0 - успех, остальное - код ошибки). |
| `stdout` | Вывод в консоль от выполненной программы (в виде строки, если стоял флаг `text=True`). |
| `stderr` | Вывод ошибок в консоль (красный лог). |
