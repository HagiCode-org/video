# Tasks: Hagicode 更新简报视频模板

**Change ID**: `hagicode-update-bulletin-template`
**Status**: ExecutionCompleted
**Proposal**: [proposal.md](./proposal.md)
**Design**: [design.md](./design.md)

---

## Task Overview

本任务清单将指导创建 Hagicode 更新简报视频模板的完整实施过程。

---

## Phase 1: 数据结构与 Schema 定义

### Task 1.1: 创建 Zod Schema 定义

**Priority**: High | **Estimated**: 30-45 minutes

**Description**: 定义更新数据结构的 Zod schema，提供类型安全和运行时验证。

**Steps**:
1. 创建 `src/compositions/schema.ts` 文件
2. 定义 TagSchema 枚举（feature, bugfix, improvement, ai, ui, performance, other）
3. 定义 HighlightItemSchema（id, title, description, screenshot, tags）
4. 定义 MinorItemSchema（category, title, description）
5. 定义 UpdateBulletinDataSchema（version, releaseDate, summary, highlights, minorItems）
6. 导出 TypeScript 类型

**Acceptance Criteria**:
- [x] schema.ts 文件创建完成
- [x] 所有 schema 定义正确
- [x] 类型导出成功
- [x] 可以导入并使用类型

**Dependencies**: None

---

### Task 1.2: 创建示例数据

**Priority**: High | **Estimated**: 30 minutes

**Description**: 创建完整的示例数据，用于演示和测试。

**Steps**:
1. 创建 `src/compositions/example-data.ts` 文件
2. 创建符合 schema 的示例数据：
   - 版本号: "v1.2.0"
   - 发布日期: "2026-01-17"
   - 2-3 个重点修改项（包含截图引用）
   - 5-8 个次要修改项
   - 版本摘要
3. 验证数据符合 schema

**Acceptance Criteria**:
- [x] example-data.ts 文件创建完成
- [x] 数据通过 Zod 验证
- [x] 包含至少 2 个重点项和 5 个次要点
- [x] 可导入使用

**Dependencies**: Task 1.1

---

## Phase 2: 组件开发

### Task 2.1: 创建目录结构

**Priority**: High | **Estimated**: 5 minutes

**Description**: 创建组件目录结构。

**Steps**:
1. 创建 `src/components/update-bulletin/` 目录
2. 确认目录可访问

**Acceptance Criteria**:
- [x] 目录创建完成
- [x] 路径正确

**Dependencies**: None

---

### Task 2.2: 开发 UpdateHeader 组件

**Priority**: High | **Estimated**: 45-60 minutes

**Description**: 开发头部组件，显示版本号和发布日期。

**Steps**:
1. 创建 `src/components/update-bulletin/UpdateHeader.tsx`
2. 定义 UpdateHeaderProps 接口
3. 实现组件：
   - 使用 AbsoluteFill 布局
   - 显示 Hagicode 文字 Logo（使用渐变色）
   - 显示版本号和日期
   - 添加 spring 动画（logo 从上方淡入缩放）
   - 文字从下方滑入
4. 使用 theme.ts 中的颜色

**Acceptance Criteria**:
- [x] 组件创建完成
- [x] 显示版本号和日期
- [x] 动画流畅
- [x] 使用品牌配色

**Dependencies**: Task 2.1

---

### Task 2.3: 开发 UpdateSummary 组件

**Priority**: High | **Estimated**: 60-90 minutes

**Description**: 开发摘要组件，显示统计数据。

**Steps**:
1. 创建 `src/components/update-bulletin/UpdateSummary.tsx`
2. 定义 UpdateSummaryProps 接口
3. 实现组件：
   - 显示标题 "本版本更新"
   - 3 个统计卡片（新功能、Bug修复、改进）
   - 数字计数动画（从 0 开始）
   - 可选的摘要文本
   - 使用 Sequence 依次显示卡片
4. 复用或参考 DataMetric 组件

**Acceptance Criteria**:
- [x] 组件创建完成
- [x] 显示正确统计数据
- [x] 数字计数动画工作
- [x] 卡片依次出现

**Dependencies**: Task 2.1

---

### Task 2.4: 开发 HighlightItem 组件

**Priority**: High | **Estimated**: 60-90 minutes

**Description**: 开发重点修改项展示组件。

**Steps**:
1. 创建 `src/components/update-bulletin/HighlightItem.tsx`
2. 定义 HighlightItemProps 接口
3. 实现组件：
   - 标题、描述、截图区域
   - 标签显示（带颜色）
   - 卡片入场动画（从右侧滑入 + 缩放）
   - 截图延迟淡入
   - 复用 FeatureCard 和 ScreenshotShowcase 组件
4. 支持无截图的布局

**Acceptance Criteria**:
- [x] 组件创建完成
- [x] 显示所有内容
- [x] 支持有/无截图
- [x] 标签正确显示
- [x] 动画流畅

**Dependencies**: Task 2.1

---

### Task 2.5: 开发 MinorItemsList 组件

**Priority**: High | **Estimated**: 60-90 minutes

**Description**: 开发次要修改列表组件。

**Steps**:
1. 创建 `src/components/update-bulletin/MinorItemsList.tsx`
2. 定义 MinorItemsListProps 接口
3. 实现组件：
   - 显示 "详细变更" 标题
   - 列表项依次显示（使用 Sequence delay）
   - 每项包含：类别标识、标题、描述
   - 类别使用不同颜色
   - 处理长列表（限制最大显示）
4. 添加淡入动画

**Acceptance Criteria**:
- [x] 组件创建完成
- [x] 列表正确显示
- [x] 依次出现动画
- [x] 类别颜色区分
- [x] 处理最大数量限制

**Dependencies**: Task 2.1

---

### Task 2.6: 开发 UpdateFooter 组件

**Priority**: Medium | **Estimated**: 30-45 minutes

**Description**: 开发结尾组件。

**Steps**:
1. 创建 `src/components/update-bulletin/UpdateFooter.tsx`
2. 定义 UpdateFooterProps 接口
3. 实现组件：
   - 复用 Logo 组件
   - 显示感谢/标语文字
   - 居中布局
   - 淡入动画

**Acceptance Criteria**:
- [x] 组件创建完成
- [x] Logo 显示正确
- [x] 文字显示正确
- [x] 动画流畅

**Dependencies**: Task 2.1

---

## Phase 3: 主组合开发

### Task 3.1: 创建主组合组件

**Priority**: High | **Estimated**: 60-90 minutes

**Description**: 创建 HagicodeUpdateBulletin 主组合组件。

**Steps**:
1. 创建 `src/compositions/HagicodeUpdateBulletin.tsx`
2. 定义组件：
   - 接收 UpdateBulletinData 作为 props
   - 计算总时长
   - 使用 Sequence 组织各部分
   - 使用 Series 组织多个 HighlightItem
3. 实现时长计算函数
4. 串联所有子组件

**Acceptance Criteria**:
- [x] 主组件创建完成
- [x] 正确计算时长
- [x] 所有子组件正确串联
- [x] 时序正确

**Dependencies**: Tasks 2.2, 2.3, 2.4, 2.5, 2.6

---

### Task 3.2: 注册组合到 Root

**Priority**: High | **Estimated**: 15 minutes

**Description**: 在 Root.tsx 中注册新组合。

**Steps**:
1. 打开 `src/Root.tsx`
2. 导入 HagicodeUpdateBulletin 和 schema
3. 添加 Composition 注册：
   - id: "HagicodeUpdateBulletin"
   - fps: 30
   - width: 1920
   - height: 1080
   - schema: UpdateBulletinDataSchema
   - defaultProps: exampleData

**Acceptance Criteria**:
- [x] 导入成功
- [x] Composition 注册完成
- [x] 在 Remotion Studio 中可见

**Dependencies**: Task 3.1, Task 1.2

---

## Phase 4: 测试与优化

### Task 4.1: Remotion Studio 预览测试

**Priority**: High | **Estimated**: 30-45 minutes

**Description**: 在 Remotion Studio 中完整预览和测试。

**Steps**:
1. 启动开发服务器: `npm run dev`
2. 在 Remotion Studio 中选择 HagicodeUpdateBulletin
3. 完整播放视频检查：
   - 所有动画流畅
   - 时序正确
   - 内容完整显示
   - 无错误或警告

**Acceptance Criteria**:
- [x] 开发服务器正常启动
- [x] 组合在侧边栏可见
- [x] 完整播放无错误
- [x] 视觉效果符合预期

**Dependencies**: Task 3.2

---

### Task 4.2: TypeScript 类型检查

**Priority**: High | **Estimated**: 10 minutes

**Description**: 运行 TypeScript 类型检查。

**Steps**:
1. 运行 `npm run lint` 或 `tsc`
2. 修复所有类型错误
3. 确保所有组件类型正确

**Acceptance Criteria**:
- [x] 无 TypeScript 错误
- [x] 无 ESLint 错误（新增文件）

**Dependencies**: Task 3.2

---

### Task 4.3: 验证不同数据场景

**Priority**: Medium | **Estimated**: 30-45 minutes

**Description**: 测试不同数据量下的表现。

**Steps**:
1. 创建测试数据变体：
   - 最小数据（无 highlight，少量 minor items）
   - 最大数据（5 highlights，20 minor items）
   - 无截图的 highlight
2. 测试每种场景：
   - 时长计算正确
   - 布局适应
   - 无渲染错误

**Acceptance Criteria**:
- [x] 最小数据正常渲染
- [x] 最大数据正常渲染
- [x] 无截图场景正常
- [x] 时长计算准确

**Dependencies**: Task 4.1

---

### Task 4.4: 动画调优

**Priority**: Medium | **Estimated**: 30-45 minutes

**Description**: 调整动画参数以获得最佳效果。

**Steps**:
1. 检查各组件动画：
   - 入场速度是否合适
   - 过渡是否流畅
   - 时序是否协调
2. 调整参数：
   - spring 配置
   - interpolate 参数
   - delay 时长
3. 预览并确认效果

**Acceptance Criteria**:
- [x] 所有动画流畅自然
- [x] 节奏协调一致
- [x] 无卡顿或跳跃

**Dependencies**: Task 4.1

---

## Phase 5: 文档与交付

### Task 5.1: 创建使用文档

**Priority**: Medium | **Estimated**: 30 minutes

**Description**: 创建组件使用说明文档。

**Steps**:
1. 在 `src/compositions/` 创建 README.md
2. 文档内容：
   - 组件简介
   - 数据格式说明
   - 如何创建新更新视频
   - 示例代码
   - 截图处理说明

**Acceptance Criteria**:
- [x] README.md 创建完成
- [x] 文档清晰易懂
- [x] 包含示例

**Dependencies**: Task 4.2

---

### Task 5.2: 准备截图资源

**Priority**: Low | **Estimated**: 30 minutes

**Description**: 准备示例用的截图资源。

**Steps**:
1. 创建 `public/images/update-bulletin/` 目录
2. 添加占位截图或实际产品截图
3. 更新 example-data.ts 中的截图路径

**Acceptance Criteria**:
- [x] 目录创建完成
- [x] 截图资源目录和说明文档已创建
- [x] 路径正确

**Dependencies**: None

---

## Task Summary

| Phase | Tasks | Estimated Total |
|-------|-------|-----------------|
| Phase 1: 数据结构 | 2 | 1-1.5 hours |
| Phase 2: 组件开发 | 6 | 4-6.5 hours |
| Phase 3: 主组合 | 2 | 1.5-2 hours |
| Phase 4: 测试优化 | 4 | 1.5-2.5 hours |
| Phase 5: 文档交付 | 2 | 1 hour |
| **总计** | **16** | **9-13.5 hours** |

---

## Dependencies Graph

```
Phase 1 (数据结构)
  ├─ Task 1.1 (Schema) ──────────────────────┐
  ├─ Task 1.2 (Example Data) ────────────────┤
  │                                           │
Phase 2 (组件开发)                            │
  ├─ Task 2.1 (目录) ──┐                      │
  ├─ Task 2.2 (Header) ├──┐                  │
  ├─ Task 2.3 (Summary) ├──┤                  │
  ├─ Task 2.4 (Highlight) ├──┼────────────────┤
  ├─ Task 2.5 (MinorList) ├──┤              │
  └─ Task 2.6 (Footer) ────┘                  │
       │                                      │
       v                                      │
Phase 3 (主组合) <─────────────────────────────┘
  ├─ Task 3.1 (主组件) ──┐
  └─ Task 3.2 (注册) ────┘
       │
       v
Phase 4 (测试优化)
  ├─ Task 4.1 (预览) ──┐
  ├─ Task 4.2 (类型) ├──┐
  ├─ Task 4.3 (场景) ├──┼─> Task 4.4 (调优)
  └─ Task 4.4 (调优) ──┘
       │
       v
Phase 5 (文档交付)
  ├─ Task 5.1 (文档)
  └─ Task 5.2 (资源)
```

---

## Notes

1. **组件复用**: 优先复用现有组件（Logo, FeatureCard, ScreenshotShowcase）以保持一致性
2. **动画一致性**: 使用现有的 `src/utils/animations.ts` 中的函数
3. **主题统一**: 所有组件必须使用 `src/utils/theme.ts` 中的颜色和样式
4. **测试数据**: Task 4.3 很重要，确保模板在不同数据量下都能正常工作
5. **时长计算**: 注意最大数据量时的视频时长，避免过长

---

**准备好开始了吗？建议从 Phase 1, Task 1.1 开始：创建 Zod Schema 定义**
