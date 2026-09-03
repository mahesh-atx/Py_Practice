# Python Object-Oriented Programming — Notes

**Object-Oriented Programming (OOP)** organises code around **objects** that combine data and the behaviour that operates on it.

> **Why this matters** — Procedural code (functions plus separate data) works until a program grows. OOP lets you bundle a thing's data and its behaviour in one place, model real-world entities directly, and reuse code through inheritance. It is how larger Python programs are structured.

### The mental model

```text
Class   →  a blueprint        (like an architect's drawing)
Object  →  a built instance   (the actual house)
```

```text
Class: Car
 ├── Data:    brand, colour, speed
 └── Behaviour: accelerate(), brake(), describe()

Objects:  car1 = Car("Toyota", "red")
          car2 = Car("Honda", "blue")
```

One class, many objects — each with its own data, sharing the same behaviour.

---

## 1. Classes

A **class** is a blueprint for creating objects.

### Defining a class

```python
class Car:
    pass
```

By convention class names use `PascalCase`.

### A class with data and behaviour

```python
class Car:
    def describe(self):
        print("I am a car")
```

### Why classes?

Without classes, related data floats around separately:

```python
# Procedural — data and behaviour are separate
car1_brand = "Toyota"
car1_colour = "red"

def describe_car(brand, colour):
    print(f"{brand} in {colour}")

describe_car(car1_brand, car1_colour)
```

With classes they travel together:

```python
class Car:
    def __init__(self, brand, colour):
        self.brand = brand
        self.colour = colour

    def describe(self):
        print(f"{self.brand} in {self.colour}")


car1 = Car("Toyota", "red")
car1.describe()
```

Output:

```text
Toyota in red
```

---

## 2. Objects

An **object** (instance) is a concrete thing built from a class.

### Creating an object

```python
class Car:
    pass


car1 = Car()
car2 = Car()

print(car1)
print(type(car1))
```

Output:

```text
<__main__.Car object at 0x7f8b1c0>
<class '__main__.Car'>
```

> **Note** — `<Car object at 0x...>` is not helpful. See `__str__` below for how to fix that.

### Objects have their own data

```python
class Car:
    def __init__(self, brand):
        self.brand = brand


car1 = Car("Toyota")
car2 = Car("Honda")

print(car1.brand)      # Toyota
print(car2.brand)      # Honda
```

Each object holds its own values. Changing one does not affect the other.

### Many objects from one class

```python
cars = [
    Car("Toyota"),
    Car("Honda"),
    Car("Tata")
]

for car in cars:
    print(car.brand)
```

Output:

```text
Toyota
Honda
Tata
```

### Class vs object

| | Class | Object |
| - | ----- | ------ |
| What | Blueprint | Instance built from it |
| Defined with | `class` | `ClassName()` |
| Data | Shared definitions | Own values |
| Count | One per definition | Many |

```text
class Car:            ← the blueprint (one)
car1 = Car("Toyota")  ← an object
car2 = Car("Honda")   ← another object
```

---

## 3. `__init__`

`__init__` is the **constructor** — it runs automatically when an object is created.

```python
class Car:
    def __init__(self, brand, colour):
        self.brand = brand
        self.colour = colour


car = Car("Toyota", "red")

print(car.brand)
print(car.colour)
```

Output:

```text
Toyota
red
```

### Why `self`?

`self` refers to **the object being created**. When you write:

```python
car = Car("Toyota", "red")
```

Python actually calls `Car(car, "Toyota", "red")` — the new object is passed in as the first argument, named `self` by convention.

```text
Car("Toyota", "red")
   →  Car.__init__(self, "Toyota", "red")
          ↑
     the new object
```

Every method must list `self` as its first parameter. It is passed automatically when you call a method.

```python
class Car:
    def __init__(self, brand):
        self.brand = brand

    def show(self):          # self is required
        print(self.brand)


car = Car("Toyota")
car.show()                   # self is passed automatically
```

### Default values in `__init__`

```python
class Car:
    def __init__(self, brand, colour="white"):
        self.brand = brand
        self.colour = colour


car1 = Car("Toyota")
car2 = Car("Honda", "blue")

print(car1.colour)      # white
print(car2.colour)      # blue
```

### `__init__` is not required

```python
class Car:
    pass

car = Car()        # fine — a bare object
```

---

## 4. Instance Variables

An **instance variable** belongs to a specific object.

```python
class Student:
    def __init__(self, name, age):
        self.name = name        # instance variable
        self.age = age          # instance variable


s1 = Student("Mahesh", 24)
s2 = Student("Nina", 21)

print(s1.name)      # Mahesh
print(s2.name)      # Nina
```

### Each object has its own copy

```python
s1.age = 25

print(s1.age)       # 25
print(s2.age)       # 21  ← unaffected
```

### Instance vs class variables

```python
class Student:
    school = "PyPractice"          # CLASS variable — shared by all

    def __init__(self, name):
        self.name = name           # INSTANCE variable — per object


s1 = Student("Mahesh")
s2 = Student("Nina")

print(s1.school, s2.school)        # PyPractice PyPractice
print(s1.name, s2.name)            # Mahesh Nina

Student.school = "New School"      # changes for everyone
print(s1.school, s2.school)        # New School New School
```

| | Instance variable | Class variable |
| - | ----------------- | -------------- |
| Defined | Inside `__init__` | At class level |
| Belongs to | One object | The class (shared) |
| Access | `obj.name` | `obj.name` or `Class.name` |

> **Careful** — Assigning `s1.school = "X"` creates an *instance* variable that shadows the class variable for that object only. To change it for everyone, assign `Student.school = "X"`.

### Adding variables later

Python lets you add attributes after creation, but it is poor practice:

```python
car = Car("Toyota")
car.year = 2024        # works, but avoid
```

Define everything in `__init__` so all objects have a consistent shape.

---

## 5. Methods

A **method** is a function defined inside a class.

```python
class Car:
    def __init__(self, brand):
        self.brand = brand

    def describe(self):
        print(f"This is a {self.brand}")


car = Car("Toyota")
car.describe()
```

Output:

```text
This is a Toyota
```

### Methods can take arguments

```python
class Calculator:
    def add(self, a, b):
        return a + b

    def multiply(self, a, b):
        return a * b


calc = Calculator()
print(calc.add(10, 5))
print(calc.multiply(10, 5))
```

Output:

```text
15
50
```

### Methods read and modify state

```python
class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1

    def reset(self):
        self.count = 0

    def get(self):
        return self.count


c = Counter()
c.increment()
c.increment()
print(c.get())      # 2
c.reset()
print(c.get())      # 0
```

### `__str__` — a readable representation

```python
class Car:
    def __init__(self, brand, colour):
        self.brand = brand
        self.colour = colour

    def __str__(self):
        return f"{self.colour} {self.brand}"


car = Car("Toyota", "red")
print(car)
```

Output:

```text
red Toyota
```

Without `__str__`, `print(car)` shows `<__main__.Car object at 0x...>`.

> **Note** — `__repr__` is the developer-facing counterpart, meant to be unambiguous. If you only define one, define `__str__`. If you define `__repr__` too, `print()` still prefers `__str__`.

### A realistic class

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self.balance += amount
        return self.balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount
        return self.balance

    def __str__(self):
        return f"{self.owner}'s account: Rs. {self.balance}"


account = BankAccount("Mahesh", 1000)
account.deposit(500)
account.withdraw(200)

print(account)
```

Output:

```text
Mahesh's account: Rs. 1300
```

Notice how the data (`balance`) and the rules about it (`cannot withdraw more than you have`) live together — that is the core benefit of OOP.

---

## 6. Inheritance

**Inheritance** lets a new class reuse and extend an existing one.

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "Some sound"


class Dog(Animal):          # Dog inherits from Animal
    def speak(self):
        return "Woof"


class Cat(Animal):
    def speak(self):
        return "Meow"


dog = Dog("Rocky")
cat = Cat("Kitty")

print(dog.name, dog.speak())
print(cat.name, cat.speak())
```

Output:

```text
Rocky Woof
Kitty Meow
```

### Terminology

```python
class Animal:        # parent / base / superclass
    ...

class Dog(Animal):   # child / derived / subclass
    ...
```

The child gets everything the parent has, plus whatever it adds or overrides.

### Inherited attributes and methods

```python
dog = Dog("Rocky")
print(dog.name)          # from Animal's __init__
print(dog.speak())       # Dog's own override
```

### `super()` — calling the parent

```python
class Animal:
    def __init__(self, name):
        self.name = name


class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)       # let Animal handle name
        self.breed = breed           # Dog adds its own


dog = Dog("Rocky", "Labrador")
print(dog.name, dog.breed)
```

Output:

```text
Rocky Labrador
```

`super()` refers to the parent class. Using it avoids duplicating the parent's setup code.

### Extending a parent method

```python
class Animal:
    def speak(self):
        return "Some sound"


class Dog(Animal):
    def speak(self):
        parent = super().speak()
        return f"Woof (animal says: {parent})"


print(Dog().speak())
```

Output:

```text
Woof (animal says: Some sound)
```

### Multi-level inheritance

```python
class Animal:
    def speak(self):
        return "Some sound"

class Dog(Animal):
    def speak(self):
        return "Woof"

class Puppy(Dog):
    def speak(self):
        return "Small woof"


print(Puppy().speak())      # Small woof
```

### `isinstance()` and `issubclass()`

```python
dog = Dog("Rocky")

print(isinstance(dog, Dog))        # True
print(isinstance(dog, Animal))     # True  — a Dog IS an Animal
print(issubclass(Dog, Animal))     # True
```

### When to use inheritance

Use it when there is a genuine **"is-a"** relationship:

```text
Dog is an Animal        ✓ inheritance
Car has an Engine       ✗ composition (see below)
```

> **Careful** — Deep inheritance hierarchies become hard to follow. Two or three levels is usually the practical limit.

---

## 7. Encapsulation

**Encapsulation** means keeping an object's internal data protected and accessed through controlled methods.

### Python's convention

Python has no `private` keyword. The convention is a leading underscore:

```python
class BankAccount:
    def __init__(self, balance):
        self._balance = balance        # "internal" — please do not touch
```

A single underscore is a **signal**, not enforcement.

### Name mangling with double underscore

```python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance       # name-mangled to _BankAccount__balance

    def get_balance(self):
        return self.__balance


account = BankAccount(1000)
print(account.get_balance())       # 1000
print(account.__balance)           # AttributeError
```

The attribute still exists as `account._BankAccount__balance`, so this is **obfuscation, not security**. It mainly prevents accidental collisions in subclasses.

### Controlled access with methods

```python
class BankAccount:
    def __init__(self, balance=0):
        self._balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount

    def withdraw(self, amount):
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount

    def get_balance(self):
        return self._balance


account = BankAccount(1000)
account.deposit(500)
print(account.get_balance())      # 1500
account.withdraw(2000)            # raises ValueError
```

The validation rules cannot be bypassed, because the only way to change `_balance` is through methods that enforce them.

### Properties — the Pythonic way

`@property` lets you access a method like an attribute:

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

    @property
    def area(self):
        return 3.14159 * self._radius ** 2


c = Circle(5)
print(c.radius)        # 5   — reads like an attribute
print(c.area)          # 78.53975

c.radius = 10          # goes through the setter
# c.radius = -1        # ValueError
```

Properties give you the clean `obj.radius` syntax while keeping validation.

> **Why it matters** — You can start with a plain attribute and add a property later without changing any calling code. That is why Python prefers properties over get/set method pairs.

---

## 8. Polymorphism

**Polymorphism** means "many forms" — different classes can be used through the same interface.

### Same method, different behaviour

```python
class Dog:
    def speak(self):
        return "Woof"

class Cat:
    def speak(self):
        return "Meow"

class Cow:
    def speak(self):
        return "Moo"


for animal in [Dog(), Cat(), Cow()]:
    print(animal.speak())
```

Output:

```text
Woof
Meow
Moo
```

Each object responds to the same call in its own way. The loop does not need to know which type it has.

### Why this is powerful

```python
def make_it_speak(animal):
    print(animal.speak())


make_it_speak(Dog())      # Woof
make_it_speak(Cat())      # Meow
```

`make_it_speak` works with **any** object that has a `speak()` method — including classes written years later. This is called **duck typing**: "if it walks like a duck and quacks like a duck, it is a duck."

### Polymorphism through inheritance

```python
class Shape:
    def area(self):
        raise NotImplementedError("Subclasses must implement area()")

class Circle(Shape):
    def __init__(self, r):
        self.r = r

    def area(self):
        return 3.14159 * self.r ** 2

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h


shapes = [Circle(5), Rectangle(4, 6)]

total = sum(s.area() for s in shapes)
print(f"Total area: {total:.2f}")
```

Output:

```text
Total area: 102.54
```

### Operator overloading (dunder methods)

Special methods let your objects work with built-in operators:

```python
class Book:
    def __init__(self, title, pages):
        self.title = title
        self.pages = pages

    def __len__(self):
        return self.pages

    def __lt__(self, other):
        return self.pages < other.pages

    def __str__(self):
        return self.title


a = Book("Python", 300)
b = Book("Flask", 200)

print(len(a))        # 300
print(a > b)         # True  — uses __lt__
print(sorted([a, b]))# [Flask, Python]
```

| Method | Enables |
| ------ | ------- |
| `__str__` | `print(obj)` |
| `__repr__` | Developer representation |
| `__len__` | `len(obj)` |
| `__eq__` | `obj == other` |
| `__lt__` | `obj < other` (sorting) |
| `__add__` | `obj + other` |

---

## Composition — the Alternative to Inheritance

Composition builds classes by **containing** other objects.

```python
class Engine:
    def start(self):
        return "Engine started"

class Car:
    def __init__(self, brand):
        self.brand = brand
        self.engine = Engine()        # Car HAS an Engine

    def start(self):
        return f"{self.brand}: {self.engine.start()}"


car = Car("Toyota")
print(car.start())
```

Output:

```text
Toyota: Engine started
```

| | Inheritance | Composition |
| - | ----------- | ----------- |
| Relationship | "is-a" | "has-a" |
| Coupling | Tight | Loose |
| Flexibility | Fixed at definition | Changeable at runtime |

```text
Dog is an Animal   → inheritance
Car has an Engine  → composition
```

> **Guideline** — Prefer composition. It keeps classes independent and easier to change. Reach for inheritance only when the "is-a" relationship is genuinely true.

---

## Complete OOP Example

```python
class Employee:
    raise_percentage = 1.05          # class variable

    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def apply_raise(self):
        self.salary = int(self.salary * self.raise_percentage)

    def __str__(self):
        return f"{self.name} — Rs. {self.salary}"


class Developer(Employee):
    raise_percentage = 1.10          # overridden

    def __init__(self, name, salary, language):
        super().__init__(name, salary)
        self.language = language

    def __str__(self):
        return f"{self.name} ({self.language}) — Rs. {self.salary}"


class Manager(Employee):
    def __init__(self, name, salary, reports=None):
        super().__init__(name, salary)
        self.reports = reports if reports is not None else []

    def add_report(self, employee):
        if employee not in self.reports:
            self.reports.append(employee)

    def __str__(self):
        return f"{self.name} (Manager, {len(self.reports)} reports)"


dev = Developer("Mahesh", 50000, "Python")
mgr = Manager("Nina", 80000)

mgr.add_report(dev)

print(dev)
print(mgr)

dev.apply_raise()
print(dev)
```

Output:

```text
Mahesh (Python) — Rs. 50000
Nina (Manager, 1 reports)
Mahesh (Python) — Rs. 55000
```

This one example uses instance variables, class variables, `__init__`, methods, `super()`, inheritance, overriding, `__str__`, polymorphism, and composition.

---

## Common Mistakes to Avoid

| Mistake | Consequence | Fix |
| ------- | ----------- | --- |
| Forgetting `self` in a method | `TypeError` | `def method(self, ...)` |
| Forgetting `self.` when reading an attribute | `NameError` | `self.name` |
| Mutable class variable shared by all instances | Data leaks across objects | Put it in `__init__` |
| Not calling `super().__init__()` | Parent setup is skipped | Call `super().__init__(...)` |
| Deep inheritance hierarchies | Hard to follow | Prefer composition |
| Overriding without meaning to | Silent behaviour change | Check method names |
| Using inheritance for "has-a" | Wrong model | Use composition |

---

## Quick Revision

| Concept | Syntax | Purpose |
| ------- | ------ | ------- |
| Class | `class Car:` | Blueprint |
| Object | `Car()` | An instance |
| Constructor | `def __init__(self, ...)` | Initialise the object |
| `self` | First parameter | The current object |
| Instance variable | `self.name = x` | Per-object data |
| Class variable | `name = x` at class level | Shared data |
| Method | `def method(self):` | Behaviour |
| `__str__` | `def __str__(self):` | Readable `print()` |
| Property | `@property` | Validated attribute access |
| Inheritance | `class Dog(Animal):` | Reuse and extend |
| `super()` | `super().__init__()` | Call the parent |
| Overriding | Redefine a parent method | Change behaviour |
| Encapsulation | `_x` / `__x` | Signal / mangle |
| Polymorphism | Same method, different classes | Uniform interface |
| Composition | Store objects as attributes | "has-a" |
| `isinstance` | `isinstance(o, C)` | Type check |

### Core patterns

```python
class Car:
    def __init__(self, brand, colour="white"):
        self.brand = brand
        self.colour = colour

    def __str__(self):
        return f"{self.colour} {self.brand}"


class ElectricCar(Car):
    def __init__(self, brand, battery):
        super().__init__(brand)
        self.battery = battery

    def __str__(self):
        return f"{super().__str__()} ({self.battery}kWh)"
```

### The main idea

```text
OOP
 ├── Class   → blueprint
 ├── Object  → instance of a class
 ├── __init__ → constructor; self is the new object
 ├── Instance variables → per-object data
 ├── Class variables    → shared data
 ├── Methods            → behaviour
 ├── Inheritance        → "is-a"; reuse via super()
 ├── Encapsulation      → protect data; @property for validation
 ├── Polymorphism       → same interface, different behaviour
 └── Composition        → "has-a"; preferred over deep inheritance
```

---

## Self-Check

- [ ] What is the difference between a class and an object?
- [ ] Why must every method take `self` as its first parameter?
- [ ] What is the difference between an instance variable and a class variable?
- [ ] What does `super().__init__()` do, and why is it needed?
- [ ] Why is `print(obj)` unhelpful without `__str__`?
- [ ] What is the difference between inheritance and composition, and which is preferred?
- [ ] Why is a mutable class variable (like `items = []`) dangerous?
- [ ] What does polymorphism let you do that separate functions cannot?
- [ ] How does `@property` differ from a plain attribute?
- [ ] What does duck typing mean in Python?
