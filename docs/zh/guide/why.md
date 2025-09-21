---
outline: 'deep'
---

# 为什么选择 <ReactiveVscode />

VSCode 扩展是增强开发体验的强大工具。但是开发 VSCode 扩展并不容易。创建这个库是为了帮助您使用 Vue 的响应式系统开发 VSCode 扩展。

## 问题所在

开发 VSCode 扩展并不容易。官方 API 相当原始，存在几个问题：

### 难以监听状态

官方 API 是基于事件的，这意味着您必须监听事件来观察状态。这会产生大量冗余代码，并且对 Vue 开发人员来说不熟悉。

### 可释放资源

可释放资源在 VSCode 扩展中无处不在。您必须将它们全部存储在 `vscode::ExtensionContext.subscriptions` 中，或者手动释放它们。

### 何时初始化

VSCode 扩展中的视图是延迟创建的。如果您想访问视图实例，必须存储它，甚至监听视图创建时触发的事件。

### 想要使用 Vue

Vue 的响应式系统非常强大。使用 Vue 的响应式系统监听状态和更新视图要容易得多。但是 VSCode API 并不是为与 Vue 一起工作而设计的。

## 解决方案

[Vue 的 Reactivity API](https://vuejs.org/api/reactivity-core.html) 就是您所需要的。该库将大部分 VSCode API 包装成 [Vue Composables](https://vuejs.org/guide/reusability/composables.html)。您可以像使用 Vue Reactivity API 一样使用它们，这对 Vue 开发人员来说很熟悉。

在这个库的帮助下，您可以像开发 Vue 3 Web 应用程序一样开发 VSCode 扩展。您可以使用 Vue 的响应式系统来监听状态，并将视图实现为 Vue composables。

### 结果

以下示例展示了这个库如何帮助您开发 VSCode 扩展。以下扩展根据配置装饰活动文本编辑器。

::: code-group

<<< ../../examples/editor-decoration/1.ts [<ReactiveVscode2 />]

<<< ../../examples/editor-decoration/2.ts [原始 VSCode API]

:::

如您所见，使用 <ReactiveVscode /> 后，代码更加清晰易懂。通过使用本库提供的 `reactive::useActiveTextEditor` 等 composables，您可以在开发 VSCode 扩展时流畅地使用 Vue 的响应式 API，如 `vue::watchEffect(https://vuejs.org/api/reactivity-core.html#watcheffect)`。

更多示例 [在此处](../examples/){target="_blank"}。

## 常见问题

### 没有 DOM 和组件的 Vue？

这个库构建在 `npm::@vue/reactivity` 之上，并从 `npm::@vue/runtime-core` 移植了一些代码（参见 [./packages/reactivity 目录](https://github.com/kermanx/reactive-vscode/tree/main/packages/reactivity)）。

使用此库构建的最小扩展大小约为 12KB。

### 在 Webview 中使用 Vue？

这个库**不是**为在 webview 中使用 Vue 而设计的。如果您想在 webview 中使用 Vue，可以使用 Vue 的 CDN 版本或像 `npm::@tomjs/vite-plugin-vscode` 这样的 bundler 插件。
