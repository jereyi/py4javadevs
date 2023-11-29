public class Main {

  public static void main(String[] args) {
    String string1 = "hello";
    String string2 = "world";

    // Using compareTo method
    int result = string1.compareTo(string2);

    if (result == 0) {
      System.out.println("Strings are equal");
    } else if (result < 0) {
      System.out.println("string1 comes before string2");
    } else {
      System.out.println("string1 comes after string2");
    }
  }
}
