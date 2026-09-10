# Loops

> Loops let you **repeat code**. Along with conditions, this is the heart of programming — almost every real program is just "loop over data and decide things". Master this one.

---

## 1. The for Loop — looping over a sequence

A `for` loop visits **each item** of a sequence (string, list, range, etc.), one by one.

```python
for fruit in ["apple", "mango", "banana"]:
    print(fruit)
# apple
# mango
# banana
```

How it works: the variable `fruit` takes the 1st item, the block runs; then the 2nd item, and so on until the sequence ends.

Looping over a string (a sequence of characters):

```python
for ch in "Python":
    print(ch)      # P, y, t, h, o, n — one per line
```

---

## 2. range() — looping a fixed number of times

`range()` generates numbers on demand.

```python
range(stop)          # 0 to stop-1
range(start, stop)   # start to stop-1
range(start, stop, step)
```

```python
for i in range(5):          # 0 1 2 3 4
    print(i)

for i in range(1, 6):       # 1 2 3 4 5
    print(i)

for i in range(0, 10, 2):   # 0 2 4 6 8
    print(i)

for i in range(5, 0, -1):   # 5 4 3 2 1  (countdown)
    print(i)
```

⚠️ The `stop` value is **never included** — `range(5)` gives 0–4.

Classic pattern — print a multiplication table:

```python
n = 7
for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")
```

---

## 3. The while Loop — repeat while a condition is True

Use `while` when you **don't know in advance** how many repetitions you need.

```python
count = 1
while count <= 5:
    print("Count:", count)
    count += 1          # ⚠️ must change the condition, or it loops forever
```

**Infinite loop danger:** if the condition never becomes False, the loop never stops.

```python
# ❌ Infinite loop — count never changes
count = 1
while count <= 5:
    print(count)
```

A realistic use — keep asking until valid input:

```python
password = ""
while password != "secret123":
    password = input("Enter password: ")
print("Access granted!")
```

**for vs while — simple rule:**
- Known collection / fixed count → `for`
- "Repeat until something happens" → `while`

---

## 4. break — exit the loop immediately

Sometimes you find what you're looking for halfway through — no point continuing. `break` kills the loop on the spot and execution continues with the code *after* the loop.

```python
for num in [2, 4, 6, 7, 8, 10]:
    if num % 2 != 0:
        print("First odd number found:", num)
        break               # stop the entire loop right here
print("Loop ended")
```

Common with `while True` — an intentional "forever" loop that exits via `break`:

```python
while True:
    cmd = input("Enter command (or 'quit'): ")
    if cmd == "quit":
        break
    print("You typed:", cmd)
```

---

## 5. continue — skip to the next iteration

Skips only the **current** round; the loop keeps going.

```python
for i in range(1, 6):
    if i == 3:
        continue            # skips printing 3
    print(i)
# 2 4 5
```

Example — process only even numbers:

```python
nums = [1, 2, 3, 4, 5, 6]
for n in nums:
    if n % 2 != 0:
        continue
    print(n, "is even")
```

---

## 6. pass — the empty placeholder

`pass` does nothing. It exists because Python requires an indented block after `:`.

```python
for i in range(10):
    pass                    # TODO: write logic later

if age >= 18:
    pass                    # placeholder for future code
```

You'll mostly use it as a "fill this in later" marker.

---

## 7. Nested Loops — loops inside loops

The inner loop runs **completely** for every single round of the outer loop. Think of a clock: the minute hand (inner) goes a full circle for each step of the hour hand (outer).

```python
for row in range(1, 4):
    for col in range(1, 4):
        print(f"({row},{col})", end=" ")
    print()     # newline after each row
```
```
(1,1) (1,2) (1,3)
(2,1) (2,2) (2,3)
(3,1) (3,2) (3,3)
```

Classic example — pattern printing:

```python
for i in range(1, 6):
    print("*" * i)
# *
# **
# ***
# ****
# *****
```

⚠️ `break`/`continue` only affect the **innermost** loop they're in.

---

## 8. Looping with an Index: enumerate()

When you need both the index and the item:

```python
fruits = ["apple", "mango", "banana"]
for i, fruit in enumerate(fruits):
    print(i, fruit)
# apple
# mango
# banana
```

---

## Quick Revision

- `for item in sequence:` visits each item; `for i in range(n):` counts.
- `range(start, stop, step)` — stop is excluded.
- `while condition:` repeats until the condition is False; always make progress or you'll loop forever.
- `break` exits the loop; `continue` skips one round; `pass` is a placeholder.
- Nested loops: outer loop per "row", inner loop per "column".
- `enumerate()` gives you index + item together.

### Practice
1. Print the sum of numbers 1 to 100 using a loop.
2. Count how many numbers in `[3, 8, 12, 7, 10, 15]` are divisible by 3.
3. Take a number as input and check if it's prime using a loop.
4. Print a right-angle triangle of `*` with 5 rows (nested loop).

✅ Next → **08-strings.md**
