import { css } from '@linaria/core'
import { NavLayout } from '../_default.page'

export function ArticleLayout(props) {
   return (
      <NavLayout>
         <div
            class={css`
            p {
                  color: purple;
            }
         `}
         >
            Blog layout
            {props.children}
         </div>
      </NavLayout>
   )
}

export { ArticleLayout as Layout }
