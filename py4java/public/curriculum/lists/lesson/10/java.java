public class Main {

  public static void main(String[] args) {
    List<Integer> myList = new ArrayList<>(
      List.of(3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5)
    );
    int elementToSearch = 3;
    int index = myList.indexOf(elementToSearch); // Evaluates to 0
  }
}
