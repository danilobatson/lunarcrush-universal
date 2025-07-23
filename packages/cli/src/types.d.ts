declare module 'commander' {
  export class Command {
    name(str: string): Command;
    description(str: string): Command;
    version(str: string): Command;
    argument(arg: string, description?: string): Command;
    action(fn: (...args: any[]) => Promise<void> | void): Command;
    parse(argv?: string[]): void;
  }
}

declare module 'prompts' {
  interface PromptObject {
    type: string;
    name: string;
    message: string;
    initial?: any;
    validate?: (value: any) => boolean | string;
  }
  
  function prompts(questions: PromptObject | PromptObject[]): Promise<any>;
  export = prompts;
}

declare module 'fs-extra' {
  export * from 'fs';
  export function readJson(file: string): Promise<any>;
  export function writeJson(file: string, object: any, options?: any): Promise<void>;
  export function writeFile(file: string, data: string): Promise<void>;
  export function ensureDir(dir: string): Promise<void>;
}

declare module 'ora' {
  interface Ora {
    start(text?: string): Ora;
    succeed(text?: string): Ora;
    fail(text?: string): Ora;
  }
  function ora(text?: string): Ora;
  export = ora;
}
