# Python File Handling — Notes

File handling lets a program **read from and write to files** on disk, so data survives after the program ends.

> **Why this matters** — Variables live only while a program runs. Files are how you persist data: save user settings, read a dataset, write a report, log what happened. Almost every real program touches a file.

### The mental model

```text
Open  →  Read / Write  →  Close

open(path, mode)   read() / write()   close()
```

Three steps, always. Forgetting the third is the classic file-handling bug — which is why the `with` statement exists.

---

## 1. Opening Files

### `open()`

```python
file = open("data.txt", "r")
```

| Argument | Meaning |
| -------- | ------- |
| path | Where the file is (relative or absolute) |
| mode | What you intend to do (see below) |
| encoding | Text encoding — use `"utf-8"` |

### File modes

| Mode | Meaning | Creates if missing? | Truncates? |
| ---- | ------- | ------------------- | ---------- |
| `"r"` | Read (default) | No — raises error | No |
| `"w"` | Write | Yes | **Yes** |
| `"a"` | Append | Yes | No |
| `"x"` | Exclusive create | Yes — fails if exists | — |
| `"r+"` | Read and write | No | No |
| `"b"` | Binary (append: `"rb"`, `"wb"`) | — | — |
| `"t"` | Text (default) | — | — |

```python
f = open("data.txt", "r")        # read
f = open("data.txt", "w")        # write — ERASES existing content
f = open("data.txt", "a")        # append — adds to the end
f = open("image.png", "rb")      # binary read
```

> **Warning** — Opening with `"w"` **immediately truncates** the file, even if you never write anything. Use `"a"` to add to a file, or `"x"` to fail safely if it already exists.

### Always close the file

```python
file = open("data.txt", "r")
content = file.read()
file.close()
```

Forgetting `close()` can leave data unwritten (writes are buffered) and exhaust file handles.

### Handling a missing file

```python
file = open("missing.txt", "r")
```

Output:

```text
FileNotFoundError: [Errno 2] No such file or directory: 'missing.txt'
```

```python
try:
    file = open("missing.txt", "r")
except FileNotFoundError:
    print("File not found")
```

### Encoding

Always specify encoding for text files to avoid platform differences:

```python
file = open("data.txt", "r", encoding="utf-8")
```

### Checking whether a file exists

```python
import os

if os.path.exists("data.txt"):
    print("File exists")
else:
    print("File not found")
```

---

## 2. Reading Files

### `.read()` — the whole file

```python
file = open("data.txt", "r", encoding="utf-8")
content = file.read()
file.close()

print(content)
```

With `data.txt` containing:

```text
Hello
World
Python
```

Output:

```text
Hello
World
Python
```

### `.read(n)` — a fixed number of characters

```python
file = open("data.txt", "r", encoding="utf-8")
print(file.read(5))      # Hello
file.close()
```

### `.readline()` — one line at a time

```python
file = open("data.txt", "r", encoding="utf-8")

print(file.readline())      # Hello
print(file.readline())      # World

file.close()
```

Each call advances to the next line.

### `.readlines()` — all lines as a list

```python
file = open("data.txt", "r", encoding="utf-8")
lines = file.readlines()
file.close()

print(lines)
```

Output:

```text
['Hello\n', 'World\n', 'Python\n']
```

> **Note** — Each line keeps its trailing `\n`. Strip it with `.strip()` or `rstrip("\n")`.

### Iterating line by line — the preferred way

```python
file = open("data.txt", "r", encoding="utf-8")

for line in file:
    print(line.strip())

file.close()
```

Output:

```text
Hello
World
Python
```

> **Why this is best** — It reads one line at a time, so it uses almost no memory even on a multi-gigabyte file. `.read()` and `.readlines()` load everything at once.

### Cleaning up lines

```python
with open("data.txt", "r", encoding="utf-8") as file:
    lines = [line.strip() for line in file]

print(lines)
```

Output:

```text
['Hello', 'World', 'Python']
```

---

## 3. Writing

### Writing a new file

```python
file = open("output.txt", "w", encoding="utf-8")
file.write("Hello\n")
file.write("World\n")
file.close()
```

`output.txt` now contains:

```text
Hello
World
```

### Reminder: `"w"` overwrites

```python
file = open("output.txt", "w", encoding="utf-8")
file.write("New content")
file.close()
```

`output.txt` now contains only:

```text
New content
```

The previous contents are gone.

### `.write()` returns the character count

```python
file = open("output.txt", "w", encoding="utf-8")
count = file.write("Hello")
file.close()

print(count)
```

Output:

```text
5
```

### `.write()` does not add newlines

You must include `\n` yourself:

```python
file.write("Line 1")        # no newline
file.write("Line 2")        # → Line 1Line 2

file.write("Line 1\n")
file.write("Line 2\n")      # → two lines
```

### Writing several lines — `.writelines()`

```python
lines = ["First\n", "Second\n", "Third\n"]

file = open("output.txt", "w", encoding="utf-8")
file.writelines(lines)
file.close()
```

> **Note** — `.writelines()` does **not** add newlines. Each string must already end with one.

### Writing formatted data

```python
name = "Mahesh"
age = 24

with open("profile.txt", "w", encoding="utf-8") as file:
    file.write(f"Name: {name}\n")
    file.write(f"Age: {age}\n")
```

---

## 4. Appending

Mode `"a"` adds to the end without erasing what is there.

```python
file = open("log.txt", "a", encoding="utf-8")
file.write("New entry\n")
file.close()
```

If `log.txt` contained:

```text
Old entry
```

It now contains:

```text
Old entry
New entry
```

### Appending several lines

```python
entries = ["Entry 1\n", "Entry 2\n"]

with open("log.txt", "a", encoding="utf-8") as file:
    file.writelines(entries)
```

### A simple logger

```python
from datetime import datetime

def log(message, filename="app.log"):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(filename, "a", encoding="utf-8") as file:
        file.write(f"[{timestamp}] {message}\n")


log("Application started")
log("User logged in")
```

`app.log`:

```text
[2026-09-03 10:15:30] Application started
[2026-09-03 10:15:31] User logged in
```

### `"w"` vs `"a"`

| Mode | Existing content | Use for |
| ---- | ---------------- | ------- |
| `"w"` | **Erased** | Fresh output, reports |
| `"a"` | Preserved | Logs, accumulating records |

---

## 5. `with open()`

The `with` statement opens a file and **closes it automatically**, even if an error occurs.

```python
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()

print(content)
# file is already closed here
```

### Why it is better

```python
# Manual — easy to forget close(), unsafe on error
file = open("data.txt", "r")
content = file.read()
file.close()

# with — always closed, even if read() raises
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
```

The `with` version is equivalent to:

```python
file = open("data.txt", "r")
try:
    content = file.read()
finally:
    file.close()
```

> **Rule** — Always use `with open(...)`. It is shorter, safer, and the standard idiom. Never call `open()` without it in real code.

### Reading with `with`

```python
with open("data.txt", "r", encoding="utf-8") as file:
    for line in file:
        print(line.strip())
```

### Writing with `with`

```python
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Hello\n")
```

### Several files at once

```python
with open("source.txt", "r", encoding="utf-8") as src, \
     open("dest.txt", "w", encoding="utf-8") as dst:
    dst.write(src.read())
```

### `with` and error handling

```python
try:
    with open("missing.txt", "r", encoding="utf-8") as file:
        content = file.read()
except FileNotFoundError:
    print("File not found")
```

---

## 6. Working with TXT Files

Plain text files — the simplest format.

### Writing a text file

```python
lines = ["Python", "is", "great"]

with open("notes.txt", "w", encoding="utf-8") as file:
    for line in lines:
        file.write(line + "\n")
```

### Reading it back

```python
with open("notes.txt", "r", encoding="utf-8") as file:
    content = file.read()

print(content)
```

Output:

```text
Python
is
great
```

### Reading into a list

```python
with open("notes.txt", "r", encoding="utf-8") as file:
    lines = [line.strip() for line in file]

print(lines)
```

Output:

```text
['Python', 'is', 'great']
```

### Counting lines and words

```python
with open("notes.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()

print("Lines:", len(lines))
print("Words:", sum(len(line.split()) for line in lines))
```

Output:

```text
Lines: 3
Words: 3
```

### Processing line by line

```python
with open("scores.txt", "r", encoding="utf-8") as file:
    for line in file:
        name, score = line.strip().split(",")
        print(f"{name}: {score}")
```

---

## 7. Working with CSV Files

CSV (comma-separated values) stores tabular data.

`students.csv`:

```text
name,age,grade
Mahesh,24,A
Nina,21,B
Rahul,23,A
```

### Reading with the `csv` module

```python
import csv

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)
```

Output:

```text
['name', 'age', 'grade']
['Mahesh', '24', 'A']
['Nina', '21', 'B']
['Rahul', '23', 'A']
```

Each row is a list of strings.

### Skipping the header

```python
import csv

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    next(reader)                     # skip the header
    for row in reader:
        print(row[0], "is", row[1])
```

Output:

```text
Mahesh is 24
Nina is 21
Rahul is 23
```

### `DictReader` — rows as dictionaries

```python
import csv

with open("students.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row["name"], row["grade"])
```

Output:

```text
Mahesh A
Nina B
Rahul A
```

> **Prefer `DictReader`** — accessing `row["name"]` is far clearer than `row[0]`.

### Writing CSV

```python
import csv

data = [
    ["name", "age", "grade"],
    ["Mahesh", 24, "A"],
    ["Nina", 21, "B"]
]

with open("output.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerows(data)
```

> **Note** — Always pass `newline=""` when opening a CSV for writing, or you get blank lines between rows on Windows.

### Writing with `DictWriter`

```python
import csv

students = [
    {"name": "Mahesh", "age": 24, "grade": "A"},
    {"name": "Nina", "age": 21, "grade": "B"}
]

with open("output.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=["name", "age", "grade"])
    writer.writeheader()
    writer.writerows(students)
```

---

## 8. Working with JSON Files

JSON stores structured data — objects and arrays — and maps directly onto Python dicts and lists.

### Python ↔ JSON

| Python | JSON |
| ------ | ---- |
| `dict` | object |
| `list`, `tuple` | array |
| `str` | string |
| `int`, `float` | number |
| `True` / `False` | true / false |
| `None` | null |

### Writing JSON

```python
import json

data = {
    "name": "Mahesh",
    "age": 24,
    "skills": ["Python", "SQL"],
    "active": True
}

with open("data.json", "w", encoding="utf-8") as file:
    json.dump(data, file, indent=4)
```

`data.json`:

```json
{
    "name": "Mahesh",
    "age": 24,
    "skills": ["Python", "SQL"],
    "active": true
}
```

`indent=4` makes it human-readable.

### Reading JSON

```python
import json

with open("data.json", "r", encoding="utf-8") as file:
    data = json.load(file)

print(data)
print(data["name"])
print(data["skills"])
```

Output:

```text
{'name': 'Mahesh', 'age': 24, 'skills': ['Python', 'SQL'], 'active': True}
Mahesh
['Python', 'SQL']
```

### `json.dumps()` / `json.loads()` — strings, not files

```python
import json

# Python → JSON string
text = json.dumps({"name": "Mahesh", "age": 24})
print(text)              # {"name": "Mahesh", "age": 24}
print(type(text))        # <class 'str'>

# JSON string → Python
data = json.loads(text)
print(data["name"])      # Mahesh
```

| Function | Works with |
| -------- | ---------- |
| `json.dump(obj, file)` | Writes to a file |
| `json.load(file)` | Reads from a file |
| `json.dumps(obj)` | Returns a string |
| `json.loads(str)` | Parses a string |

### Updating a JSON file

```python
import json

with open("data.json", "r", encoding="utf-8") as file:
    data = json.load(file)

data["age"] = 25
data["skills"].append("Git")

with open("data.json", "w", encoding="utf-8") as file:
    json.dump(data, file, indent=4)
```

The pattern is always: **read → modify → write**.

### Handling malformed JSON

```python
import json

try:
    with open("data.json", "r", encoding="utf-8") as file:
        data = json.load(file)
except FileNotFoundError:
    print("No data file yet")
except json.JSONDecodeError as e:
    print("Corrupted file:", e)
```

---

## TXT vs CSV vs JSON

| Format | Best for | Structure |
| ------ | -------- | --------- |
| TXT | Notes, logs, plain text | None — just lines |
| CSV | Tables, spreadsheets | Rows of values |
| JSON | Structured data, APIs, config | Nested objects and arrays |

```text
TXT   →  "Hello\nWorld"
CSV   →  "name,age\nMahesh,24"
JSON  →  '{"name": "Mahesh", "age": 24}'
```

---

## Important Difference: `read()` and `write()`

| | `read()` | `write()` |
| - | -------- | --------- |
| Direction | File → program | Program → file |
| Mode needed | `"r"` | `"w"` or `"a"` |
| Returns | The file contents | The number of characters written |
| Cursor | Moves forward | Moves forward |

```python
with open("data.txt", "w") as file:
    n = file.write("Hello")        # n = 5

with open("data.txt", "r") as file:
    text = file.read()             # text = "Hello"
```

### The file cursor

After reading, the cursor sits at the end, so a second `read()` returns nothing:

```python
with open("data.txt", "r") as file:
    print(file.read())       # "Hello"
    print(file.read())       # ""  ← cursor already at the end
```

Rewind with `.seek(0)`:

```python
with open("data.txt", "r") as file:
    print(file.read())
    file.seek(0)
    print(file.read())       # "Hello" again
```

---

## Common File Handling Patterns

```python
# Read a whole file
with open("f.txt", "r", encoding="utf-8") as f:
    content = f.read()

# Read into a cleaned list of lines
with open("f.txt", "r", encoding="utf-8") as f:
    lines = [line.strip() for line in f]

# Write a file
with open("f.txt", "w", encoding="utf-8") as f:
    f.write("text\n")

# Append
with open("f.txt", "a", encoding="utf-8") as f:
    f.write("more\n")

# Process a large file line by line
with open("big.txt", "r", encoding="utf-8") as f:
    for line in f:
        process(line)

# Safe read with a default
try:
    with open("f.txt", "r", encoding="utf-8") as f:
        content = f.read()
except FileNotFoundError:
    content = ""

# Check existence
import os
if os.path.exists("f.txt"):
    ...

# Read JSON
import json
with open("f.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Write CSV
import csv
with open("f.csv", "w", newline="", encoding="utf-8") as f:
    csv.writer(f).writerows(rows)
```

---

## Common Mistakes to Avoid

| Mistake | Consequence | Fix |
| ------- | ----------- | --- |
| Forgetting `close()` | Data not flushed, handle leak | Use `with open(...)` |
| Opening with `"w"` to add data | File erased | Use `"a"` |
| Expecting `.write()` to add a newline | Lines run together | Add `\n` explicitly |
| Not stripping `\n` after reading | Invisible whitespace in comparisons | `line.strip()` |
| Reading a huge file with `.read()` | Memory exhausted | Iterate line by line |
| No `newline=""` when writing CSV | Blank rows on Windows | `open(..., newline="")` |
| Assuming the file exists | `FileNotFoundError` | Try/except or `os.path.exists` |

---

## Quick Revision

| Task | Code |
| ---- | ---- |
| Open for reading | `open("f.txt", "r")` |
| Open for writing (erases) | `open("f.txt", "w")` |
| Open for appending | `open("f.txt", "a")` |
| Safe open | `with open("f.txt", "r", encoding="utf-8") as f:` |
| Read everything | `f.read()` |
| Read one line | `f.readline()` |
| Read all lines | `f.readlines()` |
| Iterate lines | `for line in f:` |
| Write text | `f.write("text\n")` |
| Write many lines | `f.writelines(rows)` |
| Rewind | `f.seek(0)` |
| Check existence | `os.path.exists(path)` |
| JSON read / write | `json.load(f)` / `json.dump(obj, f, indent=4)` |
| CSV read / write | `csv.reader(f)` / `csv.writer(f)` |
| CSV as dicts | `csv.DictReader(f)` / `csv.DictWriter(f, fieldnames=[...])` |

### The main idea

```text
File handling
 ├── open(path, mode, encoding)
 │    ├── "r" read     (fails if missing)
 │    ├── "w" write    (ERASES existing)
 │    ├── "a" append   (preserves existing)
 │    └── "x" create   (fails if exists)
 ├── Always use `with` → auto-closes, even on error
 ├── Read:  read() / readline() / readlines() / iterate
 ├── Write: write() (no automatic newline) / writelines()
 ├── TXT  → plain lines
 ├── CSV  → csv.reader / DictReader
 └── JSON → json.load / json.dump
```

---

## Self-Check

- [ ] What is the difference between mode `"w"` and mode `"a"`?
- [ ] Why should you always use `with open(...)`?
- [ ] Why does a second `file.read()` return an empty string?
- [ ] Does `.write()` add a newline automatically?
- [ ] Why is iterating over a file better than `.read()` for large files?
- [ ] Why do you pass `newline=""` when writing a CSV?
- [ ] What is the difference between `json.load()` and `json.loads()`?
- [ ] How do you read a file safely when it might not exist?
