'use client';
import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { FileMap, EditorConfig } from '../types';
import { TabBar } from './TabBar';
import { getLanguageFromPath } from '../utils/file-helpers';

export interface CodeEditorProps {
  files: FileMap;
  activeFile: string | null;
  onFileChange: (filePath: string, content: string) => void;
  onFileSelect?: (filePath: string) => void;
  onFileClose?: (filePath: string) => void;
  config: {
    editor?: EditorConfig['editor'];
    autoSave?: EditorConfig['autoSave'];
    storage?: EditorConfig['storage'];
    theme?: EditorConfig['theme'];
    callbacks?: EditorConfig['callbacks'];
  };
  showTabBar?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  files,
  activeFile,
  onFileChange,
  onFileSelect,
  onFileClose,
  config,
  showTabBar = true,
}) => {
  const [openFiles, setOpenFiles] = React.useState<string[]>([]);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (activeFile && !openFiles.includes(activeFile)) {
      setOpenFiles((prev) => [...prev, activeFile]);
    }
  }, [activeFile, openFiles]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Read the global CSS variable for consistent editor background
    const root = document.documentElement;
    const editorBg = getComputedStyle(root).getPropertyValue('--editor-background').trim() || '#1a1a1a';
    
    // Define glass-dark theme matching frontend
    monaco.editor.defineTheme('glass-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        // Use global variable for consistent colors throughout
        'editor.background': editorBg,
        'editorWidget.background': editorBg,
        'editorWidget.border': 'rgba(255, 255, 255, 0.1)',
        'editor.lineHighlightBackground': 'rgba(255, 255, 255, 0.05)',
        'editor.selectionBackground': 'rgba(255, 255, 255, 0.15)',
        'minimap.background': editorBg,
        'minimap.selectionHighlight': 'rgba(255, 255, 255, 0.2)',
        'minimap.selectionOccurrenceHighlight': 'rgba(255, 255, 255, 0.15)',
      },
    });
    
    // Apply theme
    monaco.editor.setTheme(config.theme?.editorTheme || 'glass-dark');
  };

  const handleEditorChange = (value: string | undefined) => {
    if (activeFile && value !== undefined) {
      onFileChange(activeFile, value);
    }
  };

  const handleFileClose = (filePath: string) => {
    setOpenFiles((prev) => prev.filter((f) => f !== filePath));
    if (activeFile === filePath && openFiles.length > 1) {
      const index = openFiles.indexOf(filePath);
      const newActive = index > 0 ? openFiles[index - 1] : openFiles[index + 1];
      if (newActive && onFileSelect) {
        onFileSelect(newActive);
      }
    }
    onFileClose?.(filePath);
  };

  const currentFile = activeFile ? files[activeFile] : null;
  const language = activeFile ? getLanguageFromPath(activeFile) : 'plaintext';

  return (
    <div className="h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden glass-panel [&_.monaco-editor]:bg-transparent">
      {showTabBar && (
        <TabBar
          files={files}
          openFiles={openFiles}
          activeFile={activeFile}
          onFileSelect={onFileSelect || (() => {})}
          onFileClose={handleFileClose}
          showTabBar={showTabBar}
        />
      )}
      <div className="flex-1 overflow-hidden">
        {activeFile && currentFile ? (
          <Editor
            height="100%"
            language={language}
            value={currentFile.content}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            theme={config.theme?.editorTheme || 'glass-dark'}
            options={{
              readOnly: config.editor?.readOnly || false,
              fontSize: config.editor?.fontSize || 14,
              lineNumbers: config.editor?.lineNumbers || 'on',
              minimap: { enabled: config.editor?.minimap !== false },
              wordWrap: config.editor?.wordWrap || 'on',
              tabSize: config.editor?.tabSize || 4,
              insertSpaces: true,
              automaticLayout: true,
              scrollBeyondLastLine: false,
              formatOnPaste: true,
              formatOnType: true,
              roundedSelection: false,
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white/60">
            <div className="text-center">
              <p className="text-lg mb-2">No file selected</p>
              <p className="text-sm">Select a file from the sidebar to start editing</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
