import { createComponent } from "solid-js"
import type { Component, ParentComponent } from "solid-js"
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

export function preparePage(ctx: PageContext, ...utilityWrappers: ParentComponent[]) {
   const {
      Page,
      exports: { hydrate, Layout },
   } = ctx

   getPageContext = () => ctx

   const Comp = wrap(Page, Layout, ...utilityWrappers)
   return () => Comp({})
}

// const dark = /* css */`
//    color: red;
   
// `

// export const globalCSS = css`
//    :root {
//       --color-gray-900: #1c1d1f;
//       --color-gray-850: #27282b;
//       --color-gray-800: #31373e;
//       --color-gray-750: #323337;
//       --color-gray-700: #51575e;
//       --color-gray-650: #969596;
//       --color-gray-600: #9ca5ab;
//       --color-gray-500: #d8d8d8;
//       --color-gray-400: #d7dcdf;
//       --color-gray-300: #edf2f4;
//       --color-gray-200: #f7f9fb;
//       --color-gray-000: #ffffff;
//       --color-primary-orange-900: #ffa61f;
//       --color-primary-orange-200: #fdd08c;
//       --color-alert-red-900: #da4929;
//       --color-alert-red-800: #b56550;
//       --color-alert-red-400: #f8ebe8;
//       --color-alert-red-300: #fbebe7;
//       --color-alert-red-200: #f8ebe8;
//    }
//    &.switch-theme *:not(img, video) {
//       transition: background-color 100ms ease, color 100ms ease;
//    }

//    @media (color-scheme: dark) {
//       * {
//          background-color: black;
//          color: white;
//       }
//    }
// `