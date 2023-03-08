import { css } from '@linaria/core'
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'
import { NavigationLayout } from '../pages/nav_layout'

export function Page(ctx: PageContextBuiltInClient) {
   return (
      <div
         class={css`
               width: 100%;
               height: 100%;
               margin: 0 auto;
            `}
      >
         404
      </div>
   )
}

export { NavigationLayout as Layout }
