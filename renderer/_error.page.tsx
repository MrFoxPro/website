import { css } from '@linaria/core'
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'
import { NavigationLayout } from '../pages/_default.page'

export function Page(ctx: PageContextBuiltInClient) {
   return (
      <NavigationLayout>
         <div
            class={css`
               width: 100%;
               height: 100%;
               margin: 0 auto;
            `}
         >
            404
         </div>
      </NavigationLayout>
   )
}
