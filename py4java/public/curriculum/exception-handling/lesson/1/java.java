public class Main {

  public static void main(String[] args) {
    try {
      int result = 10 / 0;
    } catch (ArithmeticException e) {
      System.out.println("Error: Division by zero!");
    }
  }
}
