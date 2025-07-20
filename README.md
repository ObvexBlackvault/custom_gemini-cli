# Gemini CLI

[![CI](https://github.com/google-gemini/gemini-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/google-gemini/gemini-cli/actions/workflows/ci.yml)
[![Lint](https://github.com/google-gemini/gemini-cli/actions/workflows/lint.yml/badge.svg)](https://github.com/google-gemini/gemini-cli/actions/workflows/lint.yml)
[![Test](https://github.com/google-gemini/gemini-cli/actions/workflows/test.yml/badge.svg)](https://github.com/google-gemini/gemini-cli/actions/workflows/test.yml)

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

## Installation

### Prerequisites

- [Node.js v20+](https://nodejs.org/en/download)
- Works on macOS, Linux, Windows

### Run Directly (No Install)

```bash
npx https://github.com/google-gemini/gemini-cli
```

### Install from NPM

```bash
npm install -g @gemini/cli
```

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/google-gemini/gemini-cli.git
   ```
2. Install dependencies:
   ```bash
   cd gemini-cli
   npm install
   ```
3. Run the CLI:
   ```bash
   npm start
   ```

---

## Demo Commands

Here are a few examples of what you can do with Gemini CLI:

*   **Ask a question about your code:**
    ```bash
    gemini "what is the purpose of the `project_simulator_plugin.ts` file?"
    ```

*   **Generate a new file:**
    ```bash
    gemini "create a new file named 'test.txt' with the content 'hello world'"
    ```

*   **Summarize a file:**
    ```bash
    gemini "summarize the `README.md` file"
    ```

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