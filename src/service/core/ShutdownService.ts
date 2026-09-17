export const SHUTDOWN_SERVICE_ID = "@flowscripter/dynamic-cli-framework/shutdown-service";

/**
 * A unit of work to run once during CLI shutdown, in {@link ShutdownTask.priority} order.
 */
export interface ShutdownTask {
  /**
   * Identifies this task, e.g. for debug logging when a shutdown task is slow or hangs.
   */
  readonly id: string;

  /**
   * Used to determine the order in which tasks run during shutdown. Higher values run
   * earlier. Defaults to `0` if not specified; tasks with the same
   * priority run in registration order.
   */
  readonly priority?: number;

  /**
   * Perform this task's shutdown work.
   */
  run(): Promise<void>;
}

/**
 * Service allowing registration of prioritised tasks to run during CLI shutdown.
 */
export default interface ShutdownService {
  /**
   * Register a {@link ShutdownTask} to run during graceful shutdown.
   */
  registerTask(task: ShutdownTask): void;

  /**
   * Enter long-running mode where the first Ctrl-C sets a cooperative flag
   * instead of exiting, and a third Ctrl-C forces exit.
   */
  enterLongRunningMode(): void;

  /**
   * Leave long-running mode, restoring default single Ctrl-C exit behavior.
   */
  leaveLongRunningMode(): void;

  /**
   * True once shutdown has been requested (e.g. first Ctrl-C in long-running mode).
   */
  readonly isShutdownRequested: boolean;
}
