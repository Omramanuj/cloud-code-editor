'use client';
import { useState, useCallback } from 'react';
import { FileMap, FileNode, EditorConfig } from '../types';

export interface UseFileOperationsOptions {
  storage?: EditorConfig['storage'];
  projectId: string;
  onFileCreate?: (filePath: string) => void;
  onFileDelete?: (filePath: string) => void;
  onError?: (error: Error) => void;
}

export function useFileOperations(options: UseFileOperationsOptions) {
  const { storage, projectId, onFileCreate, onFileDelete, onError } = options;
  const [loading, setLoading] = useState(false);

  const createFile = useCallback(async (filePath: string, content: string = '') => {
    try {
      setLoading(true);

      if (storage && storage.type === 'custom' && storage.custom) {
        await storage.custom.writeFile(projectId, filePath, content);
      } else {
        const response = await fetch('/api/editor/write', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectId,
            filePath,
            content,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create file');
        }
      }

      onFileCreate?.(filePath);
    } catch (error) {
      const err = error as Error;
      onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [storage, projectId, onFileCreate, onError]);

  const deleteFile = useCallback(async (filePath: string) => {
    try {
      setLoading(true);

      if (storage && storage.type === 'custom' && storage.custom) {
        await storage.custom.deleteFile(projectId, filePath);
      } else {
        const response = await fetch('/api/editor/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectId,
            filePath,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to delete file');
        }
      }

      onFileDelete?.(filePath);
    } catch (error) {
      const err = error as Error;
      onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [storage, projectId, onFileDelete, onError]);

  const renameFile = useCallback(async (oldPath: string, newPath: string) => {
    try {
      setLoading(true);

      // Read old file
      let content: string;
      if (storage && storage.type === 'custom' && storage.custom) {
        content = await storage.custom.readFile(projectId, oldPath);
      } else {
        const response = await fetch(
          `/api/editor/read?projectId=${projectId}&filePath=${encodeURIComponent(oldPath)}`
        );
        if (!response.ok) {
          throw new Error('Failed to read file');
        }
        const data = await response.json();
        content = data.content;
      }

      // Write to new path
      if (storage && storage.type === 'custom' && storage.custom) {
        await storage.custom.writeFile(projectId, newPath, content);
      } else {
        const response = await fetch('/api/editor/write', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectId,
            filePath: newPath,
            content,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to write file');
        }
      }

      // Delete old file
      await deleteFile(oldPath);
    } catch (error) {
      const err = error as Error;
      onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [storage, projectId, deleteFile, onError]);

  return {
    createFile,
    deleteFile,
    renameFile,
    loading,
  };
}
