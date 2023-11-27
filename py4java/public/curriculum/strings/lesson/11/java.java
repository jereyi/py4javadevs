public class Main {

  public static void main(String[] args) {
    String myString = "Hello, World!";

    // Splitting based on space
    String[] splitResult = myString.split(" ");

    for (String s : splitResult) {
      System.out.println(s);
    }
    // Output:
    // Hello,
    // World!

  }
}
