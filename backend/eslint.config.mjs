import antfu from '@antfu/eslint-config'

export default antfu(
    {
        typescript: true,
        rules: {
            'no-console': 'off',
            'n/prefer-global/process': 'off',
            'perfectionist/sort-imports': 'off',
        },
        stylistic: {
            indent: 4, // 4, or 'tab'
            quotes: 'single', // or 'double'
        },
        ignores: ['*.json', 'index.ts'],
    },
)
