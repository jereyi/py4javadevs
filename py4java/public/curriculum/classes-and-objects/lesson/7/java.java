class MathOperations {

  public int add(int x, int y) {
    return x + y;
  }

  public int add(int x, int y, int z) {
    return x + y + z;
  }
}

public class Main {

  public static void main(String[] args) {
    MathOperations mathObj = new MathOperations();
    System.out.println(mathObj.add(2, 3)); // Output: 5
    System.out.println(mathObj.add(2, 3, 4)); // Output: 9
  }
}
