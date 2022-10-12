abstract class Queue<T> {
  public abstract enqueue(element: T): void;
  public abstract dequeue(): T | undefined;
  public abstract getCount(): number;
  public abstract isEmpty(): boolean;
  public abstract clear(): void;
}

export { Queue };
