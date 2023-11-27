import java.util.Scanner;

public class Solution {

  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    String correctPassword = "secret";
    System.out.print("Enter the password: ");
    String password = scanner.nextLine();

    if (password.equals(correctPassword)) {
      System.out.println("Access granted!");
    } else {
      System.out.println("Access denied. Incorrect password.");
    }
  }
}
