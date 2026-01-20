# Publishing Guide - Cloud Code Editor Package

## 📦 Pre-Publishing Checklist

### 1. Update Package Information

Before publishing, make sure to update `package.json`:

- [ ] **Package name** - Change from `@yourname/cloud-code-editor` to your actual package name
- [ ] **Author** - Add your name/email
- [ ] **Repository** - Add your GitHub repo URL
- [ ] **Version** - Start with `1.0.0` for first release
- [ ] **License** - Confirm license (MIT is recommended)
- [ ] **Description** - Make it clear and compelling

### 2. Build the Package

```bash
cd cloud-code-editor-package
npm run build
```

Verify the `dist/` folder contains:
- `index.js` (CJS)
- `index.mjs` (ESM)
- `index.d.ts` (TypeScript types)
- `index.css` (Styles)
- `server.js` and `server.mjs` (Server exports)

### 3. Test Locally

Test the package locally before publishing:

```bash
# In the package directory
npm pack

# This creates a .tgz file
# Install it in a test project:
cd ../test-project
npm install ../cloud-code-editor-package/cloud-code-editor-1.0.0.tgz
```

### 4. Verify Files to Publish

Check what will be published:

```bash
npm pack --dry-run
```

This shows exactly what files will be included. Make sure:
- ✅ `dist/` folder is included
- ✅ `README.md` is included
- ✅ `EXAMPLES.md` is included (if you want it)
- ❌ `src/` is NOT included (source files)
- ❌ `node_modules/` is NOT included
- ❌ Test files are NOT included

## 🚀 Publishing Steps

### Step 1: Create npm Account

If you don't have one:
1. Go to https://www.npmjs.com/signup
2. Create an account
3. Verify your email

### Step 2: Login to npm

```bash
npm login
```

Enter your:
- Username
- Password
- Email (one-time password will be sent)

### Step 3: Choose Package Name

**Option A: Scoped Package (Recommended)**
```json
{
  "name": "@yourusername/cloud-code-editor"
}
```
- Requires: `npm publish --access public` (first time)
- Benefits: Professional, organized under your username

**Option B: Unscoped Package**
```json
{
  "name": "cloud-code-editor"
}
```
- Requires: Unique name (check availability first)
- Benefits: Simpler import path

**Check name availability:**
```bash
npm view cloud-code-editor
# If it returns 404, the name is available
```

### Step 4: Update package.json

Update these fields:

```json
{
  "name": "@yourusername/cloud-code-editor",  // Change this!
  "version": "1.0.0",
  "description": "Highly customizable cloud code editor with glassmorphism UI",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/Omramanuj/cloud-code-editor.git"
  },
  "bugs": {
    "url": "https://github.com/Omramanuj/cloud-code-editor/issues"
  },
  "homepage": "https://github.com/Omramanuj/cloud-code-editor#readme"
}
```

### Step 5: Build and Verify

```bash
# Clean previous builds
rm -rf dist

# Build the package
npm run build

# Verify build output
ls -la dist/
```

### Step 6: Test Package Locally (Optional but Recommended)

```bash
# Create a test package
npm pack

# In another project, install it
npm install ../cloud-code-editor-package/cloud-code-editor-1.0.0.tgz

# Test that it works
```

### Step 7: Publish

**For scoped packages (first time):**
```bash
npm publish --access public
```

**For unscoped packages:**
```bash
npm publish
```

### Step 8: Verify Publication

Check your package on npm:
```
https://www.npmjs.com/package/@yourusername/cloud-code-editor
```

## 📝 Version Management

### Semantic Versioning

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features, backward compatible
- **PATCH** (1.0.0 → 1.0.1): Bug fixes, backward compatible

### Update Version

```bash
# Patch version (1.0.0 → 1.0.1)
npm version patch

# Minor version (1.0.0 → 1.1.0)
npm version minor

# Major version (1.0.0 → 2.0.0)
npm version major
```

This automatically:
- Updates `package.json` version
- Creates a git tag (if in git repo)
- Commits the change

Then publish:
```bash
npm publish
```

## 🔄 Updating the Package

### 1. Make Changes
- Update code
- Update version in package.json
- Update CHANGELOG.md (if you have one)

### 2. Build
```bash
npm run build
```

### 3. Test
```bash
npm pack
# Test in a project
```

### 4. Publish
```bash
npm publish
```

## 📋 Post-Publishing

### 1. Create GitHub Release

If you have a GitHub repo:
1. Go to Releases
2. Create new release
3. Tag: `v1.0.0`
4. Add release notes

### 2. Update Documentation

- Update README with installation instructions
- Add examples
- Document breaking changes (if any)

### 3. Announce

- Share on social media
- Post in relevant communities
- Add to awesome lists (if applicable)

## 🛠️ Common Issues

### "Package name already exists"
- Choose a different name
- Use a scoped package name
- Check if you own the package

### "You must verify your email"
- Check your email
- Click verification link
- Try publishing again

### "Insufficient permissions"
- Make sure you're logged in: `npm whoami`
- Check you own the package
- For scoped packages, use `--access public`

### "Package not found after publishing"
- Wait a few minutes (npm CDN cache)
- Clear browser cache
- Check: `npm view @yourusername/cloud-code-editor`

## ✅ Quick Publish Checklist

Before publishing, ensure:

- [ ] Package name is correct and available
- [ ] Version is correct (start with 1.0.0)
- [ ] Author information is correct
- [ ] Repository URL is correct (if public)
- [ ] README.md is complete and helpful
- [ ] Package builds successfully (`npm run build`)
- [ ] All tests pass (if you have tests)
- [ ] `.npmignore` excludes source files
- [ ] `files` field in package.json is correct
- [ ] You're logged into npm (`npm whoami`)
- [ ] You've tested the package locally

## 🎯 Recommended Package Name

Since you're building this for ideOnWeb, consider:

```json
{
  "name": "@ideonweb/cloud-code-editor"
}
```

Or if you want it more generic:

```json
{
  "name": "@ideonweb/code-editor"
}
```

Or unscoped:

```json
{
  "name": "ideonweb-code-editor"
}
```

## 📦 Example: Complete Publishing Workflow

```bash
# 1. Update package.json with your info
# Edit package.json: name, author, repository

# 2. Build
npm run build

# 3. Test locally
npm pack
# Install in test project and verify

# 4. Login (if not already)
npm login

# 5. Publish
npm publish --access public  # For scoped packages

# 6. Verify
npm view @yourusername/cloud-code-editor

# 7. Install and test
npm install @yourusername/cloud-code-editor
```

## 🔐 Security Best Practices

1. **Never commit `.npmrc`** with tokens
2. **Use 2FA** on npm account
3. **Review dependencies** regularly
4. **Use `npm audit`** before publishing
5. **Keep dependencies updated**

## 📚 Additional Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [npm Package Best Practices](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

---

**Ready to publish?** Follow the steps above and your package will be live on npm! 🚀
