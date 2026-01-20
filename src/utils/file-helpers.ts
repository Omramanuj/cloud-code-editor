export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1] : '';
}

export function getLanguageFromExtension(extension: string): string {
  const languageMap: Record<string, string> = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'py': 'python',
    'java': 'java',
    'cpp': 'cpp',
    'c': 'c',
    'cs': 'csharp',
    'php': 'php',
    'rb': 'ruby',
    'go': 'go',
    'rs': 'rust',
    'swift': 'swift',
    'kt': 'kotlin',
    'html': 'html',
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'json': 'json',
    'xml': 'xml',
    'yaml': 'yaml',
    'yml': 'yaml',
    'md': 'markdown',
    'sh': 'shell',
    'bash': 'shell',
    'zsh': 'shell',
    'sql': 'sql',
    'vue': 'vue',
    'svelte': 'svelte',
  };
  
  return languageMap[extension.toLowerCase()] || 'plaintext';
}

export function getLanguageFromPath(filePath: string): string {
  const extension = getFileExtension(filePath);
  return getLanguageFromExtension(extension);
}

export function isBinaryFile(filename: string): boolean {
  const binaryExtensions = [
    'png', 'jpg', 'jpeg', 'gif', 'svg', 'ico', 'webp',
    'pdf', 'zip', 'tar', 'gz', '7z', 'rar',
    'mp3', 'mp4', 'avi', 'mov', 'wmv',
    'exe', 'dll', 'so', 'dylib',
  ];
  
  const extension = getFileExtension(filename).toLowerCase();
  return binaryExtensions.includes(extension);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
