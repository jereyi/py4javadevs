file_path = "count_lines.txt"

try:
    with open(file_path, "r") as file:
        line_count = sum(1 for line in file)
    print(f"Number of lines in '{file_path}': {line_count}")
except FileNotFoundError:
    print(f"Error: File '{file_path}' not found.")
except Exception as e:
    print("An error occurred:", str(e))
