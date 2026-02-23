# 移动端渲染配置规范

## Purpose

定义 Hagicode 项目的移动端优先渲染配置规范，将 Docker 默认渲染组合从 `HagicodeUpdateBulletin` 切换为 `HagicodeReleaseNotesMobile`，输出移动端适配的竖屏格式视频（1080x1920 @ 60fps）。

---

## Requirements

### Requirement: 移动端默认渲染组合

`scripts/config-loader.js` 中的 `detectCompositionId` 函数 SHALL 默认返回 `HagicodeReleaseNotesMobile` 组合。

#### Scenario: 默认组合为移动端

- **GIVEN** `config-loader.js` 已加载
- **WHEN** 调用 `detectCompositionId(data)` 函数且未提供组合覆盖
- **THEN** 函数 SHALL 返回 `HagicodeReleaseNotesMobile`
- **AND** 输出分辨率 SHALL 为 1080x1920
- **AND** 帧率 SHALL 为 60fps

#### Scenario: 数据结构匹配时返回移动端组合

- **GIVEN** 数据包含 `version` 和 `releaseDate` 字段
- **WHEN** 调用 `detectCompositionId(data)` 函数
- **THEN** 函数 SHALL 返回 `HagicodeReleaseNotesMobile`
- **AND** 非 `HagicodeUpdateBulletin`

---

### Requirement: 桌面端组合参数覆盖

系统 SHALL 支持通过 `--composition` 参数覆盖默认组合，以保持桌面端渲染能力。

#### Scenario: CLI 参数覆盖默认组合

- **GIVEN** Docker 容器或 CLI 正在运行
- **WHEN** 提供 `--composition HagicodeUpdateBulletin` 参数
- **THEN** 系统 SHALL 使用 `HagicodeUpdateBulletin` 组合
- **AND** 输出分辨率 SHALL 为 1920x1080
- **AND** 帧率 SHALL 为 30fps

#### Scenario: config-loader 正确处理组合覆盖

- **GIVEN** `options.composition` 参数已提供
- **WHEN** 调用 `loadConfigFile(dataFilePath, options)` 函数
- **THEN** 系统 SHALL 使用 `options.composition` 值
- **AND** SHALL 忽略 `detectCompositionId` 的返回值

---

### Requirement: 移动端组合正确注册

`HagicodeReleaseNotesMobile` 组合 SHALL 在 `Root.tsx` 中正确注册。

#### Scenario: 组合已注册

- **GIVEN** `Root.tsx` 导出所有 Remotion 组合
- **WHEN** 查看组合列表
- **THEN** `HagicodeReleaseNotesMobile` SHALL 已注册
- **AND** 组合 ID SHALL 与 `config-loader.js` 中的名称一致

#### Scenario: 移动端组合配置正确

- **GIVEN** `HagicodeReleaseNotesMobile` 组合已注册
- **WHEN** 检查组合配置
- **THEN** 分辨率 SHALL 为 1080x1920（竖屏）
- **AND** 帧率 SHALL 为 60fps

---

### Requirement: 数据结构兼容性

`HagicodeReleaseNotesMobile` 和 `HagicodeUpdateBulletin` SHALL 使用相同的数据结构。

#### Scenario: 两个组件使用相同 schema

- **GIVEN** 两个组合组件已导出
- **WHEN** 查看组件的数据类型
- **THEN** 两者 SHALL 使用 `UpdateBulletinData` 类型
- **AND** 两者 SHALL 使用 `UpdateBulletinDataSchema` 验证

#### Scenario: YAML 数据文件兼容

- **GIVEN** 现有的 YAML 数据文件（如 `maximum-data.yaml`）
- **WHEN** 使用 `HagicodeReleaseNotesMobile` 组合渲染
- **THEN** 数据 SHALL 被正确解析
- **AND** 无需修改数据文件格式

---

### Requirement: 移动端视频输出规格

使用 `HagicodeReleaseNotesMobile` 组合渲染的视频 SHALL 符合移动端平台规范。

#### Scenario: 输出分辨率为竖屏格式

- **GIVEN** 渲染使用 `HagicodeReleaseNotesMobile` 组合
- **WHEN** 渲染完成
- **THEN** 输出视频 SHALL 为 1080x1920 分辨率
- **AND** 宽高比 SHALL 为 9:16（竖屏）

#### Scenario: 输出帧率为 60fps

- **GIVEN** 渲染使用 `HagicodeReleaseNotesMobile` 组合
- **WHEN** 渲染完成
- **THEN** 输出视频 SHALL 为 60fps 帧率
- **AND** 动画 SHALL 流畅播放

---

### Requirement: FFmpeg 后处理兼容

移动端视频 SHALL 正常通过 FFmpeg 后处理流程。

#### Scenario: FFmpeg 后处理正常工作

- **GIVEN** 移动端视频已渲染完成
- **WHEN** 执行 FFmpeg 后处理（未使用 `--skip-audio`）
- **THEN** 后处理 SHALL 成功完成
- **AND** 输出 SHALL 包含所有处理效果

#### Scenario: 后处理参数兼容移动端

- **GIVEN** 移动端视频（1080x1920 @ 60fps）
- **WHEN** 执行 FFmpeg 拼接和背景音乐处理
- **THEN** FFmpeg SHALL 正确处理竖屏视频
- **AND** 输出 SHALL 保持原始分辨率和帧率

---

### Requirement: config-loader.js 默认行为

`scripts/config-loader.js` 文件中的 `detectCompositionId` 函数 SHALL 默认返回 `HagicodeReleaseNotesMobile`。

#### Scenario: 函数默认值已更新

- **GIVEN** `scripts/config-loader.js` 文件存在
- **WHEN** 读取 `detectCompositionId` 函数
- **THEN** 默认返回值 SHALL 为 `HagicodeReleaseNotesMobile`
- **AND** 非 `HagicodeUpdateBulletin`

#### Scenario: 函数注释已更新

- **GIVEN** `detectCompositionId` 函数已更新
- **WHEN** 读取函数注释
- **THEN** 注释 SHALL 说明移动端优先策略
- **AND** 注释 SHALL 提及默认输出规格

---

## Related Specs

此规范与以下现有规范相关：
- `external-rendering`: 定义了 YAML 配置解析、CLI 渲染逻辑和组合覆盖机制
- `hagicode-update-bulletin`: 定义了数据结构和验证逻辑，两个组件使用相同的 schema

---

## Cross-References

- **修改文件**: `scripts/config-loader.js`
- **移动端组合**: `src/compositions/HagicodeReleaseNotesMobile.tsx`
- **桌面端组合**: `src/compositions/HagicodeUpdateBulletin.tsx`
- **组合注册**: `src/Root.tsx`
- **渲染脚本**: `scripts/render-cli.js`
- **相关规范**: `external-rendering`、`hagicode-update-bulletin`
