/**
 * Interface allowing a {@link CLI} to pass context to a {@link Command} instance.
 */
import type CLIConfig from "./CLIConfig.ts";

export default interface Context {
  /**
   * The {@link CLIConfig} in use by the {@link CLI}.
   */
  readonly cliConfig: CLIConfig;

  /**
   * Whether each of the standard streams of the running process is attached to a TTY.
   */
  readonly isTty: {
    readonly stdin: boolean;
    readonly stdout: boolean;
    readonly stderr: boolean;
  };

  /**
   * Return the service identified by the specified ID.
   *
   * @param id the ID of the service to retrieve.
   */
  getServiceById(id: string): unknown;

  /**
   * Check if the specified service exists in the context.
   *
   * @param id the ID of the desired service.
   */
  doesServiceExist(id: string): boolean;
}
