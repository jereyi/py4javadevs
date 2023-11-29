import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class CountLines {

  public static void main(String[] args) {
    String filePath = "count_lines.txt";

    try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
      int lineCount = 0;
      while (reader.readLine() != null) {
        lineCount++;
      }
      System.out.println("Number of lines in '" + filePath + "': " + lineCount);
    } catch (IOException e) {
      System.out.println("Error: " + e.getMessage());
    }
  }
}
