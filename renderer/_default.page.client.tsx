import { hydrate as solid_hydrate } from 'solid-js/web'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'
import { prepare_page } from './common'

let unhydrate: () => void

export async function render(ctx: PageContextBuiltIn) {
   const {
      exports: { hydrate },
   } = ctx
   if (hydrate) {
      const Comp = prepare_page(ctx)
      unhydrate = solid_hydrate(Comp, document.body)
      console.info('hydrated')
   }
}

// export const clientRouting = true
