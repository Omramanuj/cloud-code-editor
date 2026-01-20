# ideOnWeb UI - Modern Code Editor Interface

The Cloud Code Editor package now includes a beautiful, modern UI inspired by professional code editors like VS Code, with a dark theme and icon-based navigation.

## Features

✨ **Icon Sidebar Navigation** - Quick access to different views (files, git, extensions, etc.)
🎨 **Dark Theme** - Professional dark color scheme with proper contrast
📁 **File Explorer** - Clean file tree with folder expansion
💻 **Terminal** - Integrated terminal for code execution
⚡ **Status Bar** - Real-time connection status and file information
🎯 **Top Action Bar** - Quick Save and Run buttons with user profile

## UI Components

### 1. Icon Sidebar
Located on the far left, provides quick navigation between different views:
- Files/Explorer
- Document view
- Extensions/Blocks
- Git/Source Control
- Chat/Messages
- Terminal
- Settings
- More options

### 2. File Explorer
Next to the icon sidebar, shows your project's file structure:
- Expandable folders with arrow indicators
- File icons and syntax highlighting
- Active file highlighting with blue accent
- Hover effects for better UX

### 3. Code Editor
Main editing area with:
- Monaco editor integration
- Tab bar for open files
- Syntax highlighting
- Auto-save support

### 4. Terminal
Bottom panel for code execution:
- Output display with syntax highlighting
- Clear and close buttons
- Real-time execution status
- ANSI color support

### 5. Status Bar
Bottom bar showing:
- Last saved time
- Current file name
- Connection status with indicator
- Blue accent color

### 6. Top Bar
Header with:
- ideOnWeb branding (with green "On" accent)
- Save button with icon
- Run button with play icon
- User profile avatar

## Usage Example

```tsx
import { EditorLayout } from '@yourname/cloud-code-editor';

function MyEditor() {
  return (
    <EditorLayout
      config={{
        storage: {
          type: 'local',
          local: {
            basePath: './my-project',
          },
        },
        layout: {
          showFileTree: true,
          showTerminal: true,
          showCodeEditor: true,
          fileTreeWidth: 250,
          terminalHeight: 200,
        },
        theme: {
          mode: 'dark',
        },
        initialState: {
          projectId: 'my-project',
          files: {
            'index.js': { content: 'console.log("Hello World");' },
          },
        },
        callbacks: {
          onSave: async (files) => {
            console.log('Saving files:', files);
          },
          onExecute: (result) => {
            console.log('Execution result:', result);
          },
        },
      }}
    />
  );
}
```

## Color Scheme

The ideOnWeb UI uses a carefully selected color palette:

### Background Colors
- **Main BG**: `#1e1e1e` - Dark charcoal
- **Sidebar BG**: `#252526` - Slightly lighter gray
- **Hover State**: `#2a2d2e` - Interactive elements
- **Active State**: `#37373d` - Selected items

### Accent Colors
- **Primary Blue**: `#007acc` - Active file indicator
- **Success Green**: `#10b981` / `#4ade80` - Status indicators
- **Brand Green**: `#10b981` - "On" in ideOnWeb logo
- **Error Red**: `#f48771` - Error messages
- **Number Cyan**: `#b5cea8` - Terminal numbers

### Text Colors
- **Primary Text**: `#ffffff` at 90% opacity
- **Secondary Text**: `#ffffff` at 60-80% opacity
- **Muted Text**: `#ffffff` at 30-40% opacity
- **Folder Yellow**: `#dcb67a` - Directory icons

## Customization

You can customize various aspects of the UI:

```tsx
config={{
  layout: {
    fileTreeWidth: 300,     // Wider file tree
    terminalHeight: 250,    // Taller terminal
    resizable: true,        // Allow resizing panels
  },
  theme: {
    mode: 'dark',           // Always dark for ideOnWeb style
  },
  terminal: {
    fontSize: 14,           // Larger terminal font
    showTimestamps: true,   // Show execution times
    ansiColors: true,       // Enable color output
  },
}}
```

## Icon Sidebar Usage

You can also use the IconSidebar component independently:

```tsx
import { IconSidebar } from '@yourname/cloud-code-editor';

function MyApp() {
  const [activeView, setActiveView] = useState('files');

  return (
    <div className="flex h-screen">
      <IconSidebar 
        activeView={activeView}
        onViewChange={(view) => setActiveView(view)}
      />
      {/* Your content based on activeView */}
    </div>
  );
}
```

## Screenshots

The UI closely matches professional code editors with:
- Clean, minimal design
- Consistent spacing and alignment
- Professional color scheme
- Smooth transitions and hover effects
- Intuitive icon-based navigation

## Best Practices

1. **Use with Local Storage** - For testing, use local file storage for quick iteration
2. **Enable Auto-Save** - Set `autoSave.enabled: true` for better UX
3. **Configure Callbacks** - Implement `onSave`, `onExecute` for custom behavior
4. **Customize File Tree** - Adjust width based on your project structure
5. **Terminal Integration** - Use E2B or custom execution for live code running

## Next Steps

- Test with your own files using the local storage adapter
- Add file preview functionality for HTML/images
- Customize the theme colors to match your brand
- Implement custom execution logic
- Add more views to the icon sidebar

---

**Note**: This UI design provides a professional, modern interface that users will find familiar and easy to use. The dark theme reduces eye strain and looks great in screenshots and demos!
