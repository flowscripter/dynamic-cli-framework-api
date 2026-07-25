import type Command from "./command/Command.ts";
import type GroupCommand from "./command/GroupCommand.ts";
import type { PopulatedSingleValueType, PopulatedValues } from "./value/Value.ts";
import type { InvalidArgument } from "./RunResult.ts";

/**
 * A container holding the result of a command clause parsing operation.
 */
export interface ParseResult {
  /**
   * The {@link Command} to execute if the parse result is valid (i.e. {@link invalidArguments} is empty).
   */
  readonly command: Command;

  /**
   * Optional parent {@link GroupCommand} if the parsed {@link command} was a member {@link SubCommand},
   */
  readonly groupCommand?: GroupCommand;

  /**
   * The argument values populated from the command line args. If the parse result is valid
   * (i.e. {@link invalidArguments} is empty), this can be used to execute the specified {@link command}.
   * {@link PopulatedSingleValueType} is for {@link GlobalCommand} values, {@link PopulatedValues} is for
   * {@link SubCommand} values.
   */
  readonly populatedArgumentValues: PopulatedValues | PopulatedSingleValueType;

  /**
   * Any arguments which were invalid.
   */
  readonly invalidArguments: ReadonlyArray<InvalidArgument>;

  /**
   * Any arguments which were unused in the parsing operation.
   */
  readonly unusedArgs: ReadonlyArray<string>;
}
