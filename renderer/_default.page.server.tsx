import { join } from "path"
import { readFile } from "fs/promises"

import { html } from "common-tags"
import { generateHydrationScript, renderToStringAsync } from "solid-js/web"
import type { InjectFilterEntry } from "vite-plugin-ssr"
import { MetaProvider, renderTags } from "@solidjs/meta"

import favicons from "./favicons.html?raw"
import { preparePage, type PageContext } from "./common"

const hydrationScript = generateHydrationScript()
const {
   config: { root, build: { outDir } },
   viteDevServer,
} = globalThis["__vite_plugin_ssr"]["globalContext.ts"]

export const passToClient = ["urlPathname"]

export async function render(ctx: PageContext) {
   const {
      exports: { hydrate },
      _isHtmlOnly,
      __getPageAssets
   } = ctx

   const tags = []

   const Comp = preparePage(ctx, (props) => MetaProvider({ ...props, tags }))

   const body = await renderToStringAsync(Comp)

   const head = [favicons].concat(renderTags(tags))
   if (hydrate) head.push(hydrationScript)

   const assetsToSkip = new Set()
   if (!viteDevServer && _isHtmlOnly) {
      const assets = await __getPageAssets()
      for (const { src, assetType } of assets) {
         if (assetType != "style") continue
         const css = await readFile(join(root, outDir, src))
         head.unshift(`<style>${css}</style>`)
         assetsToSkip.add(src)
      }
   }

   const documentHtml = html`
         <!DOCTYPE html>
            <html lang="en">
            <head>
               <meta name="viewport" content="width=device-width, initial-scale=1" />
               ${head.join("\n")}
            </head>
            <body>${body}</body>
         </html>
      `

   return {
      documentHtml: {
         _template: {
            templateStrings: [documentHtml],
            templateVariables: [],
         },
      },
      injectFilter: (assets: InjectFilterEntry[]) => {
         if (!ctx._isHtmlOnly) return
         for (const a of assets) assetsToSkip.has(a.src) && (a.inject = false) 
      },
   }
}
