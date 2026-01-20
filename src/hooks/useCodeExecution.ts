'use client';
import { useState, useCallback } from 'react';
import { FileMap, ExecutionResult, EditorConfig } from '../types';

export interface UseCodeExecutionOptions {
  execution?: EditorConfig['execution'];
  projectId: string;
  onResult?: (result: ExecutionResult) => void;
  onError?: (error: Error) => void;
}

export function useCodeExecution(options: UseCodeExecutionOptions) {
  const { execution, projectId, onResult, onError } = options;
  const [isExecuting, setIsExecuting] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [currentResult, setCurrentResult] = useState<ExecutionResult | null>(null);

  const execute = useCallback(async (entryFile: string, files: FileMap) => {
    if (!execution?.enabled) {
      const error = new Error('Execution is not enabled');
      onError?.(error);
      throw error;
    }

    setIsExecuting(true);
    setOutput([]);
    const startTime = Date.now();

    try {
      if (execution.provider === 'e2b' && execution.e2b) {
        // E2B execution via API
        const response = await fetch('/api/editor/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectId,
            entryFile,
            files,
          }),
        });

        if (!response.ok) {
          throw new Error('Execution failed');
        }

        // Handle streaming response
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        const outputLines: string[] = [];

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter((l) => l.trim());

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.slice(6));
                  if (data.output) {
                    outputLines.push(data.output);
                    setOutput((prev) => [...prev, data.output]);
                  } else if (data.error) {
                    outputLines.push(data.error);
                    setOutput((prev) => [...prev, data.error]);
                  }
                } catch (e) {
                  outputLines.push(line);
                  setOutput((prev) => [...prev, line]);
                }
              } else {
                outputLines.push(line);
                setOutput((prev) => [...prev, line]);
              }
            }
          }
        }

        const executionTime = Date.now() - startTime;
        const result: ExecutionResult = {
          success: true,
          output: outputLines.join('\n'),
          executionTime,
        };

        setCurrentResult(result);
        onResult?.(result);
        return result;
      } else if (execution.provider === 'custom' && execution.custom) {
        // Custom executor
        const outputLines: string[] = [];

        for await (const outputLine of execution.custom.execute(projectId, entryFile, files)) {
          outputLines.push(outputLine);
          setOutput((prev) => [...prev, outputLine]);
        }

        const executionTime = Date.now() - startTime;
        const result: ExecutionResult = {
          success: true,
          output: outputLines.join('\n'),
          executionTime,
        };

        setCurrentResult(result);
        onResult?.(result);
        return result;
      } else {
        throw new Error('No execution provider configured');
      }
    } catch (error) {
      const executionTime = Date.now() - startTime;
      const err = error as Error;
      const result: ExecutionResult = {
        success: false,
        output: output.join('\n'),
        error: err.message,
        executionTime,
      };

      setCurrentResult(result);
      onError?.(err);
      onResult?.(result);
      throw err;
    } finally {
      setIsExecuting(false);
    }
  }, [execution, projectId, onResult, onError]);

  const cancel = useCallback(async () => {
    if (execution?.provider === 'custom' && execution.custom?.cancel) {
      // Would need execution ID from execute call
      // This is a simplified version
      setIsExecuting(false);
    }
  }, [execution]);

  const clearOutput = useCallback(() => {
    setOutput([]);
    setCurrentResult(null);
  }, []);

  return {
    execute,
    cancel,
    clearOutput,
    isExecuting,
    output,
    currentResult,
  };
}
