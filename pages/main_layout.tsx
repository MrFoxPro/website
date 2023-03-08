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

css`/* global */
   * {
      box-sizing: border-box;
   }
   :root {
      background-color: black;
      color: white;
   }
   body {
      margin: 0;
      padding: 8px;
   }
   :root, body {
      min-height: 100vh;
      min-width: 100vw;
   }

   a {
      text-decoration: none;
      &:not(:visited) {
         color: inherit;
      }
      &:visited {
         color: #885ad9;
      }
      &:active {
         color: indianred;
      }
   }
`

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
                     box-sizing: border-box;
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
                  <a style={{ float: "right" }} href="https://github.com/MrFoxPro/website" target="blank">
                     source
                  </a>
                  <a style={{ float: "right" }} href="https://t.me/MrFoxPro" target="blank">
                     tg
                  </a>
                  <a style={{ float: "right" }} href="mailto:tuningiposadka@gmail.com" target="blank">
                     gmail
                  </a>
               </nav>
            </header>
            <hr />
         </NoHydration>
         {props.children}
      </>
   )
}
