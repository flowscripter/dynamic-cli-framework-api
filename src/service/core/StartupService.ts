import type GlobalModifierCommand from "../../command/GlobalModifierCommand.ts";
import type CLIConfig from "../../CLIConfig.ts";
import type { RunState } from "../../RunResult.ts";

export const STARTUP_SERVICE_ID = "@flowscripter/dynamic-cli-framework/startup-service";

/**
 * Minimal, read-only view of the CLI's {@link Context} passed to a {@link StartupTask}.
 */
export interface StartupTaskContext {
  readonly cliConfig: CLIConfig;

  /**
   * The CLI arguments passed to the CLI's `run()`.
   */
  readonly args: ReadonlyArray<string>;

  getServiceById(id: string): unknown;

  doesServiceExist(id: string): boolean;
}

/**
 * A `"blocking"` task is awaited before the next lower-priority task runs.
 * A `"background"` task is started but not awaited before startup proceeds.
 */
export type StartupTaskMode = "blocking" | "background";

/**
 * Optional result of {@link StartupTask.run}. Only a `"blocking"` task may return it.
 *
 * An `exitRequest` ends the run early: the remaining startup tasks and the command are skipped,
 * and `exitRequest.runState` is used as the run's result.
 */
export type StartupTaskOutcome = { exitRequest: { runState: RunState } };

/**
 * A unit of work to run once during CLI startup, in {@link StartupTask.priority} order.
 */
export interface StartupTask {
  /**
   * Identifies this task, e.g. for debug logging.
   */
  readonly id: string;

  /**
   * Used to determine the order in which tasks run. Higher values run earlier.
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
   *
   * @return optionally a {@link StartupTaskOutcome}. Only a `"blocking"` task may return one.
   */
  run(context: StartupTaskContext): Promise<void | StartupTaskOutcome>;
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
