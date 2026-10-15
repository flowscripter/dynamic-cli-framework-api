import type Command from "../command/Command.ts";
import type { PopulatedSingleValueType, PopulatedValues } from "../Value.ts";
import type Argument from "./Argument.ts";

/**
 * Context passed to {@link Argument.validate} alongside the value being validated.
 */
export default interface ValidationContext {
  /**
   * The argument whose value is being validated.
   */
  readonly argument: Argument;

  /**
   * Path of the value being validated within the command's values, e.g. `address[1].port`. For a
   * top level argument this is the argument name.
   */
  readonly path: string;

  /**
   * All provided values of the {@link command}, always from the root of the command's values
   * regardless of how deeply nested the validated argument is. For a {@link GlobalCommand} this is
   * the single argument value.
   */
  readonly values: PopulatedValues | PopulatedSingleValueType;

  /**
   * The {@link Command} the argument belongs to.
   */
  readonly command: Command;
}
