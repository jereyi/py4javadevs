class Student:
    def __init__(self, name, age, grade):
        self.name = name
        self.age = age
        self.grade = grade

    def display_info(self):
        print("Name:", self.name)
        print("Age:", self.age)
        print("Grade:", self.grade)


# Create an instance of the Student class
student1 = Student("Bob", 16, "10th")

# Call the display_info method
student1.display_info()

# Add a new property, 'grade_category', to the student
student1.grade_category = "High Achiever"

# Print the updated details
print("\nUpdated Details:")
print("Name:", student1.name)
print("Age:", student1.age)
print("Grade:", student1.grade)
print("Grade Category:", student1.grade_category)

# Delete the 'grade_category' property
del student1.grade_category

print("Grade Category:", student1.grade_category)  # throws error
