public class Main {

  public static void main(String[] args) {
    try {
      int value = Integer.parseInt("abc");
    } catch (NumberFormatException e) {
      System.out.println("Error: Invalid conversion to integer!");
    } catch (Exception e) {
      System.out.println("Error: " + e.getMessage());
    }
  }
}
