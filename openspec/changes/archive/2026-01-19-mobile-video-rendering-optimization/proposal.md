# 移动端视频渲染优化

**Change ID**: `mobile-video-rendering-optimization`
**Status**: ExecutionCompleted
**Created**: 2026-01-18
**Completed**: 2026-01-18
**Target**: Remotion 4.0 Video Rendering Configuration

---

## Overview

将 Docker 默认渲染组合从 `HagicodeUpdateBulletin` 切换为 `HagicodeReleaseNotesMobile`，输出移动端适配的竖屏格式视频（1080x1920 @ 60fps）。

---

## Problem Statement

### 当前问题

1. **默认渲染组合为桌面端**
   - Docker 渲染环境默认使用 `HagicodeUpdateBulletin` 组合
   - 该组合输出 1920x1080 横屏格式（16:9）
   - 目标发布平台（抖音、B站、小红书）用户主要使用移动设备，竖屏格式体验更佳

2. **移动端组合已存在但未启用**
   - `HagicodeReleaseNotesMobile` 组合已经存在并可用
   - 该组合输出 1080x1920 竖屏格式（9:16）@ 60fps
   - 但未作为默认渲染目标

3. **平台覆盖不充分**
   - 横屏视频在移动端需要旋转设备观看
   - 移动端短视频平台用户占比超过 80%
   - 错失移动端用户增长机会

### 根本原因

- `scripts/config-loader.js` 中的 `detectCompositionId` 函数默认返回 `HagicodeUpdateBulletin`
- 现有的移动端组合未被设置为默认渲染目标

---

## Proposed Solution

### 1. 更新默认渲染组合

**文件**: `scripts/config-loader.js`

**调整内容**:
- 修改 `detectCompositionId` 函数，默认返回 `HagicodeReleaseNotesMobile`
- 保持现有的组合覆盖逻辑（`--composition` 参数）

### 2. 渲染输出规格

**输出规格**:
- 分辨率: 1080x1920（竖屏 9:16）
- 帧率: 60fps
- 编码: H.264（与之前一致）

### 3. 向后兼容性

**保持兼容**:
- 支持 `--composition` 参数覆盖默认组合
- 可通过参数选择渲染 `HagicodeUpdateBulletin`（桌面端）

---

## Scope

### Included Changes

- [ ] `scripts/config-loader.js` - 更新 `detectCompositionId` 默认返回 `HagicodeReleaseNotesMobile`
- [ ] 验证 `HagicodeReleaseNotesMobile` 组合正确注册和可用
- [ ] 更新相关文档说明默认渲染行为变更

### Excluded Changes

- 不修改 `HagicodeReleaseNotesMobile` 组件本身（已存在且可用）
- 不修改移动端场景组件
- 不涉及新的视频资源或组件开发
- 不影响 FFmpeg 后处理逻辑

---

## Impact Assessment

### User Experience

**正面影响**:
- 默认输出移动端适配的竖屏视频
- 用户无需旋转设备即可舒适观看
- 更好地适配抖音、B站、小红书移动端用户习惯
- 提升移动端平台转化率和传播效果

**潜在风险**:
- 现有桌面端工作流需要显式指定 `--composition HagicodeUpdateBulletin`

### Technical Impact

- **渲染组合**: 从 `HagicodeUpdateBulletin` 切换到 `HagicodeReleaseNotesMobile`
- **输出尺寸**: 1920x1080 @ 30fps → 1080x1920 @ 60fps
- **回退策略**: 通过 `--composition` 参数可恢复桌面端渲染

### Platform Compatibility

- **抖音**: 竖屏 9:16 格式 @ 60fps，完美适配
- **B站**: 支持竖屏上传，移动端体验优化
- **小红书**: 竖屏为主，格式一致

---

## Implementation Plan

详细实施计划请参见 [`tasks.md`](./tasks.md)。

### 关键步骤

1. **阶段一**: 更新 `config-loader.js` 默认组合
2. **阶段二**: 验证移动端组合渲染
3. **阶段三**: 测试 Docker 容器渲染
4. **阶段四**: 验证平台兼容性

---

## Success Criteria

### 功能验收标准

- [ ] Docker 默认渲染使用 `HagicodeReleaseNotesMobile` 组合
- [ ] 输出视频为 1080x1920 @ 60fps 格式
- [ ] 所有场景正确显示，文本清晰可读
- [ ] FFmpeg 后处理正常工作

### 兼容性验收标准

- [ ] 支持 `--composition HagicodeUpdateBulletin` 参数切换桌面端
- [ ] 在目标平台预览中显示正常

---

## Alternatives Considered

### 方案 A: 保持现状，手动指定组合

**描述**: 维持默认 `HagicodeUpdateBulletin`，每次渲染时手动指定 `--composition HagicodeReleaseNotesMobile`

**优点**:
- 无变更风险
- 保持向后兼容

**缺点**:
- 每次渲染需要额外参数
- 易出错（忘记指定参数）
- 无法体现移动端优先策略

**结论**: 不采用。移动端是主要目标平台，应作为默认配置。

### 方案 B: 创建环境变量控制

**描述**: 通过环境变量 `RENDER_MODE` 选择移动端或桌面端

**优点**:
- 灵活性高
- 可在运行时切换

**缺点**:
- 增加配置复杂度
- 需要额外文档说明
- 环境变量不如 CLI 参数直观

**结论**: 不采用。简单的默认值变更更直接。

### 方案 C: 基于数据文件自动检测

**描述**: 根据数据文件内容或路径自动选择组合

**优点**:
- 完全自动化
- 无需手动干预

**缺点**:
- 逻辑复杂，易出错
- 难以预测行为
- 调试困难

**结论**: 不采用。简单明确的默认值更可靠。

---

## Open Questions

1. **数据文件兼容性**: `HagicodeReleaseNotesMobile` 是否使用相同的数据结构（schema）？
2. **FFmpeg 后处理**: 移动端视频是否需要调整 FFmpeg 后处理参数？

---

## References

- **当前默认组合**: `scripts/config-loader.js` 中的 `detectCompositionId` 函数
- **移动端组合**: `src/compositions/HagicodeReleaseNotesMobile.tsx`
- **桌面端组合**: `src/compositions/HagicodeUpdateBulletin.tsx`
- **渲染脚本**: `scripts/render-cli.js`
