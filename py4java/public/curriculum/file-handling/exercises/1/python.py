source_file_path = "source.txt"
destination_file_path = "destination.txt"

try:
    with open(source_file_path, "r") as source_file:
        content = source_file.read()
        with open(destination_file_path, "w") as destination_file:
            destination_file.write(content)
    print(
        f"Content copied from '{source_file_path}' to '{destination_file_path}' successfully."
    )
except FileNotFoundError:
    print(f"Error: Source file '{source_file_path}' not found.")
except Exception as e:
    print("An error occurred:", str(e))
