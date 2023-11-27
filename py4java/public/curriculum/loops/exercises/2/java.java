public class Solution {

  public static void main(String[] args) {
    String originalString = "Java";
    StringBuilder reversedString = new StringBuilder();

    for (int i = originalString.length() - 1; i >= 0; i--) {
      reversedString.append(originalString.charAt(i));
    }

    System.out.println("Original String: " + originalString);
    System.out.println("Reversed String: " + reversedString.toString());
  }
}
