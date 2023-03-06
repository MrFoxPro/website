// import { escapeInject as escape, dangerouslySkipEscape as skip } from 'vite-plugin-ssr'
import Path from 'path'
import { readFile } from 'fs/promises'
import { generateHydrationScript, renderToStringAsync } from 'solid-js/web'
import { collect } from '@linaria/server'
import { prepare_page } from './common'
import Favicons from './favicons.html?raw'
import type { ViteDevServer } from 'vite'
import { html } from 'common-tags'
import type { PageContextBuiltIn, InjectFilterEntry } from 'vite-plugin-ssr'

const hydrationScript = generateHydrationScript()
const viteDevServer = globalThis.__vite_plugin_ssr['globalContext.ts'].viteDevServer as ViteDevServer
const viteConfig = globalThis['__vite_plugin_ssr']['globalContext.ts']['config']

export async function render(
   ctx: PageContextBuiltIn & { _isHtmlOnly: boolean; __getPageAssets: () => Promise<InjectFilterEntry[]> },
) {
   const {
      exports: { hydrate },
   } = ctx

   const Comp = prepare_page(ctx)
   const body = await renderToStringAsync(Comp)

   const head = [Favicons]
   const assets_to_skip = new Set()

   if (hydrate) head.push(hydrationScript)

   if (!viteDevServer && ctx._isHtmlOnly) {
      const assets = await ctx.__getPageAssets()
      for (const a of assets) {
         if (a.assetType != 'style') continue
         // let css: string
         // if (viteDevServer) {
         //    const mod = await viteDevServer.moduleGraph.getModuleByUrl(a.src)
         //    content = mod?.transformResult.code
         // } else
         const css = await readFile(Path.join(viteConfig.root, viteConfig.build.outDir, a.src), {
            encoding: 'utf8',
         })
         // const { critical, other } = collect(body, css)
         // if (css.trim() === critical.trim()) {
         // console.info('Injecting critical to head >>', a.src)
         head.unshift(`<style>${css}</style>`)
         // a.inject = false - will not work here
         assets_to_skip.add(a.src)
         // }
      }
   }

   const injectFilter = (assets: InjectFilterEntry[]) => {
      if (!ctx._isHtmlOnly) return
      for (const a of assets) {
         if (assets_to_skip.has(a.src)) a.inject = false
      }
   }

   const documentHtml = html`
         <!DOCTYPE html>
            <html lang="en">
            <head>
               <meta name="viewport" content="width=device-width, initial-scale=1" />
               <title>foxpro website</title>
               ${head.join('\n')}
            </head>
            <body>${body}</body>
         </html>
      `

   return {
      // bypass vps restiction
      documentHtml: {
         _template: {
            templateStrings: [documentHtml],
            templateVariables: [],
         },
      },
      injectFilter,
   }
}
