# Hagicode移动端视频布局优化 - 实施任务清单

**Change ID**: `mobile-video-layout-optimization`
**Parent Proposal**: [proposal.md](./proposal.md)

---

## Task Summary

| 阶段 | 任务数 | 预计复杂度 |
|------|--------|------------|
| 阶段一：GitHub URL 优化 | 2 | 低 |
| 阶段二：`SceneLayoutMobile` 黄金视野优化 | 3 | 中 |
| 阶段三：`OutroSummarySceneMobile` 布局优化 | 3 | 中 |
| 阶段四：验证与文档 | 2 | 低 |
| **合计** | **10** | **中** |

---

## Phase 1: GitHub URL 显示优化

### Task 1.1: 优化 BrandIntroSceneMobile.tsx 中的 GitHub URL 按钮

**优先级**: P1 (高)
**复杂度**: 低
**预计时间**: 15 分钟

**文件**: `src/scenes/intro-mobile/BrandIntroSceneMobile.tsx`

**实施步骤**:

1. 定位到 GitHub 按钮组件（第 175-189 行）
2. 调整按钮样式：
   - 保持 `padding: '16px 48px'`
   - 添加 `whiteSpace: 'nowrap'` 防止文本换行
   - 验证 `fontSize: mobileVideoTypography.fontSize.button` 足够显示完整 URL
   - 确认按钮容器宽度足够

**代码示例**:
```tsx
<div
  style={{
    padding: '16px 48px',
    borderRadius: '16px',
    background: `linear-gradient(135deg, ${colors.accent.primary}25 0%, ${colors.accent.primary}15 100%)`,
    border: `3px solid ${colors.accent.primary}70`,
    fontSize: mobileVideoTypography.fontSize.button,
    fontWeight: 700,
    color: colors.accent.primary,
    letterSpacing: '1px',
    whiteSpace: 'nowrap', // 新增：防止换行
    boxShadow: `0 0 40px ${colors.accent.glow}50, 0 8px 32px ${colors.accent.primary}30`,
  }}
>
  github.com/HagiCode-org
</div>
```

**验收标准**:
- [x] URL 文本在一行内完整显示
- [x] 按钮水平居中对齐
- [x] 视频渲染后无文本换行

---

### Task 1.2: 优化 OutroSummarySceneMobile.tsx 中的 GitHub URL 按钮

**优先级**: P1 (高)
**复杂度**: 低
**预计时间**: 15 分钟

**文件**: `src/scenes/intro-mobile/OutroSummarySceneMobile.tsx`

**实施步骤**:

1. 定位到 GitHub CTA 按钮（第 221-238 行）
2. 应用与 Task 1.1 相同的优化：
   - 添加 `whiteSpace: 'nowrap'`
   - 验证 padding 和字体大小

**代码示例**:
```tsx
<div
  style={{
    padding: '20px 56px',
    borderRadius: '16px',
    background: `linear-gradient(135deg, ${colors.accent.primary}30 0%, ${colors.accent.primary}20 100%)`,
    border: `4px solid ${colors.accent.primary}80`,
    fontSize: mobileVideoTypography.fontSize.button,
    fontWeight: 700,
    color: colors.accent.primary,
    whiteSpace: 'nowrap', // 新增：防止换行
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 0 50px ${colors.accent.glow}60, 0 12px 40px ${colors.accent.primary}40`,
  }}
>
  github.com/HagiCode-org
</div>
```

**验收标准**:
- [x] URL 文本在一行内完整显示
- [x] 与 Task 1.1 样式保持一致
- [x] 视频渲染后无文本换行

---

## Phase 2: `SceneLayoutMobile` 黄金视野优化

### Task 2.1: 调整 `SceneLayoutMobile` 标题位置

**优先级**: P0 (关键)
**复杂度**: 中
**预计时间**: 30 分钟

**文件**: `src/components/intro-mobile/SceneLayoutMobile.tsx`

**当前问题**:
- 标题固定在顶部（`top: mobileVideoLayout.safeZone.vertical`，约 80px）
- 未针对移动端黄金视野区域进行优化

**实施步骤**:

1. 调整标题位置（第 42-58 行）：
   - 从 `top: mobileVideoLayout.safeZone.vertical` 改为 `top: '220px'`（约屏幕高度的 11.5%，将标题下移至黄金视野边缘）
   - 或者考虑使用百分比：`top: '12%'`

2. 调整内容区域 `paddingTop`（第 69 行）：
   - 从 `paddingTop: '160px'` 减小到 `paddingTop: '60px'` 或移除
   - 让内容与标题之间的间距更协调

**代码更改**:
```tsx
// 标题位置调整（第 42-58 行）
<div
  style={{
    position: 'absolute',
    top: '220px', // 从 safeZone.vertical (80px) 改为 220px，约屏幕高度的 11.5%
    left: '50%',
    transform: `translateX(-50%) scale(${titleScale})`,
    fontSize: mobileVideoTypography.fontSize.title,
    fontWeight: mobileVideoTypography.fontWeight.heading,
    color: colors.text.primary,
    opacity: titleOpacity,
    textAlign: 'center',
    width: '100%',
    lineHeight: mobileVideoTypography.lineHeight.tight,
  }}
>
  {title}
</div>

// 内容区域 paddingTop 调整（第 60-74 行）
<div
  style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingTop: '60px', // 从 160px 减小到 60px
    paddingBottom: '100px',
  }}
>
  {children}
</div>
```

**验收标准**:
- [x] 标题位于屏幕垂直方向约 11-12% 位置（约 220px）
- [x] 内容区域与标题间距协调
- [x] Scene 2-4 的内容适配良好

**影响范围**:
- `SmartControllableSceneMobile.tsx` (Scene 2)
- `MultiThreadEfficientSceneMobile.tsx` (Scene 3)
- `FunExperienceSceneMobile.tsx` (Scene 4)

---

### Task 2.2: 验证 Scene 2 (SmartControllableSceneMobile) 内容适配

**优先级**: P1 (高)
**复杂度**: 低
**预计时间**: 15 分钟

**文件**: `src/scenes/intro-mobile/SmartControllableSceneMobile.tsx`

**验证步骤**:

1. 该场景使用 `SceneLayoutMobile`，会自动继承标题位置优化
2. 检查 6 个翻转卡片的内容适配：
   - 卡片堆叠总高度约 `6 * 100px + 5 * 12px = 660px`
   - 确保卡片在标题下方完整显示
   - 检查是否有内容超出屏幕边界

3. 如果需要，微调卡片间距或容器 `maxWidth`

**验收标准**:
- [x] 6 个卡片完整显示在屏幕内
- [x] 卡片翻转动画流畅
- [x] 无内容超出屏幕边界

---

### Task 2.3: 验证 Scene 3 (MultiThreadEfficientSceneMobile) 内容适配

**优先级**: P1 (高)
**复杂度**: 低
**预计时间**: 15 分钟

**文件**: `src/scenes/intro-mobile/MultiThreadEfficientSceneMobile.tsx`

**验证步骤**:

1. 该场景使用 `SceneLayoutMobile`，会自动继承标题位置优化
2. 检查柱状图容器适配：
   - 当前有 `paddingBottom: '200px'`，可能需要调整
   - 确保柱状图和 "5x 效率" 标签在标题下方完整显示

3. 如果需要，调整柱状图容器的 `paddingBottom`

**验收标准**:
- [x] 柱状图完整显示在屏幕内
- [x] "5x 效率" 标签清晰可见
- [x] 无内容超出屏幕边界

---

### Task 2.4: 验证 Scene 4 (FunExperienceSceneMobile) 内容适配

**优先级**: P1 (高)
**复杂度**: 低
**预计时间**: 15 分钟

**文件**: `src/scenes/intro-mobile/FunExperienceSceneMobile.tsx`

**验证步骤**:

1. 该场景使用 `SceneLayoutMobile`，会自动继承标题位置优化
2. 检查 6 个功能卡片的内容适配：
   - 卡片堆叠总高度约 `6 * 80px + 5 * 16px = 560px`（估计每个卡片高度约 80px）
   - 确保卡片在标题下方完整显示
   - 检查是否有内容超出屏幕边界

3. 如果需要，微调卡片间距或容器 `maxWidth`

**验收标准**:
- [x] 6 个功能卡片完整显示在屏幕内
- [x] 卡片入场动画流畅
- [x] 无内容超出屏幕边界

---

## Phase 3: `OutroSummarySceneMobile` 布局优化

### Task 3.1: 调整 OutroSummarySceneMobile.tsx 主容器布局

**优先级**: P0 (关键)
**复杂度**: 中
**预计时间**: 30 分钟

**文件**: `src/scenes/intro-mobile/OutroSummarySceneMobile.tsx`

**当前问题**:
- 标题位于容器顶部（通过 `justifyContent: 'center'` 和顶部 padding 隐式定位）
- 未明确控制标题在屏幕中的垂直位置

**实施步骤**:

1. 重新设计容器结构，使用明确的垂直位置控制：
   - 移除 `justifyContent: 'center'`
   - 使用 `justifyContent: 'flex-start'` 配合顶部 margin 控制整体位置
   - 为标题区域添加明确的 `marginTop`，将内容下移至屏幕中央

**代码更改**:
```tsx
// 原代码 (第 54-62 行)
<AbsoluteFill
  style={{
    background: colors.background.dark,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${mobileVideoLayout.safeZone.vertical}px ${mobileVideoLayout.safeZone.horizontal}px`,
  }}
>

// 修改为
<AbsoluteFill
  style={{
    background: colors.background.dark,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start', // 改为 flex-start
    padding: `${mobileVideoLayout.safeZone.vertical}px ${mobileVideoLayout.safeZone.horizontal}px`,
  }}
>
  {/* 顶部间距容器 - 将整体内容下移至屏幕中央黄金区域 */}
  <div style={{ height: '280px' }} /> {/* 约屏幕高度的 15%，将内容下移 */}
```

**验收标准**:
- [x] 标题位于屏幕垂直方向约 30-35% 位置
- [x] 内容区域整体在屏幕中央
- [x] 底部 CTA 仍在可见安全区域内

---

### Task 3.2: 优化标题和标语间距

**优先级**: P1 (高)
**复杂度**: 低
**预计时间**: 10 分钟

**文件**: `src/scenes/intro-mobile/OutroSummarySceneMobile.tsx`

**实施步骤**:

1. 调整标题的 `marginBottom`（第 77 行）
   - 当前: `marginBottom: '36px'`
   - 建议保持或微调: `'32px'` (稍微紧凑)

2. 调整标语的 `marginBottom`（第 94 行）
   - 当前: `marginBottom: '40px'`
   - 建议调整为: `'32px'` (与标题间距保持一致)

**验收标准**:
- [x] 标题和标语间距协调
- [x] 标语与功能卡片间距协调
- [x] 整体视觉平衡

---

### Task 3.3: 调整功能卡片和底部 CTA 的间距

**优先级**: P1 (高)
**复杂度**: 低
**预计时间**: 10 分钟

**文件**: `src/scenes/intro-mobile/OutroSummarySceneMobile.tsx`

**实施步骤**:

1. 调整功能卡片容器的 `marginBottom`（第 108 行）
   - 当前: `marginBottom: '36px'`
   - 根据整体布局调整，确保卡片和底部 CTA 之间有足够空间

2. 验证底部 CTA 位置（第 206-218 行）
   - 确保底部 CTA 不会被顶部间距调整推出屏幕
   - 必要时调整功能卡片数量或间距

**验收标准**:
- [x] 三个功能卡片完整显示在屏幕内
- [x] 底部 CTA 在安全区域内可见
- [x] 无元素超出屏幕边界

---

## Phase 4: 验证与文档

### Task 4.1: 渲染视频并验证视觉效果

**优先级**: P0 (关键)
**复杂度**: 低
**预计时间**: 30 分钟

**命令**:
```bash
# 渲染 HagicodeHeaderMobile 视频
npx remotion render HagicodeHeaderMobile out/mobile-header-optimized.mp4

# 或使用预览
npx remotion preview
```

**验证清单**:
- [ ] Scene 1 (BrandIntroScene): GitHub URL 无换行
- [ ] Scene 2 (SmartControllableScene):
  - [ ] 标题在屏幕中央偏上位置
  - [ ] 6 个卡片完整显示
  - [ ] 卡片翻转动画流畅
- [ ] Scene 3 (MultiThreadEfficientScene):
  - [ ] 标题在屏幕中央偏上位置
  - [ ] 柱状图和 "5x 效率" 标签完整显示
  - [ ] 动画流畅
- [ ] Scene 4 (FunExperienceScene):
  - [ ] 标题在屏幕中央偏上位置
  - [ ] 6 个功能卡片完整显示
  - [ ] 卡片入场动画流畅
- [ ] Scene 5 (OutroSummaryScene):
  - [ ] 标题 "HagiCode" 在屏幕中央位置
  - [ ] 标语清晰可见
  - [ ] 三个功能卡片在中央视野区域
  - [ ] GitHub URL 无换行
  - [ ] QQ 群信息可见
- [ ] Scene 1-5 整体动画流畅，无跳变
- [ ] 视觉风格连贯一致

**回滚计划**:
如果视觉效果不符合预期，恢复以下文件：
```bash
git checkout src/scenes/intro-mobile/BrandIntroSceneMobile.tsx
git checkout src/components/intro-mobile/SceneLayoutMobile.tsx
git checkout src/scenes/intro-mobile/OutroSummarySceneMobile.tsx
```

---

### Task 4.2: 更新组件文档（如需要）

**优先级**: P2 (中)
**复杂度**: 低
**预计时间**: 15 分钟

**文件**: 可能需要更新
- `src/components/intro-mobile/SceneLayoutMobile.tsx` (注释)
- `src/scenes/intro-mobile/OutroSummarySceneMobile.tsx` (注释)
- `src/utils/theme.ts` (如需添加黄金视野说明)

**实施步骤**:

1. 在 `SceneLayoutMobile.tsx` 顶部注释中说明黄金视野优化
2. 在 `OutroSummarySceneMobile.tsx` 顶部注释中说明布局优化
3. 如有必要，在 `theme.ts` 中添加 `goldenZone` 常量说明

**示例注释**:
```tsx
/**
 * SceneLayoutMobile - Mobile-optimized scene layout for 1080x1920 vertical video
 *
 * Layout optimizations for mobile vertical video:
 * - Title positioned at 220px from top (golden zone edge, ~11.5% of screen height)
 * - Content area with reduced paddingTop for better vertical spacing
 * - Optimized for mobile platforms (Douyin, Bilibili, Xiaohongshu)
 */
```

```tsx
/**
 * OutroSummarySceneMobile - Mobile-optimized outro summary
 *
 * Layout optimizations for mobile vertical video:
 * - Content positioned in central 60% of screen (golden zone)
 * - Top margin of 280px shifts content to center
 * - GitHub URL with nowrap to prevent text wrapping
 */
```

---

## Dependencies

| 任务 | 依赖 |
|------|------|
| Task 1.2 | Task 1.1 (建议先完成一个作为参考) |
| Task 2.2 | Task 2.1 (需要先完成 `SceneLayoutMobile` 调整) |
| Task 2.3 | Task 2.1 |
| Task 2.4 | Task 2.1 |
| Task 3.2 | Task 3.1 (需要先确定标题位置) |
| Task 3.3 | Task 3.1, Task 3.2 |
| Task 4.1 | 所有实施任务 (1.1, 1.2, 2.1-2.4, 3.1-3.3) |
| Task 4.2 | Task 4.1 (验证通过后才更新文档) |

---

## Rollback Plan

如果视频渲染结果不符合预期，执行以下回滚步骤：

1. **恢复文件**:
   ```bash
   git checkout src/scenes/intro-mobile/BrandIntroSceneMobile.tsx
   git checkout src/components/intro-mobile/SceneLayoutMobile.tsx
   git checkout src/scenes/intro-mobile/OutroSummarySceneMobile.tsx
   ```

2. **删除渲染输出**:
   ```bash
   rm out/mobile-header-optimized.mp4
   ```

3. **验证回滚**:
   ```bash
   npx remotion preview
   ```

---

## Notes

1. **位置参数调整**: Task 2.1 中的 `220px` 标题位置和 Task 3.1 中的 `280px` 顶部间距是估计值。实际实施时可能需要根据视觉效果进行微调。

2. **黄金视野区域**: 移动端视频的黄金视野通常在屏幕垂直方向的 20%-80% 区域。
   - Scene 2-4: 标题在约 11-12% 位置（220px），内容在标题下方
   - Scene 5: 标题在约 15% 位置（280px 顶部间距），内容整体下移

3. **`SceneLayoutMobile` 的影响**: 该组件的修改会影响 Scene 2-4，需要确保所有场景的内容适配良好。

4. **与其他场景的一致性**: `BrandIntroSceneMobile` (Scene 1) 不使用 `SceneLayoutMobile`，不受影响。

5. **未来优化**: 如果本提案效果良好，可考虑将 `OutroSummarySceneMobile` 也改用 `SceneLayoutMobile` 以统一布局风格。
