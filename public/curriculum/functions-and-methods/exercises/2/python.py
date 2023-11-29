def fahrenheit_to_celsius(fahrenheit):
    celsius = (fahrenheit - 32) * 5 / 9
    return celsius


temperature_celsius = fahrenheit_to_celsius(100)
print("Temperature in Celsius:", temperature_celsius)
