export const UPGRADE_SERVICE_ID = "@flowscripter/dynamic-cli-framework/upgrade-service";

/**
 * Operating systems an {@link UpgradeService} implementation may support.
 */
export enum SupportedOs {
  LINUX = "linux",
  MACOS = "macos",
  WINDOWS = "windows",
}

/**
 * CPU architectures an {@link UpgradeService} implementation may support.
 */
export enum SupportedArch {
  X64 = "x64",
  ARM64 = "arm64",
}

/**
 * Mechanism by which the CLI was originally installed, and therefore how it should be upgraded.
 */
export enum InstallMethod {
  LINUX_SCRIPT = "linux-script",
  HOMEBREW = "homebrew",
  WINGET = "winget",
  GITHUB_RELEASE = "github-release",
}

/**
 * Outcome of an {@link UpgradeService.checkForUpgrade} or {@link UpgradeService.getUpgradeCheckResult} call.
 */
export type UpgradeCheckResult =
  | {
      readonly status: "checked";
      readonly currentVersion: string;
      readonly latestVersion: string;
      readonly updateAvailable: boolean;
      readonly os: SupportedOs;
      readonly arch: SupportedArch;
      readonly installMethod: InstallMethod;
    }
  | {
      /** The detected os/arch and resolved (or overridden) installMethod combination is not supported or not configured. */
      readonly status: "unsupported";
    }
  | {
      /** A supported/configured combination was found, but determining the latest version failed. */
      readonly status: "failed";
      readonly error: Error;
    };

/**
 * Outcome of an {@link UpgradeService.upgrade} call.
 */
export interface UpgradeResult {
  readonly ok: boolean;
  readonly oldVersion: string;
  readonly newVersion?: string;
  readonly error?: Error;
}

/**
 * Service allowing a {@link Command} to check for and install a newer version of the CLI itself.
 */
export default interface UpgradeService {
  /**
   * Detect the operating system the CLI is currently running on.
   *
   * @return the detected {@link SupportedOs}, or `undefined` if it is not supported.
   */
  detectOs(): SupportedOs | undefined;

  /**
   * Detect the CPU architecture the CLI is currently running on.
   *
   * @return the detected {@link SupportedArch}, or `undefined` if it is not supported.
   */
  detectArch(): SupportedArch | undefined;

  /**
   * Detect the mechanism by which the CLI was installed for the specified operating system.
   *
   * @param os the {@link SupportedOs} to detect the install method for.
   *
   * @return the detected {@link InstallMethod}, or `undefined` if it could not be determined.
   */
  detectInstallMethod(os: SupportedOs): Promise<InstallMethod | undefined>;

  /**
   * Check whether a newer version of the CLI is available.
   *
   * The operating system and CPU architecture are always the detected values.
   *
   * @param installMethod optional {@link InstallMethod} override, defaults to the detected value.
   *
   * @return the {@link UpgradeCheckResult}. Runs to completion. Never rejects.
   */
  checkForUpgrade(installMethod?: InstallMethod): Promise<UpgradeCheckResult>;

  /**
   * Upgrade the CLI to the latest available version.
   *
   * The operating system and CPU architecture are always the detected values.
   *
   * @param installMethod optional {@link InstallMethod} override, defaults to the detected value.
   *
   * @return the {@link UpgradeResult}. Never rejects.
   */
  upgrade(installMethod?: InstallMethod): Promise<UpgradeResult>;

  /**
   * Returns the result of the version check that was started eagerly once this service's
   * dependencies were set (or starts one now, with no install method override, if none has
   * started yet).
   *
   * @return the {@link UpgradeCheckResult}. Never rejects.
   */
  getUpgradeCheckResult(): Promise<UpgradeCheckResult>;

  /**
   * Returns the most recently cached {@link UpgradeCheckResult} without performing a version
   * check.
   *
   * @return the cached {@link UpgradeCheckResult}, or `undefined` if no result is cached. Never
   * rejects.
   */
  getCachedUpgradeCheckResult(): Promise<UpgradeCheckResult | undefined>;

  /**
   * Performs a version check now and stores its result in the cache read by
   * {@link getCachedUpgradeCheckResult}.
   *
   * @return the fresh {@link UpgradeCheckResult}. Never rejects.
   */
  refreshUpgradeCheckCache(): Promise<UpgradeCheckResult>;

  /**
   * The version of the CLI which restarted this process after an automatic upgrade, or
   * `undefined` if this process was not started by such a restart.
   */
  readonly restartedFromVersion: string | undefined;
}
