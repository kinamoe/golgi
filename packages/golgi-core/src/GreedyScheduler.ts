import { AsyncQueue } from "./AsyncQueue.js";
import { Scheduler, SchedulerStatus, SchedulerHooks } from "./Scheduler.js";
import { Task, TaskCompletion } from "./Task.js";

class GreedyScheduler extends Scheduler {
  protected queue: AsyncQueue<Task>;
  protected concurrent: number;
  protected maxConcurrent: number;
  protected processer: (
    task: Task,
    scheduler: Scheduler
  ) => Promise<TaskCompletion>;
  protected status: SchedulerStatus = SchedulerStatus.Stopped;
  protected hooks: SchedulerHooks;

  constructor(
    queue: AsyncQueue<Task>,
    processer: (task: Task, scheduler: Scheduler) => Promise<TaskCompletion>,
    maxConcurrent = 1,
    hooks: SchedulerHooks = {}
  ) {
    super();
    this.queue = queue;
    this.processer = processer;
    this.concurrent = 0;
    this.maxConcurrent = maxConcurrent;
    this.hooks = hooks;
  }

  protected schedule(): boolean {
    if (
      this.status === SchedulerStatus.Running &&
      !(this.concurrent + 1 > this.maxConcurrent)
    ) {
      this.concurrent++;
      this.queue
        .dequeue()
        .then((task) => this.processer(task, this))
        .then(async (completion) => {
          this.concurrent--;
          if (this.hooks.completionHook !== undefined) {
            try {
              this.hooks.completionHook(completion);
            } catch (error) {
              console.log(error);
            }
          }
          this.schedule();
        })
        .catch(async (error) => {
          this.concurrent--;
          if (this.hooks.errorHook !== undefined) {
            try {
              this.hooks.errorHook(error);
            } catch (error) {
              console.log(error);
            }
          }
          this.schedule();
        });
      return true;
    }

    return false;
  }

  public async start() {
    this.status = SchedulerStatus.Running;
    while (this.schedule());
  }

  public async stop() {
    this.status = SchedulerStatus.Stopping;
  }

  public async getStatus(): Promise<SchedulerStatus> {
    return this.status;
  }

  public async addTask(task: Task): Promise<void> {
    this.queue.enqueue(task);
  }
}

export { GreedyScheduler };
