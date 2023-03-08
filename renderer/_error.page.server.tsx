import { css } from "@linaria/core"
import type { PageContextBuiltInClient } from "vite-plugin-ssr/client"

import { MainLayout } from "../pages/main_layout"

export function Page(ctx: PageContextBuiltInClient) {
   return (
      <main class={css`
         transform: translate(-50%, -50%);
         position: absolute;
         left: 50%;
         top: 50%;
         font-size: 15vw;
         width: max-content;
         text-align: center;
         & > * {
            display: block;
         }
      `}>
         <div>404</div>
         <a href="/">{"> index"}</a>
      </main>
   )
}

export { MainLayout as Layout }
