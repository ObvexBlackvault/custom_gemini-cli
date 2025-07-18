import {
  IPlugin,
  IPluginMetadata,
  IPluginCommand,
  IPluginContext,
  IPluginResult,
} from './plugin_interface.js';

interface GenerateCodeArgs {
  prompt: string;
  language?: string;
  output?: string;
  templatePath?: string;
  format?: 'raw' | 'markdown' | 'json';
}

interface BuildProgramArgs {
  description: string;
  template?: string;
  language?: string;
}

class PromptEngineeringPlugin implements IPlugin {
  metadata: IPluginMetadata = {
    id: 'prompt-engineering-plugin',
    name: 'Prompt Engineering Plugin',
    version: '1.1.0',
    description:
      'A plugin for generating code and programs using advanced prompt engineering, templates, and flexible output formats.',
    author: 'Manus AI',
    minCliVersion: '1.0.0',
  };

  async initialize(context: IPluginContext): Promise<void> {
    context.logger.info('[PromptEngineeringPlugin] Initialized');
  }

  getCommands(): IPluginCommand[] {
    return [
      {
        name: 'generate-code',
        description:
          'Generate code from a prompt or template, with advanced output options',
        options: [
          {
            name: 'prompt',
            description: 'Prompt for code generation',
            type: 'string',
            required: true,
          },
          {
            name: 'language',
            description: 'Programming language',
            type: 'string',
            required: false,
            default: 'javascript',
          },
          {
            name: 'output',
            description: 'Output file to save code',
            type: 'string',
            required: false,
          },
          {
            name: 'templatePath',
            description: 'Path to a prompt template file',
            type: 'string',
            required: false,
          },
          {
            name: 'format',
            description: 'Output format: raw, markdown, or json',
            type: 'string',
            required: false,
            default: 'raw',
          },
        ],
        handler: this.handleGenerateCode.bind(this),
      },
      {
        name: 'build-program',
        description: 'Build a full program structure from a description',
        options: [
          {
            name: 'description',
            description: 'Description of the program',
            type: 'string',
            required: true,
          },
          {
            name: 'template',
            description: 'Project template (e.g., web-app, cli)',
            type: 'string',
            required: false,
            default: 'web-app',
          },
          {
            name: 'language',
            description: 'Programming language',
            type: 'string',
            required: false,
            default: 'javascript',
          },
        ],
        handler: this.handleBuildProgram.bind(this),
      },
    ];
  }

  private async handleGenerateCode(
    args: GenerateCodeArgs,
    context: IPluginContext,
  ): Promise<IPluginResult> {
    try {
      let prompt = args.prompt;

      // Optional: load and merge prompt template
      if (args.templatePath) {
        try {
          const templateContent = await context.fs.readFile(args.templatePath);
          prompt = templateContent.replace(/\{\{prompt\}\}/g, args.prompt);
        } catch (err) {
          context.logger.warn(
            `[PromptEngineeringPlugin] Failed to load template from ${args.templatePath}: ${(err as Error).message}`,
          );
        }
      }

      const code = await context.gemini.generateCode(prompt, args.language);

      let formattedOutput: any = code;
      switch (args.format) {
        case 'json':
          formattedOutput = { language: args.language, code, prompt };
          break;
        case 'markdown':
          formattedOutput = `\`\`\`${args.language || 'plaintext'}\n${code}\n\`\`\``;
          break;
        // raw/default: leave as-is
      }

      if (args.output) {
        await context.fs.writeFile(args.output, formattedOutput);
        return {
          success: true,
          message: `Code generated and saved to ${args.output}`,
        };
      }
      return {
        success: true,
        message: 'Code generated successfully',
        data: formattedOutput,
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to generate code: ${(error as Error).message}`,
      };
    }
  }

  private async handleBuildProgram(
    args: BuildProgramArgs,
    context: IPluginContext,
  ): Promise<IPluginResult> {
    try {
      const planPrompt = [
        `You are an expert ${args.language} developer.`,
        `Generate a detailed file/folder plan and main entry point for a "${args.template}" project described as:`,
        args.description,
      ].join('\n');

      const plan = await context.gemini.generateText(planPrompt);
      return {
        success: true,
        message: 'Program build plan generated',
        data: plan,
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to build program: ${(error as Error).message}`,
      };
    }
  }
}

export default () => new PromptEngineeringPlugin();
