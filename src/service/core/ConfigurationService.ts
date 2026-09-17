export const CONFIGURATION_SERVICE_ID = "@flowscripter/dynamic-cli-framework/configuration-service";

/**
 * Minimal, read/write view of a configuration provider's config file *location*, registered under
 * {@link CONFIGURATION_SERVICE_ID} so any command/task can safely look it up via
 * {@link Context.getServiceById}.
 *
 * Deliberately does NOT expose the config file's *contents* (e.g. a "dump everything" method) -
 * that would hand every command/task a way to read every other command's/service's key-value
 * data (and any secret sentinels embedded in it) in one call, defeating the whole point of
 * `KeyValueService` being scoped per-consumer. A capability that broad is only ever wired
 * directly, at construction time, to the one specific command that legitimately needs it (e.g.
 * `DumpConfigCommand`) - never exposed generally through this interface.
 */
export default interface ConfigurationService {
  readonly configLocation: string | undefined;

  setConfigLocation(location: string): void;
}
