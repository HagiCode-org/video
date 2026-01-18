# Implementation Tasks

## 1. Docker Environment Setup

- [ ] 1.1 创建 `Dockerfile`
  - [ ] 基于 `node:20-bullseye` 官方镜像(兼容当前 Node.js 和 FFmpeg 版本)
  - [ ] 安装系统依赖:FFmpeg、fonts-common(中文字体支持)
  - [ ] 设置工作目录为 `/workspace`
  - [ ] 复制 `package.json` 和 `package-lock.json`
  - [ ] 运行 `npm ci` 安装项目依赖到镜像内
  - [ ] 复制项目源代码(注意:排除 out、.git)
  - [ ] 复制并配置 `docker_entrypoint.sh` 作为容器入口点
  - [ ] 设置 ENTRYPOINT 指向 `/usr/local/bin/docker_entrypoint.sh`
  - [ ] 验证 node_modules 已在镜像中构建完成
  - [ ] 验证 Remotion CLI 可用性(`npx remotion --version`)
  - [ ] 验证 FFmpeg 可用性(`ffmpeg -version`)

- [ ] 1.2 创建 `docker_entrypoint.sh`
  - [ ] 创建 bash 脚本作为容器入口点
  - [ ] 添加参数验证:无参数时显示帮助信息
  - [ ] 实现 `exec node /workspace/scripts/render-cli.js "$@"` 执行渲染
  - [ ] 添加清晰的错误提示和使用说明
  - [ ] 设置脚本可执行权限(`chmod +x`)
  - [ ] 测试入口点脚本功能

- [ ] 1.3 创建 `.dockerignore`
  - [ ] 排除 `out/`(渲染输出目录)
  - [ ] 排除 `.git/`
  - [ ] 排除 `.env`、`.env.local`(敏感文件)
  - [ ] 排除 `*.log`(日志文件)
  - [ ] 排除 `.DS_Store`、`Thumbs.db`(系统文件)
  - [ ] 排除 `openspec/`(开发文档,非运行时需要)
  - [ ] 注意:不排除 node_modules,因为需要在镜像内构建

- [ ] 1.4 创建 `docker-compose.yml`(可选)
  - [ ] 定义服务名称:`renderer`
  - [ ] 配置卷挂载:`./:/workspace`
  - [ ] 配置环境变量(如需要)
  - [ ] 添加 `--cpus` 和 `--memory` 资源限制示例(注释状态)
  - [ ] 提供一键运行命令:`docker-compose run renderer npm start` 或类似

- [ ] 1.5 测试镜像构建
  - [ ] 构建镜像:`docker build -t hagicode-renderer:latest .`
  - [ ] 验证镜像大小(预期 < 1.5GB)
  - [ ] 验证 node_modules 在镜像中:`docker run --rm hagicode-renderer:latest ls -la /workspace/node_modules`
  - [ ] 测试镜像启动:`docker run --rm hagicode-renderer:latest node --version`
  - [ ] 测试 FFmpeg 可用性:`docker run --rm hagicode-renderer:latest ffmpeg -version`
  - [ ] 测试 ENTRYPOINT: `docker run --rm hagicode-renderer:latest` (应显示帮助信息)
  - [ ] 测试简化命令: `docker run --rm -v "${PWD}:/workspace" hagicode-renderer:latest data.yaml`

## 2. Script Updates for Docker-Only Rendering

- [ ] 2.1 更新 `render.sh`
  - [ ] 添加 Docker 可用性检测:`docker --version`
  - [ ] 检查镜像是否存在:`docker image inspect hagicode-renderer:latest`
  - [ ] 如果镜像不存在,自动构建:`docker build -t hagicode-renderer:latest .`
  - [ ] 构建容器运行命令(使用 ENTRYPOINT 简化):
    ```
    docker run --rm \
      -v "${PWD}:/workspace" \
      hagicode-renderer:latest \
      "$@"
    ```
  - [ ] 注意:无需指定 `-w /workspace`,入口点脚本已处理
  - [ ] 添加 Docker 构建进度提示
  - [ ] 移除本地 Node.js 直接调用逻辑

- [ ] 2.2 更新 `render.bat`
  - [ ] 添加 Docker 可用性检测:`docker --version`
  - [ ] 检查镜像是否存在:`docker image inspect hagicode-renderer:latest`
  - [ ] 如果镜像不存在,自动构建:`docker build -t hagicode-renderer:latest .`
  - [ ] 构建容器运行命令(Windows PowerShell 兼容,使用 ENTRYPOINT):
    ```
    docker run --rm ^
      -v "%CD%:/workspace" ^
      hagicode-renderer:latest ^
      %*
    ```
  - [ ] 处理 Windows 路径转义和卷挂载兼容性
  - [ ] 移除本地 Node.js 直接调用逻辑

- [ ] 2.3 错误处理和用户提示
  - [ ] Docker 未安装时提供清晰的错误信息和安装指引
  - [ ] Docker 未运行时提示用户启动 Docker Desktop/daemon
  - [ ] 镜像构建失败时显示详细错误日志
  - [ ] 卷挂载失败时提示权限问题解决方案
  - [ ] 添加 `--verbose` 模式下的详细 Docker 命令输出
  - [ ] 说明所有 FFmpeg 处理在容器内完成

## 3. Documentation

- [ ] 3.1 创建 `README-DOCKER.md`
  - [ ] 添加 Docker 前置条件说明(Docker 版本要求)
  - [ ] 提供快速开始指南:
    - [ ] 构建镜像命令
    - [ ] 运行渲染命令(通过脚本)
    - [ ] 直接使用 `docker run` 的简化示例(通过 ENTRYPOINT)
    - [ ] 对比完整命令 vs 简化命令
  - [ ] 说明镜像包含预构建的 node_modules,容器启动即用
  - [ ] 说明所有 FFmpeg 处理在容器内完成
  - [ ] 说明 docker_entrypoint.sh 的作用和优势
  - [ ] 说明卷挂载和输出文件位置
  - [ ] 添加故障排查章节:
    - [ ] Docker 未运行/未安装
    - [ ] Windows WSL2 配置问题
    - [ ] 权限问题(Linux/macOS)
    - [ ] 镜像构建失败常见原因
  - [ ] 性能优化建议:
    - [ ] 资源限制示例(`--cpus`、`--memory`)
    - [ ] 并行渲染示例
    - [ ] 镜像缓存优化

- [ ] 3.2 更新主 README.md(如果存在)
  - [ ] 在"快速开始"或"安装"章节添加 Docker 方式说明
  - [ ] 添加 Docker 使用示例
  - [ ] 链接到 `README-DOCKER.md` 获取详细文档

- [ ] 3.3 添加使用示例到脚本帮助输出
  - [ ] 在 `render-cli.js` 的 `--help` 输出中添加 Docker 示例
  - [ ] 说明渲染在 Docker 容器内完成

## 4. Testing

- [ ] 4.1 Docker 渲染流程测试
  - [ ] 首次构建测试:
    - [ ] 运行 `./render.sh data.yaml --output out/test.mp4`
    - [ ] 验证镜像自动构建
    - [ ] 验证渲染成功
  - [ ] 后续运行测试(镜像已存在):
    - [ ] 再次运行相同命令
    - [ ] 验证跳过构建,直接使用现有镜像
    - [ ] 验证容器启动速度(应 < 2 秒)
  - [ ] 验证 node_modules 预构建:
    - [ ] 检查镜像中 node_modules 存在
    - [ ] 确认容器内无需重新安装依赖
  - [ ] 验证 FFmpeg 容器内处理:
    - [ ] 确认所有后处理在容器内完成
    - [ ] 验证输出文件完整性和质量

- [ ] 4.2 跨平台测试
  - [ ] Windows + Docker Desktop(WSL2 后端)
  - [ ] Linux + Docker Engine
  - [ ] macOS + Docker Desktop

- [ ] 4.3 边界情况测试
  - [ ] Docker 未安装时的错误提示
  - [ ] Docker 未运行时的错误提示
  - [ ] 卷挂载失败场景(权限问题)
  - [ ] 镜像构建失败场景(网络问题、依赖冲突)
  - [ ] 并行渲染测试(同时运行多个容器)
  - [ ] 资源限制测试(使用 `--cpus`、`--memory`)

- [ ] 4.4 性能基准测试
  - [ ] 测量首次镜像构建时间
  - [ ] 测量容器启动开销(应 < 2 秒)
  - [ ] 测量 Docker 渲染时间(3 次平均)
  - [ ] 分析性能特征并文档化

## 5. Optional Enhancements

- [ ] 5.1 多阶段构建优化(可选)
  - [ ] 使用多阶段构建分离构建时和运行时依赖
  - [ ] 减小最终镜像体积

- [ ] 5.2 CI/CD 集成示例(可选)
  - [ ] 创建 `.github/workflows/docker-render.yml` 示例
  - [ ] 演示如何在 GitHub Actions 中使用 Docker 渲染

- [ ] 5.3 预构建镜像发布(可选)
  - [ ] 配置 Docker Hub 或 GitHub Container Registry
  - [ ] 自动构建和推送镜像
  - [ ] 用户可直接拉取镜像,跳过本地构建

- [ ] 5.4 健康检查和监控(可选)
  - [ ] 添加 HEALTCHECK 指令到 Dockerfile
  - [ ] 提供容器资源使用监控命令示例

## 6. Validation

- [ ] 6.1 OpenSpec 验证
  - [ ] 运行 `openspec validate docker-containerized-remotion-rendering-environment --strict`
  - [ ] 修复所有验证错误和警告

- [ ] 6.2 代码审查准备
  - [ ] 确保所有任务已完成
  - [ ] 更新 tasks.md,将所有任务标记为 `[x]`
  - [ ] 确认文档完整且清晰
  - [ ] 准备演示命令和测试结果
