export interface GlassTheme {
  enabled?: boolean;
  blur?: number;
  opacity?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

export interface ColorTheme {
  primary?: string;
  secondary?: string;
  success?: string;
  error?: string;
  warning?: string;
}

export interface EditorTheme {
  mode?: 'dark' | 'light' | 'auto';
  glass?: GlassTheme;
  editorTheme?: 'vs-dark' | 'vs-light' | 'hc-black' | string;
  colors?: ColorTheme;
  customVars?: Record<string, string>;
}
