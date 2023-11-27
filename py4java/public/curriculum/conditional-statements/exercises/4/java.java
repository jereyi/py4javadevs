public class Solution {

  public static void main(String[] args) {
    char ch = 'p';
    String vowels = "aeiou";

    if (vowels.contains(ch)) {
      System.out.println(ch + " is a vowel.");
    } else {
      System.out.println(ch + " is a consonant.");
    }
  }
}
