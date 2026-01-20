import { StorageAdapter } from './base';
import { FileNode, Manifest } from '../../types';

export interface GCSConfig {
  projectId: string;
  bucketName: string;
  keyFilename?: string;
  credentials?: object;
}

export class GCSStorageAdapter implements StorageAdapter {
  private storage: any;
  private bucket: any;

  constructor(config: GCSConfig) {
    // Dynamic import to handle optional dependency
    try {
      const { Storage } = require('@google-cloud/storage');
      this.storage = new Storage({
        projectId: config.projectId,
        keyFilename: config.keyFilename,
        credentials: config.credentials,
      });
      this.bucket = this.storage.bucket(config.bucketName);
    } catch (error) {
      throw new Error(
        '@google-cloud/storage is not installed. Install it as an optional dependency.'
      );
    }
  }

  async readFile(projectId: string, filePath: string): Promise<string> {
    const file = this.bucket.file(`${projectId}/files/${filePath}`);
    const [content] = await file.download();
    return content.toString('utf-8');
  }

  async writeFile(projectId: string, filePath: string, content: string): Promise<void> {
    const file = this.bucket.file(`${projectId}/files/${filePath}`);
    await file.save(content, { contentType: 'text/plain' });
  }

  async listFiles(projectId: string): Promise<FileNode[]> {
    const [files] = await this.bucket.getFiles({ prefix: `${projectId}/files/` });
    
    // Build tree structure from flat list
    return this.buildFileTree(files, `${projectId}/files/`);
  }

  async deleteFile(projectId: string, filePath: string): Promise<void> {
    const file = this.bucket.file(`${projectId}/files/${filePath}`);
    await file.delete();
  }

  async readManifest(projectId: string): Promise<Manifest> {
    try {
      const file = this.bucket.file(`${projectId}/manifest.json`);
      const [content] = await file.download();
      return JSON.parse(content.toString('utf-8'));
    } catch {
      // Return default manifest if not found
      return {
        version: '1.0.0',
        projectId,
        files: [],
        metadata: {},
        updatedAt: new Date().toISOString(),
      };
    }
  }

  async writeManifest(projectId: string, manifest: Manifest): Promise<void> {
    const file = this.bucket.file(`${projectId}/manifest.json`);
    await file.save(JSON.stringify(manifest, null, 2), {
      contentType: 'application/json',
    });
  }

  private buildFileTree(files: any[], prefix: string): FileNode[] {
    const tree: FileNode[] = [];
    const nodeMap = new Map<string, FileNode>();

    files.forEach((file) => {
      const relativePath = file.name.replace(prefix, '');
      if (!relativePath) return; // Skip the prefix itself

      const parts = relativePath.split('/').filter((p) => p);
      let currentPath = '';

      parts.forEach((part, index) => {
        const parentPath = currentPath;
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        const isLast = index === parts.length - 1;

        if (!nodeMap.has(currentPath)) {
          const node: FileNode = {
            name: part,
            path: currentPath,
            type: isLast ? 'file' : 'directory',
            children: isLast ? undefined : [],
            size: isLast ? parseInt(file.metadata.size || '0', 10) : undefined,
            modified: isLast ? new Date(file.metadata.updated || file.metadata.timeCreated) : undefined,
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
  }
}
