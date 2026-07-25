import type Option from "./Option.ts";
import type { Values } from "../value/Value.ts";
import type { ComplexValueTypeName } from "../value/ValueTypes.ts";

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
   */
  readonly properties: ReadonlyArray<Option | ComplexOption>;

  /**
   * Default value for the argument if not specified.
   */
  readonly defaultValue?: Values | Array<Values>;
}
