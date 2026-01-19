# Implementation Tasks

优化 HagicodeReleaseNotesMobile 第二幕移动端布局 - 实施任务清单

**Change ID:** `mobile-layout-optimization-hagicode-scene2`
**Proposal:** [proposal.md](./proposal.md)

---

## Task Overview

本任务清单分为 4 个阶段，共 11 个任务。所有任务按依赖关系排序，可按顺序执行。

**核心策略**：修改现有的 `HighlightItem` 组件，添加移动端模式支持，而非创建新组件。

### Phase Breakdown

| Phase | Description | Tasks | Estimated Complexity |
|-------|-------------|-------|----------------------|
| 1 | 配置系统 | T1-T2 | Low |
| 2 | 布局适配 | T3-T5 | Medium |
| 3 | 动画适配 | T6-T8 | Medium |
| 4 | 集成验证 | T9-T11 | Medium |

---

## Phase 1: 配置系统

### T1: 添加 isMobile prop 到 HighlightItemProps

**Description:** 扩展 `HighlightItemProps` 接口，添加 `isMobile` 可选参数。

**File:** `src/components/update-bulletin/HighlightItem.tsx`

**Implementation Steps:**

1. 在 `HighlightItemProps` 接口中添加 `isMobile?: boolean` 字段
2. 设置默认值为 `false`（桌面端模式）
3. 在组件中解构 `isMobile` 参数

**Acceptance Criteria:**

- [ ] `isMobile?: boolean` 字段添加到 props 接口
- [ ] 组件正确解构 `isMobile` 参数
- [ ] TypeScript 编译无错误

**Dependencies:** None

**Code Change:**

```tsx
export interface HighlightItemProps {
  item: HighlightItemType;
  index: number;
  total: number;
  delay?: number;
  isMobile?: boolean; // 新增字段
}

export const HighlightItem: React.FC<HighlightItemProps> = ({
  item,
  index,
  total,
  delay = 0,
  isMobile = false, // 默认桌面端模式
}) => {
  // ...
};
```

---

### T2: 创建配置选择逻辑

**Description:** 根据模式选择对应的主题配置和布局参数。

**File:** `src/components/update-bulletin/HighlightItem.tsx`

**Implementation Steps:**

1. 在组件顶部创建配置选择逻辑（基于 `isMobile`）
2. 选择对应的主题配置（`typography` vs `mobileVideoTypography`）
3. 选择对应的布局配置（`videoLayout` vs `mobileVideoLayout`）
4. 选择对应的 FPS 配置（30 vs 60）
5. 创建画布宽度常量用于粒子生成

**Acceptance Criteria:**

- [ ] 配置选择逻辑在组件顶部定义
- [ ] `isMobile: true` 时使用移动端配置
- [ ] `isMobile: false` 时使用桌面端配置
- [ ] 配置对象命名清晰，易于维护

**Dependencies:** T1

**Code Reference:**

```tsx
// 根据模式选择配置
const config = isMobile ? {
  typography: mobileVideoTypography,
  layout: mobileVideoLayout,
  fps: 60,
  canvasWidth: 1080,
  canvasHeight: 1920,
  cardWidth: hasScreenshot ? 860 : 800,
  padding: `${mobileVideoLayout.safeZone.vertical}px ${mobileVideoLayout.safeZone.horizontal}px`,
  counterPosition: { top: '80px', right: '60px' },
} : {
  typography: typography,
  layout: videoLayout,
  fps: 30,
  canvasWidth: 1920,
  canvasHeight: 1080,
  cardWidth: hasScreenshot ? 1400 : 1200,
  padding: '100px',
  counterPosition: { top: '80px', right: '100px' },
};
```

---

## Phase 2: 布局适配

### T3: 调整容器布局

**Description:** 根据模式调整容器的内边距和定位。

**File:** `src/components/update-bulletin/HighlightItem.tsx`

**Implementation Steps:**

1. 修改 `AbsoluteFill` 的 `padding` 使用配置对象中的值
2. 修改计数器的 `top` 和 `right` 位置使用配置对象
3. 确保进度条在两种模式下都正确显示

**Acceptance Criteria:**

- [ ] 移动端模式使用 `mobileVideoLayout.safeZone` 的边距值
- [ ] 桌面端模式保持原有的 `100px` 边距
- [ ] 计数器位置根据模式调整

**Dependencies:** T2

**Current Code Location:**
- Line 221: `padding: '100px'`
- Line 267-268: `top: '80px', right: '100px'`

---

### T4: 调整卡片尺寸和样式

**Description:** 根据模式调整卡片的宽度、内边距和字体大小。

**File:** `src/components/update-bulletin/HighlightItem.tsx`

**Implementation Steps:**

1. 修改卡片宽度使用配置对象（桌面端 1200-1400px，移动端 800-860px）
2. 修改卡片内边距（桌面端 60-80px，移动端 40-48px）
3. 修改标题字体使用 `config.typography.fontSize`
4. 修改描述字体使用 `config.typography.fontSize`
5. 修改标签字体使用 `config.typography.fontSize`

**Acceptance Criteria:**

- [ ] 移动端模式卡片宽度不超过 860px
- [ ] 移动端模式使用 `mobileVideoTypography` 字体配置
- [ ] 桌面端模式保持原有样式

**Dependencies:** T3

**Current Code Locations:**
- Line 284: `width: hasScreenshot ? '1400px' : '1200px'`
- Line 290: `padding: hasScreenshot ? '60px' : '80px'`
- Line 317: `fontSize: typography.fontSize.subtitle`
- Line 354: `fontSize: typography.fontSize.bodySmall`
- Line 372: `fontSize: typography.fontSize.bodyLarge`

---

### T5: 优化截图容器

**Description:** 根据模式调整截图容器的最大高度。

**File:** `src/components/update-bulletin/HighlightItem.tsx`

**Implementation Steps:**

1. 修改截图 `maxHeight` 根据模式动态设置（桌面端 500px，移动端 600px）
2. 调整扫描线移动距离范围（桌面端基于 1080px 高度，移动端基于 1920px）

**Acceptance Criteria:**

- [ ] 移动端模式截图最大高度为 600px
- [ ] 桌面端模式截图最大高度保持 500px
- [ ] 扫描线移动距离适配对应画布高度

**Dependencies:** T4

**Current Code Locations:**
- Line 447: `maxHeight: '500px'`
- Line 435: `interpolate(effectiveFrame, [70, 150], [-100, 600], ...)`

---

## Phase 3: 动画适配

### T6: 调整 spring 配置 FPS

**Description:** 根据模式调整 spring 动画的 FPS 配置。

**File:** `src/components/update-bulletin/HighlightItem.tsx`

**Implementation Steps:**

1. 修改 `cardSpring` 的 `fps` 使用配置对象
2. 修改 `contentSpring` 的 `fps` 使用配置对象
3. 确保其他动画 interpolate 也适配对应的帧率

**Acceptance Criteria:**

- [ ] 移动端模式 spring 使用 `fps: 60`
- [ ] 桌面端模式 spring 使用 `fps: 30`
- [ ] 动画时长在两种模式下视觉一致

**Dependencies:** T5

**Current Code Locations:**
- Line 105: `fps: 30`
- Line 151: `fps: 30`

---

### T7: 调整动画帧数范围

**Description:** 根据 FPS 调整动画的帧数范围，保持视觉效果一致。

**File:** `src/components/update-bulletin/HighlightItem.tsx`

**Implementation Steps:**

1. 分析现有的 interpolate 帧数范围
2. 移动端模式下将帧数范围翻倍（因为是 60fps vs 30fps）
3. 确保进度条、截图动画等都适配

**Acceptance Criteria:**

- [ ] 移动端模式下动画帧数范围是桌面端的 2 倍
- [ ] 动画时长在两种模式下视觉一致
- [ ] 无动画跳跃或不连贯现象

**Dependencies:** T6

**Current Code Locations:**
- Line 132: `[0, 120]` - 进度条
- Line 173: `[40, 65]` - 截图透明度
- Line 176: `[40, 75]` - 截图缩放

---

### T8: 调整粒子生成范围

**Description:** 根据画布宽度调整粒子生成的 X 坐标范围。

**File:** `src/components/update-bulletin/HighlightItem.tsx`

**Implementation Steps:**

1. 修改粒子 `x` 坐标生成使用配置对象中的 `canvasWidth`
2. 调整粒子 `y` 坐标范围适配画布高度

**Acceptance Criteria:**

- [ ] 移动端模式粒子 X 坐标范围是 0-1080
- [ ] 桌面端模式粒子 X 坐标范围是 0-1920
- [ ] 粒子在两种模式下分布均匀

**Dependencies:** T7

**Current Code Location:**
- Line 207: `x: Math.random() * 1920`

---

## Phase 4: 集成验证

### T9: 在 HagicodeReleaseNotesMobile 中启用移动端模式

**Description:** 修改 `HagicodeReleaseNotesMobile.tsx`，传入 `isMobile={true}` 给 `HighlightItem`。

**File:** `src/compositions/HagicodeReleaseNotesMobile.tsx`

**Implementation Steps:**

1. 在 `HighlightItem` 使用处添加 `isMobile={true}` prop
2. 保持其他 props 不变

**Acceptance Criteria:**

- [ ] `HighlightItem` 接收 `isMobile={true}` prop
- [ ] 其他 props 保持不变

**Dependencies:** T8

**Code Change:**

```tsx
// Before
<HighlightItem
  item={item}
  index={index}
  total={data.highlights.length}
  delay={0}
/>

// After
<HighlightItem
  item={item}
  index={index}
  total={data.highlights.length}
  delay={0}
  isMobile={true}
/>
```

---

### T10: 桌面端兼容性验证

**Description:** 确保修改后的组件在桌面端模式下保持原有显示效果。

**Testing Steps:**

1. 检查 `HagicodeIntroVideo.tsx` 中对 `HighlightItem` 的使用
2. 确保没有传入 `isMobile` 时默认为桌面端模式
3. 在 Remotion Preview 中验证桌面端显示效果

**Acceptance Criteria:**

- [ ] 桌面端模式下显示效果与修改前一致
- [ ] 没有 `isMobile` prop 时默认为桌面端模式
- [ ] 现有桌面端使用场景无需修改

**Dependencies:** T9

---

### T11: 移动端效果验证

**Description:** 验证移动端模式下的显示效果和动画流畅度。

**Testing Steps:**

1. 在 Remotion Preview 中查看 `HagicodeReleaseNotesMobile` 组件
2. 验证布局在 1080x1920 画布内正确显示
3. 检查动画在 60fps 下流畅播放
4. 验证截图在移动端格式下正确显示

**Acceptance Criteria:**

- [ ] 布局无溢出，内容在 1080x1920 画布内
- [ ] 字体大小使用移动端配置，清晰可读
- [ ] 动画流畅，帧率稳定在 60fps
- [ ] 截图自适应缩放，比例协调

**Dependencies:** T10

---

## Task Summary

| Task | Phase | Complexity | Status |
|------|-------|------------|--------|
| T1 | 1 | Low | Completed |
| T2 | 1 | Low | Completed |
| T3 | 2 | Medium | Completed |
| T4 | 2 | Medium | Completed |
| T5 | 2 | Medium | Completed |
| T6 | 3 | Medium | Completed |
| T7 | 3 | Medium | Completed |
| T8 | 3 | Medium | Completed |
| T9 | 4 | Low | Completed |
| T10 | 4 | Medium | Completed |
| T11 | 4 | Medium | Completed |

---

## Sequential Execution

任务按以下依赖关系执行：

**Phase 1 (Sequential):** T1 → T2

**Phase 2 (Sequential):** T3 → T4 → T5 (依赖 T2)

**Phase 3 (Sequential):** T6 → T7 → T8 (依赖 T5)

**Phase 4 (Sequential):** T9 → T10 → T11 (依赖 T8)

---

## Configuration Reference

### 桌面端 vs 移动端配置对照

| 参数 | 桌面端 | 移动端 |
|------|--------|--------|
| canvasWidth | 1920 | 1080 |
| canvasHeight | 1080 | 1920 |
| fps | 30 | 60 |
| cardWidth (有截图) | 1400px | 860px |
| cardWidth (无截图) | 1200px | 800px |
| padding | 100px | safeZone 值 |
| title fontSize | 64px | 76px |
| bodyLarge fontSize | 36px | 60px |
| bodySmall fontSize | 26px | 46px |
| screenshot maxHeight | 500px | 600px |
| 粒子 X 范围 | 0-1920 | 0-1080 |

---

## Notes

1. **向后兼容**: 所有修改必须保持桌面端模式的向后兼容性
2. **默认值**: `isMobile` 默认为 `false`，确保现有代码无需修改
3. **动画时长**: 60fps 下的帧数范围应该是 30fps 的 2 倍，以保持相同的动画时长
4. **增量验证**: 每完成一个任务即可在 Remotion Preview 中验证效果
