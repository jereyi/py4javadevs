class Car {

  private String brand;
  private String model;

  // Constructor
  public Car(String brand, String model) {
    this.brand = brand;
    this.model = model;
  }

  // Instance method
  public void displayInfo() {
    System.out.println(brand + " " + model);
  }

  // Static method
  public static void printClassName() {
    System.out.println("car");
  }
}

public class Main {

  public static void main(String[] args) {
    Car myCar = new Car("Toyota", "Camry");
  }
}
