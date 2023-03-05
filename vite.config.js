import ViteLinaria from '@linaria/vite'
import { execSync } from 'node:child_process'
import Path from 'node:path'
import { fileURLToPath } from 'node:url'
// import { visualizer as RollupVisualizer } from 'rollup-plugin-visualizer'
import ViteAutoImport from 'unplugin-auto-import/vite'
import ViteCompression from 'vite-plugin-compression'
import ViteImagePresets from 'vite-plugin-image-presets'
import ViteSolid from 'vite-plugin-solid'
// import ViteSolidSVG from 'vite-plugin-solid-svg'
import VPS from 'vite-plugin-ssr/plugin'
import RollupMDX from '@mdx-js/rollup'
import ViteInspect from 'vite-plugin-inspect'
import RemarkGFM from 'remark-gfm'
import RemarkBreaks from 'remark-breaks'
// import RemarkTypograf from '@mavrin/remark-typograf'
import RemarkFrontmatter from 'remark-frontmatter'
import RemarkMdxFrontmatter from 'remark-mdx-frontmatter'
import RemarkMath from 'remark-math'
import RemarkAutolinkHeadings from 'rehype-autolink-headings'

export default (/** @type import('vite').ConfigEnv */ { mode }) => {
   const dev = mode === 'development'
   const git = (/** @type {string} */ cmd) => `'${String(execSync(cmd)).trimEnd().replaceAll("'", '"')}'`
   const outDir = './dist'
   const __dirname = fileURLToPath(new URL('.', import.meta.url))

   /** @type import('vite').UserConfig */
   const config = {
      assetsInclude: [/\.mp4$/, /\.webm$/],
      clearScreen: true,
      appType: 'custom',
      publicDir: './public',
      root: __dirname,
      define: {
         GIT_COMMIT_DATE: git('git log -1 --format=%cI'),
         GIT_BRANCH_NAME: git('git rev-parse --abbrev-ref HEAD'),
         GIT_COMMIT_HASH: git('git rev-parse --short HEAD'),
         GIT_LAST_COMMIT_MESSAGE: git('git show -s --format=%s'),
      },
      server: {
         host: '0.0.0.0',
         port: 3000,
      },
      plugins: [
         // ViteAutoImport({
         //    imports: [{ '@linaria/core': ['css'] }],
         //    dts: './types/auto-imports.d.ts',
         // }),
         // ViteLinaria({
         //    displayName: true,
         //    babelOptions: {
         //       presets: [
         //          ['solid', { generate: 'dom' }],
         //          ['@babel/typescript', { onlyRemoveTypeImports: true }],
         //       ],
         //    },
         // }),

         // { plugins: [[RemarkTypograf, { locale: ['ru'] }]] }
         RollupMDX({
            development: dev,
            // jsx: true,
            // providerImportSource: 'solid-mdx',
            jsxImportSource: 'solid-jsx',
            jsxRuntime: 'automatic',
            stylePropertyNameCase: 'css',
            remarkPlugins: [
               RemarkBreaks,
               [RemarkGFM, {}],
               [RemarkFrontmatter, { type: 'toml', marker: '+' }],
               RemarkMdxFrontmatter,
               RemarkMath,
            ],
            rehypePlugins: [RemarkAutolinkHeadings],
         }),
         ViteSolid({
            dev: false,
            hot: false,
            ssr: true,
         }),
         // ViteImagePresets(),
         // ViteSolidSVG({ defaultAsComponent: true }),
         VPS({
            includeAssetsImportedByServer: true,
            prerender: {
               partial: true,
               noExtraDir: true,
            },
         }),
         ViteInspect(),
         !dev &&
            ViteCompression({
               filter: /\.(js|mjs|json|css|html|woff2)$/i,
               verbose: false,
               threshold: 1024,
            }),
      ],
      resolve: {
         alias: {
            '~': Path.resolve('.'),
         },
      },
      css: {
         modules: false,
      },
      build: {
         outDir,
         modulePreload: {
            polyfill: false,
         },
         sourcemap: false,
         target: 'esnext',
         reportCompressedSize: false,
         minify: 'esbuild',
         emptyOutDir: true,
      },
   }
   return config
}
