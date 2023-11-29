import java.util.Scanner;

public class DivideByZero {

  public static void main(String[] args) {
    try {
      Scanner scanner = new Scanner(System.in);
      System.out.print("Enter the first number: ");
      double num1 = scanner.nextDouble();
      System.out.print("Enter the second number: ");
      double num2 = scanner.nextDouble();
      double result = num1 / num2;
      System.out.println("Result: " + result);
    } catch (ArithmeticException e) {
      System.out.println("Error: Cannot divide by zero.");
    } catch (Exception e) {
      System.out.println("Error: Invalid input. Please enter valid numbers.");
    }
  }
}
