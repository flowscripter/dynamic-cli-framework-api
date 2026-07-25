export const KEY_VALUE_SERVICE_ID = "@flowscripter/dynamic-cli-framework/key-value-service";

/**
 * The sentinel prefix used to indicate a value is stored as an OS-native secret.
 * String leaves starting with this prefix are resolved via the {@link SecretService}.
 * This prefix is reserved and must not be used for regular key-value data.
 */
export const SECRET_SENTINEL_PREFIX = "__SECRET__:";

/**
 * Arbitrary JSON-serializable data which can be stored in and retrieved from a
 * {@link KeyValueService}.
 */
export type KeyValueData =
  | string
  | number
  | boolean
  | null
  | KeyValueData[]
  | { [key: string]: KeyValueData };

/**
 * Service providing keystore functionality for the CLI. The keystore data is scoped to the
 * service or {@link Command} instances accessing this service via {@link Context.getServiceById}.
 *
 * Values are arbitrary JSON-serializable data (see {@link KeyValueData}) - not limited to
 * strings - and may be deep objects or arrays.
 *
 * Values can optionally be stored as OS-native secrets using the `isSecret` parameter on
 * {@link set}. When `isSecret` is true, the entire value is serialized as JSON and stored as a
 * single OS-native secret via {@link SecretService}, with only a sentinel reference kept in the
 * key-value Map. The sentinel prefix `__SECRET__:` is reserved.
 *
 * Independently of `isSecret`, {@link get} recursively resolves any string leaf - at any depth
 * within the returned value - which starts with the sentinel prefix, retrieving it via
 * {@link SecretService}. This covers both values written via `set(..., isSecret=true)` and
 * secret references a user hand-embeds directly (nested arbitrarily deep) in the CLI's JSON
 * config file.
 */
export default interface KeyValueService {
  /**
   * Get the value for a specified key in the keystore.
   *
   * Any string leaf within the returned value - at any depth - which is a secret sentinel is
   * resolved to its actual value from the OS secret store.
   */
  get<T extends KeyValueData = KeyValueData>(key: string): Promise<T>;

  /**
   * Set a value for a specified key in the keystore.
   *
   * @param isSecret if true, the entire value is serialized as JSON and stored as a single
   *   entry in the OS-native secret store, with a sentinel reference kept in the key-value Map.
   *   Requires that the service was constructed with secret support enabled.
   */
  set(key: string, value: KeyValueData, isSecret?: boolean): Promise<void>;

  /**
   * Check if a value for a specified key exists in the keystore.
   */
  has(key: string): Promise<boolean>;

  /**
   * Delete the value for a specified key in the keystore.
   * If the stored value is a top-level secret sentinel, the secret is also deleted from the OS
   * secret store. This does not recurse into nested hand-embedded secret references.
   */
  delete(key: string): Promise<void>;
}
