# JSON

> **JSON** (JavaScript Object Notation) is *the* data format of the internet — every API you'll ever call sends and receives JSON. The good news: if you know Python dicts and lists, you already know 95% of it.

---

## 1. What Is JSON?

JSON is plain **text** that represents structured data. It looks almost exactly like a Python dictionary — objects `{ }`, arrays `[ ]`, strings, numbers. But it's language-independent: Python, JavaScript, Java, everything reads and writes the same format. That's why it's the universal "envelope" for data on the web.

```json
{
  "name": "Ravi",
  "age": 21,
  "is_student": true,
  "marks": [80, 75, 90],
  "address": {
    "city": "Pune",
    "state": "Maharashtra"
  },
  "nickname": null
}
```

---

## 2. The Small Differences From Python

JSON is *almost* a Python dict — but these differences cause most beginner errors:

| Python | JSON |
|--------|------|
| `True`, `False`, `None` | `true`, `false`, `null` (lowercase!) |
| `'single quotes'` are fine | **double quotes only** |
| trailing commas are fine | **no trailing commas** |
| `tuple` exists | doesn't exist (becomes an array) |
| comments allowed | **not allowed** |

So don't hand-write JSON as a Python string and expect it to work — convert properly (below).

---

## 3. Type Mapping — JSON ↔ Python

When JSON becomes Python (and back), types convert like this:

| JSON | becomes in Python |
|------|-------------------|
| object `{ }` | `dict` |
| array `[ ]` | `list` |
| string | `str` |
| number | `int` / `float` |
| `true` / `false` | `True` / `False` |
| `null` | `None` |

---

## 4. Converting: json.loads() and json.dumps()

The `json` module does both directions. The **s**-versions work on **strings** (you'll use these constantly with APIs):

```python
import json

# JSON string → Python dict   (think: load-STRING)
data = json.loads('{"name": "Ravi", "age": 21}')
print(data["name"])                     # Ravi
print(type(data))                       # <class 'dict'>

# Python dict → JSON string   (think: dump-STRING)
text = json.dumps({"name": "Ravi", "age": 21})
print(text)                             # '{"name": "Ravi", "age": 21}'
```

**Pretty-printing** for humans — `indent` makes nested data readable:

```python
print(json.dumps(data, indent=2))
# {
# "name": "Ravi",
# "age": 21
# }
```

### Files: load() / dump() (no "s")

For reading/writing `.json` **files**, drop the `s` — same idea, file objects instead of strings. (Covered in **16-file-handling.md**.)

```python
import json

with open("data.json", "w") as f:
    json.dump(data, f, indent=2)        # dict → file

with open("data.json") as f:
    loaded = json.load(f)               # file → dict
```

Memory aid: **s = string**. `loads/dumps` → strings; `load/dump` → files.

---

## 5. Reading Nested JSON — the Chain Trick

Real JSON is nested several levels deep. The secret: **each `[ ]` handles one level**. Look at the structure, then chain lookups left to right:

```python
response = json.loads('''
{
  "college": "COEP",
  "top_student": {
    "name": "Asha",
    "marks": {"math": 95, "sci": 91}
  },
  "subjects": ["math", "sci", "eng"]
}
''')

print(response["top_student"]["name"])            # Asha
print(response["top_student"]["marks"]["math"])   # 95
print(response["subjects"][0])                    # math
```

Read it in steps: "inside response, get `top_student` → inside that get `marks` → inside that get `math`." One bracket per step down.

Looping over arrays of objects — the most common real-world shape:

```python
users = json.loads('''
[
  {"name": "Ravi", "age": 21},
  {"name": "Asha", "age": 19}
]
''')

for user in users:
    print(f"{user['name']} is {user['age']}")
```

---

## 6. Building JSON — Don't Write Strings by Hand

To *create* JSON, build normal Python dicts/lists and convert. Never assemble it with string concatenation — quotes and commas will betray you:

```python
profile = {
    "name": "Ravi",
    "skills": ["python", "sql"],
    "available": True,          # Python True → JSON true automatically
}

json_text = json.dumps(profile, indent=2)
```

---

## 7. Common Mistakes

```python
# Writing Python literals inside JSON text
json.loads("{'name': 'Ravi'}")        # ❌ single quotes → use double quotes

# Using True/None instead of true/null in JSON text
json.loads('{"ok": True}')            # ❌ → must be lowercase true

# Forgetting to parse — treating the string as a dict
raw = '{"name": "Ravi"}'
print(raw["name"])                    # ❌ TypeError — raw is still a str!
print(json.loads(raw)["name"])        # ✅ parse first

# Trailing comma
json.loads('{"a": 1,}')               # ❌ invalid JSON
```

---

## Quick Revision

- JSON = text that looks like Python dicts/lists; the internet's data format.
- Differences: `true/false/null`, double quotes only, no trailing commas.
- `json.loads(s)` string → dict; `json.dumps(d)` dict → string; without `s` they work on files.
- Nested data: chain `[ ]` lookups, one bracket per level; loop over arrays of objects.
- Build JSON from Python objects — never hand-write the string.

### Practice
1. Convert `{"city": "Pune", "temps": [28, 30, 27]}` to JSON and back; print `temps[1]`.
2. Given a list-of-dicts JSON of 3 students, print each student's name and average marks.
3. Build a Python dict describing yourself and save it to `profile.json` with `indent=2`.

✅ Next → **23-apis.md**
