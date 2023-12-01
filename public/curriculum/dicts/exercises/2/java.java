import java.util.HashMap;
import java.util.Map;

public class Main {

  public static void main(String[] args) {
    Map<String, Object> myMap = new HashMap<>();
    myMap.put("name", "Alice");
    myMap.put("age", 25);
    myMap.put("city", "Wonderland");

    myMap.put("age", 26); // Update age

    System.out.println("Updated Map: " + myMap);
  }
}
