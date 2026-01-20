# Usage Examples

## Basic Example

```tsx
import { EditorLayout } from '@yourname/cloud-code-editor';
import '@yourname/cloud-code-editor/styles';

export default function BasicEditor() {
  const config = {
    storage: {
      type: 'local',
      local: {
        basePath: './projects',
        allowWrite: true,
      },
    },
    initialState: {
      projectId: 'example',
      files: {
        'index.js': {
          content: 'console.log("Hello, World!");',
        },
      },
      activeFile: 'index.js',
    },
  };

  return <EditorLayout config={config} />;
}
```

## With E2B Execution

```tsx
import { EditorLayout } from '@yourname/cloud-code-editor';

export default function EditorWithExecution() {
  const config = {
    storage: {
      type: 'local',
      local: {
        basePath: './projects',
        allowWrite: true,
      },
    },
    execution: {
      enabled: true,
      provider: 'e2b',
      e2b: {
        apiKey: process.env.NEXT_PUBLIC_E2B_API_KEY!,
        timeout: 60000,
      },
    },
    terminal: {
      clearOnRun: true,
      showTimestamps: true,
    },
  };

  return <EditorLayout config={config} />;
}
```

## Custom Theme

```tsx
import { EditorLayout } from '@yourname/cloud-code-editor';

export default function CustomThemeEditor() {
  const config = {
    storage: {
      type: 'local',
      local: { basePath: './projects' },
    },
    theme: {
      mode: 'dark',
      glass: {
        enabled: true,
        blur: 15,
        opacity: 0.8,
        backgroundColor: 'rgba(30, 30, 46, 0.8)',
        borderColor: 'rgba(137, 180, 250, 0.2)',
        borderWidth: 2,
      },
      colors: {
        primary: '#89b4fa',
        secondary: '#cba6f7',
        success: '#a6e3a1',
        error: '#f38ba8',
        warning: '#f9e2af',
      },
      editorTheme: 'vs-dark',
      customVars: {
        'accent-color': '#89b4fa',
        'bg-primary': '#1e1e2e',
      },
    },
  };

  return <EditorLayout config={config} />;
}
```

## Google Cloud Storage

```tsx
import { EditorLayout } from '@yourname/cloud-code-editor';

export default function GCSEditor() {
  const config = {
    storage: {
      type: 'gcs',
      gcs: {
        projectId: 'my-gcp-project',
        bucketName: 'my-code-bucket',
        keyFilename: './gcs-credentials.json',
      },
    },
    initialState: {
      projectId: 'user-123',
    },
  };

  return <EditorLayout config={config} />;
}
```

## Custom Storage Adapter

```tsx
import { EditorLayout, StorageAdapter } from '@yourname/cloud-code-editor';

class DatabaseStorageAdapter implements StorageAdapter {
  async readFile(projectId: string, filePath: string): Promise<string> {
    // Read from database
    const file = await db.files.findOne({ projectId, path: filePath });
    return file.content;
  }

  async writeFile(projectId: string, filePath: string, content: string): Promise<void> {
    // Write to database
    await db.files.upsert({
      projectId,
      path: filePath,
      content,
      updatedAt: new Date(),
    });
  }

  async listFiles(projectId: string): Promise<FileNode[]> {
    // List files from database
    const files = await db.files.findMany({ projectId });
    return buildTree(files);
  }

  async deleteFile(projectId: string, filePath: string): Promise<void> {
    await db.files.delete({ projectId, path: filePath });
  }
}

export default function CustomStorageEditor() {
  const config = {
    storage: {
      type: 'custom',
      custom: new DatabaseStorageAdapter(),
    },
  };

  return <EditorLayout config={config} />;
}
```

## Minimal Layout (No Terminal)

```tsx
import { EditorLayout } from '@yourname/cloud-code-editor';

export default function MinimalEditor() {
  const config = {
    layout: {
      showFileTree: true,
      showTerminal: false,
      showTabBar: true,
    },
    storage: {
      type: 'local',
      local: { basePath: './projects' },
    },
  };

  return <EditorLayout config={config} />;
}
```

## Read-Only Editor

```tsx
import { EditorLayout } from '@yourname/cloud-code-editor';

export default function ReadOnlyEditor() {
  const config = {
    editor: {
      readOnly: true,
    },
    fileTree: {
      allowCreate: false,
      allowDelete: false,
      allowRename: false,
    },
    storage: {
      type: 'local',
      local: {
        basePath: './projects',
        allowWrite: false,
      },
    },
  };

  return <EditorLayout config={config} />;
}
```

## With Callbacks

```tsx
import { EditorLayout } from '@yourname/cloud-code-editor';

export default function EditorWithCallbacks() {
  const config = {
    storage: {
      type: 'local',
      local: { basePath: './projects' },
    },
    callbacks: {
      onSave: async (files) => {
        console.log('Files saved:', Object.keys(files));
        // Sync to external service
        await syncToBackup(files);
      },
      onExecute: (result) => {
        console.log('Execution result:', result);
        if (result.success) {
          showNotification('Code executed successfully!');
        } else {
          showError(result.error);
        }
      },
      onFileSelect: (filePath) => {
        console.log('File selected:', filePath);
        analytics.track('file_selected', { filePath });
      },
      onFileCreate: (filePath) => {
        console.log('File created:', filePath);
      },
      onFileDelete: (filePath) => {
        console.log('File deleted:', filePath);
      },
      onError: (error) => {
        console.error('Editor error:', error);
        errorTracking.captureException(error);
      },
    },
  };

  return <EditorLayout config={config} />;
}
```

## Custom Auto-save

```tsx
import { EditorLayout } from '@yourname/cloud-code-editor';

export default function CustomAutoSaveEditor() {
  const config = {
    storage: {
      type: 'local',
      local: { basePath: './projects' },
    },
    autoSave: {
      enabled: true,
      debounceMs: 5000, // Save after 5 seconds of inactivity
      maxIntervalMs: 30000, // Force save every 30 seconds
      saveOnBlur: true,
      saveOnClose: true,
      batchMultipleFiles: true,
    },
    callbacks: {
      onSave: async (files) => {
        // Custom save logic
        await saveToBackend(files);
      },
    },
  };

  return <EditorLayout config={config} />;
}
```

## Using Hooks Directly

```tsx
import { useAutoSave, useFileOperations, useCodeExecution } from '@yourname/cloud-code-editor';

export default function CustomEditor() {
  const [files, setFiles] = useState<FileMap>({});
  const [activeFile, setActiveFile] = useState<string | null>(null);

  const storage = {
    type: 'local' as const,
    local: { basePath: './projects' },
  };

  const { scheduleSave } = useAutoSave(files, {
    enabled: true,
    debounceMs: 30000,
    storage,
    projectId: 'my-project',
  });

  const { createFile, deleteFile } = useFileOperations({
    storage,
    projectId: 'my-project',
  });

  const { execute, isExecuting, output } = useCodeExecution({
    execution: {
      enabled: true,
      provider: 'e2b',
      e2b: { apiKey: process.env.E2B_API_KEY! },
    },
    projectId: 'my-project',
  });

  return (
    <div>
      {/* Your custom UI */}
      <button onClick={() => createFile('new-file.js', '')}>
        New File
      </button>
      <button onClick={() => execute('index.js', files)}>
        Run Code
      </button>
    </div>
  );
}
```

## Server-Side API Route

```typescript
// app/api/editor/route.ts
import { createEditorAPI } from '@yourname/cloud-code-editor/server';
import { NextRequest } from 'next/server';

const config = {
  storage: {
    type: 'local',
    local: {
      basePath: process.env.PROJECTS_PATH || './projects',
      allowWrite: true,
    },
  },
  execution: {
    enabled: true,
    provider: 'e2b',
    e2b: {
      apiKey: process.env.E2B_API_KEY!,
      timeout: 60000,
    },
  },
};

const handlers = createEditorAPI(config);

export async function GET(req: NextRequest) {
  return handlers.GET(req);
}

export async function POST(req: NextRequest) {
  return handlers.POST(req);
}
```

## Multiple Editor Instances

```tsx
import { EditorLayout } from '@yourname/cloud-code-editor';

export default function MultiEditorPage() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <EditorLayout
        config={{
          storage: {
            type: 'local',
            local: { basePath: './project-a' },
          },
          initialState: { projectId: 'project-a' },
        }}
      />
      <EditorLayout
        config={{
          storage: {
            type: 'local',
            local: { basePath: './project-b' },
          },
          initialState: { projectId: 'project-b' },
        }}
      />
    </div>
  );
}
```

## Light Mode Theme

```tsx
import { EditorLayout } from '@yourname/cloud-code-editor';

export default function LightModeEditor() {
  const config = {
    storage: {
      type: 'local',
      local: { basePath: './projects' },
    },
    theme: {
      mode: 'light',
      glass: {
        enabled: true,
        blur: 10,
        opacity: 0.9,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      editorTheme: 'vs-light',
      colors: {
        primary: '#0066cc',
        secondary: '#6c5ce7',
      },
    },
  };

  return <EditorLayout config={config} />;
}
```

## With File Watching

```tsx
import { EditorLayout } from '@yourname/cloud-code-editor';

export default function WatchedEditor() {
  const config = {
    storage: {
      type: 'local',
      local: {
        basePath: './projects',
        watchForChanges: true, // Auto-reload on external file changes
        allowWrite: true,
      },
    },
  };

  return <EditorLayout config={config} />;
}
```
