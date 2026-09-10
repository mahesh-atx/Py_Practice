# Modules and Packages

> A **module** is just a `.py` file whose code you can reuse in other files. A **package** is a folder of modules. `pip` installs third-party libraries, and virtual environments keep each project's libraries separate.

---

## 1. import — using built-in modules

Python ships with a huge **standard library**. Import a module, then use `module_name.thing`.

```python
import math

print(math.sqrt(16))        # 4.0
print(math.pi)              # 3.14159...

import random
print(random.randint(1, 6))       # random dice roll
print(random.choice(["a", "b", "c"]))

import datetime
now = datetime.datetime.now()
print(now.strftime("%d-%m-%Y %H:%M"))
```

You can rename a module for convenience (a universal convention for some libraries):

```python
import datetime as dt
print(dt.datetime.now())
```

---

## 2. from ... import — bring specific things in

```python
from math import sqrt, pi
print(sqrt(25))        # use directly, no math. prefix
print(pi)

from random import randint as ri
print(ri(1, 100))
```

⚠️ Avoid `from math import *` — it dumps names into your file and makes it unclear where things came from.

---

## 3. Creating Your Own Modules

Create a file `helpers.py`:

```python
# helpers.py
def greet(name):
    return f"Hello, {name}!"

PI = 3.14159
```

Use it from another file in the same folder:

```python
# main.py
import helpers

print(helpers.greet("Ravi"))
print(helpers.PI)
```

That's it — **any .py file is a module**. This is how you split big programs into small, focused files.

⚠️ When a module is imported, its top-level code runs once. Protect runnable code with:

```python
# helpers.py
def greet(name):
    return f"Hello, {name}!"

if __name__ == "__main__":
# runs only when helpers.py is executed directly, not when imported
    print(greet("test"))
```

---

## 4. Python Packages

A package is a **folder of related modules**. Structure:

```
my_project/
│
├── main.py
└── utils/                  ← the package
    ├── __init__.py         ← marks the folder as a package (can be empty)
    ├── math_tools.py
    └── string_tools.py
```

```python
# main.py
from utils.math_tools import add
from utils import string_tools

print(add(2, 3))
print(string_tools.shout("hi"))
```

In modern Python, a plain folder of modules often works too, but adding `__init__.py` is the standard, explicit way.

---

## 5. pip — installing third-party packages

`pip` is Python's package installer, run from the terminal:

```bash
pip install requests        # install
pip install requests==2.31.0   # specific version
pip uninstall requests
pip list                    # what's installed
pip show requests           # info about one package
```

Then import normally:

```python
import requests
response = requests.get("https://api.github.com")
print(response.status_code)
```

Packages are found on **PyPI** (pypi.org) — over 500,000 of them.

---

## 6. Virtual Environments

**The problem:** Project A needs `requests` v1, Project B needs v2 — one global install can't satisfy both.

**The solution:** each project gets its own isolated folder of packages — a **virtual environment**.

```bash
# create (run inside your project folder)
python -m venv .venv

# activate
# Windows:
.venv\Scripts\activate
# macOS / Linux:
source .venv/bin/activate

# now installs go ONLY into this project
pip install requests

# done working?
deactivate
```

You'll see `(.venv)` in your terminal when it's active. **Rule:** one virtual environment per project, always.

Save your project's dependencies so others can recreate it:

```bash
pip freeze > requirements.txt       # save
pip install -r requirements.txt     # someone else installs the same set
```

---

## Quick Revision

- Module = a `.py` file; import it to reuse its code.
- `import math` → `math.sqrt()`; `from math import sqrt` → `sqrt()`.
- Any file you write is a module; use `if __name__ == "__main__":` for runnable bits.
- Package = folder of modules + `__init__.py`.
- `pip install name` for third-party libraries (from PyPI).
- One virtual environment (`python -m venv .venv`) per project; `requirements.txt` tracks dependencies.

✅ You'll put pip and venv to work right away in **23-apis.md** — but first: **18-oop.md**
