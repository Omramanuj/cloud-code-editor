'use client';
import React, { useState, useEffect } from 'react';
import { CodeEditor } from './CodeEditor';
import { FileTree } from './FileTree';
import { Terminal } from './Terminal';
import { Toolbar } from './Toolbar';
import { StatusBar } from './StatusBar';
import { GlassPanel } from './ui/GlassPanel';
import { EditorConfig, FileMap } from '../types';
import { applyTheme } from '../utils/theme';
import { createDefaultConfig } from '../utils/defaultConfig';
import { MemoryStorageAdapter } from '../server/storage/memory';

export interface EditorLayoutProps {
  config?: Partial<EditorConfig>; // Now optional - will use defaults
}

export const EditorLayout: React.FC<EditorLayoutProps> = ({ config = {} }) => {
  // Merge user config with defaults
  const fullConfig = createDefaultConfig(config);
  
  const {
    layout = {},
    theme = {},
    storage = {
      type: 'custom',
      custom: new MemoryStorageAdapter(),
    },
    execution,
    autoSave,
    editor,
    fileTree,
    terminal,
    callbacks,
    initialState,
  } = fullConfig;

  const {
    showFileTree = true,
    showTerminal = true,
    showCodeEditor = true,
    showTabBar = true,
    fileTreeWidth = 256,
    terminalHeight = 256,
    resizable = true,
  } = layout;

  const {
    glass = {},
  } = theme;

  const [files, setFiles] = useState<FileMap>(initialState?.files || {});
  const [activeFile, setActiveFile] = useState<string | null>(
    initialState?.activeFile || null
  );
  const [openFiles, setOpenFiles] = useState<string[]>(
    initialState?.openFiles || []
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');

  // Update files when initialState changes (for config switching)
  useEffect(() => {
    if (initialState?.files) {
      console.log('📁 [EditorLayout] Loading files:', Object.keys(initialState.files));
      setFiles(initialState.files);
    }
    if (initialState?.activeFile !== undefined) {
      setActiveFile(initialState.activeFile);
    }
    if (initialState?.openFiles) {
      setOpenFiles(initialState.openFiles);
    }
  }, [initialState]);

  // Apply theme CSS variables
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Handle file selection
  const handleFileSelect = (filePath: string) => {
    setActiveFile(filePath);
    if (!openFiles.includes(filePath)) {
      setOpenFiles((prev) => [...prev, filePath]);
    }
    callbacks?.onFileSelect?.(filePath);
  };

  // Handle file change
  const handleFileChange = (filePath: string, content: string) => {
    setFiles((prev) => ({
      ...prev,
      [filePath]: { content, modified: new Date() },
    }));
    setSaveStatus('unsaved');
  };

  // Handle file close
  const handleFileClose = (filePath: string) => {
    setOpenFiles((prev) => prev.filter((f) => f !== filePath));
    if (activeFile === filePath) {
      const remaining = openFiles.filter((f) => f !== filePath);
      setActiveFile(remaining.length > 0 ? remaining[remaining.length - 1] : null);
    }
  };

  // Easter egg: If showCodeEditor is false, show funny message
  if (!showCodeEditor) {
    return (
      <GlassPanel
        {...glass}
        className="flex items-center justify-center h-screen"
        enableGlass={glass.enabled !== false}
      >
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold mb-4">🤔</h1>
          <p className="text-xl text-white/80">
            A code editor without... code editor?
          </p>
          <p className="text-sm text-white/60 mt-2">
            Set showCodeEditor: true to continue
          </p>
        </div>
      </GlassPanel>
    );
  }

  // Update last saved time when files change
  useEffect(() => {
    if (autoSave?.enabled && saveStatus === 'unsaved') {
      const timer = setTimeout(() => {
        handleSave();
      }, autoSave.debounceMs || 1000);
      return () => clearTimeout(timer);
    }
  }, [files, autoSave?.enabled, saveStatus]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('saving');
    try {
      if (callbacks?.onSave) {
        await callbacks.onSave(files);
      }
      setLastSaved(new Date());
      setSaveStatus('saved');
    } catch (error) {
      setSaveStatus('unsaved');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    try {
      if (callbacks?.onExecute) {
        await callbacks.onExecute({ success: true, output: '', executionTime: 0 });
      }
    } finally {
      setIsRunning(false);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    // Stop execution if callback exists
    if (callbacks?.onError) {
      callbacks.onError(new Error('Execution stopped by user'));
    }
  };

  // Build file tree from files map
  const buildFileTree = (fileMap: FileMap) => {
    if (!fileMap || Object.keys(fileMap).length === 0) {
      console.log('📁 [EditorLayout] No files to build tree from');
      return [];
    }

    const tree: any[] = [];
    const nodeMap = new Map<string, any>();

    Object.keys(fileMap).forEach((path) => {
      const parts = path.split('/');
      let currentPath = '';

      parts.forEach((part, index) => {
        const parentPath = currentPath;
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        const isLast = index === parts.length - 1;

        if (!nodeMap.has(currentPath)) {
          const node = {
            name: part,
            path: currentPath,
            type: isLast ? 'file' : 'directory',
            children: isLast ? [] : [],
          };

          nodeMap.set(currentPath, node);

          if (parentPath) {
            const parent = nodeMap.get(parentPath);
            if (parent && parent.children) {
              parent.children.push(node);
            }
          } else {
            tree.push(node);
          }
        }
      });
    });

    console.log('🌳 [EditorLayout] Built tree with', tree.length, 'root nodes');
    return tree;
  };

  return (
    <div className="h-screen flex flex-col bg-[var(--background)] text-white">
      <Toolbar
        onSave={handleSave}
        onRun={handleRun}
        onStop={handleStop}
        isSaving={isSaving}
        isRunning={isRunning}
      />
      <div className="flex-1 flex overflow-hidden gap-2 p-2">
        {showFileTree && (
          <div className="w-64 rounded-xl overflow-hidden">
            <FileTree
              tree={buildFileTree(files)}
              activeFile={activeFile}
              currentFile={activeFile}
              onFileSelect={handleFileSelect}
              config={fileTree}
              storage={storage}
              projectId={initialState?.projectId || 'default'}
            />
          </div>
        )}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex-1 rounded-xl overflow-hidden">
            <CodeEditor
              files={files}
              activeFile={activeFile}
              onFileChange={handleFileChange}
              onFileSelect={handleFileSelect}
              onFileClose={handleFileClose}
              config={{
                editor,
                autoSave,
                storage,
                theme,
                callbacks,
              }}
              showTabBar={showTabBar}
            />
          </div>
          {showTerminal && (
            <div className="h-64 rounded-xl overflow-hidden">
              <Terminal
                config={terminal}
                execution={execution}
                files={files}
                projectId={initialState?.projectId || 'default'}
                onExecutionResult={(result) => {
                  callbacks?.onExecute?.(result);
                }}
              />
            </div>
          )}
        </div>
      </div>
      <StatusBar
        saveStatus={saveStatus}
        lastSaved={lastSaved}
        currentFile={activeFile}
        isConnected={true}
      />
    </div>
  );
};
