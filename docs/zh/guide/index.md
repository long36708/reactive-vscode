---
outline: [2,3]
---

# 快速开始

Reactive VSCode 是一个帮助您使用 [Vue 的 Reactivity API](https://vuejs.org/api/reactivity-core.html) 开发 Visual Studio Code 扩展的库。我们假设您已经熟悉 [Vue 的 Reactivity API](https://vuejs.org/guide/essentials/reactivity-fundamentals.html) 的基本思想。

阅读 [为什么选择 reactive-vscode](./why.md) 了解有关为什么创建 <ReactiveVscode /> 的更多信息。

## 创建新项目

::: code-group

```bash [pnpm]
pnpm create reactive-vscode
```

```bash [npm]
npm init reactive-vscode@latest
```

```bash [yarn]
yarn create reactive-vscode
```

:::

或者您可以通过安装 `reactive-vscode` 包将其添加到现有项目中。

## 包导出

该包导出以下内容：

- 实用函数和类型，如 `reactive::defineExtension`
- 作为 composables 的 VSCode API 包装器，如 `reactive::useActiveTextEditor`
- 来自 `npm::@vue/reactivity` 的所有导出，如 `vue::ref(https://vuejs.org/api/reactivity-core.html#ref)`
- 来自 `npm::@vue/runtime-core` 的对 VSCode 扩展有用的导出，如 `vue::watchEffect(https://vuejs.org/api/reactivity-core.html#watcheffect)`

您可以在此处找到所有已实现的 composable [函数列表](../functions/index.md)。它们将在未来被记录。

## 扩展基础

### 扩展清单 <NonProprietary />

每个 VS Code 扩展都必须有一个 `package.json` 作为其 [扩展清单](https://code.visualstudio.com/api/get-started/extension-anatomy#extension-manifest)。请访问 [官方文档](https://code.visualstudio.com/api/get-started/extension-anatomy#extension-manifest) 获取更多信息。

### 扩展入口文件

通常，[扩展入口文件](https://code.visualstudio.com/api/get-started/extension-anatomy#extension-entry-file) 是 `src/extension.ts`。您可以使用 `reactive::defineExtension` 函数来定义您的扩展：

```ts
import { defineExtension } from 'reactive-vscode'

export = defineExtension(() => {
  // 在此处设置您的扩展
})
```

我们将在 [下一节](./extension.md) 中介绍如何编写扩展的主体。

## 开发扩展

1. 打开一个新终端并运行以下命令：

::: code-group

```bash [pnpm]
pnpm dev
```

```bash [npm]
npm run dev
```

```bash [yarn]
yarn dev
```

:::

2. <NonProprietary /> 在编辑器内，按 <kbd>F5</kbd> 或从命令面板 (<kbd>Ctrl+Shift+P</kbd>) 运行命令 **Debug: Start Debugging**。这将在一个新窗口中运行扩展。

> 访问 [VSCode 文档](https://code.visualstudio.com/api/get-started/your-first-extension#debugging-the-extension) 获取有关调试扩展的更多信息。

<div h-4 />

---

::: info [Twoslash](https://twoslash.netlify.app/) 驱动的文档！

您可以将鼠标悬停在代码块中的标记上以检查它们的类型。这对于文档中未涵盖的细节特别有用。

:::
