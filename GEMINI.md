
---

# 📝 **Proposed GEMINI.md (Strict/Technical Project Overview)**

```markdown
# GEMINI.md

## Project Overview

**Gemini CLI** is an extensible, TypeScript-first CLI for leveraging Google Gemini models and AI workflows. It is architected for scale, plugin extensibility, and advanced developer automation.

---

## Technical Architecture

- **Monorepo Structure**: `packages/cli/`, `packages/core/`
- **Plugin System**: Drop-in TypeScript modules in `plugins/`
- **Shared Interfaces**: Define in `shared/plugin_interface.ts` for type-safe plugin contracts
- **Documentation**: All guides and references in `docs/`

---

## Plugin Interface

To create a new plugin:

1. Implement interfaces from `shared/plugin_interface.ts`
2. Place your `.ts` plugin file in `plugins/`
3. Export metadata and register your command(s)

See `plugins/prompt_engineering_plugin.ts` for an implementation example.

---

## Development Workflow

- Use `npm install` to set up dependencies
- `npm run build` to build packages
- `npm test` to run the test suite

Pull requests must pass lint and all tests.

---

## Best Practices

- All code in TypeScript, strict mode enabled
- Modular, well-documented plugin code
- Prefer pure functions for business logic within plugins
- Keep secrets and API keys out of version control

---

## Maintainers & Contribution

- Contribution guidelines: [CONTRIBUTING.md](./CONTRIBUTING.md)
- Maintainers: see [GitHub contributors](https://github.com/google-gemini/gemini-cli/graphs/contributors)
- Code of Conduct and legal: [docs/tos-privacy.md](./docs/tos-privacy.md)

---

## License

See [LICENSE](./LICENSE).
