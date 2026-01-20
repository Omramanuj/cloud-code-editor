'use client';
import { useState, useEffect } from 'react';
import { FileMap, FileNode } from '../types';

export interface UseLocalFilesOptions {
  basePath: string;
  watchForChanges?: boolean;
  allowWrite?: boolean;
}

export function useLocalFiles(options: UseLocalFilesOptions) {
  const [files, setFiles] = useState<FileMap>({});
  const [fileTree, setFileTree] = useState<FileNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadLocalFiles();
  }, [options.basePath]);

  const loadLocalFiles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Call API to read local files
      const response = await fetch('/api/editor/local/load', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ basePath: options.basePath }),
      });

      if (!response.ok) {
        throw new Error('Failed to load local files');
      }

      const data = await response.json();
      setFiles(data.files);
      setFileTree(data.fileTree);
      
      // Set up file watcher if enabled
      if (options.watchForChanges) {
        setupFileWatcher();
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const setupFileWatcher = () => {
    // Implement WebSocket or polling for file changes
    // This would connect to a server endpoint that watches the filesystem
    // For now, we'll use polling as a simple implementation
    
    const interval = setInterval(() => {
      loadLocalFiles();
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(interval);
  };

  const writeFile = async (path: string, content: string) => {
    if (!options.allowWrite) {
      throw new Error('Writing to local files is disabled');
    }

    const response = await fetch('/api/editor/local/write', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        basePath: options.basePath,
        filePath: path,
        content,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to write file');
    }

    // Update local state
    setFiles((prev) => ({
      ...prev,
      [path]: { content, modified: new Date() },
    }));
  };

  return {
    files,
    fileTree,
    loading,
    error,
    writeFile,
    reload: loadLocalFiles,
  };
}
