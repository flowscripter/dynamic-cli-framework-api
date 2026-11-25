## Notes

- No tests directory; checks are `npx tsc --noEmit`, `npx oxlint index.ts src/`, `npx oxfmt --check index.ts src/`, `bun run build`.
- `UpgradeService.checkForUpgrade()` / `upgrade()` take only `installMethod?` since 5.0.0 (PR #35); OS/arch overrides were removed (dynamic-cli-framework#225).
