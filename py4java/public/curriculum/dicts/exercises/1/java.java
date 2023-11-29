public class Main {

  public static void main(String[] args) {
    Map<String, Object> myMap = new HashMap<>();
    myMap.put("name", "Alice");
    myMap.put("age", 25);
    myMap.put("city", "Wonderland");

    System.out.println("Age: " + myMap.get("age"));
  }
}
