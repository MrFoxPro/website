import { css } from '@linaria/core'
import { NavLayout } from '../_default.page'

export function ArticleLayout(props) {
   return (
      <>
         <NavLayout>
            <div
               class={css`
                  p {
                     color: purple;
                  }
               `}
            >
               Blog layout
            </div>
         </NavLayout>
         <article>{props.children}</article>
      </>
   )
}

export { ArticleLayout as Layout }
