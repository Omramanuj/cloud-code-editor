import fs from 'fs/promises';
import path from 'path';
import { StorageAdapter } from './base';
import { FileNode, Manifest } from '../../types';

export class LocalStorageAdapter implements StorageAdapter {
  constructor(private basePath: string) {}

  async readFile(projectId: string, filePath: string): Promise<string> {
    const fullPath = path.join(this.basePath, projectId, filePath);
    return await fs.readFile(fullPath, 'utf-8');
  }

  async writeFile(projectId: string, filePath: string, content: string): Promise<void> {
    const fullPath = path.join(this.basePath, projectId, filePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content, 'utf-8');
  }

  async listFiles(projectId: string): Promise<FileNode[]> {
    const projectPath = path.join(this.basePath, projectId);
    return await this.scanDirectory(projectPath, projectPath);
  }

  async deleteFile(projectId: string, filePath: string): Promise<void> {
    const fullPath = path.join(this.basePath, projectId, filePath);
    await fs.unlink(fullPath);
  }

  async readManifest(projectId: string): Promise<Manifest> {
    const manifestPath = path.join(this.basePath, projectId, 'manifest.json');
    try {
      const content = await fs.readFile(manifestPath, 'utf-8');
      return JSON.parse(content);
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
    const manifestPath = path.join(this.basePath, projectId, 'manifest.json');
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  }

  private async scanDirectory(dir: string, basePath: string): Promise<FileNode[]> {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      const nodes: FileNode[] = [];

      for (const entry of entries) {
        // Skip hidden files by default
        if (entry.name.startsWith('.')) {
          continue;
        }

        const fullPath = path.join(dir, entry.name);
        const relativePath = path.relative(basePath, fullPath);

        if (entry.isDirectory()) {
          nodes.push({
            name: entry.name,
            path: relativePath,
            type: 'directory',
            children: await this.scanDirectory(fullPath, basePath),
          });
        } else {
          const stats = await fs.stat(fullPath);
          nodes.push({
            name: entry.name,
            path: relativePath,
            type: 'file',
            size: stats.size,
            modified: stats.mtime,
          });
        }
      }

      return nodes;
    } catch (error) {
      // Directory doesn't exist or can't be read
      return [];
    }
  }
}
