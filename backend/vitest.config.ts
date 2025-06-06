import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'

// Globals true to avoid importing the test function in each test file
export default defineConfig({
    test: {
        globals: true,
        alias: {
            src: resolve(__dirname, 'src'),
        },
        coverage: {
            provider: 'v8',
        },
    },
})
