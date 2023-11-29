class MathOperations:
    def add(self, x, y):
        return x + y

    def add(self, x, y, z):
        return x + y + z


math_obj = MathOperations()
print(math_obj.add(2, 3))  # ERROR!
print(math_obj.add(2, 3, 4))  # Output: 9
