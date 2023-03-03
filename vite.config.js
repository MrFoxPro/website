// import ViteLinaria from '@linaria/vite'
import { execSync } from 'node:child_process'
import Path from 'node:path'
import { fileURLToPath } from 'node:url'
// import { visualizer as RollupVisualizer } from 'rollup-plugin-visualizer'
// import ViteAutoImport from 'unplugin-auto-import/vite'
import ViteCompression from 'vite-plugin-compression'
import ViteImagePresets from 'vite-plugin-image-presets'
import ViteSolid from 'vite-plugin-solid'
// import ViteSolidSVG from 'vite-plugin-solid-svg'
import VPS from 'vite-plugin-ssr/plugin'

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
            proxy: {
                '/api': {
                    target: 'http://localhost:3001',
                    changeOrigin: true,
                },
            },
        },
        plugins: [
            // ViteAutoImport({
            //     imports: [{ '@linaria/core': ['css'] }],
            //     dts: './types/auto-imports.d.ts',
            // }),
            // ViteLinaria({
            //     displayName: true,
            //     babelOptions: {
            //         presets: [
            //             ['solid', { generate: 'dom' }],
            //             ['@babel/typescript', { onlyRemoveTypeImports: true }],
            //         ],
            //     },
            // }),
            ViteImagePresets(),
            ViteSolid({
                dev: dev,
                hot: dev,
                ssr: true,
                typescript: {
                    onlyRemoveTypeImports: true,
                },
            }),
            // ViteSolidSVG({ defaultAsComponent: true }),
            VPS({
                includeAssetsImportedByServer: true,
                prerender: {
                    partial: true,
                    noExtraDir: true,
                },
            }),
            // ViteInspect(),
            // !dev &&
            // RollupVisualizer({
            //     open: false,
            //     filename: Path.resolve(outDir, 'stats.html'),
            //     gzipSize: true,
            // }),
            !dev &&
            ViteCompression({
                filter: /\.(js|mjs|json|css|html|woff2)$/i,
                verbose: false,
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
