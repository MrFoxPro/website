import { createComponent } from "solid-js"
import type { Component, ParentComponent } from "solid-js"
import type { InjectFilterEntry, PageContextBuiltIn } from "vite-plugin-ssr"

type HiddenContextProps = {
   _isHtmlOnly: boolean
   _getPageAssets: () => Promise<InjectFilterEntry[]>
}
export type PageContext<P = any> = PageContextBuiltIn<P> & {
   exports: { Layout: ParentComponent; hydrate?: boolean }
} & HiddenContextProps

function wrapSpawned(target: Component, ...parents: Component[]) {
   let _target = target
   for (const p of parents) {
      if (!p) continue
      const copy = _target
      _target = createComponent.bind(this, p, { children: copy })
   }
   return _target
}

export let getPageContext: () => PageContext

export function preparePage(_ctx: PageContext, ...utilityWrappers: ParentComponent[]) {
   const {
      Page,
      exports: { hydrate, Layout },
   } = _ctx
   getPageContext = () => _ctx

   const Comp = wrapSpawned(Page, Layout, ...utilityWrappers)
   return () => createComponent(Comp, {})
}
