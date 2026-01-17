# Design: YAML数据加载机制

**Change ID**: `yaml-data-migration`
**Status**: ExecutionCompleted
**Related**: [proposal.md](./proposal.md) | [tasks.md](./tasks.md)

---

## Overview

本文档详细说明 YAML 数据迁移的技术架构设计，包括加载机制、数据流、错误处理和扩展性考虑。

---

## Architecture

### 系统架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                        Remotion Application                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              src/compositions/                            │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  example-data.ts                                     │  │  │
│  │  │  ┌─────────────────────────────────────────────┐     │  │  │
│  │  │  │ export const exampleData =                  │     │  │  │
│  │  │  │   loadYamlBuildTime(                        │     │  │  │
│  │  │  │     'update-bulletin/example-data.yaml'     │     │  │  │
│  │  │  │   )                                         │     │  │  │
│  │  │  └─────────────────────────────────────────────┘     │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                             │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  schema.ts                                           │  │  │
│  │  │  ┌─────────────────────────────────────────────┐     │  │  │
│  │  │  │ export const validateUpdateData = ...        │     │  │  │
│  │  │  │ export type UpdateBulletinData = ...         │     │  │  │
│  │  │  └─────────────────────────────────────────────┘     │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                    │
│                              ▼                                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   src/utils/yaml-loader.ts                 │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ 1. Load YAML content (import/fetch)                  │  │  │
│  │  │ 2. Parse with js-yaml                                │  │  │
│  │  │ 3. Validate with Zod schema                          │  │  │
│  │  │ 4. Return typed data                                 │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                    │
│                              ▼                                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                 public/data/update-bulletin/              │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ • example-data.yaml                                  │  │  │
│  │  │ • minimal-data.yaml                                  │  │  │
│  │  │ • maximum-data.yaml                                  │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Design

### 1. YAML Loader Module

**Location**: `src/utils/yaml-loader.ts`

**职责**:
- 从文件系统加载 YAML 内容
- 解析 YAML 格式
- 验证数据结构
- 提供类型安全的返回值

**接口设计**:

```typescript
import load from 'js-yaml';
import { validateUpdateData, type UpdateBulletinData } from '../compositions/schema';
import { staticFile } from 'remotion';

/**
 * 解析 YAML 字符串内容
 * @param content - YAML 格式的字符串
 * @returns 解析后的原始对象
 */
export function parseYamlContent(content: string): unknown {
  try {
    return load(content, {
      schema: coreSchema,  // 使用核心 schema，避免执行任意代码
      filename: 'data.yaml',
    });
  } catch (error) {
    throw new YamlParseError(`YAML 解析失败: ${error.message}`, error);
  }
}

/**
 * 构建时加载 YAML 数据
 * 适用于模块加载时同步读取文件
 *
 * @param relativePath - 相对于 public/data/ 的文件路径
 * @returns 验证后的数据
 */
export function loadYamlBuildTime(relativePath: string): UpdateBulletinData {
  const fullPath = `/data/${relativePath}`;

  try {
    // 使用 import 或 require 在构建时加载
    // 注意: Remotion 环境中可能需要特殊处理
    const content = loadYamlFileSync(fullPath);
    const parsed = parseYamlContent(content);
    return validateUpdateData(parsed);
  } catch (error) {
    if (error instanceof YamlParseError) {
      throw error;
    }
    if (error instanceof z.ZodError) {
      throw new DataValidationError(
        `数据验证失败 (${relativePath}): ${error.errors.map(e =>
          `${e.path.join('.')}: ${e.message}`
        ).join(', ')}`,
        error
      );
    }
    throw new DataLoadError(
      `加载 YAML 文件失败 (${relativePath}): ${error.message}`,
      error
    );
  }
}

/**
 * 运行时异步加载 YAML 数据
 * 适用于动态加载场景
 *
 * @param relativePath - 相对于 public/data/ 的文件路径
 * @returns Promise<验证后的数据>
 */
export async function loadYamlRuntime(
  relativePath: string
): Promise<UpdateBulletinData> {
  const fullPath = staticFile(`/data/${relativePath}`);

  try {
    const response = await fetch(fullPath);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const content = await response.text();
    const parsed = parseYamlContent(content);
    return validateUpdateData(parsed);
  } catch (error) {
    // 错误处理同上
    throw error;
  }
}

// 自定义错误类型
export class YamlParseError extends Error {
  constructor(message: string, public readonly cause: Error) {
    super(message);
    this.name = 'YamlParseError';
  }
}

export class DataLoadError extends Error {
  constructor(message: string, public readonly cause: Error) {
    super(message);
    this.name = 'DataLoadError';
  }
}

export class DataValidationError extends Error {
  constructor(message: string, public readonly cause: z.ZodError) {
    super(message);
    this.name = 'DataValidationError';
  }
}
```

### 2. Example Data Module

**Location**: `src/compositions/example-data.ts`

**重构后结构**:

```typescript
import { loadYamlBuildTime } from '../utils/yaml-loader';
import type { UpdateBulletinData } from './schema';

// 保持原有的导出接口
export const exampleData: UpdateBulletinData = loadYamlBuildTime(
  'update-bulletin/example-data.yaml'
);

export const minimalData: UpdateBulletinData = loadYamlBuildTime(
  'update-bulletin/minimal-data.yaml'
);

export const maximumData: UpdateBulletinData = loadYamlBuildTime(
  'update-bulletin/maximum-data.yaml'
);

// 为了向后兼容，也可以导出类型
export type { UpdateBulletinData, HighlightItem, MinorItem, Tag } from './schema';
export { validateUpdateData, TagSchema } from './schema';
```

---

## Data Format Specification

### YAML File Structure

```yaml
# Hagicode 更新简报数据
# 文件格式: YAML 1.2
# 编码: UTF-8

# 版本号 (格式: v1.2.0 或 1.2.0)
version: v1.2.0

# 发布日期 (格式: YYYY-MM-DD)
releaseDate: 2026-01-17

# 版本摘要 (可选)
summary: |
  本次更新带来了全新的 OpenSpec 提案系统和智能规划功能，
  大幅提升开发效率。同时修复了多个已知问题，优化了整体性能。

# 重点修改项列表 (最多 20 个)
highlights:
  - id: highlight-1              # 唯一标识 (可选)
    title: OpenSpec 提案系统      # 标题 (必填)
    description: |                # 详细描述 (必填，支持多行)
      全新的提案管理界面，支持结构化的提案创建、评审和执行流程。
      让团队协作更加高效，开发决策更加透明。
    screenshot: /path/to/image    # 截图路径 (可选)
    tags:                         # 标签列表 (可选)
      - feature
      - improvement

# 次要修改项列表 (最多 20 个)
minorItems:
  - category: feature             # 类别 (必填): feature|bugfix|improvement|ai|ui|performance|other
    title: 新增项目创建向导        # 标题 (必填)
    description: 支持快速创建新项目  # 描述 (可选)
```

### Schema 验证规则

| 字段 | 类型 | 必填 | 验证规则 |
|------|------|------|----------|
| `version` | string | 是 | 正则: `^v?\d+\.\d+\.\d+(-.*)?$` |
| `releaseDate` | string | 是 | 正则: `^\d{4}-\d{2}-\d{2}$` |
| `summary` | string | 否 | 任意文本 |
| `highlights` | array | 是 | 0-20 个元素 |
| `highlights[].id` | string | 否 | 任意字符串 |
| `highlights[].title` | string | 是 | 最小长度 1 |
| `highlights[].description` | string | 是 | 最小长度 1 |
| `highlights[].screenshot` | string | 否 | 任意路径 |
| `highlights[].tags` | array | 否 | 枚举值 |
| `minorItems` | array | 是 | 0-20 个元素 |
| `minorItems[].category` | enum | 是 | feature/bugfix/improvement/ai/ui/performance/other |
| `minorItems[].title` | string | 是 | 最小长度 1 |
| `minorItems[].description` | string | 否 | 任意文本 |

---

## Error Handling Strategy

### 错误分类

```
┌─────────────────────────────────────────────────────────┐
│                    Error Categories                      │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  1. File Load Errors                                     │
│     ├─ File not found                                    │
│     ├─ Permission denied                                 │
│     └─ Network error (runtime)                           │
│                                                           │
│  2. YAML Parse Errors                                    │
│     ├─ Syntax error (indentation)                        │
│     ├─ Invalid escape sequence                           │
│     └─ Duplicate key                                     │
│                                                           │
│  3. Validation Errors (Zod)                              │
│     ├─ Type mismatch                                     │
│     ├─ Missing required field                            │
│     ├─ Invalid format (regex)                            │
│     └─ Array out of bounds                               │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 错误消息格式

```typescript
// 文件加载错误
DataLoadError: 加载 YAML 文件失败 (update-bulletin/example-data.yaml):
  Cannot find module '/data/update-bulletin/example-data.yaml'
  at loadYamlBuildTime (yaml-loader.ts:42)

// YAML 解析错误
YamlParseError: YAML 解析失败: bad indentation of a mapping entry
  at line 25, column 3:
  23 |   tags:
  24 | - feature
  25 |   title: "示例"  ← 错误: 缩进不正确

// 数据验证错误
DataValidationError: 数据验证失败 (update-bulletin/example-data.yaml):
  highlights.0.title: 标题不能为空
  version: 版本号格式不正确，应为 v1.2.0 格式
```

---

## Performance Considerations

### 加载时机

```
┌─────────────────────────────────────────────────────────┐
│                    Loading Strategy                      │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Build Time (Recommended)                                │
│  ├─ Load during module initialization                    │
│  ├─ Synchronous execution                                │
│  ├─ Data bundled with build output                       │
│  └─ No runtime overhead                                  │
│                                                           │
│  Runtime (Alternative)                                   │
│  ├─ Load on demand                                       │
│  ├─ Asynchronous execution                               │
│  ├─ Dynamic file fetching                                │
│  └─ Caching recommended                                  │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 缓存策略

```typescript
// 简单的内存缓存实现
const dataCache = new Map<string, UpdateBulletinData>();

export function loadYamlWithCache(
  relativePath: string,
  useCache = true
): UpdateBulletinData {
  if (useCache && dataCache.has(relativePath)) {
    return dataCache.get(relativePath)!;
  }

  const data = loadYamlBuildTime(relativePath);
  if (useCache) {
    dataCache.set(relativePath, data);
  }
  return data;
}
```

---

## Extensibility Design

### 未来扩展方向

#### 1. 多语言支持

```
public/data/update-bulletin/
├── example-data.yaml          # 默认中文
├── example-data.en.yaml       # 英文
└── example-data.ja.yaml       # 日文
```

```typescript
export function loadLocalizedData(
  baseName: string,
  locale: string = 'zh'
): UpdateBulletinData {
  const fileName = locale === 'zh' ? baseName : `${baseName}.${locale}`;
  return loadYamlBuildTime(`update-bulletin/${fileName}.yaml`);
}
```

#### 2. 版本管理

```
public/data/update-bulletin/
├── v1.2.0.yaml
├── v1.1.0.yaml
└── latest.yaml -> v1.2.0.yaml (symlink)
```

#### 3. 数据组合

```yaml
# base-config.yaml
baseFields:
  projectName: Hagicode
  theme: dark

# example-data.yaml
extends: base-config.yaml
version: v1.2.0
highlights: ...
```

---

## Testing Strategy

### 单元测试

```typescript
import { describe, it, expect } from 'vitest';
import { parseYamlContent, loadYamlBuildTime } from '../yaml-loader';

describe('yaml-loader', () => {
  describe('parseYamlContent', () => {
    it('should parse valid YAML', () => {
      const yaml = 'version: v1.0.0\nreleaseDate: 2026-01-01';
      const result = parseYamlContent(yaml);
      expect(result).toEqual({ version: 'v1.0.0', releaseDate: '2026-01-01' });
    });

    it('should throw on invalid YAML syntax', () => {
      const yaml = 'version: v1.0.0\n  bad: indentation';
      expect(() => parseYamlContent(yaml)).toThrow(YamlParseError);
    });
  });

  describe('loadYamlBuildTime', () => {
    it('should load and validate example-data.yaml', () => {
      const data = loadYamlBuildTime('update-bulletin/example-data.yaml');
      expect(data.version).toMatch(/^v?\d+\.\d+\.\d+/);
      expect(data.highlights).toBeInstanceOf(Array);
    });

    it('should throw on validation error', () => {
      // Test with invalid data file
    });
  });
});
```

### 集成测试

```typescript
describe('YAML Integration', () => {
  it('should render video with YAML data', async () => {
    const data = loadYamlBuildTime('update-bulletin/example-data.yaml');
    // Verify video renders without errors
    expect(() => renderVideo(data)).not.toThrow();
  });
});
```

---

## Security Considerations

### YAML 安全配置

```typescript
import load from 'js-yaml';

// 使用安全的 schema
const safeLoadOptions = {
  schema: coreSchema,  // 限制为核心 YAML 功能
  filename: 'data.yaml',
  onWarning: (warning) => {
    console.warn('YAML Warning:', warning);
  },
};
```

### 避免的安全风险

1. **代码执行**: 禁用 `!!js/function` 和其他危险类型
2. **原型污染**: 验证输入键名
3. **路径遍历**: 限制 `relativePath` 只能访问 `data/` 目录

```typescript
function validatePath(relativePath: string): void {
  const normalized = path.normalize(relativePath);
  if (normalized.startsWith('..') || path.isAbsolute(normalized)) {
    throw new Error('Invalid path: path traversal detected');
  }
}
```

---

## Migration Checklist

### Pre-Migration

- [ ] 备份原有的 `example-data.ts`
- [ ] 确认所有依赖已安装
- [ ] 创建目录结构

### Migration Steps

- [ ] 导出 YAML 文件
- [ ] 实现 yaml-loader
- [ ] 更新 example-data.ts
- [ ] 验证数据一致性

### Post-Migration

- [ ] 运行所有测试
- [ ] 更新文档
- [ ] 提交变更

---

## References

- [js-yaml Documentation](https://github.com/nodeca/js-yaml)
- [YAML 1.2 Specification](https://yaml.org/spec/1.2/spec.html)
- [Zod Validation](https://zod.dev/)
- [Remotion Static Files](https://www.remotion.dev/docs/webpack/staticfiles)

---

**文档版本**: 1.0
**最后更新**: 2026-01-17
