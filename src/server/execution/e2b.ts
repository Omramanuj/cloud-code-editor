import { ExecutionAdapter } from './base';
import { FileMap } from '../../types';

export interface E2BConfig {
  apiKey: string;
  timeout?: number;
  template?: string;
}

export class E2BExecutor implements ExecutionAdapter {
  private apiKey: string;
  private timeout: number;
  private template: string;

  constructor(config: E2BConfig) {
    this.apiKey = config.apiKey;
    this.timeout = config.timeout || 30000;
    this.template = config.template || 'base';
  }

  async *execute(
    projectId: string,
    entryFile: string,
    files: FileMap
  ): AsyncGenerator<string> {
    // Dynamic import to handle optional dependency
    try {
      // Note: This is a simplified implementation
      // The actual E2B SDK would be used here
      const response = await fetch('https://api.e2b.dev/v1/sandbox/execute', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template: this.template,
          files,
          entryFile,
        }),
      });

      if (!response.ok) {
        throw new Error(`E2B execution failed: ${response.statusText}`);
      }

      // Stream output
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter((l) => l.trim());

          for (const line of lines) {
            yield line;
          }
        }
      }
    } catch (error) {
      throw new Error(
        `E2B execution error: ${(error as Error).message}. Make sure @e2b/code-interpreter is installed.`
      );
    }
  }

  async cancel(executionId: string): Promise<void> {
    // Implementation for canceling execution
    // This would call the E2B API to cancel the running sandbox
  }
}
