import java.util.ArrayList;
import java.util.List;

public class Main {

  public static void main(String[] args) {
    List<Integer> numbers = new ArrayList<>(
      List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    );
    List<Integer> squaredNumbers = new ArrayList<>();
    for (Integer number : numbers) {
      squaredNumbers.add(number * number);
    }
    System.out.println("Squared numbers: " + squaredNumber);
  }
}
