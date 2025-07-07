[中文](README.md)

# 2048 Game - Solid.js Version

This is a classic 2048 number game built with Solid.js, featuring a modern interface and smooth gameplay.

## 🎮 Game Features

- **Classic 2048 Gameplay**: Move number tiles, merge identical numbers
- **Modern Design**: Beautiful gradient background and rounded interface
- **Responsive Layout**: Perfectly adapts to desktop and mobile devices
- **Multiple Controls**:
  - Desktop: Use keyboard arrow keys
  - Mobile: Touch swipe gestures
- **Real-time Score Tracking**: Displays current score
- **Game Status Prompts**: Win and lose notifications
- **One-click Restart**: Restart the game at any time

## 🚀 Tech Stack

- **Frontend Framework**: Solid.js 1.9.7
- **Build Tool**: Vite 7.0
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Styles**: CSS3 (Grid + Flexbox)

## 🎯 Game Rules

1. Use arrow keys (desktop) or swipe gestures (mobile) to move number tiles
2. Tiles with the same number merge into a bigger number
3. After each move, a new tile (2 or 4) appears randomly
4. The goal is to create a 2048 tile to win
5. The game ends when no more moves are possible

## 🛠️ Development & Run

### Install dependencies
```bash
pnpm install
```

### Start development server
```bash
pnpm dev
```
The server will start at http://localhost:5173

### Build for production
```bash
pnpm build
```

### Preview production build
```bash
pnpm preview
```

## 📱 Compatibility

- Supports all modern browsers
- Responsive design for mobile, tablet, and desktop
- Touch-friendly, supports swipe gestures

## 🎨 UI Preview

- Elegant gradient background
- Number tiles in different colors for easy distinction
- Smooth animation transitions
- Clear score display and operation prompts

## 📁 Project Structure

```
src/
├── App.tsx          # Main app component
├── App.css          # App styles
├── Game2048.tsx     # 2048 game main component
├── Game2048.css     # Game styles
├── index.tsx        # App entry
└── index.css        # Global styles
```

Start the game and challenge your number merging skills! 🎯

---

*Built with Solid.js and Vite for a fast development experience and excellent performance*
