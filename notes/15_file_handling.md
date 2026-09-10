# File Handling

> Programs forget everything when they stop — files give them **memory**. You'll learn to read and write text, CSV, and JSON files. Always use the `with` statement; it's the professional way.

---

## 1. Opening Files — modes

Everything starts with `open(filename, mode)`. The **mode** is a single letter that says what you intend to do with the file — and it matters, because picking the wrong one can destroy data.

| Mode | Meaning |
|------|---------|
| `"r"` | read (default; error if file missing) |
| `"w"` | write — **erases** the file first! |
| `"a"` | append — adds to the end |

---

## 2. Writing: `"w"`

The basic way: open → write → close. `\n` is the newline character — `write()` doesn't add it for you, so you must include it yourself.

```python
file = open("notes.txt", "w")
file.write("Line one\n")
file.write("Line two\n")
file.close()          # ⚠️ you MUST close it yourself
```

⚠️ `"w"` **overwrites** the entire file. One forgotten mode letter and data is gone.

---

## 3. The `with` Statement ⭐ (always use this)

`with open(...)` opens the file and **closes it automatically** when the block ends — even if an error happens. No `close()` needed.

```python
with open("notes.txt", "w") as f:
    f.write("Hello from with-block\n")
# file is closed here automatically
```

Everything below uses `with`.

---

## 4. Reading

There are a few ways to read depending on how big the file is and what you need. Note that `"r"` is the default mode — `open("file.txt")` alone means read.

```python
with open("notes.txt", "r") as f:
    content = f.read()          # entire file as one string
    print(content)
```

**Line by line — best for large files** (doesn't load everything into memory):

```python
with open("notes.txt") as f:
    for line in f:
        print(line.strip())     # strip() removes the trailing newline
```

Other options:

```python
with open("notes.txt") as f:
    lines = f.readlines()       # list of lines: ['line1\n', 'line2\n']

with open("notes.txt") as f:
    first = f.readline()        # just one line
```

If the file might not exist, combine with exception handling:

```python
try:
    with open("missing.txt") as f:
        data = f.read()
except FileNotFoundError:
    print("File not found!")
```

---

## 5. Appending: `"a"`

When you want to *add* to a file without erasing what's already there (logs, diaries, chat history), use `"a"` — new writes always land at the end.

```python
with open("log.txt", "a") as f:
    f.write("New entry added\n")     # goes to the end, old content safe
```

---

## 6. Working with TXT — a practical example

Save a shopping list, then read it back:

```python
items = ["milk", "bread", "eggs"]

with open("shopping.txt", "w") as f:
    for item in items:
        f.write(item + "\n")

with open("shopping.txt") as f:
    for i, line in enumerate(f, start=1):
        print(f"{i}. {line.strip()}")
```

---

## 7. Working with CSV — the `csv` module

CSV = comma-separated values; the format of spreadsheets and data exports.

**Writing:**

```python
import csv

rows = [
    ["name", "age", "city"],
    ["Ravi", 21, "Nashik"],
    ["Asha", 19, "Pune"],
]

with open("people.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(rows)
```

**Reading:**

```python
import csv

with open("people.csv") as f:
    reader = csv.reader(f)
    header = next(reader)           # skip/read the header row
    for name, age, city in reader:
        print(f"{name} ({age}) lives in {city}")
```

`csv.DictReader` is even nicer — each row becomes a dictionary:

```python
with open("people.csv") as f:
    for row in csv.DictReader(f):
        print(row["name"], row["city"])
```

---

## 8. Working with JSON — the `json` module

JSON is the standard format for APIs and structured data. Python dicts and JSON convert into each other almost perfectly.

**Write a dict to JSON:**

```python
import json

student = {
    "name": "Ravi",
    "age": 21,
    "marks": [80, 75, 90],
    "passed": True
}

with open("student.json", "w") as f:
    json.dump(student, f, indent=2)
```

**Read JSON back into a dict:**

```python
import json

with open("student.json") as f:
    data = json.load(f)

print(data["name"])             # Ravi
print(sum(data["marks"]) / 3)   # 81.66...
```

Useful in-memory versions: `json.dumps(obj)` → string, `json.loads(string)` → dict.

> JSON becomes *the* data format of the internet once you start calling APIs — see **22-json.md** (and then **23-apis.md**) for the full picture.

---

## Quick Revision

- Modes: `"r"` read, `"w"` write (**erases!**), `"a"` append.
- **Always** `with open(...) as f:` — auto-close, even on errors.
- Read whole file: `f.read()`; big files: loop `for line in f`.
- TXT for simple text; `csv` module for tables; `json` module for structured data / dicts.
- Wrap reads in `try/except FileNotFoundError` when the file may be missing.

### Practice
1. Write a diary program: append today's note to `diary.txt`, then display all entries.
2. Create a CSV of 5 students (name, marks) and print each as a sentence.
3. Save a dict of your profile as JSON and read it back.

✅ Next → **17-modules-and-packages.md**
