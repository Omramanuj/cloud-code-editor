# Test Checklist for Cloud Code Editor Package

## ✅ Configuration Tests

### 1. Zero Config (Default)
- [ ] Editor loads with no config
- [ ] In-memory storage works
- [ ] All panels visible (file tree, editor, terminal)
- [ ] Default dark glassmorphism theme
- [ ] Auto-save enabled

### 2. Minimal Config
- [ ] Editor works with just `initialState.files`
- [ ] Defaults applied correctly
- [ ] No errors in console

### 3. Storage Configuration
- [ ] In-memory storage (default) works
- [ ] Local file storage works
- [ ] GCS storage works (if configured)
- [ ] Custom storage adapter works

### 4. Layout Configuration
- [ ] `showFileTree: false` hides file tree
- [ ] `showTerminal: false` hides terminal
- [ ] `showTabBar: false` hides tab bar
- [ ] `fileTreeWidth` adjusts width
- [ ] `terminalHeight` adjusts height
- [ ] `resizable: false` disables resizing

### 5. Theme Configuration
- [ ] Dark mode works
- [ ] Glassmorphism effects visible
- [ ] Custom colors apply
- [ ] Editor theme changes
- [ ] Glass blur/opacity settings work

### 6. Editor Configuration
- [ ] `readOnly: true` makes editor read-only
- [ ] `fontSize` changes font size
- [ ] `lineNumbers: 'off'` hides line numbers
- [ ] `minimap: false` hides minimap
- [ ] `wordWrap: 'on'` enables word wrap
- [ ] `tabSize` changes tab size

### 7. Auto-Save Configuration
- [ ] `enabled: false` disables auto-save
- [ ] `debounceMs` controls save delay
- [ ] `saveOnBlur` saves on blur
- [ ] `saveOnClose` saves on close

### 8. File Tree Configuration
- [ ] `showHiddenFiles: true` shows hidden files
- [ ] `sortBy` changes sort order
- [ ] `allowCreate: false` disables create
- [ ] `allowDelete: false` disables delete
- [ ] `allowRename: false` disables rename

### 9. Terminal Configuration
- [ ] `clearOnRun: false` doesn't clear
- [ ] `showTimestamps: false` hides timestamps
- [ ] `fontSize` changes terminal font
- [ ] `ansiColors: false` disables colors

### 10. Execution Configuration
- [ ] `enabled: false` disables execution (default)
- [ ] E2B execution works (if API key provided)
- [ ] Custom executor works

### 11. Callbacks
- [ ] `onSave` fires on save
- [ ] `onExecute` fires on execution
- [ ] `onFileSelect` fires on file select
- [ ] `onFileCreate` fires on create
- [ ] `onFileDelete` fires on delete
- [ ] `onError` fires on errors

### 12. Initial State
- [ ] `initialState.files` loads files
- [ ] `initialState.activeFile` sets active file
- [ ] `initialState.openFiles` opens tabs
- [ ] `initialState.projectId` sets project ID

## ✅ UI/UX Tests

### 13. Glassmorphism UI
- [ ] Glass panels visible
- [ ] Backdrop blur works
- [ ] Borders visible
- [ ] Rounded corners applied
- [ ] Transparent backgrounds

### 14. File Tree
- [ ] Files display correctly
- [ ] Folders expand/collapse
- [ ] Active file highlighted
- [ ] Hover effects work
- [ ] File icons display

### 15. Code Editor
- [ ] Monaco editor loads
- [ ] Syntax highlighting works
- [ ] Code completion works
- [ ] Tabs work correctly
- [ ] File switching works
- [ ] Editor resizes correctly

### 16. Terminal
- [ ] Terminal displays output
- [ ] Clear button works
- [ ] Close button works (if shown)
- [ ] Running indicator shows
- [ ] Font styling correct

### 17. Toolbar
- [ ] Save button works
- [ ] Run button works
- [ ] Stop button shows when running
- [ ] Buttons have glass styling
- [ ] Branding displays

### 18. Status Bar
- [ ] Save status shows
- [ ] Last saved time shows
- [ ] Current file shows
- [ ] Connection status shows
- [ ] Glass styling applied

## ✅ Functionality Tests

### 19. File Operations
- [ ] Create file works
- [ ] Delete file works
- [ ] Rename file works
- [ ] Edit file content works
- [ ] File tree updates

### 20. Auto-Save
- [ ] Auto-saves after delay
- [ ] Status updates
- [ ] Unsaved indicator shows
- [ ] Save callback fires

### 21. Code Execution
- [ ] Run button triggers execution
- [ ] Output appears in terminal
- [ ] Errors display correctly
- [ ] Execution can be stopped

### 22. Responsive Design
- [ ] Works on different screen sizes
- [ ] Panels resize correctly
- [ ] No overflow issues
- [ ] Scrollbars work

## ✅ Edge Cases

### 23. Empty State
- [ ] No files shows empty state
- [ ] No active file handles gracefully
- [ ] Empty file tree shows correctly

### 24. Error Handling
- [ ] Invalid config handled
- [ ] Storage errors caught
- [ ] Execution errors displayed
- [ ] Network errors handled

### 25. Performance
- [ ] Large files load quickly
- [ ] Many files in tree perform well
- [ ] Terminal output doesn't lag
- [ ] No memory leaks

## ✅ Integration Tests

### 26. With Local Storage
- [ ] Files persist
- [ ] Changes save
- [ ] File tree loads from disk

### 27. With GCS Storage
- [ ] Files load from GCS
- [ ] Files save to GCS
- [ ] Authentication works

### 28. With E2B Execution
- [ ] Code executes
- [ ] Output streams
- [ ] Errors handled

## ✅ Browser Compatibility

### 29. Chrome
- [ ] All features work
- [ ] No console errors
- [ ] Styling correct

### 30. Firefox
- [ ] All features work
- [ ] No console errors
- [ ] Styling correct

### 31. Safari
- [ ] All features work
- [ ] No console errors
- [ ] Styling correct

### 32. Edge
- [ ] All features work
- [ ] No console errors
- [ ] Styling correct

---

**Test Date:** _______________
**Tester:** _______________
**Notes:** _______________
