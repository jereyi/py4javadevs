public class Main {

  public static void main(String[] args) {
    try {
      int result = 10 / 2;
    } catch (ArithmeticException e) {
      System.out.println("Error: Division by zero!");
    } finally {
      System.out.println("Finally block executed.");
    }
  }
}
