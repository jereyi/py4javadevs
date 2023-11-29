import java.util.Scanner;

public class Main {

  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    System.out.print("Enter your name: ");
    String userInput = scanner.nextLine();

    System.out.println("Hello, " + userInput + "!");
  }
}
