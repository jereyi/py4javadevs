import java.util.InputMismatchException;
import java.util.Scanner;

public class TypeError {

  public static void main(String[] args) {
    try {
      Scanner scanner = new Scanner(System.in);
      System.out.print("Enter a number: ");
      String input = scanner.next();
      double num = Double.parseDouble(input);
      double result = Math.pow(num, 2);
      System.out.println("Square of " + input + " is " + result);
    } catch (NumberFormatException e) {
      System.out.println("Error: Invalid input. Please enter a valid number.");
    } catch (Exception e) {
      System.out.println("An unexpected error occurred: " + e.getMessage());
    }
  }
}
