import { css } from '@linaria/core'
import { NavigationLayout } from '../nav_layout'

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
