class MyClass:
    # Accessible from any other class
    def public_method(self):
        print("This is a public method")

    # Accessible with the same package and in subclasses
    def _protected_method(self):
        print("This is a protected method")

    # Only accessible within the same class.
    def __private_method(self):
        print("This is a private method")

# Usage
obj = MyClass()
obj.public_method()
obj._protected_method()
obj.__private_method()  # This will cause an AttributeError