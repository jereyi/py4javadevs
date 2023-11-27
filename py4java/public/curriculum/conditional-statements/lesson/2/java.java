public class Main {

  public static void main(String[] args) {
    int x = 10;

    if (x > 0) {
      System.out.println("Positive");
      if (x % 2 == 0) {
        System.out.println("Even");
      } else {
        System.out.println("Odd");
      }
    } else {
      System.out.println("Non-positive");
    }
  }
}
