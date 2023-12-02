public class SquareCalculator {
    public static int calculateSquare(int number) {
        return number * number;
    }

    public static void main(String[] args) {
        int result = calculateSquare(5);
        System.out.println("Square: " + result);
    }
}