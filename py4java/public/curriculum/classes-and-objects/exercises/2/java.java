class Student {

  String name;
  int age;
  String grade;
  String gradeCategory;

  public Student(String name, int age, String grade) {
    this.name = name;
    this.age = age;
    this.grade = grade;
  }

  void displayInfo() {
    System.out.println("Name: " + name);
    System.out.println("Age: " + age);
    System.out.println("Grade: " + grade);
  }
}

public class Main {

  public static void main(String[] args) {
    // Create an instance of the Student class
    Student student1 = new Student("Bob", 16, "10th");

    // Call the displayInfo method
    student1.displayInfo();

    // Initialize 'gradeCategory' property
    student1.gradeCategory = "High Achiever";

    // Print the updated details
    System.out.println("\nUpdated Details:");
    System.out.println("Name: " + student1.name);
    System.out.println("Age: " + student1.age);
    System.out.println("Grade: " + student1.grade);
    System.out.println("Grade Category: " + student1.gradeCategory);

    // Set the 'gradeCategory' property to null
    // Deleting properties is not possible in Java
    student1.gradeCategory = null;

    System.out.println("Grade Category: " + student1.gradeCategory); // prints null
  }
}
