import { generateHydrationScript, renderToStream } from 'solid-js/web'
import { escapeInject as escape, dangerouslySkipEscape as skip, stampPipe } from 'vite-plugin-ssr'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'
import Favicons from './favicons.html?raw'
import { prepare_page } from './common'

const hydrationScript = generateHydrationScript()
const head = [Favicons]

export function render(ctx: PageContextBuiltIn) {
   const {
      exports: { hydrate },
   } = ctx

   const Comp = prepare_page(ctx)
   const { pipe } = renderToStream(Comp)

   stampPipe(pipe, 'node-stream')

   if (hydrate) head.push(hydrationScript)

   return escape`
         <!DOCTYPE html>
            <html lang="en">
            <head>
               <meta name="viewport" content="width=device-width, initial-scale=1" />
               <title>foxpro website</title>
               ${skip(head.join('\n'))}
            </head>
            <body>${pipe}</body>
         </html>
      `
}
