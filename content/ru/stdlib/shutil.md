---
layout: layouts/base.njk
title: "Модуль shutil — Операции с файлами"
description: "Документация shutil: копирование файлов, удаление папок, архивирование"
language: ru
---

# shutil — Высокоуровневые операции с файлами

Модуль `shutil` предоставляет ряд высокоуровневых операций с файлами и коллекциями файлов. Особое внимание уделяется функциям копирования и удаления. В отличие от модуля `os`, который работает на низком уровне, `shutil` умеет копировать файлы целиком, а также рекурсивно удалять папки.

```python
import shutil
```

## Копирование файлов и директорий

```python
import shutil

# Скопировать файл (метаданные, такие как время создания, НЕ сохраняются)
shutil.copy('source.txt', 'dest.txt')
shutil.copy('source.txt', 'backup_dir/') # Копирование внутрь папки

# Скопировать файл СО ВСЕМИ метаданными (права, время изменения)
shutil.copy2('source.txt', 'dest.txt')

# Рекурсивное копирование всей папки (вместе со вложенными)
shutil.copytree('my_project/', 'my_project_backup/')
```

## Перемещение и удаление

```python
import shutil

# Перемещение файла или папки (также работает как переименование)
shutil.move('old_folder/', 'new_folder/')
shutil.move('file.txt', 'archive/file.txt')

# Рекурсивное удаление папки со всем содержимым (ОСТОРОЖНО!)
# Эквивалент команды 'rm -rf' в Linux
shutil.rmtree('old_project/')
```

## Архивирование (Zip, Tar)

Модуль включает очень простой интерфейс для создания архивов. 

```python
import shutil

# Создание архива из папки 'project'
# использование: make_archive(имя_архива, формат, папка_для_упаковки)
shutil.make_archive('project_backup', 'zip', 'project/')
# Результат: будет создан 'project_backup.zip'

# Распаковка архива
shutil.unpack_archive('project_backup.zip', 'extracted_folder/')
```

## Информация о диске

Проверка свободного места (доступно с Python 3.3+).

```python
import shutil

total, used, free = shutil.disk_usage("/")

print(f"Всего: {total // (2**30)} ГБ")
print(f"Свободно: {free // (2**30)} ГБ")
```

---

## Полный справочник API (API Reference)

### Файловые операции

| Функция | Описание |
|---------|----------|
| `shutil.copy(src, dst)` | Копирует содержимое файла и права доступа. |
| `shutil.copy2(src, dst)` | Копирует содержимое файла ПЛЮС все метаданные (дату создания/изменения). |
| `shutil.copyfile(src, dst)` | Быстро копирует только сырое содержимое (без метаданных). |
| `shutil.copytree(src, dst)` | Рекурсивно копирует всё дерево директории `src` в `dst`. |
| `shutil.rmtree(path)` | Рекурсивно удаляет директорию и всё, что внутри неё. |
| `shutil.move(src, dst)` | Перемещает файл или директорию по новому пути. |
| `shutil.which(cmd)` | Ищет путь к исполняемому файлу (эквивалент UNIX команды `which`). |

### Операции с архивами

| Функция | Описание |
|---------|----------|
| `shutil.make_archive(name, format, root)`| Создает архив форматов: 'zip', 'tar', 'gztar', 'bztar', 'xztar'. |
| `shutil.unpack_archive(name, extract_dir)`| Распаковывает архив в директорию `extract_dir`. |
| `shutil.get_archive_formats()`| Возвращает список поддерживаемых форматов архивации на данном ПК. |
