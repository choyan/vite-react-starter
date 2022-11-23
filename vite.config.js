import fs from 'fs/promises'
import * as path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import timeReporter from 'vite-plugin-time-reporter'

export default defineConfig((configEnv, mode) => {
    const env = loadEnv(mode, process.cwd())
    // expose .env as process.env instead of import.meta since jest does not import meta yet
    const envWithProcessPrefix = Object.entries(env).reduce((prev, [key, val]) => {
        return {
            ...prev,
            ['process.env.' + key]: `"${val}"`,
        }
    }, {})

    return {
        define: envWithProcessPrefix,
        plugins: [
            react(),
            eslint({
                include: ['./src}/**/*.{ts,tsx,js,jsx}'],
                cache: true,
            }),
            timeReporter(),
        ],
        esbuild: {
            loader: 'jsx',
            include: /src\/.*\.jsx?$/,
            exclude: [],
        },
        optimizeDeps: {
            esbuildOptions: {
                plugins: [
                    {
                        name: 'load-js-files-as-jsx',
                        setup(build) {
                            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
                                loader: 'jsx',
                                contents: await fs.readFile(args.path, 'utf8'),
                            }))
                        },
                    },
                ],
            },
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                utils: path.resolve(__dirname, './src/utils/'),
            },
        },
        build: {
            minify: true,
        },
        server: {
            port: 3000,
            strictPort: false,
        },
        preview: {
            port: 4000,
        },
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './src/utils/test-utils.js',
        },
    }
})
