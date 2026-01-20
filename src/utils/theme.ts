import { EditorTheme } from '../types/theme';

export function applyTheme(theme: EditorTheme) {
  const root = document.documentElement;
  
  const glass = theme.glass || {};
  const colors = theme.colors || {};
  
  // Apply glass theme
  if (glass.enabled !== false) {
    root.style.setProperty('--glass-blur', `${glass.blur || 10}px`);
    root.style.setProperty('--glass-opacity', `${glass.opacity || 0.7}`);
    root.style.setProperty('--glass-bg', glass.backgroundColor || 'rgba(17, 24, 39, 0.7)');
    root.style.setProperty('--glass-border', glass.borderColor || 'rgba(255, 255, 255, 0.1)');
    root.style.setProperty('--glass-border-width', `${glass.borderWidth || 1}px`);
  }
  
  // Apply color theme (default to ideOnWeb colors)
  root.style.setProperty('--color-primary', colors.primary || '#10b981');
  root.style.setProperty('--color-secondary', colors.secondary || '#8b5cf6');
  root.style.setProperty('--color-success', colors.success || '#10b981');
  root.style.setProperty('--color-error', colors.error || '#ef4444');
  root.style.setProperty('--color-warning', colors.warning || '#f59e0b');
  
  // Apply custom variables
  if (theme.customVars) {
    Object.entries(theme.customVars).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }
  
  // Apply mode
  if (theme.mode === 'dark' || (theme.mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}
