import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Reactive VSCode',
  description: 'Develop VSCode extension with Vue Reactivity API',
  base: '/reactive-vscode/',

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      title: 'Reactive VSCode',
      description: 'Develop VSCode extension with Vue Reactivity API',
      themeConfig: {
        logo: '/logo.svg',

        nav: [
          { text: 'Guide', link: '/guide/' },
          { text: 'Functions', link: '/functions' },
          { text: 'Examples', link: '/examples/' },
        ],

        sidebar: {
          '/guide': [
            {
              text: 'Guide',
              items: [
                { text: 'Why reactive-vscode', link: '/guide/why' },
                { text: 'Getting Started', link: '/guide/' },
                { text: 'Extension', link: '/guide/extension' },
                { text: 'Commands', link: '/guide/command' },
                { text: 'Views', link: '/guide/view' },
                { text: 'Configurations', link: '/guide/config' },
                { text: 'Editor & Document', link: '/guide/editor' },
                { text: 'Window & Workspace', link: '/guide/window' },
                { text: 'Terminals', link: '/guide/terminal' },
                { text: 'Custom Contexts', link: '/guide/context' },
                { text: 'Disposables', link: '/guide/disposable' },
                { text: 'Events', link: '/guide/event' },
                { text: 'VueUse Integration', link: '/guide/vueuse' },
              ],
            },
            {
              items: [
                { text: 'Examples', link: '/examples/' },
              ],
            },
          ],
          '/examples': [
            {
              text: 'Examples',
              items: [
                { text: 'Index', link: '/examples/' },
                { text: 'Hello Counter', link: '/examples/hello-counter/' },
                { text: 'Editor Decoration', link: '/examples/editor-decoration/' },
                { text: 'Theme Detector', link: '/examples/theme-detector/' },
                { text: 'FS Watcher', link: '/examples/fs-watcher/' },
              ],
            },
          ],
        },

        socialLinks: [
          { icon: 'github', link: 'https://github.com/kermanx/reactive-vscode' },
          { icon: 'discord', link: 'https://discord.gg/8YNDMA5Hcq' },
        ],

        search: {
          provider: 'local',
        },

        editLink: {
          pattern: 'https://github.com/kermanx/reactive-vscode/edit/main/docs/:path',
        },
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Reactive VSCode',
      description: '使用 Vue Reactivity API 开发 VSCode 扩展',
      themeConfig: {
        logo: '/logo.svg',

        nav: [
          { text: '指南', link: '/zh/guide/' },
          { text: '函数', link: '/zh/functions' },
          { text: '示例', link: '/zh/examples/' },
        ],

        sidebar: {
          '/zh/guide': [
            {
              text: '指南',
              items: [
                { text: '为什么选择 reactive-vscode', link: '/zh/guide/why' },
                { text: '快速开始', link: '/zh/guide/' },
                { text: '扩展', link: '/zh/guide/extension' },
                { text: '命令', link: '/zh/guide/command' },
                { text: '视图', link: '/zh/guide/view' },
                { text: '配置', link: '/zh/guide/config' },
                { text: '编辑器与文档', link: '/zh/guide/editor' },
                { text: '窗口与工作区', link: '/zh/guide/window' },
                { text: '终端', link: '/zh/guide/terminal' },
                { text: '自定义上下文', link: '/zh/guide/context' },
                { text: '可释放资源', link: '/zh/guide/disposable' },
                { text: '事件', link: '/zh/guide/event' },
                { text: 'VueUse 集成', link: '/zh/guide/vueuse' },
              ],
            },
            {
              items: [
                { text: '示例', link: '/zh/examples/' },
              ],
            },
          ],
          '/zh/examples': [
            {
              text: '示例',
              items: [
                { text: '索引', link: '/zh/examples/' },
                { text: 'Hello Counter', link: '/zh/examples/hello-counter/' },
                { text: '编辑器装饰', link: '/zh/examples/editor-decoration/' },
                { text: '主题检测器', link: '/zh/examples/theme-detector/' },
                { text: '文件系统监视器', link: '/zh/examples/fs-watcher/' },
              ],
            },
          ],
        },

        socialLinks: [
          { icon: 'github', link: 'https://github.com/kermanx/reactive-vscode' },
          { icon: 'discord', link: 'https://discord.gg/8YNDMA5Hcq' },
        ],

        search: {
          provider: 'local',
        },

        editLink: {
          pattern: 'https://github.com/kermanx/reactive-vscode/edit/main/docs/:path',
        },
      },
    },
  },
  head: [['link', { rel: 'icon', href: '/reactive-vscode/favicon.ico' }]],
  lastUpdated: true,

  vite: {
    plugins: [
      Components({
        dirs: resolve(__dirname, 'theme/components'),
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: resolve(__dirname, 'components.d.ts'),
        transformer: 'vue3',
      }) as any,
      UnoCSS({
        presets: [
          presetUno(),
          presetAttributify(),
          presetIcons({
            extraProperties: {
              'display': 'inline-block',
              'vertical-align': 'middle',
            },
            collections: {
              'reactive-vscode': {
                logo: () => readFile(resolve(__dirname, '../public/logo.svg'), 'utf-8'),
              },
            },
          }),
        ],
        theme: {
          colors: {
            'primary': '#1F9CF0',
            'reactive': '#229863',
            'vscode': '#1F9CF0',
            'vscode-darker': '#007ACC',
          },
          fontFamily: {
            mono: 'var(--vp-font-family-mono)',
          },
        },
        shortcuts: {
          'border-main': 'border-$vp-c-divider',
          'bg-main': 'bg-gray-400',
          'bg-base': 'bg-white dark:bg-hex-1a1a1a',
        },
        transformers: [
          transformerDirectives(),
          transformerVariantGroup(),
        ],
      }),
      {
        name: 'api-link',
        enforce: 'pre',
        transform(code, id) {
          if (!id.endsWith('.md'))
            return
          return code.replace(/`(\w+)::([^(`]+)(\(\S+?\))?`/g, (_, scope, name, link) => {
            return `<ApiLink scope="${scope}" name="${name}" ${link ? `link="${link.slice(1, -1)}"` : ''}/>`
          })
        },
      },
      groupIconVitePlugin({
        customIcon: {
          'reactivevscode': localIconLoader(import.meta.url, '../public/logo.svg'),
          'original vscode api': 'logos:visual-studio-code',
        },
      }),
    ],
  },

  markdown: {
    codeTransformers: [
      transformerTwoslash({
        explicitTrigger: false,
        twoslashOptions: {
          compilerOptions: {
            module: 200, // ModuleKind.Preserve,
            paths: {
              'reactive-vscode': [
                resolve(__dirname, '../node_modules/reactive-vscode/dist/index.d.ts'),
              ],
            },
          },
          vfsRoot: resolve(__dirname, '../snippets'),
        },
      }),
    ],
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
})
