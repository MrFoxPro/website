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
               <div style={{ "font-size": "clamp(24px, 2.5vw, 36px)" }}>
                  <b>foxpro</b> website
               </div>
               <nav class={css`
                     margin-top: 10px;
                     display: flex;
                     gap: 10px;
                     align-items: center;
                     > a {
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
                  <a class={css`margin-left: auto; &:hover { color: #dedede }`} href="https://github.com/MrFoxPro/website" target="blank">
                     src
                  </a>
               </nav>
               <hr />
               <div class={css`
                     display: flex;
                     gap: 10px;
                     align-items: center;
                     > a {
                        &:visited {
                           color: unset;
                        }
                        &.active {
                           color: orange;
                        }
                     }
                  `}>
                  <a class={css`&:hover { color: #5794e0 !important }`} href="https://t.me/MrFoxPro" target="blank">
                     tg
                  </a>
                  <a class={css`&:hover { color: #e0575b !important }`} href="mailto:tuningiposadka@gmail.com" target="blank">
                     mail
                  </a>
                  <a class={css`&:hover { color: #e0575b !important }`} href="https://vk.com/mrfoxpro" target="blank">
                     vk
                  </a>
                  <a class={css`margin-left: auto; &:hover { color: #e0575b !important }`} href="https://vk.com/mrfoxpro" target="blank">
                     xmr
                  </a>
                  <a class={css`&:hover { color: #e0575b !important }`} href="https://vk.com/mrfoxpro" target="blank">
                     btc
                  </a>
                  <a class={css`&:hover { color: #e0575b !important }`} href="https://vk.com/mrfoxpro" target="blank">
                     eth
                  </a>
               </div>
            </header>
         </NoHydration>
         {props.children}
      </>
   )
}
