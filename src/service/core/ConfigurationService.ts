export const CONFIGURATION_SERVICE_ID = "@flowscripter/dynamic-cli-framework/configuration-service";

/**
 * Minimal, read/write view of a configuration provider's config file *location*, registered under
 * {@link CONFIGURATION_SERVICE_ID}.
 */
export default interface ConfigurationService {
  readonly configLocation: string | undefined;

  setConfigLocation(location: string): void;
}
