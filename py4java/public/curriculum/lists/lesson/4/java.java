import java.util.ArrayList;
import java.util.List;

public class Main {

  public static void main(String[] args) {
    List<Integer> myList = new ArrayList<>(List.of(5, 2, 8, 1, 6));
    Integer element = myList.get(2); // Evaluates to 8
  }
}
