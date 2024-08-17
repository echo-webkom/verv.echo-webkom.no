import "dotenv/config";
import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "../src/lib/db/drizzle";

console.log("🚀 Starting migrations...");

if (process.env.VERCEL_ENV === "preview") {
  process.exit(0);
}

migrate(db, { migrationsFolder: "./drizzle/migrations" })
  .then(() => {
    console.log("✅ Migrations complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("🚨 Migrations failed! Error:", err);
    process.exit(1);
  });
