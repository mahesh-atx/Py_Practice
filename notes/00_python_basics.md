# Python Basics — Notes

Python is a **high-level, readable programming language** used for web development, automation, data science, AI, scripting, and general software development. It was created by **Guido van Rossum** and first released in **1991**.

> **Why this matters** — Every other topic in this course assumes you can do three things without thinking: write a Python file, run it, and print a result to check your work. This section builds exactly that foundation. Everything else is built on top of it.

### The mental model

Think of Python as a very literal assistant. You write instructions in a file, the assistant reads them **top to bottom**, and it does exactly what you wrote — nothing more.

```text
You write instructions  →  Python reads them  →  Python follows them
   (hello.py)              (interpreter)          (output appears)
```

The important consequence: Python has no common sense. It will not guess what you *meant*. It only does what you *said*. Most beginner bugs come from that gap.

---

## 1. What is Python?

Python is a programming language — a way to write instructions a computer can follow.

### Why is Python popular?

* **Simple, readable syntax** — Python code looks close to English.
* **Beginner friendly** — you can be productive very quickly.
* **Huge standard library** — a lot of useful tools come built in.
* **Massive ecosystem** — packages exist for almost any task.
* **Cross-platform** — the same code runs on Windows, macOS, and Linux.
* **Used in many fields** — AI, web development, automation, data science, scripting.

### A first example

```python
print("Hello, World!")
```

Output:

```text
Hello, World!
```

That single line is a complete, working Python program. There is no boilerplate, no required `main()` function, and no setup code. That is a deliberate part of Python's design.

### What Python is used for

| Field | What Python does there |
| ----- | --------------------- |
| Web development | Server-side logic (Django, Flask, FastAPI) |
| Data science | Analysis and visualisation (pandas, matplotlib) |
| AI / Machine learning | Model training (TensorFlow, PyTorch, scikit-learn) |
| Automation | Renaming files, scraping sites, sending emails |
| Scripting | Gluing other programs together |
| Education | Often the first language taught, because it reads clearly |

---

## 2. Installing Python

To run Python programs on your own machine, you need Python installed.

### Windows

1. Go to the official Python website: `python.org`.
2. Download the latest version.
3. Run the installer.
4. **Important:** tick the box **Add Python to PATH**.
5. Click **Install Now**.

> **Why "Add Python to PATH" matters** — PATH is the list of folders your terminal searches when you type a command. If Python is not on PATH, your terminal cannot find it, and you get an error like `'python' is not recognized`. Ticking that box avoids the single most common Windows installation problem.

### macOS / Linux

Python is often already installed. Check with:

```bash
python3 --version
```

If it is missing, install it with your system's package manager.

### Verifying the installation

Open a terminal and run:

```bash
python --version
```

You should see something like:

```text
Python 3.12.0
```

### `python` vs `python3`

This trips up nearly everyone at least once.

| Command | Usually means |
| ------- | ------------- |
| `python` | The default Python on the system (Windows) |
| `python3` | Python 3 specifically (macOS / Linux) |
| `py` | The Windows Python launcher |

All three may exist on the same machine, and they are not guaranteed to be the same version. If one command fails, try another — that is not a mistake on your part.

---

## 3. Running Python Programs

### Running a file

Python programs live in files ending with `.py`.

`hello.py`:

```python
print("Hello, World!")
```

Run it from the terminal:

```bash
python hello.py
```

Output:

```text
Hello, World!
```

### Interactive mode (the REPL)

You can also run Python directly in the terminal, one line at a time. Type:

```bash
python
```

You will see a prompt:

```text
>>>
```

Now type code and it runs immediately:

```python
>>> print("Hello")
Hello
>>> 10 + 5
15
```

This is called the **REPL** (Read–Eval–Print Loop): it *reads* what you type, *evaluates* it, *prints* the result, and *loops* back for more.

> **When to use which** — Use the REPL to test a quick idea ("what does `"abc".upper()` return?"). Use a `.py` file for anything you want to keep or run more than once.

To exit the REPL:

```python
exit()
```

### Files vs REPL

| Approach | Best for | Keeps your work? |
| -------- | -------- | ---------------- |
| `.py` file | Real programs, anything reusable | Yes |
| REPL | Experimenting, checking a value | No |

---

## 4. `print()`

`print()` displays information on the screen. It is your primary tool for seeing what your program is doing.

### Printing text

```python
print("Hello")
```

Output:

```text
Hello
```

### Printing numbers

```python
print(10)
```

Output:

```text
10
```

### Printing several values

Pass multiple values separated by commas:

```python
print("Python", "is", "easy")
```

Output:

```text
Python is easy
```

Notice two things: Python inserted a **space** between values, and it moved to a **new line** at the end. Both are defaults you can change.

### Printing calculations

```python
print(10 + 5)
print(10 * 5)
```

Output:

```text
15
50
```

`print()` evaluates the expression first, then prints the result. It does not print the expression itself.

```python
print("Age:", 24)
print(10 + 20)
```

Output:

```text
Age: 24
30
```

### The `sep` parameter

`sep` controls what goes **between** values. The default is a single space.

```python
print("2026", "09", "03", sep="-")
```

Output:

```text
2026-09-03
```

### The `end` parameter

`end` controls what is printed at the **end**. The default is a newline.

```python
print("Loading", end="")
print("...done")
```

Output:

```text
Loading...done
```

Compare with the default behaviour:

```python
print("Loading")
print("...done")
```

Output:

```text
Loading
...done
```

### Printing quotes inside strings

If your text contains a double quote, wrap it in single quotes (or vice versa):

```python
print('She said "hello"')
```

Output:

```text
She said "hello"
```

---

## 5. Comments

Comments are notes for humans. **Python ignores them completely when running.**

### Single-line comments

```python
# This is a comment
print("Hello")
```

Output:

```text
Hello
```

### Comments after code

```python
print("Hello")  # Display Hello
```

Everything after `#` on that line is a comment.

### Multi-line comments

Python has no dedicated multi-line comment syntax. The convention is to use a string literal that is never assigned:

```python
"""
This is a longer explanation.
It spans several lines.
Python ignores it because nothing uses this string.
"""
print("Hello")
```

> **Note** — When a string like this appears at the top of a file or right after a `def`, Python treats it as a **docstring** and keeps it available at runtime. Elsewhere it is simply ignored. That distinction matters later.

### Why use comments?

```python
# Convert the temperature from Celsius to Fahrenheit
fahrenheit = celsius * 9 / 5 + 32
```

Good comments explain **why**, not **what**. This comment is useless:

```python
x = x + 1  # Add 1 to x
```

The code already says that. This one is useful:

```python
x = x + 1  # Compensate for the header row we skipped
```

Now the *reason* is recorded, and the reason is the part you cannot read from the code.

---

## 6. Indentation

**Indentation is the whitespace at the start of a line.** In Python it is not decoration — it is syntax.

Most languages use `{}` braces to group code. Python uses indentation:

```python
if True:
    print("Hello")
```

The indented `print` **belongs to** the `if`. That is how Python knows.

### Correct indentation

```python
if True:
    print("Hello")
    print("Python")
```

Both lines are inside the `if`, because both are indented equally.

### Incorrect indentation

```python
if True:
print("Hello")
```

This fails with an `IndentationError`, because Python expected an indented block after the colon.

### Standard practice

* Use **4 spaces** per level.
* **Never mix tabs and spaces** — it may look fine to you and still break, because a tab can count as a different width than your editor displays.
* Configure your editor to insert spaces when you press Tab.

### Nesting levels

```python
if True:
    print("Inside the if")
    if 10 > 5:
        print("Inside the nested if")
print("Back at the top level")
```

Output:

```text
Inside the if
Inside the nested if
Back at the top level
```

Each level of indentation adds another layer of nesting. The last line is back at the left margin, so it is outside both `if` statements.

---

## 7. Basic Syntax

Syntax is the set of rules for writing valid Python code.

### Python is case-sensitive

```python
name = "Mahesh"
Name = "Rahul"
```

These are **two different variables**. Case matters everywhere: `print()` works, `Print()` does not.

### Statements

A program is a sequence of statements, normally one per line:

```python
print("Hello")
print("Welcome")
print("Python")
```

Output:

```text
Hello
Welcome
Python
```

### No semicolons required

```python
print("Hello")
print("Python")
```

Do **not** write:

```python
print("Hello");
```

It technically works — Python allows a semicolon as a separator — but it is not idiomatic and marks you out as a beginner. Leave them off.

### Strings use quotes

```python
print("Hello")   # double quotes
print('Hello')   # single quotes
```

Both are valid. Pick one style per project and stay consistent.

### Blocks start with a colon

A colon `:` tells Python that an indented block is coming:

```python
if True:
    print("Hello")
```

The colon opens the block; indentation defines what is inside it.

### A complete example

```python
# A simple Python program

name = "Mahesh"
age = 24

print("Name:", name)
print("Age:", age)
print("Next year:", age + 1)
```

Output:

```text
Name: Mahesh
Age: 24
Next year: 25
```

Trace the flow:

```text
Comment (ignored)
       ↓
Store name and age
       ↓
Print each value
       ↓
Calculate and print age + 1
```

---

## Common Mistakes to Avoid

| Mistake | What happens | Fix |
| ------- | ------------ | --- |
| Forgetting quotes around text | `NameError` | `print(Hello)` → `print("Hello")` |
| Mixing tabs and spaces | `IndentationError` | Use 4 spaces consistently |
| Forgetting the colon | `SyntaxError` | `if True:` not `if True` |
| Wrong indentation after `:` | `IndentationError` | Indent the block by 4 spaces |
| Using `Print` instead of `print` | `NameError` | Python is case-sensitive |
| Forgetting to save before running | Old output appears | Save the file, then run |

---

## Quick Revision

| Topic | Key point | Example |
| ----- | --------- | ------- |
| Python | High-level, readable language | Created 1991 by Guido van Rossum |
| Installing | Verify with a version check | `python --version` |
| Running a file | Python files end in `.py` | `python hello.py` |
| REPL | Interactive one-line testing | `python` then `>>>` |
| `print()` | Displays output | `print("Hello")` |
| `sep` | Separator between values | `print("a", "b", sep="-")` |
| `end` | What prints at the end | `print("hi", end="")` |
| Comments | Start with `#`, ignored by Python | `# a note` |
| Indentation | Defines code blocks, 4 spaces | `if True:` then indent |
| Syntax | Rules for valid code | Case-sensitive, colons open blocks |

### Core patterns

```python
print("Hello")                    # display text
print("a", "b")                   # several values → "a b"
print("a", "b", sep="-")          # custom separator → "a-b"
print("a", end="")                # no newline at the end
# This line is a comment          # ignored completely
```

### The main idea

```text
Python program
 ├── Instructions read top to bottom
 ├── print() shows you what happened
 ├── Indentation groups code into blocks
 └── Comments explain why, for humans
```

---

## Self-Check

Before moving on, make sure you can answer these without looking:

- [ ] How do you check which Python version is installed?
- [ ] What is the difference between running a `.py` file and using the REPL?
- [ ] What does `print("a", "b", sep="-")` output?
- [ ] Why does `if True:` followed by an unindented `print()` fail?
- [ ] What character starts a comment, and does Python run it?
- [ ] Is `Name` the same variable as `name`?
