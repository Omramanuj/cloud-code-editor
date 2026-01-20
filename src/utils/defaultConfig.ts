import { EditorConfig } from '../types';
import { MemoryStorageAdapter } from '../server/storage/memory';

/**
 * Creates a default configuration with sensible defaults
 * Only requires minimal config - everything else has defaults
 */
export function createDefaultConfig(overrides: Partial<EditorConfig> = {}): EditorConfig {
  const defaultConfig: EditorConfig = {
    // Storage defaults to in-memory (no config needed!)
    storage: {
      type: 'custom',
      custom: new MemoryStorageAdapter(),
    },

    // Execution disabled by default (no API keys needed)
    execution: {
      enabled: false,
    },

    // Layout defaults
    layout: {
      showFileTree: true,
      showTerminal: true,
      showCodeEditor: true,
      showTabBar: true,
      fileTreeWidth: 256,
      terminalHeight: 256,
      resizable: true,
    },

    // Theme defaults (glassmorphism dark theme)
    theme: {
      mode: 'dark',
      editorTheme: 'glass-dark',
    },

    // Auto-save defaults
    autoSave: {
      enabled: true,
      debounceMs: 1000,
      maxIntervalMs: 120000,
      saveOnBlur: true,
      saveOnClose: true,
      batchMultipleFiles: true,
    },

    // Editor defaults
    editor: {
      readOnly: false,
      fontSize: 14,
      lineNumbers: 'on',
      minimap: true,
      wordWrap: 'on',
      tabSize: 4,
      formatOnSave: true,
    },

    // File tree defaults
    fileTree: {
      showHiddenFiles: false,
      sortBy: 'name',
      allowCreate: true,
      allowDelete: true,
      allowRename: true,
    },

    // Terminal defaults
    terminal: {
      clearOnRun: true,
      showTimestamps: true,
      maxBufferSize: 10000,
      ansiColors: true,
      fontSize: 14,
    },

    // Initial state
    initialState: {
      projectId: 'default-project',
      files: {},
    },
  };

  // Deep merge overrides
  return deepMerge(defaultConfig, overrides);
}

/**
 * Deep merge utility
 */
function deepMerge(target: any, source: any): any {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output;
}

function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}
