public class Main {

  public static void main(String[] args) {
    public class ScopeExample {

      private static String globalVariable = "I am global";

      public static void main(String[] args) {
        System.out.println(globalVariable);
      }
    }
  }
}
