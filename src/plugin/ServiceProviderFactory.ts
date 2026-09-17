import type { ServiceProvider } from "../service/ServiceProvider.ts";

/**
 * Extension point identifier for {@link ServiceProviderFactory} extensions.
 *
 * Plugins register against this extension point to supply {@link ServiceProvider} instances
 * that are initialised by the runner as part of the normal service lifecycle.
 */
export const DYNAMIC_CLI_FRAMEWORK_SERVICE_PROVIDER_FACTORY_EXTENSION_POINT =
  "DYNAMIC_CLI_FRAMEWORK_SERVICE_PROVIDER_FACTORY";

/**
 * Extension interface implemented by a plugin to provide {@link ServiceProvider} instances.
 *
 * A plugin registers a {@link ServiceProviderFactory} against
 * {@link DYNAMIC_CLI_FRAMEWORK_SERVICE_PROVIDER_FACTORY_EXTENSION_POINT}. On startup,
 * `DynamicPluginRuntimeCLI` (see dynamic-cli-framework) instantiates each factory
 * and adds the returned service providers to the CLI registry before the runner
 * executes, so they participate in the full initialization lifecycle (including
 * {@link GlobalModifierCommand} scanning and {@link ServiceProvider.initService}).
 *
 * Deliberately limited to {@link ServiceProvider} - unlike `launchMultiCommandCLI`/
 * `launchSingleCommandCLI`'s `startupTasks` parameter (see dynamic-cli-framework), a plugin
 * cannot supply a plain `StartupTask` directly. A plugin that needs startup-time behavior with no
 * actual service to provide should still implement it as a `ServiceProvider` whose
 * `getServiceInfo()` returns no `service`.
 */
export default interface ServiceProviderFactory {
  /**
   * Return the {@link ServiceProvider} instances provided by this factory.
   */
  getServiceProviders(): ReadonlyArray<ServiceProvider>;
}
