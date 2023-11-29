import java.util.ArrayList;
import java.util.List;

public class Main {

  public static void main(String[] args) {
    List<Integer> numbers = new ArrayList<>(
      List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    );
    Integer sum = 0;
    for (Integer number : numbers) {
      if (number % 2 == 0) {
        sum += number;
      }
    }
    System.out.println("Sum of even numbers: " + result);
  }
}
