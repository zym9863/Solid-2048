[English](README_EN.md)

# 2048 游戏 - Solid.js 版本

这是一个使用 Solid.js 构建的经典 2048 数字游戏，具有现代化的界面设计和流畅的游戏体验。

## 🎮 游戏特性

- **经典 2048 玩法**：移动数字方块，相同数字合并
- **现代化设计**：美观的渐变背景和圆角界面
- **响应式布局**：完美适配桌面和移动设备
- **多种操作方式**：
  - 桌面端：使用键盘方向键
  - 移动端：触摸滑动操作
- **实时分数统计**：显示当前得分
- **游戏状态提示**：获胜和失败提示
- **一键重新开始**：随时重新开始游戏

## 🚀 技术栈

- **前端框架**：Solid.js 1.9.7
- **构建工具**：Vite 7.0
- **开发语言**：TypeScript
- **包管理器**：pnpm
- **样式**：CSS3 (Grid + Flexbox)

## 🎯 游戏规则

1. 使用方向键（桌面）或滑动手势（移动端）移动数字方块
2. 相同数字的方块会合并成一个更大的数字
3. 每次移动后会随机出现一个新的数字方块（2 或 4）
4. 目标是合成 2048 数字方块以获胜
5. 当无法再移动时游戏结束

## 🛠️ 开发和运行

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器
```bash
pnpm dev
```
服务器将在 http://localhost:5173 启动

### 构建生产版本
```bash
pnpm build
```

### 预览构建结果
```bash
pnpm preview
```

## 📱 兼容性

- 支持所有现代浏览器
- 响应式设计，适配手机、平板和桌面
- 触摸操作友好，支持滑动手势

## 🎨 界面预览

- 渐变背景，视觉效果优雅
- 数字方块采用不同颜色，便于区分
- 平滑的动画过渡效果
- 清晰的分数显示和操作提示

## 📁 项目结构

```
src/
├── App.tsx          # 主应用组件
├── App.css          # 应用样式
├── Game2048.tsx     # 2048游戏主组件
├── Game2048.css     # 游戏样式
├── index.tsx        # 应用入口
└── index.css        # 全局样式
```

开始游戏，挑战你的数字合并技巧吧！🎯

---

*基于 Solid.js 和 Vite 构建，享受快速的开发体验和优秀的性能*
