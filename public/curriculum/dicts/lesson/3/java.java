import java.util.HashSet;
import java.util.Set;
import java.util.HashMap;
import java.util.Map;
import java.util.Collection;

public class Main {

  public static void main(String[] args) {
    Map<String, String> myMap = new HashMap<>();
    myMap.put("key1", "value1");
    String value = myMap.get("key1");
    Set<String> keySet = myMap.keySet();
    Collection<String> values = myMap.values();
    Set<Map.Entry<String, String>> entries = myMap.entrySet();
  }
}
