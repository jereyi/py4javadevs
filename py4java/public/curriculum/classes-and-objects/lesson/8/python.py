# Super Class
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        pass


# Sub Class
class Dog(Animal):
    def speak(self):
        return "Woof!"


# Sub Class
class Cat(Animal):
    def speak(self):
        return "Meow!"


dog = Dog("Buddy")
cat = Cat("Whiskers")

print(dog.name)  # Output: Buddy
print(dog.speak())  # Output: Woof!

print(cat.name)  # Output: Whiskers
print(cat.speak())  # Output: Meow!
