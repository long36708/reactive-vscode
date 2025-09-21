# reactive-vscode

[![npm 版本][npm-version-src]][npm-version-href]
[![npm 下载量][npm-downloads-src]][npm-downloads-href]
[![许可证][license-src]][license-href]

<img src="./docs/public/header.png" width="60%" />

**使用 Vue 响应式 API 开发 VS Code 扩展**

- [**文档**](https://kermanx.com/reactive-vscode/)
- [**为什么选择 reactive-vscode**](https://kermanx.com/reactive-vscode/guide/why)
- [**所有函数**](https://kermanx.com/reactive-vscode/functions/)
- [**示例**](https://kermanx.com/reactive-vscode/examples/)

## 项目状态

目前，大部分 VS Code API 都已覆盖，该项目已被以下项目使用：

- [Vue - 官方 <sub><sub>![下载量](https://img.shields.io/visual-studio-marketplace/d/Vue.volar.svg)</sub></sub>](https://github.com/vuejs/language-tools)
- [Slidev for VSCode <sub><sub>![下载量](https://img.shields.io/visual-studio-marketplace/d/antfu.slidev.svg)</sub></sub>](https://github.com/slidevjs/slidev/tree/main/packages/vscode)
- [Iconify IntelliSense <sub><sub>![下载量](https://img.shields.io/visual-studio-marketplace/d/antfu.iconify.svg)</sub></sub>](https://github.com/antfu/vscode-iconify)

[文档](https://kermanx.com/reactive-vscode/) 已完善，[VueUse 集成](https://kermanx.com/reactive-vscode/guide/vueuse.html) 也已可用。

不过项目仍处于 0.x 版本，可能会有较小的 API 变更。如果遇到任何问题，请随时 [提交 issue](https://github.com/kermanx/reactive-vscode/issues/new)。

## 计数器示例

```ts
import { defineExtension, ref, useCommands, useStatusBarItem } from 'reactive-vscode'
import { StatusBarAlignment } from 'vscode'

export = defineExtension(() => {
  const counter = ref(0)

  useStatusBarItem({
    alignment: StatusBarAlignment.Right,
    priority: 100,
    text: () => `Hello ${counter.value}`,
  })

  useCommands({
    'extension.sayHello': () => counter.value++,
    'extension.sayGoodbye': () => counter.value--,
  })
})
```

<details>
<summary> 使用原生 VS Code API 的实现 </summary>

```ts
import type { ExtensionContext } from 'vscode'
import { commands, StatusBarAlignment, window } from 'vscode'

export function activate(extensionContext: ExtensionContext) {
  let counter = 0

  const item = window.createStatusBarItem(StatusBarAlignment.Right, 100)

  function updateStatusBar() {
    item.text = `Hello ${counter}`
    item.show()
  }

  updateStatusBar()

  extensionContext.subscriptions.push(
    commands.registerCommand('extension.sayHello', () => {
      counter++
      updateStatusBar()
    }),
    commands.registerCommand('extension.sayGoodbye', () => {
      counter--
      updateStatusBar()
    }),
  )
}
```

</details>

[更多示例](https://kermanx.com/reactive-vscode/examples/)。

## 快速开始

### 安装

```bash
npm install reactive-vscode
# 或
pnpm add reactive-vscode
# 或
yarn add reactive-vscode
```

### 基本使用

```ts
// extension.ts
import { defineExtension, ref, useCommands, useStatusBarItem } from 'reactive-vscode'
import { StatusBarAlignment } from 'vscode'

export = defineExtension(() => {
  const count = ref(0)

  // 创建状态栏项
  useStatusBarItem({
    alignment: StatusBarAlignment.Right,
    priority: 100,
    text: () => `计数: ${count.value}`,
  })

  // 注册命令
  useCommands({
    'extension.increment': () => count.value++,
    'extension.decrement': () => count.value--,
    'extension.reset': () => count.value = 0,
  })
})
```

## 核心功能

### 响应式 API

`reactive-vscode` 提供了完整的 Vue 响应式系统，包括：

- `ref` - 创建响应式引用
- `computed` - 创建计算属性
- `watch` / `watchEffect` - 监听响应式变化
- `reactive` - 创建响应式对象

### 组合式函数

提供了丰富的组合式函数来简化 VS Code 扩展开发：

- `useCommands` - 注册多个命令
- `useStatusBarItem` - 创建状态栏项
- `useTreeView` - 创建树视图
- `useWebviewView` - 创建 Webview 视图
- `useTextEditorSelections` - 响应式文本编辑器选择
- `useConfiguration` - 响应式配置管理
- 以及更多...

### 生命周期管理

- `defineExtension` - 定义扩展入口点
- `onActivate` - 扩展激活时的回调
- `onDeactivate` - 扩展停用时的回调

## 项目结构

```
reactive-vscode/
├── packages/
│   ├── core/          # 核心库
│   ├── reactivity/    # 响应式系统
│   ├── mock/         # VS Code API 模拟
│   ├── vueuse/       # VueUse 集成
│   └── creator/      # 扩展创建工具
├── demo/             # 示例项目
├── docs/             # 文档网站
└── test/             # 测试
```

## 开发脚本

```bash
# 开发模式
pnpm dev

# 构建核心库
pnpm core:build

# 运行测试
pnpm test

# 类型检查
pnpm typecheck

# 发布新版本
pnpm release
```

## 许可证

[MIT](./LICENSE) 许可证 © 2024-现在 [_Kerman](https://github.com/kermanx)

[`./packages/reactivity` 目录](https://github.com/kermanx/reactive-vscode/blob/main/packages/reactivity) 中的源代码移植自 [`@vue/runtime-core`](https://github.com/vuejs/core/blob/main/packages/runtime-core)。根据 [MIT 许可证](https://github.com/vueuse/vueuse/blob/main/LICENSE) 授权。

[`./packages/mock` 目录](https://github.com/kermanx/reactive-vscode/blob/main/packages/core/src/mock) 中的源代码参考了 [`VSCode`](https://github.com/microsoft/vscode) 的实现。根据 [MIT 许可证](https://github.com/microsoft/vscode/blob/main/LICENSE.txt) 授权。

Logo <img src="https://kermanx.com/reactive-vscode/logo.svg" width="14"> 修改自 [Vue Reactivity Artworks](https://github.com/vue-reactivity/art)。根据 [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/) 授权。

文档网站的部分内容移植自 [VueUse](https://github.com/vueuse/vueuse)。根据 [MIT 许可证](https://github.com/vueuse/vueuse/blob/main/LICENSE) 授权。

<!-- 徽章 -->

[npm-version-src]: https://img.shields.io/npm/v/reactive-vscode?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/reactive-vscode
[npm-downloads-src]: https://img.shields.io/npm/dm/reactive-vscode?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/reactive-vscode
[bundle-src]: https://img.shields.io/bundlephobia/minzip/reactive-vscode?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=reactive-vscode
[license-src]: https://img.shields.io/github/license/kermanx/reactive-vscode.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/kermanx/reactive-vscode/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/reactive-vscode
