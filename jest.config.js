/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/packages/*/test/**/*.[jt]s?(x)"],
  collectCoverageFrom: [
    "<rootDir>/packages/*/src/**/*.[jt]s?(x)",
    "!<rootDir>/packages/*/src/**/index.[jt]s?(x)",
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
