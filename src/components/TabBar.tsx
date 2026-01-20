'use client';
import React from 'react';
import { FileMap } from '../types';
import { cn } from '../utils/cn';
import { Button } from './ui/Button';

export interface TabBarProps {
  files: FileMap;
  openFiles: string[];
  activeFile: string | null;
  onFileSelect: (filePath: string) => void;
  onFileClose: (filePath: string) => void;
  showTabBar?: boolean;
}

export const TabBar: React.FC<TabBarProps> = ({
  files,
  openFiles,
  activeFile,
  onFileSelect,
  onFileClose,
  showTabBar = true,
}) => {
  if (!showTabBar || openFiles.length === 0) return null;

  return (
    <div className="flex items-center gap-1 px-2 py-1 bg-[#252526] border-b border-[#3e3e42] overflow-x-auto">
      {openFiles.map((filePath) => {
        const isActive = filePath === activeFile;
        const fileName = filePath.split('/').pop() || filePath;
        const isModified = files[filePath]?.modified;

        return (
          <div
            key={filePath}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-t transition-all cursor-pointer group',
              'border border-b-0',
              isActive
                ? 'bg-[#1e1e1e] border-[#3e3e42] border-b-[#1e1e1e] text-white'
                : 'bg-[#252526] border-transparent hover:bg-[#2d2d30] text-white/70 hover:text-white'
            )}
            onClick={() => onFileSelect(filePath)}
          >
            <span className="text-sm truncate max-w-[150px]">{fileName}</span>
            {isModified && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
            )}
            <button
              className={cn(
                'opacity-0 group-hover:opacity-100 transition-opacity',
                'hover:bg-white/10 rounded p-0.5'
              )}
              onClick={(e) => {
                e.stopPropagation();
                onFileClose(filePath);
              }}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
};
