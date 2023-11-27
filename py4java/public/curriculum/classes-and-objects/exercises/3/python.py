class Node:
    def __init__(self, data):
        self.data = data
        self.next_node = None


class LinkedList:
    def __init__(self):
        self.head = None

    def is_empty(self):
        return self.head is None

    def insert_at_end(self, data):
        new_node = Node(data)
        if self.is_empty():
            self.head = new_node
        else:
            current = self.head
            while current.next_node:
                current = current.next_node
            current.next_node = new_node

    def display(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next_node
        print("None")

    def length(self):
        count = 0
        current = self.head
        while current:
            count += 1
            current = current.next_node
        return count


# Test the Linked List class
linked_list = LinkedList()

linked_list.insert_at_end(5)
linked_list.insert_at_end(10)
linked_list.insert_at_end(15)
linked_list.insert_at_end(20)

print("Linked List:")
linked_list.display()

print("Length of the Linked List:", linked_list.length())