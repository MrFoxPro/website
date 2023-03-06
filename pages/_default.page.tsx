import { css, cx } from '@linaria/core'
import { usePageContext } from '../renderer/common'

export function NavigationLayout(props) {
   function NavigationMenu() {
      const ctx = usePageContext()
      const a = css`
         text-decoration: none;
         box-sizing: border-box;
         & + & {
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
      `
      return (
         <nav
            class={css`
               margin-top: 10px;
            `}
         >
            {[
               ['/', '>^_^<'],
               ['/blog', 'blog'],
               ['/cv.ru', 'CV ru'],
               ['/cv.en', 'CV en'],
            ].map(([href, title]) => (
               <a
                  href={href}
                  class={a}
                  classList={{
                     active: ctx.urlPathname == href,
                  }}
               >
                  {title}
               </a>
            ))}
            <a class={cx(css`float: right;`, a)} href="https://github.com/MrFoxPro/website" target='blank'>
               source
            </a>
         </nav>
      )
   }

   return (
      <>
         <header
            class={css`
               display: flow-root;
            `}
         >
            <div
               class={css`
                  font-size: 36px;
               `}
            >
               <b>foxpro</b> website
            </div>
            <NavigationMenu />
         </header>
         <hr />
         {props.children}
      </>
   )
}

export { NavigationLayout as Layout }
