/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFilesAfterEnv: ['./setupTests.ts'],
  // Disable this to test all test files.
  testMatch: ['./**/__stories__/01-Controlled.test.tsx'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  }
};
