# Object-Oriented Programming (OOP)

> OOP organizes code into **objects** — things that bundle *data* (attributes) and *behavior* (methods) together. A **class** is the blueprint; objects are the real things built from it. This is the last big topic of fundamentals — take your time with it.

---

## 1. Classes and Objects

- **Class** = the blueprint/template (e.g., "BankAccount").
- **Object** = an actual instance built from it (e.g., *your* account).

```python
class BankAccount:
    pass

acc1 = BankAccount()      # create an object (instantiate)
acc2 = BankAccount()      # a second, separate object
```

Each object is independent, like two houses built from the same plan.

---

## 2. `__init__` — the constructor

`__init__` runs **automatically when an object is created**. It's where you set the object's starting data.

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner        # instance variable
        self.balance = balance

acc = BankAccount("Ravi", 1000)
print(acc.owner)        # Ravi
print(acc.balance)      # 1000
```

### What is `self`?

`self` means **"this particular object"**. Python passes it automatically when you call a method on an object — you never pass it yourself.

```python
acc.balance      # inside the class, this was written as self.balance
```

---

## 3. Instance Variables and Methods

**Instance variables** = data each object has its own copy of.
**Methods** = functions defined inside the class; the object's behavior.

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0:
            print("Amount must be positive")
            return
        self.balance += amount
        print(f"Deposited ₹{amount}. Balance: ₹{self.balance}")

    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds!")
            return
        self.balance -= amount
        print(f"Withdrew ₹{amount}. Balance: ₹{self.balance}")

acc = BankAccount("Ravi", 1000)
acc.deposit(500)        # Deposited ₹500. Balance: ₹1500
acc.withdraw(200)       # Withdrew ₹200. Balance: ₹1300
acc.withdraw(99999)     # Insufficient funds!
```

**Class variables** (shared by all objects) — a quick note:

```python
class BankAccount:
    bank_name = "SBI"        # same for every account
```

---

## 4. Inheritance — reusing and extending classes

A **child class** inherits everything from a **parent class**, then adds/changes what it needs.

```python
class Animal:                       # parent
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name} is eating")

class Dog(Animal):                  # child inherits from Animal
    def bark(self):
        print(f"{self.name} says Woof!")

d = Dog("Bruno")
d.eat()         # inherited → Bruno is eating
d.bark()        # its own → Bruno says Woof!
```

### Overriding — replacing a parent's method

```python
class Cat(Animal):
    def eat(self):
        print(f"{self.name} nibbles delicately")     # replaces Animal.eat
```

### super() — use the parent from the child

```python
class SavingsAccount(BankAccount):
    def __init__(self, owner, balance, interest_rate):
        super().__init__(owner, balance)      # run parent's __init__
        self.interest_rate = interest_rate

    def add_interest(self):
        self.balance += self.balance * self.interest_rate / 100
```

`super()` avoids copy-pasting the parent's logic — you extend instead of repeat.

---

## 5. Encapsulation — hiding internal data

The idea: an object controls access to its own data; outsiders talk to it through methods instead of touching internals directly.

Python's convention levels:

```python
class Employee:
    def __init__(self, name, salary):
        self.name = name          # public — anyone can use
        self._id = 101            # "protected" — by convention, don't touch
        self.__salary = salary    # private — name-mangled, hard to touch

    def get_salary(self):         # controlled access
        return self.__salary

    def raise_salary(self, percent):
        if percent < 0:
            raise ValueError("Percent can't be negative")   # validation!
        self.__salary += self.__salary * percent / 100

emp = Employee("Ravi", 50000)
print(emp.get_salary())      # 50000
# emp.__salary               # ❌ AttributeError — protected from outside
```

The point isn't strictness — it's that **methods let you add rules/validation** (like the negative-percent check) that direct attribute access can't have.

---

## 6. Polymorphism — same interface, different behavior

Different classes can share method names; each does its own thing. Code that uses them doesn't care which class it got.

```python
class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

class Duck:
    def speak(self):
        return "Quack!"

animals = [Dog(), Cat(), Duck()]
for animal in animals:
    print(animal.speak())     # one interface, three behaviors
# Woof!
# Meow!
# Quack!
```

The loop never checks the type — it just trusts that each object has `speak()`. (This "trust the interface" style is called *duck typing*: if it quacks like a duck…)

You already use polymorphism: `len()` works on strings, lists, and dicts — same function, type-specific behavior.

---

## 7. Putting It All Together — a Mini Project

```python
class Item:
    def __init__(self, name, price):
        self.name = name
        self.price = price

class Cart:
    def __init__(self):
        self.items = []

    def add(self, item):
        self.items.append(item)

    def total(self):
        return sum(item.price for item in self.items)

    def receipt(self):
        for item in self.items:
            print(f"{item.name:<12} ₹{item.price}")
        print(f"{'TOTAL':<12} ₹{self.total()}")

cart = Cart()
cart.add(Item("Notebook", 49))
cart.add(Item("Pen", 15))
cart.receipt()
```

Notice how the program reads like real life: a cart *has* items, you *add* to it, it *totals* itself.

---

## Quick Revision

- **Class** = blueprint; **object** = instance created with `ClassName()`.
- `__init__` sets up the object; `self` refers to "this object".
- Instance variables (`self.x`) store per-object data; methods are its behavior.
- **Inheritance:** `class Child(Parent)` reuses code; `super()` calls the parent; overriding replaces methods.
- **Encapsulation:** keep data behind methods (`_x`, `__x`, getters/setters) so you can enforce rules.
- **Polymorphism:** same method name, different behavior per class — code stays generic.

### Practice
1. Build a `Student` class with name, marks list, and an `average()` method.
2. Create `Vehicle` → `Car` and `Bike` children, each overriding a `describe()` method; loop over a list of them.
3. Extend the BankAccount above: add a `MinimumBalanceAccount` that refuses withdrawals below a ₹500 minimum.

🎉 **Core roadmap complete!** But you're ready for more — files 19–22 take you into intermediate and real-world Python (iterators, decorators, regex, and live APIs).

✅ Next → **19-iterators-generators.md**
