public class Main {

  public static void main(String[] args) {
    try (
      BufferedReader reader = new BufferedReader(new FileReader("example.txt"))
    ) {
      String line;
      while ((line = reader.readLine()) != null) {
        System.out.println(line);
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
