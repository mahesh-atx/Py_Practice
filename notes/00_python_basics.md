# Python Basics — Notes

## 1. What is Python?

Python is a high-level, easy-to-read programming language. It is widely used for web development, automation, data science, AI, machine learning, scripting, and software development.

Python was created by **Guido van Rossum** and was first released in **1991**.

### Why is Python popular?

* Simple and readable syntax
* Easy for beginners to learn
* Large number of built-in features
* Huge collection of libraries and frameworks
* Works on Windows, macOS, and Linux
* Used in many areas such as AI, web development, automation, and data science

### Simple Python example

```python
print("Hello, World!")
```

Output:

```text
Hello, World!
```

Python code is designed to be close to normal English, which makes it easier to read and write.

---

# 2. Installing Python

To write and run Python programs, you first need to install Python.

### Windows

1. Go to the official Python website.
2. Download the latest Python version.
3. Run the installer.
4. Make sure you select:

```text
Add Python to PATH
```

5. Click **Install Now**.

After installation, open Command Prompt and check:

```bash
python --version
```

You may see:

```text
Python 3.x.x
```

On some systems, use:

```bash
py --version
```

### macOS/Linux

Python may already be installed.

Check it using:

```bash
python3 --version
```

If Python is not installed, install it using the package manager for your operating system.

### Important

There are two common commands:

```bash
python
```

and

```bash
python3
```

Which one works depends on your operating system and Python installation.

---

# 3. Running Python Programs

A Python program is usually stored in a file ending with:

```text
.py
```

For example:

```text
hello.py
```

Inside the file:

```python
print("Hello, World!")
```

Run it from the terminal:

```bash
python hello.py
```

or, on systems where Python 3 uses `python3`:

```bash
python3 hello.py
```

Output:

```text
Hello, World!
```

### Python Interactive Mode

You can also run Python directly in the terminal.

Type:

```bash
python
```

Then write:

```python
print("Hello")
```

Output:

```text
Hello
```

This is useful when you want to quickly test small pieces of Python code.

To exit:

```python
exit()
```

---

# 4. `print()`

`print()` is used to display information on the screen.

### Basic example

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

### Printing multiple values

```python
print("Name:", "Mahesh")
```

Output:

```text
Name: Mahesh
```

You can pass multiple values to `print()` separated by commas:

```python
print("Python", "is", "easy")
```

Output:

```text
Python is easy
```

### Printing calculations

```python
print(10 + 5)
```

Output:

```text
15
```

Another example:

```python
print(10 * 5)
```

Output:

```text
50
```

### Important idea

`print()` does not just print text. It can display values and results of expressions.

```python
print("Age:", 24)
print(10 + 20)
```

Output:

```text
Age: 24
30
```

---

# 5. Comments

Comments are notes written inside the code for humans.

Python ignores comments when running the program.

A single-line comment starts with `#`.

```python
# This is a comment
print("Hello")
```

The comment is not executed.

### Comment after code

```python
print("Hello")  # Display Hello
```

### Why use comments?

Comments can explain what the code does.

```python
# Display the user's name
print("Mahesh")
```

They are useful when code becomes large or difficult to understand.

### Important

A comment starts with `#`:

```python
# This is a comment
```

Everything after `#` on that line is treated as a comment.

---

# 6. Indentation

**Indentation means spaces at the beginning of a line.**

Python uses indentation to show which statements belong together.

Unlike many programming languages, Python uses indentation as part of its syntax.

Example:

```python
if True:
    print("Hello")
```

Here, the `print()` statement is indented, so Python knows that it belongs to the `if` block.

### Correct indentation

```python
if True:
    print("Hello")
    print("Python")
```

### Incorrect indentation

```python
if True:
print("Hello")
```

This causes an error because the code inside the `if` block must be indented.

### Standard practice

Use **4 spaces** for indentation.

```python
if True:
    print("Hello")
```

Avoid mixing tabs and spaces.

### Think of indentation like this

```text
if condition:
    ├── statement
    ├── statement
    └── statement
```

The indented lines belong to the block above them.

---

# 7. Basic Syntax

Syntax means the **rules for writing Python code correctly**.

Python has a simple syntax, but the rules must still be followed.

### Python is case-sensitive

These are different:

```python
name = "Mahesh"
Name = "Rahul"
```

`name` and `Name` are treated as different names.

Similarly:

```python
print("Hello")
```

is correct, while:

```python
Print("Hello")
```

is not the same.

### Statements

A Python program is made up of statements.

```python
print("Hello")
print("Welcome")
print("Python")
```

Each line contains a statement.

### No semicolon required

Python normally does not require `;` at the end of a statement.

```python
print("Hello")
print("Python")
```

You do not need:

```python
print("Hello");
print("Python");
```

### Strings

Text is usually written inside quotes.

```python
print("Hello")
```

You can use single quotes too:

```python
print('Hello')
```

Both are valid.

### Blocks

Some Python statements start a block using `:`.

For example:

```python
if True:
    print("Hello")
```

The `:` tells Python that a block is starting, and indentation defines the block.

### Basic structure

A simple Python program can look like:

```python
# Display a message
print("Hello, World!")
print("Welcome to Python")
```

The basic flow is:

```text
Comment
   ↓
Python statement
   ↓
Python statement
   ↓
Output
```

## Quick Revision

| Topic             | Key point                                         |
| ----------------- | ------------------------------------------------- |
| Python            | High-level, readable programming language         |
| Installing Python | Install Python and verify with `python --version` |
| Running programs  | Python files use `.py`                            |
| `print()`         | Displays output                                   |
| Comments          | Start with `#`                                    |
| Indentation       | Defines code blocks                               |
| Basic syntax      | Rules for writing valid Python code               |
