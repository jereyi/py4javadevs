class InvalidUsernameError(Exception):
    pass


try:
    username = input("Enter your username: ")
    if not username:
        raise InvalidUsernameError("Username cannot be empty.")
    print("Login successful for user:", username)
except InvalidUsernameError as e:
    print("Error:", str(e))
except Exception as e:
    print("An unexpected error occurred:", str(e))
