# Conditions

> Conditions let your program **make decisions**: run different code depending on whether something is True or False. This is core logic — learn it thoroughly.

---

## 1. if

The simplest decision. Syntax pattern: `if` + condition + `:` then an **indented block**.

```python
age = 20

if age >= 18:
    print("You can vote")     # runs because condition is True

print("This always runs")     # not indented → outside the if
```

If the condition is `False`, the indented block is skipped entirely.

---

## 2. else — the "otherwise" branch

When there are exactly two paths — "do this, otherwise do that" — add an `else`. It needs no condition of its own; it catches everything the `if` didn't match.

```python
marks = 45

if marks >= 50:
    print("Pass")
else:
    print("Fail")
```

Exactly one of the two blocks runs.

---

## 3. elif — checking several conditions

`elif` = "else if". Use it for 3+ possibilities. Python checks top to bottom and runs the **first** True branch, then exits the whole chain.

```python
score = 78

if score >= 90:
    grade = "A"
elif score >= 75:
    grade = "B"
elif score >= 50:
    grade = "C"
else:
    grade = "F"

print(grade)      # B
```

**Order matters.** Conditions are checked in sequence — put the strictest/most specific first.

```python
# ❌ Bad order — this prints "Good" for a perfect 100 too
if score >= 50:
    print("Good")
elif score >= 90:      # never reached!
    print("Excellent")
```

---

## 4. Nested Conditions

You can put an `if` inside another `if`. It works, but deep nesting gets hard to read fast.

```python
age = 20
has_license = True

if age >= 18:
    if has_license:
        print("You can drive")
    else:
        print("Get a license first")
else:
    print("Too young to drive")
```

**Cleaner version** using `and` — prefer this when possible:

```python
if age >= 18 and has_license:
    print("You can drive")
```

---

## 5. Multiple Conditions

Combine as many conditions as you need with `and` / `or` / `not`:

```python
age = 25
income = 30000
credit_score = 720

if age >= 21 and income >= 25000 and credit_score >= 700:
    print("Loan approved")

is_weekend = True
is_holiday = False
if is_weekend or is_holiday:
    print("Day off!")

# De Morgan style: flip logic with not
if not (age >= 18):
    print("Minor")
```

Use parentheses to make complex conditions readable — they also control evaluation order.

---

## 6. Ternary Expressions (one-line if)

A compact way to **choose between two values**.

Syntax: `value_if_true if condition else value_if_false`

```python
age = 20
status = "adult" if age >= 18 else "minor"
print(status)     # adult
```

Equivalent normal form:

```python
if age >= 18:
    status = "adult"
else:
    status = "minor"
```

Great for quick assignments. **Don't chain many of them** — it becomes unreadable:

```python
# ❌ Avoid this kind of nesting
label = "A" if x > 90 else "B" if x > 75 else "C" if x > 50 else "F"
```

---

## 7. Truthiness in Conditions

Remember from data types: conditions don't need to be comparisons. Empty/zero values are `False`, everything else is `True`.

```python
name = ""

if name:                      # same as: if name != ""
    print(f"Hi, {name}")
else:
    print("Name is empty")

items = [1, 2, 3]
if items:                     # list is not empty → True
    print("Cart has items")
```

This idiom (`if my_list:` / `if not my_list:`) is very Pythonic.

---

## Quick Revision

- `if` / `elif` / `else` — condition + colon + indented block.
- In an `if/elif/else` chain, only the **first True** branch runs.
- Order `elif`s from most specific to least specific.
- Combine with `and`, `or`, `not`; prefer flat conditions over deep nesting.
- Ternary: `x if cond else y` — for simple value choices.
- `if some_list:` checks emptiness via truthiness.

### Practice
1. Program: input a number, print whether it's positive, negative, or zero.
2. Input year → print "Leap year" or not (divisible by 4, except centuries unless divisible by 400).
3. Input 3 numbers and print the largest using conditions.

✅ Next → **07-loops.md**
