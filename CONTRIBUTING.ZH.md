# 贡献指南

很高兴听到你有兴趣为这个项目做贡献！非常感谢！

## 本地环境设置

本项目使用 [`pnpm`](https://pnpm.io/) 来管理依赖，如果你还没有安装，请通过以下命令安装：

```bash
npm i -g pnpm
```

将代码库克隆到本地并安装依赖：

```bash
pnpm install
```

## 开发

首先，运行 `pnpm metadata:dev` 来为开发环境生成元数据。

要启动演示扩展，运行：

```bash
pnpm dev
```

然后按 `F5` 启动扩展。

要开发文档，运行：

```bash
pnpm docs:dev
```

要运行测试，运行：

```bash
pnpm test
```

## 项目结构

### 单体仓库

我们使用单体仓库来管理多个包。

```
demo/                 - 演示扩展
docs/                 - 文档网站
packages/
  core/               - 核心包（主包）
  metadata/           - 元数据生成器和元数据
  mock/               - VS Code API 模拟
  reactivity/         - 响应式系统
  vueuse/             - VueUse 集成
  creator/            - 扩展创建工具
test/                 - 测试
```

## 代码风格

只要你安装了开发依赖，就不需要担心代码风格问题。Git 钩子会在提交时为你格式化和修复代码。如果自动修复的 CI 仍然失败，请运行：

```bash
pnpm lint --fix
```

## 提交信息规范

我们遵循约定式提交（Conventional Commits）规范：

- `feat:` - 新功能
- `fix:` - 修复 bug
- `docs:` - 文档更新
- `style:` - 代码格式调整（不影响功能）
- `refactor:` - 代码重构
- `test:` - 测试相关
- `chore:` - 构建过程或辅助工具的变动

## 问题报告

如果你发现了一个 bug 或者有功能建议：

1. 首先检查是否已经有相关的问题报告
2. 如果没有，请创建一个新的 issue
3. 提供清晰的问题描述、复现步骤和期望的行为

## 拉取请求

1. Fork 这个仓库
2. 创建一个新的分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 感谢

再次感谢你对这个项目的兴趣！你太棒了！
