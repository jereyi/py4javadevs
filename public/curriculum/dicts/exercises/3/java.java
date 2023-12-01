import java.util.HashMap;
import java.util.Map;

public class Main {

  public static void main(String[] args) {
    Map<String, Object> myMap = new HashMap<>();
    myMap.put("name", "Alice");
    myMap.put("age", 25);
    myMap.put("city", "Wonderland");
    
    myMap.remove("city");

    System.out.println("Map after removal: " + myMap);
  }
}
