import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm", // ESM + TypeScript
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // tsconfig paths 호환
  },
  transformIgnorePatterns: [
    "/node_modules/(?!p-limit|yocto-queue)", // ESM으로 배포된 외부 모듈도 변환
  ],
};

export default config;
