export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

type TLinkedList<T> = {
  append: (element: T) => TLinkedList<T>;
  prepend: (element: T) => TLinkedList<T>;
  getSize: () => number;
  print: () => T[];
};

export class LinkedList<T> implements TLinkedList<T> {
  public head: Node<T> | null;
  public size: number;
  public tail: Node<T> | null;
  constructor() {
    this.head = null;
    this.size = 0;
    this.tail = null;
  }

  prepend = (element: T) => {
    const newNode = new Node<T>(element, this.head);

    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }
    this.size++;
    return this;
  };

  append = (element: T) => {
    const newNode = new Node<T>(element);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;
    this.size++;
    return this;
  };

  getSize() {
    return this.size;
  }

  deleteHead = () => {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.size--;
    return deletedHead;
  };

  deleteTail = () => {
    if (!this.head) {
      return null;
    }

    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return deletedTail;
    }

    let currentNode = this.head;

    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;
    this.size--;
    return deletedTail;
  };

  print = () => {
    let currentNode = this.head;
    let res: T[] = [];
    while (currentNode) {
      res.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return res;
  };

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const newNode = new Node(element);

      if (index === 0) {
        newNode.next = this.head;
        this.head = newNode;
      } else {
        let currentNode = this.head;
        let prevNode: Node<T> | null = null;
        let currentIndex = 0;

        while (currentIndex < index) {
          prevNode = currentNode;
          currentNode = currentNode!.next;
          currentIndex++;
        }
        if (prevNode) {
          prevNode.next = newNode;
        } else {
          this.head = newNode;
        }
        newNode.next = currentNode;
      }

      this.size++;
    }
  }

  deleteAtIndex = (index: number) => {
    if (index >= this.size || index < 0) {
      return null;
    }

    let currentNode = this.head;
    let prevNode: Node<T> | null = null;
    let currentIndex = 0;

    while (currentIndex !== index) {
      prevNode = currentNode;
      currentNode = currentNode!.next;
      currentIndex++;
    }

    if (currentIndex === 0) {
      this.head = null;
    } else {
      prevNode!.next = currentNode!.next;
    }

    this.size--;
    return currentNode;
  };

  makeElementNull = (node: Node<T> | null, element: T) => {
    if (!node) {
      return null;
    }
    node.value = element;
    return node.value;
  };

  find = (index: number) => {
    if (index >= this.size || index < 0) {
      return null;
    }

    let currentNode = this.head;
    let prevNode: Node<T> | null = null;
    let currentIndex = 0;
    let foundNode: Node<T> | null = null;

    while (currentIndex !== index) {
      prevNode = currentNode;
      currentNode = currentNode!.next;
      currentIndex++;
    }
    if (currentIndex === index) {
      foundNode = currentNode;
    }
    return foundNode;
  };
}
