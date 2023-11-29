public class Main {

  public static void main(String[] args) {
    List<String> word_list = Arrays.asList(
      "Programming",
      "in",
      "Java",
      "is",
      "amazing!"
    );

    String result_string = String.join(" ", word_list);
    System.out.println("Joined String: " + result_string);
  }
}
