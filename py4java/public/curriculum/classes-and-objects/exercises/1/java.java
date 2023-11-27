class Car {

  String make;
  String model;
  int year;
  int mileage;

  public Car(String make, String model, int year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  void startEngine() {
    System.out.println("Engine started! Vroom, vroom!");
  }
}

public class Main {

  public static void main(String[] args) {
    // Create an instance of the Car class
    Car car1 = new Car("Toyota", "Camry", 2022);

    // Call the startEngine method
    car1.startEngine();

    // Initialize existing 'mileage' property
    // Adding a new property is not possible in Java
    car1.mileage = 50000;

    // Print the updated details
    System.out.println("Make: " + car1.make);
    System.out.println("Model: " + car1.model);
    System.out.println("Year: " + car1.year);
    System.out.println("Mileage: " + car1.mileage);
  }
}
