import { Queue } from "./Queue.js";

class StackQueue<T> extends Queue<T> {
  protected front: Array<T>;
  protected back: Array<T>;

  constructor() {
    super();
    this.front = [];
    this.back = [];
  }

  protected maybeFlip() {
    if (this.front.length === 0) {
      this.front = this.back;
      this.front.reverse();
      this.back = [];
    }
  }

  public enqueue(element: T) {
    this.back.push(element);
  }

  public dequeue(): T | undefined {
    this.maybeFlip();
    return this.front.pop();
  }

  public getCount(): number {
    return this.front.length + this.back.length;
  }

  public isEmpty(): boolean {
    return this.front.length === 0 && this.back.length === 0;
  }

  public clear() {
    this.front = [];
    this.back = [];
  }
}

export { StackQueue };
