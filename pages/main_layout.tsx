import { css, cx } from "@linaria/core"
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

   const linkClass = css`
      text-decoration: none;
      &:visited {
         color: inherit;
         text-decoration: none;
      }
      &.active {
         color: orange;
      }
      &:hover {
         text-decoration: underline;
      }
   `
   const underConstructionSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80">
         <style>.heavy { font: bold 30px sans-serif; }</style>
         <text x="60" y="35" class="heavy">кот</text>
      </svg>
   `
      .trim()
      .replaceAll('"', "'")
   return (
      <>
         <NoHydration>
            <div
               class={css`
                  background-size: 200%;
                  background-repeat: no-repeat;
                  @keyframes slide {
                     to {
                        background-position-x: 100%;
                     }
                  }
                  &:hover {
                     animation: 15s infinite forwards slide;
                     animation-timing-function: linear;
                  }
               `}
            />
            <header class="flow-root">
               <div class="text-size-[clamp(24px,2.5vw,36px)]">
                  <b>foxpro</b> website
               </div>
               <hr />
               <nav
                  class={css`
                     display: flex;
                     gap: 10px;
                     align-items: center;
                     text-decoration: none;
                     font-family: Consolas;
                  `}>
                  {links.map(([href, title]) => (
                     <a
                        class={linkClass}
                        href={href}
                        classList={{
                           active: (href.length > 1 && urlPathname.startsWith(href)) || urlPathname == href,
                        }}>
                        {title}
                     </a>
                  ))}
                  <a class={cx(linkClass, "m-l-auto")} href="https://github.com/MrFoxPro/website" target="blank">
                     source
                  </a>
               </nav>
            </header>
         </NoHydration>
         {props.children}
      </>
   )
}
