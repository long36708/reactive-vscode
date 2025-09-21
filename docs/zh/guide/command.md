# 命令

命令触发操作。命令向用户公开功能，绑定到 VS Code UI 中的操作，并实现内部逻辑。

VSCode 中有一些[内置命令](https://code.visualstudio.com/api/references/commands)，您也可以定义自己的命令。

## 在清单中定义 <NonProprietary />

如[官方文档](https://code.visualstudio.com/api/references/contribution-points#contributes.commands)中所述，您需要在 `package.json` 的 `contributes.commands` 字段中定义命令。

```json [package.json]
{
  "contributes": {
    "commands": [
      {
        "command": "extension.sayHello",
        "title": "Hello World",
        "category": "Hello",
        "icon": {
          "light": "path/to/light/icon.svg",
          "dark": "path/to/dark/icon.svg"
        }
      }
    ]
  }
}
```

## 注册命令

您可以使用 `reactive::useCommand` 或 `reactive::useCommands` 函数在扩展中注册命令。

```ts {6-9}
import { defineExtension, ref, useCommand, watchEffect } from 'reactive-vscode'
import { window } from 'vscode'

export = defineExtension(() => {
  const helloCounter = ref(0)
  useCommand('extension.sayHello', () => {
    window.showInformationMessage('Hello World')
    helloCounter.value++
  })

  watchEffect(() => {
    if (helloCounter.value > 99)
      window.showWarningMessage('您说 hello 的次数太多了！')
  })
})
```

## 注意事项

### 命令面板可见性 <NonProprietary />

命令可以用作视图操作，或被其他扩展调用。在这种情况下，命令可能有参数，不应通过[命令面板](https://code.visualstudio.com/api/ux-guidelines/command-palette)调用。我们应该通过将 `contributes.menus[*].when` 属性设置为 `false` 来从命令面板中隐藏这些命令：

```json
{
  "contributes": {
    "commands": [
      {
        "command": "extension.doSomething",
        "title": "这需要参数"
      }
    ],
    "menus": {
      "commandPalette": [
        {
          "command": "extension.doSomething",
          "when": "false"
        }
      ]
    }
  }
}
```

更多信息请参阅[官方文档](https://code.visualstudio.com/api/references/contribution-points#Context-specific-visibility-of-Command-Palette-menu-items)。
