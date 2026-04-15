---
layout: layouts/base.njk
title: "Модуль zipfile — Работа с ZIP-архивами"
description: "Документация zipfile: создание, распаковка и просмотр ZIP-архивов"
language: ru
---

# zipfile — Работа с ZIP-архивами

Модуль `zipfile` предоставляет инструменты для создания, чтения, дополнения и распаковки стандартных ZIP архивов. Поддерживает работу с алгоритмами сжатия (Deflate, LZMA, BZIP2).

```python
import zipfile
```

## Создание архива

Для того чтобы файлы действительно *сгжимались* (а не просто собирались в одну папку), обязательно нужно передать флаг компрессии, например `ZIP_DEFLATED`.

```python
import zipfile

# 'w' - означает создание нового архива (сотрет старый, если есть)
with zipfile.ZipFile('backup.zip', 'w', compression=zipfile.ZIP_DEFLATED) as zf:
    # Первый аргумент - локальный файл;
    # Второй аргумент - имя, под которым он сохранится внутри архива.
    zf.write('document.txt', 'docs/doc.txt')
    zf.write('image.png', 'assets/image.png')
```

## Распаковка архива

```python
import zipfile

# 'r' - режим чтения
with zipfile.ZipFile('backup.zip', 'r') as zf:
    # Вывести список всех файлов внутри
    print(zf.namelist()) 
    
    # Полная распаковка в папку `extracted/`
    zf.extractall('extracted/')
```

## Чтение прямиком в память

Вы можете прочитать содержимое конкретного файла без необходимости распаковывать архив на жесткий диск.

```python
import zipfile

with zipfile.ZipFile('backup.zip', 'r') as zf:
    info = zf.getinfo('docs/doc.txt')
    print(f"Размер без сжатия: {info.file_size} байт")
    
    # Чтение как бинарного файла
    with zf.open('docs/doc.txt') as file:
        text = file.read().decode('utf-8')
        print(text)
```

---

## Полный справочник API (API Reference)

### Класс `ZipFile`

| Метод | Описание |
|-------|----------|
| `zipfile.ZipFile(file, mode='r', compression=ZIP_STORED)`| Открывает архив. Режимы: `r` (чтение), `w` (перезапись), `a` (дополнение существующего архива - Append). |
| `ZipFile.close()` | Закрывает файл архива (вызывается автоматически при завершении блока `with`). |
| `ZipFile.getinfo(name)` | Возвращает объект `ZipInfo` (информацию о весе и дате конкретного файла внутри архива). |
| `ZipFile.namelist()`| Вовзращает список строк — структуру всех файлов внутри архива. |
| `ZipFile.open(name, mode='r')`| Открывает конкретный файл внутри архива для "потокового" чтения на лету. |
| `ZipFile.extract(member, path=None)`| Скачивает и распаковывает ОДИН конкретный файл из архива в папку `path`. |
| `ZipFile.extractall(path=None)`| Полная распаковка всех файлов папки и суб-директорий на жесткий диск в папку `path`. |
| `ZipFile.read(name)`| Быстро загружает и возвращает весь файл `name` в виде единой строки `bytes`. |
| `ZipFile.write(filename, arcname)`| Записывает реальный файл `filename` с жесткого диска в архив под именем `arcname`. |
| `ZipFile.writestr(arcname, data)`| Создает новый текстовый файл архиве "на лету" из переданной строки `data` в оперативной памяти. |

### Константы сжатия

| Константа | Описание |
|-----------|----------|
| `zipfile.ZIP_STORED` | Архивирование без сжатия (по умолчанию). |
| `zipfile.ZIP_DEFLATED`| Стандартный и самый частый метод сжатия ZIP (для него библиотека требует наличие модуля `zlib`). |
| `zipfile.ZIP_LZMA` | Метод сжатия с наивысшей степенью компрессии. |
