public class Main {

  public static void main(String[] args) {
    Set<Integer> set1 = new HashSet<>(Arrays.asList(1, 2, 3));
    Set<Integer> set2 = new HashSet<>(Arrays.asList(2, 3, 4));
    boolean isSubset = set1.containsAll(set2);
  }
}
