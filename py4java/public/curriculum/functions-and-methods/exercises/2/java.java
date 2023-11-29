public class Main {

  static double fahrenheitToCelsius(double fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }

  public static void main(String[] args) {
    double temperatureCelsius = fahrenheitToCelsius(100);
    System.out.println("Temperature in Celsius: " + temperatureCelsius);
  }
}
