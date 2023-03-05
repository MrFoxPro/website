import { Component, createComponent, JSX, ParentComponent } from 'solid-js'
import { NoHydration } from 'solid-js/web'

function spawned_wrap(target: Component, ...parents: Component[]) {
   let _target: JSX.Element = target({})
   for (const p of parents) {
      if (!p) continue
      _target = createComponent(p, { children: target })
   }
   return () => _target
}

export function abstract_wrap(target: Component, ...parents: ParentComponent[]) {
   let Comp = target
   for (const Wrapper of parents) {
      if (!Wrapper) continue
      const Copy = Comp
      Comp = () => (
         <Wrapper>
            <Copy />
         </Wrapper>
      )
   }
   return Comp
}

export function prepare_page(ctx) {
   const {
      Page,
      exports: { hydrate, Layout },
   } = ctx

   const Comp = abstract_wrap(Page, Layout)

   return () =>
      !hydrate ? (
         <NoHydration>
            <Comp />
         </NoHydration>
      ) : (
         <Comp />
      )
}
