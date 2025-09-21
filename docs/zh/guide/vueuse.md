# VueUse 集成

<ReactiveVscode /> 为 VSCode 扩展开发提供了可选的 [VueUse](https://vueuse.org/) 集成。

此包包含与 Node.js 环境兼容的 VueUse 函数子集。这意味着依赖浏览器环境的函数已被移除。

此外，此包使用来自 `npm::@reactive-vscode/reactivity` 的 Vue reactivity API，而不是 `npm::vue-demi` 包。这意味着依赖 Vue 渲染 API 的函数已被移除。

## 用法

::: code-group

```bash [pnpm]
pnpm install -D @reactive-vscode/vueuse
```

```bash [npm]
npm install -D @reactive-vscode/vueuse
```

```bash [yarn]
yarn add -D @reactive-vscode/vueuse
```

:::

```ts
import { useIntervalFn } from '@reactive-vscode/vueuse'
import { defineExtension } from 'reactive-vscode'

export = defineExtension(() => {
  useIntervalFn(() => {
    console.log('Hello World')
  }, 1000)
})
```

## 可用函数

每个与 Node.js 环境兼容且不需要 Vue 渲染 API 的 VueUse 函数都在此包中可用。查看 [`packages/vueuse/src/index.ts`](https://github.com/kermanx/reactive-vscode/blob/main/packages/vueuse/src/index.ts) 获取完整列表。
