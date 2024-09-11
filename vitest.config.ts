import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    env: {
      NODE_ENV: "developer",
      JWT_SECRET: "asdadasdasd",
      PORT: "8080",
    },
  },
});
