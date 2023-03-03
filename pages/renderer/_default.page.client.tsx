// import { printBuildInfo } from "../misc/build_info.js"
import { render as solidRender } from "solid-js/web"
import type { PageContextBuiltInClient } from "vite-plugin-ssr/client"

export async function render(pageContext: PageContextBuiltInClient) {
   // if (import.meta.env.PROD) printBuildInfo()
   const { Page } = pageContext
   solidRender(() => <Page />, document.body)
}

export const clientRouting = true
