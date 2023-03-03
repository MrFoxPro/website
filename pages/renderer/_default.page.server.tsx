import { generateHydrationScript, renderToStream } from "solid-js/web"
import { dangerouslySkipEscape, escapeInject, stampPipe } from "vite-plugin-ssr"

const headInner = `
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width" />
<link rel="apple-touch-icon" sizes="180x180" href="/assets/meta/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/assets/meta/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/assets/meta/favicon-16x16.png" />
<link rel="manifest" href="/assets/meta/site.webmanifest" />
<link rel="mask-icon" href="/assets/meta/safari-pinned-tab.svg" color="#5bbad5" />
<link rel="shortcut icon" type="image/ico" href="/assets/meta/favicon.ico" />
`

/**
 * @param {import("vite-plugin-ssr/client").PageContextBuiltInClient} pageContext
 */
export function render(pageContext) {
  if (pageContext.Page) {
    const { Page } = pageContext
    const { pipe } = renderToStream(() => <Page />)

    stampPipe(pipe, "node-stream")
    return escapeInject`<!DOCTYPE html>
      <html lang="en">
        <head>
         ${dangerouslySkipEscape(headInner)}
         ${dangerouslySkipEscape(generateHydrationScript())}
        </head>
        <body>${pipe}</body>
      </html>`
  }

  return escapeInject`<!DOCTYPE html>
   <html lang="en">
     <head>
      ${dangerouslySkipEscape(headInner)}
     </head>
     <body></body>
   </html>`
}
