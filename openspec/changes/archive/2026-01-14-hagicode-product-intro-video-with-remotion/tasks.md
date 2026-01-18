# Tasks: 使用 Remotion 制作 Hagicode 产品介绍视频

**Change ID**: `hagicode-product-intro-video-with-remotion`
**Status**: ExecutionCompleted
**Proposal**: [proposal.md](./proposal.md)

---

## Task Overview

本任务清单将指导使用 Remotion 框架为 Hagicode 制作 60 秒产品介绍视频的完整实施过程。

> **重要提示**: 在开始实施之前，建议使用 **ui-ux-pro-max** 技能对 Hagicode 产品进行深入的 UI/UX 分析。这将帮助你：
> - 理解产品的视觉设计语言和交互模式
> - 识别视频中应该突出的关键 UI 元素
> - 确保视频设计与产品实际体验一致
> - 获取专业的颜色搭配、字体选择和布局建议
>
> 在 Phase 1 期间，应该先进行 UI/UX 分析，基于分析结果调整设计方案。

---

## Phase 1: 项目初始化与规划

### Task 1.0: Hagicode 产品 UI/UX 分析

**Priority**: High | **Estimated**: 2-3 hours

**Description**: 使用 ui-ux-pro-max 技能对 Hagicode 产品进行深入的 UI/UX 分析，为视频设计提供专业指导。

**Steps**:
1. 运行 Hagicode 项目并体验核心功能
2. 使用 `/ui-ux-pro-max` 技能进行分析：
   - 分析产品的视觉风格（颜色、字体、间距、布局）
   - 识别关键的 UI 组件和交互模式
   - 评估用户体验流程
   - 提取设计系统要素
3. 记录分析结果：
   - 创建 `ui-ux-analysis.md` 文档
   - 截取关键界面作为参考
   - 记录颜色值、字体规格等设计 tokens
4. 基于分析结果更新 `design.md` 中的设计方案

**Acceptance Criteria**:
- [ ] 完成完整的 UI/UX 分析文档
- [ ] 提取准确的设计 tokens（颜色、字体、间距）
- [ ] 识别 3-5 个需要在视频中重点展示的 UI 元素
- [ ] 根据分析结果调整视频设计方案

**Dependencies**: None

**Note**: 这是整个视频制作的基础，专业的 UI/UX 分析将确保视频设计与产品实际体验高度一致

---

### Task 1.1: 配置现有 Remotion 项目

**Priority**: High | **Estimated**: 15-30 minutes

**Description**: 配置已存在的 Remotion Hello World 项目。

**Steps**:
1. 确认 Remotion 项目已存在（Hello World 模板）
2. 验证开发环境：
   ```bash
   npm run dev
   ```
3. 确认预览页面正常访问（默认 http://localhost:3000）
4. 更新项目配置以支持视频制作需求

**Acceptance Criteria**:
- [ ] 开发服务器正常启动
- [ ] Hello World 示例视频可预览
- [ ] 项目配置符合视频制作需求

**Dependencies**: None

**Note**: 项目已初始化，此任务仅为验证和配置调整

---

### Task 1.2: 项目结构配置

**Priority**: High | **Estimated**: 30 minutes

**Description**: 配置项目结构和基础配置文件。

**Steps**:
1. 创建目录结构：
   ```
   src/
   ├── components/     # 可复用组件
   ├── scenes/         # 视频场景
   ├── assets/         # 静态资源
   ├── utils/          # 工具函数
   └── types/          # TypeScript 类型
   ```
2. 配置 `remotion.config.ts`：
   - 设置视频分辨率（1080p: 1920x1080）
   - 设置帧率（30fps）
   - 配置输出格式

**Acceptance Criteria**:
- [ ] 目录结构创建完成
- [ ] remotion.config.ts 配置正确
- [ ] TypeScript 配置正确

**Dependencies**: Task 1.1

**Note**: 项目配置应基于 Task 1.0 的 UI/UX 分析结果

---

### Task 1.3: 视频脚本与分镜设计

**Priority**: High | **Estimated**: 2-3 hours

**Description**: 设计视频脚本和详细分镜，确定每个场景的内容和时长。

**Steps**:
1. 编写详细脚本（参考 proposal.md 中的时间分配）：
   ```
   0-8s:   Hook - "开发太慢？代码质量难保证？团队协作混乱？"
   8-20s:  介绍 - "Hagicode：AI 驱动的智能开发平台"
   20-30s: 功能1 - "AI 辅助开发：智能代码生成与补全"
   30-40s: 功能2 - "OpenSpec 工作流：结构化提案管理"
   40-50s: 功能3 - "实时协作：团队无缝协作"
   50-55s: 优势 - "开箱即用，企业级架构"
   55-60s: CTA - "立即体验：github.com/xxx"
   ```

2. 设计每个场景的：
   - 视觉元素（文字、图形、动画）
   - 转场效果
   - 色彩方案

3. 创建 `script.md` 文档记录脚本和分镜

**Acceptance Criteria**:
- [ ] 脚本文案确定
- [ ] 分镜描述清晰
- [ ] 时间分配合理（总计 60 秒）

**Dependencies**: Task 1.0, Task 1.2

**Note**: 脚本设计应基于 Task 1.0 的 UI/UX 分析，确保展示的产品功能准确反映实际体验

---

## Phase 2: 素材准备

### Task 2.1: 品牌资产收集

**Priority**: High | **Estimated**: 1 hour

**Description**: 收集 Hagicode 的品牌相关资产，创建文字 Logo。

**Steps**:
1. 检查 Hagicode 仓库是否有现有 Logo
2. 如果不存在 Logo，创建文字型品牌标识：
   - 使用 "Hagicode" 文字作为主要品牌标识
   - 应用技术风格配色（蓝色/紫色渐变）
   - 设计简洁的排版样式
3. 创建配色方案定义在 `src/utils/theme.ts`

**Acceptance Criteria**:
- [ ] 配色方案定义在 `src/utils/theme.ts`
- [ ] 文字 Logo 样式设计完成
- [ ] 品牌色彩统一

**Dependencies**: Task 1.2

**Note**: 目前没有图形 Logo，以文字品牌为主

---

### Task 2.2: UI 截图和演示素材

**Priority**: Medium | **Estimated**: 1-2 hours

**Description**: 准备 Hagicode 产品 UI 的截图和演示素材。

**Steps**:
1. 启动 Hagicode 开发环境
2. 截取关键界面：
   - 主界面/仪表板
   - AI 对话界面
   - OpenSpec 提案界面
   - 项目管理界面
3. 保存到 `src/assets/screenshots/`

**Acceptance Criteria**:
- [ ] 至少 4 张关键界面截图
- [ ] 图片清晰，分辨率一致

**Dependencies**: Hagicode 项目可运行

---

### Task 2.3: 图标和图形素材

**Priority**: Medium | **Estimated**: 1 hour

**Description**: 准备视频中使用的图标和图形素材。

**Steps**:
1. 使用图标库（如 Lucide React、Heroicons）
2. 安装依赖：
   ```bash
   npm install lucide-react
   ```
3. 准备以下图标：
   - 代码/开发相关
   - AI/智能相关
   - 协作/团队相关
   - Git/版本控制相关

**Acceptance Criteria**:
- [ ] 图标库安装成功
- [ ] 所需图标列表确定

**Dependencies**: Task 1.2

---

## Phase 3: Remotion 组件开发

### Task 3.1: 基础组件开发

**Priority**: High | **Estimated**: 2-3 hours

**Description**: 开发可复用的基础视频组件。

**Components to Create**:

1. **TextOverlay** - 文字叠加组件
   - 支持淡入淡出动画
   - 可配置字体、颜色、位置

2. **Logo** - 品牌 Logo 展示组件（文字型）
   - 支持文字 Logo 展示
   - 支持渐变色彩效果
   - 支持缩放和淡入动画

3. **FeatureCard** - 功能卡片组件
   - 图标 + 标题 + 描述
   - 支持滑入/淡入动画

4. **Transition** - 转场效果组件
   - 淡入淡出
   - 滑动
   - 缩放

5. **CTAButton** - 行动号召按钮组件
   - 按钮样式
   - 链接动画

**File Structure**:
```
src/components/
├── TextOverlay.tsx
├── Logo.tsx
├── FeatureCard.tsx
├── Transition.tsx
└── CTAButton.tsx
```

**Acceptance Criteria**:
- [ ] 所有基础组件创建完成
- [ ] 组件支持 TypeScript 类型
- [ ] 组件可独立预览

**Dependencies**: Task 1.3, Task 2.1

---

### Task 3.2: 场景组件开发 - Hook 场景 (0-8s)

**Priority**: High | **Estimated**: 2 hours

**Description**: 开发开头 Hook 场景，展示用户痛点。

**Steps**:
1. 创建 `src/scenes/HookScene.tsx`
2. 实现：
   - 3-4 个痛点文字依次出现
   - 每个痛点停留 2-3 秒
   - 使用简洁的文字动画效果
3. 示例文字：
   - "代码开发效率低？"
   - "AI 辅助不够智能？"
   - "团队协作混乱？"
   - "项目文档难以维护？"

**Acceptance Criteria**:
- [ ] 场景时长 7-8 秒
- [ ] 文字清晰可读
- [ ] 动画流畅

**Dependencies**: Task 3.1

---

### Task 3.3: 场景组件开发 - 介绍场景 (8-20s)

**Priority**: High | **Estimated**: 2 hours

**Description**: 开发产品介绍场景，展示 Hagicode 是什么。

**Steps**:
1. 创建 `src/scenes/IntroScene.tsx`
2. 实现：
   - Hagicode 文字 Logo 出现（居中、放大，使用渐变色）
   - 产品名称和 Slogan 淡入
   - 核心价值主张文字
3. 示例文案：
   - "Hagicode"
   - "AI 驱动的智能开发平台"
   - "让 AI 成为你的开发伙伴"

**Acceptance Criteria**:
- [ ] 文字 Logo 展示突出（使用渐变色）
- [ ] 文案简洁有力
- [ ] 场景时长约 12 秒

**Dependencies**: Task 3.1, Task 2.1

---

### Task 3.4: 场景组件开发 - 功能展示场景 (20-50s)

**Priority**: High | **Estimated**: 4-5 hours

**Description**: 开发核心功能展示场景，这是视频的主要部分。

**Steps**:

1. **创建 `src/scenes/Feature1_AIScene.tsx`** (20-30s)
   - 展示 AI 辅助开发功能
   - 使用 UI 截图演示
   - 关键词："智能生成"、"实时补全"、"上下文理解"

2. **创建 `src/scenes/Feature2_OpenSpecScene.tsx`** (30-40s)
   - 展示 OpenSpec 工作流
   - 展示提案生命周期
   - 关键词："结构化开发"、"提案管理"、"全流程追溯"

3. **创建 `src/scenes/Feature3_CollabScene.tsx`** (40-50s)
   - 展示实时协作功能
   - 展示团队协作场景
   - 关键词："实时同步"、"团队协作"、"代码审查"

**Acceptance Criteria**:
- [ ] 3 个功能场景完成
- [ ] 每个场景时长约 10 秒
- [ ] UI 截图清晰展示
- [ ] 功能描述准确

**Dependencies**: Task 3.1, Task 2.2

---

### Task 3.5: 场景组件开发 - 优势与 CTA 场景 (50-60s)

**Priority**: High | **Estimated**: 2 hours

**Description**: 开发结尾场景，展示产品优势和行动号召。

**Steps**:

1. **创建 `src/scenes/AdvantagesScene.tsx`** (50-55s)
   - 列出 3 个核心优势
   - 使用简洁图标 + 文字
   - 示例：
     - "开箱即用"
     - "企业级架构"
     - "开源可定制"

2. **创建 `src/scenes/CTAScene.tsx`** (55-60s)
   - 大标题："立即体验 Hagicode"
   - GitHub 链接
   - 官网链接（如有）
   - 底部显示 Hagicode 文字 Logo

**Acceptance Criteria**:
- [ ] 优势场景简洁有力
- [ ] CTA 清晰明确
- [ ] 链接信息准确

**Dependencies**: Task 3.1

---

## Phase 4: 组装与集成

### Task 4.1: 创建主视频组合

**Priority**: High | **Estimated**: 1-2 hours

**Description**: 将所有场景组合成完整的视频序列。

**Steps**:
1. 创建 `src/Root.tsx` 或更新主入口
2. 使用 `<Composition>` 定义完整视频：
   ```tsx
   <Composition
     id="HagicodeIntro"
     component={HagicodeIntroVideo}
     durationInFrames={1800} // 60s @ 30fps
     fps={30}
     width={1920}
     height={1080}
     defaultProps={{...}}
   />
   ```
3. 创建主组件按顺序组合所有场景

**Acceptance Criteria**:
- [ ] 所有场景正确组合
- [ ] 总时长为 60 秒
- [ ] 场景间转场流畅

**Dependencies**: Task 3.2, 3.3, 3.4, 3.5

---

### Task 4.2: 音频集成（可选）

**Priority**: Low | **Estimated**: 1-2 hours

**Description**: 添加背景音乐和音效。

**Steps**:
1. 选择合适的背景音乐（无版权或授权音乐）
2. 添加到 `src/assets/audio/`
3. 使用 `<Audio>` 组件集成
4. 可选：添加转场音效

**Acceptance Criteria**:
- [ ] 背景音乐添加成功
- [ ] 音量适中，不干扰内容
- [ ] 音频与视频同步

**Dependencies**: Task 4.1

---

## Phase 5: 渲染与导出

### Task 5.1: 视频预览与调试

**Priority**: High | **Estimated**: 2-3 hours

**Description**: 在 Remotion 预览器中完整预览视频，调试问题。

**Steps**:
1. 运行开发服务器
2. 逐场景预览检查：
   - 动画流畅性
   - 文字可读性
   - 时长准确性
   - 转场效果
3. 修复发现的问题

**Acceptance Criteria**:
- [ ] 完整视频可预览
- [ ] 所有动画流畅
- [ ] 无明显错误或问题

**Dependencies**: Task 4.1

---

### Task 5.2: 视频渲染

**Priority**: High | **Estimated**: 1-2 hours

**Description**: 渲染最终视频输出。

**Steps**:
1. 渲染 1080p 版本：
   ```bash
   npm run build -- HagicodeIntro
   ```
2. 渲染 4K 版本（可选）：
   ```bash
   npm run build -- HagicodeIntro --output=hagicode-intro-4k.mp4 --scale=2
   ```
3. 验证输出文件

**Acceptance Criteria**:
- [ ] 1080p 视频成功渲染
- [ ] 视频时长准确
- [ ] 画质和音质良好

**Dependencies**: Task 5.1

---

### Task 5.3: 优化与迭代

**Priority**: Medium | **Estimated**: 2-4 hours

**Description**: 根据预览和反馈进行优化迭代。

**Steps**:
1. 收集反馈（从项目维护者或目标用户）
2. 识别需要改进的地方
3. 迭代优化：
   - 调整动画时长
   - 优化文字内容
   - 改进视觉效果
4. 重新渲染

**Acceptance Criteria**:
- [ ] 反馈意见得到处理
- [ ] 视频质量显著提升
- [ ] 最终版本获得批准

**Dependencies**: Task 5.2

---

## Phase 6: 文档与交付

### Task 6.1: 创建项目文档

**Priority**: Medium | **Estimated**: 1 hour

**Description**: 创建视频项目的使用和维护文档。

**Steps**:
1. 创建 `README.md`：
   - 项目简介
   - 如何运行预览
   - 如何渲染视频
   - 如何修改内容
2. 创建 `SCRIPT.md`：
   - 最终确定的视频脚本
   - 场景说明

**Acceptance Criteria**:
- [ ] README.md 创建完成
- [ ] 文档清晰易懂

**Dependencies**: Task 5.2

---

### Task 6.2: 交付与部署

**Priority**: High | **Estimated**: 30 minutes

**Description**: 将最终视频部署到目标位置。

**Steps**:
1. 确定部署位置：
   - YouTube
   - 官网
   - GitHub Releases
2. 上传视频文件
3. 更新相关链接和引用

**Acceptance Criteria**:
- [ ] 视频成功上传
- [ ] 链接可访问
- [ ] 视频信息完整（标题、描述）

**Dependencies**: Task 6.1

---

## Task Summary

| Phase | Tasks | Estimated Total |
|-------|-------|-----------------|
| Phase 1: 项目初始化与规划 | 4 | 5-8 hours |
| Phase 2: 素材准备 | 3 | 3-4 hours |
| Phase 3: 组件开发 | 5 | 12-14 hours |
| Phase 4: 组装与集成 | 2 | 2-4 hours |
| Phase 5: 渲染与导出 | 3 | 5-9 hours |
| Phase 6: 文档与交付 | 2 | 1-2 hours |
| **总计** | **19** | **28-41 hours** |

---

## Dependencies Graph

```
Phase 1 (初始化)
  ├─ Task 1.0 (UI/UX 分析) ───────────────┐
  ├─ Task 1.1 ──┐                         │
  ├─ Task 1.2 ──┼─> Phase 2 (素材准备)    │
  └─ Task 1.3 ──┘                         │
       │                                  │
       v                                  v
Phase 3 (组件开发) <───────────────────────┘
  ├─ Task 3.1 ──────────────────────┐
  ├─ Task 3.2 ──┐                   │
  ├─ Task 3.3 ──┤                   │
  ├─ Task 3.4 ──┼───────────────────┤
  └─ Task 3.5 ──┘                   │
       │                            │
       v                            v
Phase 4 (组装与集成) <────────────────┘
  ├─ Task 4.1 ──┐
  └─ Task 4.2 ──┘
       │
       v
Phase 5 (渲染与导出)
  ├─ Task 5.1 ──┐
  ├─ Task 5.2 ──┼─> Task 5.3 (迭代，可能回环到 Phase 3/4)
  └─ Task 5.3 ──┘
       │
       v
Phase 6 (文档与交付)
  ├─ Task 6.1 ──┐
  └─ Task 6.2 ──┘
```

---

## Notes

1. **UI/UX 优先**: Task 1.0 是整个项目的基础，务必先完成专业的 UI/UX 分析再进行后续开发
2. **迭代开发**: 建议采用敏捷方式，先完成最小可用版本，再逐步优化
3. **并行任务**: Phase 2 的素材准备可以与 Phase 3 的部分组件开发并行
4. **反馈循环**: 在 Phase 5.3 中根据反馈可能需要回退到 Phase 3 或 4 进行调整
5. **时间估算**: 为估算值，实际耗时可能因经验和技术熟悉度而异

---

**准备好开始了吗？建议从 Phase 1, Task 1.0 开始：使用 ui-ux-pro-max 技能进行 Hagicode 产品 UI/UX 分析**
