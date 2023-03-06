import { css } from '@linaria/core'

export function NavLayout(props) {
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
            <nav>
               {[
                  ['/', 'index'],
                  ['/blog', 'blog'],
                  ['/cv.ru', 'CV ru'],
                  ['/cv.en', 'CV en'],
               ].map(([href, title]) => (
                  <a
                     class={css`
                        color: blue;
                        & + & {
                           margin-inline-start: 10px;
                        }
                        &:visited {
                           text-decoration: none;
                           color: initial;
                        }
                     `}
                     href={href}
                  >
                     {title}
                  </a>
               ))}
            </nav>
         </header>
         <hr />
         {props.children}
      </>
   )
}

export { NavLayout as Layout }
