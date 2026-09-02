# Python Lists — Notes

A list is used to store **multiple values in a single variable**.

Lists are:

* Ordered
* Changeable
* Able to contain duplicate values
* Able to store different data types

Example:

```python
fruits = ["apple", "banana", "mango"]
```

Here, one variable `fruits` stores three values.

---

# 1. Creating Lists

A list is created using square brackets `[]`.

```python
fruits = ["apple", "banana", "mango"]
```

A list can contain numbers:

```python
numbers = [10, 20, 30, 40]
```

It can contain strings:

```python
names = ["Mahesh", "Rahul", "Amit"]
```

It can contain different data types:

```python
data = ["Mahesh", 24, 5.8, True]
```

An empty list:

```python
items = []
```

You can check the type:

```python
fruits = ["apple", "banana"]

print(type(fruits))
```

Output:

```text
<class 'list'>
```

---

# 2. Indexing and Slicing

Lists use **zero-based indexing**, just like strings.

```python
fruits = ["apple", "banana", "mango", "orange"]
```

Indexes:

```text
apple    banana    mango    orange
  0         1        2         3
```

### Accessing an item

```python
print(fruits[0])
```

Output:

```text
apple
```

```python
print(fruits[2])
```

Output:

```text
mango
```

### Negative indexing

Negative indexes start from the end.

```text
apple    banana    mango    orange
 -4        -3       -2        -1
```

Example:

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

---

## List Slicing

Slicing gets a part of a list.

### Syntax

```python
list[start:stop]
```

Example:

```python
fruits = ["apple", "banana", "mango", "orange"]

print(fruits[1:3])
```

Output:

```text
['banana', 'mango']
```

The `stop` index is not included.

### From the beginning

```python
print(fruits[:3])
```

Output:

```text
['apple', 'banana', 'mango']
```

### Until the end

```python
print(fruits[2:])
```

Output:

```text
['mango', 'orange']
```

### Reverse a list using slicing

```python
print(fruits[::-1])
```

Output:

```text
['orange', 'mango', 'banana', 'apple']
```

---

# 3. Adding and Removing Items

Lists are **mutable**, which means their contents can be changed after creation.

For example:

```python
fruits = ["apple", "banana"]

fruits.append("mango")

print(fruits)
```

Output:

```text
['apple', 'banana', 'mango']
```

Python provides several methods for adding and removing items:

```text
.append()
.insert()
.remove()
.pop()
```

---

# 4. `.append()`

`.append()` adds an item to the **end of a list**.

### Syntax

```python
list.append(item)
```

Example:

```python
fruits = ["apple", "banana"]

fruits.append("mango")

print(fruits)
```

Output:

```text
['apple', 'banana', 'mango']
```

Another example:

```python
numbers = [1, 2, 3]

numbers.append(4)

print(numbers)
```

Output:

```text
[1, 2, 3, 4]
```

You can append different types:

```python
items = []

items.append("Python")
items.append(10)
items.append(True)

print(items)
```

Output:

```text
['Python', 10, True]
```

---

# 5. `.insert()`

`.insert()` adds an item at a **specific position**.

### Syntax

```python
list.insert(index, item)
```

Example:

```python
fruits = ["apple", "mango"]

fruits.insert(1, "banana")

print(fruits)
```

Output:

```text
['apple', 'banana', 'mango']
```

Here:

```text
index = 1
item  = "banana"
```

Another example:

```python
numbers = [10, 30, 40]

numbers.insert(1, 20)

print(numbers)
```

Output:

```text
[10, 20, 30, 40]
```

### `append()` vs `insert()`

`append()`:

```python
fruits.append("orange")
```

Adds to the end.

`insert()`:

```python
fruits.insert(1, "orange")
```

Adds at a specific index.

---

# 6. `.remove()`

`.remove()` removes an item by its **value**.

### Syntax

```python
list.remove(value)
```

Example:

```python
fruits = ["apple", "banana", "mango"]

fruits.remove("banana")

print(fruits)
```

Output:

```text
['apple', 'mango']
```

It removes the first matching value.

Example:

```python
numbers = [10, 20, 30, 20]

numbers.remove(20)

print(numbers)
```

Output:

```text
[10, 30, 20]
```

Only the first `20` is removed.

If the value doesn't exist, `.remove()` causes an error.

```python
fruits = ["apple", "banana"]

fruits.remove("mango")
```

This gives:

```text
ValueError
```

---

# 7. `.pop()`

`.pop()` removes an item using its **index** and returns the removed item.

### Remove the last item

```python
fruits = ["apple", "banana", "mango"]

item = fruits.pop()

print(item)
print(fruits)
```

Output:

```text
mango
['apple', 'banana']
```

### Remove a specific index

```python
fruits = ["apple", "banana", "mango"]

item = fruits.pop(1)

print(item)
print(fruits)
```

Output:

```text
banana
['apple', 'mango']
```

Here, index `1` is removed.

### `.remove()` vs `.pop()`

```python
fruits.remove("banana")
```

Removes using the **value**.

```python
fruits.pop(1)
```

Removes using the **index**.

A useful way to remember:

```text
remove → "Remove this value"
pop    → "Remove this position"
```

---

# 8. `.sort()`

`.sort()` sorts the list.

### Numbers

```python
numbers = [50, 10, 40, 20, 30]

numbers.sort()

print(numbers)
```

Output:

```text
[10, 20, 30, 40, 50]
```

By default, it sorts in ascending order.

### Strings

```python
names = ["Rahul", "Amit", "Mahesh", "Akash"]

names.sort()

print(names)
```

Output:

```text
['Akash', 'Amit', 'Mahesh', 'Rahul']
```

### Descending order

Use:

```python
numbers = [10, 50, 20, 40, 30]

numbers.sort(reverse=True)

print(numbers)
```

Output:

```text
[50, 40, 30, 20, 10]
```

Important: `.sort()` changes the original list.

---

# 9. `.reverse()`

`.reverse()` reverses the current order of the list.

```python
numbers = [1, 2, 3, 4, 5]

numbers.reverse()

print(numbers)
```

Output:

```text
[5, 4, 3, 2, 1]
```

It does **not sort** the list.

For example:

```python
numbers = [3, 1, 5, 2, 4]

numbers.reverse()

print(numbers)
```

Output:

```text
[4, 2, 5, 1, 3]
```

It simply reverses the existing order.

### `.sort(reverse=True)` vs `.reverse()`

```python
numbers = [3, 1, 5, 2, 4]

numbers.sort(reverse=True)
```

Result:

```text
[5, 4, 3, 2, 1]
```

But:

```python
numbers = [3, 1, 5, 2, 4]

numbers.reverse()
```

Result:

```text
[4, 2, 5, 1, 3]
```

---

# 10. List Looping

A `for` loop can be used to access every item in a list.

### Basic example

```python
fruits = ["apple", "banana", "mango"]

for fruit in fruits:
    print(fruit)
```

Output:

```text
apple
banana
mango
```

The loop takes one item at a time.

```text
apple
  ↓
print

banana
  ↓
print

mango
  ↓
print
```

---

## Loop through numbers

```python
numbers = [10, 20, 30, 40]

for number in numbers:
    print(number)
```

Output:

```text
10
20
30
40
```

---

## Loop with an index

You can use `range()` and `len()` to access indexes.

```python
fruits = ["apple", "banana", "mango"]

for i in range(len(fruits)):
    print(fruits[i])
```

Output:

```text
apple
banana
mango
```

Here:

```python
len(fruits)
```

gives the number of items.

For this list:

```python
["apple", "banana", "mango"]
```

the length is `3`.

So:

```python
range(3)
```

produces:

```text
0
1
2
```

---

## Loop with index and value

A simple way to get both the index and value is:

```python
fruits = ["apple", "banana", "mango"]

for index, fruit in enumerate(fruits):
    print(index, fruit)
```

Output:

```text
0 apple
1 banana
2 mango
```

---

# Changing List Items

Because lists are mutable, you can change an item using its index.

```python
fruits = ["apple", "banana", "mango"]

fruits[1] = "orange"

print(fruits)
```

Output:

```text
['apple', 'orange', 'mango']
```

The item at index `1` changed from `"banana"` to `"orange"`.

---

# Common List Operations Together

```python
fruits = ["apple", "banana", "mango"]

# Add
fruits.append("orange")

# Insert
fruits.insert(1, "grapes")

# Remove by value
fruits.remove("banana")

# Remove by index
fruits.pop(0)

print(fruits)
```

The list can be changed step by step using these methods.

---

# Quick Revision

| Operation       | Method       | What it does                     |
| --------------- | ------------ | -------------------------------- |
| Add at end      | `.append()`  | Adds one item to the end         |
| Add at position | `.insert()`  | Adds an item at an index         |
| Remove by value | `.remove()`  | Removes the first matching value |
| Remove by index | `.pop()`     | Removes and returns an item      |
| Sort            | `.sort()`    | Sorts the list                   |
| Reverse         | `.reverse()` | Reverses the current order       |

### Core patterns

Creating:

```python
fruits = ["apple", "banana", "mango"]
```

Indexing:

```python
fruits[0]
```

Slicing:

```python
fruits[1:3]
```

Adding:

```python
fruits.append("orange")
```

Inserting:

```python
fruits.insert(1, "orange")
```

Removing:

```python
fruits.remove("apple")
```

Popping:

```python
fruits.pop()
```

Sorting:

```python
fruits.sort()
```

Reversing:

```python
fruits.reverse()
```

Looping:

```python
for fruit in fruits:
    print(fruit)
```
