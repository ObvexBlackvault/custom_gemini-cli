// plugin_interface.ts

/** Plugin interface for Gemini CLI extensions. All plugins must implement this interface. */
export interface IPlugin {
  /** Metadata about the plugin. */
  metadata: IPluginMetadata;
  /** Initializes the plugin. */
  initialize(context: IPluginContext): Promise<void>;
  /** Returns an array of commands provided by this plugin. */
  getCommands(): IPluginCommand[];
  /** Cleans up resources when the plugin is unloaded (optional). */
  cleanup?(): Promise<void>;
  /** Returns the JSON schema for the plugin's configuration (optional). */
  getConfigSchema?(): any;
  /** Validates the provided configuration against the plugin's schema (optional). */
  validateConfig?(config: any): boolean;
}

/** Metadata for a plugin. */
export interface IPluginMetadata {
  /** Unique identifier for the plugin (e.g., 'my-awesome-plugin'). */
  id: string;
  /** Human-readable name of the plugin. */
  name: string;
  /** Current version of the plugin (semantic versioning, e.g., '1.0.0'). */
  version: string;
  /** A brief description of what the plugin does. */
  description: string;
  /** The author(s) of the plugin. */
  author: string;
  /** Minimum required version of the Gemini CLI for this plugin to function. */
  minCliVersion: string;
  /** Optional list of other plugin IDs that this plugin depends on. */
  dependencies?: string[];
}

/** Defines a command that a plugin can register with the CLI. */
export interface IPluginCommand {
  /** The name of the command (e.g., 'generate-code'). */
  name: string;
  /** A brief description of the command's purpose. */
  description: string;
  /** Optional aliases for the command. */
  aliases?: string[];
  /** Optional array of options/arguments the command accepts. */
  options?: IPluginCommandOption[];
  /** The handler function that executes the command logic. */
  handler: (args: any, context: IPluginContext) => Promise<IPluginResult>;
}

/** Defines an option or argument for a plugin command. */
export interface IPluginCommandOption {
  /** The name of the option (e.g., 'prompt', 'language'). */
  name: string;
  /** A description of the option's purpose. */
  description: string;
  /** The data type of the option's value. */
  type: 'string' | 'number' | 'boolean' | 'array';
  /** Whether the option is required. */
  required?: boolean;
  /** Default value for the option if not provided. */
  default?: any;
  /** Optional array of valid choices for the option. */
  choices?: string[];
}

/** The context object provided to plugins, offering access to CLI resources. */
export interface IPluginContext {
  /** Interface to interact with Gemini AI services. */
  gemini: IGeminiAPI;
  /** Utilities for safe file system operations. */
  fs: IFileSystemAPI;
  /** Logger instance for plugin output. */
  logger: ILogger;
  /** The current working directory where the CLI command was invoked. */
  cwd: string;
  /** User configuration object, potentially including plugin-specific settings. */
  config: any;
  /** Optional project context information if the command is run within a recognized project. */
  project?: IProjectContext;
}

/** Interface for interacting with Gemini AI models. */
export interface IGeminiAPI {
  /** Generates text based on a given prompt. */
  generateText(prompt: string, options?: IGenerateTextOptions): Promise<string>;
  /** Generates code based on a given prompt and optional language. */
  generateCode(
    prompt: string,
    language?: string,
    options?: IGenerateCodeOptions,
  ): Promise<string>;
  /** Engages in a chat conversation with the Gemini model. */
  chat(messages: IChatMessage[], options?: IChatOptions): Promise<string>;
}

/** Interface for safe file system operations within the plugin context. */
export interface IFileSystemAPI {
  /** Reads the content of a file. */
  readFile(path: string): Promise<string>;
  /** Writes content to a file, overwriting it if it exists. */
  writeFile(path: string, content: string): Promise<void>;
  /** Appends content to an existing file. */
  appendFile(path: string, content: string): Promise<void>;
  /** Checks if a file or directory exists at the given path. */
  exists(path: string): Promise<boolean>;
  /** Creates a directory. */
  mkdir(path: string, options?: { recursive?: boolean }): Promise<void>;
  /** Reads the contents of a directory. */
  readdir(path: string): Promise<string[]>;
  /** Gets file system statistics for a given path. */
  stat(path: string): Promise<IFileStats>;
  /** Copies a file from source to destination. */
  copy(src: string, dest: string): Promise<void>;
  /** Moves a file from source to destination. */
  move(src: string, dest: string): Promise<void>;
  /** Removes a file or directory. */
  remove(path: string): Promise<void>;
}

/** Interface for logging messages from plugins. */
export interface ILogger {
  /** Logs a debug message. */
  debug(message: string, ...args: any[]): void;
  /** Logs an informational message. */
  info(message: string, ...args: any[]): void;
  /** Logs a warning message. */
  warn(message: string, ...args: any[]): void;
  /** Logs an error message. */
  error(message: string, ...args: any[]): void;
}

/** Standard result format for plugin command execution. */
export interface IPluginResult {
  /** True if the operation was successful, false otherwise. */
  success: boolean;
  /** An optional success message. */
  message?: string;
  /** An optional error message if the operation failed. */
  error?: string;
  /** Optional data returned by the command. */
  data?: any;
  /** Optional list of file paths created or modified by the command. */
  files?: string[];
}

/** Options for text generation with Gemini. */
export interface IGenerateTextOptions {
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  topK?: number;
  stopSequences?: string[];
}

/** Options for code generation with Gemini. */
export interface IGenerateCodeOptions extends IGenerateTextOptions {
  style?: 'functional' | 'oop' | 'procedural';
  framework?: string;
  includeComments?: boolean;
  includeTests?: boolean;
}

/** Structure for a chat message. */
export interface IChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/** Options for chat interactions with Gemini. */
export interface IChatOptions extends IGenerateTextOptions {
  systemPrompt?: string;
  context?: string;
}

/** File system statistics. */
export interface IFileStats {
  isFile(): boolean;
  isDirectory(): boolean;
  size: number;
  mtime: Date; // Modification time
  ctime: Date; // Creation time
}

/** Contextual information about the current project. */
export interface IProjectContext {
  name: string;
  path: string;
  type: string; // e.g., 'web-app', 'api-server', 'library'
  language?: string;
  framework?: string;
  dependencies?: string[];
  packageManager?: string; // e.g., 'npm', 'yarn', 'pnpm'
}

/** Factory function type for creating plugin instances. */
export type PluginFactory = () => IPlugin;
