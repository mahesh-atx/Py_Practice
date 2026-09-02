# Python Dictionaries — Notes

A dictionary is a data type used to store data in **key-value pairs**.

Example:

```python
student = {
    "name": "Mahesh",
    "age": 24,
    "city": "Akola"
}
```

Here:

```text
"name" → "Mahesh"
"age"  → 24
"city" → "Akola"
```

The left side is the **key** and the right side is the **value**.

---

# 1. Key-Value Pairs

A dictionary stores data in this format:

```text
key → value
```

Example:

```python
student = {
    "name": "Mahesh",
    "age": 24,
    "course": "Computer Science"
}
```

Here:

```text
Key              Value
------------------------
"name"        →  "Mahesh"
"age"         →  24
"course"      →  "Computer Science"
```

Keys should be unique.

```python
student = {
    "name": "Mahesh",
    "age": 24
}
```

A dictionary can contain different types of values:

```python
data = {
    "name": "Mahesh",
    "age": 24,
    "height": 5.8,
    "is_student": True
}
```

---

# 2. Accessing Values

You can access a dictionary value using its key.

### Using `[]`

```python
student = {
    "name": "Mahesh",
    "age": 24
}

print(student["name"])
```

Output:

```text
Mahesh
```

Another example:

```python
print(student["age"])
```

Output:

```text
24
```

The important idea is:

```python
dictionary[key]
```

For example:

```python
student["name"]
```

means:

> Get the value stored under the `"name"` key.

### Accessing a missing key

```python
student = {
    "name": "Mahesh"
}

print(student["age"])
```

This causes a `KeyError` because `"age"` does not exist.

---

# 3. Adding and Updating Values

Dictionaries are changeable, so you can add new key-value pairs and update existing ones.

## Adding a value

```python
student = {
    "name": "Mahesh",
    "age": 24
}

student["city"] = "Akola"

print(student)
```

Now the dictionary contains:

```text
{
    "name": "Mahesh",
    "age": 24,
    "city": "Akola"
}
```

If the key doesn't exist, Python adds it.

---

## Updating a value

If the key already exists, assigning a new value updates it.

```python
student = {
    "name": "Mahesh",
    "age": 24
}

student["age"] = 25

print(student)
```

Output:

```text
{
    "name": "Mahesh",
    "age": 25
}
```

So:

```python
student["city"] = "Akola"
```

adds a new key.

But:

```python
student["age"] = 25
```

updates an existing key.

---

# 4. Removing Values

There are several ways to remove dictionary items.

## `del`

`del` removes a key-value pair.

```python
student = {
    "name": "Mahesh",
    "age": 24,
    "city": "Akola"
}

del student["city"]

print(student)
```

Result:

```text
{
    "name": "Mahesh",
    "age": 24
}
```

---

## `.pop()`

`.pop()` removes a key and returns its value.

```python
student = {
    "name": "Mahesh",
    "age": 24
}

age = student.pop("age")

print(age)
print(student)
```

Output:

```text
24
{'name': 'Mahesh'}
```

So:

```python
student.pop("age")
```

removes `"age"`.

---

# 5. `.keys()`

`.keys()` returns the dictionary's keys.

```python
student = {
    "name": "Mahesh",
    "age": 24,
    "city": "Akola"
}

print(student.keys())
```

It gives a view containing the keys.

You can use it in a loop:

```python
for key in student.keys():
    print(key)
```

Output:

```text
name
age
city
```

In many cases, you can simply write:

```python
for key in student:
    print(key)
```

---

# 6. `.values()`

`.values()` gives the values stored in the dictionary.

```python
student = {
    "name": "Mahesh",
    "age": 24,
    "city": "Akola"
}

print(student.values())
```

You can loop through the values:

```python
for value in student.values():
    print(value)
```

Output:

```text
Mahesh
24
Akola
```

So:

```text
.keys()   → keys
.values() → values
```

---

# 7. `.items()`

`.items()` gives both the **key and value**.

```python
student = {
    "name": "Mahesh",
    "age": 24,
    "city": "Akola"
}

print(student.items())
```

You can use it with a loop:

```python
for key, value in student.items():
    print(key, value)
```

Output:

```text
name Mahesh
age 24
city Akola
```

This is one of the most useful ways to loop through a dictionary.

---

# 8. Dictionary Looping

You can use a `for` loop to go through dictionary data.

## Loop through keys

```python
student = {
    "name": "Mahesh",
    "age": 24,
    "city": "Akola"
}

for key in student:
    print(key)
```

Output:

```text
name
age
city
```

By default, looping over a dictionary gives its keys.

---

## Loop through values

```python
for value in student.values():
    print(value)
```

Output:

```text
Mahesh
24
Akola
```

---

## Loop through keys and values

```python
for key, value in student.items():
    print(f"{key}: {value}")
```

Output:

```text
name: Mahesh
age: 24
city: Akola
```

This is a very common dictionary pattern.

---

# 9. Nested Dictionaries

A nested dictionary is a dictionary **inside another dictionary**.

Example:

```python
students = {
    "student1": {
        "name": "Mahesh",
        "age": 24
    },
    "student2": {
        "name": "Rahul",
        "age": 23
    }
}
```

Here:

```text
students
  │
  ├── student1
  │     ├── name → Mahesh
  │     └── age  → 24
  │
  └── student2
        ├── name → Rahul
        └── age  → 23
```

---

## Accessing Nested Values

To access `"Mahesh"`:

```python
print(students["student1"]["name"])
```

Output:

```text
Mahesh
```

To access `24`:

```python
print(students["student1"]["age"])
```

Output:

```text
24
```

The pattern is:

```python
dictionary["outer_key"]["inner_key"]
```

---

## Updating Nested Values

You can update a value inside a nested dictionary.

```python
students = {
    "student1": {
        "name": "Mahesh",
        "age": 24
    }
}

students["student1"]["age"] = 25

print(students["student1"]["age"])
```

Output:

```text
25
```

---

## Looping Through Nested Dictionaries

```python
students = {
    "student1": {
        "name": "Mahesh",
        "age": 24
    },
    "student2": {
        "name": "Rahul",
        "age": 23
    }
}

for student_id, student in students.items():
    print(student_id)
    print(student["name"])
    print(student["age"])
```

Output:

```text
student1
Mahesh
24
student2
Rahul
23
```

The outer loop gets each student, and the inner dictionary contains that student's details.

---

# Dictionary Example

Putting the main concepts together:

```python
student = {
    "name": "Mahesh",
    "age": 24,
    "course": "CSE"
}

# Access
print(student["name"])

# Add
student["city"] = "Akola"

# Update
student["age"] = 25

# Keys
print(student.keys())

# Values
print(student.values())

# Items
print(student.items())

# Loop
for key, value in student.items():
    print(f"{key}: {value}")

# Remove
student.pop("city")
```

---

# Quick Revision

| Topic              | Example                           | Purpose                                |
| ------------------ | --------------------------------- | -------------------------------------- |
| Key-value pair     | `"name": "Mahesh"`                | Store related data                     |
| Access             | `student["name"]`                 | Get a value                            |
| Add                | `student["city"] = "Akola"`       | Add new data                           |
| Update             | `student["age"] = 25`             | Change existing data                   |
| Remove             | `del student["age"]`              | Delete a value                         |
| `.keys()`          | `student.keys()`                  | Get keys                               |
| `.values()`        | `student.values()`                | Get values                             |
| `.items()`         | `student.items()`                 | Get keys and values                    |
| Dictionary looping | `for k, v in student.items()`     | Process dictionary data                |
| Nested dictionary  | `{"student": {"name": "Mahesh"}}` | Store dictionaries inside dictionaries |

### Core mental model

```text
Dictionary
    │
    ├── Key → Value
    │
    ├── Access → dictionary[key]
    │
    ├── Add/Update → dictionary[key] = value
    │
    ├── Remove → del / pop()
    │
    ├── Keys → .keys()
    │
    ├── Values → .values()
    │
    ├── Both → .items()
    │
    └── Nested → Dictionary inside Dictionary
```
