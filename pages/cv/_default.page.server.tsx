import { css } from "@linaria/core"

import { MainLayout } from "../main_layout"

const cvClass = css`
   a {
     &::before {
        content: "🔗 ";
     }   
   }
`

export const CVLayout = (props) => (
   <MainLayout><main class={cvClass}>{props.children}</main></MainLayout>
)
export { CVLayout as Layout }
