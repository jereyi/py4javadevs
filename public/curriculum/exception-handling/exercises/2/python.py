try:
    num = input("Enter a number: ")
    result = float(num) ** 2
    print("Square of", num, "is", result)
except TypeError:
    print("Error: Invalid input. Please enter a valid number.")
except ValueError:
    print("Error: Invalid input. Please enter a valid number.")
