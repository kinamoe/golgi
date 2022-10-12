abstract class AsyncQueue<T> {
  public abstract enqueue(element: T): Promise<void>;
  public abstract dequeue(): Promise<T>;
  public abstract getCount(): Promise<number>;
  public abstract isEmpty(): Promise<boolean>;
  public abstract clear(): Promise<void>;
}

export { AsyncQueue };
