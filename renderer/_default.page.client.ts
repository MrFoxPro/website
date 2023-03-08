import { hydrate as hydrateSolid, NoHydration } from "solid-js/web"
import { MetaProvider } from "@solidjs/meta"

import { preparePage } from "./common"
import type { PageContext } from "./common"

export function render(ctx: PageContext) {
   const {
      exports: { hydrate },
   } = ctx
   if (hydrate) {
      const Comp = preparePage(ctx, MetaProvider)
      hydrateSolid(Comp, document.body)
   }
}

// export const clientRouting = true
