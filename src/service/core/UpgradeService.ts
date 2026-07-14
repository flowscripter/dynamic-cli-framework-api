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
 * Outcome of an {@link UpgradeService.checkForUpgrade} call.
 */
export interface UpgradeCheckResult {
  readonly currentVersion: string;
  readonly latestVersion: string;
  readonly updateAvailable: boolean;
  readonly os: SupportedOs;
  readonly arch: SupportedArch;
  readonly installMethod: InstallMethod;
}

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
   * @param os optional {@link SupportedOs} override, defaults to the detected value.
   * @param arch optional {@link SupportedArch} override, defaults to the detected value.
   * @param installMethod optional {@link InstallMethod} override, defaults to the detected value.
   *
   * @return the {@link UpgradeCheckResult}, or `undefined` if the resolved os/arch/installMethod
   * combination is not supported or not configured. Never rejects.
   */
  checkForUpgrade(
    os?: SupportedOs,
    arch?: SupportedArch,
    installMethod?: InstallMethod,
  ): Promise<UpgradeCheckResult | undefined>;

  /**
   * Upgrade the CLI to the latest available version.
   *
   * @param os optional {@link SupportedOs} override, defaults to the detected value.
   * @param arch optional {@link SupportedArch} override, defaults to the detected value.
   * @param installMethod optional {@link InstallMethod} override, defaults to the detected value.
   *
   * @return the {@link UpgradeResult}. Never rejects.
   */
  upgrade(
    os?: SupportedOs,
    arch?: SupportedArch,
    installMethod?: InstallMethod,
  ): Promise<UpgradeResult>;
}
