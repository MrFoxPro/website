// import './test.css'
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
         {'>^_^<'}
      </main>
   )
}
