try:
    value = int("abc")
except ValueError:
    print("Error: Invalid conversion to integer!")
except Exception as e:
    print(f"Error: {e}")
