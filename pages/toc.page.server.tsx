type Article = {
   title: string
   pathname: string
   date: string
}

const articles = Object.values(import.meta.glob<Article>('./**/*.md(x)?', { eager: true })).sort(
   (a, b) => Date.parse(a.date) - Date.parse(b.date),
)

// We can't resolve url of each page programmatically in normal way.
// https://github.com/brillout/vite-plugin-ssr/discussions/680

export function Page() {
   return (
      <>
         <h3>Articles</h3>
         <ul>
            {Object.entries(articles).map(([, article]) => (
               <li>
                  {article.date} <a href={'/blog' + article.pathname}>{article.title}</a>
               </li>
            ))}
         </ul>
      </>
   )
}
