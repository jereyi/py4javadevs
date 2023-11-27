import java.util.ArrayList;
import java.util.List;

public class Main {

  public static void main(String[] args) {
    List<Integer> myList = new ArrayList<>(List.of(5, 2, 8, 1, 6));
    myList.add(9); // Add
    myList.addAll(List.of(3, 5)); // Add another list
    myList.add(2, 10); // Add at index 2, shift other elements
    myList.set(2, 10); // Set index 2
    myList.remove(3); // Remove elemt at index
  }
}
