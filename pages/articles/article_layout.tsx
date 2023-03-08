import { css } from "@linaria/core"

import { MainLayout } from "../main_layout"

export function ArticleLayout(props) {
   return (
      <>
         <MainLayout>
            <div class={css`p { color: purple; }`}>
               Blog layout
            </div>
         </MainLayout>
         <article>{props.children}</article>
      </>
   )
}
