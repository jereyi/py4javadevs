class MyClass {

  // Accessible from any other class
  public void publicMethod() {
    System.out.println("This is a public method");
  }

  // Accessible within the same package and in subclasses.
  protected void protectedMethod() {
    System.out.println("This is a protected method");
  }

  // Only accessible within the same class.
  private void privateMethod() {
    System.out.println("This is a private method");
  }
}

public class Main {

  public static void main(String[] args) {
    MyClass obj = new MyClass();
    obj.publicMethod();
    obj.protectedMethod();
    obj.privateMethod(); // This will cause a compilation error
  }
}
