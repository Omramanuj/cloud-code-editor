# Project Structure

This document explains the organization of the Cloud Code Editor package.

## 📁 Directory Structure

```
cloud-code-editor-package/
├── src/                          # Source code
│   ├── components/               # React components
│   │   ├── ui/                   # UI primitives
│   │   │   ├── Button.tsx        # Button component
│   │   │   ├── GlassPanel.tsx    # Glassmorphism panel
│   │   │   ├── IconSidebar.tsx   # Icon navigation sidebar
│   │   │   └── Resizer.tsx       # Resizable panel handle
│   │   ├── CodeEditor.tsx        # Monaco editor wrapper
│   │   ├── EditorLayout.tsx      # Main layout orchestrator
│   │   ├── FileTree.tsx          # File tree sidebar
│   │   ├── Terminal.tsx          # Terminal component
│   │   ├── Toolbar.tsx           # Top toolbar (Save, Run, etc.)
│   │   ├── StatusBar.tsx         # Bottom status bar
│   │   └── TabBar.tsx            # File tabs
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAutoSave.ts        # Auto-save functionality
│   │   ├── useCodeExecution.ts   # Code execution hook
│   │   ├── useFileOperations.ts  # File CRUD operations
│   │   └── useLocalFiles.ts      # Local file loading
│   ├── server/                   # Server-side code
│   │   ├── storage/              # Storage adapters
│   │   │   ├── base.ts          # Storage adapter interface
│   │   │   ├── local.ts         # Local file system adapter
│   │   │   ├── gcs.ts           # Google Cloud Storage adapter
│   │   │   └── memory.ts         # In-memory adapter (default)
│   │   ├── execution/            # Execution adapters
│   │   │   ├── base.ts          # Execution adapter interface
│   │   │   └── e2b.ts           # E2B execution adapter
│   │   ├── handlers.ts           # Next.js API route handlers
│   │   └── index.ts              # Server exports
│   ├── styles/                   # CSS files
│   │   ├── globals.css           # Global styles
│   │   ├── glassmorphism.css     # Glassmorphism effects
│   │   └── index.css             # Main stylesheet
│   ├── types/                    # TypeScript definitions
│   │   ├── config.ts            # Configuration types
│   │   ├── theme.ts             # Theme types
│   │   └── index.ts             # Type exports
│   ├── utils/                    # Utility functions
│   │   ├── cn.ts                # Class name utility
│   │   ├── defaultConfig.ts     # Default configuration helper
│   │   ├── file-helpers.ts      # File utility functions
│   │   └── theme.ts             # Theme utilities
│   ├── index.ts                  # Main client exports
│   └── server.ts                 # Server exports
│
├── docs/                         # Documentation
│   ├── PUBLISHING.md             # Publishing guide
│   ├── PUBLISH_STEPS.md          # Step-by-step publishing
│   ├── TEST_CHECKLIST.md         # Testing checklist
│   ├── TESTING_SUMMARY.md        # Testing summary
│   ├── UI_CHANGELOG.md           # UI changes log
│   ├── UI_ELEMENTS.md            # UI elements reference
│   ├── IDEONWEB_UI.md            # UI documentation
│   ├── SETUP_2FA.md              # 2FA setup guide
│   └── FIX_2FA.md                # 2FA troubleshooting
│
├── dist/                         # Build output (gitignored)
│   ├── index.js                  # CJS bundle
│   ├── index.mjs                 # ESM bundle
│   ├── index.d.ts                # TypeScript definitions
│   ├── index.css                 # Compiled CSS
│   └── server.*                  # Server bundles
│
├── test-files/                   # Test files (gitignored)
│   └── test-project/             # Sample test project
│
├── .gitignore                    # Git ignore rules
├── .npmignore                    # NPM ignore rules
├── CONTRIBUTING.md               # Contribution guide
├── README.md                     # Main documentation
├── SIMPLE_USAGE.md               # Quick start guide
├── EXAMPLES.md                   # Usage examples
├── package.json                  # Package configuration
├── tsconfig.json                 # TypeScript config
├── tsup.config.ts                # Build configuration
└── publish.sh                    # Publishing script
```

## 📦 Key Files

### Main Entry Points

- **`src/index.ts`** - Client-side exports (components, hooks, types)
- **`src/server.ts`** - Server-side exports (handlers, storage, execution)

### Core Components

- **`src/components/EditorLayout.tsx`** - Main component that orchestrates everything
- **`src/components/CodeEditor.tsx`** - Monaco editor wrapper
- **`src/components/FileTree.tsx`** - File tree sidebar
- **`src/components/Terminal.tsx`** - Terminal output display

### Configuration

- **`src/types/config.ts`** - All configuration type definitions
- **`src/utils/defaultConfig.ts`** - Default configuration helper

### Storage

- **`src/server/storage/memory.ts`** - Default in-memory storage
- **`src/server/storage/local.ts`** - Local file system storage
- **`src/server/storage/gcs.ts`** - Google Cloud Storage adapter

## 🎯 Where to Make Changes

### Adding a New Component

1. Create component in `src/components/`
2. Export from `src/index.ts`
3. Add to `EditorLayout` if needed
4. Update types in `src/types/`

### Adding a New Storage Backend

1. Create adapter in `src/server/storage/`
2. Implement `StorageAdapter` interface
3. Export from `src/server/index.ts`
4. Update `src/types/config.ts`

### Adding a New Hook

1. Create hook in `src/hooks/`
2. Export from `src/index.ts`
3. Add documentation

### Updating Styles

1. Edit files in `src/styles/`
2. Styles are automatically bundled
3. Import via `import 'cloud-code-editor/styles'`

## 📝 Documentation Files

- **README.md** - Main documentation (what users see)
- **CONTRIBUTING.md** - How to contribute
- **SIMPLE_USAGE.md** - Quick start guide
- **EXAMPLES.md** - Comprehensive examples
- **docs/** - Additional documentation for maintainers

## 🔧 Build Output

The `dist/` folder contains:
- Compiled JavaScript (CJS and ESM)
- TypeScript definitions
- Compiled CSS
- Source maps

**Note:** `dist/` is gitignored - it's generated during build.

## 🧪 Testing

- Test files are in `test-files/` (gitignored)
- Test page is in `frontend/src/app/test-editor/`
- No automated tests yet (contributions welcome!)

## 📚 Documentation Organization

**Root level:**
- User-facing docs (README, EXAMPLES, SIMPLE_USAGE, CONTRIBUTING)

**docs/ folder:**
- Maintainer docs (publishing, testing, UI details)

This keeps the root clean while maintaining comprehensive documentation.
