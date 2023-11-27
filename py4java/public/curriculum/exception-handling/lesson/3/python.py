try:
    result = 10 / 2
except ZeroDivisionError:
    print("Error: Division by zero!")
finally:
    print("Finally block executed.")
