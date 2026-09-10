# Python Basics

> This topic is just setup. Don't spend much time here — read it once, get Python running on your machine, and move on. Everything after this is the real learning.

---

## 1. What is Python?

Python is a **high-level, general-purpose programming language**. "High-level" means its syntax reads almost like English, so you spend time solving problems instead of fighting the language.

It is used for:
- Web development (Django, Flask, FastAPI)
- Data Science, Machine Learning, AI (NumPy, Pandas, PyTorch)
- Automation and scripting
- Backend APIs, testing, and much more

**Key trait:** Python is *interpreted* — your code runs line by line, directly, without a separate compile step.

```python
print("Hello, Python!")
```

That's a complete, working program.

---

## 2. Installing Python

1. Go to **python.org/downloads** and download the latest version.
2. Run the installer.
3. ⚠️ **Important (Windows):** check the box **"Add Python to PATH"** before clicking Install. If you skip this, the `python` command won't work in your terminal.

Verify the install in a terminal / Command Prompt:

```bash
python --version      # Windows
python3 --version     # macOS / Linux
```

You should see something like `Python 3.12.x`.

> **Editor recommendation:** VS Code with the Python extension. It's free and beginner-friendly.

---

## 3. Running Python Programs

Two ways you'll use every day:

**1. Interactive mode (REPL)** — type and see the result instantly. Great for testing small things.

```bash
python
>>> 2 + 3
5
>>> exit()
```

**2. Running a file** — write code in a file ending in `.py`, then run it:

```bash
python hello.py
```

---

## 4. print()

`print()` displays output on the screen. It's how you'll inspect what your code is doing.

```python
print("Hello")            # Hello
print(42)                 # 42
print("Age:", 21)         # Age: 21   (multiple values, separated by a space)
```

---

## 5. Comments

Comments are notes for humans. Python ignores them completely. Use them to explain *why*, not *what*.

```python
# This is a single-line comment

"""
This is a multi-line comment (actually a docstring).
Used for longer explanations.
"""
```

---

## 6. Indentation

This is the one thing that makes Python different from most languages.

In Python, **indentation (the spaces at the start of a line) is part of the syntax**. It defines which lines belong inside a block (like the body of an `if` or a loop). Other languages use `{ }` braces — Python uses whitespace.

```python
age = 20
if age >= 18:
    print("Adult")      # indented → inside the if
print("Done")           # not indented → outside the if
```

Rules to remember:
- Use **4 spaces** per indentation level (standard convention).
- Be consistent — never mix tabs and spaces in one file.
- Wrong indentation = `IndentationError`. Your code simply won't run.

---

## 7. Basic Syntax — What Makes Python, Python

A few quick rules that define how Python code looks:

- **No type declarations** — you never write `int x` or `String name`. Just assign.
- **Blocks use `:` + indentation** — no curly braces `{ }` anywhere.
- **No semicolons** — each line is one statement; the line ending is enough.
- **Case matters** — `Name`, `name`, and `NAME` are three different things.
- **Quotes for text** — `"Ravi"` and `'Ravi'` are both strings.

```python
name = "Ravi"        # creating a variable (no type keyword needed)
print(name)          # output
age = int(input())   # input from the user, converted to a number

if age >= 18:        # colon + indented block = a code block
    print("Adult")   # (no braces, no semicolons)
```

---

## Quick Revision

- Python is readable, interpreted, and general-purpose.
- Install from python.org; on Windows, tick **"Add to PATH"**.
- Run files with `python filename.py`; test small things in the REPL.
- `print()` shows output, `#` starts a comment.
- **Indentation is syntax** — 4 spaces per level, always consistent.

✅ Done? Next → **02-variables.md**
