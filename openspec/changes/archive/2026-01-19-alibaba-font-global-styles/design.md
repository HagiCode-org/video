# 阿里字体全局样式 - 设计文档

## 概述

本文档详细说明了项目中阿里字体（AlibabaPuHuiTi-3）的全局样式配置设计，包括字体资源、配置层级、使用规范等内容。

## 字体资源

### AlibabaPuHuiTi-3 简介

阿里巴巴普惠体 3.0 是阿里巴巴官方开源的中文字体，专为屏幕显示优化，具有良好的可读性和现代感。

### 当前字体配置

项目已优化的字体权重（共 5 个，约 105MB）：

| 权重 | 名称 | 使用场景 | 代码用量 |
|------|------|----------|----------|
| 400 | Regular | 标签、普通文本 | 5 处 |
| 500 | Medium | 正文、最常用权重 | 26 处 |
| 600 | SemiBold | 小标题、强调 | 29 处 |
| 700 | Bold | 标题、主标题（最多） | 47 处 |
| 800 | ExtraBold | 特定场景的主标题 | 2 处 |

**已移除权重**（未使用）：
- 100 (Thin) - 34MB
- 300 (Light) - 34MB
- 900 (Heavy) - 10MB
- 950 (Black) - 9.8MB
- RegularL3 - 79MB

### 字体文件位置

```
src/assets/fonts/
├── fonts.css                    # @font-face 声明
└── AlibabaPuHuiTi-3/
    ├── AlibabaPuHuiTi-3-55-Regular/
    ├── AlibabaPuHuiTi-3-65-Medium/
    ├── AlibabaPuHuiTi-3-75-SemiBold/
    ├── AlibabaPuHuiTi-3-85-Bold/
    └── AlibabaPuHuiTi-3-95-ExtraBold/
```

## 配置架构

### 三层配置体系

```
┌─────────────────────────────────────────────────────┐
│                    全局样式层                         │
│  src/index.css - :root 变量 + 全局 font-family      │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                    主题配置层                         │
│  src/utils/theme.ts - typography.fontFamily.*       │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                    组件使用层                         │
│  各组件通过 style 或 CSS 类应用字体                   │
└─────────────────────────────────────────────────────┘
```

### 字体栈设计

#### 标准字体栈

```css
"AlibabaPuHuiTi-3", system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif
```

**优先级说明**：
1. `AlibabaPuHuiTi-3` - 项目主字体
2. `system-ui` - 系统默认 UI 字体（跨平台）
3. `-apple-system` - Apple 系统字体
4. `BlinkMacSystemFont` - Chrome/Edge 系统字体
5. `PingFang SC` - 苹方（macOS/iOS 中文字体）
6. `Microsoft YaHei` - 微软雅黑（Windows 中文字体）
7. `sans-serif` - 通用无衬线字体回退

#### 等宽字体栈

```css
ui-monospace, SFMono-Regular, Menlo, Monaco, 'Cascadia Code', monospace
```

**使用场景**：代码片段、版本号、技术术语

### 主题配置映射

```typescript
// src/utils/theme.ts
export const typography = {
  fontFamily: {
    heading: '"AlibabaPuHuiTi-3", system-ui, ...',
    body:    '"AlibabaPuHuiTi-3", system-ui, ...',
    mono:    'ui-monospace, SFMono-Regular, ...',
  },
};

export const videoTypography = {
  fontFamily: {
    heading: '"AlibabaPuHuiTi-3", system-ui, ...',
    body:    '"AlibabaPuHuiTi-3", system-ui, ...',
  },
};

export const mobileVideoTypography = {
  fontFamily: {
    heading: '"AlibabaPuHuiTi-3", system-ui, ...',
    body:    '"AlibabaPuHuiTi-3", system-ui, ...',
  },
};
```

## 使用规范

### 组件字体使用模式

#### 模式 1: 依赖全局样式（推荐）

```tsx
// 不设置 fontFamily，使用全局默认
<div style={{ fontSize: '48px', fontWeight: 600 }}>
  标题文本
</div>
```

#### 模式 2: 使用主题配置

```tsx
import { typography } from '../utils/theme';

<div style={{ fontFamily: typography.fontFamily.heading }}>
  标题文本
</div>
```

#### 模式 3: Tailwind 类（如启用）

```tsx
<div className="font-heading">
  标题文本
</div>
```

### 字体权重使用建议

| 场景 | 推荐权重 | CSS 值 |
|------|----------|--------|
| 大标题/Hero | 800 | ExtraBold |
| 标题/Heading | 700 | Bold |
| 小标题/Subheading | 600 | SemiBold |
| 正文/Body | 500 | Medium |
| 说明文字/Caption | 400 | Regular |

### 字体大小参考

#### 桌面视频 (1920x1080)

```typescript
fontSize: {
  hero:      '140px',  // 主品牌标题
  title:     '110px',  // 章节标题
  subtitle:  '70px',   // 次级标题
  bodyLarge: '60px',   // 主要正文
  body:      '52px',   // 标准正文
  bodySmall: '44px',   // 辅助文字
  caption:   '38px',   // 说明文字
}
```

#### 移动视频 (1080x1920)

```typescript
fontSize: {
  hero:      '160px',  // 主品牌标题
  title:     '120px',  // 章节标题
  subtitle:  '76px',   // 次级标题
  bodyLarge: '60px',   // 主要正文
  body:      '52px',   // 标准正文
  bodySmall: '46px',   // 辅助文字
  caption:   '40px',   // 说明文字
}
```

## 实施细节

### 全局样式实现

```css
/* src/index.css */
@import "tailwindcss";

/* 全局字体配置 */
:root {
  --font-family-base: "AlibabaPuHuiTi-3", system-ui, -apple-system,
                      BlinkMacSystemFont, "PingFang SC",
                      "Microsoft YaHei", sans-serif;
  --font-family-mono: ui-monospace, SFMono-Regular, Menlo,
                      Monaco, 'Cascadia Code', monospace;
}

/* 默认所有元素使用阿里字体 */
* {
  font-family: var(--font-family-base);
}

/* 代码类元素使用等宽字体 */
code, pre, .font-mono, [class*="language-"] {
  font-family: var(--font-family-mono);
}
```

### 组件迁移模板

**迁移前**：
```tsx
<div style={{
  fontFamily: 'Space Grotesk, Inter, sans-serif',
  fontSize: '48px',
  fontWeight: 700,
}}>
  标题
</div>
```

**迁移后**（方案 A：使用全局样式）：
```tsx
<div style={{
  // 移除 fontFamily 声明，使用全局默认
  fontSize: '48px',
  fontWeight: 700,
}}>
  标题
</div>
```

**迁移后**（方案 B：使用主题配置）：
```tsx
import { typography } from '../utils/theme';

<div style={{
  fontFamily: typography.fontFamily.heading,
  fontSize: '48px',
  fontWeight: 700,
}}>
  标题
</div>
```

## 性能考虑

### 字体加载优化

1. **font-display: swap** - 已在 fonts.css 中设置
2. **字体子集** - 当前使用完整字体集，未来可考虑按需子集化
3. **本地存储** - 字体文件存储在 `src/assets/fonts/`，打包时内联

### FOUT 预防

```css
/* 可选：添加加载状态 */
@font-face {
  font-family: 'AlibabaPuHuiTi-3';
  src: url('./AlibabaPuHuiTi-3-85-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap; /* 已设置 */
}
```

## 兼容性

### 平台支持

| 平台 | 回退字体 | 备注 |
|------|----------|------|
| macOS | PingFang SC | 与阿里字体风格接近 |
| iOS | PingFang SC | 系统默认 |
| Windows | Microsoft YaHei | 常见中文字体 |
| Android | Noto Sans CJK | 系统默认 |
| Linux | WenQuanYi Micro Hei | 常见开源字体 |

### 浏览器支持

- Chrome/Edge: 完全支持
- Firefox: 完全支持
- Safari: 完全支持

## 维护指南

### 添加新字体权重

1. 将字体文件放入对应目录
2. 在 `src/assets/fonts/fonts.css` 中添加 `@font-face` 声明
3. 更新本文档的字体权重表

### 更新主题配置

如需调整字体栈，修改 `src/utils/theme.ts` 中的 `typography.fontFamily` 配置。

## 参考资料

- [AlibabaPuHuiTi-3 GitHub](https://github.com/alibaba/thin-hollow-font)
- [font-display: swap 说明](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display)
