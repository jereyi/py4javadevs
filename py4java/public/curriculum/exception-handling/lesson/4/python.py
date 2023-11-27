def example_function():
    raise ValueError("This is a custom error message")

try:
    example_function()
except ValueError as e:
    print(f"Caught an exception: {e}")
