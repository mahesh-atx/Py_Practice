# Decorators

> A decorator is a function that **wraps another function** to add behavior around it — without changing the original code. You've probably seen `@something` above functions in frameworks like Flask. Building one yourself removes the mystery forever.

You need two ideas from **13-functions.md**: functions are values, and `*args/**kwargs`. That's it.

---

## 1. Step 0 — Functions Are Values

In Python, functions are ordinary values. You can store them in variables, pass them to other functions, and return them from functions. This single fact is the entire foundation of decorators.

```python
def shout(text):
    return text.upper()

speak = shout               # no () — we reference the function, not call it
print(speak("hello"))       # HELLO

def run_twice(func, arg):   # a function can receive another function
    func(arg)
    func(arg)
```

---

## 2. Step 1 — A Function That Returns a Function

Now the key move: define a function *inside* a function, and return the inner one.

```python
def make_loud(func):
    def wrapper(text):
        result = func(text)          # 1. run the original function
        return result.upper()        # 2. do something extra with its result
    return wrapper                   # 3. return the new, upgraded function

def greet(name):
    return f"Hello, {name}"

loud_greet = make_loud(greet)        # greet is now wrapped
print(loud_greet("Ravi"))            # HELLO, RAVI
print(greet("Ravi"))                 # Hello, Ravi — original is untouched
```

`wrapper` wraps around `greet`: it runs it, then adds behavior. `greet` itself was never edited — that's the beauty of decorators.

---

## 3. Step 2 — The @ Syntax Is Just Sugar

The assignment `loud_greet = make_loud(greet)` is so common that Python gives it a symbol:

```python
@make_loud
def greet(name):
    return f"Hello, {name}"

print(greet("Ravi"))     # HELLO, RAVI
```

`@make_loud` above a `def` means **exactly** `greet = make_loud(greet)`. Nothing more, nothing magic.

---

## 4. Real Decorator 1 — Timing Functions

"How long does my function take?" — the classic first decorator:

```python
import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)      # run the original
        print(f"{func.__name__} took {time.time() - start:.4f}s")
        return result
    return wrapper

@timer
def slow_sum(n):
    return sum(range(n))

slow_sum(10_000_000)        # slow_sum took 0.15s
```

Notice `*args, **kwargs` in the wrapper: whatever arguments the original function takes, they're passed straight through. This makes the decorator work with **any** function signature.

---

## 5. Real Decorator 2 — Logging Calls

See every call and result while debugging:

```python
def log_calls(func):
    def wrapper(*args, **kwargs):
        print(f"→ {func.__name__} called with {args} {kwargs}")
        result = func(*args, **kwargs)
        print(f"← {func.__name__} returned {result}")
        return result
    return wrapper

@log_calls
def add(a, b):
    return a + b

add(3, 5)
# → add called with (3, 5) {}
# ← add returned 8
```

You can stack decorators — they wrap inside-out, bottom to top:

```python
@timer
@log_calls
def add(a, b):
    return a + b
```

---

## 6. Keep the Metadata: functools.wraps

One fine point: after wrapping, `greet.__name__` becomes `"wrapper"` — the original's name and docstring get hidden. `@wraps` fixes that. It's a professional habit; add it to every decorator you write:

```python
from functools import wraps

def timer(func):
    @wraps(func)                       # copies name/docstring from func
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time() - start:.4f}s")
        return result
    return wrapper
```

---

## 7. Decorators You'll Meet in the Wild

Now you can read real-world code that once looked like magic:

```python
# Flask / FastAPI — registers the function as a web endpoint
@app.get("/users")
def list_users():
    ...

# Inside classes (you'll meet these after OOP)
@staticmethod
@classmethod
@property

# Testing with pytest
@pytest.fixture
def db_connection():
    ...
```

In every case it's the same idea: "take this function, wrap it with extra behavior, replace it with the wrapped version."

---

## Quick Revision

- Functions are values → they can be passed in and returned.
- A decorator = a function that takes a function, defines a `wrapper`, returns the wrapper.
- `@deco` is sugar for `func = deco(func)`.
- Use `*args, **kwargs` in the wrapper so it fits any signature.
- Add `@functools.wraps(func)` to preserve the original's name/docstring.
- Classic uses: timing, logging, caching, access control, web routing.

### Practice
1. Write `@shout` that makes any string-returning function return UPPERCASE.
2. Write `@retry` that re-runs a function up to 3 times if it raises an exception.
3. Write `@count_calls` that prints how many times a function has been called so far.

✅ Next → **21-regular-expressions.md**
