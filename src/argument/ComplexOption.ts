import type Option from "./Option.ts";
import type { Values, ComplexValueTypeName } from "../Value.ts";

export const MAXIMUM_COMPLEX_OPTION_NESTING_DEPTH = 10;

/**
 * A container option argument for defining {@link SubCommand} nested argument hierarchies.
 */
export default interface ComplexOption extends Omit<
  Option,
  "type" | "defaultValue" | "allowableValues"
> {
  /**
   * Type of the argument value.
   */
  readonly type: ComplexValueTypeName;

  /**
   * List of child {@link Option} properties.
   *
   * Each property is validated in declaration order, including its own
   * {@link Argument.validate} function if one is defined. Property validators run before the
   * validator of this complex option. A property's `defaultValue` is used when it is absent,
   * and an absent property with `isOptional` is skipped.
   */
  readonly properties: ReadonlyArray<Option | ComplexOption>;

  /**
   * Default value for the argument if not specified.
   */
  readonly defaultValue?: Values | Array<Values>;
}
