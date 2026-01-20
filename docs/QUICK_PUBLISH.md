# Quick Publish Guide

## 🚀 Fast Track to Publishing

### 1. Update package.json

Edit `package.json` and change:
- `"name"`: Change `@yourname/cloud-code-editor` to your package name
- `"author"`: Add your name and email
- `"repository"`: Add your GitHub repo (optional but recommended)

### 2. Build

```bash
cd cloud-code-editor-package
npm run build
```

### 3. Login to npm

```bash
npm login
```

### 4. Publish

**If using scoped package name (e.g., `@yourname/cloud-code-editor`):**
```bash
npm publish --access public
```

**If using unscoped package name (e.g., `cloud-code-editor`):**
```bash
npm publish
```

### 5. Verify

```bash
npm view @yourname/cloud-code-editor
```

## 📝 Package Name Options

Choose one:

1. **Scoped (Recommended):**
   ```json
   "name": "@yourusername/cloud-code-editor"
   ```
   - Professional
   - Organized under your username
   - Requires `--access public` flag

2. **Unscoped:**
   ```json
   "name": "cloud-code-editor"
   ```
   - Simpler import
   - Must be globally unique
   - Check availability first: `npm view cloud-code-editor`

## ✅ Pre-Publish Checklist

- [ ] Package name updated in package.json
- [ ] Author information added
- [ ] Version is correct (1.0.0 for first release)
- [ ] `npm run build` succeeds
- [ ] You're logged in: `npm whoami`
- [ ] README.md looks good

## 🔄 Updating After First Publish

```bash
# Update version
npm version patch  # or minor, or major

# Build
npm run build

# Publish
npm publish
```

That's it! 🎉
