---
layout: layouts/base.njk
title: "Модуль threading — Многопоточность"
description: "Глубокое погружение в модуль threading: GIL, Locks, Semaphores, Events, daemon-потоки и ThreadPoolExecutor."
language: ru
---

# threading — Потоковая паралелльность

Модуль `threading` позволяет выполнять несколько операций одновременно в рамках одной программы, распределяя их по "потокам". Потоки легче, чем процессы операционной системы, делят общую память приложения и идеально подходят для одновременного выполнения операций ввода/вывода.

```python
import threading
```

## Понимание GIL (Критически важно)

Прежде чем использовать многопоточность в Python, необходимо понять, что такое **GIL (Global Interpreter Lock — Глобальная блокировка интерпретатора)**.

GIL присутствует в стандартной реализации языка CPython. Это мьютекс, который защищает доступ к Python-объектам и не дает двум потокам исполнять Python-байткод в одну и ту же секунду.
*   **Что это значит:** Даже если у вас процессор с 16 ядрами, и вы запустите 16 потоков, **только один поток сможет исполнять код на Python в любой заданный микромомент времени**.
*   **Где `threading` ПОЛЕЗЕН:** Для **I/O-bound** задач (зависящих от ввода/вывода). К ним относятся HTTP-запросы, чтение и запись файлов, запросы к базам данных. В момент, когда один поток "ждет" (например, ответа от сети), он отпускает GIL, давая возможность поработать другому потоку.
*   **Где `threading` БЕСПОЛЕЗЕН:** Для **CPU-bound** задач (зависящих от процессора). Сложные математические вычисления, обработка изображений, криптография, написанные на чистом Python, не ускорятся от многопоточности, а могут даже замедлиться из-за накладных расходов на переключение между потоками. Для таких задач используйте модуль `multiprocessing`.

## 1. Создание и управление потоками

Самый базовый способ работы — создание объекта класса `Thread`.

```python
import threading
import time

def download_file(filename, delay):
    print(f"[Начало] Скачивание {filename}...")
    time.sleep(delay) # Имитация сетевой задержки
    print(f"[Финиш] {filename} скачан!")

# 1. Создание объектов потока. Принимает целевую функцию и ее аргументы.
t1 = threading.Thread(target=download_file, args=("file1.zip", 2))
t2 = threading.Thread(target=download_file, args=("file2.zip", 1))

# 2. Запуск. Поток переходит в статус 'готовых к выполнению' в ОС.
t1.start()
t2.start()

print("Главная программа выполняется сразу, не ожидая скачивания...")

# 3. Ожидание завершения потоков.
# Функция join() блокирует главную программу до окончания работы потока.
t1.join()
t2.join()

print("Все скачивания завершены!")
```

### Наследование от класса `Thread`

Для более сложной архитектуры вы можете наследоваться от `threading.Thread` и переопределить метод `run()`.

```python
import threading
import time

class FileDownloader(threading.Thread):
    def __init__(self, filename, delay):
        super().__init__() # ВАЖНО: всегда вызывайте __init__ предка
        self.filename = filename
        self.delay = delay
        
    def run(self):
        # Этот метод заменяет аргумент 'target'
        print(f"Поток-наследник качает {self.filename}")
        time.sleep(self.delay)

worker = FileDownloader("data.csv", 1.5)
worker.start()
worker.join()
```

## 2. Потоки-демоны (Daemon Threads)

По умолчанию программа на Python не завершится, пока все запущенные потоки не прекратят работу. Если же вам нужны фоновые задачи (проверка обновлений, автосохранение, heartbeat-сигналы), которые должны просто "умереть" при выходе из главной программы — используйте флаг `daemon`.

```python
import threading
import time

def heartbeat():
    while True:
        print("<Heartbeat ping>")
        time.sleep(1)

# Установка флага при создании
monitor = threading.Thread(target=heartbeat, daemon=True)
monitor.start()

time.sleep(3.5)
print("Программа закрывается. Поток-демон будет немедленно убит.")
```

## 3. Примитивы синхронизации

Поскольку все потоки имеют мгновенный доступ ко всем переменным в вашей программе, ситуация, когда два потока пытаются изменить одну переменную одновременно, приведет к порче данных (Состояние гонки — Race Condition). Для контроля доступа существуют примитивы синхронизации.

### Блокировки (Lock)

Самый базовый мьютекс. Гарантирует, что только один поток сможет исполнять помеченный блок кода в одну единицу времени.

```python
import threading

balance = 0
lock = threading.Lock()

def add_funds():
    global balance
    for _ in range(100_000):
        # ЛУЧШАЯ ПРАКТИКА: Используйте контекстный менеджер (with), 
        # он гарантирует, что блокировка будет снята даже при ошибке.
        with lock:
            balance += 1
            
        # Это эквивалентно следующему коду:
        # lock.acquire()
        # try:
        #     balance += 1
        # finally:
        #     lock.release()

threads = [threading.Thread(target=add_funds) for _ in range(10)]
for t in threads: t.start()
for t in threads: t.join()

print(f"Итоговый баланс: {balance}") # Гарантированно ровно 1,000,000
```

### Семафоры (Semaphore)

Тот же Lock, но позволяющий "пройти" определенному количеству потоков. Идеально для ограничения доступа к API (rate-limiting) или для создания пула соединений с БД.

```python
import threading
import time

# Максимум 3 одновременных подключения
api_semaphore = threading.Semaphore(3)

def fetch_api(user_id):
    print(f"Пользователь {user_id} ждет подключения...")
    with api_semaphore:
        print(f"Пользователь {user_id} -> Подключен! Идет работа...")
        time.sleep(2)

for i in range(1, 8):
    threading.Thread(target=fetch_api, args=(i,)).start()
# Потоки будут обрабатываться "пачками" по 3
```

### События (Event)

Работает как флаг или "светофор" для связи между потоками. Один поток включает "зеленый свет", а другие ждут его, чтобы начать работу.

```python
import threading
import time

event = threading.Event()

def task_waiter(name):
    print(f"{name} ждет разрешения...")
    event.wait() # Поток замораживается на этой строке
    print(f"{name} ПОГНАЛИ!")

def task_signaler():
    time.sleep(2)
    print("Регулятор: Даю добро! event.set()")
    event.set()

threading.Thread(target=task_waiter, args=("Авто 1",)).start()
threading.Thread(target=task_waiter, args=("Авто 2",)).start()
threading.Thread(target=task_signaler).start()
```

## 4. Современный подход: ThreadPoolExecutor

Управлять потоками вручную `t = Thread(...)`, складировать их в списки и прописывать `join()` для каждого тяжело и чревато ошибками. Для масштабных задач встроенный модуль `concurrent.futures` предлагает "Пул потоков".

**Это официально рекомендуемый подход для создания многопоточных программ на современном Python.**

```python
import concurrent.futures
import time

def fetch_content(page_num):
    time.sleep(1) # Имитация ожидания
    return f"Содержимое страницы {page_num}"

# Менеджер контекста сам управляет потоками и сам вызывает join()
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
    
    # Способ 1: Одиночная отправка (возвращает объект Future)
    future1 = executor.submit(fetch_content, 1)
    print("Задача 1:", future1.result()) # result() - блокирующий вызов
    
    # Способ 2: Метод map() (Идеально для итерации по огромным спискам)
    pages_to_fetch = [3, 4, 5, 6, 7]
    
    # Раскидывает список по пулу из 5 потоков
    results = executor.map(fetch_content, pages_to_fetch)
    
    for res in results:
        print(res)
```

## Многопоточность (Threading) против Асинхронности (Asyncio)

Оба подхода решают проблему I/O блокировок.

* **Threading (Потоки):** Переключение происходит принудительно операционной системой (Вытесняющая многозадачность). Легко интегрировать в старый/синхронный код (например базу `requests`). Минусы: сложно отлаживать, высок риск Race Conditions, каждый поток "съедает" системные ресурсы (RAM).
* **Asyncio (Асинхронность):** Поток один. Код сам "вежливо" передает управление в местах `await` (Кооперативная многозадачность). Минусы: нельзя использовать с обычными функциями вроде `time.sleep` или `requests`, они заблокируют весь event-loop. Вся архитектура должна быть переписана под подход `async`.

## Официальная документация

[threading — Thread-based parallelism](https://docs.python.org/3/library/threading.html)
