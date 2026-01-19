# Design Document

优化 HagicodeReleaseNotesMobile 第二幕移动端布局 - 技术设计文档

**Change ID:** `mobile-layout-optimization-hagicode-scene2`
**Proposal:** [proposal.md](./proposal.md)
**Tasks:** [tasks.md](./tasks.md)

---

## Overview

本文档详细说明如何将现有的 `HighlightItem` 组件改造为同时支持桌面端和移动端的统一组件。

---

## Architecture

### Current Architecture

```
HagicodeIntroVideo (1920x1080, 30fps)
└── Series.Sequence (Highlights)
    └── HighlightItem ← Desktop-optimized

HagicodeReleaseNotesMobile (1080x1920, 60fps)
└── Series.Sequence (Highlights)
    └── HighlightItem ← Currently using desktop-optimized component ❌
```

### Target Architecture

```
HighlightItem (Unified Component)
├── isMobile?: boolean prop
├── Config selection logic
│   ├── Desktop mode (isMobile: false)
│   │   ├── typography
│   │   ├── videoLayout
│   │   ├── fps: 30
│   │   └── Canvas: 1920x1080
│   └── Mobile mode (isMobile: true)
│       ├── mobileVideoTypography
│       ├── mobileVideoLayout
│       ├── fps: 60
│       └── Canvas: 1080x1920
└── Conditional rendering based on config
```

---

## Component Interface

### Props Interface

```typescript
export interface HighlightItemProps {
  item: HighlightItemType;
  index: number;
  total: number;
  delay?: number;
  isMobile?: boolean; // 新增：默认 false
}
```

### Usage Examples

```tsx
// Desktop usage (default)
<HighlightItem
  item={item}
  index={index}
  total={total}
/>

// Mobile usage
<HighlightItem
  item={item}
  index={index}
  total={total}
  isMobile={true}
/>
```

---

## Configuration System

### Config Object Structure

在组件顶部根据 `isMobile` 创建配置对象：

```tsx
const config = isMobile ? {
  // Mobile configuration
  typography: mobileVideoTypography,
  layout: mobileVideoLayout,
  fps: 60,
  canvasWidth: 1080,
  canvasHeight: 1920,
  cardWidth: hasScreenshot ? 860 : 800,
  cardPadding: hasScreenshot ? '40px' : '48px',
  containerPadding: `${mobileVideoLayout.safeZone.vertical}px ${mobileVideoLayout.safeZone.horizontal}px`,
  counterPosition: { top: '80px', right: '60px' },
  screenshotMaxHeight: '600px',
  scanlineRange: [-100, 1000],
  springMultiplier: 2, // 动画帧数翻倍
} : {
  // Desktop configuration
  typography: typography,
  layout: videoLayout,
  fps: 30,
  canvasWidth: 1920,
  canvasHeight: 1080,
  cardWidth: hasScreenshot ? 1400 : 1200,
  cardPadding: hasScreenshot ? '60px' : '80px',
  containerPadding: '100px',
  counterPosition: { top: '80px', right: '100px' },
  screenshotMaxHeight: '500px',
  scanlineRange: [-100, 600],
  springMultiplier: 1,
};
```

---

## Layout Adaptations

### Container Layout

| Element | Desktop | Mobile |
|---------|---------|--------|
| Padding | `100px` | `safeZone` (80px vertical, 60px horizontal) |
| Counter Position | `top: 80px, right: 100px` | `top: 80px, right: 60px` |
| Progress Bar | Bottom 6px height | Same |

### Card Layout

| Element | Desktop | Mobile |
|---------|---------|--------|
| Width (with screenshot) | `1400px` | `860px` |
| Width (without screenshot) | `1200px` | `800px` |
| Padding (with screenshot) | `60px` | `40px` |
| Padding (without screenshot) | `80px` | `48px` |
| Border Radius | `32px` | `32px` (same) |

### Typography

| Element | Desktop | Mobile |
|---------|---------|--------|
| Title | `typography.fontSize.subtitle` (64px) | `mobileVideoTypography.fontSize.subtitle` (76px) |
| Description | `typography.fontSize.bodyLarge` (36px) | `mobileVideoTypography.fontSize.bodyLarge` (60px) |
| Tags | `typography.fontSize.bodySmall` (26px) | `mobileVideoTypography.fontSize.bodySmall` (46px) |
| Counter | `typography.fontSize.subtitle` (64px) | `mobileVideoTypography.fontSize.bodyLarge` (60px) |

### Screenshot Container

| Element | Desktop | Mobile |
|---------|---------|--------|
| Max Height | `500px` | `600px` |
| Object Fit | `contain` | `contain` (same) |
| Scanline Range | `[-100, 600]` | `[-100, 1000]` |

---

## Animation Adaptations

### Spring Configuration

```tsx
// Desktop
const cardSpring = spring({
  frame: effectiveFrame,
  fps: 30,
  config: { damping: 12, stiffness: 80, mass: 0.6 },
});

// Mobile
const cardSpring = spring({
  frame: effectiveFrame,
  fps: 60,
  config: { damping: 12, stiffness: 80, mass: 0.6 },
});
```

### Frame Range Adjustments

由于移动端使用 60fps，需要将所有动画的帧数范围翻倍以保持相同的动画时长：

```tsx
// Desktop (30fps) - 4 seconds = 120 frames
const progressWidth = interpolate(effectiveFrame, [0, 120], [0, 100]);

// Mobile (60fps) - 4 seconds = 240 frames
const progressWidth = interpolate(effectiveFrame, [0, 240], [0, 100]);

// 使用配置简化
const progressWidth = interpolate(effectiveFrame,
  [0, 120 * config.springMultiplier],
  [0, 100]
);
```

### Particle Generation

```tsx
// 根据画布宽度生成粒子
const particles = React.useMemo(() => {
  const particleCount = 8;
  return Array.from({ length: particleCount }, (_, i) => ({
    delay: i * 15,
    duration: 100 + Math.random() * 50,
    size: 4 + Math.random() * 8,
    x: Math.random() * config.canvasWidth, // 使用配置中的宽度
    y: (config.canvasHeight * 0.8) + Math.random() * (config.canvasHeight * 0.1),
    opacity: 0.3 + Math.random() * 0.4,
  }));
}, [config.canvasWidth, config.canvasHeight]);
```

---

## Implementation Details

### Code Organization

```tsx
export const HighlightItem: React.FC<HighlightItemProps> = ({
  item,
  index,
  total,
  delay = 0,
  isMobile = false,
}) => {
  const frame = useCurrentFrame();
  const effectiveFrame = frame - delay;
  const hasScreenshot = !!item.screenshot;

  // 1. Configuration selection
  const config = isMobile ? { /* mobile config */ } : { /* desktop config */ };

  // 2. Animation calculations (using config)
  const cardSpring = spring({ frame: effectiveFrame, fps: config.fps, ... });
  const cardX = interpolate(cardSpring, [0, 1], [500, 0]);

  // 3. Render (using config values)
  return (
    <AbsoluteFill style={{ padding: config.containerPadding }}>
      {/* Content using config.typography, config.cardWidth, etc. */}
    </AbsoluteFill>
  );
};
```

### Type Safety

```tsx
// Config type for better IDE support
interface HighlightItemConfig {
  typography: typeof typography | typeof mobileVideoTypography;
  layout: typeof videoLayout | typeof mobileVideoLayout;
  fps: 30 | 60;
  canvasWidth: number;
  canvasHeight: number;
  cardWidth: number;
  cardPadding: string;
  containerPadding: string;
  counterPosition: { top: string; right: string };
  screenshotMaxHeight: string;
  scanlineRange: [number, number];
  springMultiplier: 1 | 2;
}

const config: HighlightItemConfig = isMobile ? { /* ... */ } : { /* ... */ };
```

---

## Migration Strategy

### Phase 1: Add Prop (Backward Compatible)

1. Add `isMobile?: boolean` to props with default `false`
2. No behavior changes when prop is not provided

### Phase 2: Implement Config Selection

1. Create config object at component top
2. Gradually replace hardcoded values with config values

### Phase 3: Enable Mobile Mode

1. Add `isMobile={true}` to `HagicodeReleaseNotesMobile.tsx`
2. Verify mobile display
3. Verify desktop display remains unchanged

---

## Testing Strategy

### Desktop Testing

```tsx
// Test in HagicodeIntroVideo
<HighlightItem
  item={mockItem}
  index={0}
  total={3}
  // isMobile not provided (defaults to false)
/>
```

Expected: Same display as before

### Mobile Testing

```tsx
// Test in HagicodeReleaseNotesMobile
<HighlightItem
  item={mockItem}
  index={0}
  total={3}
  isMobile={true}
/>
```

Expected:
- Layout fits within 1080x1920 canvas
- Typography uses mobile sizes
- Animations are smooth at 60fps

### Visual Regression

Compare screenshots at key frames:
- Frame 0: Initial state
- Frame 30: Card entrance (desktop) / Frame 60 (mobile)
- Frame 120: Content display (desktop) / Frame 240 (mobile)

---

## Performance Considerations

### Config Object Creation

配置对象在每次渲染时创建，但因为是简单对象，性能影响可忽略。

### Particle Memoization

粒子数组已使用 `React.useMemo`，配置变化时会重新计算。

### Animation Performance

60fps 下的 interpolate 计算量是 30fps 的 2 倍，但 Remotion 的动画系统已经优化，应该不会有明显性能影响。

---

## Future Enhancements

### Automatic Mode Detection

未来可以根据 Remotion 的 `useVideoConfig()` hook 自动检测画布尺寸：

```tsx
const { width, height, fps } = useVideoConfig();
const isMobile = width === 1080 && height === 1920;
```

但这会绑定组件到特定画布尺寸，降低灵活性。

### More Layout Options

未来可以扩展为更灵活的布局系统：

```tsx
interface HighlightItemProps {
  // ...
  layout?: 'desktop' | 'mobile' | 'custom';
  customLayout?: Partial<HighlightItemConfig>;
}
```

---

## Configuration Reference Table

### Complete Config Comparison

| Config Key | Desktop | Mobile | Notes |
|------------|---------|--------|-------|
| `canvasWidth` | 1920 | 1080 | Particle X range |
| `canvasHeight` | 1080 | 1920 | Particle Y range |
| `fps` | 30 | 60 | Spring config |
| `cardWidth` (screenshot) | 1400 | 860 | 40% of content width |
| `cardWidth` (no screenshot) | 1200 | 800 | Center alignment |
| `cardPadding` (screenshot) | 60px | 40px | Compact on mobile |
| `cardPadding` (no screenshot) | 80px | 48px | More breathing room |
| `containerPadding` | 100px | safeZone values | Use theme config |
| `counterPosition.right` | 100px | 60px | Align to safe zone |
| `title.fontSize` | 64px | 76px | Larger on mobile |
| `description.fontSize` | 36px | 60px | Larger on mobile |
| `tag.fontSize` | 26px | 46px | Larger on mobile |
| `screenshot.maxHeight` | 500px | 600px | More vertical space |
| `scanlineRange.end` | 600 | 1000 | Taller canvas |
| `springMultiplier` | 1 | 2 | Frame range scaling |

---

## References

### Modified Files

- `src/components/update-bulletin/HighlightItem.tsx` - Main component to modify
- `src/compositions/HagicodeReleaseNotesMobile.tsx` - Add `isMobile={true}` prop

### Reference Files

- `src/components/update-bulletin/MinorItemsPageMobile.tsx` - Mobile pattern reference
- `src/utils/theme.ts` - Typography and layout configurations

### External References

- Remotion Docs: https://www.remotion.dev/docs
- React Props: https://react.dev/learn/passing-props-to-a-component
