public class Main {

  public static void main(String[] args) {
    try (
      BufferedWriter writer = new BufferedWriter(new FileWriter("example.txt"))
    ) {
      writer.write("Hello, File!");
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
