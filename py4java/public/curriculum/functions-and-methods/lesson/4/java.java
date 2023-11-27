public class Main {

  static int addNumbers(int... numbers) {
    int sum = 0;
    for (int num : numbers) {
      sum += num;
    }
    return sum;
  }

  public static void main(String[] args) {
    int result = addNumbers(1, 2, 3, 4);
    System.out.println(result); // Output: 10
  }
}
