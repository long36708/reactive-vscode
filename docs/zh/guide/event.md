# 事件

尽管 <ReactiveVscode /> 涵盖了大部分 VSCode API，但有时您仍然需要创建或监听原始的 [VSCode 事件](https://code.visualstudio.com/api/references/vscode-api#events)。

`reactive::useEvent` 将原始事件转换为自动释放的事件：

```ts
import { defineExtension, useEvent } from 'reactive-vscode'
import { workspace } from 'vscode'

const onDidCreateFiles = useEvent(workspace.onDidCreateFiles)

export = defineExtension(() => {
  // 无需释放事件
  onDidCreateFiles((e) => {
    console.log('文件已创建:', e.files)
  })
})
```

`reactive::useEventEmitter` 创建一个友好的事件发射器，它仍然扩展 `vscode::EventEmitter`：

<!-- eslint-disable import/first -->
```ts
import type { Event } from 'vscode'

declare function someVscodeApi(options: { onSomeEvent: Event<string> }): void
// ---cut---
import { defineExtension, useEventEmitter } from 'reactive-vscode'

export = defineExtension(() => {
  const myEvent = useEventEmitter<string>([/* 可选的监听器 */])

  myEvent.addListener((msg) => {
    console.log(`收到消息: ${msg}`)
  })

  myEvent.fire('Hello, World!')

  someVscodeApi({
    onSomeEvent: myEvent.event,
  })
})
```

您也可以将原始事件转换为友好的事件发射器：

```ts {6}
import { defineExtension, useEventEmitter } from 'reactive-vscode'
import { EventEmitter } from 'vscode'

export = defineExtension(() => {
  const rawEvent = new EventEmitter<string>()
  const myEvent = useEventEmitter(rawEvent, [/* 可选的监听器 */])
})
