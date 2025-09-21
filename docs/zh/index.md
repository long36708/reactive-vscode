---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Reactive VSCode # '<span class="p1">Reactive</span> <span class="p2">VSCode</span>'
  text: "扩展 API"
  tagline: |
    使用 <span class="i-vscode-icons:file-type-vue text-2xl"></span> <span class="text-reactive">Composition</span> API 开发 <span class="i-vscode-icons:file-type-vscode text-2xl"></span> <span class="text-vscode">扩展</span>
  image: /logo.svg
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/
    - theme: alt
      text: 为什么？
      link: /zh/guide/why
    - theme: alt
      text: 函数
      link: /zh/functions
    - theme: alt
      text: 示例
      link: /zh/examples/

features:
  - icon: 🚀
    title: 易于使用
    details: 熟悉的 Vue Reactivity API
  - icon: 🦾
    title: 功能丰富
    details: 包含大部分 VSCode API
  - icon: ⚡
    title: 完全可摇树优化
    details: 只取你所需
  - icon: <span class="i-logos-vueuse"></span>
    title: VueUse 集成
    details: Vue 组合式工具集合
    link: /zh/guide/vueuse
---

<script setup>
import { withBase } from 'vitepress'
</script>

<div class="relative min-h-220">

::: code-group

<<< ../examples/editor-decoration/1.ts [<ReactiveVscode2 />]

<<< ../examples/editor-decoration/2.ts [原始 VSCode API]

:::

<div class="absolute top-4 text-sm right-6 op-80 hidden sm:block">
<a :href="withBase('zh/examples/index.html')" style="text-decoration: none">
<span class="i-carbon-launch mb-.5"></span> 更多示例
</a>
</div>

</div>
