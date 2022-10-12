import { AsyncQueue } from "./AsyncQueue.js";
import { StackQueue } from "./StackQueue.js";

class AsyncStackQueue<T> extends AsyncQueue<T> {
  protected stackQueue: StackQueue<T>;
  protected deqQueue: StackQueue<(value: T | PromiseLike<T>) => void>;

  constructor() {
    super();
    this.stackQueue = new StackQueue();
    this.deqQueue = new StackQueue();
  }

  public enqueue(element: T): Promise<void> {
    const deq = this.deqQueue.dequeue();
    if (deq !== undefined) {
      deq(element);
      return Promise.resolve();
    }
    this.stackQueue.enqueue(element);
    return Promise.resolve();
  }

  public dequeue(): Promise<T> {
    const element = this.stackQueue.dequeue();
    if (element !== undefined) {
      return Promise.resolve(element);
    }
    return new Promise<T>((resolve, _reject) => {
      this.deqQueue.enqueue(resolve);
    });
  }

  public getCount(): Promise<number> {
    return Promise.resolve(this.stackQueue.getCount());
  }

  public isEmpty(): Promise<boolean> {
    return Promise.resolve(this.stackQueue.isEmpty());
  }

  public clear(): Promise<void> {
    return Promise.resolve(this.stackQueue.clear());
  }
}

export { AsyncStackQueue };
