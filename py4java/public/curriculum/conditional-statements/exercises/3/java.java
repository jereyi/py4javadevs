public class Solution {

  public static void main(String[] args) {
    double num1 = 1.0;
    double num2 = 0.5;
    double num3 = 1.5;

    if (num1 >= num2) {
      if (num1 >= num3) {
        System.out.println(num1 + " is the largest.");
      } else {
        System.out.println(num3 + " is the largest.");
      }
    } else {
      if (num2 >= num3) {
        System.out.println(num2 + " is the largest.");
      } else {
        System.out.println(num3 + " is the largest.");
      }
    }
  }
}
