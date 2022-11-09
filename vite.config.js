import fs from 'fs/promises'
import * as path from 'path'
import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import EsLint from 'vite-plugin-linter'
import timeReporter from 'vite-plugin-time-reporter'

const { EsLinter, linterPlugin } = EsLint

// https://vitejs.dev/config/
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
            linterPlugin({
                include: ['./src}/**/*.{ts,tsx,js,jsx}'],
                linters: [new EsLinter({ configEnv })],
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
                utils: path.resolve(__dirname, './src/utils/'),
            },
        },
        server: {
            port: 3000,
            strictPort: false
        },
        preview: {
            port: 4000
        }
    }
})
