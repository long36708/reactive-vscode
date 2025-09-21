# 可释放资源

尽管 <ReactiveVscode /> 涵盖了大部分 VSCode API，但有时您仍然需要使用 `vscode::Disposable`，这在 [VSCode API 模式](https://code.visualstudio.com/api/references/vscode-api#disposables) 中也有描述。

`reactive::useDisposable` 接受一个可释放对象，并在当前效果作用域被释放时自动释放它（例如，当扩展被停用时，如果 `vscode::useDisposable` 在扩展的设置函数中调用）。`reactive::useDisposable` 按原样返回可释放对象本身。

```ts
import type { TextDocument } from 'vscode'
import { defineExtension, useDisposable } from 'reactive-vscode'
import { languages } from 'vscode'

export = defineExtension(() => {
  useDisposable(languages.registerFoldingRangeProvider(
    { language: 'markdown' },
    {
      provideFoldingRanges(document: TextDocument) {
        return []
      },
    },
  ))
})
```

请注意，对于任何 <ReactiveVscode /> 函数创建的可释放资源，您不需要使用 `reactive::useDisposable`。它们在当前效果作用域被释放时会自动释放。
