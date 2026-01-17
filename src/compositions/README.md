# Hagicode Update Bulletin 视频模板

数据驱动的更新简报视频生成模板，用于程序化创建产品版本更新视频。

## 概述

`HagicodeUpdateBulletin` 是一个基于 Remotion 的视频模板，通过结构化数据自动生成产品更新简报视频。适用于版本发布通知、开发进度汇报等功能场景。

## 数据格式

### YAML 数据存储

数据现在通过 YAML 格式存储在 `public/data/update-bulletin/` 目录中：

```
public/data/update-bulletin/
├── example-data.yaml       # 完整示例数据
├── minimal-data.yaml       # 最小测试数据
└── maximum-data.yaml       # 最大边界测试数据
```

### YAML 文件结构

```yaml
# 版本号 (格式: v1.2.0 或 1.2.0)
version: v1.2.0

# 发布日期 (格式: YYYY-MM-DD)
releaseDate: 2026-01-17

# 版本摘要 (可选)
summary: 本次更新带来了全新的 OpenSpec 提案系统和智能规划功能...

# 重点修改项列表 (最多 20 个)
highlights:
  - id: highlight-1
    title: OpenSpec 提案系统
    description: 全新的提案管理界面，支持结构化的提案创建...
    screenshot: /screenshots/proposal-review.png
    tags:
      - feature

# 次要修改项列表 (最多 20 个)
# 类别选项: feature, bugfix, improvement, ai, ui, performance, other
minorItems:
  - category: feature
    title: 新增项目创建向导
    description: 支持快速创建新项目，自动初始化项目结构
```

### UpdateBulletinData 接口

```typescript
interface UpdateBulletinData {
  version: string;           // 版本号，格式: "v1.2.0"
  releaseDate: string;       // 发布日期，格式: "YYYY-MM-DD"
  summary?: string;          // 可选的版本摘要
  highlights: HighlightItem[]; // 重点修改项 (最多 5 个)
  minorItems: MinorItem[];   // 次要修改项 (最多 20 个)
}
```

### HighlightItem (重点修改项)

```typescript
interface HighlightItem {
  id?: string;               // 可选的唯一标识
  title: string;             // 标题
  description: string;       // 描述
  screenshot?: string;       // 可选的截图路径
  tags?: Tag[];              // 可选的标签
}
```

### MinorItem (次要修改项)

```typescript
interface MinorItem {
  category: Tag;             // 类别: 'feature' | 'bugfix' | 'improvement' | 'ai' | 'ui' | 'performance' | 'other'
  title: string;             // 标题
  description?: string;      // 可选的描述
}
```

## 修改数据

### 方法 1: 编辑 YAML 文件 (推荐)

1. 直接编辑 `public/data/update-bulletin/` 目录中的 YAML 文件
2. 保存后重启开发服务器 (`npm run dev`)
3. YAML 数据会在模块加载时自动验证

**注意**: YAML 缩进必须使用空格，不能使用 Tab。

### 方法 2: 修改 example-data.ts

如需创建新的数据集，编辑 `src/compositions/example-data.ts`:

```typescript
import { loadYamlInline } from '../utils/yaml-loader';

export const myUpdateData = loadYamlInline(
  'update-bulletin/my-data.yaml',
  `# Your YAML content here
version: v1.3.0
releaseDate: 2026-01-20
...
`
);
```

## 数据验证

所有 YAML 数据在加载时都会通过 Zod schema 验证。验证规则：

| 字段 | 规则 |
|------|------|
| `version` | 正则: `^v?\d+\.\d+\.\d+(-.*)?$` |
| `releaseDate` | 正则: `^\d{4}-\d{2}-\d{2}$` |
| `highlights` | 0-20 个元素 |
| `minorItems` | 0-20 个元素 |

错误示例：
```typescript
// 无效版本号
version: "1.2"           // ❌ 缺少补丁版本
version: "v1.2.0-beta"   // ✅ 有效

// 无效日期
releaseDate: "01-20-2026" // ❌ 格式错误
releaseDate: "2026-01-20" // ✅ 正确

// 超出限制
highlights: [/* 21 items */]  // ❌ 最多 20 个
```

## 视频结构

| 时间段 | 内容 | 时长 |
|--------|------|------|
| 0-5s | 头部: 版本号 + 发布日期 | 5s |
| 5-15s | 摘要: 统计数据展示 | 10s |
| 15-45s | 重点修改: 逐个展示 | 15s/项 |
| 45-55s | 次要列表: 详细变更 | 10s |
| 55-60s | 结尾: Logo + 标语 | 5s |

总时长根据内容动态计算: `5 + 10 + (highlights × 15) + 10 + 5` 秒

## 使用方法

### 1. 编辑 YAML 数据文件

编辑 `public/data/update-bulletin/example-data.yaml` 或创建新的 YAML 文件。

### 2. 创建新数据集 (可选)

在 `src/compositions/example-data.ts` 中添加新数据:

```typescript
export const myUpdateData = loadYamlInline(
  'update-bulletin/my-data.yaml',
  `version: v1.3.0
releaseDate: 2026-01-20
summary: 本次更新包含 3 个新功能和多项优化

highlights:
  - id: feature-1
    title: 新功能名称
    description: 功能描述
    screenshot: '/images/update-bulletin/screenshot.png'
    tags:
      - feature
      - ai

minorItems:
  - category: bugfix
    title: 修复问题描述
  - category: improvement
    title: 优化内容
    description: 详细说明
`
);
```

### 3. 在 Root.tsx 中使用

```typescript
<Composition
  id="MyUpdateBulletin"
  component={HagicodeUpdateBulletin}
  durationInFrames={calculateDuration(myUpdateData)}
  fps={30}
  width={1920}
  height={1080}
  schema={UpdateBulletinDataSchema}
  defaultProps={myUpdateData}
/>
```

### 4. 预览和渲染

```bash
# 启动开发服务器
npm run dev

# 在 Remotion Studio 中选择 HagicodeUpdateBulletin 组合

# 渲染视频
npm run build HagicodeUpdateBulletin
```

## 截图处理

### 本地截图

将截图文件放入 `public/images/update-bulletin/` 目录:

```
public/
└── images/
    └── update-bulletin/
        ├── feature-1.png
        ├── feature-2.png
        └── feature-3.png
```

在数据中引用:

```typescript
screenshot: '/images/update-bulletin/feature-1.png'
```

### 远程截图

支持使用远程 URL:

```typescript
screenshot: 'https://example.com/screenshots/feature-1.png'
```

### 无截图模式

如果不想显示截图，可以省略 `screenshot` 字段，组件会自动调整布局。

## 类别标签

可用的标签类型及其含义:

| 标签 | 中文名称 | 图标 | 颜色 |
|------|----------|------|------|
| `feature` | 功能 | ✨ | 紫色 |
| `bugfix` | 修复 | 🐛 | 红色 |
| `improvement` | 改进 | 🚀 | 绿色 |
| `ai` | AI | 🤖 | 紫罗兰 |
| `ui` | UI | 🎨 | 粉色 |
| `performance` | 性能 | ⚡ | 橙色 |
| `other` | 其他 | 📝 | 灰色 |

## 自定义主题

组件使用 `src/utils/theme.ts` 中定义的主题:

- **主色**: 紫罗兰渐变 (`colors.primary`)
- **辅色**: 青蓝渐变 (`colors.secondary`)
- **成功色**: 绿色 (`colors.success`)

如需自定义颜色，修改 `theme.ts` 中的相应值。

## 组件说明

### 主要组件

- **UpdateHeader**: 显示版本号和发布日期
- **UpdateSummary**: 显示更新统计数据
- **HighlightItem**: 展示重点修改项
- **MinorItemsList**: 展示次要修改列表
- **UpdateFooter**: 显示结尾 Logo 和标语

### 可复用组件

以下组件来自 `src/components/`，可在其他视频中复用:

- **Logo**: Hagicode 文字 Logo
- **DataMetric**: 数据统计显示
- **FeatureCard**: 功能卡片
- **ScreenshotShowcase**: 截图展示

## 测试数据

项目包含三个预设数据集：

- **exampleData**: 完整示例 (3 个重点项，7 个次要点)
- **minimalData**: 最小示例 (无重点项，1 个次要点)
- **maximumData**: 最大数据 (5 个重点项，20 个次要点)

这些数据集存储为 YAML 文件在 `public/data/update-bulletin/` 目录中，用于测试不同数据量下的视频效果。

## 故障排除

### YAML 加载失败

**症状**: 启动时报错 "YAML parsing failed"

**解决方法**:
- 检查 YAML 语法，确保使用空格缩进而非 Tab
- 使用在线 YAML 验证工具检查语法
- 确保所有必需字段都已填写

### 数据验证错误

**症状**: 启动时报错 "Data validation failed"

**解决方法**:
- 检查 `version` 格式是否为 `v1.2.0` 格式
- 检查 `releaseDate` 格式是否为 `YYYY-MM-DD`
- 确保 `highlights` 和 `minorItems` 不超过 20 个元素
- 查看具体错误信息定位问题字段

### 视频时长不正确

确保使用 `calculateDuration()` 函数计算时长:

```typescript
durationInFrames={calculateDuration(data)}
```

### 截图不显示

- 检查文件路径是否正确
- 确认文件存在于 `public` 目录
- 使用 `staticFile()` 处理本地文件

### 动画卡顿

- 减少 `minorItems` 数量 (建议不超过 10 个)
- 优化截图文件大小
- 降低视频分辨率或帧率

## 示例场景

### 场景 1: 小版本更新

```typescript
{
  version: 'v1.2.1',
  releaseDate: '2026-01-20',
  highlights: [],
  minorItems: [
    { category: 'bugfix', title: '修复崩溃问题' },
    { category: 'improvement', title: '性能优化' },
  ],
}
```

### 场景 2: 大版本发布

```typescript
{
  version: 'v2.0.0',
  releaseDate: '2026-02-01',
  summary: '全新架构，重大升级',
  highlights: [
    { title: '全新 UI 设计', description: '...', tags: ['ui'] },
    { title: 'AI 引擎升级', description: '...', tags: ['ai'] },
    { title: '性能提升 300%', description: '...', tags: ['performance'] },
  ],
  minorItems: [/* ... */],
}
```

## 许可

本模板是 Hagicode 视频项目的一部分。
