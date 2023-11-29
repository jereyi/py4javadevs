import java.util.Scanner;

public class Main {

  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    System.out.println("Menu:");
    System.out.println("1. Option 1");
    System.out.println("2. Option 2");
    System.out.println("3. Option 3");
    System.out.print("Enter your choice (1-3): ");
    String selection = scanner.nextLine();

    switch (selection) {
      case "1":
        System.out.println("You selected Option 1.");
        break;
      case "2":
        System.out.println("You selected Option 2.");
        break;
      case "3":
        System.out.println("You selected Option 3.");
        break;
      default:
        System.out.println(
          "Invalid choice. Please enter a number between 1 and 3."
        );
    }
  }
}
