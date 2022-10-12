import { Task, TaskCompletion } from "./Task.js";

class Mux {
  protected registry: Map<string, (task: Task) => Promise<TaskCompletion>>;

  constructor() {
    this.registry = new Map();
  }

  public register(
    type: string,
    processer: (task: Task) => Promise<TaskCompletion>
  ) {
    this.registry.set(type, processer);
  }

  public getProcesser(): (task: Task) => Promise<TaskCompletion> {
    return async (task: Task) => {
      const processer = this.registry.get(task.getType());
      if (processer !== undefined) {
        return processer(task);
      } else {
        throw Error(
          `Task type "${task.getType()}" does not exist in Mux's registry`
        );
      }
    };
  }
}

export { Mux };
