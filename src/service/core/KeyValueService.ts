import type { ArgumentValueType, ArgumentValues } from "../../argument/ArgumentValueTypes.ts";

export const KEY_VALUE_SERVICE_ID = "@flowscripter/dynamic-cli-framework/key-value-service";

/**
 * The sentinel prefix used to indicate a value is stored as an OS-native secret.
 * String leaves starting with this prefix are resolved via the {@link SecretService}.
 * This prefix is reserved and must not be used for regular key-value data.
 */
export const SECRET_SENTINEL_PREFIX = "__SECRET__:";

/**
 * The shape of a value stored/retrieved via {@link KeyValueService.get}/{@link KeyValueService.set}.
 *
 * Reuses the same recursive value shape as {@link ArgumentValues} (primitives, arrays of primitives,
 * nested keyed objects, or arrays of nested objects) - notably `null` is not supported, and neither is
 * an array of arrays (see {@link ArgumentValues}).
 */
export type KeyValueData = ArgumentValueType | ArgumentValues | Array<ArgumentValues>;

/**
 * Wraps a value to mark it for storage as an OS-native secret via {@link SecretService}, when passed to
 * {@link KeyValueService.set}. Can wrap the entire value passed to `set`, or be nested at any depth
 * within a larger object/array passed to `set`.
 */
export class Secret<T extends KeyValueData = KeyValueData> {
  constructor(public readonly value: T) {}
}

/**
 * The shape of a value passed to {@link KeyValueService.set} - like {@link KeyValueData} but allowing
 * {@link Secret}-wrapped values at any depth.
 */
export type SettableKeyValueData =
  | KeyValueData
  | Secret
  | { [key: string]: SettableKeyValueData }
  | Array<SettableKeyValueData>;

/**
 * Service providing keystore functionality for the CLI. The keystore data is scoped to the
 * service or {@link Command} instances accessing this service via {@link Context.getServiceById}.
 *
 * Values are arbitrary JSON-serializable data (see {@link KeyValueData}) - not limited to
 * strings - and may be deep objects or arrays.
 *
 * Any node within a value passed to {@link set} can be wrapped in {@link Secret} to have that
 * node - and only that node - stored as an OS-native secret via {@link SecretService}, with a
 * sentinel reference (prefixed with `__SECRET__:`) kept in its place in the stored structure.
 * Everything else in the value is stored as plain (unencrypted) config data. This is symmetric
 * with {@link get}, which resolves sentinel references found at any depth.
 */
export default interface KeyValueService {
  /**
   * Get the value for a specified key in the keystore.
   *
   * Recursively resolves any string leaf - at any depth within the stored value - which is a
   * secret sentinel, retrieving its actual value via {@link SecretService}. This covers both
   * values written via {@link set} using a nested {@link Secret}, and secret references a user
   * hand-embeds directly (nested arbitrarily deep) in the CLI's JSON config file.
   */
  get<T extends KeyValueData = KeyValueData>(key: string): Promise<T>;

  /**
   * Set a value for a specified key in the keystore.
   *
   * Any node within `value` wrapped in {@link Secret} - at any depth - is serialized as JSON and
   * stored as an OS-native secret via {@link SecretService}, with a sentinel reference kept in
   * its place in the stored structure. All other data is stored as plain (unencrypted) config
   * data. Storing a secret requires that the service was constructed with secret support
   * enabled.
   */
  set(key: string, value: SettableKeyValueData): Promise<void>;

  /**
   * Check if a value for a specified key exists in the keystore.
   */
  has(key: string): Promise<boolean>;

  /**
   * Delete the value for a specified key in the keystore.
   *
   * Recursively walks the stored (unresolved) structure for `key` and deletes every OS-native
   * secret referenced - at any depth - via {@link SecretService}, before removing the key itself.
   */
  delete(key: string): Promise<void>;
}
