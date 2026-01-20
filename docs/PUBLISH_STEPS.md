# Step-by-Step Publishing Instructions

## 🎯 Quick Start (5 Steps)

### Step 1: Update package.json

**Edit `package.json` and change:**

```json
{
  "name": "@yourusername/cloud-code-editor",  // ⚠️ CHANGE THIS!
  "author": "Your Name <your.email@example.com>",  // ⚠️ CHANGE THIS!
  "repository": {
    "type": "git",
    "url": "https://github.com/Omramanuj/cloud-code-editor.git"
  }
}
```

**Package Name Options:**
- `@yourusername/cloud-code-editor` (scoped - recommended)
- `cloud-code-editor` (unscoped - must be unique)
- `ideonweb-code-editor` (if you want ideOnWeb branding)

**Check if name is available:**
```bash
npm view cloud-code-editor
# If 404, name is available
```

### Step 2: Build the Package

```bash
cd cloud-code-editor-package
npm run build
```

**Verify build:**
```bash
ls -la dist/
# Should see: index.js, index.mjs, index.d.ts, index.css, etc.
```

### Step 3: Login to npm

```bash
npm login
```

Enter:
- Username
- Password  
- Email (one-time password)

**Verify login:**
```bash
npm whoami
# Should show your username
```

### Step 4: Test Locally (Optional but Recommended)

```bash
# Create a test package
npm pack

# This creates: cloud-code-editor-1.0.0.tgz

# In another project, test it:
cd ../test-project
npm install ../cloud-code-editor-package/cloud-code-editor-1.0.0.tgz

# Test that it works
```

### Step 5: Publish!

**For scoped packages (e.g., `@yourname/cloud-code-editor`):**
```bash
npm publish --access public
```

**For unscoped packages (e.g., `cloud-code-editor`):**
```bash
npm publish
```

### Step 6: Verify

```bash
# Check your package
npm view @yourusername/cloud-code-editor

# Or visit in browser
# https://www.npmjs.com/package/@yourusername/cloud-code-editor
```

## 📦 What Gets Published?

Based on your `package.json` and `.npmignore`, these files will be published:

```
cloud-code-editor-1.0.0/
├── dist/                    ✅ All built files
│   ├── index.js
│   ├── index.mjs
│   ├── index.d.ts
│   ├── index.css
│   └── ...
├── README.md               ✅ Documentation
├── EXAMPLES.md             ✅ Examples
├── SIMPLE_USAGE.md         ✅ Usage guide
└── package.json            ✅ Package config
```

**NOT included:**
- ❌ `src/` (source files)
- ❌ `node_modules/`
- ❌ Test files
- ❌ Development docs

## 🔄 Updating the Package

After making changes:

```bash
# 1. Update version
npm version patch   # 1.0.0 → 1.0.1 (bug fixes)
npm version minor   # 1.0.0 → 1.1.0 (new features)
npm version major   # 1.0.0 → 2.0.0 (breaking changes)

# 2. Build
npm run build

# 3. Publish
npm publish
```

## ✅ Pre-Publish Checklist

Before publishing, make sure:

- [ ] **Package name** is updated (not `@yourname/cloud-code-editor`)
- [ ] **Author** is your real name/email
- [ ] **Version** is `1.0.0` (for first release)
- [ ] **Repository** URL is correct (if you have one)
- [ ] **Build succeeds**: `npm run build`
- [ ] **You're logged in**: `npm whoami`
- [ ] **README.md** looks good
- [ ] **No console errors** in test page

## 🎯 Recommended Package Names

Since this is for ideOnWeb:

**Option 1: Scoped (Recommended)**
```json
"name": "@ideonweb/cloud-code-editor"
```
- Professional
- Organized
- Use: `npm publish --access public`

**Option 2: Unscoped**
```json
"name": "ideonweb-code-editor"
```
- Simpler
- Must be unique
- Use: `npm publish`

**Option 3: Generic**
```json
"name": "@yourusername/cloud-code-editor"
```
- Personal branding
- Use: `npm publish --access public`

## 🐛 Common Issues

### "Package name already exists"
**Solution:** Choose a different name or use a scoped package

### "You must verify your email"
**Solution:** Check email, click verification link, try again

### "Insufficient permissions"
**Solution:** 
- Make sure you're logged in: `npm whoami`
- For scoped packages, use `--access public`

### "Package not found after publishing"
**Solution:** 
- Wait 2-3 minutes (npm CDN cache)
- Clear browser cache
- Check: `npm view @yourusername/cloud-code-editor`

## 📝 Example: Complete First Publish

```bash
# 1. Update package.json
# Edit: name, author, repository

# 2. Build
npm run build

# 3. Login
npm login

# 4. Publish (scoped package)
npm publish --access public

# 5. Verify
npm view @yourusername/cloud-code-editor

# 6. Install and test
npm install @yourusername/cloud-code-editor
```

## 🎉 After Publishing

1. **Create GitHub Release** (if you have a repo)
2. **Update README** with installation instructions
3. **Share** on social media/communities
4. **Monitor** for issues and feedback

---

**That's it!** Your package will be live on npm. 🚀
