import { MetaProvider } from "@solidjs/meta"
import { hydrate as hydrateSolid } from "solid-js/web"

import type { PageContext } from "./common"
import { prepare } from "./common"

export function render(ctx: PageContext) {
   if (!ctx.exports.hydrate) {
      console.warn("Skipping hydration!")
      return
   }
   const Comp = prepare(ctx, MetaProvider)
   hydrateSolid(() => Comp({}), document.body)
   console.log("Hydrated.")
}

// export const clientRouting = true
