import java.util.ArrayList;
import java.util.List;

public class Main {

  public static void main(String[] args) {
    List<Integer> myList = new ArrayList<>(List.of(5, 2, 8, 1, 6));
    List<Integer> subList = myList.subList(0, 3); // Evaluates to [5, 2, 8]
  }
}
