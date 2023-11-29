public class Main {

  public static void main(String[] args) {
    try (
      BufferedWriter writer = new BufferedWriter(
        new FileWriter("example.txt", true)
      )
    ) {
      writer.write("\nAppending more content.");
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
