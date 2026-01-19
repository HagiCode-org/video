# 统一配置阿里字体全局样式

## 概述

本提案旨在统一项目中的阿里字体（AlibabaPuHuiTi-3）全局样式配置，确保整个 Remotion 视频项目使用一致的字体风格，符合阿里官方设计规范。

**Change ID**: `alibaba-font-global-styles`
**状态**: ExecutionCompleted
**优先级**: 中
**类型**: 样式优化

## 背景

### 当前状态

项目已具备以下基础设施：

1. **字体资源已就绪**: `src/assets/fonts/fonts.css` 已定义 AlibabaPuHuiTi-3 字体（400-800 权重）
2. **主题配置已定义**: `src/utils/theme.ts` 中已定义 `typography.fontFamily` 配置，包含阿里字体
3. **全局样式已导入**: `src/Root.tsx` 中已导入 `fonts.css`

### 存在的问题

通过代码分析发现以下不一致问题：

1. **硬编码字体声明**: 约 30+ 个文件中直接硬编码 `fontFamily: 'Space Grotesk, Inter, sans-serif'`
2. **字体栈不统一**: 部分组件使用 `Space Grotesk`、`DM Sans`、`Inter` 等非阿里字体
3. **未使用主题配置**: 大量组件未使用 `src/utils/theme.ts` 中已定义的 `typography.fontFamily`

### 影响范围

- **场景组件**: `src/scenes/` 下约 15 个文件（如 HookScene、IntroScene、CTAScene 等）
- **可复用组件**: `src/components/` 下约 10 个文件（如 AnimatedText、DataMetric 等）
- **HelloWorld 示例**: `src/HelloWorld/constants.ts` 中定义了 `FONT_FAMILY`

## 解决方案

### 设计原则

1. **单点配置**: 全局字体配置集中在 `src/utils/theme.ts` 和 `src/index.css`
2. **渐进替换**: 优先替换高频使用的组件，逐步覆盖所有场景
3. **保持兼容**: 保留合理的字体回退栈，确保跨平台显示

### 实施策略

#### 阶段 1: 全局配置增强

1. **更新全局样式**: 在 `src/index.css` 中设置全局 `font-family`
2. **Tailwind 配置**: 如使用 Tailwind 工具类，需在配置中添加字体栈

#### 阶段 2: 组件统一

1. **场景组件**: 替换 `src/scenes/` 下所有硬编码的 `fontFamily`
2. **可复用组件**: 替换 `src/components/` 下硬编码的字体声明
3. **常量配置**: 更新 `src/HelloWorld/constants.ts`

#### 阶段 3: 验证与优化

1. **渲染测试**: 运行 `npm run build` 验证所有场景渲染正常
2. **视觉审查**: 确认字体在不同场景下的表现一致

## 范围

### 包含

- 更新 `src/index.css` 全局字体声明
- 替换约 30+ 个组件文件中的硬编码 `fontFamily`
- 更新 `src/HelloWorld/constants.ts` 中的 `FONT_FAMILY` 常量

### 不包含

- 字体文件本身的修改（已优化至 5 个权重）
- Tailwind 配置（当前项目未使用 Tailwind 配置文件，直接使用 CSS）
- 新增字体变体或权重

## 实施计划

详见 [tasks.md](./tasks.md)

## 验收标准

### 功能验收

- [ ] 全局样式已设置阿里字体为默认字体
- [ ] 所有场景组件使用主题配置中的字体
- [ ] 所有可复用组件使用主题配置中的字体
- [ ] `npm run build` 构建成功无错误

### 视觉验收

- [ ] 不同场景之间的字体表现一致
- [ ] 中文字符使用 AlibabaPuHuiTi-3 渲染
- [ ] 英文和数字保持良好的可读性

## 风险与缓解

| 风险 | 影响 | 概率 | 缓解措施 |
|------|------|------|----------|
| 字体加载延迟导致 FOUT | 中 | 低 | 已设置 `font-display: swap` |
| 英文渲染质量下降 | 低 | 低 | 保留英文友好回退字体栈 |
| 现有布局破坏 | 中 | 低 | 渐进式替换，逐场景验证 |

## 参考资料

- [AlibabaPuHuiTi-3 字体配置](/src/assets/fonts/fonts.css)
- [主题配置](/src/utils/theme.ts)
- [Typography 标准](/src/utils/theme.ts#L122)
