import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'

export function Page(pageProps: PageContextBuiltInClient) {
   if (pageProps.is404) {
      return <div>Not found</div>
   } else {
      return <div>Error is happened: {JSON.stringify(pageProps)}</div>
   }
}
