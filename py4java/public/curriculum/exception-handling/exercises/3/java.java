import java.util.Scanner;

class InvalidUsernameError extends Exception {

  public InvalidUsernameError(String message) {
    super(message);
  }
}

public class Main {

  public static void main(String[] args) {
    try {
      Scanner scanner = new Scanner(System.in);
      System.out.print("Enter your username: ");
      String username = scanner.nextLine();
      if (username.isEmpty()) {
        throw new InvalidUsernameError("Username cannot be empty.");
      }
      System.out.println("Login successful for user: " + username);
    } catch (InvalidUsernameError e) {
      System.out.println("Error: " + e.getMessage());
    } catch (Exception e) {
      System.out.println("An unexpected error occurred: " + e.getMessage());
    }
  }
}
