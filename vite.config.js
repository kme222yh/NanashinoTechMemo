import { fileURLToPath, URL } from 'node:url'
import { globSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const themeBase = '/wp-content/themes/nanashinotechmemo/'
const outDir = 'dist'
const devServerPort = 5173
const devServerOrigin = `http://localhost:${devServerPort}`

// Build --watch does not watch publicDir, so add the PHP files etc. explicitly.
const watchPublicDir = () => ({
    name: 'watch-public-dir',
    buildStart() {
        for (const file of globSync('public/**/*')) {
            this.addWatchFile(file)
        }
    },
})

// While `vite` (dev server) is running, write dist/hot so that the theme's PHP
// loads scripts from the dev server (HMR) instead of the built files.
const hotFile = () => {
    const path = resolve(outDir, 'hot')
    const clean = () => rmSync(path, { force: true })
    return {
        name: 'wp-hot-file',
        apply: 'serve',
        configureServer(server) {
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
            input: 'src/main.js',
        },
    },
    server: {
        port: devServerPort,
        strictPort: true,
        origin: devServerOrigin,
        cors: true,
    },
}))
