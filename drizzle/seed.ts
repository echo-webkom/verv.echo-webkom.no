import "dotenv/config";
import { db } from "@/lib/db/drizzle";

async function main() {
  console.log("Nothing to seed.");
}

console.log("🚀 Starting seed...");

main()
  .then(() => {
    console.log("✅ Seed complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("🚨 Seed failed! Error:", err);
    process.exit(1);
  });
