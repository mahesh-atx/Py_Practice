# Python Modules and Packages — Notes

A **module** is a Python file containing code you can reuse. A **package** is a folder of modules.

> **Why this matters** — No serious program lives in one file. Modules let you split code into focused pieces and reuse them across projects. Packages and `pip` give you access to hundreds of thousands of third-party libraries. Understanding this is what turns "writing scripts" into "building software".

### The mental model

```text
Module   →  one .py file            →  import module
Package  →  a folder of .py files   →  from package import module
Library  →  a collection of packages
```

---

## 1. `import`

`import` brings a module into your program.

### Importing a whole module

```python
import math

print(math.sqrt(16))
print(math.pi)
```

Output:

```text
4.0
3.141592653589793
```

Access contents with `module.name`.

### Importing several modules

```python
import math
import random
import datetime
```

Or on one line (less common, style guides prefer separate lines):

```python
import math, random, os
```

### Aliasing with `as`

```python
import math as m

print(m.sqrt(25))
```

Output:

```text
5.0
```

Aliasing is near-universal for a few libraries:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```

These are conventions, not requirements — but following them makes your code instantly familiar to other Python programmers.

### Useful standard library modules

| Module | Purpose | Example |
| ------ | ------- | ------- |
| `math` | Maths functions | `math.sqrt(16)` |
| `random` | Random numbers | `random.randint(1, 10)` |
| `datetime` | Dates and times | `datetime.date.today()` |
| `os` | Operating system | `os.path.exists("f.txt")` |
| `sys` | Interpreter details | `sys.argv` |
| `json` | JSON data | `json.loads(text)` |
| `csv` | CSV files | `csv.reader(file)` |
| `collections` | Specialised containers | `Counter`, `defaultdict` |
| `re` | Regular expressions | `re.search(r"\d+", text)` |
| `statistics` | Statistics | `statistics.mean(data)` |

```python
import random
import datetime

print(random.randint(1, 10))
print(datetime.date.today())
```

### The standard library vs third-party

| | Installed with Python? | Install with |
| - | ---------------------- | ------------ |
| Standard library | Yes | Nothing needed |
| Third-party | No | `pip install` |

---

## 2. `from ... import`

Import specific names so you can use them without the module prefix.

### Importing a specific function

```python
from math import sqrt

print(sqrt(16))
```

Output:

```text
4.0
```

No `math.` prefix needed.

### Importing several names

```python
from math import sqrt, pi, floor

print(sqrt(16), pi, floor(3.7))
```

Output:

```text
4.0 3.141592653589793 3
```

### Importing with an alias

```python
from datetime import datetime as dt

print(dt.now())
```

### `import module` vs `from module import name`

| Style | Access | Namespace |
| ----- | ------ | --------- |
| `import math` | `math.sqrt(16)` | Clean — origin is obvious |
| `from math import sqrt` | `sqrt(16)` | Convenient, but origin is hidden |

```python
import math
print(math.sqrt(16))       # clear where sqrt came from

from math import sqrt
print(sqrt(16))            # shorter
```

> **Recommendation** — Prefer `import module` for clarity. Use `from ... import` for a few frequently used names, or when the module name is long.

### Why `from x import *` is bad

```python
from math import *         # imports every public name
```

This pollutes your namespace and makes conflicts invisible:

```python
from math import *
from numpy import *        # which sqrt is it now?
print(sqrt(4))
```

It also hides where names came from. Avoid it in real code — it is acceptable only in quick REPL experiments.

### Handling a missing module

```python
try:
    import requests
except ImportError:
    print("Install it with: pip install requests")
```

---

## 3. Creating Your Own Modules

Any `.py` file is a module.

### A simple module

`greetings.py`:

```python
def hello(name):
    return f"Hello, {name}!"

def goodbye(name):
    return f"Goodbye, {name}!"

VERSION = "1.0"
```

Using it (`main.py` in the same folder):

```python
import greetings

print(greetings.hello("Mahesh"))
print(greetings.goodbye("Nina"))
print(greetings.VERSION)
```

Output:

```text
Hello, Mahesh!
Goodbye, Nina!
1.0
```

### Importing specific names

```python
from greetings import hello, VERSION

print(hello("Mahesh"))
print(VERSION)
```

### Modules are executed on import

`demo.py`:

```python
print("This runs on import")

def greet():
    print("Hello")
```

```python
import demo
```

Output:

```text
This runs on import
```

That is why importable modules should keep top-level side effects out.

### The `if __name__ == "__main__"` guard

Every module has a `__name__` variable:

* Run directly → `__name__` is `"__main__"`
* Imported → `__name__` is the module's name

`greetings.py`:

```python
def hello(name):
    return f"Hello, {name}!"


if __name__ == "__main__":
    # Only runs when the file is executed directly
    print(hello("Test"))
```

Run directly:

```bash
python greetings.py
```

Output:

```text
Hello, Test!
```

Imported:

```python
import greetings      # no output — the guard block is skipped
```

> **Why it matters** — This lets one file be both a reusable module and a runnable script. Put tests or demo code inside the guard.

### Module search path

Python looks for modules in:

1. The folder of the running script
2. `PYTHONPATH` directories
3. The standard library
4. `site-packages` (installed packages)

```python
import sys
print(sys.path)
```

### Reloading

Python imports a module only once per session. Changes made after import are not picked up until you restart or reload:

```python
import importlib
importlib.reload(my_module)
```

---

## 4. Python Packages

A **package** is a folder containing modules, plus an `__init__.py` file.

```text
mypackage/
    __init__.py
    maths.py
    strings.py
```

### `__init__.py`

Marks the folder as a package. It can be empty, or it can run package setup code.

```python
# mypackage/__init__.py
print("Package loaded")
```

In modern Python (3.3+) packages technically work without it, but including it is still recommended and required for some layouts.

### Importing from a package

```python
from mypackage import maths
from mypackage.maths import add
import mypackage.strings as strings
```

### A realistic layout

```text
shop/
    __init__.py
    cart.py
    products.py
    payments/
        __init__.py
        upi.py
        card.py
```

```python
from shop import cart
from shop.payments import upi
```

Use dots to navigate into subpackages.

### Relative imports

Inside a package, a module can import a sibling with a leading dot:

```python
# shop/cart.py
from .products import Product       # one package up
from .payments.upi import pay       # into a subpackage
```

| Form | Meaning |
| ---- | ------- |
| `from . import x` | Same package |
| `from .. import x` | Parent package |
| `from .mod import x` | Module in the same package |

> **Note** — Relative imports only work inside packages. Running a package module directly with `python shop/cart.py` breaks them; use `python -m shop.cart` instead.

---

## 5. `pip`

`pip` installs third-party packages from PyPI (the Python Package Index).

### Installing

```bash
pip install requests
```

### Common commands

| Command | Purpose |
| ------- | ------- |
| `pip install pkg` | Install a package |
| `pip install pkg==1.2.3` | Install a specific version |
| `pip install -U pkg` | Upgrade |
| `pip uninstall pkg` | Remove |
| `pip list` | Show installed packages |
| `pip show pkg` | Details about one package |
| `pip freeze` | List installed versions |

### Using an installed package

```python
import requests

response = requests.get("https://api.github.com")
print(response.status_code)
```

### Pinning versions

```bash
pip install requests==2.31.0
```

Pinning matters: unpinned installs can pull a breaking new version months later.

### `requirements.txt`

Record your project's dependencies:

```bash
pip freeze > requirements.txt
```

`requirements.txt`:

```text
requests==2.31.0
flask==3.0.0
```

Anyone else can reproduce your environment:

```bash
pip install -r requirements.txt
```

> **Note** — `pip freeze` lists *everything* installed, including sub-dependencies and unrelated packages. For real projects, a hand-written `requirements.txt` with only your direct dependencies is cleaner.

---

## 6. Virtual Environments

A **virtual environment** is an isolated Python installation for one project, with its own packages.

### The problem it solves

```text
Project A needs Django 4.0
Project B needs Django 5.0

Without environments → both share one installation → conflict
With environments   → each project has its own → no conflict
```

### Creating one

```bash
python -m venv venv
```

This creates a `venv/` folder containing a private Python installation.

### Activating

**macOS / Linux:**

```bash
source venv/bin/activate
```

**Windows:**

```bash
venv\Scripts\activate
```

When active, your prompt shows `(venv)`:

```text
(venv) $
```

### Installing inside it

```bash
(venv) pip install requests
```

This installs into `venv/`, not globally.

### Deactivating

```bash
deactivate
```

### The standard workflow

```bash
python -m venv venv              # create once
source venv/bin/activate         # activate each session
pip install -r requirements.txt  # install dependencies
python app.py                    # work
deactivate                       # leave
```

### Do not commit `venv/`

Add it to `.gitignore`:

```text
venv/
__pycache__/
*.pyc
```

The environment is reproducible from `requirements.txt` — it should never go into version control.

### Why virtual environments matter

| Without | With |
| ------- | ---- |
| All projects share one site-packages | Each project isolated |
| Version conflicts between projects | No conflicts |
| Hard to know what a project needs | `requirements.txt` is precise |
| Upgrading breaks older projects | Upgrades are contained |

---

## Module vs Package

| | Module | Package |
| - | ------ | ------- |
| What | A single `.py` file | A folder of modules |
| Contains | Functions, classes, variables | Modules (and subpackages) |
| Import | `import mymodule` | `from mypackage import mymodule` |
| Marker | `.py` extension | `__init__.py` |

```text
helper.py        → module
utils/           → package
    __init__.py
    strings.py   → module inside the package
    maths.py     → module inside the package
```

---

## `import` vs `from ... import`

```python
import math
print(math.sqrt(16))          # namespaced, explicit

from math import sqrt
print(sqrt(16))               # direct, shorter
```

| | `import math` | `from math import sqrt` |
| - | ------------- | ----------------------- |
| Usage | `math.sqrt()` | `sqrt()` |
| Namespace | Kept clean | Adds `sqrt` to your namespace |
| Collision risk | None | Possible |
| Readability | Origin is obvious | Slightly shorter |

---

## Complete Example

```text
calculator/
    __init__.py
    operations.py
    main.py
```

`operations.py`:

```python
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
```

`main.py`:

```python
from calculator.operations import add, divide

print(add(10, 5))
print(divide(10, 2))
```

Output:

```text
15
5.0
```

Run it from the parent folder of `calculator/`:

```bash
python -m calculator.main
```

---

## Common Mistakes to Avoid

| Mistake | Consequence | Fix |
| ------- | ----------- | --- |
| `from module import *` | Namespace pollution | Import names explicitly |
| Naming your file `math.py` | Shadows the stdlib module | Never use stdlib names |
| Forgetting `__init__.py` | Package not recognised | Add the file |
| Importing code with side effects | Runs on import | Use the `__main__` guard |
| Installing globally | Version conflicts | Use a virtual environment |
| Committing `venv/` | Huge repo | Add to `.gitignore` |
| Not pinning versions | Breaks later | `requirements.txt` with `==` |
| Circular imports | `ImportError` | Restructure shared code |

---

## Quick Revision

| Concept | Syntax | Purpose |
| ------- | ------ | ------- |
| Import a module | `import math` | Bring in a whole module |
| Alias | `import numpy as np` | Shorter name |
| Import a name | `from math import sqrt` | Use without the prefix |
| Alias a name | `from datetime import datetime as dt` | Avoid collisions |
| Create a module | A `.py` file | Reusable code |
| Main guard | `if __name__ == "__main__":` | Run only when executed |
| Create a package | Folder + `__init__.py` | Group modules |
| Subpackage import | `from pkg.sub import mod` | Navigate with dots |
| Install | `pip install pkg` | Add a third-party library |
| Pin a version | `pip install pkg==1.2.3` | Reproducible installs |
| Record deps | `pip freeze > requirements.txt` | Share the environment |
| Reproduce deps | `pip install -r requirements.txt` | Set up elsewhere |
| Virtual env | `python -m venv venv` | Isolate a project |
| Activate | `source venv/bin/activate` | Enter the environment |

### Core patterns

```python
import math
import random as rnd
from datetime import datetime
from collections import Counter

if __name__ == "__main__":
    main()

try:
    import requests
except ImportError:
    print("pip install requests")
```

```bash
python -m venv venv
source venv/bin/activate
pip install requests flask
pip freeze > requirements.txt
```

### The main idea

```text
Modules and packages
 ├── Module  = one .py file
 ├── Package = folder + __init__.py
 ├── import module              → module.name()
 ├── from module import name    → name()
 ├── Guard with if __name__ == "__main__"
 ├── pip installs third-party packages
 ├── requirements.txt records versions
 └── Virtual environments isolate projects
```

---

## Self-Check

- [ ] What is the difference between a module and a package?
- [ ] Why is `from module import *` discouraged?
- [ ] What does `if __name__ == "__main__":` do, and why use it?
- [ ] How do you install a specific version of a package?
- [ ] Why should `venv/` never be committed to version control?
- [ ] What problem do virtual environments solve?
- [ ] How do you import a module from a subpackage?
- [ ] What happens if you name your file `random.py` and then `import random`?
