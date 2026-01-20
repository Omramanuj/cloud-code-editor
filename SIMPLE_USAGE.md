# Simple Usage Guide

The Cloud Code Editor package is designed to work with **minimal configuration**. You can get started with just a few lines of code!

## Quick Start (Zero Config)

The simplest way to use the editor - no configuration needed:

```tsx
import { EditorLayout } from '@yourname/cloud-code-editor';

function MyEditor() {
  return <EditorLayout />;
}
```

That's it! The editor will:
- ✅ Use in-memory storage (no setup needed)
- ✅ Work out of the box with default settings
- ✅ Show file tree, editor, and terminal
- ✅ Auto-save enabled by default
- ✅ Beautiful glassmorphism UI

## With Initial Files

Want to start with some files? Just pass them in:

```tsx
import { EditorLayout } from '@yourname/cloud-code-editor';

function MyEditor() {
  return (
    <EditorLayout
      config={{
        initialState: {
          files: {
            'index.js': {
              content: `console.log('Hello World!');`
            },
            'README.md': {
              content: `# My Project\n\nWelcome!`
            }
          }
        }
      }}
    />
  );
}
```

## With Local File Storage

To use local files on your server:

```tsx
import { EditorLayout } from '@yourname/cloud-code-editor';
import path from 'path';

function MyEditor() {
  return (
    <EditorLayout
      config={{
        storage: {
          type: 'local',
          local: {
            basePath: path.join(process.cwd(), 'my-project'),
          }
        }
      }}
    />
  );
}
```

## With Google Cloud Storage

Only configure GCS if you need it:

```tsx
import { EditorLayout } from '@yourname/cloud-code-editor';

function MyEditor() {
  return (
    <EditorLayout
      config={{
        storage: {
          type: 'gcs',
          gcs: {
            projectId: 'my-project',
            bucketName: 'my-bucket',
            // Optional: keyFilename or credentials
          }
        }
      }}
    />
  );
}
```

## With E2B Execution

Only configure E2B if you want code execution:

```tsx
import { EditorLayout } from '@yourname/cloud-code-editor';

function MyEditor() {
  return (
    <EditorLayout
      config={{
        execution: {
          enabled: true,
          provider: 'e2b',
          e2b: {
            apiKey: process.env.E2B_API_KEY, // Required only if enabled
          }
        }
      }}
    />
  );
}
```

## Custom Save Handler

Add a save callback to persist files:

```tsx
import { EditorLayout } from '@yourname/cloud-code-editor';

function MyEditor() {
  return (
    <EditorLayout
      config={{
        callbacks: {
          onSave: async (files) => {
            // Save to your backend
            await fetch('/api/save', {
              method: 'POST',
              body: JSON.stringify({ files }),
            });
          }
        }
      }}
    />
  );
}
```

## Minimal Customization

Customize only what you need:

```tsx
import { EditorLayout } from '@yourname/cloud-code-editor';

function MyEditor() {
  return (
    <EditorLayout
      config={{
        // Only customize what you need
        layout: {
          fileTreeWidth: 300,  // Wider file tree
        },
        editor: {
          fontSize: 16,  // Larger font
        },
        theme: {
          mode: 'dark',  // Already default, but you can change
        }
      }}
    />
  );
}
```

## Complete Example

Here's a complete example with all common options:

```tsx
import { EditorLayout } from '@yourname/cloud-code-editor';

function MyEditor() {
  return (
    <EditorLayout
      config={{
        // Initial files
        initialState: {
          projectId: 'my-project',
          files: {
            'app.js': { content: 'console.log("Hello");' },
            'package.json': { content: '{"name": "my-app"}' },
          },
          activeFile: 'app.js',
        },
        
        // Save handler
        callbacks: {
          onSave: async (files) => {
            console.log('Saving files:', files);
            // Your save logic here
          },
          onFileSelect: (filePath) => {
            console.log('Selected:', filePath);
          }
        },
        
        // Optional: Customize layout
        layout: {
          showTerminal: true,
          terminalHeight: 300,
        },
        
        // Optional: Customize editor
        editor: {
          fontSize: 14,
          minimap: true,
        }
      }}
    />
  );
}
```

## What Has Defaults?

Almost everything! Here's what you **don't need** to configure:

- ✅ Storage (defaults to in-memory)
- ✅ Execution (disabled by default, no API keys needed)
- ✅ Layout (all panels shown by default)
- ✅ Theme (beautiful dark glassmorphism by default)
- ✅ Auto-save (enabled by default)
- ✅ Editor settings (sensible defaults)
- ✅ File tree behavior (works out of the box)
- ✅ Terminal settings (configured by default)

## What Requires Configuration?

Only these features need explicit config:

1. **Google Cloud Storage** - Only if you want GCS storage
   ```tsx
   storage: { type: 'gcs', gcs: { projectId, bucketName } }
   ```

2. **E2B Execution** - Only if you want code execution
   ```tsx
   execution: { enabled: true, provider: 'e2b', e2b: { apiKey } }
   ```

3. **Local File Storage** - Only if you want local files
   ```tsx
   storage: { type: 'local', local: { basePath } }
   ```

Everything else works with zero configuration! 🎉

## Using createDefaultConfig

You can also use the helper function directly:

```tsx
import { EditorLayout, createDefaultConfig } from '@yourname/cloud-code-editor';

const config = createDefaultConfig({
  initialState: {
    files: { 'test.js': { content: '// Hello' } }
  }
});

function MyEditor() {
  return <EditorLayout config={config} />;
}
```

---

**That's it!** The package is designed to work with minimal effort. Just import and use! 🚀
