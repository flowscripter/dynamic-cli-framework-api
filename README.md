# dynamic-cli-framework-api

[![version](https://img.shields.io/github/v/release/flowscripter/dynamic-cli-framework-api?sort=semver)](https://github.com/flowscripter/dynamic-cli-framework-api/releases)
[![build](https://img.shields.io/github/actions/workflow/status/flowscripter/dynamic-cli-framework-api/release-bun-library.yml)](https://github.com/flowscripter/dynamic-cli-framework-api/actions/workflows/release-bun-library.yml)
[![coverage](https://codecov.io/gh/flowscripter/dynamic-cli-framework-api/branch/main/graph/badge.svg?token=EMFT2938ZF)](https://codecov.io/gh/flowscripter/dynamic-cli-framework-api)
[![docs](https://img.shields.io/badge/docs-API-blue)](https://flowscripter.github.io/dynamic-cli-framework-api/index.html)
[![license: MIT](https://img.shields.io/github/license/flowscripter/dynamic-cli-framework-api)](https://github.com/flowscripter/dynamic-cli-framework-api/blob/main/LICENSE)

> API for the [dynamic-cli-framework](https://github.com/flowscripter/dynamic-cli-framework)

## Usage

Plugin authors should depend on this package (not the full
`@flowscripter/dynamic-cli-framework`) as a `peerDependency`:

```jsonc
{
  "peerDependencies": {
    "@flowscripter/dynamic-cli-framework-api": "*",
  },
}
```

Key exports:

- `createCLIPlugin` - scaffolding helper to build a `CLIPlugin` from a `CommandFactory` and/or `ServiceProviderFactory`.
- `CommandFactory`, `ServiceProviderFactory` - extension interfaces implemented by a plugin.
- `Command`, `SubCommand`, `GlobalCommand`, `GroupCommand` - command types.
- `Context`, `CLIConfig` - runtime context passed to commands.
- Core service interfaces and their `*_SERVICE_ID` identifiers (`PrinterService`, `TableGeneratorService`, `SyntaxHighlighterService`, etc.) used to look up services via `Context`.

See [dynamic-cli-framework](https://github.com/flowscripter/dynamic-cli-framework)
for the runnable framework and its concrete service implementations.

# Development

Install dependencies:

`bun install`

Build (produces `dist/` for Node.js and TypeScript consumers; Bun uses raw source directly):

`bun run build`

Format:

`bunx oxfmt`

Lint:

`bunx oxlint index.ts src/ tests/`

Generate HTML API Documentation:

`bunx typedoc index.ts`

## License

MIT © Flowscripter
