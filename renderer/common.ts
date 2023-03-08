import type { Component, ParentComponent } from "solid-js"
import { createComponent } from "solid-js"
import type { InjectFilterEntry, PageContextBuiltIn } from "vite-plugin-ssr"

type HiddenContextProps = {
   _isHtmlOnly: boolean
   __getPageAssets: () => Promise<InjectFilterEntry[]>
}
export type PageContext<P = any> = PageContextBuiltIn<P> & {
   exports: { Layout: ParentComponent; hydrate?: boolean }
} & HiddenContextProps

function wrap(target: Component, ...parents: Component[]) {
   let _target = target
   for (const p of parents) {
      if (!p) continue
      const copy = _target
      _target = createComponent.bind(null, p, { children: copy })
   }
   return _target
}

export let getPageContext: () => PageContext

export function prepare(ctx: PageContext, ...utilityWrappers: ParentComponent[]) {
   const {
      Page,
      exports: { Layout },
   } = ctx

   getPageContext = () => ctx

   const Comp = wrap(Page, Layout, ...utilityWrappers)
   return Comp
}
