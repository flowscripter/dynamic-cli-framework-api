import type { ParseResult } from "../../ParseResult.ts";
import type ComplexOption from "../../argument/ComplexOption.ts";
import type Option from "../../argument/Option.ts";
import type { Values } from "../../Value.ts";

export const ARGUMENT_PROMPTER_SERVICE_ID =
  "@flowscripter/dynamic-cli-framework/argument-prompter-service";

export default interface ArgumentPrompterService {
  promptForMissingArguments(parseResult: ParseResult): Promise<ParseResult>;

  /**
   * Prompt for a value for each of the specified arguments.
   *
   * @param args the arguments to prompt for.
   * @param existing optional values already provided, which are not prompted for and are visible
   * to {@link Argument.validate} functions as {@link ValidationContext.values}.
   *
   * @return the prompted values, converted to their native types, or `undefined` if prompting is
   * not possible (e.g. prompting has been disabled).
   */
  promptForArguments(
    args: ReadonlyArray<Option | ComplexOption>,
    existing?: Values,
  ): Promise<Values | undefined>;
}
