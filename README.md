# Cloud Code Editor

A highly customizable, modular cloud code editor package for Next.js with beautiful glassmorphism UI, multiple storage backends, and optional code execution.

**✨ Zero Config - Works out of the box with sensible defaults!**

## 🚀 Demo

**[Try the live demo →](https://ide-on-web-demo.vercel.app)**

## ⚠️ Project Status

**This project was built in 24 hours as a foundation.** While it's functional and ready to use, it's not production-perfect yet. We're actively working on improvements and welcome contributions!

**Current Status:**
- ✅ Core functionality working
- ✅ Zero-config setup
- ✅ Beautiful glassmorphism UI
- ✅ Multiple storage backends
- ⚠️ Needs automated tests
- ⚠️ Needs better error handling
- ⚠️ Needs performance optimizations

## Features

- 🎨 **Glassmorphism UI** - Beautiful translucent design with customizable blur and opacity
- 📦 **Modular Components** - Enable/disable terminal, sidebar, tabs, and more
- 💾 **Multiple Storage Backends** - In-memory (default), local files, Google Cloud Storage, or custom adapters
- ⚡ **Optional E2B Execution** - Run code in isolated sandboxes
- 🎯 **Full TypeScript Support** - Complete type definitions included
- 🎨 **Theme Customization** - Extensive theming options
- 💾 **Auto-save** - Configurable auto-save with debouncing
- 📱 **Responsive** - Works on all screen sizes
- ⚡ **Zero Config** - Works out of the box with minimal setup

## Installation

```bash
npm install cloud-code-editor
```

### Optional Dependencies

For Google Cloud Storage support:
```bash
npm install @google-cloud/storage
```

For E2B execution support:
```bash
npm install @e2b/code-interpreter
```

## Quick Start (Zero Config!)

The simplest way to use the editor - no configuration needed:

```tsx
import { EditorLayout } from 'cloud-code-editor';
import 'cloud-code-editor/styles';

export default function EditorPage() {
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
import { EditorLayout } from 'cloud-code-editor';
import 'cloud-code-editor/styles';

export default function EditorPage() {
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

## Configuration

### Minimal Config (Recommended)

Only configure what you need - everything else has sensible defaults:

```tsx
<EditorLayout
  config={{
    initialState: {
      files: { /* your files */ }
    },
    callbacks: {
      onSave: async (files) => {
        // Your save logic
      }
    }
  }}
/>
```

### Full Configuration

See [EXAMPLES.md](./EXAMPLES.md) for complete configuration options.

## Storage Options

### In-Memory (Default - No Config Needed!)

```tsx
// No storage config needed - uses in-memory by default
<EditorLayout />
```

### Local File Storage

```tsx
<EditorLayout
  config={{
    storage: {
      type: 'local',
      local: {
        basePath: './my-project',
      }
    }
  }}
/>
```

### Google Cloud Storage

```tsx
<EditorLayout
  config={{
    storage: {
      type: 'gcs',
      gcs: {
        projectId: 'my-project',
        bucketName: 'my-bucket',
      }
    }
  }}
/>
```

## Execution (Optional)

Only configure if you want code execution:

```tsx
<EditorLayout
  config={{
    execution: {
      enabled: true,
      provider: 'e2b',
      e2b: {
        apiKey: process.env.E2B_API_KEY, // Only required if enabled
      }
    }
  }}
/>
```

## Components

### EditorLayout

Main layout component - use this for the full editor experience.

```tsx
<EditorLayout config={config} />
```

### Individual Components

You can also use components individually:

```tsx
import { CodeEditor, FileTree, Terminal } from 'cloud-code-editor';

// Use components separately
<CodeEditor files={files} activeFile={activeFile} />
<FileTree files={files} onFileSelect={handleSelect} />
<Terminal output={output} />
```

## Documentation

### For Users
- 📖 **[SIMPLE_USAGE.md](./SIMPLE_USAGE.md)** - Quick start guide with minimal config
- 📚 **[EXAMPLES.md](./EXAMPLES.md)** - Comprehensive usage examples
- 🤝 **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute to this project

### For Contributors
- 📦 **[docs/PUBLISHING.md](./docs/PUBLISHING.md)** - Publishing guide for maintainers
- 🧪 **[docs/TEST_CHECKLIST.md](./docs/TEST_CHECKLIST.md)** - Testing checklist
- 📋 **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Project organization

## 🤝 Contributing

We welcome contributions! This project was built in 24 hours as a foundation, so there's plenty of room for improvement.

**👉 [Read our Contributing Guide](./CONTRIBUTING.md) to get started!**

### Quick Links

- 🐛 [Report a Bug](https://github.com/Omramanuj/cloud-code-editor/issues/new?template=bug_report.md) - Found a bug? Let us know!
- 💡 [Request a Feature](https://github.com/Omramanuj/cloud-code-editor/issues/new?template=feature_request.md) - Have an idea? We'd love to hear it!
- ❓ [Ask a Question](https://github.com/Omramanuj/cloud-code-editor/issues/new?template=question.md) - Need help? Ask away!
- 📖 [Contribution Guide](./CONTRIBUTING.md) - How to contribute code
- 📋 [Project Structure](./PROJECT_STRUCTURE.md) - Understand the codebase

### Areas That Need Help

Since this was built quickly, we especially need help with:

- ✅ **Automated tests** - Unit tests, integration tests
- ✅ **Error handling** - Better error messages and recovery
- ✅ **Performance** - Optimize rendering, reduce bundle size
- ✅ **Accessibility** - ARIA labels, keyboard navigation
- ✅ **Documentation** - More examples, API docs
- ✅ **TypeScript** - Stricter types, better type coverage

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed information on how to contribute.

## Examples

### Basic Usage

```tsx
import { EditorLayout } from 'cloud-code-editor';
import 'cloud-code-editor/styles';

function MyEditor() {
  return <EditorLayout />;
}
```

### With Custom Save Handler

```tsx
<EditorLayout
  config={{
    callbacks: {
      onSave: async (files) => {
        await fetch('/api/save', {
          method: 'POST',
          body: JSON.stringify({ files }),
        });
      }
    }
  }}
/>
```

### With Local Files

```tsx
<EditorLayout
  config={{
    storage: {
      type: 'local',
      local: {
        basePath: './my-project',
      }
    }
  }}
/>
```

For more examples, see [EXAMPLES.md](./EXAMPLES.md) and [SIMPLE_USAGE.md](./SIMPLE_USAGE.md).

## TypeScript

Full TypeScript support with comprehensive type definitions:

```typescript
import { EditorConfig, FileMap, ExecutionResult } from 'cloud-code-editor';
```

## License

MIT

## Acknowledgments

Built with ❤️ in 24 hours as a foundation for cloud-based code editing. Special thanks to all contributors!

---

**Ready to get started?** Check out [SIMPLE_USAGE.md](./SIMPLE_USAGE.md) for the quickest way to use this package!
