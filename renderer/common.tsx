import { createComponent, createContext, useContext } from 'solid-js'
import type { JSX, Component, ParentComponent } from 'solid-js'
import { NoHydration } from 'solid-js/web'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'

function spawned_wrap(target: Component, ...parents: Component[]) {
   let _target: JSX.Element = target({})
   for (const p of parents) {
      if (!p) continue
      _target = createComponent(p, { children: target })
   }
   return () => _target
}

export function abstract_wrap(target: Component, ...parents: ParentComponent[]) {
   if (!target || target.constructor instanceof Function == false) {
      console.warn('Attempt to wrap null or not a function', target)
      return null
   }
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

const PageContext = createContext<PageContextBuiltIn>()
export const usePageContext = () => useContext(PageContext)
function createPageContextWrapper(ctx: PageContextBuiltIn) {
   return (props) => <PageContext.Provider value={ctx}>{props.children}</PageContext.Provider>
}

export function prepare_page(ctx: PageContextBuiltIn<Component>) {
   const {
      Page,
      exports: { hydrate, Layout },
   } = ctx

   const PageContextWrapper = createPageContextWrapper(ctx)
   const Comp = abstract_wrap(Page, Layout as ParentComponent, PageContextWrapper)

   return () =>
      !hydrate ? (
         <NoHydration>
            <Comp />
         </NoHydration>
      ) : (
         <Comp />
      )
}
