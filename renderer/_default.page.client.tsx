import { hydrate as solid_hydrate } from 'solid-js/web'
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'
import { prepare_page } from './common'

let unhydrate: () => void

export async function render(ctx: PageContextBuiltInClient) {
   const {
      exports: { hydrate },
   } = ctx

   if (hydrate) {
      const Comp = prepare_page(ctx)
      unhydrate = solid_hydrate(Comp, document.body)
      console.log('hydrated')
   }
}

export const clientRouting = true
