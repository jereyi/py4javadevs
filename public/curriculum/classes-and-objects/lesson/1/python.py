class Car:
    # Constructor
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

    # Instance method
    def display_info(self):
        print(f"{self.brand} {self.model}")

    # Static method
    def print_class_name():
        print("car")
