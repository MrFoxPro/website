import { render as solidRender } from "solid-js/web"
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'

export async function render(pageContext: PageContextBuiltInClient) {
   const { Page } = pageContext
   solidRender(() => <Page />, document.body)
}

export const clientRouting = true
