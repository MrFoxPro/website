import { generateHydrationScript, renderToStringAsync } from 'solid-js/web'
import { escapeInject as escape, dangerouslySkipEscape as skip } from 'vite-plugin-ssr'
import { prepare_page } from './common'
import type { PageContextBuiltIn, InjectFilterEntry } from 'vite-plugin-ssr'
import Favicons from './favicons.html?raw'
import type { ViteDevServer } from 'vite'
import { readFile } from 'fs/promises'
import Path from 'path'

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

   if (ctx._isHtmlOnly) {
      const assets = await ctx.__getPageAssets()
      for (const a of assets) {
         if (a.assetType != 'style') continue
         let content: string
         if (viteDevServer) {
            const mod = await viteDevServer.moduleGraph.getModuleByUrl(a.src)
            content = mod?.transformResult.code
         } else
            content = await readFile(Path.join(viteConfig.root, viteConfig.build.outDir, a.src), {
               encoding: 'utf8',
            })
         head.unshift(`<style>${content}</style>`)
         // a.inject = false - will not work here
         assets_to_skip.add(a.src)
      }
   }

   const injectFilter = (assets: InjectFilterEntry[]) => {
      if (!ctx._isHtmlOnly) return
      for (const a of assets) {
         if (assets_to_skip.has(a.src)) {
            a.inject = false
         }
      }
   }

   const documentHtml = escape`
         <!DOCTYPE html>
            <html lang="en">
            <head>
               <meta name="viewport" content="width=device-width, initial-scale=1" />
               <title>foxpro website</title>
               ${skip(head.join('\n'))}
            </head>
            <body>${skip(body)}</body>
         </html>
      `
   return {
      documentHtml,
      injectFilter,
   }
}
