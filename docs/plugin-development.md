# Plugin Development

Gemini CLI's functionality can be extended by creating plugins. Plugins are TypeScript files that are loaded at runtime and can register new commands, interact with the Gemini API, and access the local file system.

## Getting Started

To create a new plugin, you need to create a TypeScript file in the `plugins/` directory. This file must export a default function that returns an instance of a class implementing the `IPlugin` interface.

## The Plugin Interface

The core of plugin development is the `IPlugin` interface, defined in `plugins/plugin_interface.ts`. Your plugin class must implement this interface.

```typescript
export interface IPlugin {
  metadata: IPluginMetadata;
  initialize(context: IPluginContext): Promise<void>;
  getCommands(): IPluginCommand[];
  cleanup?(): Promise<void>;
  getConfigSchema?(): any;
  validateConfig?(config: any): boolean;
}
```

-   `metadata`: An object containing information about the plugin, such as its ID, name, version, and description.
-   `initialize`: An async function that is called when the plugin is loaded. This is a good place to perform any setup tasks.
-   `getCommands`: A function that returns an array of commands that the plugin provides.
-   `cleanup`: (Optional) An async function that is called when the plugin is unloaded. This is a good place to clean up any resources.
-   `getConfigSchema`: (Optional) A function that returns a JSON schema for the plugin's configuration.
-   `validateConfig`: (Optional) A function that validates the provided configuration against the plugin's schema.

## Creating a Plugin

Here's a step-by-step guide to creating a new plugin:

1.  **Create a new file** in the `plugins/` directory (e.g., `my_plugin.ts`).
2.  **Implement the `IPlugin` interface**.
3.  **Define the plugin's metadata**.
4.  **Implement the `initialize` method**.
5.  **Define the commands** that the plugin will provide by implementing the `getCommands` method.
6.  **Export a default function** that returns an instance of your plugin class.

### Example Plugin

Here is an example of a simple plugin that provides a single command to greet the user.

```typescript
// plugins/my_plugin.ts

import {
  IPlugin,
  IPluginMetadata,
  IPluginCommand,
  IPluginContext,
  IPluginResult,
} from './plugin_interface.js';

class MyPlugin implements IPlugin {
  metadata: IPluginMetadata = {
    id: 'my-plugin',
    name: 'My Plugin',
    version: '1.0.0',
    description: 'A simple example plugin.',
    author: 'Your Name',
    minCliVersion: '1.0.0',
  };

  async initialize(context: IPluginContext): Promise<void> {
    context.logger.info('[MyPlugin] Initialized');
  }

  getCommands(): IPluginCommand[] {
    return [
      {
        name: 'hello',
        description: 'Prints a greeting.',
        options: [
          {
            name: 'name',
            description: 'The name to greet.',
            type: 'string',
            required: true,
          },
        ],
        handler: this.handleHello.bind(this),
      },
    ];
  }

  private async handleHello(
    args: { name: string },
    context: IPluginContext,
  ): Promise<IPluginResult> {
    context.logger.info(`Hello, ${args.name}!`);
    return {
      success: true,
      message: 'Greeting successful.',
    };
  }
}

export default () => new MyPlugin();
```

## Sandboxing and Security

When developing plugins, it's important to consider security, especially when your plugin interacts with the file system or executes shell commands.

### File System Access

The `IPluginContext` provides a `fs` object that gives you access to a sandboxed file system API. This API provides a safe way to read and write files within the user's workspace. You should always use this API instead of Node.js's built-in `fs` module.

### Shell Command Execution

The `run_shell_command` tool can be used to execute shell commands. However, this tool should be used with caution, as it can have unintended consequences if not used properly.

When using `run_shell_command`, you should:

-   **Avoid running commands with `sudo` or as a superuser.**
-   **Be careful when running commands that modify the file system**, such as `rm`, `mv`, or `cp`.
-   **Validate any user input** that is used to construct a shell command to prevent command injection attacks.

In general, it's a good practice to limit the scope of your plugin's functionality to only what is necessary. If your plugin doesn't need to access the file system or execute shell commands, then it shouldn't.
