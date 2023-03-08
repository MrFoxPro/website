import { readFileSync } from "fs"
import { join } from "path"

import { MetaProvider, renderTags } from "@solidjs/meta"
import { html } from "common-tags"
import { generateHydrationScript, renderToString } from "solid-js/web"
import type { InjectFilterEntry } from "vite-plugin-ssr"

import { prepare, type PageContext } from "./common"
import favicons from "./favicons.html?raw"

const hydrationScript = generateHydrationScript()

const {
   config: { root, build: { outDir } },
   viteDevServer,
} = globalThis["__vite_plugin_ssr"]["globalContext.ts"]

export const passToClient = ["urlPathname"]

export async function render(ctx: PageContext) {
   const { _isHtmlOnly, __getPageAssets, exports: { hydrate } } = ctx

   const tags = []

   const Comp = prepare(ctx, (props) => MetaProvider({ tags, children: props.children }))

   const body = renderToString(() => Comp({}))

   const head = [favicons].concat(renderTags(tags))
   if(hydrate) head.push(hydrationScript)

   const assetsToSkip = new Set()
   if (!viteDevServer && _isHtmlOnly) {
      const assets = await __getPageAssets()
      for (const { src, assetType } of assets) {
         if (assetType != "style") continue
         const css = readFileSync(join(root, outDir, src))
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
