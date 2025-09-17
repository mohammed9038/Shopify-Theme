module.exports = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/"],
  collectCoverage: true,
  collectCoverageFrom: ["assets/**/*.js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
