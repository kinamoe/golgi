class TaskCompletion {
  protected task: Task;
  protected message: string;

  constructor(task: Task, message: string) {
    this.task = task;
    this.message = message;
  }

  public getTask(): Task {
    return this.task;
  }

  public getMessage(): string {
    return this.message;
  }
}

class Task {
  protected type: string;
  protected message: string;
  protected context: unknown;

  constructor(type: string, message: string, context: unknown) {
    this.type = type;
    this.message = message;
    this.context = context;
  }

  public getType(): string {
    return this.type;
  }

  public getMessage(): string {
    return this.message;
  }

  public getContext(): unknown {
    return this.context;
  }

  public complete(message: string): TaskCompletion {
    return new TaskCompletion(this, message);
  }
}

export { Task, TaskCompletion };
