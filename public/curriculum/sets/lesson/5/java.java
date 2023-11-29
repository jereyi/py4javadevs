public class Main {

  public static void main(String[] args) {
    List<Integer> listFromSet = new ArrayList<>(mySet);
    Set<Integer> setFromList = new HashSet<>(Arrays.asList(1, 2, 3));
  }
}
