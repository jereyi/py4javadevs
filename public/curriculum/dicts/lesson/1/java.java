import java.util.HashMap;
import java.util.Map;

public class Main {

  public static void main(String[] args) {
    Map<String, String> myMap = new HashMap<>();
    myMap.put("key1", "value1");
    myMap.put("key2", "value2");
    // myMap.put("key3", 3); This would cause an error!
  }
}
