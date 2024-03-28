type TQueue<T> = {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getElements: () => (T | null)[];
  getSize: () => number;
};

export class Queue<T> implements TQueue<T> {
  private items: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number;
  public length: number;

  constructor(size: number) {
    this.size = size;
    this.items = [];
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  enqueue = (item: T) => {
    if (this.size <= this.length) {
      throw new Error("Maximum length exceeded");
    }
    this.items[this.tail] = item;
    this.tail = (this.tail + 1) % this.size;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.items[this.head] = null;
    this.head = (this.head + 1) % this.size;
    this.length--;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.items[this.head];
  };

  isEmpty = () => this.length === 0;

  getElements = () => this.items;
  getSize = () => this.length - 1;
}
