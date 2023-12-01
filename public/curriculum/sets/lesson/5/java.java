import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Arrays;

public class Main {

  public static void main(String[] args) {
    Set<Integer> mySet = new HashSet<>(List.of(1, 2, 3, 4));
    List<Integer> listFromSet = new ArrayList<>(mySet);
    Set<Integer> setFromList = new HashSet<>(Arrays.asList(1, 2, 3));
  }
}
