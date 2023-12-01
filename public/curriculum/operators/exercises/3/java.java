import java.util.ArrayList;
import java.util.List;

public class Main {

  public static void main(String[] args) {
    Integer[] numbers = { 1, 2, 3, 4, 5 };

    List<Integer> numbersList = Arrays.asList(numbers);

    int checkNumber = 3;
    boolean isInList = numbersList.contains(checkNumber);

    System.out.println("Is " + checkNumber + " in the list? " + isInList);
  }
}
