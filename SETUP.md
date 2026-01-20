# Setup Guide for Testing

## Quick Setup Steps

### 1. Build the Package
```bash
cd cloud-code-editor-package
npm run build
```

### 2. Link the Package Locally

**Option A: Using npm link (Recommended)**
```bash
# In cloud-code-editor-package directory
npm link

# In frontend directory
cd ../frontend
npm link @yourname/cloud-code-editor
```

**Option B: Direct Import (For Development)**
If npm link doesn't work, you can import directly from source in your test page:
```tsx
import { EditorLayout } from '../../cloud-code-editor-package/src';
import '../../cloud-code-editor-package/src/styles/index.css';
```

### 3. Start the Development Server
```bash
cd frontend
npm run dev
```

### 4. Visit the Test Page
Open your browser and navigate to:
```
http://localhost:3000/test-editor
```

## What to Test

1. **File Tree**: Click on files in the sidebar to open them
2. **Tabs**: Open multiple files and switch between them
3. **Editor**: Edit code and see syntax highlighting
4. **Resizing**: Drag the borders to resize panels
5. **Glassmorphism**: Notice the translucent glass effect
6. **Terminal**: Check the terminal at the bottom (execution may need API setup)

## Troubleshooting

### Module Not Found
- Make sure you ran `npm link` in both directories
- Try restarting your dev server
- Check that the package built successfully (`ls dist/`)

### Styles Not Loading
- Make sure you imported: `import '@yourname/cloud-code-editor/styles';`
- Check browser console for CSS errors

### TypeScript Errors
- The package includes type definitions
- Make sure TypeScript can resolve the module

### Monaco Editor Issues
- Your frontend already has `@monaco-editor/react` installed, so this should work

## Next Steps

Once testing is successful, you can:
1. Customize the configuration in the test page
2. Integrate it into your main editor page
3. Set up API routes for file operations
4. Configure E2B execution if needed
