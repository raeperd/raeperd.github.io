// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })
const customJestConfig = { roots: ['<rootDir>/lib', '<rootDir>/pages', '<rootDir>/components'] }

module.exports = createJestConfig(customJestConfig)
