import type { PageContextBuiltInClient } from "vite-plugin-ssr/client"

export function Page(pageProps: PageContextBuiltInClient) {
   if (pageProps.is404) {
      // Return a UI component "Page Not Found."
      return <div>[VPS]: Not found</div>
   } else {
      return <div>[VPS]: Our server is having problems. Sincere apologies. Try again later.</div>
   }
}
