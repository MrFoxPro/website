import { css } from '@linaria/core'

export function NavLayout(props) {
   const style = css`
      * {
         color: blue
      }
   `
   return (
      <div class={style}>
         foxpro website
         {props.children}
      </div>
   )
}

export { NavLayout as Layout }
