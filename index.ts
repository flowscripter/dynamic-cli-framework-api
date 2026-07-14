// Argument API
export type { default as Argument } from "./src/argument/Argument.ts";
export type {
  ArgumentSingleValueType,
  ArgumentValues,
  ArgumentValueType,
  PopulatedArgumentSingleValueType,
  PopulatedArgumentValues,
  PopulatedArgumentValueType,
} from "./src/argument/ArgumentValueTypes.ts";
export { ArgumentValueTypeName, ComplexValueTypeName } from "./src/argument/ArgumentValueTypes.ts";
export type { default as ComplexOption } from "./src/argument/ComplexOption.ts";
export { MAXIMUM_COMPLEX_OPTION_NESTING_DEPTH } from "./src/argument/ComplexOption.ts";
export type { default as SubCommandArgument } from "./src/argument/SubCommandArgument.ts";
export { MAXIMUM_ARGUMENT_ARRAY_SIZE } from "./src/argument/SubCommandArgument.ts";
export type { default as GlobalCommandArgument } from "./src/argument/GlobalCommandArgument.ts";
export type { default as Option } from "./src/argument/Option.ts";
export type { default as Positional } from "./src/argument/Positional.ts";

// Command API
export type { default as Command } from "./src/command/Command.ts";
export type { default as GlobalCommand } from "./src/command/GlobalCommand.ts";
export type { default as GlobalModifierCommand } from "./src/command/GlobalModifierCommand.ts";
export type { default as GroupCommand } from "./src/command/GroupCommand.ts";
export type { default as SubCommand } from "./src/command/SubCommand.ts";
export type { default as UsageExample } from "./src/command/UsageExample.ts";

// Service API
export type { ServiceInfo, ServiceProvider } from "./src/service/ServiceProvider.ts";

// Registry API
export type { default as CommandRegistry } from "./src/registry/CommandRegistry.ts";
export type { default as ServiceProviderRegistry } from "./src/registry/ServiceProviderRegistry.ts";

// Core Service IDs and types
export { ASCII_BANNER_GENERATOR_SERVICE_ID } from "./src/service/core/AsciiBannerGeneratorService.ts";
export type { default as AsciiBannerGeneratorService } from "./src/service/core/AsciiBannerGeneratorService.ts";
export type {
  BannerColorEffects,
  BannerGenerateOptions,
  ColorEffect,
  ColorEffectDirection,
  FixedColorEffect,
  GradientColorEffect,
  RainbowColorEffect,
} from "./src/service/core/AsciiBannerGeneratorService.ts";

export { KEY_VALUE_SERVICE_ID } from "./src/service/core/KeyValueService.ts";
export { SECRET_SENTINEL_PREFIX } from "./src/service/core/KeyValueService.ts";
export type { default as KeyValueService } from "./src/service/core/KeyValueService.ts";
export type { default as SecretService } from "./src/service/core/SecretService.ts";

export { PRINTER_SERVICE_ID } from "./src/service/core/PrinterService.ts";
export type { default as PrinterService } from "./src/service/core/PrinterService.ts";
export { Icon, Level, ProgressStyle, SpinnerStyle } from "./src/service/core/PrinterService.ts";

export { SHUTDOWN_SERVICE_ID } from "./src/service/core/ShutdownService.ts";
export type { default as ShutdownService } from "./src/service/core/ShutdownService.ts";

export { SPAWN_SERVICE_ID } from "./src/service/core/SpawnService.ts";
export type { default as SpawnService } from "./src/service/core/SpawnService.ts";
export type { SpawnOptions, SpawnResult } from "./src/service/core/SpawnService.ts";

export { SYNTAX_HIGHLIGHTER_SERVICE_ID } from "./src/service/core/SyntaxHighlighterService.ts";
export type { default as SyntaxHighlighterService } from "./src/service/core/SyntaxHighlighterService.ts";
export type { ColorScheme } from "./src/service/core/SyntaxHighlighterService.ts";

export { PRETTY_PRINTER_SERVICE_ID } from "./src/service/core/PrettyPrinterService.ts";
export type { default as PrettyPrinterService } from "./src/service/core/PrettyPrinterService.ts";

export { IMAGE_PRINTER_SERVICE_ID } from "./src/service/core/ImagePrinterService.ts";
export type { default as ImagePrinterService } from "./src/service/core/ImagePrinterService.ts";

export { TREE_PRINTER_SERVICE_ID } from "./src/service/core/TreePrinterService.ts";
export type { default as TreePrinterService } from "./src/service/core/TreePrinterService.ts";
export type { TreeNode } from "./src/service/core/TreePrinterService.ts";

export { TABLE_GENERATOR_SERVICE_ID } from "./src/service/core/TableGeneratorService.ts";
export type { default as TableGeneratorService } from "./src/service/core/TableGeneratorService.ts";
export {
  Align,
  type CellOptions,
  type ColumnOptions,
  type RowOptions,
  type TableOptions,
} from "./src/service/core/TableGeneratorService.ts";
export { default as Table } from "./src/service/core/Table.ts";

export { DATA_DUMP_GENERATOR_SERVICE_ID } from "./src/service/core/DataDumpGeneratorService.ts";
export type { default as DataDumpGeneratorService } from "./src/service/core/DataDumpGeneratorService.ts";
export {
  type ByteRangeColor,
  DumpFormat,
  type HexDumpGenerateOptions,
} from "./src/service/core/DataDumpGeneratorService.ts";

export { COMPLETION_SERVICE_ID } from "./src/service/core/CompletionService.ts";
export type { default as CompletionService } from "./src/service/core/CompletionService.ts";
export { type CompletionItem, ShellType } from "./src/service/core/CompletionService.ts";

export { PROMPTER_SERVICE_ID } from "./src/service/core/PrompterService.ts";
export type { default as PrompterService } from "./src/service/core/PrompterService.ts";
export {
  type Prompt,
  type PromptOption,
  type PromptResult,
  PromptType,
} from "./src/service/core/PrompterService.ts";

export { ARGUMENT_PROMPTER_SERVICE_ID } from "./src/service/core/ArgumentPrompterService.ts";
export type { default as ArgumentPrompterService } from "./src/service/core/ArgumentPrompterService.ts";
export type { ParseResult } from "./src/ParseResult.ts";

// CLI API
export type { InvalidArgument } from "./src/RunResult.ts";
export type { default as Context } from "./src/Context.ts";
export type { default as RunResult } from "./src/RunResult.ts";
export { InvalidArgumentReason, RunState } from "./src/RunResult.ts";
export type { default as CLIConfig } from "./src/CLIConfig.ts";
export type { default as CLI } from "./src/CLI.ts";

// Plugin API
export type { default as CommandFactory } from "./src/plugin/CommandFactory.ts";
export { DYNAMIC_CLI_FRAMEWORK_COMMAND_FACTORY_EXTENSION_POINT } from "./src/plugin/CommandFactory.ts";
export type { default as ServiceProviderFactory } from "./src/plugin/ServiceProviderFactory.ts";
export { DYNAMIC_CLI_FRAMEWORK_SERVICE_PROVIDER_FACTORY_EXTENSION_POINT } from "./src/plugin/ServiceProviderFactory.ts";
export type {
  Plugin,
  ExtensionDescriptor,
  ExtensionFactory,
  VersionedPluginDescriptor,
  SearchQuery,
} from "@flowscripter/dynamic-plugin-framework";
export type {
  default as CLIPlugin,
  CommandFactoryExtensionDescriptor,
  ServiceProviderFactoryExtensionDescriptor,
} from "./src/plugin/CLIPlugin.ts";
export { default as createCLIPlugin } from "./src/plugin/createCLIPlugin.ts";
export type { CLIPluginOptions } from "./src/plugin/createCLIPlugin.ts";
export { PLUGIN_SERVICE_ID } from "./src/service/core/PluginService.ts";
export type { default as PluginService } from "./src/service/core/PluginService.ts";
