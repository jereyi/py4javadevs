numbers = input("Enter a list of numbers separated by spaces: ").split()
numbers = [float(num) for num in numbers]
sum_result = sum(numbers)
print("Sum:", sum_result)
