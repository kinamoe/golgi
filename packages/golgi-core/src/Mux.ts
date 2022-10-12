import { Scheduler } from "./Scheduler.js";
import { Task, TaskCompletion } from "./Task.js";

class Mux {
  protected registry: Map<
    string,
    (task: Task, scheduler: Scheduler) => Promise<TaskCompletion>
  >;

  constructor() {
    this.registry = new Map();
  }

  public register(
    type: string,
    processer: (task: Task, scheduler: Scheduler) => Promise<TaskCompletion>
  ) {
    this.registry.set(type, processer);
  }

  public getProcesser(): (
    task: Task,
    scheduler: Scheduler
  ) => Promise<TaskCompletion> {
    return async (task: Task, scheduler: Scheduler) => {
      const processer = this.registry.get(task.getType());
      if (processer !== undefined) {
        return processer(task, scheduler);
      } else {
        throw Error(
          `Task type "${task.getType()}" does not exist in Mux's registry`
        );
      }
    };
  }
}

export { Mux };
