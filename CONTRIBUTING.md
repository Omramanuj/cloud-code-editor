# Contributing to Cloud Code Editor

First off, thank you for considering contributing to Cloud Code Editor! 🎉

This project was built in 24 hours as a foundation for a cloud-based code editor. While it's functional and ready to use, there's definitely room for improvement, and we welcome contributions of all kinds!

## 🤝 How to Contribute

### Reporting Bugs

Found a bug? We'd love to know about it!

1. **Check existing issues** - Search [GitHub Issues](https://github.com/Omramanuj/cloud-code-editor/issues) to see if it's already reported
2. **Create a new issue** - Use the bug report template
3. **Include details:**
   - What happened?
   - What did you expect?
   - Steps to reproduce
   - Browser/OS version
   - Screenshots (if applicable)

### Suggesting Features

Have an idea? We're all ears!

1. **Check existing issues** - See if it's already suggested
2. **Create a feature request** - Use the feature request template
3. **Describe:**
   - What problem does it solve?
   - How should it work?
   - Any examples or mockups?

### Contributing Code

Ready to code? Awesome! Here's how:

#### 1. Fork and Clone

```bash
# Fork the repository on GitHub: https://github.com/Omramanuj/cloud-code-editor
# Then clone your fork (replace YOUR_USERNAME with your GitHub username)
git clone https://github.com/YOUR_USERNAME/cloud-code-editor.git
cd cloud-code-editor
```

#### 2. Install Dependencies

```bash
cd cloud-code-editor-package
npm install
```

#### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

#### 4. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

#### 5. Test Your Changes

```bash
# Build the package
npm run build

# Test in the frontend
cd ../frontend
npm install
npm run dev
# Visit http://localhost:3000/test-editor
```

#### 6. Commit Your Changes

```bash
git add .
git commit -m "feat: add your feature description"
# or
git commit -m "fix: fix your bug description"
```

**Commit message format:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

#### 7. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear description of changes
- Reference related issues
- Screenshots (if UI changes)

## 📋 Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Project Structure

```
cloud-code-editor-package/
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── ui/            # UI primitives (Button, GlassPanel, etc.)
│   │   ├── CodeEditor.tsx # Monaco editor wrapper
│   │   ├── EditorLayout.tsx # Main layout component
│   │   ├── FileTree.tsx    # File tree sidebar
│   │   ├── Terminal.tsx    # Terminal component
│   │   ├── Toolbar.tsx     # Top toolbar
│   │   └── StatusBar.tsx   # Bottom status bar
│   ├── hooks/              # Custom React hooks
│   ├── server/             # Server-side code
│   │   ├── storage/        # Storage adapters (local, GCS, memory)
│   │   ├── execution/      # Execution adapters (E2B)
│   │   └── handlers.ts     # API route handlers
│   ├── styles/             # CSS files
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── docs/                   # Documentation (moved here for organization)
│   ├── PUBLISHING.md       # Publishing guide
│   ├── TEST_CHECKLIST.md   # Testing checklist
│   └── ...                 # Other docs
├── dist/                   # Build output (gitignored)
├── test-files/             # Test files (gitignored)
├── CONTRIBUTING.md         # This file
├── README.md               # Main documentation
├── SIMPLE_USAGE.md         # Quick start guide
├── EXAMPLES.md             # Usage examples
└── package.json
```

### Development Workflow

1. **Make changes** in `src/`
2. **Build** with `npm run build`
3. **Test** in `frontend/src/app/test-editor/`
4. **Check types** with `npm run type-check`
5. **Lint** with `npm run lint`

### Testing

Currently, testing is done manually via the test editor page:

```bash
# In frontend directory
npm run dev
# Visit http://localhost:3000/test-editor
```

**Future:** We'd love to add automated tests! Contributions welcome.

## 🎯 Areas That Need Help

Since this was built in 24 hours, there are many areas for improvement:

### High Priority
- [ ] **Automated tests** - Unit tests, integration tests
- [ ] **Error handling** - Better error messages and recovery
- [ ] **Performance** - Optimize rendering, reduce bundle size
- [ ] **Accessibility** - ARIA labels, keyboard navigation
- [ ] **Documentation** - More examples, API docs

### Medium Priority
- [ ] **TypeScript** - Stricter types, better type coverage
- [ ] **Code splitting** - Lazy load components
- [ ] **Internationalization** - i18n support
- [ ] **Themes** - More theme options
- [ ] **Plugins** - Plugin system for extensibility

### Nice to Have
- [ ] **Collaborative editing** - Real-time collaboration
- [ ] **Git integration** - Built-in git support
- [ ] **More storage backends** - S3, Azure, etc.
- [ ] **More execution providers** - Docker, custom VMs
- [ ] **Mobile support** - Responsive design improvements

## 📝 Code Style

### TypeScript/React
- Use TypeScript for all new code
- Use functional components with hooks
- Prefer `const` over `let`
- Use meaningful variable names
- Add JSDoc comments for public APIs

### CSS
- Use Tailwind classes when possible
- Follow existing glassmorphism patterns
- Keep styles modular

### File Naming
- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Utils: `camelCase.ts`
- Types: `camelCase.ts`

## 🐛 Known Issues

Since this is a foundation built quickly, here are known limitations:

1. **No automated tests** - Manual testing only
2. **Limited error handling** - Some edge cases not handled
3. **Performance** - Could be optimized for large files
4. **Accessibility** - Not fully accessible yet
5. **Documentation** - Some features need better docs

## 💡 Ideas for Contributions

### For Beginners
- Fix typos in documentation
- Improve README examples
- Add more usage examples
- Improve error messages
- Add JSDoc comments

### For Intermediate
- Add unit tests
- Improve TypeScript types
- Optimize performance
- Add accessibility features
- Create more examples

### For Advanced
- Implement plugin system
- Add collaborative editing
- Create new storage backends
- Add new execution providers
- Performance optimizations

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Monaco Editor Docs](https://microsoft.github.io/monaco-editor/)
- [Next.js Documentation](https://nextjs.org/docs)

## 📁 Project Organization

The project is organized for clarity:

- **`src/`** - All source code
- **`docs/`** - Additional documentation for maintainers
- **Root** - User-facing documentation (README, CONTRIBUTING, etc.)

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed structure information.

## ❓ Questions?

- Open an issue with the `question` label
- Check existing issues and discussions
- Review the code and documentation

## 📜 Code of Conduct

Be respectful, inclusive, and constructive. We're all here to build something great together!

## 🙏 Thank You!

Every contribution, no matter how small, is appreciated. Thank you for helping make Cloud Code Editor better!

---

**Remember:** This project was built in 24 hours as a foundation. It's not perfect, but it's a solid start. Your contributions will help make it production-ready! 🚀
