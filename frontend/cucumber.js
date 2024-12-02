module.exports = {
    default: {
        requireModule: ['esbuild-register'],
        require: ['playwright.config.ts', 'tests/steps/**/*.ts'],
        paths: ['../specs/**/*.feature']
    }
}
