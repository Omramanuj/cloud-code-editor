# ideOnWeb UI Elements Reference

Quick reference guide for the UI components and their styling.

## Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  ideOnWeb             [💾 Save] [▶ Run] [👤]            │ ← Top Bar
├────┬────────┬──────────────────────────────────────────┤
│    │        │                                           │
│ 📁 │ Files  │                                           │
│    │        │    Code Editor Area                       │
│ 📄 │ agent  │    (Monaco Editor)                        │
│    │ .py    │                                           │
│ 🧩 │ config │                                           │
│    │ .json  │                                           │
│ 🔀 │ utils  │                                           │
│    │ .py    │                                           │
│ 💬 │        ├───────────────────────────────────────────┤
│    │        │ Terminal                          [Clear] │
│ 💻 │        │ > output appears here...                  │
│    │        │                                           │
│ ⚙️ │        │                                           │
│    │        │                                           │
│ ⋯  │        │                                           │
├────┴────────┴───────────────────────────────────────────┤
│ Saved at 11:03 PM  agent.py         🟢 Connected       │ ← Status Bar
└─────────────────────────────────────────────────────────┘
   ↑           ↑                ↑
Icon Bar   File Tree      Main Content
```

## Component Breakdown

### 1. Top Bar
```tsx
Height: 48px (3rem)
Background: #252526
Border: 1px solid #1e1e1e

┌─────────────────────────────────────────────┐
│ ide[On]Web    [💾 Save] [▶ Run] [👤]        │
│   ↑  ↑  ↑        ↑        ↑       ↑         │
│   │  │  │        │        │       │         │
│   │  │  └─ White │        │       └─ Avatar │
│   │  └─ Green    │        └─ Play button    │
│   └─ White       └─ Document icon           │
└─────────────────────────────────────────────┘
```

**CSS**:
```css
.top-bar {
  height: 48px;
  background: #252526;
  border-bottom: 1px solid #1e1e1e;
  padding: 0 16px;
}

.logo-text {
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.logo-on {
  color: #10b981; /* Green accent */
}

.action-button {
  background: #3e3e42;
  border: 1px solid #5a5a5f;
  color: white;
  padding: 6px 16px;
  border-radius: 4px;
}

.action-button:hover {
  background: #4a4a4f;
}
```

### 2. Icon Sidebar
```tsx
Width: 48px (3rem)
Background: #1e1e1e
Border: 1px solid #2b2b2b

┌────┐
│ 📁 │ ← Files (active: bg #37373d, border-left: 2px #10b981)
├────┤
│ 📄 │ ← Documents (hover: bg #2a2a2d)
├────┤
│ 🧩 │ ← Extensions
├────┤
│ 🔀 │ ← Git
├────┤
│ 💬 │ ← Chat
├────┤
│ 💻 │ ← Terminal
├────┤
│    │ ← Spacer (flex-grow: 1)
├────┤
│ ⚙️ │ ← Settings
├────┤
│ ⋯  │ ← More
└────┘
```

**CSS**:
```css
.icon-sidebar {
  width: 48px;
  background: #1e1e1e;
  border-right: 1px solid #2b2b2b;
}

.icon-button {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #858585;
  cursor: pointer;
}

.icon-button:hover {
  background: #2a2a2d;
  color: white;
}

.icon-button.active {
  background: #37373d;
  border-left: 2px solid #10b981;
  color: white;
}
```

### 3. File Tree
```tsx
Width: 250px (default, resizable)
Background: #252526
Border: 1px solid #1e1e1e

┌─────────────────┐
│ EXPLORER        │ ← Header
├─────────────────┤
│ ▼ 📂 src        │ ← Folder (expanded)
│   📄 index.js   │ ← File
│   📄 app.js     │ ← File (active: bg #37373d, border-left: 2px #007acc)
│ ▶ 📂 public     │ ← Folder (collapsed)
│ 📄 package.json │ ← File
└─────────────────┘
```

**CSS**:
```css
.file-tree {
  width: 250px;
  background: #252526;
  border-right: 1px solid #1e1e1e;
}

.file-tree-header {
  padding: 8px 12px;
  border-bottom: 1px solid #1e1e1e;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
}

.file-item {
  padding: 4px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
}

.file-item:hover {
  background: #2a2d2e;
}

.file-item.active {
  background: #37373d;
  border-left: 2px solid #007acc;
  color: white;
}

.folder-icon {
  color: #dcb67a; /* Yellow */
}
```

### 4. Terminal
```tsx
Height: 200px (default, resizable)
Background: #1e1e1e
Border: 1px solid #252526

┌─────────────────────────────────────┐
│ Terminal        [Clear] [Close] [×] │ ← Header
├─────────────────────────────────────┤
│ print("🦅 ADK Agent Started!")      │
│ print("=" * 50)                     │
│ "Analyzing data...",                │
│ "Processing requests...",           │
│ "Generating response...",           │
│ print("=" * 50)                     │
│ print("✅ Agent execution completed │
│ successfully!")                     │
│ █                                   │ ← Cursor
└─────────────────────────────────────┘
```

**CSS**:
```css
.terminal {
  height: 200px;
  background: #1e1e1e;
  border-top: 1px solid #252526;
  font-family: 'Consolas', 'Monaco', monospace;
}

.terminal-header {
  padding: 6px 16px;
  border-bottom: 1px solid #252526;
  background: #1e1e1e;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.terminal-title {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
}

.terminal-output {
  padding: 8px 16px;
  color: #cccccc;
  font-size: 13px;
  line-height: 1.5;
  overflow-y: auto;
}

.terminal-error {
  color: #f48771;
}

.terminal-number {
  color: #b5cea8;
}
```

### 5. Status Bar
```tsx
Height: 28px
Background: #007acc (Blue)
Color: white

┌─────────────────────────────────────────────┐
│ Saved at 11:03 PM  agent.py    🟢 Connected │
│    ↑                  ↑            ↑         │
│    │                  │            │         │
│    └─ Timestamp       │            └─ Status│
│                       └─ Current file       │
└─────────────────────────────────────────────┘
```

**CSS**:
```css
.status-bar {
  height: 28px;
  background: #007acc;
  color: white;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4ade80; /* Green when connected */
}

.status-dot.disconnected {
  background: #ef4444; /* Red when disconnected */
}
```

## Color Reference Card

```css
/* Backgrounds */
--dark-bg:     #1e1e1e  ████████
--sidebar-bg:  #252526  ████████
--hover-bg:    #2a2d2e  ████████
--active-bg:   #37373d  ████████
--border:      #2b2b2b  ████████

/* Accents */
--blue:        #007acc  ████████
--green:       #10b981  ████████
--green-light: #4ade80  ████████
--yellow:      #dcb67a  ████████
--red:         #f48771  ████████
--cyan:        #b5cea8  ████████

/* Text */
--text-90:     #e6e6e6  ████████ (90% white)
--text-80:     #cccccc  ████████ (80% white)
--text-60:     #999999  ████████ (60% white)
--text-30:     #4d4d4d  ████████ (30% white)
```

## Sizing Reference

```
Icon Sidebar:    48px  ═══
File Tree:      250px  ═════════════
Terminal:       200px  ══════════
Top Bar:         48px  ═══
Status Bar:      28px  ══
```

## Typography

```
Logo:           18px, weight: 600
Headers:        11px, weight: 600, uppercase
File Names:     14px, weight: 400
Terminal:       13px, monospace
Status Bar:     12px, weight: 400
Buttons:        14px, weight: 500
```

## Transitions

```css
/* Smooth transitions for interactive elements */
transition: all 0.2s ease;

/* Hover states */
transform: translateY(-2px); /* Buttons */
background: /* +10% lightness */;

/* Active states */
border-left: 2px solid var(--accent);
```

---

**Use this guide** to maintain consistency when customizing or extending the UI!
