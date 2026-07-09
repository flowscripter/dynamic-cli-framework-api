# dynamic-cli-framework-api

[![version](https://img.shields.io/github/v/release/flowscripter/dynamic-cli-framework-api?sort=semver)](https://github.com/flowscripter/dynamic-cli-framework-api/releases)
[![build](https://img.shields.io/github/actions/workflow/status/flowscripter/dynamic-cli-framework-api/release-bun-library.yml)](https://github.com/flowscripter/dynamic-cli-framework-api/actions/workflows/release-bun-library.yml)
[![coverage](https://codecov.io/gh/flowscripter/dynamic-cli-framework-api/branch/main/graph/badge.svg?token=EMFT2938ZF)](https://codecov.io/gh/flowscripter/dynamic-cli-framework-api)
[![docs](https://img.shields.io/badge/docs-API-blue)](https://flowscripter.github.io/dynamic-cli-framework-api/index.html)
[![license: MIT](https://img.shields.io/github/license/flowscripter/dynamic-cli-framework-api)](https://github.com/flowscripter/dynamic-cli-framework-api/blob/main/LICENSE)

> Plugin-facing API for the [dynamic-cli-framework](https://github.com/flowscripter/dynamic-cli-framework)

:
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

## License

MIT © Flowscripter
