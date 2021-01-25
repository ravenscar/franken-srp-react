module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["./jest-setup.js"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
