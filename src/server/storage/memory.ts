import { StorageAdapter } from './base';
import { FileNode, Manifest } from '../../types';

/**
 * In-memory storage adapter - works out of the box with no configuration
 * Perfect for simple use cases and demos
 */
export class MemoryStorageAdapter implements StorageAdapter {
  private storage: Map<string, Map<string, string>> = new Map();
  private manifests: Map<string, Manifest> = new Map();

  async readFile(projectId: string, filePath: string): Promise<string> {
    const project = this.storage.get(projectId);
    if (!project) {
      return '';
    }
    return project.get(filePath) || '';
  }

  async writeFile(projectId: string, filePath: string, content: string): Promise<void> {
    if (!this.storage.has(projectId)) {
      this.storage.set(projectId, new Map());
    }
    const project = this.storage.get(projectId)!;
    project.set(filePath, content);
  }

  async listFiles(projectId: string): Promise<FileNode[]> {
    const project = this.storage.get(projectId);
    if (!project) {
      return [];
    }

    const fileMap = new Map<string, FileNode>();
    
    for (const [filePath] of Array.from(project.entries())) {
      const parts = filePath.split('/');
      let currentPath = '';

      parts.forEach((part, index) => {
        const parentPath = currentPath;
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        const isLast = index === parts.length - 1;

        if (!fileMap.has(currentPath)) {
          const node: FileNode = {
            name: part,
            path: currentPath,
            type: isLast ? 'file' : 'directory',
            children: isLast ? undefined : [],
          };

          fileMap.set(currentPath, node);

          if (parentPath) {
            const parent = fileMap.get(parentPath);
            if (parent && parent.children) {
              parent.children.push(node);
            }
          }
        }
      });
    }

    return Array.from(fileMap.values()).filter(node => {
      // Only return root-level nodes
      return !node.path.includes('/');
    });
  }

  async deleteFile(projectId: string, filePath: string): Promise<void> {
    const project = this.storage.get(projectId);
    if (project) {
      project.delete(filePath);
    }
  }

  async readManifest(projectId: string): Promise<Manifest> {
    const manifest = this.manifests.get(projectId);
    if (manifest) {
      return manifest;
    }
    
    // Return default manifest
    return {
      version: '1.0.0',
      projectId,
      files: [],
      metadata: {},
      updatedAt: new Date().toISOString(),
    };
  }

  async writeManifest(projectId: string, manifest: Manifest): Promise<void> {
    this.manifests.set(projectId, manifest);
  }
}
