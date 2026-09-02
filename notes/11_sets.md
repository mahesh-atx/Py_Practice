# Python Sets — Notes

A **set** is used to store a collection of **unique values**.

Example:

```python
numbers = {10, 20, 30}
```

A set has these main properties:

* It does not allow duplicate values.
* It is changeable, so you can add and remove values.
* It does not support indexing like lists or tuples.
* It is useful for working with unique values and comparing groups of values.

---

# 1. Creating Sets

Sets are usually created using curly braces `{}`.

```python
fruits = {"apple", "banana", "mango"}
```

A set can contain numbers:

```python
numbers = {10, 20, 30, 40}
```

It can also contain different types of values:

```python
data = {"Mahesh", 24, True}
```

### Empty Set

Be careful with:

```python
empty = {}
```

This creates an empty **dictionary**, not a set.

To create an empty set, use:

```python
empty = set()
```

You can check the type:

```python
numbers = {10, 20, 30}

print(type(numbers))
```

Output:

```text
<class 'set'>
```

### Duplicate values

If you give duplicate values while creating a set, Python keeps only one copy:

```python
numbers = {10, 20, 10, 30, 20}

print(numbers)
```

The result contains:

```text
10, 20, 30
```

The order should not be relied on.

---

# 2. Adding and Removing Values

Sets are changeable, so you can add and remove values after creating them.

## `.add()`

`.add()` adds one value to a set.

```python
fruits = {"apple", "banana"}

fruits.add("mango")

print(fruits)
```

The set now contains:

```text
apple
banana
mango
```

Because sets are unordered, the display order may be different.

### Adding a value that already exists

```python
numbers = {10, 20, 30}

numbers.add(20)

print(numbers)
```

Nothing new is added because `20` is already in the set.

---

## `.remove()`

`.remove()` removes a specific value.

```python
fruits = {"apple", "banana", "mango"}

fruits.remove("banana")

print(fruits)
```

`banana` is removed.

If the value does not exist, `.remove()` raises a `KeyError`.

```python
fruits.remove("orange")
```

---

## `.discard()`

`.discard()` also removes a value.

```python
fruits = {"apple", "banana", "mango"}

fruits.discard("banana")
```

The main difference is that `discard()` does not raise an error when the value is not present.

```python
fruits.discard("orange")
```

This is allowed.

---

## `.pop()`

`.pop()` removes and returns an item from the set.

```python
numbers = {10, 20, 30}

item = numbers.pop()

print(item)
print(numbers)
```

Because sets are unordered, you should not assume which value will be removed.

---

# 3. Union

**Union** combines the values from two sets.

Duplicate values are included only once.

```python
a = {1, 2, 3}
b = {3, 4, 5}

result = a.union(b)

print(result)
```

The result contains:

```text
{1, 2, 3, 4, 5}
```

You can also use the `|` operator:

```python
result = a | b
```

Both mean the same thing.

### Think of it as

```text
A = {1, 2, 3}
B = {3, 4, 5}

Union = everything from A and B

Result = {1, 2, 3, 4, 5}
```

---

# 4. Intersection

**Intersection** gives values that are present in **both sets**.

```python
a = {1, 2, 3}
b = {3, 4, 5}

result = a.intersection(b)

print(result)
```

Result:

```text
{3}
```

You can also use `&`:

```python
result = a & b
```

### Think of it as

```text
A = {1, 2, 3}
B = {3, 4, 5}

Common value = 3

Intersection = {3}
```

---

# 5. Difference

**Difference** gives values that are in the first set but not in the second set.

```python
a = {1, 2, 3}
b = {3, 4, 5}

result = a.difference(b)

print(result)
```

Result:

```text
{1, 2}
```

You can also use `-`:

```python
result = a - b
```

### Think of it as

```text
A = {1, 2, 3}
B = {3, 4, 5}

A - B

1 → only in A
2 → only in A
3 → in both, so remove it

Result = {1, 2}
```

### Order matters

These are different:

```python
a - b
```

and:

```python
b - a
```

Example:

```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a - b)
print(b - a)
```

Result:

```text
{1, 2}
{4, 5}
```

---

# 6. Removing Duplicates

One of the most useful uses of sets is removing duplicate values.

Suppose you have a list:

```python
numbers = [10, 20, 10, 30, 20, 40, 10]

print(numbers)
```

Output:

```text
[10, 20, 10, 30, 20, 40, 10]
```

Convert the list to a set:

```python
unique_numbers = set(numbers)

print(unique_numbers)
```

Now only unique values remain:

```text
{10, 20, 30, 40}
```

### Convert it back to a list

```python
numbers = [10, 20, 10, 30, 20, 40]

unique_numbers = list(set(numbers))

print(unique_numbers)
```

This gives a list containing only unique values.

Remember that converting to a set does not keep the original order in general.

---

# Union vs Intersection vs Difference

Suppose:

```python
a = {1, 2, 3}
b = {3, 4, 5}
```

### Union

Everything from both:

```python
a | b
```

Result:

```text
{1, 2, 3, 4, 5}
```

### Intersection

Only common values:

```python
a & b
```

Result:

```text
{3}
```

### Difference

Values only in `a`:

```python
a - b
```

Result:

```text
{1, 2}
```

A simple way to remember:

```text
Union        → Everything
Intersection → Common
Difference   → Only in first set
```

---

# Quick Revision

| Topic             | Example        | Purpose                         |
| ----------------- | -------------- | ------------------------------- |
| Creating          | `{1, 2, 3}`    | Create a set                    |
| Empty set         | `set()`        | Create an empty set             |
| Add               | `.add(4)`      | Add a value                     |
| Remove            | `.remove(4)`   | Remove a value                  |
| Safe remove       | `.discard(4)`  | Remove without error if missing |
| Union             | `a \| b`       | Combine both sets               |
| Intersection      | `a & b`        | Get common values               |
| Difference        | `a - b`        | Get values only in first set    |
| Remove duplicates | `set(my_list)` | Keep unique values              |

### Core patterns

Creating:

```python
numbers = {10, 20, 30}
```

Adding:

```python
numbers.add(40)
```

Removing:

```python
numbers.remove(20)
```

Union:

```python
a.union(b)
```

or:

```python
a | b
```

Intersection:

```python
a.intersection(b)
```

or:

```python
a & b
```

Difference:

```python
a.difference(b)
```

or:

```python
a - b
```

Removing duplicates:

```python
unique = set([1, 2, 2, 3, 3])
```

The main idea to remember is:

```text
Set
 │
 ├── Unique values
 ├── No indexing
 ├── Add / remove values
 └── Compare sets
      ├── Union
      ├── Intersection
      └── Difference
```
