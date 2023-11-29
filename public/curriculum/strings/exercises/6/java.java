public class Main {

  public static void main(String[] args) {
    String text = "Java is an awesome programming language.";

    String substring = "awesome";
    int index = text.indexOf(substring);

    System.out.println(
      "The substring '" + substring + "' starts at index: " + index
    );
  }
}
