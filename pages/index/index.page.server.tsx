import { css } from "@linaria/core"

export function Page() {
   return (
      <main class={css`
         transform: translate(-50%, -50%);
         position: absolute;
         left: 50%;
         top: 50%;
         font-size: 15vw;
         > a {
            text-decoration: none;
         }
      `}>
      </main>
   )
}
