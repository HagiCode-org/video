# Tasks: 数据迁移至YAML格式

**Change ID**: `yaml-data-migration`
**Status**: ExecutionCompleted
**Proposal**: [proposal.md](./proposal.md)

---

## Task Overview

本任务清单将指导完成从硬编码数据到 YAML 格式文件的完整迁移过程。

---

## Phase 1: 环境准备

### Task 1.1: 安装 YAML 解析依赖

**Priority**: High | **Estimated**: 5-10 minutes

**Description**: 安装 js-yaml 库及其 TypeScript 类型定义。

**Steps**:
1. 运行 `npm install js-yaml`
2. 运行 `npm install --save-dev @types/js-yaml`
3. 验证安装成功：检查 `package.json` 中的依赖项

**Acceptance Criteria**:
- [ ] js-yaml 安装成功
- [ ] @types/js-yaml 安装成功
- [ ] npm run lint 无错误

**Dependencies**: None

---

### Task 1.2: 创建数据目录结构

**Priority**: High | **Estimated**: 5 minutes

**Description**: 创建存放 YAML 数据文件的目录。

**Steps**:
1. 创建 `public/data/` 目录
2. 创建 `public/data/update-bulletin/` 子目录
3. 添加 `.gitkeep` 文件确保空目录被版本控制
4. 创建 `public/data/README.md` 说明文件用途

**Acceptance Criteria**:
- [ ] `public/data/` 目录创建完成
- [ ] `public/data/update-bulletin/` 子目录创建完成
- [ ] README.md 创建完成，说明目录用途

**Dependencies**: None

---

## Phase 2: YAML 文件创建

### Task 2.1: 导出 example-data.yaml

**Priority**: High | **Estimated**: 15-20 minutes

**Description**: 将 `exampleData` 对象转换为 YAML 格式。

**Steps**:
1. 创建 `public/data/update-bulletin/example-data.yaml`
2. 转换数据结构：
   - version: "v1.2.0"
   - releaseDate: "2026-01-17"
   - summary: 保持原有文本
   - highlights: 转换数组格式
   - minorItems: 转换数组格式
3. 添加 YAML 注释说明各字段用途
4. 验证 YAML 语法正确性

**Acceptance Criteria**:
- [ ] example-data.yaml 文件创建完成
- [ ] 数据结构与 exampleData 一致
- [ ] YAML 语法正确，无缩进错误
- [ ] 包含有意义的注释

**Dependencies**: Task 1.2

**YAML 示例格式**:
```yaml
# Hagicode 更新简报 - 示例数据
version: v1.2.0
releaseDate: 2026-01-17
summary: 本次更新带来了全新的 OpenSpec 提案系统和智能规划功能...

highlights:
  - id: highlight-1
    title: OpenSpec 提案系统
    description: 全新的提案管理界面，支持结构化的提案创建...
    screenshot: /screenshots/proposal-review.png
    tags:
      - feature

minorItems:
  - category: feature
    title: 新增项目创建向导
    description: 支持快速创建新项目，自动初始化项目结构
```

---

### Task 2.2: 导出 minimal-data.yaml

**Priority**: High | **Estimated**: 10 minutes

**Description**: 将 `minimalData` 对象转换为 YAML 格式。

**Steps**:
1. 创建 `public/data/update-bulletin/minimal-data.yaml`
2. 转换数据结构（最小化数据集）
3. 添加注释说明这是最小测试数据
4. 验证 YAML 语法

**Acceptance Criteria**:
- [ ] minimal-data.yaml 文件创建完成
- [ ] 数据结构与 minimalData 一致
- [ ] YAML 语法正确

**Dependencies**: Task 1.2

---

### Task 2.3: 导出 maximum-data.yaml

**Priority**: High | **Estimated**: 15-20 minutes

**Description**: 将 `maximumData` 对象转换为 YAML 格式。

**Steps**:
1. 创建 `public/data/update-bulletin/maximum-data.yaml`
2. 转换数据结构（包含最大边界值）
3. 添加注释说明这是边界测试数据
4. 验证 YAML 语法

**Acceptance Criteria**:
- [ ] maximum-data.yaml 文件创建完成
- [ ] 数据结构与 maximumData 一致
- [ ] YAML 语法正确
- [ ] 包含 20 个 minorItems

**Dependencies**: Task 1.2

---

## Phase 3: 加载机制实现

### Task 3.1: 创建 yaml-loader 工具模块

**Priority**: High | **Estimated**: 45-60 minutes

**Description**: 实现 YAML 文件加载和解析的工具模块。

**Steps**:
1. 创建 `src/utils/yaml-loader.ts` 文件
2. 实现以下功能：
   - `parseYamlFile(content: string): unknown` - 解析 YAML 字符串
   - `loadYamlBuildTime(path: string): UpdateBulletinData` - 构建时加载
   - `loadYamlRuntime(path: string): Promise<UpdateBulletinData>` - 运行时加载
3. 使用 `validateUpdateData()` 验证解析后的数据
4. 添加错误处理和清晰的错误信息
5. 导出类型和工具函数

**Acceptance Criteria**:
- [ ] yaml-loader.ts 文件创建完成
- [ ] 实现构建时和运行时两种加载方式
- [ ] 数据通过 Zod schema 验证
- [ ] 错误处理完善，错误信息清晰
- [ ] TypeScript 类型正确

**Dependencies**: Task 1.1

**代码框架**:
```typescript
import load from 'js-yaml';
import { validateUpdateData, type UpdateBulletinData } from '../compositions/schema';

export function parseYamlFile(content: string): unknown {
  return load(content);
}

export function loadYamlBuildTime(path: string): UpdateBulletinData {
  // 使用 import.meta.url 或 staticFile 加载
  // 解析 YAML
  // 验证数据
  return validatedData;
}

export async function loadYamlRuntime(path: string): Promise<UpdateBulletinData> {
  // 使用 fetch 加载
  // 解析 YAML
  // 验证数据
  return validatedData;
}
```

---

### Task 3.2: 更新 example-data.ts

**Priority**: High | **Estimated**: 20-30 minutes

**Description**: 重构 `src/compositions/example-data.ts` 使用 YAML 加载机制。

**Steps**:
1. 打开 `src/compositions/example-data.ts`
2. 移除硬编码的数据对象定义
3. 导入 `loadYamlBuildTime` 函数
4. 重新实现导出：
   ```typescript
   export const exampleData: UpdateBulletinData = loadYamlBuildTime(
     'update-bulletin/example-data.yaml'
   );
   export const minimalData: UpdateBulletinData = loadYamlBuildTime(
     'update-bulletin/minimal-data.yaml'
   );
   export const maximumData: UpdateBulletinData = loadYamlBuildTime(
     'update-bulletin/maximum-data.yaml'
   );
   ```
5. 保持原有的 TypeScript 类型导出

**Acceptance Criteria**:
- [ ] 硬编码数据移除
- [ ] 使用 YAML 加载函数
- [ ] 导出接口保持不变
- [ ] TypeScript 类型检查通过

**Dependencies**: Task 3.1, Tasks 2.1-2.3

---

## Phase 4: 测试验证

### Task 4.1: 开发环境测试

**Priority**: High | **Estimated**: 15-20 minutes

**Description**: 在开发环境中验证 YAML 加载机制。

**Steps**:
1. 启动开发服务器: `npm run dev`
2. 在 Remotion Studio 中选择 HagicodeUpdateBulletin 组合
3. 验证数据加载：
   - 检查控制台无错误
   - 验证视频内容正常显示
   - 检查所有三个数据集可切换
4. 测试修改 YAML 文件后热重载

**Acceptance Criteria**:
- [ ] 开发服务器正常启动
- [ ] 组合可正常加载
- [ ] 视频内容正确显示
- [ ] YAML 修改后热重载生效

**Dependencies**: Task 3.2

---

### Task 4.2: TypeScript 类型检查

**Priority**: High | **Estimated**: 10 minutes

**Description**: 确保所有类型检查通过。

**Steps**:
1. 运行 `npm run lint` 或 `tsc`
2. 检查 yaml-loader.ts 类型正确
3. 检查 example-data.ts 类型正确
4. 修复任何类型错误

**Acceptance Criteria**:
- [ ] 无 TypeScript 类型错误
- [ ] 无 ESLint 警告（新增文件）

**Dependencies**: Task 3.2

---

### Task 4.3: 数据一致性验证

**Priority**: High | **Estimated**: 20-30 minutes

**Description**: 验证迁移后的数据与原数据一致。

**Steps**:
1. 对比 YAML 文件与原数据的字段值
2. 特别注意：
   - 版本号格式
   - 日期格式
   - 数组项数量
   - 字符串内容（包括换行符）
3. 在 Remotion Studio 中对比视频输出
4. 确认所有边界数据正确（maximum-data 的 20 个项）

**Acceptance Criteria**:
- [ ] YAML 数据与原硬编码数据一致
- [ ] 视频渲染结果无差异
- [ ] 边界数据测试通过

**Dependencies**: Task 3.2

---

### Task 4.4: 错误处理测试

**Priority**: Medium | **Estimated**: 15-20 minutes

**Description**: 测试各种错误场景的处理。

**Steps**:
1. 测试 YAML 语法错误（故意制造缩进错误）
2. 测试字段类型错误（如 version 格式不对）
3. 测试缺少必需字段
4. 测试文件不存在
5. 验证错误信息清晰可读

**Acceptance Criteria**:
- [ ] YAML 语法错误被捕获并显示清晰信息
- [ ] Schema 验证错误被 Zod 捕获
- [ ] 文件不存在错误有友好提示
- [ ] 错误信息指向具体问题

**Dependencies**: Task 3.1

---

## Phase 5: 文档与收尾

### Task 5.1: 更新 README 文档

**Priority**: Medium | **Estimated**: 20-30 minutes

**Description**: 更新项目文档说明新的数据格式。

**Steps**:
1. 更新 `src/compositions/README.md`（如果存在）
2. 添加 YAML 数据格式说明章节：
   - 数据文件位置
   - YAML 格式规范
   - 如何修改数据
   - 数据验证机制
3. 添加示例 YAML 片段
4. 更新 `public/data/README.md`

**Acceptance Criteria**:
- [ ] README 更新完成
- [ ] YAML 格式说明清晰
- [ ] 包含使用示例
- [ ] 说明验证机制

**Dependencies**: Task 4.3

---

### Task 5.2: 清理和代码审查

**Priority**: Medium | **Estimated**: 15-20 minutes

**Description**: 清理临时文件并进行代码审查。

**Steps**:
1. 检查是否有未使用的导入
2. 检查代码风格一致性
3. 添加必要的注释
4. 移除调试代码
5. 运行完整的 lint 检查

**Acceptance Criteria**:
- [ ] 无未使用的导入
- [ ] 代码风格一致
- [ ] 注释恰当
- [ ] 无调试代码残留
- [ ] npm run lint 全部通过

**Dependencies**: Task 4.2

---

### Task 5.3: Git 提交变更

**Priority**: Low | **Estimated**: 5 minutes

**Description**: 将变更提交到版本控制。

**Steps**:
1. 检查 git status 确认变更
2. 添加所有变更文件
3. 创建清晰的提交信息
4. 提交变更

**Acceptance Criteria**:
- [ ] 所有相关文件已添加
- [ ] 提交信息清晰描述变更
- [ ] 无意外文件被提交

**Dependencies**: Task 5.2

---

## Task Summary

| Phase | Tasks | Estimated Total |
|-------|-------|-----------------|
| Phase 1: 环境准备 | 2 | 10-15 minutes |
| Phase 2: YAML 文件创建 | 3 | 40-50 minutes |
| Phase 3: 加载机制实现 | 2 | 1-1.5 hours |
| Phase 4: 测试验证 | 4 | 1-1.5 hours |
| Phase 5: 文档收尾 | 3 | 40-55 minutes |
| **总计** | **14** | **3-4.5 hours** |

---

## Dependencies Graph

```
Phase 1 (环境准备)
  ├─ Task 1.1 (安装依赖) ────────────────────────┐
  ├─ Task 1.2 (创建目录) ────────────────────────┤
  │                                               │
Phase 2 (YAML 文件)                               │
  ├─ Task 2.1 (example-data) ──────┐             │
  ├─ Task 2.2 (minimal-data) ───────┼──────┐     │
  ├─ Task 2.3 (maximum-data) ───────┘      │     │
  │                                         │     │
Phase 3 (加载机制)                           │     │
  ├─ Task 3.1 (yaml-loader) ◄───────────────┘     │
  └─ Task 3.2 (更新 example-data) ◄───────────────┘
       │
       v
Phase 4 (测试验证)
  ├─ Task 4.1 (开发测试) ──┐
  ├─ Task 4.2 (类型检查) ├──┐
  ├─ Task 4.3 (一致性) ├───┼─> Task 4.4 (错误测试)
  └─ Task 4.4 (错误测试) ──┘
       │
       v
Phase 5 (文档收尾)
  ├─ Task 5.1 (更新文档)
  ├─ Task 5.2 (清理代码) ──> Task 5.3 (提交)
  └─ Task 5.3 (提交)
```

---

## Notes

1. **数据备份**: 在开始迁移前建议备份原有的 example-data.ts，以便对比和回滚
2. **YAML 语法**: 注意 YAML 的缩进必须使用空格，不能使用 Tab
3. **路径问题**: Remotion 的 staticFile() 可能需要特定配置，注意测试
4. **热重载**: 修改 YAML 文件后可能需要重启开发服务器才能生效
5. **错误信息**: 确保错误信息包含文件名和行号，便于调试

---

## Risk Mitigation

| 风险 | 缓解措施 | 责任人 |
|------|----------|--------|
| YAML 语法错误难以发现 | 使用在线 YAML 验证工具预检查 | 开发者 |
| 加载机制兼容性问题 | 提供构建时和运行时两种方式 | 开发者 |
| 数据不一致 | 详细的对比检查清单 | 开发者 |
| 性能影响 | 在构建时加载，运行时缓存 | 开发者 |

---

**准备好开始了吗？建议从 Phase 1, Task 1.1 开始：安装 YAML 解析依赖**
