import { generateHydrationScript, NoHydration, renderToString } from 'solid-js/web'
import { dangerouslySkipEscape } from 'vite-plugin-ssr'
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'
import Head from './head.html?raw'

export function render(pageContext: PageContextBuiltInClient) {
   if (pageContext.Page) {
      const {
         Page,
         exports: { noHydrate },
      } = pageContext

      const src = renderToString(() =>
         noHydrate ? (
            <NoHydration>
               <Page />
            </NoHydration>
         ) : (
            <Page />
         ),
      )

      return dangerouslySkipEscape(`
         <!DOCTYPE html>
            <html lang="en">
            <head>
               ${Head}
               ${!noHydrate ? generateHydrationScript() : ''}
            </head>
            <body>${src}</body>
         </html>
      `)
   }
}
