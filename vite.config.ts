import { fileURLToPath, URL } from 'node:url'
import { globSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { defineConfig } from 'vitest/config'
import { type Plugin, type ViteDevServer } from 'vite'
import vue from '@vitejs/plugin-vue'

const themeBase = '/wp-content/themes/nanashinotechmemo/'
const outDir = 'dist'
const devServerPort = 5173
const devServerOrigin = `http://localhost:${devServerPort}`

// Build --watch does not watch publicDir, so add the PHP files etc. explicitly.
const watchPublicDir = (): Plugin => ({
    name: 'watch-public-dir',
    buildStart() {
        for (const file of globSync('public/**/*')) {
            this.addWatchFile(file)
        }
    },
})

// While `vite` (dev server) is running, write dist/hot so that the theme's PHP
// loads scripts from the dev server (HMR) instead of the built files.
const hotFile = (): Plugin => {
    const path = resolve(outDir, 'hot')
    const clean = () => rmSync(path, { force: true })
    return {
        name: 'wp-hot-file',
        apply: (_, { command }) => command === 'serve' && !process.env.VITEST,
        configureServer(server: ViteDevServer) {
            server.httpServer?.once('listening', () => writeFileSync(path, devServerOrigin))
            server.httpServer?.once('close', clean)
            for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
                process.once(signal, () => {
                    clean()
                    process.exit()
                })
            }
        },
    }
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
    base: command === 'build' ? themeBase : '/',
    plugins: [vue(), watchPublicDir(), hotFile()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                // scss file to be added to each vue template
                additionalData: '@use "@/assets/sass/prepends" as *;\n',
            },
        },
    },
    build: {
        outDir,
        manifest: true,
        rolldownOptions: {
            input: 'src/main.ts',
        },
    },
    server: {
        port: devServerPort,
        strictPort: true,
        origin: devServerOrigin,
        cors: true,
    },
    test: {
        projects: [
            {
                // components, stores, helpers (no WordPress needed)
                extends: true,
                test: {
                    name: 'unit',
                    include: ['tests/unit/**/*.test.ts'],
                    environment: 'jsdom',
                    setupFiles: ['tests/unit/setup.ts'],
                    restoreMocks: true,
                    // Header reads the breakpoints exported from this Sass module
                    css: { include: [/exports\.module\.scss$/] },
                },
            },
            {
                // requests to the local WordPress (`docker compose up -d` and `npm run build` first)
                extends: false,
                test: {
                    name: 'integration',
                    include: ['tests/integration/**/*.test.ts'],
                    environment: 'node',
                },
            },
        ],
    },
}))
