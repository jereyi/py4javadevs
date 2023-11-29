class Car:
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year

    def start_engine(self):
        print("Engine started! Vroom, vroom!")

# Create an instance of the Car class
car1 = Car("Toyota", "Camry", 2022)

# Call the start_engine method
car1.start_engine()

# Add a new property, 'mileage', to the car
car1.mileage = 50000

# Print the updated details
print("Make:", car1.make)
print("Model:", car1.model)
print("Year:", car1.year)
print("Mileage:", car1.mileage)