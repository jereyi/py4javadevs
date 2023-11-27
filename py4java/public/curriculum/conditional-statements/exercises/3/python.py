num1 = 1.0
num2 = 0.5
num3 = 1.5

if num1 >= num2:
    if num1 >= num3:
        print(f"{num1} is the largest.")
    else:
        print(f"{num3} is the largest.")
else:
    if num2 >= num3:
        print(f"{num2} is the largest.")
    else:
        print(f"{num3} is the largest.")
