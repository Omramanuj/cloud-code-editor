'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FileNode, FileMap, EditorConfig } from '../types';
import { cn } from '../utils/cn';

export interface FileTreeProps {
  tree?: any[];
  files?: FileMap;
  activeFile: string | null;
  currentFile?: string | null;
  onFileSelect: (filePath: string) => void;
  config?: EditorConfig['fileTree'];
  storage: EditorConfig['storage'];
  projectId: string;
  onCreateFile?: (parentPath: string, isDirectory: boolean) => void;
  onDeleteFile?: (filePath: string) => void;
  onRenameFile?: (filePath: string) => void;
}

export const FileTree: React.FC<FileTreeProps> = ({
  tree: propTree,
  files,
  activeFile,
  currentFile,
  onFileSelect,
  config = {},
  storage,
  projectId,
  onCreateFile,
  onDeleteFile,
  onRenameFile,
}) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const selectedFile = currentFile || activeFile;

  const {
    showHiddenFiles = false,
    sortBy = 'name',
    allowCreate = true,
    allowDelete = true,
    allowRename = true,
  } = config;

  // Build tree from files if tree not provided
  const buildTreeFromFiles = (fileMap: FileMap): any[] => {
    const tree: any[] = [];
    const nodeMap = new Map<string, any>();

    Object.keys(fileMap).forEach((path) => {
      const parts = path.split('/');
      let currentPath = '';

      parts.forEach((part, index) => {
        const parentPath = currentPath;
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        const isLast = index === parts.length - 1;

        if (!nodeMap.has(currentPath)) {
          const node = {
            name: part,
            path: currentPath,
            type: isLast ? 'file' : 'directory',
            children: isLast ? [] : [],
          };

          nodeMap.set(currentPath, node);

          if (parentPath) {
            const parent = nodeMap.get(parentPath);
            if (parent && parent.children) {
              parent.children.push(node);
            }
          } else {
            tree.push(node);
          }
        }
      });
    });

    return tree;
  };

  const fileTree = propTree || (files ? buildTreeFromFiles(files) : []);
  
  // Debug logging
  if (fileTree.length > 0) {
    console.log('🌳 [FileTree] Rendering tree with', fileTree.length, 'root nodes:', fileTree.map(n => n.name));
  } else {
    console.log('🌳 [FileTree] Empty tree - propTree:', propTree?.length || 0, 'files:', files ? Object.keys(files).length : 0);
  }

  const toggleExpanded = (path: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpanded(newExpanded);
  };

  const renderNode = (node: any, depth: number = 0) => {
    const isExpanded = expanded.has(node.path);
    const isSelected = selectedFile === node.path;
    const isDirectory = node.type === 'directory';
    const isHovered = hoveredPath === node.path;
    const isHidden = !showHiddenFiles && node.name.startsWith('.');

    if (isHidden) return null;

    if (isDirectory) {
      return (
        <div key={node.path}>
          <div
            className={cn(
              'flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-white/10 rounded-md group transition-colors',
              isSelected && 'bg-white/15'
            )}
            style={{ paddingLeft: `${depth * 16 + 8}px` }}
            onClick={() => toggleExpanded(node.path)}
            onMouseEnter={() => setHoveredPath(node.path)}
            onMouseLeave={() => setHoveredPath(null)}
          >
            {isExpanded ? (
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span className="flex-1 text-sm truncate text-gray-200">{node.name}</span>
            {isDirectory && isHovered && onCreateFile && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCreateFile(node.path, false);
                }}
                className="opacity-70 hover:opacity-100 p-1 hover:bg-white/10 rounded transition-colors"
                title="New File"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            )}
          </div>
          {isExpanded && node.children && (
            <div>
              {node.children.map((child: any) => renderNode(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        key={node.path}
        className={cn(
          'flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-white/10 rounded-md transition-colors',
          isSelected && 'bg-white/15'
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => onFileSelect(node.path)}
        onMouseEnter={() => setHoveredPath(node.path)}
        onMouseLeave={() => setHoveredPath(null)}
      >
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="flex-1 text-sm truncate text-gray-200">{node.name}</span>
      </div>
    );
  };

  if (!fileTree || fileTree.length === 0) {
    return (
      <div className="h-full overflow-y-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-gray-200 relative glass-panel">
        <div className="p-4 text-center text-gray-400 text-sm">
          <p>No files</p>
          <p className="text-xs mt-1">Files will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-gray-200 relative glass-panel">
      <div className="p-2">
        {fileTree.map((node) => renderNode(node))}
      </div>
    </div>
  );
};
