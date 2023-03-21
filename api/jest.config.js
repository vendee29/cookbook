export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
      '**/utils/**/*.test.ts'
    ],
    moduleNameMapper: {
      '^utils/(.*)$': '<rootDir>/src/utils/$1'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};