export const COMPLETION_SERVICE_ID = "@flowscripter/dynamic-cli-framework/completion-service";

export enum ShellType {
  BASH = "bash",
  ZSH = "zsh",
  FISH = "fish",
  POWERSHELL = "powershell",
}

export interface CompletionItem {
  readonly value: string;
  readonly description?: string;
}

/**
 * Interface for a service providing shell auto-completion support.
 */
export default interface CompletionService {
  /**
   * Parse the arguments passed by a shell's completion bootstrap script into the command line
   * being completed and the cursor position within it.
   *
   * @param shellType the shell which invoked completion.
   * @param args the arguments passed by the shell's bootstrap script.
   *
   * @return the command line being completed and the cursor position within it.
   */
  parseCompletionContext(
    shellType: ShellType,
    args: ReadonlyArray<string>,
  ): { line: string; cursorPosition: number };

  generateCompletions(
    shellType: ShellType,
    line: string,
    cursorPosition: number,
  ): Promise<ReadonlyArray<CompletionItem>>;

  getBootstrapScript(shellType: ShellType, cliName: string, executablePath: string): string;

  getDefaultConfigPath(shellType: ShellType): string;

  validateShellEnvironment(shellType: ShellType): Promise<boolean>;

  formatCompletions(shellType: ShellType, completions: ReadonlyArray<CompletionItem>): string;
}
