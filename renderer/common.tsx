import { createComponent } from 'solid-js'
import { NoHydration, isServer } from 'solid-js/web'

function spawned_wrap(target, ...parents) {
   for (const comp of parents) {
      if (!comp) continue
      target = createComponent(comp, { children: target })
   }
   return target
}

export function wrap(Comp, ...parents) {
   return function () {
      for (const Wrapper of parents) {
         if (!Wrapper) continue
         Comp = (
            <Wrapper>
               <Comp />
            </Wrapper>
         )
      }
      return Comp
   }
}

export function prepare_page(ctx) {
   const {
      Page,
      exports: { hydrate, Layout },
   } = ctx

   // const Comp = wrap(Page, Layout)
   const Comp = spawned_wrap(Page, Layout)
   return () =>
      !hydrate ? (
         <NoHydration>
            <Comp />
         </NoHydration>
      ) : (
         <Comp />
      )
}
