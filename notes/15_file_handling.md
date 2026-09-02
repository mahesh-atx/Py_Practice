# Python File Handling — Notes

File handling means using Python to **create, read, write, and update files**.

Python provides the `open()` function for working with files.

The main flow is:

```text
Open file
   ↓
Read / Write / Append
   ↓
Close file
```

Using `with open()` makes this easier because Python closes the file for you.

---

# 1. Opening Files

Python uses `open()` to open a file.

### Basic syntax

```python
open(filename, mode)
```

Example:

```python id="wq6l7c"
file = open("example.txt", "r")
```

Here:

```text
example.txt → file name
r           → mode
```

The `"r"` means **read**.

### Common modes

| Mode  | Meaning |
| ----- | ------- |
| `"r"` | Read    |
| `"w"` | Write   |
| `"a"` | Append  |

These are the main modes you need for basic file handling.

---

# 2. Reading Files

The `"r"` mode is used to read a file.

Suppose `example.txt` contains:

```text
Hello Python
I am learning file handling
```

You can read it like this:

```python id="e6pnwy"
file = open("example.txt", "r")

content = file.read()

print(content)

file.close()
```

Output:

```text id="o2mtrv"
Hello Python
I am learning file handling
```

### `.read()`

`.read()` reads the entire file.

```python id="85cu0h"
file = open("example.txt", "r")

content = file.read()

print(content)

file.close()
```

---

## Reading a specific number of characters

You can pass a number to `.read()`:

```python id="i4ugfq"
file = open("example.txt", "r")

content = file.read(5)

print(content)

file.close()
```

If the file starts with:

```text
Hello Python
```

the output is:

```text
Hello
```

---

## `.readline()`

`.readline()` reads one line at a time.

```python id="1v87ae"
file = open("example.txt", "r")

line = file.readline()

print(line)

file.close()
```

If the file contains:

```text
Hello Python
I am learning file handling
```

the first line is read.

---

## `.readlines()`

`.readlines()` reads all lines and returns them as a list.

```python id="f8a8tc"
file = open("example.txt", "r")

lines = file.readlines()

print(lines)

file.close()
```

The result looks like:

```text
['Hello Python\n', 'I am learning file handling\n']
```

---

# 3. Writing

The `"w"` mode is used to write data into a file.

```python id="4pvrxx"
file = open("example.txt", "w")

file.write("Hello Python")

file.close()
```

If `example.txt` does not exist, Python creates it.

If it already exists, `"w"` **replaces the existing content**.

For example, if the file contains:

```text
Old content
```

and you run:

```python id="6l0e5b"
file = open("example.txt", "w")

file.write("New content")

file.close()
```

the file becomes:

```text
New content
```

---

## Writing multiple lines

You can use `\n` to create a new line.

```python id="f7k7u5"
file = open("example.txt", "w")

file.write("Hello\n")
file.write("Python\n")
file.write("File Handling")

file.close()
```

The file becomes:

```text
Hello
Python
File Handling
```

---

# 4. Appending

The `"a"` mode is used to **add new content to the end of a file**.

Suppose the file contains:

```text
Hello
Python
```

Now:

```python id="a3ezi7"
file = open("example.txt", "a")

file.write("\nFile Handling")

file.close()
```

The file becomes:

```text
Hello
Python
File Handling
```

Unlike `"w"`, `"a"` does not remove the existing content.

### Write vs append

`"w"`:

```python id="7xm42a"
open("example.txt", "w")
```

Means:

```text
Replace existing content
```

`"a"`:

```python id="75myof"
open("example.txt", "a")
```

Means:

```text
Keep existing content
+
Add new content at the end
```

---

# 5. `with open()`

Instead of manually opening and closing a file:

```python id="gn1m8z"
file = open("example.txt", "r")

content = file.read()

file.close()
```

you can use `with open()`.

```python id="n0ky0m"
with open("example.txt", "r") as file:
    content = file.read()
    print(content)
```

Python automatically closes the file when the `with` block ends.

### Basic syntax

```python id="fuywkr"
with open("filename", "mode") as file:
    # work with the file
```

This is the preferred way to work with files.

---

## Reading with `with open()`

```python id="k6v4wy"
with open("example.txt", "r") as file:
    content = file.read()

print(content)
```

---

## Writing with `with open()`

```python id="lxwqk9"
with open("example.txt", "w") as file:
    file.write("Hello Python")
```

---

## Appending with `with open()`

```python id="h5uql9"
with open("example.txt", "a") as file:
    file.write("\nLearning files")
```

---

# 6. Working with TXT Files

TXT files contain normal text.

Example:

```text
notes.txt
```

### Write

```python id="k2w6pa"
with open("notes.txt", "w") as file:
    file.write("Python is easy to learn.")
```

### Read

```python id="4p0u4j"
with open("notes.txt", "r") as file:
    content = file.read()

print(content)
```

Output:

```text
Python is easy to learn.
```

### Append

```python id="kqjv15"
with open("notes.txt", "a") as file:
    file.write("\nI am practicing every day.")
```

---

# 7. Working with CSV Files

CSV stands for **Comma-Separated Values**.

A CSV file may look like:

```text
name,age,city
Mahesh,24,Akola
Rahul,23,Pune
```

Python provides the built-in `csv` module for working with CSV files.

### Reading a CSV file

```python id="cjb3i1"
import csv

with open("students.csv", "r") as file:
    reader = csv.reader(file)

    for row in reader:
        print(row)
```

Output:

```text
['name', 'age', 'city']
['Mahesh', '24', 'Akola']
['Rahul', '23', 'Pune']
```

Each row is returned as a list.

---

## Writing a CSV file

```python id="s9q9lc"
import csv

with open("students.csv", "w", newline="") as file:
    writer = csv.writer(file)

    writer.writerow(["name", "age", "city"])
    writer.writerow(["Mahesh", 24, "Akola"])
    writer.writerow(["Rahul", 23, "Pune"])
```

This creates:

```text
name,age,city
Mahesh,24,Akola
Rahul,23,Pune
```

---

# 8. Working with JSON Files

JSON stands for **JavaScript Object Notation**.

JSON is commonly used to store structured data.

A JSON file may look like:

```json
{
    "name": "Mahesh",
    "age": 24,
    "city": "Akola"
}
```

Python provides the built-in `json` module.

### Reading JSON

```python id="y4r1v6"
import json

with open("student.json", "r") as file:
    data = json.load(file)

print(data)
```

Output:

```text
{'name': 'Mahesh', 'age': 24, 'city': 'Akola'}
```

The JSON data becomes a Python dictionary.

You can access values normally:

```python id="d4xwr0"
print(data["name"])
```

Output:

```text
Mahesh
```

---

## Writing JSON

Use `json.dump()` to write Python data into a JSON file.

```python id="g4qnve"
import json

student = {
    "name": "Mahesh",
    "age": 24,
    "city": "Akola"
}

with open("student.json", "w") as file:
    json.dump(student, file)
```

The file will contain JSON data.

### Making JSON easier to read

You can use `indent`:

```python id="s1g6e8"
with open("student.json", "w") as file:
    json.dump(student, file, indent=4)
```

The file will look like:

```json
{
    "name": "Mahesh",
    "age": 24,
    "city": "Akola"
}
```

---

# TXT vs CSV vs JSON

| File type | Used for         | Python tool |
| --------- | ---------------- | ----------- |
| TXT       | Plain text       | `open()`    |
| CSV       | Rows and columns | `csv`       |
| JSON      | Structured data  | `json`      |

---

# Important Difference: `read()` and `write()`

### `read()`

Gets data **from the file**:

```python id="8jp4yp"
with open("file.txt", "r") as file:
    data = file.read()
```

### `write()`

Sends data **into the file**:

```python id="bs2u3x"
with open("file.txt", "w") as file:
    file.write("Hello")
```

Think:

```text
File → read() → Python

Python → write() → File
```

---

# Common File Handling Patterns

### Read a TXT file

```python id="7f57ct"
with open("notes.txt", "r") as file:
    data = file.read()

print(data)
```

### Write a TXT file

```python id="1j0q8h"
with open("notes.txt", "w") as file:
    file.write("Hello Python")
```

### Append to a TXT file

```python id="vjp3m4"
with open("notes.txt", "a") as file:
    file.write("\nNew line")
```

### Read CSV

```python id="0y5k2g"
import csv

with open("data.csv", "r") as file:
    reader = csv.reader(file)

    for row in reader:
        print(row)
```

### Read JSON

```python id="3id4tf"
import json

with open("data.json", "r") as file:
    data = json.load(file)

print(data)
```

### Write JSON

```python id="pj2c8o"
import json

with open("data.json", "w") as file:
    json.dump(data, file, indent=4)
```

---

# Quick Revision

| Topic         | Main idea                               |
| ------------- | --------------------------------------- |
| Opening files | `open("file.txt", "r")`                 |
| Reading       | `read()`, `readline()`, `readlines()`   |
| Writing       | `write()` with `"w"`                    |
| Appending     | `write()` with `"a"`                    |
| `with open()` | Opens and automatically closes the file |
| TXT           | Plain text files                        |
| CSV           | Table-like data using rows and columns  |
| JSON          | Structured data stored in JSON format   |

### File modes to remember

```text
"r" → Read
"w" → Write / replace
"a" → Append
```

### Main mental model

```text
                File
                 │
        ┌────────┼────────┐
        ↓        ↓        ↓
      Read     Write    Append
       "r"       "w"      "a"
        │        │        │
        ↓        ↓        ↓
     Get data  Replace   Add data
               content   at end
```

For most Python file work, prefer:

```python
with open("file.txt", "r") as file:
    data = file.read()
```

because Python handles closing the file automatically.
