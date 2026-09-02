# Python Modules and Packages — Notes

Modules and packages help you **organize Python code** and reuse code instead of writing everything in one file.

A simple way to think about them:

```text
Module  → One Python file
Package → Folder containing related Python modules
pip     → Tool for installing Python packages
Virtual environment → Separate Python environment for a project
```

---

# 1. `import`

`import` is used to bring a module into your program.

Python has many built-in modules.

For example, the `math` module provides mathematical functions.

```python id="8q2m3k"
import math

print(math.sqrt(25))
```

Output:

```text id="9v5y2j"
5.0
```

Here:

```text
math → module
sqrt → function inside the module
```

You access it using:

```python id="e9p0aa"
module_name.function_name()
```

### Importing another module

```python id="w0xv8k"
import random

print(random.randint(1, 10))
```

This generates a random integer between `1` and `10`.

### Import with another name

You can give a module a shorter name using `as`.

```python id="4efg2j"
import math as m

print(m.sqrt(25))
```

Here:

```text
math → m
```

So you can use `m` instead of `math`.

---

# 2. `from ... import`

Instead of importing the whole module, you can import a specific function or value.

### Basic syntax

```python id="2w9x0x"
from module_name import name
```

Example:

```python id="tj4r8e"
from math import sqrt

print(sqrt(25))
```

Output:

```text
5.0
```

You don't need:

```python id="u4r6qy"
math.sqrt(25)
```

because `sqrt` was imported directly.

### Import multiple things

```python id="f6fh3e"
from math import sqrt, factorial

print(sqrt(25))
print(factorial(5))
```

### `from ... import` with `as`

You can also give the imported item another name:

```python id="m5y7rw"
from math import sqrt as square_root

print(square_root(25))
```

---

# 3. Creating Your Own Modules

You can create your own module by creating a normal Python file.

Suppose you create:

```text id="7mcv2d"
calculator.py
```

Inside `calculator.py`:

```python id="kjqj34"
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b
```

Now create another file:

```text id="w3l6hq"
main.py
```

You can import your module:

```python id="0t8qs4"
import calculator

print(calculator.add(10, 5))
print(calculator.subtract(10, 5))
```

Output:

```text id="vlk8gd"
15
5
```

Your `calculator.py` is now your own module.

### Using `from ... import`

Instead of:

```python id="af3l0h"
import calculator

print(calculator.add(10, 5))
```

you can write:

```python id="1xslrv"
from calculator import add

print(add(10, 5))
```

---

# 4. Python Packages

A package is a folder used to organize related Python modules.

For example:

```text id="c1ynby"
myproject/
│
├── main.py
│
└── utilities/
    ├── __init__.py
    ├── calculator.py
    └── text.py
```

Here:

```text id="6x0jkp"
utilities → package
calculator.py → module
text.py → module
```

A package helps keep a large project organized.

### Importing from a package

Suppose `calculator.py` contains:

```python id="4a2r54"
def add(a, b):
    return a + b
```

You can write:

```python id="l8u6eq"
from utilities.calculator import add

print(add(10, 20))
```

Output:

```text id="1b0q5q"
30
```

The structure is:

```text
package.module.function
```

For example:

```python id="xmyx17"
utilities.calculator.add()
```

---

# 5. `pip`

`pip` is used to **install and manage Python packages** from the Python Package Index (PyPI).

Python already includes many modules, but you may need external packages for some projects.

For example:

```bash id="0g5fwu"
pip install requests
```

This installs the `requests` package.

After installing it, you can use it in Python:

```python id="fubxpc"
import requests
```

### Check pip

You can check whether `pip` is available:

```bash id="f5h0q7"
pip --version
```

Depending on your setup, you may also use:

```bash id="yeqkko"
python -m pip --version
```

### Installing a package with Python

A common and reliable form is:

```bash id="2v2w3c"
python -m pip install requests
```

This tells the Python interpreter to run its associated `pip`.

### Installing a specific version

```bash id="4bq9af"
python -m pip install requests==2.32.0
```

This installs that specific version.

### Updating a package

```bash id="6g87e5"
python -m pip install --upgrade requests
```

---

# 6. Virtual Environments

A virtual environment is a **separate Python environment for a project**.

It helps keep each project's packages separate.

For example:

```text
Project A
    ↓
requests 2.x

Project B
    ↓
requests 3.x
```

Both projects can use different package versions without interfering with each other.

---

## Creating a Virtual Environment

Python provides the `venv` module.

On Windows:

```bash id="xnz94e"
python -m venv .venv
```

This creates a folder named:

```text id="w2z0hq"
.venv
```

Your project might now look like:

```text id="n8p2xm"
myproject/
│
├── .venv/
└── main.py
```

---

## Activating the Virtual Environment

### Windows Command Prompt

```cmd id="q4c1zc"
.venv\Scripts\activate
```

### Windows PowerShell

```powershell id="xnz1sm"
.venv\Scripts\Activate.ps1
```

### macOS/Linux

```bash id="5i5s3v"
source .venv/bin/activate
```

After activation, commands such as `python` and `pip` use the virtual environment.

---

## Installing Packages Inside the Environment

After activation:

```bash id="g2hfw8"
python -m pip install requests
```

The package is installed for that environment.

---

## Deactivating the Environment

When you are finished:

```bash id="icp6yp"
deactivate
```

The virtual environment is then no longer active.

---

# Why Virtual Environments Matter

Imagine two projects.

Project 1 needs:

```text
requests version A
```

Project 2 needs:

```text
requests version B
```

Installing everything globally can cause conflicts.

Virtual environments keep the dependencies separate:

```text
Project 1
└── .venv
    └── its packages

Project 2
└── .venv
    └── its packages
```

This is why virtual environments are commonly used for Python projects.

---

# Module vs Package

This difference is important.

### Module

A single `.py` file:

```text id="6ygsv5"
calculator.py
```

### Package

A folder containing related modules:

```text id="g6w1t4"
utilities/
├── calculator.py
├── text.py
└── ...
```

Think:

```text id="r0ujhp"
Module  → File
Package → Folder of modules
```

---

# `import` vs `from ... import`

Using `import`:

```python id="gksz6g"
import math

print(math.sqrt(25))
```

Using `from ... import`:

```python id="67fq6m"
from math import sqrt

print(sqrt(25))
```

The difference is mainly **how you access the imported name**.

```text id="dd6imq"
import math
      ↓
math.sqrt()

from math import sqrt
      ↓
sqrt()
```

---

# Complete Example

Suppose your project looks like:

```text id="duvvrq"
myproject/
│
├── main.py
│
└── helpers/
    ├── __init__.py
    └── calculator.py
```

`calculator.py`:

```python id="v1s4a3"
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b
```

`main.py`:

```python id="32f5f5"
from helpers.calculator import add, multiply

print(add(10, 20))
print(multiply(5, 4))
```

Output:

```text id="3yxoj4"
30
20
```

This example shows:

```text
Package
  ↓
helpers

Module
  ↓
calculator.py

Functions
  ↓
add()
multiply()
```

---

# Quick Revision

| Topic                | Main idea                            |
| -------------------- | ------------------------------------ |
| `import`             | Import a module                      |
| `from ... import`    | Import a specific name from a module |
| Your own modules     | Create a `.py` file and import it    |
| Packages             | Organize related modules in folders  |
| `pip`                | Install and manage external packages |
| Virtual environments | Keep project dependencies separate   |

### Core patterns

Import a module:

```python id="8s4fgm"
import math
```

Import something from a module:

```python id="2k7z4f"
from math import sqrt
```

Create your own module:

```text id="3v9x4r"
calculator.py
```

Import your module:

```python id="6fcl3n"
import calculator
```

Install a package:

```bash id="z8x7qk"
python -m pip install requests
```

Create a virtual environment:

```bash id="v6b1g5"
python -m venv .venv
```

Activate on Windows:

```bash id="8j0v7y"
.venv\Scripts\activate
```

Activate on macOS/Linux:

```bash id="02e1s4"
source .venv/bin/activate
```

The main mental model is:

```text
Module
  ↓
One Python file

Package
  ↓
Collection of related modules

pip
  ↓
Install external packages

Virtual environment
  ↓
Keep each project's Python setup separate
```
