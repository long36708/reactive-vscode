# 自定义上下文

VSCode 的 [when 子句上下文](https://code.visualstudio.com/api/references/when-clause-contexts) 可用于有选择地启用或禁用扩展命令和 UI 元素，如菜单和视图。<ReactiveVscode /> 提供 `reactive::useVscodeContext` 以响应式方式定义自定义上下文。

<!-- eslint-skip -->

```ts
import { computed, defineExtension, ref, useVscodeContext } from 'reactive-vscode'

export = defineExtension(() => {
  const contextA = useVscodeContext('demo.fromValue', true) // [!code highlight]
  const contextB = useVscodeContext('demo.fromRef', contextA) // [!code highlight]
  const contextC = useVscodeContext('demo.fromGetter', () => !contextA.value) // [!code highlight]
})
```

请注意，`contextA` 和 `contextB` 是 `ref`，这意味着您可以稍后设置它们，上下文将相应地更新。`contextC` 是一个 `computed` 值，这意味着当 `contextA` 更改时它将自动更新。

有关 `when` 子句上下文的更多信息，请参阅[官方文档](https://code.visualstudio.com/api/references/when-clause-contexts)。
