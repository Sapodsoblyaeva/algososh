type TStack<T> = {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
};

export class Stack<T> implements TStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    return this.container[this.container.length - 1] || null;
  };

  getSize = () => this.container.length;

  getElements = () => this.container;
}
