# Hagicode移动端视频布局优化

**Change ID**: `mobile-video-layout-optimization`
**Status**: ExecutionCompleted
**Created**: 2026-01-18
**Target**: Remotion 4.0 Mobile Video Components

---

## Overview

针对 Hagicode 移动端视频（`HagicodeHeaderMobile` 及相关组件）进行移动端布局优化。该视频基于 Remotion 4.0 框架构建，目标平台为抖音、B站和小红书等移动端短视频平台（1080x1920 竖屏格式 @ 60fps）。

移动端设备的视野范围主要集中在屏幕中央区域，本提案旨在针对这一特性进行布局调整，提升移动端用户的观看体验。

---

## Problem Statement

### 当前问题

1. **GitHub URL 显示问题**
   - `BrandIntroSceneMobile.tsx` 和 `OutroSummarySceneMobile.tsx` 中的 GitHub URL 按钮可能在不同移动端设备上显示不一致
   - URL 文本 `github.com/HagiCode-org` 在某些情况下可能显得拥挤
   - 缺少对超长 URL 的容错处理

2. **共享布局组件 `SceneLayoutMobile` 未针对移动端黄金视野优化**
   - `SceneLayoutMobile` 组件被 Scene 2-4 共同使用（`SmartControllableSceneMobile`、`MultiThreadEfficientSceneMobile`、`FunExperienceSceneMobile`）
   - 标题固定在顶部（`top: mobileVideoLayout.safeZone.vertical`），位于非黄金视野区域
   - 内容区域虽有 `paddingTop: '160px'`，但整体布局仍偏上，未充分利用屏幕中央 60% 的黄金视野
   - 移动端用户观看短视频时，视线主要聚焦在屏幕中央，顶部区域容易被平台 UI 遮挡

3. **`OutroSummarySceneMobile` 独立布局同样存在位置问题**
   - 标题 "HagiCode" 和标语位置偏上，未针对移动端黄金视野优化
   - 功能卡片列表位置合理，但整体布局未充分利用屏幕中央区域

### 根本原因

- 原有布局沿用桌面端设计思维，未充分考虑移动端竖屏视频的特殊性
- `SceneLayoutMobile` 作为共享组件，其布局模式影响了多个场景
- 移动端用户在观看竖屏短视频时，视线主要聚焦在屏幕中央区域（约 20%-80% 垂直位置）
- 顶部和底部区域容易被移动端平台的 UI 元素（点赞、评论、分享按钮等）遮挡

---

## Proposed Solution

### 1. GitHub URL 显示优化

**文件**: `src/scenes/intro-mobile/BrandIntroSceneMobile.tsx`、`src/scenes/intro-mobile/OutroSummarySceneMobile.tsx`

**调整**:
- 添加 `whiteSpace: 'nowrap'` 防止 URL 文本换行
- 验证按钮容器宽度和 padding 确保完整显示
- 考虑为超长 URL 添加 `overflow: 'hidden'` 和 `textOverflow: 'ellipsis'` 作为降级方案

### 2. `SceneLayoutMobile` 黄金视野优化（影响 Scene 2-4）

**文件**: `src/components/intro-mobile/SceneLayoutMobile.tsx`

**调整**:
- **标题位置下移**: 将标题从顶部（`top: safeZone.vertical`）下移至黄金视野区域（约 20-25% 位置）
- **内容区域调整**: 减小或移除 `paddingTop`，让内容与标题整体位于中央视野
- **考虑添加黄金视野常量**: 在 `theme.ts` 中定义 `mobileVideoLayout.goldenZone.top` 参数

**受影响的场景**:
- `SmartControllableSceneMobile.tsx` - Scene 2 (180 帧 / 3 秒)
- `MultiThreadEfficientSceneMobile.tsx` - Scene 3 (180 帧 / 3 秒)
- `FunExperienceSceneMobile.tsx` - Scene 4 (180 帧 / 3 秒)

### 3. `OutroSummarySceneMobile` 布局优化（Scene 5）

**文件**: `src/scenes/intro-mobile/OutroSummarySceneMobile.tsx`

**调整**:
- 该场景不使用 `SceneLayoutMobile`，有独立的布局结构
- **标题位置下移**: 将 "HagiCode" 标题从顶部移至屏幕中央黄金视野区域（约 30-35% 位置）
- **标语位置调整**: 将标语相应下移，保持与标题的合理间距
- **功能卡片垂直居中**: 确保三个功能卡片整体在屏幕中央显示
- **底部 CTA 位置**: GitHub 和 QQ 群信息保持在底部安全区域

### 4. 布局参数优化

**文件**: `src/utils/theme.ts` (可能需要调整)

**考虑**:
- 新增 `mobileVideoLayout.goldenZone` 参数，定义移动端黄金视野区域
  - `goldenZone.top`: 标题推荐位置（如屏幕高度的 20-25%）
  - `goldenZone.contentStart`: 内容起始位置（如屏幕高度的 30-35%）

---

## Scope

### Included Changes

- [ ] `BrandIntroSceneMobile.tsx` - GitHub URL 按钮宽度优化
- [ ] `SceneLayoutMobile.tsx` - 标题位置下移至黄金视野区域
- [ ] `SmartControllableSceneMobile.tsx` - 继承 `SceneLayoutMobile` 优化
- [ ] `MultiThreadEfficientSceneMobile.tsx` - 继承 `SceneLayoutMobile` 优化
- [ ] `FunExperienceSceneMobile.tsx` - 继承 `SceneLayoutMobile` 优化
- [ ] `OutroSummarySceneMobile.tsx` - 标题和内容位置下移至中央视野
- [ ] `theme.ts` - 添加移动端黄金视野区域常量（如需要）

### Excluded Changes

- 不涉及桌面端视频组件
- 不涉及 `BrandIntroSceneMobile.tsx` 的布局调整（Scene 1，仅优化 GitHub URL）
- 不涉及 `HagicodeReleaseNotesMobile` 组件
- 不涉及字体大小、颜色主题等视觉设计调整
- 不涉及动画逻辑修改

---

## Impact Assessment

### User Experience

**正面影响**:
- 消除潜在的 URL 显示换行问题，提升视频专业性和整洁度
- 将所有场景的标题和关键内容定位在移动端用户最关注的中央视野区域
- 更好地适配抖音、B站、小红书等移动端平台的观看习惯
- 减少因平台 UI 元素遮挡导致的信息丢失
- 统一 Scene 2-5 的布局风格，提升视觉连贯性

**潜在风险**:
- 标题位置下移可能影响与 Scene 1（BrandIntroScene）的视觉连贯性（需在最终视频中验证）
- `SceneLayoutMobile` 的改动会影响所有使用它的场景，需要确保每个场景的内容适配良好

### Technical Impact

- **组件复用性**: 优化后的 `SceneLayoutMobile` 将成为移动端视频组件的标准布局参考
- **维护性**: 通过 `theme.ts` 定义黄金视野区域常量，便于后续统一调整
- **性能**: 无性能影响，仅涉及样式和布局调整
- **影响范围**: `SceneLayoutMobile` 是共享组件，一次修改影响三个场景

### Platform Compatibility

- **抖音**: 竖屏视频，底部 UI 元素较多，中央布局优化效果明显
- **B站**: 竖屏视频，弹幕和 UI 元素主要在顶部和底部，中央区域受影响较小
- **小红书**: 竖屏视频，UI 布局与抖音类似，中央布局优化效果明显

---

## Implementation Plan

详细实施计划请参见 [`tasks.md`](./tasks.md)。

### 关键里程碑

1. **阶段一**: GitHub URL 显示优化（低风险，可快速验证）
2. **阶段二**: `SceneLayoutMobile` 黄金视野优化（核心改动，影响 Scene 2-4）
3. **阶段三**: `OutroSummarySceneMobile` 布局优化（Scene 5 独立布局）
4. **阶段四**: 视频渲染和验证（确认视觉效果符合预期）

---

## Success Criteria

### 功能验收标准

- [ ] GitHub URL 在 1080px 宽度下完整显示，无换行
- [ ] Scene 2-4 的标题位于屏幕垂直方向约 20-25% 位置（通过 `SceneLayoutMobile` 统一）
- [ ] Scene 2-4 的内容区域适配标题下移后的布局
- [ ] Scene 5 的标题 "HagiCode" 位于屏幕垂直方向 30-35% 位置
- [ ] Scene 5 的标语位于标题下方，间距合理
- [ ] Scene 5 的三个功能卡片整体位于屏幕中央视野区域
- [ ] 所有场景的底部 CTA 按钮保持在底部安全区域

### 视觉验收标准

- [ ] 视频渲染结果中，所有文本清晰可读
- [ ] 元素间距协调，视觉平衡
- [ ] 动画过渡流畅，无跳变
- [ ] Scene 1-5 的视觉风格连贯一致

### 兼容性验收标准

- [ ] 在抖音、B站、小红书平台预览中显示正常
- [ ] 在不同移动设备屏幕尺寸下显示正常（模拟验证）

---

## Alternatives Considered

### 方案 A: 全面垂直居中

**描述**: 将所有元素（标题、内容、CTA）全部垂直居中排列

**优点**: 最大化利用中央视野

**缺点**:
- 失去视觉层次
- 底部 CTA 按钮位置上移，不符合用户预期
- 不同场景的标题位置差异过大，影响连贯性

**结论**: 不采用。保持合理的视觉层次和标题位置一致性。

### 方案 B: 仅调整 `OutroSummarySceneMobile`

**描述**: 只优化 Scene 5，保持 `SceneLayoutMobile` 不变

**优点**:
- 改动最小
- 风险最低

**缺点**:
- Scene 2-4 仍然存在布局问题
- 未充分利用中央视野区域
- 场景间布局风格不一致

**结论**: 不采用。用户反馈明确要求所有场景都需要调整。

### 方案 C: 为每个场景单独调整

**描述**: 不修改 `SceneLayoutMobile`，而是为每个场景创建独立的布局调整

**优点**:
- 灵活性高
- 可以针对每个场景优化

**缺点**:
- 代码重复
- 维护成本高
- 布局风格不一致

**结论**: 不采用。应该通过共享组件统一布局标准。

---

## Open Questions

1. **标题精确位置**: 标题应该下移到屏幕的百分之几位置？（建议 Scene 2-4 为 20-25%，Scene 5 为 30-35%，待验证）
2. **与第一幕的连贯性**: 标题位置下移后，是否会影响用户从 Scene 1 到 Scene 2 的视觉体验？
3. **`SceneLayoutMobile` 的 `paddingTop`**: 标题下移后，内容区域的 `paddingTop: '160px'` 是否需要调整或移除？

---

## References

- **Remotion 文档**: https://www.remotion.dev/docs/
- **项目组件路径**: `src/compositions/HagicodeHeaderMobile.tsx`
- **移动端场景目录**: `src/scenes/intro-mobile/`
- **共享布局组件**: `src/components/intro-mobile/SceneLayoutMobile.tsx`
- **主题配置**: `src/utils/theme.ts`
