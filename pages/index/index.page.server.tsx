import { css } from '@linaria/core'

export function Page() {
   return (
      <main
         class={css`
         display: flex;
         height: 100%;
         margin: 0 auto;
         font-size: 15vw;
      `}
      >
         <span class={css`margin: 0 auto;`}>{'>^_^<'}</span>
      </main>
   )
}
