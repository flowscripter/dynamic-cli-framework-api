import type { SingleValueType, Values, ValueType, ValueTypeName } from "../Value.ts";

/**
 * Interface to be implemented by all {@link Command} arguments.
 */
export default interface Argument {
  /**
   * Type of the argument value.
   */
  readonly type: ValueTypeName;

  /**
   * Optional list of values that the value must match. This is not supported for {@link ValueTypeName.BOOLEAN}.
   */
  readonly allowableValues?: ReadonlyArray<SingleValueType>;

  /**
   * Optional (default is `false`) for {@link ValueTypeName.STRING} when comparing a value against {@link allowableValues}.
   */
  readonly isCaseInsensitive?: boolean;

  /**
   * Optional for {@link ValueTypeName.INTEGER} or {@link ValueTypeName.NUMBER} when validating a value.
   */
  readonly minValueInclusive?: number;

  /**
   * Optional for {@link ValueTypeName.INTEGER} or {@link ValueTypeName.NUMBER} when validating a value.
   */
  readonly maxValueInclusive?: number;

  /**
   * Optional configuration key to use for the argument. Must consist of alphanumeric non-whitespace uppercase
   * ASCII or `_` characters. Must not start with a digit.
   *
   * If not specified a default configuration key is determined as follows: The {@link SubCommandArgument.name} is capitalized
   * and any `-` characters are replaced with `_` characters. If the result starts with a digit, it is
   * prefixed with `_`. Some examples:
   *
   * * name: `FooBar` => configuration key: `FOOBAR`
   * * name: `Hello-World-` => configuration key: `HELLO_WORLD_`
   * * name: `3` => configuration key: `_3`
   *
   * NOTE: Regardless of whether a {@link configurationKey} is specified, or the default is relied upon,
   * it will only be used if the parent {@link Command} has specified {@link Command.enableConfiguration} as `true`.
   */
  readonly configurationKey?: string;

  /**
   * Optional custom validation function invoked after all built-in validation
   * has passed. Receives the validated and type-converted value.
   *
   * Return `undefined` if the value is valid, or a string describing the
   * validation error. The error string is associated with
   * {@link InvalidArgumentReason.CUSTOM_VALIDATION}.
   *
   * Validators declared on properties nested inside {@link ComplexOption.properties} are also
   * invoked, at any depth:
   *
   * * Validation is bottom-up and depth-first, in `properties` declaration order. A property's
   *   validator is invoked after the validators of its own child properties, and only if they all
   *   passed. A parent therefore always receives a fully converted and child-validated value.
   * * Validation stops at the first failure, so later validators are not invoked.
   * * For an argument with `isArray`, the validator is invoked once with the whole converted
   *   array. For an array of {@link ComplexOption} values, the child property validators are
   *   invoked for each element.
   * * An absent nested property with a `defaultValue` is validated using the default value. An
   *   absent nested property with `isOptional` and no default is skipped and its validator is not
   *   invoked.
   * * A nested failure is reported with the full property path as the invalid argument name,
   *   e.g. `opt.sub[2].field`.
   *
   * Example: ensure array values are unique:
   * ```typescript
   * validate: (value) => {
   *   const arr = value as string[];
   *   return new Set(arr).size !== arr.length
   *     ? "values must be unique"
   *     : undefined;
   * }
   * ```
   */
  readonly validate?: (value: ValueType | Values | Array<Values>) => string | undefined;
}
