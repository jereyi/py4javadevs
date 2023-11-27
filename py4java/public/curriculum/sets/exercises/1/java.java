import java.util.HashSet;
import java.util.Set;

public class Solution {

  public static void main(String[] args) {
    Set<Integer> set1 = new HashSet<>(List.of(1, 2, 3, 4, 5));

    set1.add(6);
    set1.remove(2);

    System.out.println("Updated set1: " + set1);
  }
}
