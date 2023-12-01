import java.util.Arrays;
import java.util.Set;
import java.util.HashSet;

public class Main {

  public static void main(String[] args) {
    Set<Integer> set1 = new HashSet<>(Arrays.asList(1, 2, 3));
    Set<Integer> set2 = new HashSet<>(Arrays.asList(2, 3, 4));
    set1.addAll(set2); // Union
    set1.retainAll(set2); // Intersection
    set1.removeAll(set2); // Difference
  }
}
