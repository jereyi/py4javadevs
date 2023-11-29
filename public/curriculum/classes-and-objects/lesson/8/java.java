// Super Class
class Animal {

  protected String name;

  public Animal(String name) {
    this.name = name;
  }

  public void speak() {
    // Some default implementation
  }
}

// Sub Class
class Dog extends Animal {

  public Dog(String name) {
    super(name);
  }

  @Override
  public void speak() {
    System.out.println("Woof!");
  }
}

// Sub Class
class Cat extends Animal {

  public Cat(String name) {
    super(name);
  }

  @Override
  public void speak() {
    System.out.println("Meow!");
  }
}

public class Main {

  public static void main(String[] args) {
    Dog dog = new Dog("Buddy");
    Cat cat = new Cat("Whiskers");

    System.out.println(dog.name); // Output: Buddy
    dog.speak(); // Output: Woof!

    System.out.println(cat.name); // Output: Whiskers
    cat.speak(); // Output: Meow!
  }
}
