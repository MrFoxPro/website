import { MainLayout } from "../main_layout"

export const CVLayout = props => (
   <MainLayout>
      <main class="prose prose-truegray @dark:prose-invert max-w-80%">{props.children}</main>
   </MainLayout>
)
export { CVLayout as Layout }
