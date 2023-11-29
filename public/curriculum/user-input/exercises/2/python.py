correct_password = "secret"
password = input("Enter the password: ")

if password == correct_password:
    print("Access granted!")
else:
    print("Access denied. Incorrect password.")