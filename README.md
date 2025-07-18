# Gemini CLI

[![Gemini CLI CI](https://github.com/google-gemini/gemini-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/google-gemini/gemini-cli/actions/workflows/ci.yml)

![Gemini CLI Screenshot](./docs/assets/gemini-screenshot.png)

**Gemini CLI** is a professional command-line interface bringing Google Gemini AI into your developer workflows. Query, edit, summarize, and automate codebases with multimodal capabilities and deep project integration.

---

## Features

- **Large context**: Query, edit, and summarize entire codebases (up to and beyond 1M tokens).
- **Multimodal**: Generate new apps from PDFs, sketches, and other formats.
- **Ops automation**: Query pull requests, handle complex rebases, and automate dev tasks.
- **Extensible plugins**: Add your own tools (see `plugins/`), or connect Imagen, Veo, Lyria, etc.
- **Built-in Google Search**: [Ground responses](https://ai.google.dev/gemini-api/docs/grounding) using Google.

---

## Project Structure

- `packages/cli/` — CLI source code
- `packages/core/` — Core business logic and utilities
- `plugins/` — Custom plugins (TypeScript, e.g., `prompt_engineering_plugin.ts`)
- `shared/` — Shared interfaces (e.g., `plugin_interface.ts`)
- `dist/` — Compiled output (generated, do not edit)
- `scripts/` — Build and automation scripts
- `docs/` — Documentation and guides
- `integration-tests/`, `tests/` — Example, regression, and integration tests

---

## Quickstart

### 1. Prerequisites

- [Node.js v20+](https://nodejs.org/en/download)
- Works on macOS, Linux, Windows

### 2. Installation

#### Run Directly (No Install)

```bash
npx https://github.com/google-gemini/gemini-cli
