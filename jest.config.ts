import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFilesAfterEnv: ['./setupTests.ts'],
  // Disable this to test all test files.
  // testMatch: ['./**/__stories__/00-Uncontrolled.test.tsx'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  }
};

export default config;
