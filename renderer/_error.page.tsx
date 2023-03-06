import { css } from '@linaria/core'
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'
import { NavLayout } from '../pages/_default.page'

export function Page(ctx: PageContextBuiltInClient) {
   return (
      <NavLayout>
         <div
            class={css`
               width: 100%;
               height: 100%;
               margin: 0 auto;
            `}
         >
            404
         </div>
      </NavLayout>
   )
}
