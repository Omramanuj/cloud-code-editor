// Storage Adapter Interface
export interface StorageAdapter {
  readFile(projectId: string, filePath: string): Promise<string>;
  writeFile(projectId: string, filePath: string, content: string): Promise<void>;
  listFiles(projectId: string): Promise<FileNode[]>;
  deleteFile(projectId: string, filePath: string): Promise<void>;
  readManifest?(projectId: string): Promise<Manifest>;
  writeManifest?(projectId: string, manifest: Manifest): Promise<void>;
}

// Execution Adapter Interface
export interface ExecutionAdapter {
  execute(projectId: string, entryFile: string, files: FileMap): AsyncGenerator<string>;
  cancel?(executionId: string): Promise<void>;
}

// Supporting Types
export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
  size?: number;
  modified?: Date;
}

export interface FileMap {
  [path: string]: {
    content: string;
    modified?: Date;
    language?: string;
  };
}

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
}

export interface Manifest {
  version: string;
  projectId: string;
  files: FileNode[];
  metadata: Record<string, any>;
  updatedAt: string;
}

// Main Configuration
export interface EditorConfig {
  // Layout Configuration
  layout?: {
    showFileTree?: boolean;        // Default: true
    showTerminal?: boolean;        // Default: true
    showCodeEditor?: boolean;      // Default: true (joke option)
    showTabBar?: boolean;          // Default: true
    fileTreeWidth?: number;        // Default: 250px
    terminalHeight?: number;       // Default: 200px
    resizable?: boolean;           // Default: true
  };

  // Storage Configuration (optional - defaults to in-memory storage)
  storage?: {
    type: 'gcs' | 'local' | 'custom' | 'memory';
    
    // GCS options (required if type is 'gcs')
    gcs?: {
      projectId: string;
      bucketName: string;
      keyFilename?: string;
      credentials?: object;
    };
    
    // Local file options (required if type is 'local')
    local?: {
      basePath: string;            // Path to local files
      watchForChanges?: boolean;   // Auto-reload on external changes
      allowWrite?: boolean;        // Allow file modifications
    };
    
    // Custom storage adapter (required if type is 'custom')
    custom?: StorageAdapter;
  };

  // Execution Configuration (optional - disabled by default)
  execution?: {
    enabled?: boolean;             // Default: false (no API keys needed)
    provider?: 'e2b' | 'custom';
    
    // E2B options (required if provider is 'e2b')
    e2b?: {
      apiKey: string;
      timeout?: number;            // Default: 30000ms
      template?: string;           // Custom E2B template
    };
    
    // Custom executor (required if provider is 'custom')
    custom?: ExecutionAdapter;
  };

  // Theme Configuration
  theme?: {
    mode?: 'dark' | 'light' | 'auto';  // Default: 'dark'
    
    // Glassmorphism settings
    glass?: {
      enabled?: boolean;           // Default: true
      blur?: number;               // Default: 10px
      opacity?: number;            // Default: 0.7 (0-1)
      backgroundColor?: string;    // Default: 'rgba(17, 24, 39, 0.7)'
      borderColor?: string;        // Default: 'rgba(255, 255, 255, 0.1)'
      borderWidth?: number;        // Default: 1px
    };
    
    // Monaco editor theme
    editorTheme?: 'vs-dark' | 'vs-light' | 'hc-black' | string;
    
    // Accent colors
    colors?: {
      primary?: string;            // Default: '#3b82f6'
      secondary?: string;          // Default: '#8b5cf6'
      success?: string;            // Default: '#10b981'
      error?: string;              // Default: '#ef4444'
      warning?: string;            // Default: '#f59e0b'
    };
    
    // Custom CSS variables
    customVars?: Record<string, string>;
  };

  // Auto-save Configuration
  autoSave?: {
    enabled?: boolean;             // Default: true
    debounceMs?: number;           // Default: 30000
    maxIntervalMs?: number;        // Default: 120000
    saveOnBlur?: boolean;          // Default: true
    saveOnClose?: boolean;         // Default: true
    batchMultipleFiles?: boolean;  // Default: true
  };

  // Editor Behavior
  editor?: {
    readOnly?: boolean;            // Default: false
    fontSize?: number;             // Default: 14
    lineNumbers?: 'on' | 'off' | 'relative';  // Default: 'on'
    minimap?: boolean;             // Default: true
    wordWrap?: 'on' | 'off' | 'wordWrapColumn' | 'bounded';
    tabSize?: number;              // Default: 2
    formatOnSave?: boolean;        // Default: true
  };

  // File Tree Behavior
  fileTree?: {
    showHiddenFiles?: boolean;     // Default: false
    sortBy?: 'name' | 'type' | 'modified';  // Default: 'name'
    allowCreate?: boolean;         // Default: true
    allowDelete?: boolean;         // Default: true
    allowRename?: boolean;         // Default: true
    customIcons?: Record<string, string>;  // File extension → icon
  };

  // Terminal Behavior
  terminal?: {
    clearOnRun?: boolean;          // Default: true
    showTimestamps?: boolean;      // Default: true
    maxBufferSize?: number;        // Default: 10000 lines
    ansiColors?: boolean;          // Default: true
    fontSize?: number;             // Default: 13
  };

  // Callbacks
  callbacks?: {
    onSave?: (files: FileMap) => void | Promise<void>;
    onExecute?: (result: ExecutionResult) => void;
    onError?: (error: Error) => void;
    onFileSelect?: (filePath: string) => void;
    onFileCreate?: (filePath: string) => void;
    onFileDelete?: (filePath: string) => void;
  };

  // Initial State
  initialState?: {
    projectId?: string;
    files?: FileMap;
    activeFile?: string;
    openFiles?: string[];
  };

  // API Configuration (if using server handlers)
  api?: {
    basePath?: string;             // Default: '/api/editor'
    customHeaders?: Record<string, string>;
  };
}
