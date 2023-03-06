import { css } from '@linaria/core'
import { NavigationLayout } from '../_default.page'

export function ArticleLayout(props) {
   return (
      <>
         <NavigationLayout>
            <div
               class={css`
                  p {
                     color: purple;
                  }
               `}
            >
               Blog layout
            </div>
         </NavigationLayout>
         <article>{props.children}</article>
      </>
   )
}

export { ArticleLayout as Layout }
