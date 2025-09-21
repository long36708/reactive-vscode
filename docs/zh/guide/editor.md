# 编辑器与文档

## 文档

`reactive::useDocumentText` composable 可用于获取文档的文本。

```ts
import type { ExtensionContext } from 'vscode'

import { computed, defineExtension, ref, useActiveTextEditor, useDocumentText, watchEffect } from 'reactive-vscode'

export = defineExtension(() => {
  const editor = useActiveTextEditor()
  const text = useDocumentText(() => editor.value?.document)

  // 响应式，可能从其他地方设置
  const name = ref('John Doe')

  watchEffect(() => {
    text.value = `Hello, ${name.value}!` // [!code highlight]
  })
})
```

## 编辑器装饰

`reactive::useEditorDecorations` composable 可用于向编辑器添加装饰。

```ts {5-9}
import { defineExtension, useActiveTextEditor, useEditorDecorations } from 'reactive-vscode'

export = defineExtension(() => {
  const editor = useActiveTextEditor()
  useEditorDecorations(
    editor,
    { backgroundColor: 'red' }, // 或创建的装饰类型
    () => [/* 动态计算的范围 */] // 或 Ref/Computed
  )
})
```

更多信息请参见 `vscode::TextEditor.setDecorations`。要创建装饰类型，请使用 `vscode::window.createTextEditorDecorationType`。

## 编辑器选择

以下 4 个 composables 可用于**获取和设置**编辑器的选择。

- `reactive::useTextEditorSelections` - 文本编辑器中的所有选择。
- `reactive::useTextEditorSelection` - 文本编辑器中的主要选择。
- `reactive::useNotebookEditorSelections` - 笔记本编辑器中的所有选择。
- `reactive::useNotebookEditorSelection` - 笔记本编辑器中的主要选择。

更多信息请参见它们的文档。请注意，`reactive::useTextEditorSelections` 和 `reactive::useTextEditorSelection` 还支持 `acceptKind` 选项来过滤触发此事件的更改类型（参见 `vscode::TextEditorSelectionChangeKind`）。

## 编辑器视口

以下 3 个 composables 可用于**获取**编辑器的视口信息。

- `reactive::useTextEditorViewColumn` - 文本编辑器的视图列。
- `reactive::useTextEditorVisibleRanges` - 文本编辑器的可见范围。
- `reactive::useNotebookEditorVisibleRanges` - 笔记本编辑器的可见范围。

更多信息请参见它们的文档。
