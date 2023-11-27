class Node {

  int data;
  Node nextNode;

  Node(int data) {
    this.data = data;
    this.nextNode = null;
  }
}

class LinkedList {

  Node head;

  LinkedList() {
    this.head = null;
  }

  boolean isEmpty() {
    return head == null;
  }

  void insertAtEnd(int data) {
    Node newNode = new Node(data);
    if (isEmpty()) {
      head = newNode;
    } else {
      Node current = head;
      while (current.nextNode != null) {
        current = current.nextNode;
      }
      current.nextNode = newNode;
    }
  }

  void display() {
    Node current = head;
    while (current != null) {
      System.out.print(current.data + " -> ");
      current = current.nextNode;
    }
    System.out.println("null");
  }

  int length() {
    int count = 0;
    Node current = head;
    while (current != null) {
      count++;
      current = current.nextNode;
    }
    return count;
  }
}

public class Main {

  public static void main(String[] args) {
    LinkedList linkedList = new LinkedList();

    linkedList.insertAtEnd(5);
    linkedList.insertAtEnd(10);
    linkedList.insertAtEnd(15);
    linkedList.insertAtEnd(20);

    System.out.println("Linked List:");
    linkedList.display();

    System.out.println("Length of the Linked List: " + linkedList.length());
  }
}
