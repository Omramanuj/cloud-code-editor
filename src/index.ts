// Main client exports
export { EditorLayout } from './components/EditorLayout';
export { CodeEditor } from './components/CodeEditor';
export { FileTree } from './components/FileTree';
export { Terminal } from './components/Terminal';
export { TabBar } from './components/TabBar';
export { Toolbar } from './components/Toolbar';
export { StatusBar } from './components/StatusBar';

// UI Components
export { GlassPanel } from './components/ui/GlassPanel';
export { Button } from './components/ui/Button';
export { Resizer } from './components/ui/Resizer';
export { IconSidebar } from './components/ui/IconSidebar';
export type { SidebarView } from './components/ui/IconSidebar';

// Hooks
export { useAutoSave } from './hooks/useAutoSave';
export { useFileOperations } from './hooks/useFileOperations';
export { useCodeExecution } from './hooks/useCodeExecution';
export { useLocalFiles } from './hooks/useLocalFiles';

// Types
export * from './types';

// Utils
export { cn } from './utils/cn';
export { applyTheme } from './utils/theme';
export { createDefaultConfig } from './utils/defaultConfig';
export * from './utils/file-helpers';

// Styles (will be bundled separately)
import './styles/index.css';
