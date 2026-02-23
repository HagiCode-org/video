# Design: Hagicode 产品视频设计文档

**Change ID**: `hagicode-product-intro-video-with-remotion`
**Related**: [proposal.md](./proposal.md) | [tasks.md](./tasks.md)

---

## 1. Visual Design System

### 1.1 Color Palette

基于 Hagicode 的技术属性和 AI 定位，采用以下配色方案：

```typescript
// src/utils/theme.ts
export const colors = {
  // 主色 - 科技蓝紫渐变
  primary: {
    from: '#6366f1', // Indigo 500
    to: '#8b5cf6',   // Violet 500
  },

  // 辅助色
  secondary: {
    from: '#06b6d4', // Cyan 500
    to: '#3b82f6',   // Blue 500
  },

  // 强调色 - 用于 CTAs
  accent: '#f59e0b', // Amber 500

  // 背景色
  background: {
    dark: '#0f172a',  // Slate 900
    medium: '#1e293b', // Slate 800
    light: '#334155', // Slate 700
  },

  // 文字色
  text: {
    primary: '#f8fafc',  // Slate 50
    secondary: '#cbd5e1', // Slate 300
    muted: '#64748b',    // Slate 500
  },
};
```

### 1.2 Typography

```typescript
// src/utils/theme.ts
export const typography = {
  // 字体族
  fontFamily: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, Fira Code, monospace',
  },

  // 字体大小（相对于 1080p 高度）
  fontSize: {
    // 标题
    title: '120px',
    subtitle: '64px',
    sectionTitle: '48px',

    // 正文
    bodyLarge: '36px',
    body: '28px',
    bodySmall: '24px',

    // 辅助
    caption: '20px',
  },

  // 字重
  fontWeight: {
    bold: 700,
    semibold: 600,
    medium: 500,
    normal: 400,
  },
};
```

### 1.3 Spacing

```typescript
// src/utils/theme.ts
export const spacing = {
  // 相对于 1920x1080 画布
  padding: {
    page: '80px',
    section: '60px',
    element: '40px',
  },

  gap: {
    large: '60px',
    medium: '40px',
    small: '24px',
  },
};
```

---

## 2. Component Design Specifications

### 2.1 TextOverlay Component

**Purpose**: 通用文字叠加组件，支持多种动画效果

**Props Interface**:
```typescript
interface TextOverlayProps {
  text: string | string[];
  enterAnimation: 'fade' | 'slideUp' | 'scale' | 'typewriter';
  exitAnimation?: 'fade' | 'slideDown' | 'scale';
  position?: 'center' | 'top' | 'bottom';
  style?: React.CSSProperties;
  delay?: number; // frames
  duration?: number; // frames
}
```

**Design Variations**:
1. **Fade**: 淡入淡出，用于背景文字
2. **SlideUp**: 从下向上滑入，用于主要内容
3. **Scale**: 缩放进入，用于强调文字
4. **Typewriter**: 打字机效果，用于 Hook 场景

---

### 2.2 Logo Component (Text-Based)

**Purpose**: Hagicode 品牌 Logo 展示组件（文字型），支持多种出现方式

**Note**: 由于目前没有图形 Logo，本组件专注于文字型品牌展示

**Props Interface**:
```typescript
interface LogoProps {
  variant: 'full' | 'wordmark' | 'minimal';
  size?: number; // pixels
  animation: 'fade' | 'scale' | 'reveal' | 'gradient';
  showTagline?: boolean;
  useGradient?: boolean; // 是否使用渐变色
}
```

**Design Specifications**:
- **Full Variant**: 渐变色文字 + Slogan
- **Wordmark**: 仅文字 Logo（大号字体）
- **Minimal**: 简洁文字（小尺寸，用于角落）

**Text Styling**:
- Font: Inter 或 system-ui, bold weight
- Gradient: primary.from (#6366f1) → primary.to (#8b5cf6)
- Fallback: 单色 (text.primary)

**Animation Timing**:
- Scale: 0 → 1.1 → 1.0 (spring)
- Gradient: 颜色从左到右渐入效果
- Reveal: 文字逐字出现效果

---

### 2.3 FeatureCard Component

**Purpose**: 功能卡片，展示产品特性

**Props Interface**:
```typescript
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  layout: 'horizontal' | 'vertical';
  image?: string; // 可选的 UI 截图
  enterAnimation: 'slideLeft' | 'slideRight' | 'fadeIn' | 'scaleIn';
}
```

**Layout Specifications**:

**Horizontal Layout** (用于主要功能展示):
```
┌─────────────────────────────────────┐
│ [Icon]  Title                       │
│         Description text...          │
│         [UI Screenshot]              │
└─────────────────────────────────────┘
```

**Vertical Layout** (用于优势列表):
```
┌──────────┐
│   [Icon] │
│   Title  │
│   Desc   │
└──────────┘
```

---

### 2.4 Transition Component

**Purpose**: 场景间转场效果

**Props Interface**:
```typescript
interface TransitionProps {
  type: 'fade' | 'wipe' | 'zoom' | 'slide';
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number; // frames
}
```

**Transition Easing**:
```typescript
export const easings = {
  smooth: easings.easeInOutCubic,
  bouncy: easings.easeOutElastic,
  sharp: easings.easeInOutQuint,
};
```

---

### 2.5 CTAButton Component

**Purpose**: 行动号召按钮

**Props Interface**:
```typescript
interface CTAButtonProps {
  text: string;
  url: string;
  variant: 'primary' | 'secondary';
  size: 'large' | 'medium';
}
```

**Design Specifications**:
- **Primary**: 渐变背景 (primary.from → primary.to)
- **Secondary**: 描边样式
- **Hover Effect**: 微缩放 + 光晕效果

---

## 3. Scene Design Details

### 3.1 Scene 1: Hook (0-8s)

**Purpose**: 引起共鸣，展示用户痛点

**Design Concept**: 逐个展示痛点，营造共鸣氛围

```
┌─────────────────────────────────────┐
│                                     │
│   "代码开发效率低？"                  │
│         (fade out)                  │
│                                     │
│   "AI 辅助不够智能？"                │
│         (fade out)                  │
│                                     │
│   "团队协作混乱？"                   │
│         (fade out)                  │
│                                     │
│   "项目文档难以维护？"               │
│         (fade out)                  │
└─────────────────────────────────────┘
```

**Animation Details**:
- 每个痛点: 淡入 (15f) → 停留 (45f) → 淡出 (15f) = 75f ≈ 2.5s
- 共 4 个痛点 = 约 8s
- 字体: bodyLarge (36px), 颜色: text.secondary
- 背景: 轻微的动态粒子效果或网格

---

### 3.2 Scene 2: Introduction (8-20s)

**Purpose**: 介绍 Hagicode 产品

**Design Concept**: Logo 动画 + 核心价值主张

```
┌─────────────────────────────────────┐
│                                     │
│         [Hagicode 文字 Logo]        │
│            (scale in, 渐变色)        │
│                                     │
│      "AI 驱动的智能开发平台"         │
│         (fade in)                   │
│                                     │
│      "让 AI 成为你的开发伙伴"         │
│         (fade in)                   │
│                                     │
└─────────────────────────────────────┘
```

**Animation Details**:
- 0-4s: 文字 Logo 缩放进入（使用渐变色效果）
- 4-8s: 标题淡入
- 8-12s: Slogan 淡入
- 背景: 渐变光晕效果

---

### 3.3 Scene 3: Features (20-50s)

**Purpose**: 展示核心功能

#### Scene 3.1: AI 辅助开发 (20-30s)

**Design Concept**: UI 演示 + 关键特性

```
┌─────────────────────────────────────┐
│ [AI Icon]  AI 辅助开发              │
│                                     │
│ ┌─────────────────────────────┐    │
│ │                             │    │
│ │   [Hagicode UI Screenshot]  │    │
│ │   - 智能代码生成            │    │
│ │   - 实时上下文补全          │    │
│ │   - 智能代码审查            │    │
│ │                             │    │
│ └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**Animation Details**:
- 0-2s: 标题和图标滑入
- 2-4s: UI 截图缩放进入
- 4-8s: 特性列表逐项出现
- 8-10s: 停留展示

#### Scene 3.2: OpenSpec 工作流 (30-40s)

**Design Concept**: 流程图展示

```
┌─────────────────────────────────────┐
│ [Spec Icon]  OpenSpec 工作流        │
│                                     │
│   [提案] → [评审] → [开发] → [验证]  │
│    (1)      (2)      (3)      (4)    │
│                                     │
│   "结构化开发 · 全流程追溯"          │
└─────────────────────────────────────┘
```

**Animation Details**:
- 流程节点依次出现并连线
- 每个节点有对应的图标和简短文字

#### Scene 3.3: 实时协作 (40-50s)

**Design Concept**: 多用户协作场景

```
┌─────────────────────────────────────┐
│ [Collab Icon]  实时团队协作         │
│                                     │
│   [用户1] ──────┐                   │
│           ↕     │                   │
│   [用户2] ─── [共享代码]            │
│           ↕     │                   │
│   [用户3] ──────┘                   │
│                                     │
│   "实时同步 · 无缝协作"              │
└─────────────────────────────────────┘
```

---

### 3.4 Scene 4: Advantages (50-55s)

**Purpose**: 突出产品优势

**Design Concept**: 三列优势卡片

```
┌─────────────────────────────────────┐
│  为什么选择 Hagicode？               │
│                                     │
│  [⚡]     [🏢]     [🔓]            │
│ 开箱即用  企业级  开源可定制        │
│                                     │
└─────────────────────────────────────┘
```

**Animation Details**:
- 三张卡片依次滑入
- 使用大号 Emoji 或图标

---

### 3.5 Scene 5: CTA (55-60s)

**Purpose**: 行动号召

**Design Concept**: 大标题 + 链接

```
┌─────────────────────────────────────┐
│                                     │
│     立即体验 Hagicode                │
│                                     │
│  [GitHub: github.com/xxx]           │
│  [官网: hagicode.com]               │
│                                     │
│     [Hagicode 文字 Logo]            │
│     (小尺寸，底部)                   │
│                                     │
└─────────────────────────────────────┘
```

**Animation Details**:
- 主标题缩放进入
- 链接按钮淡入并带有脉冲效果
- 文字 Logo 淡入在底部（小尺寸）

---

## 4. Technical Implementation Notes

### 4.1 Video Configuration

```typescript
// remotion.config.ts
import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

Config.setPreset('ffmpeg', {
  // 1080p 输出
  MimeType: 'video/mp4',
  TargetQuality: 95,
  PixelFormat: 'yuv420p',
  Codec: 'h264',
  Framerate: 30,
  Crf: 23,
});
```

### 4.2 Composition Structure

```typescript
// src/Root.tsx
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HagicodeIntro"
        component={HagicodeIntroVideo}
        durationInFrames={1800} // 60s @ 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          // Pass props here
        }}
      />
    </>
  );
};
```

### 4.3 Animation Utilities

```typescript
// src/components/Logo.tsx - 文字型 Logo 实现
import { AbsoluteFill } from 'remotion';

export const Logo: React.FC<LogoProps> = ({ variant, size, animation, useGradient = true }) => {
  const gradientStyle = useGradient ? {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } : {
    color: '#f8fafc',
  };

  return (
    <div style={{
      fontSize: variant === 'full' ? '120px' : size,
      fontWeight: 700,
      fontFamily: 'Inter, system-ui, sans-serif',
      ...gradientStyle,
    }}>
      Hagicode
    </div>
  );
};
```

```typescript
// src/utils/animations.ts
import {
  spring,
  interpolate,
  Easing,
} from 'remotion';

export const fadeIn = (frame: number, delay: number, duration: number) => {
  return interpolate(
    frame,
    [delay, delay + duration],
    [0, 1],
    { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) }
  );
};

export const slideUp = (frame: number, fps: number) => {
  return spring({
    frame: frame - fps,
    fps,
    config: {
      damping: 12,
      stiffness: 80,
      mass: 1,
    },
  });
};
```

---

## 5. Asset Requirements

### 5.1 Required Assets

| Asset | Format | Size | Location |
|-------|--------|------|----------|
| Text Logo | CSS/Styled Component | - | 代码实现（无需图片文件） |
| UI Screenshots | PNG | 1920x1080 | `src/assets/screenshots/` |
| Background Music | MP3, WAV | - | `src/assets/audio/` |
| Icons | SVG/Lucide | - | NPM: lucide-react |

### 5.2 Asset Optimization

- **Text Logo**: 代码实现，支持缩放无失真
- **Images**: 使用 PNG 压缩工具优化文件大小
- **Icons**: 使用 Lucide React (基于 SVG)
- **Audio**: 压缩为 128kbps MP3

---

## 6. Rendering Specifications

### 6.1 Output Formats

| Format | Resolution | Bitrate | Use Case |
|--------|-----------|---------|----------|
| MP4 (H.264) | 1920x1080 | ~8 Mbps | Web, Standard |
| MP4 (H.264) | 3840x2160 | ~20 Mbps | High Quality |
| WebM (VP9) | 1920x1080 | ~6 Mbps | Web Optimized |

### 6.2 Render Commands

```bash
# 1080p
npm run build -- HagicodeIntro --output=hagicode-intro-1080p.mp4

# 4K
npm run build -- HagicodeIntro --output=hagicode-intro-4k.mp4 --scale=2

# 带预览渲染
npm run start -- HagicodeIntro
```

---

**This design document provides the visual and technical specifications for implementing the Hagicode product video using Remotion.**
