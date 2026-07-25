/**
 * The type of a single value which is supported.
 *
 * NOTE: JavaScript does not have a special runtime value for INTEGER so this is covered by `number`.
 * NOTE: `string` is also used for PASSWORD and SECRET values.
 */
export type SingleValueType = number | string | boolean;

/**
 * The type of a value can be: `boolean`, `number` or `string` or an array of these.
 */
export type ValueType = SingleValueType | Array<SingleValueType>;

/**
 * A container object for populated values.
 *
 * The following are all valid examples:
 *
 * * `{ }`
 * * `{ foo: 1 }`
 * * `{ foo: true }`
 * * `{ foo: 'bar' }`
 * * `{ foo: [ 1, 2 ] }`
 * * `{ foo: [ true, true ] }`
 * * `{ foo: [ 'bar', 'gar' ] }`
 * * `{ foo: { a: 1 } }`
 * * `{ foo: { a: { b: 'c'} } }`
 * * `{ foo: [ { a: { b: 'c'} }, { a: { b: 'c'} } ] }`
 *
 * An array of arrays is not allowed, so the following is an INVALID example:
 *
 * * `{ foo: [ [ 1, 2 ], [3, 4 ] ] }`
 */
export type Values = {
  [name: string]: ValueType | Values | Array<Values>;
};

/**
 * Populated single value type is very similar to {@link SingleValueType} but allows for an illegal
 * undefined value.
 */
export type PopulatedSingleValueType = SingleValueType | undefined;

/**
 * Populated value types are very similar to {@link ValueType} but allow for illegal
 * undefined values.
 */
export type PopulatedValueType = PopulatedSingleValueType | Array<PopulatedSingleValueType>;

/**
 * Populated values are very similar to {@link Values} but allow for illegal
 * undefined properties and array entries.
 */
export interface PopulatedValues {
  [name: string]:
    | PopulatedValueType
    | PopulatedValues
    | Array<PopulatedValues | undefined>
    | undefined;
}
