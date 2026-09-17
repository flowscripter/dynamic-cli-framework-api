import type GlobalModifierCommand from "../../command/GlobalModifierCommand.ts";
import type CLIConfig from "../../CLIConfig.ts";

export const STARTUP_SERVICE_ID = "@flowscripter/dynamic-cli-framework/startup-service";

/**
 * Minimal, read-only view of the CLI's {@link Context} passed to a {@link StartupTask}.
 */
export interface StartupTaskContext {
  readonly cliConfig: CLIConfig;

  getServiceById(id: string): unknown;

  doesServiceExist(id: string): boolean;
}

/**
 * A `"blocking"` task is awaited before the next lower-priority task runs - this is how a
 * {@link ServiceProvider}'s own `initService()` behaves today.
 *
 * A `"background"` task is started but not awaited before startup proceeds, for work that
 * would otherwise stall CLI startup (e.g. a network call). Its `run()` receives a scope-bound
 * view of any scoped services (such as a `KeyValueService`) that remains valid for the task's
 * entire lifetime, not just until the next task starts.
 */
export type StartupTaskMode = "blocking" | "background";

/**
 * A unit of work to run once during CLI startup, in {@link StartupTask.priority} order.
 */
export interface StartupTask {
  /**
   * Identifies this task, e.g. for debug logging.
   */
  readonly id: string;

  /**
   * Used to determine the order in which tasks run. Higher values run earlier - the same
   * semantics as {@link ServiceProvider.servicePriority}.
   */
  readonly priority: number;

  /**
   * Defaults to `"blocking"` if not specified.
   */
  readonly mode?: StartupTaskMode;

  /**
   * Zero or more {@link GlobalModifierCommand} instances which should be scanned for and
   * executed (if specified as CLI arguments or CLI configuration) before this task's
   * {@link run} is invoked.
   */
  readonly modifierCommands?: ReadonlyArray<GlobalModifierCommand>;

  /**
   * Perform this task's startup work.
   *
   * @param context a {@link StartupTaskContext} view of the CLI's {@link Context}.
   */
  run(context: StartupTaskContext): Promise<void>;
}

/**
 * Service allowing registration of prioritised tasks to run once during CLI startup.
 */
export default interface StartupService {
  /**
   * Register a {@link StartupTask} to run during CLI startup.
   */
  registerTask(task: StartupTask): void;
}
