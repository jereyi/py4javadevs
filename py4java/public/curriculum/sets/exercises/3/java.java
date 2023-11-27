import java.util.HashSet;
import java.util.Set;

public class Solution {

  public static void main(String[] args) {
    Set<Integer> set1 = new HashSet<>(Set.of(1, 2, 3, 4, 5));
    Set<Integer> set2 = new HashSet<>(Set.of(3, 4));

    boolean isSubset = set2.containsAll(set1);
    boolean isSuperset = set1.containsAll(set2);

    System.out.println("Is set1 a subset of set2? " + isSubset);
    System.out.println("Is set1 a superset of set2? " + isSuperset);
  }
}
