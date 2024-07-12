import "dotenv/config";

import { defineConfig } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_AUTH_TOKEN = process.env.DATABASE_AUTH_TOKEN || undefined;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const isHttpProxy = DATABASE_URL.startsWith("http") || DATABASE_URL.startsWith("libsql");

export default defineConfig({
  dialect: "sqlite",
  out: "./migrations",
  schema: "./src/server/db/schemas/index.ts",
  ...(isHttpProxy
    ? {
        driver: "turso",
        dbCredentials: {
          url: DATABASE_URL,
          authToken: DATABASE_AUTH_TOKEN,
        },
      }
    : {
        dbCredentials: {
          url: DATABASE_URL,
        },
      }),
});
