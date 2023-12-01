import java.util.ArrayList;
import java.util.List;

public class Main {

  public static void main(String[] args) {
    List<Integer> myList = new ArrayList<>(List.of(5, 2, 8, 1, 6));
    Integer sumOfList = myList.stream().sum(); // Evaluates to 22
    Integer maxElement = myList.stream().max(); // Evaluates to 8
  }
}
