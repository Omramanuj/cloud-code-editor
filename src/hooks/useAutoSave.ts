'use client';
import { useEffect, useRef, useCallback } from 'react';
import { FileMap, EditorConfig } from '../types';

export interface UseAutoSaveOptions {
  enabled?: boolean;
  debounceMs?: number;
  maxIntervalMs?: number;
  saveOnBlur?: boolean;
  saveOnClose?: boolean;
  batchMultipleFiles?: boolean;
  onSave?: (files: FileMap) => void | Promise<void>;
  storage?: EditorConfig['storage'];
  projectId?: string;
}

export function useAutoSave(
  files: FileMap,
  options: UseAutoSaveOptions = {}
) {
  const {
    enabled = true,
    debounceMs = 30000,
    maxIntervalMs = 120000,
    saveOnBlur = true,
    saveOnClose = true,
    batchMultipleFiles = true,
    onSave,
    storage,
    projectId,
  } = options;

  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const lastSaveRef = useRef<Date>(new Date());
  const pendingFilesRef = useRef<Set<string>>(new Set());

  const saveFiles = useCallback(async (filesToSave: FileMap) => {
    try {
      if (onSave) {
        await onSave(filesToSave);
      } else if (storage && projectId) {
        // Save to storage backend
        if (storage.type === 'custom' && storage.custom) {
          for (const [filePath, fileData] of Object.entries(filesToSave)) {
            await storage.custom.writeFile(projectId, filePath, fileData.content);
          }
        } else {
          // Call API endpoint
          const response = await fetch('/api/editor/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              projectId,
              files: filesToSave,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to save files');
          }
        }
      }

      lastSaveRef.current = new Date();
      pendingFilesRef.current.clear();
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  }, [onSave, storage, projectId]);

  const scheduleSave = useCallback((filePath: string, fileData: FileMap[string]) => {
    if (!enabled) return;

    pendingFilesRef.current.add(filePath);

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Check if we've exceeded max interval
    const timeSinceLastSave = Date.now() - lastSaveRef.current.getTime();
    const shouldSaveNow = timeSinceLastSave >= maxIntervalMs;

    if (shouldSaveNow) {
      // Save immediately
      const filesToSave = batchMultipleFiles
        ? Object.fromEntries(
            Array.from(pendingFilesRef.current).map((path) => [
              path,
              files[path] || fileData,
            ])
          )
        : { [filePath]: fileData };

      saveFiles(filesToSave);
    } else {
      // Schedule save after debounce
      saveTimeoutRef.current = setTimeout(() => {
        const filesToSave = batchMultipleFiles
          ? Object.fromEntries(
              Array.from(pendingFilesRef.current).map((path) => [
                path,
                files[path],
              ])
            )
          : { [filePath]: fileData };

        saveFiles(filesToSave);
      }, debounceMs);
    }
  }, [enabled, debounceMs, maxIntervalMs, batchMultipleFiles, files, saveFiles]);

  // Save on blur
  useEffect(() => {
    if (!enabled || !saveOnBlur) return;

    const handleBlur = () => {
      if (pendingFilesRef.current.size > 0) {
        const filesToSave = Object.fromEntries(
          Array.from(pendingFilesRef.current).map((path) => [path, files[path]])
        );
        saveFiles(filesToSave);
      }
    };

    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [enabled, saveOnBlur, files, saveFiles]);

  // Save on close
  useEffect(() => {
    if (!enabled || !saveOnClose) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (pendingFilesRef.current.size > 0) {
        // Try to save synchronously (may not work in all browsers)
        const filesToSave = Object.fromEntries(
          Array.from(pendingFilesRef.current).map((path) => [path, files[path]])
        );
        
        // Use sendBeacon for reliable save on close
        if (navigator.sendBeacon && storage && projectId) {
          navigator.sendBeacon(
            '/api/editor/save',
            JSON.stringify({ projectId, files: filesToSave })
          );
        } else {
          e.preventDefault();
          e.returnValue = '';
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [enabled, saveOnClose, files, storage, projectId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    scheduleSave,
    saveFiles,
    hasPendingChanges: pendingFilesRef.current.size > 0,
  };
}
