# Python Tuples and Sets — Notes

## Part 1: Tuples

A tuple is a collection used to store multiple values.

Tuples are:

* Ordered
* Allow duplicate values
* **Immutable**, meaning their values cannot be changed after creation
* Written using `()`

Example:

```python
numbers = (10, 20, 30)
```

---

# 1. Creating Tuples

A tuple is usually created using parentheses:

```python
fruits = ("apple", "banana", "mango")
```

A tuple can contain different data types:

```python
data = ("Mahesh", 24, 5.8, True)
```

An empty tuple:

```python
empty = ()
```

### Single-item tuple

A tuple with one item needs a comma:

```python
number = (10,)
```

Without the comma:

```python
number = (10)
```

this is just an integer, not a tuple.

```python
print(type((10,)))
print(type((10)))
```

Output:

```text
<class 'tuple'>
<class 'int'>
```

---

# 2. Indexing

Tuples use zero-based indexing, just like lists and strings.

```python
fruits = ("apple", "banana", "mango", "orange")
```

Indexes:

```text
apple    banana    mango    orange
  0        1        2         3
```

Example:

```python
print(fruits[0])
print(fruits[2])
```

Output:

```text
apple
mango
```

### Negative indexing

```python
print(fruits[-1])
```

Output:

```text
orange
```

```python
print(fruits[-2])
```

Output:

```text
mango
```

### Slicing

Tuples also support slicing:

```python
print(fruits[1:3])
```

Output:

```text
('banana', 'mango')
```

### Important

You cannot change an individual tuple item:

```python
fruits[0] = "grapes"
```

This causes a `TypeError` because tuples are immutable.

---

# 3. Unpacking

Tuple unpacking means assigning tuple values to separate variables.

```python
person = ("Mahesh", 24, "India")

name, age, country = person

print(name)
print(age)
print(country)
```

Output:

```text
Mahesh
24
India
```

The values are assigned in order:

```text
name    → "Mahesh"
age     → 24
country → "India"
```

The number of variables should normally match the number of values.

```python
a, b, c = (10, 20, 30)
```

This works.

But:

```python
a, b = (10, 20, 30)
```

causes an error because there are two variables but three values.

### Swapping values

Tuple unpacking can also be used to swap variables:

```python
a = 10
b = 20

a, b = b, a

print(a)
print(b)
```

Output:

```text
20
10
```

---

# 4. Tuple Methods

Tuples have fewer methods than lists because tuples cannot be changed.

The main tuple methods are:

```text
.count()
.index()
```

## `.count()`

`.count()` tells you how many times a value appears.

```python
numbers = (10, 20, 10, 30, 10)

print(numbers.count(10))
```

Output:

```text
3
```

The value `10` appears three times.

---

## `.index()`

`.index()` returns the index of the first occurrence of a value.

```python
fruits = ("apple", "banana", "mango")

print(fruits.index("banana"))
```

Output:

```text
1
```

If a value appears multiple times:

```python
numbers = (10, 20, 10, 30)

print(numbers.index(10))
```

Output:

```text
0
```

It returns the index of the **first occurrence**.

---

# Part 2: Sets

A set is a collection used to store **unique values**.

Sets are:

* Unordered
* Do not allow duplicate values
* Changeable
* Written using `{}`

Example:

```python
numbers = {10, 20, 30}
```

A set is useful when you care about unique values rather than their position.

---

# 5. Creating Sets

A set can be created using curly brackets:

```python
fruits = {"apple", "banana", "mango"}
```

Numbers:

```python
numbers = {10, 20, 30, 40}
```

Mixed values:

```python
data = {"Mahesh", 24, True}
```

### Empty set

Be careful:

```python
empty = {}
```

This creates an empty dictionary, not a set.

To create an empty set:

```python
empty = set()
```

Check it:

```python
print(type(empty))
```

Output:

```text
<class 'set'>
```

### Duplicate values

If you create a set with duplicates:

```python
numbers = {10, 20, 10, 30, 20}

print(numbers)
```

The duplicates are removed automatically.

The result contains only unique values.

The order should not be relied on because sets are unordered.

---

# 6. Adding and Removing Values

Sets can be changed after creation.

## `.add()`

Adds one value to a set.

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

Because sets are unordered, you should not expect a fixed display order.

### Adding an existing value

```python
numbers = {10, 20, 30}

numbers.add(20)

print(numbers)
```

Nothing changes because `20` is already present.

---

## `.remove()`

Removes a specific value.

```python
fruits = {"apple", "banana", "mango"}

fruits.remove("banana")

print(fruits)
```

`banana` is removed.

If the value does not exist, `.remove()` causes a `KeyError`.

---

## `.discard()`

`.discard()` also removes a value.

```python
fruits = {"apple", "banana", "mango"}

fruits.discard("banana")
```

The main difference is that `.discard()` does not give an error if the value doesn't exist.

```python
fruits.discard("orange")
```

This is safe even though `"orange"` isn't in the set.

---

# 7. Union

Union combines the values from two sets.

It keeps each value only once.

Example:

```python
a = {1, 2, 3}
b = {3, 4, 5}

result = a.union(b)

print(result)
```

Result contains:

```text
{1, 2, 3, 4, 5}
```

You can also use `|`:

```python
result = a | b
```

Both mean union.

Think:

```text
A = {1, 2, 3}

B = {3, 4, 5}

A ∪ B = {1, 2, 3, 4, 5}
```

---

# 8. Intersection

Intersection returns values that exist in **both sets**.

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

Think:

```text
A = {1, 2, 3}

B = {3, 4, 5}

A ∩ B = {3}
```

Only `3` exists in both sets.

---

# 9. Difference

Difference returns values that are in the **first set but not in the second set**.

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

Think:

```text
A = {1, 2, 3}

B = {3, 4, 5}

A - B = {1, 2}
```

`3` is removed because it exists in `B`.

### Direction matters

```python
a - b
```

is not necessarily the same as:

```python
b - a
```

For example:

```python
print(a - b)
print(b - a)
```

Results:

```text
{1, 2}
{4, 5}
```

---

# 10. Removing Duplicates

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

Convert it to a set:

```python
unique_numbers = set(numbers)

print(unique_numbers)
```

Now only unique values remain:

```text
{10, 20, 30, 40}
```

### Convert back to a list

If you need a list again:

```python
numbers = [10, 20, 10, 30, 20, 40]

unique_numbers = list(set(numbers))

print(unique_numbers)
```

The result contains unique values.

Remember that using a set does not keep the original list order in the general case.

---

# Tuple vs Set

| Feature    | Tuple                      | Set                                 |
| ---------- | -------------------------- | ----------------------------------- |
| Syntax     | `(1, 2, 3)`                | `{1, 2, 3}`                         |
| Ordered    | Yes                        | No                                  |
| Duplicates | Allowed                    | Not allowed                         |
| Changeable | No                         | Yes                                 |
| Indexing   | Yes                        | No                                  |
| Main use   | Fixed collection of values | Unique values and set operations    |
| Methods    | `.count()`, `.index()`     | `.add()`, `.remove()`, `.discard()` |

# Quick Revision

### Tuple

```python
numbers = (10, 20, 30)

print(numbers[0])
```

Unpacking:

```python
name, age = ("Mahesh", 24)
```

Methods:

```python
numbers.count(10)
numbers.index(20)
```

### Set

```python
numbers = {10, 20, 30}
```

Add:

```python
numbers.add(40)
```

Remove:

```python
numbers.remove(20)
```

Union:

```python
a | b
```

Intersection:

```python
a & b
```

Difference:

```python
a - b
```

Remove duplicates:

```python
unique = set([1, 2, 2, 3, 3])
```

The main mental model is:

```text
Tuple → Ordered + Fixed + Duplicates allowed

Set   → Unique values + No indexing + Set operations
```
