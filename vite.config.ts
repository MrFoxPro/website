import { execSync } from "node:child_process"
import Path from "node:path"
import { fileURLToPath } from "node:url"

import PostCSSMixins from "postcss-mixins"
import ViteLinaria from "@linaria/vite"
import PostCSSNested from "postcss-nested"
import { visualizer as RollupVisualizer } from "rollup-plugin-visualizer"
// import ViteAutoImport from 'unplugin-auto-import/vite'
import RollupMDX from "@mdx-js/rollup"
import RemarkBreaks from "remark-breaks"
import RemarkGFM from "remark-gfm"
import ViteCompression from "vite-plugin-compression"
import ViteImagePresets from "vite-plugin-image-presets"
import ViteInspect from "vite-plugin-inspect"
import ViteSolid from "vite-plugin-solid"
import ViteSolidSVG from "vite-plugin-solid-svg"
import VPS from "vite-plugin-ssr/plugin"
// import RemarkTypograf from '@mavrin/remark-typograf'
import RemarkAutolinkHeadings from "rehype-autolink-headings"
import RemarkFrontmatter from "remark-frontmatter"
import RemarkMath from "remark-math"
import RemarkMdxFrontmatter from "remark-mdx-frontmatter"
import StyleFmt from "stylefmt"
import ViteUnoCSS from "unocss/vite"
import type { ConfigEnv, UserConfig } from "vite"

export default ({ mode }: ConfigEnv) => {
   const dev = mode === "development"
   const git = (cmd: string) => `'${String(execSync(cmd)).trimEnd().replaceAll("'", "\"")}'`
   const outDir = "./dist"
   const __dirname = fileURLToPath(new URL(".", import.meta.url))

   const config: UserConfig = {
      clearScreen: true,

      // appType: 'mpa',
      // publicDir: './public',
      // root: __dirname,
      define: {
         GIT_COMMIT_DATE: git("git log -1 --format=%cI"),
         GIT_BRANCH_NAME: git("git rev-parse --abbrev-ref HEAD"),
         GIT_COMMIT_HASH: git("git rev-parse --short HEAD"),
         GIT_LAST_COMMIT_MESSAGE: git("git show -s --format=%s"),
      },
      server: {
         host: "0.0.0.0",
         port: 3000,
         open: false,
         proxy: {
            "/cloud": {
               hostRewrite: "foxpro.su"
            }
         },
      },
      plugins: [
         ViteUnoCSS(),
         {
            ...ViteLinaria({
               displayName: true,
               babelOptions: {
                  presets: [
                     ["solid", { generate: "ssr" }],
                     ["@babel/typescript", { onlyRemoveTypeImports: true }],
                  ],
               },
               preprocessor: (selector, css) => {
                  if (css.includes("/* global */")) return css
                  return `${selector} {${css}}`
               },
               evaluate: false,
            }),
            enforce: "pre",
         },
         // There is problem with plugins order with linaria.
         // Place it only here! with enforce: 'pre'!
         // Also, there are problems with auto-import plugin -_- because it's 'pre'
         ViteSolid({
            dev: dev,
            hot: dev,
            typescript: { onlyRemoveTypeImports: true },
            // this should be true, ensure solid plugin automatically decide how to render with VPS
            ssr: true,
         }),

         RollupMDX({
            development: dev,
            jsxImportSource: "solid-jsx",
            jsxRuntime: "automatic",
            stylePropertyNameCase: "css",
            remarkPlugins: [
               RemarkBreaks,
               [RemarkGFM, {}],
               [RemarkFrontmatter, { type: "toml", marker: "+" }],
               RemarkMdxFrontmatter,
               RemarkMath,
               // [RemarkTypograf, { locale: ['ru'] }],
            ],
            rehypePlugins: [RemarkAutolinkHeadings],
         }),
         ViteImagePresets(),
         ViteSolidSVG({ defaultAsComponent: true }),
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
         !dev &&
         RollupVisualizer({
            open: false,
            filename: Path.resolve(outDir, "stats.html"),
            gzipSize: true,
         }),
      ],
      resolve: { alias: { "~": Path.resolve(".") } },
      css: {
         modules: false,
         postcss: {
            plugins: [PostCSSMixins(), PostCSSNested(), StyleFmt],
         }
      },
      build: {
         outDir,
         modulePreload: {
            polyfill: false,
         },
         sourcemap: false,
         target: "esnext",
         reportCompressedSize: false,
         emptyOutDir: true,
         cssTarget: false,
         minify: false
      },
   }
   return config
}
