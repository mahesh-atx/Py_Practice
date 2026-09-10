# Dictionaries

> A dictionary stores data as **key → value pairs**. Instead of index numbers, you look things up by name. Real-world data (users, settings, API responses) is almost always dictionaries. Learn this deeply.

---

## 1. Key-Value Pairs — Creating Dictionaries

A dictionary is written with **curly braces**: each entry is a `key` and its `value` joined by a colon. Think of it like a real dictionary — you look up a *word* (key) to get its *meaning* (value), instead of searching page by page.

```python
student = {
    "name": "Ravi",
    "age": 21,
    "city": "Nashik",
    "marks": [80, 75, 90]
}
```

Each entry is `"key": value`. Rules for keys:
- Must be **unique** (later assignment wins).
- Must be immutable: strings, numbers, tuples. Lists can't be keys.

```python
empty = {}
print(type(empty))      # <class 'dict'>
print(len(student))     # 4 keys
```

---

## 2. Accessing Values

### Direct access with `[key]`

Like list indexing, but with a name instead of a number. Fast and clean — but it **crashes** if the key doesn't exist.

```python
print(student["name"])      # Ravi
print(student["marks"][0])  # 80

print(student["phone"])     # ❌ KeyError if key is missing!
```

### Safer access with .get()

Same lookup, but instead of crashing on a missing key it quietly returns `None` — or any default you choose as a second argument.

```python
print(student.get("phone"))             # None (no crash)
print(student.get("phone", "N/A"))      # "N/A" (default value)
```

**Rule of thumb:** use `get()` whenever the key *might* be missing.

---

## 3. Adding and Updating Values

Assignment does both:

```python
student["grade"] = "A"        # add new key
student["age"] = 22           # update existing key
print(student)
```

Merge another dictionary in:

```python
extra = {"phone": "98XXXXXXX", "city": "Pune"}
student.update(extra)         # adds phone, overwrites city
```

---

## 4. Removing Values

Several tools, each slightly different. `pop()` is the favourite because it removes *and* hands the value back to you.

```python
student = {"name": "Ravi", "age": 21, "city": "Nashik"}

phone = student.pop("city")       # remove by key AND return the value
print(phone)                      # Nashik

last = student.popitem()          # remove the LAST inserted pair

del student["age"]                # delete by key (error if missing)
student.clear()                   # empty everything
```

---

## 5. .keys(), .values(), .items()

Three methods that give you the dictionary's contents as separate collections — keys alone, values alone, or (key, value) pairs together. `.items()` is the one you'll use most, especially for looping.

```python
student = {"name": "Ravi", "age": 21, "city": "Nashik"}

print(student.keys())     # dict_keys(['name', 'age', 'city'])
print(student.values())   # dict_values(['Ravi', 21, 'Nashik'])
print(student.items())    # dict_items([('name','Ravi'), ('age',21), ('city','Nashik')])
```

These are *views* — they update automatically if the dict changes. Wrap in `list()` if you need a real list.

---

## 6. Looping Through Dictionaries

Three ways to loop, depending on what you need. The last one — unpacking `.items()` into `key, value` — is the pattern you'll use everywhere.

```python
student = {"name": "Ravi", "age": 21, "city": "Nashik"}

# keys only (default):
for key in student:
    print(key)

# values only:
for value in student.values():
    print(value)

# both — the most common pattern:
for key, value in student.items():
    print(f"{key}: {value}")
```

Real example — total and average from marks:

```python
marks = {"math": 85, "sci": 78, "eng": 92}

total = sum(marks.values())
print("Total:", total)                    # 255
print("Average:", total / len(marks))     # 85.0

for subject, score in marks.items():
    status = "Pass" if score >= 40 else "Fail"
    print(f"{subject}: {score} ({status})")
```

---

## 7. Nested Dictionaries

Dictionaries can contain dictionaries (and lists) — this is how real structured data looks.

```python
college = {
    "student1": {"name": "Ravi", "marks": [80, 75]},
    "student2": {"name": "Asha", "marks": [88, 91]},
}

print(college["student1"]["name"])        # Ravi
print(college["student2"]["marks"][0])    # 88

# loop through nested data:
for sid, info in college.items():
    print(sid, info["name"], sum(info["marks"]) / 2)
```

Another shape you'll see constantly — a **list of dictionaries**:

```python
users = [
    {"name": "Ravi", "age": 21},
    {"name": "Asha", "age": 19},
]
for user in users:
    print(f"{user['name']} is {user['age']}")
```

This is basically what JSON data from APIs looks like — worth getting comfortable with now.

---

## 8. ⚠️ Common Mistakes

```python
# Forgetting the key might not exist
data = {"a": 1}
print(data["b"])          # ❌ KeyError — use data.get("b")

# Using a list as a key
d = {[1, 2]: "x"}         # ❌ TypeError — keys must be immutable

# Assuming order (it IS preserved since Python 3.7, but don't rely on sets/lists logic for dicts)
```

---

## Quick Revision

- Dict = `{key: value}` pairs; keys unique & immutable.
- Read: `d[key]` (crashes if missing) or `d.get(key, default)` (safe).
- Add/update: `d[key] = value`; merge: `d.update(other)`.
- Remove: `pop(key)`, `popitem()`, `del`, `clear()`.
- Loop: `for k, v in d.items()` is the workhorse pattern.
- Nest freely: dicts in dicts, lists of dicts — the shape of real data.

### Practice
1. Build a dict of 3 friends with their ages; print each as a sentence.
2. Count word frequencies in a sentence using a dict and a loop.
3. Store marks for 3 subjects in a dict and compute the average.

✅ Next → **13-functions.md**
