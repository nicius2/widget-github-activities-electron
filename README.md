# GitHub Activity Widget

Desktop widget created with Electron + TypeScript that displays your GitHub activity graph on your desktop.

## 🚀 How to Use

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure GitHub Token

You need to create a Personal Access Token on GitHub:

1. Go to: https://github.com/settings/tokens
2. Click on "Generate new token" → "Generate new token (classic)"
3. Give the token a name (e.g., "Desktop Widget")
4. Select the scope: `read:user`
5. Click on "Generate token"
6. Copy the generated token

### 3. Create .env file

Create a `.env` file in the root of the project (use `.env.example` as a template):

```bash
cp .env.example .env
```

Edit the `.env` file and add your credentials:

```env
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=your-token-here

# Widget position (optional)
WIDGET_X=20
WIDGET_Y=20
```

### 4. Run the Widget

```bash
npm start
```

## 📦 Available Scripts

- `npm run build` - Compiles TypeScript
- `npm start` - Compiles and starts the widget
- `npm run dev` - Compiles and starts (development mode)
- `npm run watch` - Compiles automatically on save

## ✨ Features

- ✅ Design identical to GitHub (black background with green dots)
- ✅ Appears on the desktop (wallpaper layer)
- ✅ Runs in the background lightly
- ✅ Transparent and borderless
- ✅ Draggable by the top bar
- ✅ Tooltips with contribution details
- ✅ Configuration via .env file

## 🎨 Contribution Levels

The widget uses the same colors as GitHub:
- Dark gray: No contribution
- Dark green: Few contributions
- Medium green: Moderate contributions
- Light green: Many contributions
- Bright green: Intense contributions

## 🔒 Security

⚠️ **IMPORTANT**: Never share your GitHub token publicly. The `.env` file is already in `.gitignore` to protect your credentials.
