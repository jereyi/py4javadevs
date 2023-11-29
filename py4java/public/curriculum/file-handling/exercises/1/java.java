import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class Main {

  public static void main(String[] args) {
    String sourceFilePath = "source.txt";
    String destinationFilePath = "destination.txt";

    try (
      BufferedReader reader = new BufferedReader(
        new FileReader(sourceFilePath)
      );
      BufferedWriter writer = new BufferedWriter(
        new FileWriter(destinationFilePath)
      )
    ) {
      String line;
      while ((line = reader.readLine()) != null) {
        writer.write(line + "\n");
      }
      System.out.println(
        "Content copied from '" +
        sourceFilePath +
        "' to '" +
        destinationFilePath +
        "' successfully."
      );
    } catch (IOException e) {
      System.out.println("Error: " + e.getMessage());
    }
  }
}
