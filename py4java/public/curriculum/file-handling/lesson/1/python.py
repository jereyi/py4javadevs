file_path = "example.txt"
with open(file_path, "r") as file:
    content = file.read()
    print(content)
# File is automatically closed after the 'with' block
