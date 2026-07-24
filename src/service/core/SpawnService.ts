export const SPAWN_SERVICE_ID = "@flowscripter/dynamic-cli-framework/spawn-service";

/**
 * Outcome of a {@link SpawnService.spawn} call.
 *
 * `ok` is `true` only when the process launched and exited with code `0`. A launch failure (e.g.
 * the binary was not found) sets `error` with no `exitCode`; a non-zero exit sets `exitCode` with
 * no `error`; a process that did not exit within {@link SpawnOptions.timeoutMs} sets `timedOut`.
 */
export type SpawnResult =
  | { ok: true; exitCode: number }
  | { ok: false; exitCode?: number; error?: Error }
  | { ok: false; timedOut: true };

/**
 * Options for {@link SpawnService.spawn}.
 */
export interface SpawnOptions {
  /**
   * The working directory for the spawned process. Defaults to the current process's working
   * directory.
   */
  cwd?: string;

  /**
   * `"inherit"` (default) lets the spawned process write directly to `stdout`/`stderr`.
   * `"wrapped"` captures both streams line-by-line and invokes {@link onOutput} for each line
   * instead, without writing anything itself.
   */
  stdio?: "inherit" | "wrapped";

  /**
   * Invoked with each line captured from the spawned process. Only used when {@link stdio} is
   * `"wrapped"`.
   */
  onOutput?: (line: string, stream: "stdout" | "stderr") => void;

  /**
   * Whether to enter long-running shutdown mode for the duration of the spawn, so a single Ctrl-C
   * gracefully terminates the spawned process rather than immediately exiting the CLI. Defaults to
   * `true`.
   */
  longRunning?: boolean;

  /**
   * If specified, the spawned process is aborted (`SIGTERM`, followed by `SIGKILL` if it has not
   * exited after a grace period) if it has not exited within this many milliseconds. Defaults to
   * unbounded.
   */
  timeoutMs?: number;
}

/**
 * Service allowing a {@link Command} to spawn a child process, with output optionally captured
 * and shutdown signals gracefully forwarded.
 */
export default interface SpawnService {
  /**
   * Spawn a process.
   *
   * @param command the command and its arguments, e.g. `["bun", "add", "some-package"]`.
   * @param options optional {@link SpawnOptions}.
   *
   * @return the {@link SpawnResult}. Never rejects.
   */
  spawn(command: ReadonlyArray<string>, options?: SpawnOptions): Promise<SpawnResult>;
}
