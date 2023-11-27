public class Solution {

  public static void main(String[] args) {
    String sentence = "Java programming is fun and versatile.";

    List<String> word_list = Arrays.asList(sentence.split("\\s+"));
    System.out.println("List of Words: " + word_list);
  }
}
