import java.util.ArrayList;
import java.util.List;

public class Main {

  public static void main(String[] args) {
    // Sorting a list in ascending order
    List<Integer> myList = new ArrayList<>(List.of(5, 2, 8, 1, 6));
    Collections.sort(myList);
    System.out.println("Sorted List (Ascending): " + myList);

    // Sorting a list in descending order
    Collections.sort(myList, Collections.reverseOrder());
    System.out.println("Sorted List (Descending): " + myList);

    // Sorting the original list in-place
    myList.sort(null);
    System.out.println("Original List Sorted (Ascending): " + myList);
  }
}
