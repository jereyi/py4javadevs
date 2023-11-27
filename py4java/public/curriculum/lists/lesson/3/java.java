import java.util.ArrayList;
import java.util.List;

public class Main {

  public static void main(String[] args) {
    List<Integer> myList = new ArrayList<>();
    for (int i = 1; i < 6; i++) {
      if (i % 2 == 0) {
        myList.add(2 * i);
      }
    }
  }
}
