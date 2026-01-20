'use client';
import React, { useState, useRef, useEffect } from 'react';
import { EditorConfig, FileMap, ExecutionResult } from '../types';
import { Button } from './ui/Button';
import { cn } from '../utils/cn';

export interface TerminalProps {
  config?: EditorConfig['terminal'];
  execution?: EditorConfig['execution'];
  files: FileMap;
  projectId: string;
  onExecutionResult?: (result: ExecutionResult) => void;
  output?: string;
  isRunning?: boolean;
  onClear?: () => void;
  onClose?: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({
  config = {},
  execution,
  files,
  projectId,
  onExecutionResult,
  output: propOutput,
  isRunning = false,
  onClear,
  onClose,
}) => {
  const [output, setOutput] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const {
    clearOnRun = true,
    showTimestamps = true,
    maxBufferSize = 10000,
    ansiColors = true,
    fontSize = 14,
  } = config;

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output, propOutput]);

  const addOutput = (text: string, type: 'stdout' | 'stderr' = 'stdout') => {
    const timestamp = showTimestamps ? new Date().toLocaleTimeString() : '';
    const prefix = timestamp ? `[${timestamp}] ` : '';
    
    setOutput((prev) => {
      const newOutput = [...prev, `${prefix}${text}`];
      // Limit buffer size
      if (newOutput.length > maxBufferSize) {
        return newOutput.slice(-maxBufferSize);
      }
      return newOutput;
    });
  };

  const executeCode = async () => {
    if (!execution?.enabled) {
      addOutput('Execution is not enabled', 'stderr');
      return;
    }

    if (clearOnRun) {
      setOutput([]);
    }

    setIsExecuting(true);
    const startTime = Date.now();

    try {
      // Find entry file (main.py, index.js, etc.)
      const entryFile = Object.keys(files).find(
        (path) => path.includes('main') || path.includes('index')
      ) || Object.keys(files)[0];

      if (!entryFile) {
        throw new Error('No files to execute');
      }

      addOutput(`Executing ${entryFile}...`);

      if (execution.provider === 'e2b' && execution.e2b) {
        // E2B execution would be handled via API
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
                    addOutput(data.output);
                  } else if (data.error) {
                    addOutput(data.error, 'stderr');
                  }
                } catch (e) {
                  addOutput(line);
                }
              } else {
                addOutput(line);
              }
            }
          }
        }
      } else if (execution.provider === 'custom' && execution.custom) {
        // Custom executor
        for await (const outputLine of execution.custom.execute(projectId, entryFile, files)) {
          addOutput(outputLine);
        }
      }

      const executionTime = Date.now() - startTime;
      const result: ExecutionResult = {
        success: true,
        output: output.join('\n'),
        executionTime,
      };

      onExecutionResult?.(result);
      addOutput(`\nExecution completed in ${executionTime}ms`);
    } catch (error) {
      const executionTime = Date.now() - startTime;
      const errorMessage = (error as Error).message;
      addOutput(`Error: ${errorMessage}`, 'stderr');

      const result: ExecutionResult = {
        success: false,
        output: output.join('\n'),
        error: errorMessage,
        executionTime,
      };

      onExecutionResult?.(result);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleClear = () => {
    setOutput([]);
    onClear?.();
  };

  const displayOutput = propOutput || output.join('\n');
  const isRunningState = isRunning || isExecuting;

  return (
    <div className="flex flex-col h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl glass-panel">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-200 tracking-wide">Terminal</span>
          {isRunningState && (
            <span className="px-2 py-0.5 text-xs bg-blue-500/30 text-blue-300 rounded-md border border-blue-400/20">
              Running...
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClear}
            className="h-7 w-7 p-0 hover:bg-white/10 text-gray-400 hover:text-gray-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
          {onClose && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="h-7 w-7 p-0 hover:bg-white/10 text-gray-400 hover:text-gray-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          )}
        </div>
      </div>
      <div 
        ref={terminalRef}
        className="flex-1 p-4 font-mono bg-transparent overflow-y-auto" 
        style={{ 
          fontFamily: '"JetBrains Mono", "Fira Code", monospace', 
          backgroundColor: 'transparent',
          fontSize: `${fontSize}px`,
          lineHeight: '1.6',
        }}
      >
        {displayOutput ? (
          <pre className="whitespace-pre-wrap break-words text-gray-200">
            {displayOutput}
          </pre>
        ) : (
          <div className="text-white/30 text-sm">
            Terminal output will appear here...
          </div>
        )}
      </div>
    </div>
  );
};
