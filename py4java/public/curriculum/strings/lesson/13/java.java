public class Main {

  public static void main(String[] args) {
    String[] myArray = { "Hello", "World", "!" };
    String resultString = String.join(" ", myArray);

    System.out.println(resultString);
    //Output: Hello World !
  }
}
