# Python Dictionaries — Notes

A **dictionary** stores data as **key → value** pairs.

> **Why this matters** — Dictionaries are how you model real things. A user has a name, an email, and an age; a product has a price and a stock count. Dictionaries let you look up any piece by name instead of remembering a position, and the lookup is near-instant.

### The mental model

```text
Dictionary  →  a real dictionary: you look up a word to find its meaning

  "name"  →  "Mahesh"
  "age"   →  24
  "city"  →  "Akola"
```

| Property | Dictionaries |
| -------- | ------------ |
| Ordered | Yes (Python 3.7+ — insertion order is preserved) |
| Mutable | Yes |
| Keys | Must be unique and **hashable** |
| Access | By key, not by index |
| Lookup speed | O(1) |

---

## 1. Key-Value Pairs

### Basic creation

```python
person = {
    "name": "Mahesh",
    "age": 24,
    "city": "Akola"
}

print(person)
print(type(person))
```

Output:

```text
{'name': 'Mahesh', 'age': 24, 'city': 'Akola'}
<class 'dict'>
```

The structure is:

```text
{ key: value, key: value, ... }
```

### An empty dictionary

```python
data = {}
```

### Values can be any type

```python
student = {
    "name": "Nina",
    "age": 21,
    "scores": [88, 92, 79],       # a list as a value
    "is_active": True,
    "address": {"city": "Pune", "pin": 411001}   # a nested dict
}
```

### Keys must be unique

```python
data = {"a": 1, "a": 2}

print(data)
```

Output:

```text
{'a': 2}
```

The second value silently overwrites the first. No error is raised.

### Keys must be hashable

Strings, numbers, and tuples work:

```python
valid = {
    "name": "Mahesh",
    1: "one",
    (0, 0): "origin"
}
```

Lists and dictionaries do not:

```python
invalid = {[1, 2]: "value"}      # TypeError: unhashable type: 'list'
```

### `len()` and membership

```python
person = {"name": "Mahesh", "age": 24}

print(len(person))          # 2
print("name" in person)     # True  → checks KEYS
print("Mahesh" in person)   # False → values are not checked
```

> **Note** — `in` on a dictionary checks **keys only**. To test values, use `"Mahesh" in person.values()`.

---

## 2. Accessing Values

### Square bracket access

```python
person = {"name": "Mahesh", "age": 24}

print(person["name"])
print(person["age"])
```

Output:

```text
Mahesh
24
```

### A missing key raises `KeyError`

```python
print(person["email"])
```

Output:

```text
KeyError: 'email'
```

This is the most common dictionary bug. Three ways to handle it:

### 1. Check first

```python
if "email" in person:
    print(person["email"])
else:
    print("No email on file")
```

### 2. Use `.get()` — the idiomatic choice

```python
print(person.get("email"))
```

Output:

```text
None
```

`.get()` returns `None` instead of raising. You can also supply a default:

```python
print(person.get("email", "not provided"))
print(person.get("age", 0))
```

Output:

```text
not provided
24
```

> **Rule** — Use `[]` when a missing key is a bug you want to surface. Use `.get()` when a missing key is expected and you have a sensible default.

### 3. `setdefault()`

Returns the value, and inserts the default if the key is absent:

```python
person = {"name": "Mahesh"}

age = person.setdefault("age", 0)

print(age)          # 0
print(person)       # {'name': 'Mahesh', 'age': 0}
```

Useful when building up counters:

```python
counts = {}

for word in ["a", "b", "a"]:
    counts.setdefault(word, 0)
    counts[word] += 1

print(counts)
```

Output:

```text
{'a': 2, 'b': 1}
```

(`collections.Counter` and `defaultdict` do this more elegantly — see below.)

### `[]` vs `.get()`

| | Missing key | Use when |
| - | ----------- | -------- |
| `d[key]` | Raises `KeyError` | The key should exist |
| `d.get(key)` | Returns `None` | Absence is acceptable |
| `d.get(key, default)` | Returns `default` | You have a fallback |
| `d.setdefault(key, default)` | Inserts and returns `default` | Building up values |

---

## 3. Adding and Updating Values

### Adding a new pair

```python
person = {"name": "Mahesh"}

person["age"] = 24

print(person)
```

Output:

```text
{'name': 'Mahesh', 'age': 24}
```

### Updating an existing key

```python
person = {"name": "Mahesh", "age": 24}

person["age"] = 25

print(person)
```

Output:

```text
{'name': 'Mahesh', 'age': 25}
```

> **Note** — The syntax is identical for adding and updating. If the key exists, it is replaced; if not, it is created.

### Updating several at once — `.update()`

```python
person = {"name": "Mahesh"}

person.update({"age": 24, "city": "Akola"})

print(person)
```

Output:

```text
{'name': 'Mahesh', 'age': 24, 'city': 'Akola'}
```

`.update()` merges, overwriting existing keys and adding new ones:

```python
person = {"name": "Mahesh", "age": 24}
person.update({"age": 30, "city": "Pune"})

print(person)
```

Output:

```text
{'name': 'Mahesh', 'age': 30, 'city': 'Pune'}
```

### Counting occurrences

```python
text = "hello"
counts = {}

for char in text:
    counts[char] = counts.get(char, 0) + 1

print(counts)
```

Output:

```text
{'h': 1, 'e': 1, 'l': 2, 'o': 1}
```

> **`collections.Counter` does this in one line:**
>
> ```python
> from collections import Counter
> print(Counter("hello"))    # Counter({'l': 2, 'h': 1, 'e': 1, 'o': 1})
> ```

---

## 4. Removing Values

### `.pop(key)`

Removes a key and **returns** its value:

```python
person = {"name": "Mahesh", "age": 24}

age = person.pop("age")

print(age)          # 24
print(person)       # {'name': 'Mahesh'}
```

With a default to avoid `KeyError`:

```python
value = person.pop("email", "absent")
print(value)        # absent
```

### `del`

Deletes a key, returning nothing:

```python
person = {"name": "Mahesh", "age": 24}

del person["age"]

print(person)       # {'name': 'Mahesh'}
```

`del person["email"]` raises `KeyError`.

### `.popitem()`

Removes and returns the **last inserted** pair (LIFO, since 3.7):

```python
person = {"name": "Mahesh", "age": 24}

key, value = person.popitem()

print(key, value)   # age 24
print(person)       # {'name': 'Mahesh'}
```

### `.clear()`

```python
person.clear()
print(person)       # {}
```

### Removing methods compared

| Method | Returns | Missing key |
| ------ | ------- | ----------- |
| `.pop(key)` | The value | `KeyError` (unless a default is given) |
| `del d[key]` | Nothing | `KeyError` |
| `.popitem()` | Last `(key, value)` | `KeyError` if empty |
| `.clear()` | Nothing | — |

### Removing during iteration

Like lists, do not change a dict while looping over it. Iterate over a copy of the keys:

```python
data = {"a": 1, "b": 0, "c": 3}

for key in list(data.keys()):
    if data[key] == 0:
        del data[key]

print(data)         # {'a': 1, 'c': 3}
```

Or build a new dict:

```python
data = {k: v for k, v in data.items() if v != 0}
```

---

## 5. `.keys()`

Returns a view of all the keys.

```python
person = {"name": "Mahesh", "age": 24, "city": "Akola"}

print(person.keys())
```

Output:

```text
dict_keys(['name', 'age', 'city'])
```

### It is a view, not a list

```python
keys = person.keys()

person["email"] = "m@example.com"

print(keys)      # the view reflects the change
```

Output:

```text
dict_keys(['name', 'age', 'city', 'email'])
```

Convert to a list when you need one:

```python
print(list(person.keys()))
```

Output:

```text
['name', 'age', 'city', 'email']
```

### Iterating over keys

```python
for key in person:              # same as person.keys()
    print(key)
```

---

## 6. `.values()`

Returns a view of all the values.

```python
person = {"name": "Mahesh", "age": 24}

print(person.values())
print(list(person.values()))
```

Output:

```text
dict_values(['Mahesh', 24])
['Mahesh', 24']
```

### Checking whether a value exists

```python
print("Mahesh" in person.values())      # True
```

### Aggregating values

```python
scores = {"Maths": 88, "Science": 92, "English": 79}

print(sum(scores.values()))                      # 259
print(sum(scores.values()) / len(scores))        # 86.33
```

Output:

```text
259
86.33333333333333
```

> **Note** — You cannot index a `values()` view: `list(person.values())[0]` works, `person.values()[0]` does not.

---

## 7. `.items()`

Returns a view of `(key, value)` pairs — the most useful of the three.

```python
person = {"name": "Mahesh", "age": 24}

print(person.items())
```

Output:

```text
dict_items([('name', 'Mahesh'), ('age', 24)])
```

### Iterating with unpacking

```python
for key, value in person.items():
    print(key, "→", value)
```

Output:

```text
name → Mahesh
age → 24
```

Each item is a tuple, so it unpacks directly into two names.

### Building a formatted report

```python
scores = {"Maths": 88, "Science": 92, "English": 79}

for subject, score in scores.items():
    print(f"{subject:<10} {score:>3}")
```

Output:

```text
Maths       88
Science     92
English     79
```

### Keys vs values vs items

| Method | Produces | Common use |
| ------ | -------- | ---------- |
| `.keys()` | Keys | Checking existence, iterating keys |
| `.values()` | Values | Summing, checking a value |
| `.items()` | `(key, value)` pairs | Iterating both at once |

---

## 8. Dictionary Looping

### Looping over keys (the default)

```python
person = {"name": "Mahesh", "age": 24, "city": "Akola"}

for key in person:
    print(key, person[key])
```

Output:

```text
name Mahesh
age 24
city Akola
```

### Looping over key-value pairs

```python
for key, value in person.items():
    print(f"{key}: {value}")
```

Output:

```text
name: Mahesh
age: 24
city: Akola
```

> **Prefer `.items()`** — it is clearer and avoids a second lookup per key.

### Looping over values

```python
for value in person.values():
    print(value)
```

### Conditional filtering

```python
scores = {"Maths": 88, "Science": 92, "English": 79}

for subject, score in scores.items():
    if score >= 85:
        print(subject, "passed with distinction")
```

Output:

```text
Maths passed with distinction
Science passed with distinction
```

### Dictionary comprehension

Build a new dict in one line:

```python
numbers = {"a": 1, "b": 2, "c": 3}

doubled = {k: v * 2 for k, v in numbers.items()}
passed = {k: v for k, v in scores.items() if v >= 85}

print(doubled)
print(passed)
```

Output:

```text
{'a': 2, 'b': 4, 'c': 6}
{'Maths': 88, 'Science': 92}
```

### Sorting a dictionary

```python
scores = {"Maths": 88, "Science": 92, "English": 79}

for subject, score in sorted(scores.items(), key=lambda x: x[1], reverse=True):
    print(subject, score)
```

Output:

```text
Science 92
Maths 88
English 79
```

---

## 9. Nested Dictionaries

A dictionary can contain other dictionaries.

```python
students = {
    "Mahesh": {"age": 24, "grade": "A"},
    "Nina":   {"age": 21, "grade": "B"},
    "Rahul":  {"age": 23, "grade": "A"}
}
```

### Accessing nested values

```python
print(students["Mahesh"]["age"])
print(students["Nina"]["grade"])
```

Output:

```text
24
B
```

Each `[...]` steps one level deeper.

### Safely accessing nested values

```python
print(students.get("Aman", {}).get("age", "unknown"))
```

Output:

```text
unknown
```

### Adding a nested entry

```python
students["Aman"] = {"age": 22, "grade": "C"}

print(students["Aman"])
```

Output:

```text
{'age': 22, 'grade': 'C'}
```

### Updating a nested value

```python
students["Nina"]["grade"] = "A"
```

### Iterating nested dictionaries

```python
for name, details in students.items():
    print(f"{name}: age {details['age']}, grade {details['grade']}")
```

Output:

```text
Mahesh: age 24, grade A
Nina: age 21, grade A
Rahul: age 23, grade A
```

### A list of dictionaries — the most common real-world shape

```python
users = [
    {"name": "Mahesh", "age": 24},
    {"name": "Nina", "age": 21},
    {"name": "Rahul", "age": 23}
]

for user in users:
    print(user["name"], user["age"])
```

Output:

```text
Mahesh 24
Nina 21
Rahul 23
```

Filtering:

```python
adults = [u for u in users if u["age"] >= 23]
print(adults)
```

Output:

```text
[{'name': 'Mahesh', 'age': 24}, {'name': 'Rahul', 'age': 23}]
```

> **Note** — Deeply nested dictionaries become hard to work with. Three or more levels is usually a sign that a class or a dedicated data structure would be clearer.

---

## Dictionary Complete Example

```python
student = {
    "name": "Mahesh",
    "age": 24,
    "scores": {"Maths": 88, "Science": 92},
    "city": "Akola"
}

# Access
print(student["name"])

# Add
student["grade"] = "A"

# Update
student["age"] = 25

# Keys
print(list(student.keys()))

# Values
print(list(student.values()))

# Items
for key, value in student.items():
    print(key, "→", value)

# Nested access
print(student["scores"]["Maths"])

# Loop
for subject, score in student["scores"].items():
    print(subject, score)

# Remove
removed = student.pop("city")
print(removed)
```

---

## Common Mistakes to Avoid

| Mistake | What happens | Fix |
| ------- | ------------ | --- |
| `d["missing"]` | `KeyError` | Use `.get("missing", default)` |
| Using a list as a key | `TypeError: unhashable` | Use a tuple |
| `"value" in d` expecting a value match | Only keys are checked | `in d.values()` |
| Modifying a dict while iterating | `RuntimeError` | Iterate `list(d.items())` |
| Assuming pre-3.7 ordering | Not an issue in modern Python | Insertion order is preserved |
| Duplicate keys in a literal | Silently overwritten | Check for typos |
| `d.values()[0]` | `TypeError` | `list(d.values())[0]` |

---

## Quick Revision

| Topic | Example | Purpose |
| ----- | ------- | ------- |
| Create | `{"a": 1}` | Key-value pairs |
| Empty | `{}` | Start empty |
| Access | `d["key"]` | Raises if missing |
| Safe access | `d.get("key", default)` | Returns a default |
| Add / update | `d["key"] = value` | Same syntax for both |
| Update several | `d.update({...})` | Merge |
| Remove | `d.pop("key")` | Returns the value |
| Delete | `del d["key"]` | No return |
| Remove last | `d.popitem()` | LIFO |
| Keys | `d.keys()` | View of keys |
| Values | `d.values()` | View of values |
| Pairs | `d.items()` | `(key, value)` pairs |
| Loop | `for k, v in d.items():` | Iterate both |
| Comprehension | `{k: v*2 for k, v in d.items()}` | Build a new dict |
| Nested | `d["a"]["b"]` | Step deeper |
| Membership | `"k" in d` | Checks keys only |

### Core patterns

```python
d = {}                              # empty
d["key"] = value                    # add or update
value = d.get("key", "default")     # safe access
value = d.pop("key", None)          # remove, keep the value
d.update(other)                     # merge

for key in d:                       # keys
for value in d.values():            # values
for k, v in d.items():              # both

counts[word] = counts.get(word, 0) + 1        # counting
new = {k: v for k, v in d.items() if v > 0}   # filter
nested["a"]["b"]                              # nested access
```

### The main idea

```text
Dictionaries
 ├── key → value pairs
 ├── Ordered (3.7+), mutable, keys must be unique and hashable
 ├── Access:  d[key]  (raises)  vs  d.get(key, default)  (safe)
 ├── Add and update use the same syntax
 ├── Remove: pop() / del / popitem() / clear()
 ├── Views:  .keys()  .values()  .items()
 ├── Loop with .items() for key and value together
 └── Nesting models real records — but do not go too deep
```

---

## Self-Check

- [ ] What is the difference between `d["x"]` and `d.get("x")`?
- [ ] Why can a list not be used as a dictionary key?
- [ ] Does `"Mahesh" in person` check keys or values?
- [ ] How do you add a new key and update an existing one — is the syntax different?
- [ ] What does `.items()` return, and how do you unpack it in a loop?
- [ ] How do you count how often each word appears in a list?
- [ ] How do you safely access `data["user"]["address"]["city"]` when levels may be missing?
- [ ] Why does modifying a dictionary during iteration fail, and what is the fix?
