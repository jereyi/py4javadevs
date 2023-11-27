public class Main {

  public static void main(String[] args) {
    String string1 = "Hello, World!";
    String substring = "World";

    if (string1.contains(substring)) {
      System.out.println("Substring found!");
    } else {
      System.out.println("Substring not found!");
    }
  }
}
