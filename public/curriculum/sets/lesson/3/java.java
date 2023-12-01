import java.util.HashSet;
import java.util.Set;
import java.util.List;

public class Main {

  public static void main(String[] args) {
    Set<Integer> mySet = new HashSet<>(List.of(1, 2, 3, 4));
    mySet.remove(2); // Removes 2 from set
    mySet.clear(); // Removes all elements
  }
}
