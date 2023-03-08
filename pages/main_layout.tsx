import { css } from "@linaria/core"
import { NoHydration } from "solid-js/web"

import { getPageContext } from "../renderer/common"

const links = [
   ["/", "index"],
   ["/blog", "blog"],
   ["/cloud", "cloud"],
   ["/cv.ru", "cv.ru"],
   ["/cv.en", "cv.en"],
] as const

export function MainLayout(props) {
   const { urlPathname } = getPageContext()
   return (
      <>
         <NoHydration>
            <header style={{ display: "flow-root" }}>
               <div style={{ "font-size": "36px" }}>
                  <b>foxpro</b> website
               </div>
               <nav class={css`
                  margin-top: 10px;
                  > a {
                     & + a {
                        margin-inline-start: 10px;
                     }
                     &:hover {
                        color: #7a7a7a70;
                     }
                     &:visited {
                        color: inherit;
                     }
                     &.active {
                        color: orange;
                     }
                  }
               `}
               >
                  {links.map(([href, title]) => (
                     <a href={href} classList={{ active: href.length > 1 && urlPathname.startsWith(href) || urlPathname == href }}>
                        {title}
                     </a>
                  ))}
                  <a class={css`float: right; &:hover { color: #dedede !important }`} href="https://github.com/MrFoxPro/website" target="blank">
                     src
                  </a>
                  <a class={css`float: right; &:hover { color: #5794e0 !important }`} href="https://t.me/MrFoxPro" target="blank">
                     tg
                  </a>
                  <a class={css`float: right; &:hover { color: #e0575b !important }`} href="mailto:tuningiposadka@gmail.com" target="blank">
                     mail
                  </a>
               </nav>
            </header>
            <hr />
         </NoHydration>
         {props.children}
      </>
   )
}
