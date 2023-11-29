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


my_car = Car("Toyota", "Camry")
print(my_car.brand)  # Output: Toyota
my_car.display_info()  # Output: Toyota Camry
