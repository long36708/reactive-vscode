# 配置

扩展可以贡献扩展特定的设置。

## 在清单中定义 <NonProprietary />

要在 `package.json` 中定义设置，您需要添加 `contributes.configuration` 字段。`configuration` 字段是一个包含配置设置的对象。

```json [package.json]
{
  "contributes": {
    "configuration": {
      "title": "My Extension",
      "properties": {
        "myExtension.enable": {
          "type": "boolean",
          "default": true,
          "description": "启用 My Extension"
        },
        "myExtension.greeting": {
          "type": ["string", "null"],
          "default": "Hello!",
          "description": "问候消息。设置为 null 以禁用"
        }
      }
    }
  }
}
```

访问[官方文档](https://code.visualstudio.com/api/references/contribution-points#contributes.configuration)获取更多信息。

## 在扩展中使用

要在扩展中使用设置，您可以使用 `reactive::defineConfigs` 或 `reactive::defineConfigObject` 函数来定义配置。以下示例对应于上述配置。

### 作为 Refs

```ts
import { defineConfigs } from 'reactive-vscode'

const { enable, greeting } = defineConfigs('your-extension', {
  enable: Boolean,
  greeting: [String, null],
})
```

请注意，您应该始终在清单文件中设置默认值。`reactive::defineConfigs` 不提供默认值。

在上面的示例中，`enable` 的类型是 `ConfigRef<boolean>`，它扩展了 `Ref<boolean>`。

<!-- eslint-disable import/first -->
```ts
import { defineConfigs } from 'reactive-vscode'

const { enable, greeting } = defineConfigs('your-extension', {
  enable: Boolean,
  greeting: [String, null],
})
// ---cut---
import { ConfigurationTarget } from 'vscode'

// 这会将值写回配置。
enable.value = false

// 要传递其余选项，您可以使用 `update` 方法。
enable.update(false, ConfigurationTarget.Global)

// 仅设置 ref 值而不写回配置。
enable.set(false)
```

访问[官方文档](https://code.visualstudio.com/api/references/vscode-api#WorkspaceConfiguration.update)获取有关其余选项的更多信息。

### 作为对象

```ts
import { defineConfigObject } from 'reactive-vscode'

const config = defineConfigObject('your-extension', {
  enable: Boolean,
  greeting: [String, null],
})
```

在上面的示例中，`config` 是一个 `vue::ShallowReactive(https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive)` 对象。

<!-- eslint-disable import/first -->
```ts
import { defineConfigObject } from 'reactive-vscode'

const config = defineConfigObject('your-extension', {
  enable: Boolean,
  greeting: [String, null],
})
// ---cut---
import { ConfigurationTarget } from 'vscode'

// 这会将值写回配置。
config.enable = false

// 要传递其余选项，您可以使用 `$update` 方法。
config.$update('enable', false, ConfigurationTarget.Global)

// 仅设置 ref 值而不写回配置。
config.$set('enable', false)
```

访问[官方文档](https://code.visualstudio.com/api/references/vscode-api#WorkspaceConfiguration.update)获取有关其余选项的更多信息。

## 与 `vscode-ext-gen` 一起使用

您还可以使用 [`vscode-ext-gen`](https://github.com/antfu/vscode-ext-gen) 来生成配置设置。例如：

```ts
import type { NestedScopedConfigs } from './generated-meta'
import { defineConfigObject, defineConfigs, reactive, ref } from 'reactive-vscode'
import { scopedConfigs } from './generated-meta'

const config = defineConfigObject<NestedScopedConfigs>(
  scopedConfigs.scope,
  scopedConfigs.defaults,
)
