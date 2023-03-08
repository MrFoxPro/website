import { css, cx } from "@linaria/core"

import { getPageContext } from "../renderer/common"

const links = [
   ["/", ">^_^<"],
   ["/blog", "blog"],
   ["/cloud", "cloud"],
   ["/cv.ru", "cv ru"],
   ["/cv.en", "cv en"],
] as const

export function NavigationLayout(props) {
   const { urlPathname } = getPageContext()
   return (
      <>
         <header class={css`display: flow-root;`}>
            <div class={css`font-size: 36px;`}>
               <b>foxpro</b> website
            </div>
            <nav
               class={css`
                  margin-top: 10px;
                  > a {
                     text-decoration: none;
                     box-sizing: border-box;
                     & + a {
                        margin-inline-start: 10px;
                     }
                     &:visited, &:not(:visited) {
                        color: initial;
                     }
                     &:hover {
                        color: #7a7a7a70;
                     }
                     &.active {
                        color: orange;
                     }
                  }
            `}
            >
               {links.map(([href, title]) => (
                  <a href={href} classList={{ active: href.length > 1 && urlPathname.startsWith(href)  || urlPathname == href }}>
                     {title}
                  </a>
               ))}
               <a style={{ float: "right" }} href="https://github.com/MrFoxPro/website" target='blank'>
                  source
               </a>
            </nav>
         </header>
         <hr />
         {props.children}
      </>
   )
}
