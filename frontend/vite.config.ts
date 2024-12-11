import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [solid(), tsconfigPaths()],
    define: {
        FEATURE_FLAG_ENABLED: process.env.FEATURE_FLAG === 'true',
    },
    build: {
        outDir: '../backend/src/main/resources/static',
        emptyOutDir: true,
    },
    server: {
        proxy: {
            '/api': 'http://localhost:8080',
        },
    },
})
