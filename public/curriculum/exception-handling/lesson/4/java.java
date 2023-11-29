public class Main {

  public static void exampleMethod(boolean someCondition)
    throws ArithmeticException {
    if (someCondition) {
      throw new ArithmeticException("This is a custom exception");
    }
  }

  public static void main(String[] args) {
    try {
      exampleMethod(true);
    } catch (ArithmeticException e) {
      System.out.println("Caught an exception: " + e);
    }
  }
}
