import { Task, TaskCompletion } from "./Task.js";

enum SchedulerStatus {
  Stopped = 0,
  Running,
  Stopping,
}

interface SchedulerHooks {
  completionHook?: (completion: TaskCompletion) => Promise<void>;
  errorHook?: (error: unknown) => Promise<void>;
}

abstract class Scheduler {
  public abstract start(): Promise<void>;
  public abstract stop(): Promise<void>;
  public abstract getStatus(): Promise<SchedulerStatus>;
  public abstract addTask(task: Task): Promise<void>;
}

export { Scheduler, SchedulerStatus, SchedulerHooks };
