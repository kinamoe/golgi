import { TaskCompletion } from "./Task.js";

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
  protected abstract schedule(): boolean;
  public abstract start(): Promise<void>;
  public abstract stop(): Promise<void>;
  public abstract getStatus(): Promise<SchedulerStatus>;
}

export { Scheduler, SchedulerStatus, SchedulerHooks };
