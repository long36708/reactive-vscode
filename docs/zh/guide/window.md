# 窗口与工作区

## 主题

您可能希望根据当前主题为扩展应用不同的样式。尽管许多 API（如 `vscode::TreeItem.iconPath`）内置了对双主题的支持，但有些没有。您可能还希望在 webview 中同步主题。

`reactive::useActiveColorTheme` 和 `reactive::useIsDrakTheme` composable 可用于获取当前主题以及是否为深色主题。

```ts {5,6}
import { defineExtension, useActiveColorTheme, useIsDarkTheme, watchEffect } from 'reactive-vscode'
import { useDemoWebviewView } from './webviewView'

export = defineExtension(() => {
  const theme = useActiveColorTheme()
  const isDark = useIsDarkTheme()

  const webviewView = useDemoWebviewView()

  watchEffect(() => {
    webviewView.postMessage({
      type: 'updateTheme',
      isDark: isDark.value,
      //         ^?
    })
  })
})
```

## 窗口状态

`reactive::useWindowState` composable 可用于获取当前窗口状态：

- `vscode::WindowState.active` - 窗口最近是否被交互过。这将在活动时立即更改，或在用户短暂不活动后更改。
- `vscode::WindowState.focused` - 当前窗口是否聚焦。

```ts {4}
import { defineExtension, useWindowState, watchEffect } from 'reactive-vscode'

export = defineExtension(() => {
  const { active: isWindowActive, focused: isWindowFocused } = useWindowState()

  watchEffect(() => {
    console.log('窗口是活动的:', isWindowActive.value)
    console.log('窗口是聚焦的:', isWindowFocused.value)
  })
})
```

## 工作区文件夹

`reactive::useWorkspaceFolders` composable 可用于获取工作区文件夹：

```ts {4}
import { defineExtension, useWorkspaceFolders, watchEffect } from 'reactive-vscode'

export = defineExtension(() => {
  const workspaceFolders = useWorkspaceFolders()

  watchEffect(() => {
    console.log('有', workspaceFolders.value?.length, '个工作区文件夹')
    //                         ^?
  })
})
```

## 监视文件系统更改

`reactive::useFsWatcher` composable 可用于监视文件系统更改：

```ts {4}
import { computed, defineExtension, useFsWatcher, watchEffect } from 'reactive-vscode'

export = defineExtension(() => {
  const filesToWatch = computed(() => ['**/*.md', '**/*.txt'])
  const watcher = useFsWatcher(filesToWatch)
  watcher.onDidChange((uri) => {
    console.log('文件已更改:', uri)
  })
})
```

请注意，您可以传递一组模式来监视文件系统中的更改。将为每个模式创建多个 VSCode 监视器。
