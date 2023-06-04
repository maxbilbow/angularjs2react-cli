module.exports = {
    root: true,
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: ['node_modules', 'dist', 'coverage', '.eslintrc.cjs', 'templates', 'test_data', 'generated'],
    rules: {
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        '@typescript-eslint/semi': ['error', 'never'],
    },
}
