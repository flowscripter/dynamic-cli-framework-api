# dynamic-cli-framework-api

Plugin-facing API for the
[dynamic-cli-framework](https://github.com/flowscripter/dynamic-cli-framework):
the types, interfaces and constants a plugin author needs to implement a
`CommandFactory` or `ServiceProviderFactory`, without pulling in the
framework's concrete runtime implementations (and their dependencies such as
`figlet`, `emphasize`, `highlight.js` and `prettier`).

## Usage

Plugin authors should depend on this package (not the full
`@flowscripter/dynamic-cli-framework`) as a `peerDependency`:

```jsonc
{
  "peerDependencies": {
    "@flowscripter/dynamic-cli-framework-api": "*"
  }
}
```

```ts
import { createCLIPlugin, ArgumentValueTypeName, PRINTER_SERVICE_ID } from "@flowscripter/dynamic-cli-framework-api";
```

Key exports:

- `createCLIPlugin` - scaffolding helper to build a `CLIPlugin` from a `CommandFactory` and/or `ServiceProviderFactory`.
- `CommandFactory`, `ServiceProviderFactory` - extension interfaces implemented by a plugin.
- `Command`, `SubCommand`, `GlobalCommand`, `GroupCommand` - command types.
- `Context`, `CLIConfig` - runtime context passed to commands.
- Core service interfaces and their `*_SERVICE_ID` identifiers (`PrinterService`, `TableGeneratorService`, `SyntaxHighlighterService`, etc.) used to look up services via `Context`.

See [dynamic-cli-framework](https://github.com/flowscripter/dynamic-cli-framework)
for the runnable framework and its concrete service implementations.

## Development

```bash
bun install
bun run build
bun test
bunx oxlint index.ts src/
```
