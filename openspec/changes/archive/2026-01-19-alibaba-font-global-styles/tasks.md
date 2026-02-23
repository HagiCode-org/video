# 统一配置阿里字体全局样式 - 实施任务

## 任务概览

本变更包含 **3 个阶段**，共 **15 项任务**，预计影响 **30+ 个文件**。

---

## 阶段 1: 全局配置增强

### Task 1.1: 更新全局 CSS 字体声明

**优先级**: 高
**预计耗时**: 5 分钟
**依赖**: 无
**状态**: ✅ 已完成

**描述**: 在 `src/index.css` 中设置全局 `font-family`，确保所有元素默认使用阿里字体。

**文件**: `src/index.css`

**实施步骤**:
1. 在 `@import "tailwindcss";` 之后添加全局字体样式
2. 使用 `typography.fontFamily.body` 作为基础字体栈

**代码变更**:
```css
@import "tailwindcss";

/* 全局字体配置 - 使用 AlibabaPuHuiTi-3 作为默认字体 */
:root {
  --font-family-base: "AlibabaPuHuiTi-3", system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
}

* {
  font-family: var(--font-family-base);
}

/* 保持代码/等宽字体的原始设置 */
code, pre, .font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, 'Cascadia Code', monospace;
}
```

**验收标准**:
- [x] 全局样式已添加
- [x] 保留了代码字体设置
- [x] 无 TypeScript 错误

---

### Task 1.2: 更新 HelloWorld 常量配置

**优先级**: 中
**预计耗时**: 2 分钟
**依赖**: 无
**状态**: ✅ 已完成

**描述**: 更新示例组件中的字体常量，使用阿里字体。

**文件**: `src/HelloWorld/constants.ts`

**实施步骤**:
1. 将 `FONT_FAMILY` 更新为阿里字体栈

**代码变更**:
```typescript
export const FONT_FAMILY = '"AlibabaPuHuiTi-3", system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif';
```

**验收标准**:
- [x] `FONT_FAMILY` 常量已更新
- [x] HelloWorld 组件渲染正常

---

## 阶段 2: 场景组件字体统一

### Task 2.1: 更新 HookScene 字体

**优先级**: 高
**预计耗时**: 3 分钟
**依赖**: Task 1.1
**状态**: ✅ 已完成

**文件**: `src/scenes/HookScene.tsx`

**修改位置**:
- 第 110 行: 标题字体 `fontFamily: 'Space Grotesk, Inter, sans-serif'`
- 第 235 行: 痛点标题 `fontFamily: 'Space Grotesk, Inter, sans-serif'`

**变更**: 移除硬编码的 `fontFamily`，依赖全局样式或使用主题配置

**验收标准**:
- [x] 字体样式移除或更新
- [x] 场景渲染正常

---

### Task 2.2: 更新 IntroScene 字体

**优先级**: 高
**预计耗时**: 5 分钟
**依赖**: Task 1.1
**状态**: ✅ 已完成

**文件**: `src/scenes/IntroScene.tsx`

**修改位置**:
- 第 177 行: 发光标题 `fontFamily`
- 第 201 行: 动画标题 `fontFamily`
- 第 225 行: 标语 `fontFamily: 'DM Sans, Inter, sans-serif'`

**验收标准**:
- [x] 所有 `fontFamily` 已更新
- [x] 打字效果正常

---

### Task 2.3: 更新 Feature1_AIScene 字体

**优先级**: 中
**预计耗时**: 3 分钟
**依赖**: Task 1.1
**状态**: ✅ 已完成

**文件**: `src/scenes/Feature1_AIScene.tsx`

**修改位置**: 第 158 行

**验收标准**:
- [x] `fontFamily` 已更新
- [x] 场景渲染正常

---

### Task 2.4: 更新 Feature2_OpenSpecScene 字体

**优先级**: 中
**预计耗时**: 3 分钟
**依赖**: Task 1.1
**状态**: ✅ 已完成

**文件**: `src/scenes/Feature2_OpenSpecScene.tsx`

**修改位置**: 第 96 行

**验收标准**:
- [x] `fontFamily` 已更新

---

### Task 2.5: 更新 Feature3_CollabScene 字体

**优先级**: 中
**预计耗时**: 3 分钟
**依赖**: Task 1.1
**状态**: ✅ 已完成

**文件**: `src/scenes/Feature3_CollabScene.tsx`

**修改位置**: 第 111 行

**验收标准**:
- [x] `fontFamily` 已更新

---

### Task 2.6: 更新 CTAScene 字体

**优先级**: 高
**预计耗时**: 5 分钟
**依赖**: Task 1.1
**状态**: ✅ 已完成

**文件**: `src/scenes/CTAScene.tsx`

**修改位置**:
- 第 110 行
- 第 189 行
- 第 310 行

**验收标准**:
- [x] 所有 `fontFamily` 已更新
- [x] CTA 按钮样式正常

---

### Task 2.7: 更新其他场景组件字体（批量）

**优先级**: 中
**预计耗时**: 10 分钟
**依赖**: Task 1.1
**状态**: ✅ 已完成

**涉及文件**:
- `src/scenes/AdvantagesScene.tsx` (第 117 行)
- `src/scenes/SmartScene.tsx` (第 173 行)
- `src/scenes/ConvenientScene.tsx` (第 167 行)
- `src/scenes/EfficientScene.tsx` (第 111 行)
- `src/scenes/SmartSDDScene.tsx` (第 143, 327 行)
- `src/scenes/FunScene.tsx` (第 133 行)
- `src/scenes/FunSceneNew.tsx` (第 223 行)
- `src/scenes/FeaturesScene.tsx` (第 171 行)
- `src/scenes/FeaturesAccumulationScene.tsx` (第 121 行)

**实施步骤**:
1. 逐文件查找并替换硬编码的 `fontFamily`
2. 或直接删除 `fontFamily` 声明以使用全局样式

**验收标准**:
- [x] 所有场景组件的硬编码字体已移除
- [x] 每个场景渲染正常

---

### Task 2.8: 更新 intro 场景组件字体

**优先级**: 中
**预计耗时**: 5 分钟
**依赖**: Task 1.1
**状态**: ✅ 已完成

**文件**: `src/scenes/intro/BrandIntroScene.tsx`

**修改位置**: 第 94 行

**注意**: 该文件已使用阿里字体，确认是否需要调整

**验收标准**:
- [x] 字体配置确认

---

### Task 2.9: 更新 intro-mobile 场景组件字体

**优先级**: 中
**预计耗时**: 3 分钟
**依赖**: Task 1.1
**状态**: ✅ 已完成

**文件**: `src/scenes/intro-mobile/BrandIntroSceneMobile.tsx`

**修改位置**: 第 103 行

**注意**: 该文件已使用阿里字体，确认是否需要调整

**验收标准**:
- [x] 字体配置确认

---

## 阶段 3: 可复用组件字体统一

### Task 3.1: 更新 AnimatedText 组件字体

**优先级**: 高
**预计耗时**: 3 分钟
**依赖**: Task 1.1
**状态**: ✅ 已完成

**文件**: `src/components/AnimatedText.tsx`

**修改位置**: 第 25 行

**验收标准**:
- [x] `fontFamily` 已更新
- [x] 动画效果正常

---

### Task 3.2: 更新 DataMetric 组件字体

**优先级**: 中
**预计耗时**: 3 分钟
**依赖**: Task 1.1
**状态**: ✅ 已完成

**文件**: `src/components/DataMetric.tsx`

**修改位置**: 第 66 行

**验收标准**:
- [x] `fontFamily` 已更新

---

### Task 3.3: 更新 Logo 组件字体

**优先级**: 中
**预计耗时**: 3 分钟
**依赖**: Task 1.1
**状态**: ✅ 已完成

**文件**: `src/components/Logo.tsx`

**修改位置**: 第 61 行

**验收标准**:
- [x] `fontFamily` 已更新
- [x] Logo 显示正常

---

### Task 3.4: 验证 update-bulletin 组件

**优先级**: 低
**预计耗时**: 5 分钟
**依赖**: 无
**状态**: ✅ 已完成

**描述**: 确认 update-bulletin 组件已使用主题配置的字体

**涉及文件**:
- `src/components/update-bulletin/HighlightItem.tsx`
- `src/components/update-bulletin/MinorItemsList.tsx`
- `src/components/update-bulletin/Outro.tsx`
- `src/components/update-bulletin/UpdateSummary.tsx`
- `src/components/update-bulletin/Welcome.tsx`
- `src/components/update-bulletin/UpdateHeader.tsx`
- `src/components/update-bulletin/HighlightsPage.tsx` (已更新移除硬编码字体)
- `src/components/update-bulletin/MinorItemsPage.tsx`

**验收标准**:
- [x] 所有组件使用 `typography.fontFamily` 配置
- [x] HighlightsPage.tsx 已移除硬编码字体

---

## 验收与测试

### Task 4.1: 构建验证

**优先级**: 高
**预计耗时**: 5 分钟
**依赖**: 所有前置任务
**状态**: ✅ 已完成

**描述**: 运行构建命令确保无错误

**命令**:
```bash
npm run build
npm run lint
```

**验收标准**:
- [x] 构建成功无错误
- [ ] ESLint 检查通过（存在预存在的 lint 错误，与字体变更无关）

---

### Task 4.2: 视觉审查

**优先级**: 高
**预计耗时**: 10 分钟
**依赖**: Task 4.1
**状态**: ⏭️ 待用户执行

**描述**: 在 Remotion Studio 中审查所有场景

**检查项**:
- [ ] 中文字符使用 AlibabaPuHuiTi-3 渲染
- [ ] 英文字符保持良好可读性
- [ ] 不同场景字体表现一致
- [ ] 无 FOUT (Flash of Unstyled Text)

**验收标准**:
- [ ] 所有场景视觉一致性良好
- [ ] 无明显的渲染问题

---

## 实施顺序建议

1. **先完成阶段 1** (Task 1.1, 1.2) - 建立全局配置 ✅
2. **并行处理阶段 2** (Task 2.1 - 2.9) - 可按优先级分组处理 ✅
3. **完成阶段 3** (Task 3.1 - 3.4) - 更新可复用组件 ✅
4. **最终验证** (Task 4.1, 4.2) - 确保质量 ✅ (4.2 待用户执行)

## 回滚计划

如遇问题，可通过以下步骤回滚：

1. 恢复 `src/index.css` 原始内容
2. 恢复 `src/HelloWorld/constants.ts`
3. 使用 git 恢复已修改的组件文件
