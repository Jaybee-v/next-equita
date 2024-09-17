/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./setupTest.js",
    env: {
      IS_REACT_ACT_ENVIRONMENT: "true",
    },
    alias: {
      "@/": "./src",
    },
  },
});
