const esModules = ['uuid'].join('|')

module.exports = {
    roots: ['<rootDir>/src'],
    modulePaths: ['<rootDir>/src'],
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./jest.setup.js'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testPathIgnorePatterns: ['node_modules/'],
    testMatch: ['**/*.test.(js|jsx|ts|tsx)'],
    moduleNameMapper: {
        '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            'identity-obj-proxy',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    moduleDirectories: ['node_modules', 'src'],
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`, '^.+\\.module\\.(css|sass|scss)$'],
    transform: {
        '^.+\\.(ts|js|tsx|jsx)$': '@swc/jest',
        '^.+\\.css$': '<rootDir>/config/jest/cssTransform.cjs',
        '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.cjs',
    },
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
    resetMocks: true,
}
