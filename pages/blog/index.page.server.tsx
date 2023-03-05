const articles = Object.entries(import.meta.glob('./**/*.md(x)?', { eager: true }))

export function Page(ctx) {
   return (
      <>
         <h3>Articles</h3>
         <ul>
            {Object.entries(articles).map(([fn, module]) => (
               <li>
                  {module.date} <a href={'/blog' + fn.split('/index.page')[0]}>{module.title}</a>
               </li>
            ))}
         </ul>
      </>
   )
}
export function render(ctx) {
   console.log(ctx)
   return null
}

// override layout here, because it uses from /blog for this Page too =(
export function Layout(props) {
   return props.children
}
