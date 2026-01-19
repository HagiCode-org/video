# 移动端视频渲染优化 - 实施任务清单

**Change ID**: `mobile-video-rendering-optimization`
**Status**: ExecutionCompleted
**Created**: 2026-01-18
**Completed**: 2026-01-18

---

## 任务概览

本变更将 Docker 默认渲染组合从 `HagicodeUpdateBulletin` 切换为 `HagicodeReleaseNotesMobile`，输出移动端适配的竖屏格式视频（1080x1920 @ 60fps）。

---

## 阶段一：配置文件调整

### Task 1.1: 更新 config-loader.js 默认组合

**文件**: `scripts/config-loader.js`

**操作内容**:
1. 修改 `detectCompositionId` 函数
2. 将默认返回值从 `HagicodeUpdateBulletin` 改为 `HagicodeReleaseNotesMobile`
3. 保持现有的数据结构检测逻辑（`version` 和 `releaseDate` 字段）
4. 更新函数注释，说明新的默认行为

**验收标准**:
- [ ] `detectCompositionId` 函数默认返回 `HagicodeReleaseNotesMobile`
- [ ] 现有的组合覆盖逻辑（`options.composition`）保持不变
- [ ] 代码注释说明新的默认行为
- [ ] `npm run lint` 通过

**依赖**: 无

---

### Task 1.2: 验证移动端组合注册

**文件**: `src/Root.tsx`

**操作内容**:
1. 验证 `HagicodeReleaseNotesMobile` 组合已正确注册
2. 确认组合 ID 名称一致
3. 检查组合配置（分辨率、帧率）

**验收标准**:
- [ ] `HagicodeReleaseNotesMobile` 在 `Root.tsx` 中已注册
- [ ] 组合 ID 与 `config-loader.js` 中的名称一致
- [ ] 组合配置为 1080x1920 @ 60fps

**依赖**: 无

---

### Task 1.3: 验证数据结构兼容性

**文件**: `src/compositions/HagicodeReleaseNotesMobile.tsx`、`src/compositions/HagicodeUpdateBulletin.tsx`

**操作内容**:
1. 对比两个组件的数据结构（schema）
2. 验证 YAML 数据文件可被两个组件正确解析
3. 确认 `UpdateBulletinDataSchema` 适用于移动端组合

**验收标准**:
- [ ] 两个组件使用相同的数据结构（`UpdateBulletinData`）
- [ ] 现有 YAML 数据文件可被移动端组合正确解析
- [ ] 无需修改数据文件格式

**依赖**: 无

---

## 阶段二：本地渲染验证

### Task 2.1: 本地测试移动端渲染

**命令**:
```bash
node scripts/render-cli.js public/data/update-bulletin/maximum-data.yaml
```

**操作内容**:
1. 使用更新后的配置运行本地渲染
2. 验证默认使用 `HagicodeReleaseNotesMobile` 组合
3. 检查输出视频规格（1080x1920 @ 60fps）
4. 验证视频内容正确渲染

**验收标准**:
- [ ] 渲染成功，无错误
- [ ] 默认使用 `HagicodeReleaseNotesMobile` 组合
- [ ] 输出视频为 1080x1920 @ 60fps
- [ ] 所有场景正确显示

**依赖**: Task 1.1, Task 1.2

---

### Task 2.2: 测试桌面端组合覆盖

**命令**:
```bash
node scripts/render-cli.js --composition HagicodeUpdateBulletin
```

**操作内容**:
1. 使用 `--composition` 参数指定桌面端组合
2. 验证覆盖逻辑正常工作
3. 检查输出视频规格（1920x1080 @ 30fps）

**验收标准**:
- [ ] `--composition` 参数正确覆盖默认组合
- [ ] 输出视频为 1920x1080 @ 30fps
- [ ] 桌面端组合渲染正常

**依赖**: Task 1.1

---

### Task 2.3: 验证 FFmpeg 后处理

**操作内容**:
1. 运行完整渲染流程（包含 FFmpeg 后处理）
2. 验证 FFmpeg 拼接和背景音乐处理正常
3. 检查最终输出视频质量

**验收标准**:
- [ ] FFmpeg 后处理正常执行
- [ ] 最终输出视频包含所有处理效果
- [ ] 视频质量符合预期

**依赖**: Task 2.1

---

## 阶段三：Docker 容器测试

### Task 3.1: 构建 Docker 镜像

**命令**:
```bash
docker build -t hagicode-renderer:mobile-test .
```

**操作内容**:
1. 使用更新后的代码构建 Docker 镜像
2. 验证构建过程无错误
3. 检查镜像大小合理

**验收标准**:
- [ ] Docker 镜像构建成功
- [ ] 镜像大小与之前相当（±5%）
- [ ] 构建日志无错误或警告

**依赖**: Task 1.1

---

### Task 3.2: 测试 Docker 默认渲染

**命令**:
```bash
docker run --rm -v $(pwd)/output:/workspace/output hagicode-renderer:mobile-test
```

**操作内容**:
1. 运行 Docker 容器，使用默认配置
2. 验证默认使用 `HagicodeReleaseNotesMobile` 组合
3. 检查输出视频规格和内容

**验收标准**:
- [ ] 容器运行无错误
- [ ] 默认使用 `HagicodeReleaseNotesMobile` 组合
- [ ] 输出视频为 1080x1920 @ 60fps
- [ ] FFmpeg 后处理正常工作

**依赖**: Task 3.1

---

### Task 3.3: 测试 Docker 桌面端覆盖

**命令**:
```bash
docker run --rm -v $(pwd)/output:/workspace/output \
  hagicode-renderer:mobile-test \
  --composition HagicodeUpdateBulletin
```

**操作内容**:
1. 使用 Docker 容器运行桌面端组合
2. 验证参数覆盖在 Docker 中正常工作
3. 检查输出视频规格

**验收标准**:
- [ ] Docker 容器正确传递 `--composition` 参数
- [ ] 输出视频为 1920x1080 @ 30fps
- [ ] 桌面端组合在 Docker 中正常工作

**依赖**: Task 3.1

---

## 阶段四：平台验证

### Task 4.1: 移动端设备预览

**操作内容**:
1. 在移动设备或模拟器上预览视频
2. 验证竖屏格式显示正确
3. 检查文本清晰度和动画流畅度

**验收标准**:
- [ ] 在移动设备上播放流畅
- [ ] 竖屏格式完美适配
- [ ] 文本清晰可读
- [ ] 无黑边、裁剪或变形

**依赖**: Task 2.1

---

### Task 4.2: 平台上传预览

**操作内容**:
1. 在抖音、B站、小红书的上传预览中测试视频
2. 验证视频在各平台的显示效果
3. 检查平台兼容性问题

**验收标准**:
- [ ] 在抖音预览中显示正常
- [ ] 在 B 站预览中显示正常
- [ ] 在小红书预览中显示正常
- [ ] 无平台特定的兼容性问题

**依赖**: Task 4.1

---

### Task 4.3: 文档更新

**文件**: README.md 或相关文档

**操作内容**:
1. 更新文档说明默认渲染行为变更
2. 说明如何使用 `--composition` 参数切换桌面端
3. 更新使用示例

**验收标准**:
- [ ] 文档说明默认使用移动端组合
- [ ] 文档包含桌面端切换方法
- [ ] 使用示例准确无误

**依赖**: Task 3.2

---

## 可并行任务

以下任务可以并行执行，以加快实施进度：

- **并行组 A**: Task 1.1, Task 1.2, Task 1.3（配置调整和验证）
- **并行组 B**: Task 2.1, Task 2.2（本地渲染测试）

**关键路径**: Task 1.1 → Task 2.1 → Task 3.1 → Task 3.2 → Task 4.1 → Task 4.2

---

## 验收总结

完成所有任务后，应满足以下最终验收标准：

1. [ ] Docker 默认渲染使用 `HagicodeReleaseNotesMobile` 组合
2. [ ] 输出视频为 1080x1920 @ 60fps 格式
3. [ ] 所有场景正确显示，文本清晰可读
4. [ ] 支持 `--composition` 参数切换桌面端
5. [ ] FFmpeg 后处理正常工作
6. [ ] 在目标平台预览中显示正常
7. [ ] 文档已更新

---

## 风险和回退策略

**风险**:
- 现有桌面端工作流需要额外参数
- 数据结构可能存在微小差异

**回退策略**:
- 恢复 `detectCompositionId` 函数的默认返回值
- Docker 镜像可回退到之前版本
- 通过 `--composition HagicodeReleaseNotesMobile` 可临时使用移动端组合

---

## 技术细节参考

### 代码变更位置

**文件**: `scripts/config-loader.js`

**变更前**:
```javascript
function detectCompositionId(data) {
  // Check if data matches UpdateBulletin schema structure
  if (data.version && data.releaseDate) {
    return 'HagicodeUpdateBulletin';
  }

  // Default to HagicodeUpdateBulletin for now
  return 'HagicodeUpdateBulletin';
}
```

**变更后**:
```javascript
function detectCompositionId(data) {
  // Check if data matches UpdateBulletin schema structure
  if (data.version && data.releaseDate) {
    return 'HagicodeReleaseNotesMobile';  // Mobile-first default
  }

  // Default to mobile version for vertical video platforms
  return 'HagicodeReleaseNotesMobile';
}
```

### CLI 使用示例

```bash
# 默认：移动端渲染（1080x1920 @ 60fps）
docker run --rm -v $(pwd)/output:/workspace/output hagicode-renderer:latest

# 桌面端渲染（1920x1080 @ 30fps）
docker run --rm -v $(pwd)/output:/workspace/output \
  hagicode-renderer:latest \
  --composition HagicodeUpdateBulletin
```
