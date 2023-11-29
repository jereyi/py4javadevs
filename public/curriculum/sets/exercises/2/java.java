import java.util.HashSet;
import java.util.Set;

public class Solution {

    public static void main(String[] args) {
        Set<Integer> set1 = new HashSet<>(Set.of(1, 2, 3, 4, 5));
        Set<Integer> set2 = new HashSet<>(Set.of(3, 4, 5, 6, 7));

        Set<Integer> unionSet = new HashSet<>(set1);
        unionSet.addAll(set2);

        Set<Integer> intersectionSet = new HashSet<>(set1);
        intersectionSet.retainAll(set2);

        Set<Integer> differenceSet = new HashSet<>(set1);
        differenceSet.removeAll(set2);

        System.out.println("Union: " + unionSet);
        System.out.println("Intersection: " + intersectionSet);
        System.out.println("Difference: " + differenceSet);
    }
}
