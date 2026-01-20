import { NextRequest, NextResponse } from 'next/server';
import { EditorConfig } from '../types';
import { GCSStorageAdapter } from './storage/gcs';
import { LocalStorageAdapter } from './storage/local';
import { MemoryStorageAdapter } from './storage/memory';
import { E2BExecutor } from './execution/e2b';
import path from 'path';

// Helper function to determine content type from file extension
function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes: Record<string, string> = {
    '.html': 'text/html; charset=utf-8',
    '.htm': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.jsx': 'application/javascript; charset=utf-8',
    '.ts': 'application/typescript; charset=utf-8',
    '.tsx': 'application/typescript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain; charset=utf-8',
    '.md': 'text/markdown; charset=utf-8',
    '.py': 'text/x-python; charset=utf-8',
    '.java': 'text/x-java-source; charset=utf-8',
    '.c': 'text/x-c; charset=utf-8',
    '.cpp': 'text/x-c++; charset=utf-8',
    '.go': 'text/x-go; charset=utf-8',
    '.rs': 'text/x-rust; charset=utf-8',
    '.php': 'text/x-php; charset=utf-8',
    '.rb': 'text/x-ruby; charset=utf-8',
    '.sh': 'text/x-shellscript; charset=utf-8',
    '.yaml': 'text/yaml; charset=utf-8',
    '.yml': 'text/yaml; charset=utf-8',
  };
  
  return contentTypes[ext] || 'text/plain; charset=utf-8';
}

export function createEditorAPI(config: EditorConfig) {
  // Initialize storage adapter
  let storage;
  if (!config.storage || config.storage.type === 'memory') {
    // Default to in-memory storage
    storage = new MemoryStorageAdapter();
  } else if (config.storage.type === 'gcs' && config.storage.gcs) {
    storage = new GCSStorageAdapter(config.storage.gcs);
  } else if (config.storage.type === 'local' && config.storage.local) {
    storage = new LocalStorageAdapter(config.storage.local.basePath);
  } else if (config.storage.type === 'custom' && config.storage.custom) {
    storage = config.storage.custom;
  } else {
    // Fallback to memory storage if invalid config
    storage = new MemoryStorageAdapter();
  }

  // Initialize executor
  let executor;
  if (config.execution?.enabled && config.execution.provider === 'e2b' && config.execution.e2b) {
    executor = new E2BExecutor(config.execution.e2b);
  } else if (config.execution?.enabled && config.execution.provider === 'custom' && config.execution.custom) {
    executor = config.execution.custom;
  }

  return {
    // GET handler
    GET: async (req: NextRequest) => {
      const { pathname, searchParams } = new URL(req.url);

      try {
        // Read file
        if (pathname.includes('/read')) {
          const projectId = searchParams.get('projectId');
          const filePath = searchParams.get('filePath');
          
          if (!projectId || !filePath) {
            return NextResponse.json(
              { error: 'Missing projectId or filePath' },
              { status: 400 }
            );
          }

          const content = await storage.readFile(projectId, filePath);
          return NextResponse.json({ content });
        }

        // List files
        if (pathname.includes('/list')) {
          const projectId = searchParams.get('projectId');
          
          if (!projectId) {
            return NextResponse.json(
              { error: 'Missing projectId' },
              { status: 400 }
            );
          }

          const files = await storage.listFiles(projectId);
          return NextResponse.json({ files });
        }

        // Read manifest
        if (pathname.includes('/manifest')) {
          const projectId = searchParams.get('projectId');
          
          if (!projectId) {
            return NextResponse.json(
              { error: 'Missing projectId' },
              { status: 400 }
            );
          }

          if (storage.readManifest) {
            const manifest = await storage.readManifest(projectId);
            return NextResponse.json({ manifest });
          } else {
            return NextResponse.json(
              { error: 'Manifest not supported by this storage adapter' },
              { status: 400 }
            );
          }
        }

        // Preview file (serves file with proper MIME type)
        if (pathname.includes('/preview')) {
          const projectId = searchParams.get('projectId');
          const filePath = searchParams.get('filePath');
          
          if (!projectId || !filePath) {
            return NextResponse.json(
              { error: 'Missing projectId or filePath' },
              { status: 400 }
            );
          }

          const content = await storage.readFile(projectId, filePath);
          const contentType = getContentType(filePath);
          
          return new NextResponse(content, {
            headers: {
              'Content-Type': contentType,
              'Cache-Control': 'public, max-age=3600',
            },
          });
        }

        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      } catch (error) {
        return NextResponse.json(
          { error: (error as Error).message },
          { status: 500 }
        );
      }
    },

    // POST handler
    POST: async (req: NextRequest) => {
      const { pathname } = new URL(req.url);
      const body = await req.json();

      try {
        // Write file
        if (pathname.includes('/write')) {
          const { projectId, filePath, content } = body;
          
          if (!projectId || !filePath || content === undefined) {
            return NextResponse.json(
              { error: 'Missing required fields' },
              { status: 400 }
            );
          }

          await storage.writeFile(projectId, filePath, content);
          return NextResponse.json({ success: true });
        }

        // Delete file
        if (pathname.includes('/delete')) {
          const { projectId, filePath } = body;
          
          if (!projectId || !filePath) {
            return NextResponse.json(
              { error: 'Missing required fields' },
              { status: 400 }
            );
          }

          await storage.deleteFile(projectId, filePath);
          return NextResponse.json({ success: true });
        }

        // Save multiple files
        if (pathname.includes('/save')) {
          const { projectId, files } = body;
          
          if (!projectId || !files) {
            return NextResponse.json(
              { error: 'Missing required fields' },
              { status: 400 }
            );
          }

          for (const [filePath, fileData] of Object.entries(files as Record<string, { content: string }>)) {
            await storage.writeFile(projectId, filePath, fileData.content);
          }

          return NextResponse.json({ success: true });
        }

        // Execute code
        if (pathname.includes('/execute')) {
          if (!executor) {
            return NextResponse.json(
              { error: 'Execution is not enabled' },
              { status: 400 }
            );
          }

          const { projectId, entryFile, files } = body;
          
          if (!projectId || !entryFile || !files) {
            return NextResponse.json(
              { error: 'Missing required fields' },
              { status: 400 }
            );
          }

          // Stream execution output
          const stream = new ReadableStream({
            async start(controller) {
              try {
                for await (const output of executor.execute(projectId, entryFile, files)) {
                  controller.enqueue(`data: ${JSON.stringify({ output })}\n\n`);
                }
                controller.close();
              } catch (error) {
                controller.enqueue(
                  `data: ${JSON.stringify({ error: (error as Error).message })}\n\n`
                );
                controller.close();
              }
            },
          });

          return new NextResponse(stream, {
            headers: {
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive',
            },
          });
        }

        // Load local files
        if (pathname.includes('/local/load')) {
          const { basePath } = body;
          
          if (!basePath) {
            return NextResponse.json(
              { error: 'Missing basePath' },
              { status: 400 }
            );
          }

          // Use local storage adapter to load files
          const localStorage = new LocalStorageAdapter(basePath);
          const files = await localStorage.listFiles('.'); // Use '.' as projectId for local files
          
          // Build file map
          const fileMap: Record<string, { content: string; modified?: Date }> = {};
          
          const loadFileContent = async (node: any) => {
            if (node.type === 'file') {
              try {
                const content = await localStorage.readFile('.', node.path);
                fileMap[node.path] = { content, modified: node.modified };
              } catch (error) {
                // Skip files that can't be read
              }
            } else if (node.children) {
              for (const child of node.children) {
                await loadFileContent(child);
              }
            }
          };

          for (const node of files) {
            await loadFileContent(node);
          }

          return NextResponse.json({
            files: fileMap,
            fileTree: files,
          });
        }

        // Write local file
        if (pathname.includes('/local/write')) {
          const { basePath, filePath, content } = body;
          
          if (!basePath || !filePath || content === undefined) {
            return NextResponse.json(
              { error: 'Missing required fields' },
              { status: 400 }
            );
          }

          const localStorage = new LocalStorageAdapter(basePath);
          await localStorage.writeFile('.', filePath, content);
          
          return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      } catch (error) {
        return NextResponse.json(
          { error: (error as Error).message },
          { status: 500 }
        );
      }
    },
  };
}
