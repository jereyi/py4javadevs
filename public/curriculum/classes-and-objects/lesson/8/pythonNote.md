You can add the `init__()` function to the subclass constructor to  overrides the inheritance of the super's `__init__()` function.

The `super` function can then be used to make the child class inherit all the methods and properties from its parent, just like in java. 

```
# Equivalent
class Dog(Animal):
    def __init__(self, name):
        super().__init__(name)
```