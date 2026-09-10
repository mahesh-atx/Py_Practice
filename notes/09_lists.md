# Lists

> A list is an **ordered, changeable collection** of items. It is the most-used data structure in Python — you'll use lists constantly. Learn every method here properly.

---

## 1. Creating Lists

A list is written as items inside **square brackets**, separated by commas. It can hold anything — strings, numbers, even other lists.

```python
fruits = ["apple", "mango", "banana"]
numbers = [10, 20, 30, 40]
mixed = [1, "two", 3.0, True]      # can mix types (rare in practice)
empty = []

print(len(fruits))      # 3
```

Lists keep **insertion order**, allow **duplicates**, and are **mutable** (changeable).

---

## 2. Indexing and Slicing

Exactly like strings — indexing from 0, negative from the end, slicing with `[start:stop]`.

```python
nums = [10, 20, 30, 40, 50]

print(nums[0])        # 10
print(nums[-1])       # 50
print(nums[1:4])      # [20, 30, 40]
print(nums[::2])      # [10, 30, 50]
print(nums[::-1])     # reversed list

# Unlike strings, lists CAN be changed:
nums[0] = 99          # ✅ works — lists are mutable
print(nums)           # [99, 20, 30, 40, 50]
```

Check membership:

```python
if 30 in nums:
    print("found")
```

---

## 3. Adding Items

### .append() — add to the end

The most-used list method. It takes exactly one item and sticks it at the end.

```python
tasks = ["eat", "study"]
tasks.append("sleep")
print(tasks)      # ['eat', 'study', 'sleep']
```

### .insert() — add at a specific position

Needs two arguments: *where* (index) and *what*. Everything from that position onwards shifts one place right.

```python
tasks.insert(1, "code")       # insert BEFORE index 1
print(tasks)      # ['eat', 'code', 'study', 'sleep']
```

### .extend() — merge another list in

Unlike `append()`, this adds each item of another list individually (instead of nesting the list inside).

```python
nums = [1, 2]
nums.extend([3, 4, 5])
print(nums)       # [1, 2, 3, 4, 5]
```

---

## 4. Removing Items

### .remove() — remove by VALUE (first match)

You tell it *what* to remove, not where it is. If the value appears multiple times, only the first one goes.

```python
fruits = ["apple", "mango", "banana"]
fruits.remove("mango")
print(fruits)     # ['apple', 'banana']

fruits.remove("grapes")   # ❌ ValueError if not present
```

### .pop() — remove by INDEX (and get it back)

The opposite of `insert()`: you give a position, it removes that item **and returns it**, so you can use it. With no argument it pops the last item — perfect for stacks.

```python
nums = [10, 20, 30]
removed = nums.pop()        # no index → removes LAST item
print(removed)              # 30
print(nums)                 # [10, 20]

nums.pop(0)                 # remove at index 0 → [20]
```

### del and .clear()

`del` deletes an item at a position without returning it; `.clear()` wipes the entire list empty.

```python
nums = [1, 2, 3, 4]
del nums[0]         # delete item at index 0 → [2, 3, 4]

nums.clear()        # empty the whole list → []
```

**Which to use?** Know the value → `remove()`. Know the index / need the item back → `pop()`.

---

## 5. Sorting and Reversing

### .sort() — sorts the list IN PLACE

"IN PLACE" means the original list itself gets rearranged — nothing is returned. Smallest first by default.

```python
marks = [70, 45, 90, 60]
marks.sort()
print(marks)            # [45, 60, 70, 90]

marks.sort(reverse=True)
print(marks)            # [90, 70, 60, 45]
```

### sorted() — returns a NEW sorted list (original untouched)

A function (not a method) — hand it any list and it gives back a sorted copy, leaving yours alone. Use this when you still need the original order later.

```python
marks = [70, 45, 90]
new_list = sorted(marks)
print(new_list)     # [45, 70, 90]
print(marks)        # [70, 45, 90] — unchanged
```

### .reverse() — flips the order in place

Mirrors the list (last item becomes first, and so on). This is about *position*, not value — it does not sort.

```python
nums = [1, 2, 3]
nums.reverse()
print(nums)     # [3, 2, 1]
```

> Sorting strings: alphabetical, uppercase before lowercase (`"Apple" < "banana"`).

---

## 6. Looping Through Lists

This is where lists really shine — a `for` loop plus a list is the combination you'll write a hundred times a week. Below: plain looping, looping with an index, the running-total pattern, and built-in shortcuts.

```python
fruits = ["apple", "mango", "banana"]

for fruit in fruits:
    print(f"I like {fruit}")

# with index:
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# total / count pattern:
prices = [100, 250, 50]
total = 0
for p in prices:
    total += p
print("Total:", total)      # 400

# shortcut functions:
print(sum(prices))          # 400
print(max(prices))          # 250
print(min(prices))          # 50
```

**Building a new list from a loop** (pattern you'll use forever):

```python
nums = [1, 2, 3, 4, 5]
evens = []
for n in nums:
    if n % 2 == 0:
        evens.append(n)
print(evens)    # [2, 4]
```

(This can be shortened with list comprehensions — see **14-comprehensions.md**.)

---

## 7. ⚠️ One Classic Trap: Copying Lists

`b = a` does **not** create a second list — it just gives the same list a second name. Both variables point to one list in memory, so a change through either name is visible through both:

```python
a = [1, 2, 3]
b = a               # b and a point to the SAME list!
b.append(4)
print(a)            # [1, 2, 3, 4] — a changed too!

# Correct way to copy:
b = a.copy()        # or b = a[:]
```

---

## Quick Revision

- Lists are ordered, mutable, allow duplicates: `["a", "b", "c"]`.
- Index/slice like strings; items can be reassigned.
- Add: `append()` (end), `insert(i, x)` (position), `extend()` (merge).
- Remove: `remove(value)`, `pop(index)`, `del`, `clear()`.
- `sort()` / `reverse()` change the list; `sorted()` returns a new one.
- Loop with `for x in list`, use `enumerate()` when you need indices.
- `b = a` does **not** copy — use `a.copy()`.

### Practice
1. Store 5 marks as input, then print total, average, and the sorted list.
2. Remove all duplicates from `[1, 2, 2, 3, 3, 3]` using a loop + new list.
3. Build a list of all even numbers from 1–50 with a loop.

✅ Next → **10-tuples.md**
